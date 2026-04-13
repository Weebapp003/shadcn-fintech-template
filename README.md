# Shadcn Fintech

A premium, open-source fintech dashboard built with Next.js, shadcn/ui, and Tailwind CSS. Designed for financial applications with real-world components, rich interactions, and polished dark mode support.

![Shadcn Fintech Dashboard](public/screenshots/shadcn-fintech.png)

## Features

- **9 fully built pages** — Dashboard, Accounts, Transactions, Transfers, Cards, Analytics, Investments, Budgets, Settings
- **Drag-and-drop dashboard** — Rearrange widgets with dnd-kit, persisted to localStorage
- **Interactive credit cards** — 3D flip animation, freeze toggle, virtual card generator
- **Live investment ticker** — Simulated real-time price updates with flash animations
- **Spending heatmap** — GitHub-style 365-day calendar visualization
- **Actionable notifications** — Accept/decline money requests and device authorization
- **Smart analytics** — Category drill-down donuts, recurring charge detector, AI insights
- **Budget tracking** — Animated SVG progress rings, savings goals, month projection
- **Quick transfers** — Contact selector with send simulation
- **Dark mode** — Full dark/light/system theme support
- **Responsive** — Works on desktop, tablet, and mobile
- **Real company logos** — 37 merchant logos served locally

## Pages

| Page | Description |
|------|-------------|
| `/dashboard` | Financial overview, wallet cards, quick transfer, spending limit, money movement |
| `/accounts` | Linked bank accounts with balances, add account flow |
| `/transactions` | Searchable table with filters, expandable rows, bulk CSV export |
| `/transfers` | Send/receive/scheduled transfers with stats and quick send |
| `/cards` | 3D flip card, freeze/unfreeze, spending controls, virtual card creator |
| `/analytics` | Spending heatmap, category breakdown, recurring charges, AI insights |
| `/investments` | Portfolio allocation, holdings with sparklines, live ticker, watchlist |
| `/budgets` | Budget rings, savings goals, spending calendar, month projection |
| `/settings` | Profile, security, notifications, billing, appearance |
| `/notifications` | Filterable notification feed with dismiss animations |

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Charts:** [Recharts](https://recharts.org) via shadcn chart components
- **Animations:** [Motion](https://motion.dev) (Framer Motion)
- **Drag & Drop:** [@dnd-kit](https://dndkit.com)
- **Dates:** [date-fns](https://date-fns.org) + [react-day-picker](https://react-day-picker.js.org)
- **Icons:** [Lucide React](https://lucide.dev)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/abderrahimghazali/shadcn-fintech.git

# Navigate to the project
cd shadcn-fintech

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## Project Structure

```
src/
  app/
    (dashboard)/          # Route group with shared sidebar layout
      dashboard/          # Main dashboard with customizable widgets
      accounts/           # Bank account management
      transactions/       # Transaction history & filters
      transfers/          # Send/receive money
      cards/              # Card management & virtual cards
      analytics/          # Spending intelligence
      investments/        # Portfolio & watchlist
      budgets/            # Budget tracking & goals
      notifications/      # Notification feed
      settings/           # User settings (5 tabs)
  components/
    dashboard/            # Dashboard-specific components
    accounts/             # Account page components
    transactions/         # Transaction page components
    transfers/            # Transfer page components
    cards/                # Card page components
    analytics/            # Analytics page components
    investments/          # Investment page components
    budgets/              # Budget page components
    notifications/        # Notification components
    settings/             # Settings components
    ui/                   # shadcn/ui primitives
  data/
    seed.ts               # All mock data with types
```

## Customization

### Theme
Edit `src/app/globals.css` to customize colors. The project uses shadcn's CSS variable system with full dark mode support.

### Mock Data
All demo data lives in `src/data/seed.ts`. Replace with your own data or connect to a real API.

### Dashboard Layout
Click "Customize" on the dashboard to drag and rearrange widgets. Layout persists to localStorage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Abderrahim Ghazali**

- GitHub: [@abderrahimghazali](https://github.com/abderrahimghazali)
