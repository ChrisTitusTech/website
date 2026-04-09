"use strict";

// The Lounge configuration for lounge.christitus.com
// Full option reference: https://thelounge.chat/docs/configuration

module.exports = {
  // -------------------------------------------------------------------------
  // Network binding — Caddy reverse-proxies; The Lounge binds localhost only
  // -------------------------------------------------------------------------
  host: "0.0.0.0",
  port: 9000,

  // TLS is handled by Caddy; disable it here
  https: {
    enable: false,
    key: "",
    certificate: "",
    ca: "",
  },

  // -------------------------------------------------------------------------
  // Instance settings
  // -------------------------------------------------------------------------
  // public: false means users must log in (private instance)
  public: false,

  // Trust the X-Forwarded-For header when behind Caddy
  reverseProxy: true,

  // Keep up to 10,000 messages per channel in memory
  maxHistory: 10000,

  // -------------------------------------------------------------------------
  // Authentication — LDAP via Authentik LDAP outpost
  //
  // Setup in Authentik:
  //   1. Admin → Outposts → Create → Type: LDAP
  //   2. Assign the "members" group to restrict access to subscribers only
  //   3. Note the LDAP bind DN and port (default: 3389 via Docker, or 636 TLS)
  //   4. Create a service account for The Lounge to search the directory
  //
  // The Lounge LDAP auth uses the user's cn (common name, = Authentik username)
  // as their IRC nickname seed. Users authenticate with their Authentik password.
  // -------------------------------------------------------------------------
  ldap: {
    enable: true,

    // Connect to Authentik LDAP outpost (same host, internal docker network
    // if co-located, or auth.christitus.com if on a separate VPS)
    url: "ldap://authentik-ldap:3389",

    // These match Authentik's LDAP outpost base DN
    baseDN: "DC=christitus,DC=com",

    // Service account created in Authentik for directory searches
    // Admin → Directory → Users → Create service account → note DN
    primaryKey: "cn",

    searchDN: {
      rootDN:       "cn=ldapservice,DC=christitus,DC=com",
      rootPassword: "REPLACE_WITH_SERVICE_ACCOUNT_PASSWORD",

      // Allow any user authenticated via GitHub, Twitch, or Patreon.
      // Paid subscribers also get the "members" group, but IRC itself is
      // open to everyone who has an account on any of the three platforms.
      filter: "(objectClass=user)",
      base:   "DC=christitus,DC=com",
      scope:  "sub",
    },

    tlsOptions: {},
  },

  // -------------------------------------------------------------------------
  // Default network — pre-configured to connect to local InspIRCd
  //
  // Users can add more networks freely; this just sets a sensible default.
  // -------------------------------------------------------------------------
  defaults: {
    name:    "ChrisTitusTech IRC",
    host:    "inspircd",           // Docker service name resolves internally
    port:    6667,                 // Plain connection inside Docker network
    tls:     false,
    rejectUnauthorized: false,
    nick:    "",                   // Populated from LDAP username at login
    username: "",
    realname: "",
    join:    "#general,#tech",
  },

  // -------------------------------------------------------------------------
  // Themes / UX
  // -------------------------------------------------------------------------
  theme:   "default",
  prefetch: true,          // Fetch link previews
  prefetchStorage: false,
  prefetchMaxImageSize: 2048,
};
