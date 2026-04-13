# Contributing to Shadcn Fintech

Thank you for considering contributing to **Shadcn Fintech**! Every contribution is valuable, whether it's reporting bugs, suggesting improvements, adding features, or improving documentation.

## Table of Contents

1. [Getting Started](#getting-started)
2. [How to Contribute](#how-to-contribute)
3. [Code Standards](#code-standards)
4. [Pull Request Guidelines](#pull-request-guidelines)
5. [Reporting Issues](#reporting-issues)
6. [Community Guidelines](#community-guidelines)

---

## Getting Started

1. **Fork** the repository.
2. **Clone** your fork:

   ```bash
   git clone https://github.com/your-username/shadcn-fintech.git
   ```

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

4. **Run the project locally:**

   ```bash
   pnpm dev
   ```

5. Create a new branch for your contribution:

   ```bash
   git checkout -b feature/your-feature
   ```

---

## How to Contribute

- **Feature Requests:** Open an issue or start a discussion before implementation.
- **Bug Fixes:** Provide clear reproduction steps in your issue.
- **New Pages:** Discuss the page concept in an issue first. Follow existing patterns in `src/components/` and `src/data/seed.ts`.
- **Documentation:** Improvements to the README, CHANGELOG, or inline docs are always appreciated.

> **Note:** Pull Requests adding new features without a prior issue or discussion will **not be accepted**.

---

## Code Standards

- Follow the existing **ESLint** configuration.
- Ensure your code is **type-safe** with **TypeScript** (strict mode).
- Use **shadcn/ui** components from `src/components/ui/` — don't install alternative UI libraries.
- Use **motion/react** for animations (not framer-motion).
- Use the `cn()` utility from `@/lib/utils` for conditional classes.
- Use `tabular-nums` class for all financial numbers.
- Import data from `src/data/seed.ts` — keep all mock data centralized.
- Use the `logo()` helper for company logos and `avatar()` for user avatars.

> **Before submitting**, run:

```bash
pnpm lint && pnpm build
```

---

## Pull Request Guidelines

- **Follow the [PR Template](./PULL_REQUEST_TEMPLATE.md):**
  - Description
  - Type of change
  - Checklist
  - Related Issue
- Ensure your changes pass **CI checks** (build + type check + lint).
- Keep PRs **focused** and **concise** — one feature per PR.
- Reference related issues in your PR description.
- Add screenshots for any visual changes.

---

## Reporting Issues

- Use the [Bug Report](https://github.com/abderrahimghazali/shadcn-fintech/issues/new?template=bug_report.yml) or [Feature Request](https://github.com/abderrahimghazali/shadcn-fintech/issues/new?template=feature_request.yml) templates.
- Clearly describe the issue with reproduction steps.
- Include screenshots if relevant.
- Specify which page and theme (light/dark) the issue occurs on.

---

## Community Guidelines

- Be respectful and constructive.
- Follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
- Stay on topic in discussions.

---

Thank you for helping make **Shadcn Fintech** better! ❤️

Questions? Start a [Discussion](https://github.com/abderrahimghazali/shadcn-fintech/discussions).
