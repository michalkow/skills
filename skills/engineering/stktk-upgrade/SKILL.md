---
name: stktk-upgrade
description: Publish a new version of the stktk app, then run the upgrade.
disable-model-invocation: true
---

# stktk Upgrade

The **upgrade** is not done when `npm run publish` exits 0. It is done when `. ./bin/upgrade.sh` succeeds after that publish.

Typing `/stktk-upgrade` is the go-ahead. Do not ask again.

Keep Node 14.18.2 and whatever `mac.sh` exported in the **same shell** for every later step. `. ./bin/mac.sh` and `. ./bin/upgrade.sh` mean source — not a subshell.

## Steps

1. **Preconditions.** Working directory is the stktk repo root: `bin/mac.sh`, `bin/upgrade.sh`, and a `package.json` that defines `publish`. Done when all three hold. Stop and name whichever is missing.

2. **Node.** If `nvm` is not a shell function, source it (`export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"; . "$NVM_DIR/nvm.sh"`). Run `nvm use 14.18.2`. Done when `node -v` is `v14.18.2`. Missing nvm or that version: stop and name it. Do not install Node.

3. **mac.sh.** Run `. ./bin/mac.sh`. Done when it exits 0. Non-zero: show the output and stop.

4. **Commit.** `git status`. Clean: skip. Dirty: stage and commit the uncommitted work; message from the diff, matching the repo's style. Done when `git status` is clean. Do not push. A file that looks like a secret: stop and name it.

5. **Publish.** Run `npm run publish`. Needs network. Done when the command exits 0. Non-zero: show the output and stop. Do not run upgrade after a failed publish.

6. **Upgrade.** Run `. ./bin/upgrade.sh`. Needs network. Done when it exits 0. Non-zero: show the output and stop.

7. **Report** exactly one of:

   - **Upgraded** — node version, whether a commit landed (and its SHA), publish succeeded, upgrade succeeded.
   - **Stopped** — which step failed, and the output.
