# Infrastructure Setup Guide

Self-hosted community stack for christitus.com: Authentik SSO, Discourse forums, InspIRCd + The Lounge IRC, and Caddy reverse proxy.

```
infra/
├── authentik/          # Identity provider (SSO, OAuth, LDAP)
│   ├── docker-compose.yml
│   ├── .env.example
│   └── policies/       # Membership verification scripts (paste into Authentik UI)
│       ├── patreon-membership.py
│       ├── twitch-subscription.py
│       └── github-sponsors.py
├── discourse/          # Forum software
│   └── app.yml
├── irc/                # IRC server + web client
│   ├── docker-compose.yml
│   ├── inspircd/
│   │   └── inspircd.conf
│   └── thelounge/
│       └── config.js
└── caddy/              # Reverse proxy (TLS termination)
    └── Caddyfile
```

---

## Prerequisites

- A VPS with at least **4 vCPU / 8 GB RAM** (Hetzner CX32 ~$13/mo works well)
- Ubuntu 22.04 or 24.04 LTS
- A domain with DNS control — the following subdomains must point to the VPS IP:
  - `auth.christitus.com`
  - `forum.christitus.com`
  - `lounge.christitus.com`
  - `irc.christitus.com`
- **Do not** proxy these through Cloudflare (orange cloud) — use DNS-only (grey cloud).  
  `christitus.com` itself stays on Cloudflare Pages as normal.

---

## Step 1 — DNS configuration in Cloudflare

All four subdomains must resolve to your VPS **before** you deploy any services, so Caddy can obtain TLS certificates via the ACME HTTP challenge.

### 1a. Find your VPS IP address

```bash
# Run on the VPS after provisioning
curl -4 https://ifconfig.me
```

### 1b. Add DNS records in Cloudflare

Log into the [Cloudflare dashboard](https://dash.cloudflare.com), select the **christitus.com** zone, go to **DNS → Records**, and add the following:

| Type | Name | Content | Proxy status | TTL |
|------|------|---------|--------------|-----|
| `A` | `auth` | `YOUR_VPS_IP` | **DNS only** (grey cloud) | Auto |
| `A` | `forum` | `YOUR_VPS_IP` | **DNS only** (grey cloud) | Auto |
| `A` | `lounge` | `YOUR_VPS_IP` | **DNS only** (grey cloud) | Auto |
| `A` | `irc` | `YOUR_VPS_IP` | **DNS only** (grey cloud) | Auto |
| `SRV` | `_ircs._tcp` | `10 0 6697 irc.christitus.com` | — | Auto |

> **Why DNS-only (grey cloud)?**  
> Cloudflare's proxy (orange cloud) does not support raw TCP — it only proxies HTTP/S traffic. IRC uses raw TCP on port 6697, so the `irc` record must bypass the proxy entirely. For consistency and to let Caddy handle TLS directly, all four subdomains are set to DNS-only.

> **The SRV record** lets IRC clients auto-discover the TLS port when a user types `christitus.com` as the server name instead of the full `irc.christitus.com:6697`.

### 1c. (Optional) Use Cloudflare API to add records via CLI

If you prefer scripting this, use the Cloudflare API. Replace the placeholder values:

```bash
CF_TOKEN="YOUR_CLOUDFLARE_API_TOKEN"   # needs Zone:DNS:Edit permission
ZONE_ID="YOUR_ZONE_ID"                 # found on the christitus.com zone overview page
VPS_IP="YOUR_VPS_IP"

for SUBDOMAIN in auth forum lounge irc; do
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
    -H "Authorization: Bearer ${CF_TOKEN}" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"A\",\"name\":\"${SUBDOMAIN}\",\"content\":\"${VPS_IP}\",\"ttl\":1,\"proxied\":false}"
  echo " → added ${SUBDOMAIN}.christitus.com"
done

# SRV record for IRC client auto-discovery
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "SRV",
    "data": {
      "service":  "_ircs",
      "proto":    "_tcp",
      "name":     "christitus.com",
      "priority": 10,
      "weight":   0,
      "port":     6697,
      "target":   "irc.christitus.com"
    }
  }'
echo " → added SRV _ircs._tcp.christitus.com"
```

### 1d. Verify propagation before continuing

```bash
# Run locally or from the VPS — all four should return your VPS IP
dig +short auth.christitus.com
dig +short forum.christitus.com
dig +short lounge.christitus.com
dig +short irc.christitus.com

# Verify the SRV record
dig +short SRV _ircs._tcp.christitus.com
```

Do not proceed to Step 2 until all four A records resolve correctly. Caddy's ACME challenges will fail if DNS is not propagated.

---

## Step 2 — VPS baseline

```bash
# Update the system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
usermod -aG docker $USER
newgrp docker

# Install Caddy
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy

# Install Git (needed for Discourse bootstrap)
apt install -y git

# Open firewall ports
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (Caddy ACME challenge)
ufw allow 443/tcp   # HTTPS
ufw allow 6697/tcp  # IRC TLS
ufw enable
```

---

## Step 3 — Clone this repo onto the VPS

```bash
git clone https://github.com/ChrisTitusTech/website.git /opt/ctt
```

All paths below assume `/opt/ctt/infra/` as the working root.

---

## Step 4 — Caddy reverse proxy

```bash
cp /opt/ctt/infra/caddy/Caddyfile /etc/caddy/Caddyfile
systemctl enable --now caddy
systemctl reload caddy
```

Caddy will automatically obtain Let's Encrypt certificates for all four subdomains the first time each service comes online. No manual cert steps are needed.

> **IRC certs**: After Caddy issues the cert for `irc.christitus.com`, copy it to the InspIRCd cert directory. A cron job handles this (see Step 7).

---

## Step 5 — Authentik (Identity Provider)

Authentik is the central SSO hub. Deploy it first — everything else depends on it.

### 5a. Configure environment

```bash
cd /opt/ctt/infra/authentik
cp .env.example .env
```

Edit `.env` and fill in:

| Variable | What to set |
|---|---|
| `PG_PASS` | Strong random password (e.g. `openssl rand -hex 32`) |
| `AUTHENTIK_SECRET_KEY` | 50-character random string (e.g. `openssl rand -hex 25`) |
| `AUTHENTIK_EMAIL__*` | Amazon SES SMTP credentials — see comments in `.env.example` for field-by-field guidance. Generate SES SMTP credentials at **AWS Console → SES → SMTP Settings → Create SMTP credentials**. |
| `AUTHENTIK_LDAP_TOKEN` | Leave blank for now — fill in after Step 5g |

### 5b. Start Authentik

```bash
cd /opt/ctt/infra/authentik
docker compose pull
docker compose up -d
```

Wait ~60 seconds for the database to initialise, then visit:  
**https://auth.christitus.com/if/flow/initial-setup/**

Create the admin account.

### 5c. Register OAuth applications on each platform

You need a Client ID and Client Secret from each platform.

**Patreon**
1. Go to https://www.patreon.com/portal/registration/register-clients
2. Create a new client. Set the redirect URI to:  
   `https://auth.christitus.com/source/oauth2/patreon/callback`
3. Note the **Client ID** and **Client Secret**.
4. Required scopes: `identity identity[email] identity.memberships`

**Twitch**
1. Go to https://dev.twitch.tv/console/apps/create
2. Set the OAuth redirect URL to:  
   `https://auth.christitus.com/source/oauth2/twitch/callback`
3. Note the **Client ID** and **Client Secret**.
4. Required scope: `user:read:subscriptions`
5. Note your **numeric broadcaster ID** (not your username) — find it at  
   https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/

**GitHub**
1. Go to https://github.com/settings/applications/new
2. Set the authorization callback URL to:  
   `https://auth.christitus.com/source/oauth2/github/callback`
3. Note the **Client ID** and generate a **Client Secret**.
4. Required scope: `read:user`

### 5d. Add OAuth sources in Authentik

For each platform (Patreon, Twitch, GitHub), in the Authentik admin UI:

1. Go to **Admin → Directory → Federation & Social login → Create**
2. Choose the provider type (OAuth2/OpenID, use "Generic OAuth Source" for Patreon and Twitch; GitHub has a native source type)
3. Fill in the Client ID, Client Secret, and the platform's authorization/token/profile endpoints
4. Under **Flow settings**, set the **Authentication flow** to `default-source-authentication`

**Patreon endpoints:**
- Authorization: `https://www.patreon.com/oauth2/authorize`
- Token: `https://www.patreon.com/api/oauth2/token`
- Profile: `https://www.patreon.com/api/oauth2/v2/identity`

**Twitch endpoints:**
- Authorization: `https://id.twitch.tv/oauth2/authorize`
- Token: `https://id.twitch.tv/oauth2/token`
- Profile: `https://api.twitch.tv/helix/users`

**GitHub:** Use the built-in **GitHub OAuth Source** type — it pre-fills the endpoints.

### 5e. Add membership verification policies

These policies run after OAuth and handle two things:
- They **always return True** (any GitHub/Twitch/Patreon account can log in and use IRC).
- If the user is a paying subscriber, they are also added to the `members` group, which gates `/members/` on the website and member-only forum categories.

1. In Authentik Admin → **Customization → Policies → Create → Expression Policy**
2. Create one policy per platform:
   - Name `patreon-membership` — paste contents of `policies/patreon-membership.py`
   - Name `twitch-subscription` — paste contents of `policies/twitch-subscription.py`  
     Edit `BROADCASTER_ID` and `CLIENT_ID` at the top of the script
   - Name `github-sponsor` — paste contents of `policies/github-sponsors.py`
3. For each OAuth source, go to **Edit → Bindings** and bind the matching policy at Order 10

### 5f. Create the `members` group

1. **Admin → Directory → Groups → Create** → Name: `members`

The expression policies (Step 5e) call `pending_user.ak_groups.add()` directly, which writes to the database immediately. No additional User Write Stage is needed — group membership is fully handled by the policy binding.

### 5g. Create the LDAP outpost (for The Lounge IRC)

First, create an LDAP Provider and Application — the outpost needs an application to bind to.

**Create the LDAP Provider:**
1. **Admin → Applications → Providers → Create → LDAP Provider**
2. Name: `ldap-provider`
3. Base DN: `DC=christitus,DC=com`
4. Search group: select `members` (or leave blank to allow all users to authenticate)
5. Save

**Create the Application:**
1. **Admin → Applications → Applications → Create**
2. Name: `ldap`, Slug: `ldap`
3. Provider: select `ldap-provider`
4. Save

**Create the LDAP Outpost:**
1. **Admin → Applications → Outposts → Create**
2. Type: **LDAP**, Name: `ldap-outpost`
3. Under **Applications**, select `ldap`
4. After save, copy the **token** from the outpost detail page
5. Edit `/opt/ctt/infra/authentik/.env`, set `AUTHENTIK_LDAP_TOKEN=<token>`
6. Create the shared Docker network (only needed once):
   ```bash
   docker network create ctt-shared
   ```
7. `cd /opt/ctt/infra/authentik && docker compose up -d ldap` to start the LDAP container

### 5h. Create OIDC providers for Discourse and The Lounge

For each downstream app, create an OAuth2/OIDC Provider in Authentik:

1. **Admin → Applications → Providers → Create → OAuth2/OpenID Provider**
2. **Discourse provider:**
   - Name: `discourse`
   - Redirect URI: `https://forum.christitus.com/auth/oidc/callback`
   - Signing Key: select the default RS256 key
   - Scopes: `openid email profile groups`
   - Save, then open the provider detail page — the **Client ID** and **Client Secret** are shown at the top. Copy both for Step 6.
3. Repeat for **Thelounge** if you want OIDC login there (redirect URI: `https://lounge.christitus.com/auth/callback`)

Then create an Application for each:  
**Admin → Applications → Applications → Create** → link to the matching Provider.

> **Where are the credentials?** The **Client ID** is shown on the provider detail page. To find or regenerate the **Client Secret**, click **Edit** on the provider — the secret is in the edit form with a regenerate (↺) button beside it. Copy the secret before saving and closing the form.

---

## Step 6 — Discourse (Forums)

Discourse uses its own Docker launcher, not docker compose.

```bash
# Install discourse_docker
git clone https://github.com/discourse/discourse_docker.git /var/discourse
chmod 700 /var/discourse

# Copy our config
cp /opt/ctt/infra/discourse/app.yml /var/discourse/containers/app.yml
```

Edit `/var/discourse/containers/app.yml` and replace:

| Placeholder | Value |
|---|---|
| `REPLACE_WITH_SES_SMTP_USERNAME` | SES SMTP username (from AWS Console → SES → SMTP Settings → Create SMTP credentials) |
| `REPLACE_WITH_SES_SMTP_PASSWORD` | SES SMTP password (same credentials as Authentik's `AUTHENTIK_EMAIL__PASSWORD`) |
| `REPLACE_WITH_DISCOURSE_CLIENT_ID` | Client ID from Authentik Step 5h |
| `REPLACE_WITH_DISCOURSE_CLIENT_SECRET` | Client Secret from Authentik Step 5h |

Then build and start:

```bash
cd /var/discourse
./launcher bootstrap app   # takes ~10 minutes on first run
./launcher start app
```

After boot, visit **https://forum.christitus.com/admin** and:
1. Go to **Admin → Settings → Login**
2. Enable **discourse openid connect**
3. Optionally disable **enable local logins** so users must log in via Authentik

**Forum access model:**
- **Anonymous** — can read all public categories
- **Any Authentik user** (GitHub / Twitch / Patreon account, paid or not) — can post and reply in public categories
- **`members` group** — additionally gains access to the private **Members** category

To create the Members-only category:
1. **Admin → Categories → New Category** → Name: `Members`
2. Under **Security**, remove `everyone` and add only the `members` group with full permissions
3. All other categories should keep `everyone` readable and `trust_level_0` (logged-in users) able to reply

---

## Step 7 — IRC (InspIRCd + The Lounge)

### 7a. Create directories and set the oper password

```bash
mkdir -p /opt/ctt/infra/irc/inspircd/logs
mkdir -p /opt/ctt/infra/irc/certs
```

Generate an IRC oper password hash (run inside the container after first start, or use the Docker exec approach):

```bash
# Start the stack first (InspIRCd will error on missing cert, that's fine)
cd /opt/ctt/infra/irc
docker compose up -d inspircd

# Generate password hash
docker exec -it irc-inspircd-1 inspircd --mkpasswd hmac-sha256 'YourOperPassword'
```

Copy the output hash and paste it into `infra/irc/inspircd/inspircd.conf` at the `<oper password>` line.

Also replace `REPLACE_WITH_RANDOM_32_CHAR_KEY` in `inspircd.conf` with the output of:
```bash
openssl rand -hex 16
```

### 7b. Copy TLS cert from Caddy to InspIRCd

Caddy writes certs under `/var/lib/caddy/.local/share/caddy/certificates/`.  
Set up a daily cron to copy the renewed cert to the InspIRCd cert mount:

```bash
crontab -e
```

Add:
```cron
0 3 * * * cp /var/lib/caddy/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/irc.christitus.com/irc.christitus.com.crt /opt/ctt/infra/irc/certs/ && cp /var/lib/caddy/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/irc.christitus.com/irc.christitus.com.key /opt/ctt/infra/irc/certs/ && docker compose -f /opt/ctt/infra/irc/docker-compose.yml restart inspircd
```

### 7c. Configure The Lounge LDAP password

Edit `infra/irc/thelounge/config.js` and replace `REPLACE_WITH_SERVICE_ACCOUNT_PASSWORD` with the password of the Authentik service account created in Step 5g.

### 7d. Start the IRC stack

```bash
cd /opt/ctt/infra/irc
docker compose up -d
```

Verify:
```bash
# InspIRCd should be listening on 6697
docker compose logs inspircd | tail -20

# The Lounge web client should be on 9001 (proxied by Caddy)
docker compose logs thelounge | tail -20
```

### 7e. Verify the IRC SRV DNS record

The SRV record was added in Step 1b. Confirm it is live before telling users to connect:

```bash
dig +short SRV _ircs._tcp.christitus.com
# Expected output: 10 0 6697 irc.christitus.com.
```

This lets IRC clients auto-discover the TLS port when a user enters `christitus.com` as the network.

---

## Step 8 — Cloudflare Access (gate /members/ on the website)

This gates `christitus.com/members/*` so only verified subscribers can view it.

1. Log into the **Cloudflare Zero Trust dashboard** → https://one.dash.cloudflare.com
2. Go to **Settings → Authentication → Add new → OpenID Connect**
3. Fill in:
   - **Auth URL**: `https://auth.christitus.com/application/o/authorize/`
   - **Token URL**: `https://auth.christitus.com/application/o/token/`
   - **Certificate URL**: `https://auth.christitus.com/application/o/cloudflare-access/jwks/`
   - **Client ID / Secret**: from a new OIDC Provider you create in Authentik for Cloudflare (redirect URI: your Cloudflare team domain callback)
4. Go to **Access → Applications → Add an Application → Self-hosted**
   - Domain: `christitus.com`, Path: `/members/*`
   - Policy: **Include → OIDC Claims** → `groups` contains `members`

> Cloudflare Access is free for browser-based HTTPS apps at any user count. The 50-seat limit only applies to the WARP device agent — it does not affect website gating.

---

## Verification checklist

```
[ ] auth.christitus.com loads the Authentik login page
[ ] Log in with Patreon (non-patron) → login succeeds, can use IRC, no members group
[ ] Log in with Patreon (active patron) → login succeeds, added to members group
[ ] Log in with Twitch (non-subscriber) → login succeeds, can use IRC, no members group
[ ] Log in with Twitch (active subscriber) → login succeeds, added to members group
[ ] Log in with GitHub (non-sponsor) → login succeeds, can use IRC, no members group
[ ] Log in with GitHub (active sponsor) → login succeeds, added to members group
[ ] christitus.com/members/ → redirected to Authentik login, then through only with members group
[ ] forum.christitus.com → loads and is readable without login
[ ] Log in to forum with any platform account (non-subscriber) → can create topics and reply in public categories
[ ] Log in to forum with subscriber account (members group) → Members category is also visible
[ ] lounge.christitus.com → The Lounge loads, any Authentik user (GitHub/Twitch/Patreon) can log in
[ ] IRC client connecting to irc.christitus.com:6697 (TLS) → connects successfully
[ ] IRC client connecting to irc.christitus.com:6667 (plain) → refused (port not exposed)
```

---

## Maintenance

### Updating Authentik

```bash
cd /opt/ctt/infra/authentik
# Edit .env: bump AUTHENTIK_TAG to the new version
docker compose pull
docker compose up -d
```

Check https://goauthentik.io/docs/releases for upgrade notes before bumping major versions.

### Updating Discourse

```bash
cd /var/discourse
git pull
./launcher rebuild app
```

### Updating InspIRCd / The Lounge

```bash
cd /opt/ctt/infra/irc
docker compose pull
docker compose up -d
```

### Backups

Critical data to back up:

| Data | Location |
|---|---|
| Authentik database | `docker exec authentik-postgresql-1 pg_dump -U authentik authentik` |
| Discourse database | `/var/discourse/shared/standalone/postgres_data/` |
| The Lounge user data | Docker volume `irc_thelounge-data` |
| All `.env` files | `infra/authentik/.env` (never commit this to git) |
