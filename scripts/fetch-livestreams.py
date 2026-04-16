#!/usr/bin/env python3
"""
Fetch all videos from a YouTube playlist and write to data/livestreams.json.

Required env vars:
  YOUTUBE_API_KEY  - YouTube Data API v3 key (stored as a GitHub secret)
  PLAYLIST_ID      - YouTube playlist ID (optional override)
"""

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests

API_KEY = os.environ.get("YOUTUBE_API_KEY", "")
PLAYLIST_ID = os.environ.get("PLAYLIST_ID", "PLc7fktTRMBow1ksFW020hx2XEKabaD5Vd")
OUTPUT_FILE = Path(__file__).parent.parent / "data" / "livestreams.json"
CHATS_DIR   = Path(__file__).parent.parent / "static" / "chats"
BASE_URL = "https://www.googleapis.com/youtube/v3/playlistItems"


def fetch_playlist_items() -> list:
    items = []
    next_page_token = None

    while True:
        params = {
            "part": "snippet",
            "playlistId": PLAYLIST_ID,
            "maxResults": 50,
            "key": API_KEY,
        }
        if next_page_token:
            params["pageToken"] = next_page_token

        resp = requests.get(BASE_URL, params=params, timeout=30)
        if resp.status_code == 403:
            print(f"Error 403: Check that your YOUTUBE_API_KEY is valid and the "
                  f"YouTube Data API v3 is enabled.", file=sys.stderr)
            sys.exit(1)
        resp.raise_for_status()
        data = resp.json()

        for item in data.get("items", []):
            snippet = item.get("snippet", {})
            resource = snippet.get("resourceId", {})
            video_id = resource.get("videoId", "")
            if not video_id:
                continue

            title = snippet.get("title", "")
            # Skip deleted / private videos
            if title in ("Deleted video", "Private video", "[Private video]", "[Deleted video]"):
                continue

            published_at = snippet.get("publishedAt", "")
            date_str = ""
            if published_at:
                try:
                    dt = datetime.fromisoformat(published_at.replace("Z", "+00:00"))
                    date_str = dt.strftime("%B %d, %Y")
                except ValueError:
                    date_str = published_at[:10]

            thumbnails = snippet.get("thumbnails", {})
            thumbnail = (
                thumbnails.get("medium", {}).get("url")
                or thumbnails.get("default", {}).get("url")
                or f"https://i.ytimg.com/vi/{video_id}/mqdefault.jpg"
            )

            description = snippet.get("description", "").strip()

            items.append({
                "videoId": video_id,
                "title": title,
                "description": description,
                "publishedAt": published_at,
                "date": date_str,
                "thumbnail": thumbnail,
                "twitchVodId": None,
                "hasChatReplay": False,
            })

        next_page_token = data.get("nextPageToken")
        if not next_page_token:
            break

    return items


def _emit_github_output(key: str, value: str) -> None:
    """Write a key=value pair to GITHUB_OUTPUT if running in GitHub Actions."""
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a") as fh:
            fh.write(f"{key}={value}\n")


def main() -> None:
    if not API_KEY:
        print("Error: YOUTUBE_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    print(f"Fetching playlist: {PLAYLIST_ID}")
    items = fetch_playlist_items()
    print(f"Fetched {len(items)} videos.")

    # Load existing data to preserve twitchVodId and detect meaningful changes
    existing_by_id: dict[str, dict] = {}
    existing_updated: str = ""
    if OUTPUT_FILE.exists():
        try:
            existing_data = json.loads(OUTPUT_FILE.read_text())
            existing_updated = existing_data.get("updated", "")
            for entry in existing_data.get("items", []):
                vid = entry.get("videoId")
                if vid:
                    existing_by_id[vid] = entry
        except (json.JSONDecodeError, OSError):
            pass

    # Set twitchVodId and hasChatReplay
    CHATS_DIR.mkdir(parents=True, exist_ok=True)
    for item in items:
        vid = item["videoId"]
        existing = existing_by_id.get(vid, {})
        if existing.get("twitchVodId"):
            item["twitchVodId"] = existing["twitchVodId"]
        item["hasChatReplay"] = (CHATS_DIR / f"{vid}.json").exists()

    # Detect meaningful content changes: new videos or title/description updates
    existing_ids = set(existing_by_id.keys())
    new_ids = {item["videoId"] for item in items}
    added = new_ids - existing_ids
    changed = {
        item["videoId"] for item in items
        if item["videoId"] in existing_by_id
        and (
            item["title"] != existing_by_id[item["videoId"]].get("title", "")
            or item["description"] != existing_by_id[item["videoId"]].get("description", "")
        )
    }
    content_changed = bool(added or changed)

    if content_changed:
        if added:
            print(f"New videos detected: {added}")
        if changed:
            print(f"Updated title/description for: {changed}")
        updated_ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    else:
        print("No new videos or description changes detected.")
        updated_ts = existing_updated or datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    output = {
        "updated": updated_ts,
        "items": items,
    }

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n")
    print(f"Written to {OUTPUT_FILE}")

    _emit_github_output("data_changed", "true" if content_changed else "false")


if __name__ == "__main__":
    main()
