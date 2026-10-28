#!/usr/bin/env node
/**
 * Sync skills from this repo into each local harness:
 *   - ~/.claude/skills: Claude Code (symlinks)
 *   - ~/.agents/skills: Codex (symlinks)
 *   - Cursor Agent Store: copies with `global: true` for Cursor Cloud
 *
 * Usage:
 *   pnpm sync
 *   pnpm sync -- --dry-run
 *
 * Override destinations with CLAUDE_SKILLS_DIR, AGENTS_SKILLS_DIR, or
 * CURSOR_SKILLS_DIR if discovery fails. Extra skills already in a
 * destination (not in this repo) are left alone. The deprecated/ bucket
 * is skipped.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SKIP_BUCKETS = new Set(["deprecated"]);
const dryRun = process.argv.includes("--dry-run");

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bucketsRoot = path.join(repoRoot, "skills");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function homeSkillsDir(envName, ...segments) {
  if (process.env[envName]) {
    return path.resolve(process.env[envName]);
  }
  return path.join(os.homedir(), ...segments);
}

function findCursorSkillsDir() {
  if (process.env.CURSOR_SKILLS_DIR) {
    return path.resolve(process.env.CURSOR_SKILLS_DIR);
  }

  const storesRoot = path.join(
    os.homedir(),
    "Library/Application Support/Cursor/AgentStores/cursor_agent_stores",
  );
  if (!fs.existsSync(storesRoot)) {
    fail(
      `Cursor Agent Store not found at ${storesRoot}. Set CURSOR_SKILLS_DIR to your user store's skills/ directory.`,
    );
  }

  const userStores = fs
    .readdirSync(storesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^u\d+$/.test(entry.name))
    .map((entry) => entry.name);

  const withSkills = userStores.filter((name) =>
    fs.existsSync(path.join(storesRoot, name, "files", "skills")),
  );
  const candidates = withSkills.length > 0 ? withSkills : userStores;

  if (candidates.length === 0) {
    fail(
      `No user Agent Store (u*) under ${storesRoot}. Set CURSOR_SKILLS_DIR.`,
    );
  }
  if (candidates.length > 1) {
    fail(
      `Multiple user Agent Stores: ${candidates.join(", ")}. Set CURSOR_SKILLS_DIR to the skills/ directory you want.`,
    );
  }

  return path.join(storesRoot, candidates[0], "files", "skills");
}

function listRepoSkills() {
  const skills = [];
  for (const bucket of fs.readdirSync(bucketsRoot, { withFileTypes: true })) {
    if (!bucket.isDirectory() || SKIP_BUCKETS.has(bucket.name)) continue;
    const bucketDir = path.join(bucketsRoot, bucket.name);
    for (const entry of fs.readdirSync(bucketDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const src = path.join(bucketDir, entry.name);
      if (!fs.existsSync(path.join(src, "SKILL.md"))) continue;
      skills.push({ bucket: bucket.name, name: entry.name, src });
    }
  }
  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function ensureGlobalTrue(content) {
  const nl = content.includes("\r\n") ? "\r\n" : "\n";
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    return `---${nl}global: true${nl}---${nl}${content}`;
  }
  if (/^global:\s*true\s*$/m.test(match[1])) return content;
  const frontmatter = match[1].replace(/[ \t]+$/gm, "").replace(/\s+$/, "");
  return `---${nl}${frontmatter}${nl}global: true${nl}---${nl}${content.slice(match[0].length)}`;
}

function rmIfExists(dest) {
  try {
    fs.lstatSync(dest);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  fs.rmSync(dest, { recursive: true, force: true });
}

function copySkill(src, dest) {
  rmIfExists(dest);
  fs.cpSync(src, dest, {
    recursive: true,
    filter: (from) => path.basename(from) !== ".DS_Store",
  });
  const skillFile = path.join(dest, "SKILL.md");
  fs.writeFileSync(skillFile, ensureGlobalTrue(fs.readFileSync(skillFile, "utf8")));
}

function linkSkill(src, dest) {
  rmIfExists(dest);
  fs.symlinkSync(src, dest);
}

function assertDestNotInsideRepo(destRoot) {
  try {
    if (!fs.lstatSync(destRoot).isSymbolicLink()) return;
    const resolved = fs.realpathSync(destRoot);
    if (resolved === repoRoot || resolved.startsWith(repoRoot + path.sep)) {
      fail(
        `error: ${destRoot} is a symlink into this repo (${resolved}).\nRemove it (rm "${destRoot}") and re-run; the script will recreate it as a real dir.`,
      );
    }
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
}

function listExtras(destRoot, repoNames) {
  if (!fs.existsSync(destRoot)) return [];
  return fs
    .readdirSync(destRoot, { withFileTypes: true })
    .filter((entry) => {
      if (repoNames.has(entry.name)) return false;
      if (entry.isDirectory()) return true;
      if (entry.isSymbolicLink()) {
        try {
          return fs.statSync(path.join(destRoot, entry.name)).isDirectory();
        } catch {
          return true;
        }
      }
      return false;
    })
    .map((entry) => entry.name)
    .sort();
}

function syncDestination(dest, skills) {
  if (dest.mode === "link") {
    assertDestNotInsideRepo(dest.root);
  }
  if (!dryRun) {
    fs.mkdirSync(dest.root, { recursive: true });
  }

  const action =
    dest.mode === "copy"
      ? dryRun
        ? "would copy"
        : "copied"
      : dryRun
        ? "would link"
        : "linked";
  console.log(`${dest.name}: ${action} → ${dest.root}`);

  for (const skill of skills) {
    const target = path.join(dest.root, skill.name);
    if (dryRun) continue;
    if (dest.mode === "copy") {
      copySkill(skill.src, target);
    } else {
      linkSkill(skill.src, target);
    }
  }

  const extras = listExtras(
    dest.root,
    new Set(skills.map((skill) => skill.name)),
  );
  if (extras.length > 0) {
    console.log(`  Left untouched (${extras.length}): ${extras.join(", ")}`);
  }
}

const skills = listRepoSkills();
if (skills.length === 0) {
  fail(`No skills with SKILL.md found under ${bucketsRoot}`);
}

console.log(`${dryRun ? "Would sync" : "Syncing"} ${skills.length} skills`);
for (const skill of skills) {
  console.log(`  ${skill.bucket}/${skill.name}`);
}

const destinations = [
  {
    name: "Claude Code",
    root: homeSkillsDir("CLAUDE_SKILLS_DIR", ".claude", "skills"),
    mode: "link",
  },
  {
    name: "Codex",
    root: homeSkillsDir("AGENTS_SKILLS_DIR", ".agents", "skills"),
    mode: "link",
  },
  {
    name: "Cursor",
    root: findCursorSkillsDir(),
    mode: "copy",
  },
];

for (const dest of destinations) {
  syncDestination(dest, skills);
}
