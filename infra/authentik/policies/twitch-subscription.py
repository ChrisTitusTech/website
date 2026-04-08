# Authentik Expression Policy — Twitch Subscription Check
#
# Where to add this in Authentik:
#   Admin UI → Policies → Create → Expression Policy
#   Name: "twitch-subscription"
#
# Bind to the Twitch OAuth Source's Authentication Flow (Order 10).
#
# Behaviour:
#   - ALL Twitch users are allowed to log in and use IRC.
#   - Active channel subscribers are additionally added to the "members" group,
#     which gates /members/ on the website and the Members forum category.
#
# Required Twitch OAuth scopes on your Twitch app:
#   user:read:subscriptions
#
# Before deploying, replace:
#   BROADCASTER_ID  — your numeric Twitch user ID (not username).
#                     Find it at: https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/
#   CLIENT_ID       — your Twitch application's Client ID from dev.twitch.tv

import requests
from authentik.core.models import Group

BROADCASTER_ID = "YOUR_NUMERIC_TWITCH_USER_ID"   # e.g. "12345678"
CLIENT_ID      = "YOUR_TWITCH_APP_CLIENT_ID"

source_conn = request.context.get("source_connection", {})
token = getattr(source_conn, "access_token", None)

if not token:
    # Can't verify — allow login but don't grant member access
    return True

# Step 1: get the authenticated user's Twitch numeric ID
try:
    me_resp = requests.get(
        "https://api.twitch.tv/helix/users",
        headers={
            "Authorization": f"Bearer {token}",
            "Client-Id": CLIENT_ID,
        },
        timeout=8,
    )
except requests.exceptions.RequestException:
    return True

if me_resp.status_code != 200:
    return True

users_data = me_resp.json().get("data", [])
if not users_data:
    return True

user_id = users_data[0]["id"]

# Step 2: check subscription to your channel
try:
    sub_resp = requests.get(
        "https://api.twitch.tv/helix/subscriptions/user",
        params={
            "broadcaster_id": BROADCASTER_ID,
            "user_id": user_id,
        },
        headers={
            "Authorization": f"Bearer {token}",
            "Client-Id": CLIENT_ID,
        },
        timeout=8,
    )
except requests.exceptions.RequestException:
    return True

# 200 with data = active subscriber; 404 = not subscribed
if sub_resp.status_code == 200 and sub_resp.json().get("data"):
    members_group, _ = Group.objects.get_or_create(name="members")
    pending_user = request.context.get("pending_user")
    if pending_user:
        pending_user.ak_groups.add(members_group)

# All Twitch users may log in regardless of subscription status
return True
