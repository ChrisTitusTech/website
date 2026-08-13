#!/usr/bin/env python3
"""Download missing Twitch chat replays for the livestream data contract."""

from __future__ import annotations

import json
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path

import requests


DATA_PATH = Path("data/livestreams.json")
CHAT_DIR = Path("static/chats")
DOWNLOADER = Path(__file__).resolve().parent.parent / "TwitchDownloaderCLI"


def parse_iso(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def current_live_vod(data: dict, client_id: str, client_secret: str) -> str | None:
    if not client_id or not client_secret:
        return None
    channel = os.environ.get("TWITCH_CHANNEL", "christitustech")
    try:
        token_response = requests.post(
            "https://id.twitch.tv/oauth2/token",
            data={
                "client_id": client_id,
                "client_secret": client_secret,
                "grant_type": "client_credentials",
            },
            timeout=15,
        )
        token_response.raise_for_status()
        headers = {
            "Authorization": f"Bearer {token_response.json()['access_token']}",
            "Client-Id": client_id,
        }
        stream_response = requests.get(
            "https://api.twitch.tv/helix/streams",
            params={"user_login": channel},
            headers=headers,
            timeout=15,
        )
        stream_response.raise_for_status()
        streams = stream_response.json().get("data", [])
        if not streams:
            return None
        live_started = parse_iso(streams[0]["started_at"])
        print(f"Channel is live (started {streams[0]['started_at']})")
        for item in data.get("items", []):
            vod_id = item.get("twitchVodId")
            video_id = item.get("videoId")
            if not vod_id or not video_id or (CHAT_DIR / f"{video_id}.json").exists():
                continue
            video_response = requests.get(
                "https://api.twitch.tv/helix/videos",
                params={"id": vod_id},
                headers=headers,
                timeout=15,
            )
            video_response.raise_for_status()
            vods = video_response.json().get("data", [])
            if vods and abs((parse_iso(vods[0]["created_at"]) - live_started).total_seconds()) < 300:
                print(f"VOD {vod_id} is the current live stream; skipping it")
                return str(vod_id)
    except (KeyError, requests.RequestException, ValueError) as error:
        print(f"Warning: could not determine live status: {error}", file=sys.stderr)
    return None


def main() -> int:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    CHAT_DIR.mkdir(parents=True, exist_ok=True)
    live_vod_id = current_live_vod(
        data,
        os.environ.get("TWITCH_CLIENT_ID", ""),
        os.environ.get("TWITCH_CLIENT_SECRET", ""),
    )
    errors = 0
    for item in data.get("items", []):
        video_id = item.get("videoId")
        vod_id = item.get("twitchVodId")
        if not video_id or not vod_id:
            continue
        output = CHAT_DIR / f"{video_id}.json"
        if output.exists() or str(vod_id) == live_vod_id:
            continue
        print(f"Downloading chat for VOD {vod_id} to {output}")
        result = subprocess.run(
            [
                str(DOWNLOADER),
                "chatdownload",
                "--id",
                str(vod_id),
                "--output",
                str(output),
                "--temp-path",
                "/tmp",
            ],
            check=False,
            capture_output=True,
            text=True,
        )
        if result.returncode == 0:
            print(f"Downloaded {output.stat().st_size // 1024} KB")
            continue
        print(f"Chat download failed for VOD {vod_id}: {result.stderr.strip()}", file=sys.stderr)
        output.unlink(missing_ok=True)
        errors += 1
    if errors:
        print(f"{errors} chat download(s) failed", file=sys.stderr)
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
