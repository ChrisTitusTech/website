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
                thumbnails.get("maxres", {}).get("url")
                or thumbnails.get("high", {}).get("url")
                or thumbnails.get("medium", {}).get("url")
                or thumbnails.get("default", {}).get("url")
                or f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg"
            )

            description = snippet.get("description", "").strip()

            items.append({
                "videoId": video_id,
                "title": title,
                "description": description,
                "publishedAt": published_at,
                "date": date_str,
                "thumbnail": thumbnail,
            })

        next_page_token = data.get("nextPageToken")
        if not next_page_token:
            break

    return items


def main() -> None:
    if not API_KEY:
        print("Error: YOUTUBE_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    print(f"Fetching playlist: {PLAYLIST_ID}")
    items = fetch_playlist_items()
    print(f"Fetched {len(items)} videos.")

    output = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "items": items,
    }

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n")
    print(f"Written to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
