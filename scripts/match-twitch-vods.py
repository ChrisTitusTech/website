#!/usr/bin/env python3
"""
Match YouTube live-stream entries in data/livestreams.json to Twitch VOD IDs
by comparing publish timestamps (±3-hour window).

Required env vars:
  TWITCH_CLIENT_ID      - Twitch application client ID
  TWITCH_CLIENT_SECRET  - Twitch application client secret

Optional env vars:
  TWITCH_CHANNEL  - Twitch channel login name (default: christitustech)
"""

import json
import os
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

import requests

CLIENT_ID     = os.environ.get("TWITCH_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("TWITCH_CLIENT_SECRET", "")
CHANNEL_LOGIN = os.environ.get("TWITCH_CHANNEL", "christitustech")
LIVESTREAMS   = Path(__file__).parent.parent / "data" / "livestreams.json"

# How close (in seconds) the Twitch VOD start must be to the YouTube publishedAt
MATCH_WINDOW_SEC = 10800   # ±3 hours — accounts for stream-start vs YouTube publish delay


# ── Twitch auth ───────────────────────────────────────────────────────────────

def get_app_token() -> str:
    resp = requests.post(
        "https://id.twitch.tv/oauth2/token",
        data={
            "client_id":     CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "grant_type":    "client_credentials",
        },
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()["access_token"]


def twitch_headers(token: str) -> dict:
    return {
        "Authorization": f"Bearer {token}",
        "Client-Id":     CLIENT_ID,
    }


# ── Twitch API helpers ────────────────────────────────────────────────────────

def get_user_id(headers: dict, login: str) -> str:
    resp = requests.get(
        "https://api.twitch.tv/helix/users",
        params={"login": login},
        headers=headers,
        timeout=15,
    )
    resp.raise_for_status()
    data = resp.json().get("data", [])
    if not data:
        print(f"Error: Twitch user '{login}' not found.", file=sys.stderr)
        sys.exit(1)
    return data[0]["id"]


def parse_twitch_duration(duration: str) -> int:
    """Convert Twitch duration string like '3h40m52s' to total seconds."""
    total = 0
    buf   = ""
    for ch in duration:
        if ch.isdigit():
            buf += ch
        elif ch == "h":
            total += int(buf) * 3600; buf = ""
        elif ch == "m":
            total += int(buf) * 60;   buf = ""
        elif ch == "s":
            total += int(buf);        buf = ""
    return total


def fetch_vods(headers: dict, user_id: str, max_vods: int = 200) -> list[dict]:
    """Fetch archived VODs for a user, newest first."""
    vods   = []
    cursor = None
    while True:
        params: dict = {"user_id": user_id, "type": "archive", "first": 100}
        if cursor:
            params["after"] = cursor
        resp = requests.get(
            "https://api.twitch.tv/helix/videos",
            params=params,
            headers=headers,
            timeout=15,
        )
        resp.raise_for_status()
        body   = resp.json()
        batch  = body.get("data", [])
        vods.extend(batch)
        cursor = body.get("pagination", {}).get("cursor")
        if not cursor or not batch or len(vods) >= max_vods:
            break
    return vods[:max_vods]


# ── Matching logic ────────────────────────────────────────────────────────────

def parse_iso(s: str) -> datetime:
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


def best_vod_match(
    youtube_dt: datetime,
    vods: list[dict],
    window_sec: int = MATCH_WINDOW_SEC,
) -> dict | None:
    """Return the VOD whose created_at is closest to youtube_dt, within window."""
    best_vod  = None
    best_diff = window_sec + 1
    for vod in vods:
        try:
            vod_dt = parse_iso(vod["created_at"])
        except (KeyError, ValueError):
            continue
        diff = abs((youtube_dt - vod_dt).total_seconds())
        if diff < best_diff:
            best_diff = diff
            best_vod  = vod
    return best_vod


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    if not CLIENT_ID or not CLIENT_SECRET:
        print(
            "Error: TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET must be set.",
            file=sys.stderr,
        )
        sys.exit(1)

    if not LIVESTREAMS.exists():
        print(f"Error: {LIVESTREAMS} not found.", file=sys.stderr)
        sys.exit(1)

    data = json.loads(LIVESTREAMS.read_text())
    items: list[dict] = data.get("items", [])

    # Only process entries that don't already have a twitchVodId
    unmatched = [it for it in items if not it.get("twitchVodId")]
    if not unmatched:
        print("All entries already have a twitchVodId — nothing to do.")
        return

    print(f"Authenticating with Twitch…")
    token   = get_app_token()
    headers = twitch_headers(token)

    print(f"Fetching user ID for '{CHANNEL_LOGIN}'…")
    user_id = get_user_id(headers, CHANNEL_LOGIN)
    print(f"User ID: {user_id}")

    print("Fetching Twitch VODs…")
    vods = fetch_vods(headers, user_id)
    print(f"Retrieved {len(vods)} VODs.")

    matched = 0
    for item in unmatched:
        published_at = item.get("publishedAt", "")
        if not published_at:
            continue
        try:
            yt_dt = parse_iso(published_at)
        except ValueError:
            continue

        vod = best_vod_match(yt_dt, vods)
        if vod:
            item["twitchVodId"] = vod["id"]
            vod_dur = parse_twitch_duration(vod.get("duration", "0s"))
            diff    = int((yt_dt - parse_iso(vod["created_at"])).total_seconds())
            print(
                f"  Matched {item['videoId']} ← VOD {vod['id']}"
                f" (Δ {diff:+d}s, {vod_dur//3600}h{(vod_dur%3600)//60}m)"
            )
            matched += 1
        else:
            print(f"  No match within ±{MATCH_WINDOW_SEC//3600}h for {item['videoId']} ({published_at})")

    print(f"\nMatched {matched}/{len(unmatched)} unmatched entries.")

    LIVESTREAMS.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"Updated {LIVESTREAMS}")


if __name__ == "__main__":
    main()
