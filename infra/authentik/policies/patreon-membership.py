# Authentik Expression Policy — Patreon Membership Check
#
# Where to add this in Authentik:
#   Admin UI → Policies → Create → Expression Policy
#   Name: "patreon-membership"
#
# Bind it to the Patreon OAuth Source's Authentication Flow:
#   Admin UI → Sources → Patreon → Edit → Authentication Flow
#   Add a Policy Binding → select this policy → Order 10
#
# Behaviour:
#   - ALL Patreon users are allowed to log in and use IRC.
#   - Active patrons are additionally added to the "members" group,
#     which gates /members/ on the website and the Members forum category.
#
# Required Patreon OAuth scopes on your Patreon app:
#   identity  identity[email]  identity.memberships

import requests
from authentik.core.models import Group

source_conn = request.context.get("source_connection", {})
token = getattr(source_conn, "access_token", None)

if not token:
    # Can't verify — allow login but don't grant member access
    return True

try:
    resp = requests.get(
        "https://www.patreon.com/api/oauth2/v2/identity",
        params={
            "include": "memberships",
            "fields[member]": "patron_status,currently_entitled_amount_cents",
        },
        headers={"Authorization": f"Bearer {token}"},
        timeout=8,
    )
except requests.exceptions.RequestException:
    # Network error — allow login, skip group assignment
    return True

if resp.status_code != 200:
    return True

data = resp.json()
included = data.get("included", [])
is_active_patron = any(
    item.get("type") == "member"
    and item.get("attributes", {}).get("patron_status") == "active_patron"
    for item in included
)

if is_active_patron:
    members_group, _ = Group.objects.get_or_create(name="members")
    pending_user = request.context.get("pending_user")
    if pending_user:
        pending_user.ak_groups.add(members_group)

# All Patreon users may log in regardless of patron status
return True
