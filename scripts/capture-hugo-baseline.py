#!/usr/bin/env python3
"""Capture a deterministic public-contract snapshot from a Hugo build."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import tarfile
import tempfile
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


REPRESENTATIVE_ROUTES = (
    "/",
    "/my-ai-workflow/",
    "/categories/linux/",
    "/live-streams/",
    "/downloads/",
)


class MetadataParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_title = False
        self.in_json_ld = False
        self.title_parts: list[str] = []
        self.json_ld_parts: list[str] = []
        self.json_ld_documents: list[object] = []
        self.feed_discovery: list[dict[str, str]] = []
        self.metadata: dict[str, str] = {}

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        values = {key.lower(): value or "" for key, value in attrs}
        if tag.lower() == "title":
            self.in_title = True
        elif tag.lower() == "link":
            rel = values.get("rel", "").split()
            if "canonical" in rel:
                self.metadata["canonical"] = values.get("href", "")
            if "alternate" in rel and values.get("type") == "application/rss+xml":
                self.feed_discovery.append(
                    {
                        "href": values.get("href", ""),
                        "title": values.get("title", ""),
                        "type": values.get("type", ""),
                    }
                )
        elif tag.lower() == "meta":
            key = values.get("name") or values.get("property")
            if key in {
                "description",
                "og:description",
                "og:image",
                "og:title",
                "og:type",
                "og:url",
                "twitter:card",
                "twitter:description",
                "twitter:image",
                "twitter:title",
            }:
                self.metadata[key] = values.get("content", "")
        elif tag.lower() == "script" and values.get("type") == "application/ld+json":
            self.in_json_ld = True
            self.json_ld_parts = []

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title":
            self.in_title = False
        elif tag.lower() == "script" and self.in_json_ld:
            raw = "".join(self.json_ld_parts).strip()
            if raw:
                self.json_ld_documents.append(json.loads(raw))
            self.in_json_ld = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)
        if self.in_json_ld:
            self.json_ld_parts.append(data)

    def result(self) -> dict[str, object]:
        structured_types: set[str] = set()

        def collect_types(value: object) -> None:
            if isinstance(value, dict):
                item_type = value.get("@type")
                if isinstance(item_type, str):
                    structured_types.add(item_type)
                elif isinstance(item_type, list):
                    structured_types.update(
                        item for item in item_type if isinstance(item, str)
                    )
                for child in value.values():
                    collect_types(child)
            elif isinstance(value, list):
                for child in value:
                    collect_types(child)

        collect_types(self.json_ld_documents)
        return {
            "title": "".join(self.title_parts).strip(),
            **self.metadata,
            "feedDiscovery": self.feed_discovery,
            "structuredDataTypes": sorted(structured_types),
        }


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def route_for(relative_path: str) -> str:
    if relative_path == "index.html":
        return "/"
    if relative_path.endswith("/index.html"):
        return f"/{relative_path.removesuffix('index.html')}"
    return f"/{relative_path}"


def describe_alias_target(url: str) -> dict[str, str]:
    parsed = urlparse(url)
    result = {"rawTarget": url}
    internal_hosts = {"", "christitus.com", "www.christitus.com"}
    if parsed.netloc not in internal_hosts:
        result["targetType"] = "external"
        return result
    result["targetType"] = "local-absolute" if parsed.scheme else "local"
    result["localRoute"] = parsed.path or "/"
    if parsed.query:
        result["query"] = parsed.query
    if parsed.fragment:
        result["fragment"] = parsed.fragment
    return result


def extract_alias(html: str) -> str | None:
    match = re.search(
        r'<meta\s+http-equiv=["\']?refresh["\']?\s+content=["\'][^"\']*url=([^"\']+)',
        html,
        flags=re.IGNORECASE,
    )
    return match.group(1).strip() if match else None


def semantic_outputs(build_dir: Path) -> dict[str, object]:
    search_items = json.loads((build_dir / "index.json").read_text(encoding="utf-8"))
    search = [
        {
            "permalink": item["permalink"],
            "title": item["title"],
            "categories": item.get("categories") or [],
            "tags": item.get("tags") or [],
            "contentsSha256": hashlib.sha256(
                (item.get("contents") or "").encode("utf-8")
            ).hexdigest(),
        }
        for item in search_items
    ]

    feeds = {}
    for feed_path in sorted(build_dir.rglob("index.xml")):
        rss_root = ET.parse(feed_path).getroot()
        channel = rss_root.find("channel")
        if channel is None:
            continue
        relative = feed_path.relative_to(build_dir).as_posix()
        taxonomy_index = relative in {"categories/index.xml", "tags/index.xml"}
        taxonomy_feed = relative.startswith(("categories/", "tags/"))
        channel_title = channel.findtext("title", default="")
        channel_description = channel.findtext("description", default="")
        atom_link = channel.find("{http://www.w3.org/2005/Atom}link")
        feeds[relative] = {
            "bytes": feed_path.stat().st_size,
            "channel": {
                "title": channel_title.casefold() if taxonomy_feed else channel_title,
                "link": channel.findtext("link", default=""),
                "description": (
                    channel_description.casefold()
                    if taxonomy_feed
                    else channel_description
                ),
                "language": channel.findtext("language", default=""),
                "lastBuildDate": channel.findtext("lastBuildDate", default=""),
                "atomSelf": {
                    "href": atom_link.get("href", "") if atom_link is not None else "",
                    "rel": atom_link.get("rel", "") if atom_link is not None else "",
                    "type": atom_link.get("type", "") if atom_link is not None else "",
                },
            },
            "items": [
                {
                    "title": (
                        item.findtext("title", default="").casefold()
                        if taxonomy_index
                        else item.findtext("title", default="")
                    ),
                    "link": item.findtext("link", default=""),
                    "pubDate": item.findtext("pubDate", default=""),
                    "guid": item.findtext("guid", default=""),
                    "descriptionBytes": len(
                        item.findtext("description", default="").encode("utf-8")
                    ),
                    "descriptionSha256": hashlib.sha256(
                        item.findtext("description", default="").encode("utf-8")
                    ).hexdigest(),
                }
                for item in channel.findall("item")
            ],
        }

    sitemap_root = ET.parse(build_dir / "sitemap.xml").getroot()
    sitemap_namespace = {"sitemap": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap = [
        {
            "loc": item.findtext("sitemap:loc", default="", namespaces=sitemap_namespace),
            "lastmod": item.findtext(
                "sitemap:lastmod", default="", namespaces=sitemap_namespace
            ),
        }
        for item in sitemap_root.findall("sitemap:url", sitemap_namespace)
    ]
    return {"search": search, "feeds": feeds, "sitemap": sitemap}


def command_output(command: list[str]) -> str:
    return subprocess.run(
        command,
        check=True,
        capture_output=True,
        text=True,
    ).stdout.strip()


def verify_source(repo: Path, expected_commit: str) -> str:
    commit = command_output(["git", "-C", str(repo), "rev-parse", "HEAD"])
    if commit != expected_commit:
        raise SystemExit(f"source commit is {commit}, expected {expected_commit}")
    status = command_output(
        ["git", "-C", str(repo), "status", "--porcelain", "--untracked-files=all"]
    )
    if status:
        raise SystemExit("source worktree is not clean")
    return commit


def prepare_hugo(archive: Path, expected_sha256: str, destination: Path) -> Path:
    actual_sha256 = sha256(archive)
    if actual_sha256 != expected_sha256:
        raise SystemExit(
            f"Hugo archive SHA-256 is {actual_sha256}, expected {expected_sha256}"
        )
    binary = destination / "hugo"
    with tarfile.open(archive, "r:gz") as package:
        member = package.getmember("hugo")
        if not member.isfile():
            raise SystemExit("Hugo archive member is not a regular file")
        source = package.extractfile(member)
        if source is None:
            raise SystemExit("Hugo archive does not contain a readable binary")
        with binary.open("wb") as target:
            shutil.copyfileobj(source, target)
    binary.chmod(0o755)
    return binary


def build_hugo(
    repo: Path,
    hugo: Path,
    expected_version: str,
    destination: Path,
    cache_dir: Path,
    resource_dir: Path,
    build_clock: str,
) -> str:
    version = command_output([str(hugo), "version"])
    if version != expected_version:
        raise SystemExit(f"Hugo version is {version!r}, expected {expected_version!r}")
    subprocess.run(
        [
            str(hugo),
            "--gc",
            "--minify",
            "--cleanDestinationDir",
            "--ignoreCache",
            "--clock",
            build_clock,
            "--source",
            str(repo),
            "--destination",
            str(destination),
            "--cacheDir",
            str(cache_dir),
        ],
        check=True,
        env={
            "HOME": str(cache_dir.parent),
            "LANG": "C.UTF-8",
            "LC_ALL": "C.UTF-8",
            "PATH": "/usr/bin:/bin",
            "TZ": "UTC",
            "HUGO_RESOURCEDIR": str(resource_dir),
        },
    )
    return version


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path)
    parser.add_argument("--repo", type=Path, default=Path.cwd())
    parser.add_argument("--hugo-archive", type=Path, required=True)
    parser.add_argument("--expected-hugo-archive-sha256", required=True)
    parser.add_argument("--expected-commit", required=True)
    parser.add_argument("--expected-hugo-version", required=True)
    parser.add_argument("--expected-file-count", required=True, type=int)
    parser.add_argument("--expected-alias-count", required=True, type=int)
    parser.add_argument("--build-clock", required=True)
    parser.add_argument("--max-build-attempts", default=10, type=int)
    return parser.parse_args()


def build_matches_contract(
    build_dir: Path, expected_file_count: int, expected_alias_count: int
) -> bool:
    public_files = [path for path in build_dir.rglob("*") if path.is_file()]
    aliases = 0
    for path in public_files:
        if path.suffix == ".html" and extract_alias(path.read_text(encoding="utf-8")):
            aliases += 1
    representative_pages = [
        build_dir / ("index.html" if route == "/" else f"{route.strip('/')}/index.html")
        for route in REPRESENTATIVE_ROUTES
    ]
    return (
        len(public_files) == expected_file_count
        and aliases == expected_alias_count
        and all(path.is_file() for path in representative_pages)
    )


def main() -> None:
    args = parse_args()
    repo = args.repo.resolve()
    commit = verify_source(repo, args.expected_commit)
    with tempfile.TemporaryDirectory(prefix="hugo-baseline-") as temporary:
        workspace = Path(temporary)
        hugo = prepare_hugo(
            args.hugo_archive, args.expected_hugo_archive_sha256, workspace
        )
        for attempt in range(1, args.max_build_attempts + 1):
            build_dir = workspace / f"public-{attempt}"
            hugo_version = build_hugo(
                repo,
                hugo,
                args.expected_hugo_version,
                build_dir,
                workspace / f"cache-{attempt}",
                workspace / f"resources-{attempt}",
                args.build_clock,
            )
            if build_matches_contract(
                build_dir, args.expected_file_count, args.expected_alias_count
            ):
                capture(
                    repo,
                    build_dir,
                    args.output,
                    commit,
                    hugo_version,
                    args.build_clock,
                )
                return
        raise SystemExit(
            "Hugo did not reproduce the expected file and alias counts after "
            f"{args.max_build_attempts} clean attempts"
        )


def capture(
    repo: Path,
    build_dir: Path,
    output: Path,
    commit: str,
    hugo_version: str,
    build_clock: str,
) -> None:
    if not (build_dir / "index.html").is_file():
        raise SystemExit("Hugo build did not produce index.html")
    public_files = sorted(
        path.relative_to(build_dir).as_posix()
        for path in build_dir.rglob("*")
        if path.is_file()
    )
    routes = sorted(route_for(path) for path in public_files)
    html_files = [path for path in public_files if path.endswith(".html")]
    aliases: dict[str, dict[str, str]] = {}
    for relative in html_files:
        html = (build_dir / relative).read_text(encoding="utf-8")
        target = extract_alias(html)
        if target:
            aliases[route_for(relative)] = describe_alias_target(target)

    metadata: dict[str, dict[str, object]] = {}
    for route in REPRESENTATIVE_ROUTES:
        relative = "index.html" if route == "/" else f"{route.strip('/')}/index.html"
        page = build_dir / relative
        parser = MetadataParser()
        parser.feed(page.read_text(encoding="utf-8"))
        metadata[route] = parser.result()

    source_files = sorted(
        path.relative_to(repo).as_posix()
        for path in (repo / "content").rglob("*")
        if path.is_file()
    )
    post_markdown = [
        path
        for path in source_files
        if path.startswith("content/posts/") and path.endswith(".md")
    ]
    standalone_markdown = [
        path
        for path in source_files
        if not path.startswith("content/posts/") and path.endswith(".md")
    ]
    static_files = sorted(
        path.relative_to(repo / "static").as_posix()
        for path in (repo / "static").rglob("*")
        if path.is_file()
    )
    critical_files = {}
    for relative in ("index.json", "index.xml", "sitemap.xml", "_headers"):
        path = build_dir / relative
        critical_files[relative] = {
            "bytes": path.stat().st_size,
            "sha256": sha256(path),
        }

    manifest = {
        "schemaVersion": 3,
        "capture": {
            "sourceCommit": commit,
            "hugoVersion": hugo_version,
            "buildClock": build_clock,
        },
        "content": {
            "allSourceFiles": source_files,
            "postMarkdownCount": len(post_markdown),
            "standaloneMarkdownCount": len(standalone_markdown),
            "staticFileCount": len(static_files),
        },
        "output": {
            "aliasCount": len(aliases),
            "aliases": aliases,
            "criticalFiles": critical_files,
            "fileCount": len(public_files),
            "htmlFileCount": len(html_files),
            "metadata": metadata,
            "publicFiles": public_files,
            "routes": routes,
            "semantic": semantic_outputs(build_dir),
        },
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(
        json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
