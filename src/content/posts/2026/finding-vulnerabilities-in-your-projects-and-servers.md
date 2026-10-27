---
title: "Finding Vulnerabilities in Your Projects and Servers"
date: "2026-10-26"
url: /finding-vulnerabilities-in-your-projects-and-servers/
categories:
  - "Development"
  - "Linux"
tags:
  - Security
draft: true
---

Your project builds. Your server runs. That doesn't mean either is secure. Here are practical ways to find vulnerabilities before someone else does.

<!--more-->

## Secure the Network First

Good networking can add real protection to even an insecure system. If a service doesn't need outside access, don't give it any. Block unsolicited inbound traffic, remove unnecessary port forwards, and isolate vulnerable devices on a separate network with firewall rules that restrict who can reach them.

That old machine is harder to attack when the internet and your other devices can't talk to it. Isolation doesn't patch vulnerabilities, though. Malware, compromised allowed devices, and connections initiated from inside can still create a way in. Limit outbound access too, and keep patching what you can.

## Scan the Project

[Trivy](https://trivy.dev/docs/latest/target/filesystem/) checks supported dependencies for known vulnerabilities, configuration files for insecure settings, and files for exposed secrets. Install the tools from their official documentation, then run project scans from your repository root.

```bash
trivy fs --scanners vuln,misconfig,secret .
```

Read the affected package, installed version, and fixed version. A dependency finding needs investigation: is the vulnerable feature actually used or reachable?

## Check Your Code

Updated dependencies won't fix an SQL query built from raw user input. [Semgrep](https://semgrep.dev/docs/getting-started/cli) scans source code for suspicious patterns using rules for supported languages.

```bash
semgrep scan --config auto
```

Review each match. Automated rules can miss bugs and flag safe code. Pay particular attention to authentication, permissions, and anything that executes commands.

## Find Leaked Secrets

Deleting a password from today's code doesn't remove it from yesterday's commit. [Gitleaks](https://github.com/gitleaks/gitleaks) checks both Git history and files on disk:

```bash
gitleaks git --redact .
gitleaks dir --redact .
```

Scan a full clone; shallow history limits what it can inspect. If you find a real exposed credential, revoke or rotate it first. Deleting the file is NOT enough.

## Scan What You Deploy

Your container can ship vulnerable operating system packages even when your application dependencies are clean. Scan the actual image you deploy with [Trivy's image scanner](https://trivy.dev/docs/latest/target/container_image/):

```bash
# Replace myapp:release with your built image tag or digest
trivy image --scanners vuln myapp:release
```

For the Linux host itself, [Lynis](https://cisofy.com/lynis/) audits system configuration and suggests hardening improvements:

```bash
sudo lynis audit system
```

Review its warnings alongside your distribution's security updates. A hardening suggestion is not automatically an exploitable vulnerability.

## Check Network Exposure

From another machine, use [Nmap](https://nmap.org/book/man-version-detection.html) to identify exposed services. Replace the example address with a server you own or have permission to scan.

```bash
nmap -sV 192.168.1.10
```

This checks common TCP ports and probes service versions; it is not a complete vulnerability audit. Investigate unexpected services and check vendor advisories. An open port alone doesn't prove a vulnerability.

## Test What Scanners Miss

Use two test accounts in staging. Can one account read or change the other's data by changing an ID in a request? Can a normal user call an administrator endpoint? These permission bugs can survive every scan above.

## Let a Hosted Scanner Handle It

Want checks built into your workflow? Connect your repository or cloud account to a hosted service:

| Service | What it checks |
| --- | --- |
| [GitHub CodeQL](https://github.com/github/codeql-action) | Source code for security flaws, with results in GitHub code scanning. A practical starting point for projects already on GitHub. |
| [CodeRabbit Security](https://docs.coderabbit.ai/security) | PR security reviews plus a separately billed Deep Scan of committed code and infrastructure configuration for vulnerabilities and exposed secrets. Keep a dependency scanner alongside it. |
| [Snyk](https://docs.snyk.io/whats-snyk) | Separate products cover source code, open-source dependencies, container images, and infrastructure configuration. |
| [Wiz](https://www.wiz.io/academy/vulnerability-management/cloud-vulnerability-management) | Cloud workloads and configuration, prioritizing vulnerabilities using context such as exposure and permissions. Useful when the environment is bigger than one server. |

Pick coverage that matches what you run. Check repository access and plan limits before connecting, then review the findings. Paying for a scanner doesn't fix anything by itself.

## Make It Routine

Run project scans on pull requests and rescan deployed images regularly as new vulnerabilities are disclosed. Prioritize exposed credentials and reachable, exploitable flaws. Patch, test, and scan again.

A green report is useful. It is never proof that everything is secure.
