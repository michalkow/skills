#!/usr/bin/env node
/**
 * Copy skills from this repo into the Cursor user Agent Store so they
 * sync as global skills via Cursor Cloud.
 *
 * Usage:
 *   pnpm sync
 *   pnpm sync -- --dry-run
 *
 * Override the destination with CURSOR_SKILLS_DIR if discovery fails.
 * Extra skills already in the store (not in this repo) are left alone.
 * The deprecated/ bucket is skipped.
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

function findUserSkillsDir() {
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

function copySkill(src, dest) {
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(src, dest, {
    recursive: true,
    filter: (from) => path.basename(from) !== ".DS_Store",
  });
  const skillFile = path.join(dest, "SKILL.md");
  fs.writeFileSync(skillFile, ensureGlobalTrue(fs.readFileSync(skillFile, "utf8")));
}

const destRoot = findUserSkillsDir();
if (!dryRun) {
  fs.mkdirSync(destRoot, { recursive: true });
}

const skills = listRepoSkills();
if (skills.length === 0) {
  fail(`No skills with SKILL.md found under ${bucketsRoot}`);
}

console.log(`${dryRun ? "Would copy" : "Copying"} ${skills.length} skills → ${destRoot}`);

for (const skill of skills) {
  const dest = path.join(destRoot, skill.name);
  console.log(`  ${skill.bucket}/${skill.name}`);
  if (!dryRun) copySkill(skill.src, dest);
}

const repoNames = new Set(skills.map((skill) => skill.name));
const extras = fs
  .readdirSync(destRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !repoNames.has(entry.name))
  .map((entry) => entry.name)
  .sort();

if (extras.length > 0) {
  console.log(`Left untouched (${extras.length}): ${extras.join(", ")}`);
}
