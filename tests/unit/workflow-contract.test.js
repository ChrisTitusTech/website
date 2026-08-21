import { spawnSync } from "node:child_process";
import {
  access,
  chmod,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import YAML from "yaml";
import { afterEach, describe, expect, it } from "vitest";

import { isActiveWaiver } from "../../scripts/audit-policy.mjs";

const temporaryRoots = [];

async function workflow(name) {
  return YAML.parse(await readFile(`.github/workflows/${name}`, "utf8"));
}

function git(root, ...args) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
  return result.stdout.trim();
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots
      .splice(0)
      .map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe("workflow contracts", () => {
  it("isolates Astro preview state for containerized WebKit", async () => {
    const wrapper = await readFile("scripts/test-webkit.mjs", "utf8");
    const manifest = JSON.parse(await readFile("package.json", "utf8"));
    expect(wrapper).toContain('"--tmpfs"');
    expect(wrapper).toContain("/work/.astro:rw,notmpcopyup");
    expect(wrapper).toContain('"--user"');
    expect(wrapper).toContain("process.getuid?.()");
    expect(wrapper).toContain("process.getgid?.()");
    expect(wrapper).toContain("uid=${uid},gid=${gid}");
    expect(manifest.scripts["setup:browsers"]).toContain("webkit");
  });

  it("serializes, validates, and publishes livestream data directly to master", async () => {
    const data = await workflow("update-livestreams.yml");
    expect(data.concurrency).toMatchObject({
      group: "livestream-data-reconciliation",
      "cancel-in-progress": false,
    });
    expect(data.jobs["update-chat"].needs).toBe("update-livestreams");
    expect(data.jobs["validate-data"].needs).toBe("update-chat");
    expect(data.jobs["publish-master"].needs).toEqual([
      "update-livestreams",
      "update-chat",
      "validate-data",
    ]);
    expect(data.jobs["update-chat"].steps[0].with.ref).toContain(
      "needs.update-livestreams.outputs.sha",
    );
    expect(data.jobs["publish-master"].permissions).toEqual({
      contents: "write",
    });
    for (const job of Object.values(data.jobs)) {
      expect(job.environment).toBe("livestream-data-automation");
    }
    expect(data.jobs["update-livestreams"].if).toBeUndefined();
    expect(data.jobs["update-livestreams"].steps[0].run).toContain(
      'GITHUB_REF" == "refs/heads/master',
    );
    expect(data.jobs["reconcile-pull-request"]).toBeUndefined();
    expect(data.jobs["dispatch-checks"]).toBeUndefined();
    expect(JSON.stringify(data.jobs)).toContain("--require-hashes");
    expect(JSON.stringify(data.jobs)).toContain("requirements-automation.txt");
    const restoreSource = data.jobs["update-livestreams"].steps.find(
      (step) => step.name === "Restore or create managed branch",
    ).run;
    expect(restoreSource).not.toContain("resume");
    expect(restoreSource).not.toContain("livestream-data-final");
    expect(restoreSource).toContain('git reset --hard "$base_sha"');
    expect(data.jobs["update-chat"].if).toBeUndefined();
    const chatSource = JSON.stringify(data.jobs["update-chat"]);
    expect(chatSource).not.toContain("resume");
    expect(chatSource).not.toContain("livestream-data-final");
    expect(data.jobs["validate-data"].steps.map((step) => step.run)).toContain(
      "npm run build",
    );
    expect(data.jobs["validate-data"].steps.map((step) => step.run)).toContain(
      "npm run validate:routes",
    );
    const publishSource = data.jobs["publish-master"].steps[1].run;
    expect(publishSource).toContain(
      'git push origin "$FINAL_SHA:refs/heads/master"',
    );
    expect(publishSource).toContain('remote_master" != "$BASE_SHA');
    expect(publishSource).toContain("validate-bot-candidate.sh");
    await expect(access(".github/workflows/update-chat.yml")).rejects.toThrow();
  });

  it("rebuilds generated content while the Astro development server runs", async () => {
    const manifest = JSON.parse(await readFile("package.json", "utf8"));
    const source = await readFile("scripts/dev.mjs", "utf8");
    expect(manifest.scripts.dev).toBe("node scripts/dev.mjs");
    expect(manifest.scripts["dev:content"]).toContain("--preview");
    expect(source).toContain("await prepareContent()");
    expect(source).toContain('path.join(root, "content")');
    expect(source).toContain("watch(");
    expect(source).toContain('"--ignore-lock"');
    expect(source).toContain('ASTRO_DEV_BACKGROUND: "0"');
  });

  it("rejects malformed, incomplete, and expired audit waivers", () => {
    const valid = {
      scope: "development only",
      owner: "maintainers",
      rationale: "not on the exercised path",
      followUp: "upgrade the transitive package",
      expires: "2026-11-30",
    };
    expect(isActiveWaiver(valid, "2026-08-13")).toBe(true);
    expect(isActiveWaiver({ ...valid, expires: undefined }, "2026-08-13")).toBe(
      false,
    );
    expect(
      isActiveWaiver({ ...valid, expires: "not-a-date" }, "2026-08-13"),
    ).toBe(false);
    expect(
      isActiveWaiver({ ...valid, expires: "2026-02-30" }, "2026-08-13"),
    ).toBe(false);
    expect(
      isActiveWaiver({ ...valid, expires: "2026-08-12" }, "2026-08-13"),
    ).toBe(false);
    expect(isActiveWaiver({ ...valid, owner: "" }, "2026-08-13")).toBe(false);
  });

  it("requires a healthy direct publication run in the watchdog", async () => {
    const monitor = await workflow("monitor-data-workflow.yml");
    const source = monitor.jobs.monitor.steps[0].run;
    expect(source).toContain('$latest_head" == "master');
    expect(source).toContain("required_jobs");
    expect(source).toContain("latest_created");
    expect(source).toContain("latest_age_seconds <= 28800");
    expect(source).toContain('$latest_fresh" == "true');
    expect(source).toContain('$final_sha" == "$master_sha');
    expect(source).toContain("Publish livestream data to master");
    expect(source).not.toContain("ci_status");
    expect(source).toContain('gh issue list --repo "$GITHUB_REPOSITORY"');
    expect(source).toContain(
      'gh issue close "$issue_number" --repo "$GITHUB_REPOSITORY"',
    );
    expect(source).toContain('gh issue create --repo "$GITHUB_REPOSITORY"');
    expect(source).toContain(
      'gh issue comment "$issue_number" --repo "$GITHUB_REPOSITORY"',
    );
  });

  it("fails the audit gate on valid operational-error JSON", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "website-audit-error-"));
    temporaryRoots.push(root);
    const npm = path.join(root, "npm");
    await writeFile(
      npm,
      '#!/bin/sh\nprintf \'%s\\n\' \'{"error":{"summary":"registry unavailable"}}\'\nexit 1\n',
    );
    await chmod(npm, 0o755);
    const result = spawnSync("node", ["scripts/audit.mjs"], {
      encoding: "utf8",
      env: { ...process.env, PATH: `${root}:${process.env.PATH}` },
    });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("failed operationally");
    expect(result.stderr).toContain("registry unavailable");
  });

  it("runs CI only for pull requests and master pushes", async () => {
    const ci = await workflow("ci.yml");
    expect(ci.on.pull_request).toBeDefined();
    expect(ci.on.push.branches).toEqual(["master"]);
    expect(ci.on.workflow_dispatch).toBeUndefined();
    expect(ci.jobs["validate-dispatch"]).toBeUndefined();
  });

  it("uses an absolute TwitchDownloader executable path", async () => {
    const result = spawnSync(
      "python",
      [
        "-c",
        "import runpy; print(runpy.run_path('scripts/download-chat-replays.py')['DOWNLOADER'])",
      ],
      { encoding: "utf8" },
    );
    expect(result.status, result.stderr).toBe(0);
    expect(path.isAbsolute(result.stdout.trim())).toBe(true);
    expect(result.stdout.trim()).toBe(
      path.join(process.cwd(), "TwitchDownloaderCLI"),
    );
  });

  it("pins every third-party action to a full commit SHA", async () => {
    for (const name of ["ci.yml", "codeql.yml", "update-livestreams.yml"]) {
      const source = await readFile(`.github/workflows/${name}`, "utf8");
      for (const match of source.matchAll(/^\s*uses:\s*([^\s#]+)/gm)) {
        const reference = match[1];
        if (reference.startsWith("./")) continue;
        expect(reference, `${name}: ${reference}`).toMatch(/@[0-9a-f]{40}$/);
      }
    }
  });

  it("accepts generated data only and rejects other candidate paths", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "website-bot-candidate-"));
    temporaryRoots.push(root);
    await mkdir(path.join(root, "data"), { recursive: true });
    await cp(
      ".github/scripts/validate-bot-candidate.sh",
      path.join(root, "validate.sh"),
    );
    await writeFile(path.join(root, "data/livestreams.json"), "{}\n");
    await writeFile(path.join(root, "README.md"), "trusted source\n");
    git(root, "init", "-q");
    git(root, "config", "user.name", "Test");
    git(root, "config", "user.email", "test@example.invalid");
    git(root, "add", ".");
    git(root, "commit", "-qm", "base");
    const base = git(root, "rev-parse", "HEAD");
    await writeFile(
      path.join(root, "data/livestreams.json"),
      '{"updated":true}\n',
    );
    git(root, "add", "data/livestreams.json");
    git(root, "commit", "-qm", "generated");
    const generated = git(root, "rev-parse", "HEAD");
    expect(
      spawnSync(path.join(root, "validate.sh"), [base, generated], {
        cwd: root,
      }).status,
    ).toBe(0);
    await writeFile(path.join(root, "README.md"), "not generated\n");
    git(root, "add", "README.md");
    git(root, "commit", "-qm", "invalid");
    const invalid = git(root, "rev-parse", "HEAD");
    expect(
      spawnSync(path.join(root, "validate.sh"), [base, invalid], { cwd: root })
        .status,
    ).not.toBe(0);
    await rm(path.join(root, "README.md"));
    git(root, "add", "README.md");
    git(root, "commit", "-qm", "delete invalid path");
    const deleted = git(root, "rev-parse", "HEAD");
    expect(
      spawnSync(path.join(root, "validate.sh"), [base, deleted], { cwd: root })
        .status,
    ).not.toBe(0);

    git(root, "reset", "--hard", base);
    await mkdir(path.join(root, "public/chats"), { recursive: true });
    const executable = path.join(root, "public/chats/abcdef.json");
    await writeFile(executable, "{}\n");
    await chmod(executable, 0o755);
    git(root, "add", "public/chats/abcdef.json");
    git(root, "commit", "-qm", "executable generated path");
    expect(
      spawnSync(
        path.join(root, "validate.sh"),
        [base, git(root, "rev-parse", "HEAD")],
        { cwd: root },
      ).status,
    ).not.toBe(0);

    git(root, "reset", "--hard", base);
    await mkdir(path.join(root, "public/chats"), { recursive: true });
    await symlink(
      "../../../README.md",
      path.join(root, "public/chats/abcdef.json"),
    );
    git(root, "add", "public/chats/abcdef.json");
    git(root, "commit", "-qm", "symlink generated path");
    expect(
      spawnSync(
        path.join(root, "validate.sh"),
        [base, git(root, "rev-parse", "HEAD")],
        { cwd: root },
      ).status,
    ).not.toBe(0);

    git(root, "reset", "--hard", base);
    await mkdir(path.join(root, "public/chats/nested"), { recursive: true });
    await writeFile(path.join(root, "public/chats/nested/abcdef.json"), "{}\n");
    git(root, "add", "public/chats/nested/abcdef.json");
    git(root, "commit", "-qm", "nested generated path");
    expect(
      spawnSync(
        path.join(root, "validate.sh"),
        [base, git(root, "rev-parse", "HEAD")],
        { cwd: root },
      ).status,
    ).not.toBe(0);
  });
});
