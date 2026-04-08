# Authentik Expression Policy — GitHub Sponsor Check
#
# Where to add this in Authentik:
#   Admin UI → Policies → Create → Expression Policy
#   Name: "github-sponsor"
#
# Bind to the GitHub OAuth Source's Authentication Flow (Order 10).
#
# Behaviour:
#   - ALL GitHub users are allowed to log in and use IRC.
#   - Active GitHub Sponsors are additionally added to the "members" group,
#     which gates /members/ on the website and member-only forum categories.
#
# Required GitHub OAuth scopes on your GitHub app:
#   read:user#
import requests
from authentik.core.models import Group

CREATOR_LOGIN = "ChrisTitusTech"

source_conn = request.context.get("source_connection", {})
token = getattr(source_conn, "access_token", None)

if not token:
    # Can't verify — allow login but don't grant member access
    return True

query = """
query {
  viewer {
    isSponsoredBy(accountLogin: "%s")
  }
}
""" % CREATOR_LOGIN

try:
    resp = requests.post(
        "https://api.github.com/graphql",
        json={"query": query},
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
        timeout=8,
    )
except requests.exceptions.RequestException:
    return True

if resp.status_code != 200:
    return True

data = resp.json()

if data.get("errors"):
    ak_logger.warning("GitHub GraphQL errors: %s", data["errors"])
    return True

is_sponsored = data.get("data", {}).get("viewer", {}).get("isSponsoredBy", False)

if is_sponsored:
    members_group, _ = Group.objects.get_or_create(name="members")
    pending_user = request.context.get("pending_user")
    if pending_user:
        pending_user.ak_groups.add(members_group)

# All GitHub users may log in regardless of sponsor status
return True
