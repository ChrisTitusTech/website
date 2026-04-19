#!/usr/bin/env python3
"""Resize WEBP logos in static/images/linux-logos to 50x50 in place."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

LOGO_DIR = Path("static/images/linux-logos")
TARGET_SIZE = "50x50"


def require_magick() -> str:
    """Find ImageMagick executable and fail fast when unavailable."""
    magick = shutil.which("magick")
    if not magick:
        print("Error: ImageMagick 'magick' binary was not found in PATH.", file=sys.stderr)
        sys.exit(1)
    return magick


def resize_webp_file(magick: str, file_path: Path) -> None:
    """Resize a WEBP file to 50x50 while preserving transparent padding."""
    subprocess.run(
        [
            magick,
            str(file_path),
            "-background",
            "none",
            "-resize",
            "45x45",
            "-gravity",
            "center",
            "-extent",
            TARGET_SIZE,
            str(file_path),
        ],
        check=True,
        capture_output=True,
        text=True,
    )


def main() -> int:
    magick = require_magick()
    if not LOGO_DIR.exists():
        print(f"Error: directory not found: {LOGO_DIR}", file=sys.stderr)
        return 1

    files = sorted(LOGO_DIR.glob("*.webp"))
    if not files:
        print(f"No WEBP files found in {LOGO_DIR}")
        return 1

    ok_count = 0
    for file_path in files:
        try:
            resize_webp_file(magick, file_path)
            ok_count += 1
            print(f"ok    {file_path}")
        except subprocess.CalledProcessError as err:
            print(f"error {file_path} resize failed")
            if err.stderr:
                print(err.stderr.strip())

    print(f"\nDone. Resized {ok_count} WEBP files in {LOGO_DIR}.")
    return 0 if ok_count == len(files) else 1


if __name__ == "__main__":
    raise SystemExit(main())
