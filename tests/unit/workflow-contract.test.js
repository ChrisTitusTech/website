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
    expect(wrapper).toContain('",notmpcopyup"');
    expect(wrapper).toContain('"--user"');
    expect(wrapper).toContain("process.getuid()");
    expect(wrapper).toContain("process.getgid()");
    expect(manifest.scripts["setup:browsers"]).toContain("webkit");
  });

  it("serializes data and chat before PR and CI reconciliation", async () => {
    const data = await workflow("update-livestreams.yml");
    expect(data.concurrency).toMatchObject({
      group: "livestream-data-reconciliation",
      "cancel-in-progress": false,
    });
    expect(data.jobs["update-chat"].needs).toBe("update-livestreams");
    expect(data.jobs["reconcile-pull-request"].needs).toBe("update-chat");
    expect(data.jobs["dispatch-checks"].needs).toBe("reconcile-pull-request");
    expect(data.jobs["update-chat"].steps[0].with.ref).toContain(
      "needs.update-livestreams.outputs.sha",
    );
    expect(data.jobs["dispatch-checks"].permissions).toEqual({
      actions: "write",
      contents: "read",
    });
    for (const job of Object.values(data.jobs)) {
      expect(job.environment).toBe("livestream-data-automation");
    }
    expect(data.jobs["update-livestreams"].if).toBeUndefined();
    expect(data.jobs["update-livestreams"].steps[0].run).toContain(
      'GITHUB_REF" == "refs/heads/master',
    );
    const dispatchSource = JSON.stringify(data.jobs["dispatch-checks"]);
    expect(dispatchSource).toContain("event=workflow_dispatch");
    expect(dispatchSource).toContain("data-check/");
    expect(JSON.stringify(data.jobs)).toContain("--require-hashes");
    expect(JSON.stringify(data.jobs)).toContain("requirements-automation.txt");
    const restoreSource = data.jobs["update-livestreams"].steps.find(
      (step) => step.name === "Restore or create managed branch",
    ).run;
    expect(restoreSource.indexOf("git config user.email")).toBeLessThan(
      restoreSource.indexOf("git rebase"),
    );
    expect(restoreSource).toContain(".merged_at != null");
    expect(restoreSource).toContain("base=master");
    expect(restoreSource).toContain('.base.ref == \\"master\\"');
    expect(restoreSource).toContain('git reset --hard "$base_sha"');
    expect(restoreSource).toContain("refs/tags/livestream-data-final");
    expect(restoreSource).toContain('checkpoint_sha" == "$previous_sha');
    expect(restoreSource).toMatch(
      /git merge-base --is-ancestor "\$base_sha" "\$previous_sha"; then\s+resume=true/,
    );
    expect(data.jobs["update-livestreams"].outputs.resume).toContain(
      "steps.branch.outputs.resume",
    );
    expect(data.jobs["update-chat"].if).toBeUndefined();
    const chatSource = JSON.stringify(data.jobs["update-chat"]);
    expect(chatSource).toContain(
      "needs.update-livestreams.outputs.resume != 'true'",
    );
    expect(chatSource).toContain("git tag -f livestream-data-final");
    expect(chatSource).toContain("steps.result.outputs.sha");
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

  it("requires a healthy master run and handles unchanged data in the watchdog", async () => {
    const monitor = await workflow("monitor-data-workflow.yml");
    const source = monitor.jobs.monitor.steps[0].run;
    expect(source).toContain('$latest_head" == "master');
    expect(source).toContain("required_jobs");
    expect(source).toContain("latest_created");
    expect(source).toContain("latest_age_seconds <= 28800");
    expect(source).toContain('$latest_fresh" == "true');
    expect(source).toContain('$final_sha" == "$master_sha');
    expect(source).toContain("not-required");
  });

  it("keeps the tag publisher outside the repository-wide branch bypass", async () => {
    const template = await readFile(
      ".github/repository-rules/branch-mutation.json.tmpl",
      "utf8",
    );
    expect(template).toContain('"include": ["~ALL"]');
    expect(template).toContain("GITHUB_ACTIONS_INTEGRATION_ID");
    expect(template).toContain("BRANCH_MAINTAINER_REPOSITORY_ROLE_ID");
    expect(template).not.toContain("DATA_CHECK_TAG_APP_INTEGRATION_ID");
    for (const type of ["creation", "update", "deletion"])
      expect(template).toContain(`"type": "${type}"`);
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

  it("keeps tag publication on trusted master with a protected App credential", async () => {
    const publisher = await workflow("publish-data-check-tag.yml");
    const job = publisher.jobs.publish;
    expect(job.environment).toBe("data-check-tag-publisher");
    expect(job.permissions).toBeUndefined();
    expect(publisher.permissions).toEqual({
      actions: "write",
      contents: "read",
    });
    expect(job.steps[1].with.ref).toBe("master");
    expect(job.if).toBeUndefined();
    expect(job.steps[0].run).toContain('GITHUB_REF" == "refs/heads/master');
    expect(JSON.stringify(job)).toContain("permission-contents");
    expect(JSON.stringify(job)).toContain("data-check/");
  });

  it("requires exact bot inputs for every manual CI dispatch", async () => {
    const ci = await workflow("ci.yml");
    expect(ci.on.workflow_dispatch.inputs.ref.required).toBe(true);
    expect(ci.on.workflow_dispatch.inputs.expected_sha.required).toBe(true);
    expect(ci.jobs["validate-dispatch"].steps[1].if).toBe(
      "github.event_name == 'workflow_dispatch'",
    );
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
    for (const name of [
      "ci.yml",
      "codeql.yml",
      "publish-data-check-tag.yml",
      "update-livestreams.yml",
    ]) {
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
    await mkdir(path.join(root, "static/chats"), { recursive: true });
    const executable = path.join(root, "static/chats/abcdef.json");
    await writeFile(executable, "{}\n");
    await chmod(executable, 0o755);
    git(root, "add", "static/chats/abcdef.json");
    git(root, "commit", "-qm", "executable generated path");
    expect(
      spawnSync(
        path.join(root, "validate.sh"),
        [base, git(root, "rev-parse", "HEAD")],
        { cwd: root },
      ).status,
    ).not.toBe(0);

    git(root, "reset", "--hard", base);
    await mkdir(path.join(root, "static/chats"), { recursive: true });
    await symlink(
      "../../../README.md",
      path.join(root, "static/chats/abcdef.json"),
    );
    git(root, "add", "static/chats/abcdef.json");
    git(root, "commit", "-qm", "symlink generated path");
    expect(
      spawnSync(
        path.join(root, "validate.sh"),
        [base, git(root, "rev-parse", "HEAD")],
        { cwd: root },
      ).status,
    ).not.toBe(0);

    git(root, "reset", "--hard", base);
    await mkdir(path.join(root, "static/chats/nested"), { recursive: true });
    await writeFile(path.join(root, "static/chats/nested/abcdef.json"), "{}\n");
    git(root, "add", "static/chats/nested/abcdef.json");
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
