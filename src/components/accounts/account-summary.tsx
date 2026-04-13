import {
  WalletIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  LinkIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { BankAccount } from "@/data/seed"

interface AccountSummaryProps {
  accounts: BankAccount[]
}

const fmt = (n: number, currency = "$") =>
  `${currency}${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(n))}`

export function AccountSummary({ accounts }: AccountSummaryProps) {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0)
  const totalChange = accounts.reduce((sum, a) => sum + a.change, 0)
  const isPositive = totalChange >= 0

  const cards = [
    {
      label: "Total Balance",
      value: fmt(totalBalance),
      icon: WalletIcon,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Total Change",
      value: `${isPositive ? "+" : "-"}${fmt(totalChange)}`,
      icon: isPositive ? TrendingUpIcon : TrendingDownIcon,
      color: isPositive ? "text-emerald-500" : "text-rose-500",
      bg: isPositive ? "bg-emerald-500/10" : "bg-rose-500/10",
    },
    {
      label: "Linked Accounts",
      value: accounts.length.toString(),
      icon: LinkIcon,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-foreground/10"
        >
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full",
              card.bg
            )}
          >
            <card.icon className={cn("size-4", card.color)} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <p className="tabular-nums text-base font-semibold tracking-tight">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
