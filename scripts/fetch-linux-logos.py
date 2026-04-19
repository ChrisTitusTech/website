#!/usr/bin/env python3
"""Download Linux logos and normalize them to 200x200 PNG files."""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
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
]


def require_magick() -> str:
    """Find ImageMagick executable and fail fast when unavailable."""
    magick = shutil.which("magick")
    if not magick:
        print("Error: ImageMagick 'magick' binary was not found in PATH.", file=sys.stderr)
        sys.exit(1)
    return magick


def download_svg(slug: str) -> bytes | None:
    """Return raw SVG bytes for the given icon slug, or None on 404/network issues."""
    url = f"{ICON_BASE_URL}/{slug}"
    request = Request(url, headers={"User-Agent": "website-logo-fetcher/1.0"})

    try:
        with urlopen(request, timeout=20) as response:
            return response.read()
    except HTTPError as err:
        if err.code == 404:
            print(f"skip  {slug:<15} not found")
            return None
        print(f"error {slug:<15} HTTP {err.code}: {err.reason}")
        return None
    except URLError as err:
        print(f"error {slug:<15} network error: {err.reason}")
        return None


def render_png(magick: str, svg_data: bytes, output_path: Path) -> None:
    """Render a centered 200x200 PNG from SVG data with a transparent background."""
    with tempfile.NamedTemporaryFile(suffix=".svg", delete=False) as handle:
        temp_svg_path = Path(handle.name)
        handle.write(svg_data)

    try:
        subprocess.run(
            [
                magick,
                str(temp_svg_path),
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
        temp_svg_path.unlink(missing_ok=True)


def main() -> int:
    magick = require_magick()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    ok_count = 0
    for slug in LOGO_SLUGS:
        svg_data = download_svg(slug)
        if not svg_data:
            continue

        output_path = OUTPUT_DIR / f"{slug}.png"
        try:
            render_png(magick, svg_data, output_path)
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
