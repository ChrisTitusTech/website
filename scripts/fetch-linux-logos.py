#!/usr/bin/env python3
"""Download Linux logos and normalize them to 200x200 PNG files."""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from urllib.parse import urlparse
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

OUTPUT_DIR = Path("static/images/linux-logos")
ICON_BASE_URL = "https://cdn.simpleicons.org"
LOGO_SLUGS = [
    "linux",
    "almalinux",
    "alpinelinux",
    "archlinux",
    "artixlinux",
    "centos",
    "debian",
    "elementary",
    "fedora",
    "kalilinux",
    "linuxmint",
    "manjaro",
    "mxlinux",
    "nixos",
    "openwrt",
    "opensuse",
    "popos",
    "redhat",
    "rockylinux",
    "slackware",
    "tails",
    "ubuntu",
    "voidlinux",
    "zorin",
    "bazzite",
    "cachyos",
]

# Most distros come from Simple Icons. Distros not available there can define
# custom source URLs in priority order.
CUSTOM_SOURCE_URLS: dict[str, list[str]] = {
    "bazzite": [
        "https://bazzite.gg/content/uploads/2025/07/pengu_dark_sm.webp",
    ],
    "cachyos": [
        "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cachyos.svg",
    ],
}


def require_magick() -> str:
    """Find ImageMagick executable and fail fast when unavailable."""
    magick = shutil.which("magick")
    if not magick:
        print("Error: ImageMagick 'magick' binary was not found in PATH.", file=sys.stderr)
        sys.exit(1)
    return magick


def download_logo(slug: str) -> tuple[bytes, str] | None:
    """Return raw image bytes and source extension, or None on total failure."""
    source_urls = CUSTOM_SOURCE_URLS.get(slug, [f"{ICON_BASE_URL}/{slug}"])

    for index, url in enumerate(source_urls):
        request = Request(url, headers={"User-Agent": "website-logo-fetcher/1.0"})
        try:
            with urlopen(request, timeout=20) as response:
                data = response.read()

            parsed_path = urlparse(url).path
            suffix = Path(parsed_path).suffix or ".svg"
            return data, suffix
        except HTTPError as err:
            if err.code == 404 and index < len(source_urls) - 1:
                continue
            if err.code == 404:
                print(f"skip  {slug:<15} not found")
            else:
                print(f"error {slug:<15} HTTP {err.code}: {err.reason}")
        except URLError as err:
            print(f"error {slug:<15} network error: {err.reason}")

    return None


def render_png(magick: str, image_data: bytes, image_suffix: str, output_path: Path) -> None:
    """Render a centered 200x200 PNG from source image data."""
    with tempfile.NamedTemporaryFile(suffix=image_suffix, delete=False) as handle:
        temp_image_path = Path(handle.name)
        handle.write(image_data)

    try:
        subprocess.run(
            [
                magick,
                str(temp_image_path),
                "-background",
                "none",
                "-resize",
                "180x180",
                "-gravity",
                "center",
                "-extent",
                "200x200",
                str(output_path),
            ],
            check=True,
            capture_output=True,
            text=True,
        )
    finally:
        temp_image_path.unlink(missing_ok=True)


def main() -> int:
    magick = require_magick()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    ok_count = 0
    for slug in LOGO_SLUGS:
        logo_result = download_logo(slug)
        if not logo_result:
            continue
        image_data, image_suffix = logo_result

        output_path = OUTPUT_DIR / f"{slug}.png"
        try:
            render_png(magick, image_data, image_suffix, output_path)
            ok_count += 1
            print(f"ok    {slug:<15} -> {output_path}")
        except subprocess.CalledProcessError as err:
            print(f"error {slug:<15} conversion failed")
            if err.stderr:
                print(err.stderr.strip())

    print(f"\nDone. Created {ok_count} logo files in {OUTPUT_DIR}.")
    return 0 if ok_count > 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
