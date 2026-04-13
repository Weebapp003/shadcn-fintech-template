import { ArrowDownLeftIcon, ArrowUpRightIcon, HashIcon, TrendingUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { FullTransaction } from "@/data/seed"

interface TransactionSummaryProps {
  transactions: FullTransaction[]
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n)

export function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const totalIn = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0)

  const totalOut = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Math.abs(t.amount), 0)

  const largest = transactions.length
    ? transactions.reduce((max, t) =>
        Math.abs(t.amount) > Math.abs(max.amount) ? t : max
      )
    : null

  const cards = [
    {
      label: "Total In",
      value: fmt(totalIn),
      icon: ArrowDownLeftIcon,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Out",
      value: fmt(totalOut),
      icon: ArrowUpRightIcon,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      label: "Largest",
      value: largest ? fmt(Math.abs(largest.amount)) : "$0.00",
      icon: TrendingUpIcon,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Count",
      value: transactions.length.toString(),
      icon: HashIcon,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
