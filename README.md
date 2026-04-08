# Craft

**The review process layer for engineering teams.**

---

## The problem

Code review is the most important moment in software development, it's where quality is decided, knowledge is shared, and teams either move fast or get stuck. But nobody has ever built a real product for it.

GitHub gives you a diff viewer with a comment box. That's not a workflow, that's a file viewer.

The result: PRs sit for days with no feedback. Reviewers leave 40 comments with no indication of what's actually blocking the merge. Authors send "PTAL" into the void and wait. Engineering leads have no visibility into where things are slowing down.

Teams aren't bad at code review because they don't care. They're bad at it because no product has ever given them a real process.

**Craft is that product.**

---

## What Craft does differently

The unit of work in Craft is not a pull request. It is a **Change** — an intent to ship something, with structured context, clear ownership, typed feedback, and a defined path to done.

### The Change Brief
Every Change starts with structured context — not a freeform text box. What changed, why it exists, how to verify it, and the risk level. Written by the author, readable by the reviewer in two minutes. No more cold reviews. No more "can you explain what this does" comments.

### Typed feedback
Comments in Craft have a type: **Blocker**, **Suggestion**, **Nit**, or **Question**. Only Blockers gate the merge. Authors get a clear action list — not a wall of threads to triage. Reviewers give feedback that means something.

### Structured verdicts
Not just approve or request changes. Craft has four verdicts: **Ship it**, **Fix and merge**, **Needs re-review**, and **Rethink**. Each one triggers the right next step automatically. No ambiguity about what happens after a review.

### The queue
Reviewers open Craft and see exactly what needs them — ordered by wait time and risk level. No notification triage, no GitHub inbox archaeology. Just the work, in the right order.

### Cycle time visibility
Craft tracks every Change from ready to shipped. Which areas of the codebase are review bottlenecks? Which authors are growing? Where is the team slowing down? This data doesn't exist anywhere today. Craft builds it passively.

---

## How it works

Craft sits on top of GitHub. Your code stays where it is. Craft owns the process around it.

```
Developer opens a PR on GitHub
          ↓
Craft creates a Change automatically
          ↓
Author fills the Change Brief (auto-drafted, editable)
          ↓
Craft routes it to the right reviewer
          ↓
Reviewer gets a queue — not a notification
          ↓
Reviewer leaves typed comments and submits a verdict
          ↓
Author sees a clear action list — blockers only
          ↓
Blockers resolved → Change ships
```

No Slack messages. No "PTAL". No guessing.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS + Shadcn/UI |
| Database | PostgreSQL (Neon) + Drizzle ORM |
| API | oRPC |
| Business logic | Effect |
| Auth | Better Auth |
| Background jobs | Trigger.dev |
| Webhooks | Svix |
| Realtime | Ably |
| Email | Resend + React Email |
| Payments | Polar |
| Monorepo | Turborepo |

---

## Getting started

### Prerequisites

- Node.js 20+
- Bun
- A GitHub App (for OAuth and webhooks)

### 1. Clone the repository

```bash
git clone https://github.com/RajdeepDs/craft.git
cd craft
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```


### 4. Set up the database

```bash
bun db:generate
bun db:migrate
```

### 6. Run the development server

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001).

---

## Roadmap

Craft is in active development. The current focus is v1 — the core review loop.

**v1 — The core loop**
- [x] Data model and state machine
- [ ] GitHub App integration and webhook sync
- [ ] Change creation with structured Brief
- [ ] Reviewer queue view
- [ ] Typed comments (Blocker / Suggestion / Nit / Question)
- [ ] Structured verdicts
- [ ] Author action list
- [ ] Email notifications
- [ ] Team setup and member management

**v2 — Process intelligence**
- [ ] Smart reviewer routing based on ownership and load
- [ ] SLA configuration and enforcement
- [ ] Cycle time analytics dashboard
- [ ] Slack notifications

**v3 — The long game**
- [ ] GitLab and Bitbucket support
- [ ] Deploy tracking and post-ship outcomes
- [ ] Codebase health insights
- [ ] Public API

---

## Contributing

Craft is open source and contributions are welcome.

### Development workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Run the linter: `bun lint`
5. Submit a pull request against `main`

### Commit convention

Craft uses [Conventional Commits](https://www.conventionalcommits.org/).

```
feat:     a new feature
fix:      a bug fix
docs:     documentation changes
chore:    maintenance, dependency updates
refactor: code change that neither fixes a bug nor adds a feature
```

### Good first issues

Look for issues tagged [`good first issue`](https://github.com/RajdeepDs/craft/issues?q=label%3A%22good+first+issue%22) to get started.

---

## Philosophy

Craft is opinionated by design.

There is one way to submit a Change Brief. One set of comment types. One set of verdicts. This is not a limitation — it is the product. The best review processes are explicit and consistent, not infinitely configurable.

We will say no to features that make the lazy path easier than the right path. We will say no to features that add configuration where we can add conviction instead. We will say no to features that serve every team in theory and no team in practice.

If this sounds like your kind of product, you're in the right place.

---

## License

Craft is licensed under the [GNU Affero General Public License v3.0](LICENSE).

This means:
- You can use, modify, and distribute Craft freely
- If you run a modified version of Craft as a network service, you must release your modifications under the same license
- Commercial use is permitted — you can use Craft at your company
- You cannot take Craft, build a closed-source SaaS on top of it, and keep your changes proprietary

For commercial licensing inquiries — if AGPL doesn't work for your use case — contact us at [rajdeepds626@gmail.com](mailto:rajdeepds626@gmail.com).

---

## Community

- **GitHub Discussions** — questions, ideas, and general discussion
- **GitHub Issues** — bug reports and feature requests
- **X / Twitter** — [@Rajdeep](https://x.com/Rajdeep__ds) — product updates

---

*Built with conviction. Craft is what code review should have always been.*
