## What it does

`stktk-upgrade` ships a new version of the stktk app: Node 14.18.2, `bin/mac.sh`, a clean git tree, `npm run publish`, then `bin/upgrade.sh`. It does not treat a zero exit from publish as success. The run is done when the **upgrade** script succeeds after that publish — or when it can name why that is not true.

## When to reach for it

You invoke this by typing `/stktk-upgrade` — the [agent](https://michalkow.github.io/skills/dictionary/agent) won't reach for it on its own. Typing it is the go-ahead; it will not ask again.

| Your situation | Reach for |
| --- | --- |
| This working tree should be the live stktk version | `/stktk-upgrade` |
| nvm or Node 14.18.2 is missing | [wizard](https://michalkow.github.io/skills/wizard), or do that setup yourself |
| You want a Fly.io app healthy | [app-deploy](https://michalkow.github.io/skills/app-deploy) |
| The code is not the code you want published | [implement](https://michalkow.github.io/skills/implement) first |

## Prerequisites

You must be in the stktk repo root: `bin/mac.sh`, `bin/upgrade.sh`, and a `publish` script in `package.json`. `nvm` must be able to select Node 14.18.2. If any of those are missing it stops and names which, rather than installing Node or creating the scripts.

## Upgrade is the done signal

`npm run publish` returning 0 means the package went out, not that the app has been upgraded. The [skill](https://michalkow.github.io/skills/dictionary/skill)'s last step is sourcing `bin/upgrade.sh` in the same shell that already has Node 14.18.2 and whatever `mac.sh` exported. **Upgraded** is that script exiting 0.

A dirty git tree is committed before publish — typing the command is the go-ahead for that commit. A failed publish never runs upgrade.

## Common questions

**Does a successful `npm run publish` mean the upgrade is done?**

No. That is the whole point of the skill. Publish can exit 0 while `upgrade.sh` has not run. The run reports **Upgraded** only after that script succeeds.

**Will it commit my uncommitted files without asking?**

Yes. A clean tree skips the commit; a dirty one is committed before publish. It will not push. A file that looks like a secret stops the run instead.

## It's working if

- You typed `/stktk-upgrade`. It did not fire because you mentioned stktk in passing.
- `node -v` is `v14.18.2` before `mac.sh`, publish, and upgrade.
- A dirty tree becomes a commit before `npm run publish`.
- **Upgraded** only appears after `. ./bin/upgrade.sh` exits 0.
- A failed publish is **Stopped**, and `upgrade.sh` is not run.

## Where it fits

`stktk-upgrade` is a reach-for-it-anytime standalone. It sits after the code is the code you want live, not inside the build chain.

Its neighbours are [implement](https://michalkow.github.io/skills/implement), which produces that code; [app-deploy](https://michalkow.github.io/skills/app-deploy), which is the Fly path for a different app; and [wizard](https://michalkow.github.io/skills/wizard), which is how nvm or Node gets set up when the preconditions are missing. [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you over the whole set.
