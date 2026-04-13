# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-04-13

### Added

- **Dashboard** — Financial overview chart with datepicker, animated wallet cards (auto-swap + click), quick transfer with send simulation, monthly spending limit, money movement with period filters, recent transactions with company logos
- **Accounts** — Filterable account grid (checking/savings/crypto/investment), linked bank cards with colored borders, add account flow with loading simulation
- **Transactions** — 25 realistic entries with search, category/status/type filters, expandable row details, bulk select with CSV export, status badges (completed/pending/failed)
- **Transfers** — Send/receive/scheduled transfers with stat cards, tab filters, transfer list with cancel for scheduled, quick send with contact selector
- **Cards** — 3D flip card (CSS perspective + motion), freeze/unfreeze with overlay, daily limit slider, monthly usage progress, virtual card generator with creation animation, card thumbnail grid
- **Analytics** — 365-day spending heatmap (custom SVG), category donut with drill-down into subcategories, recurring charge detector with keep/review toggles, month-over-month comparison bar chart, AI insight cards with staggered entrance
- **Investments** — Portfolio allocation donut, holdings table with inline sparklines and live price simulation (3s updates with green/red flash), performance chart vs S&P 500 benchmark, watchlist with add/remove, horizontal scrolling live ticker (sticky, pauses on hover)
- **Budgets** — Animated SVG circular progress rings per category (overspent pulse red), savings goals with progress bars and on-track badges, spending calendar with daily amounts and intensity coloring, month projection with cumulative spend curve vs budget line
- **Settings** — 5 tabs (Profile, Security, Notifications, Billing, Appearance), left nav layout, 2FA toggle, active sessions with revoke, plan comparison, theme picker using next-themes
- **Notifications** — Full page with filter tabs (All/Unread/Transactions/Security/System), dismiss with exit animation, mark all as read
- **Notification dropdown** — Popover from sidebar bell icon showing latest 6 notifications, actionable items (accept/decline money requests, authorize devices, split bills) with loading simulation
- **Drag-and-drop dashboard** — Customizable widget layout using @dnd-kit with null strategy + pointerWithin collision, CSS Grid 12-col, DragOverlay, persisted to localStorage
- **Theme toggle** — Dark/light/system with shadcn contrast icon, next-themes
- **Dynamic sidebar** — Active state via usePathname, 3 groups (Daily/Money/Insights), notification badge count
- **Shared layout** — Route group `(dashboard)` with sidebar shell, clean URLs
- **Seed data** — 300+ realistic mock entries with types, `logo()` helper for company logos, `avatar()` helper
- **Local assets** — 37 company logos + 9 avatars served from /public (no external API calls)
- **Custom favicon** — SVG landmark icon matching Shadcn Fintech branding

### Infrastructure

- GitHub Actions CI (build + type check + lint)
- GitHub Sponsors + Buy Me a Coffee funding
- Template repository enabled
- MIT License
- Professional README with badges, showcase image, sponsor section
