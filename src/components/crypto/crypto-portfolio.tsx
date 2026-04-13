"use client"

import { useMemo } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { TrendingUp, TrendingDown } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { CryptoCoin } from "@/data/seed"

const COLORS = [
  "bg-orange-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-yellow-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
]

export function CryptoPortfolio({ coins }: { coins: CryptoCoin[] }) {
  const { totalValue, totalChange24h, allocations } = useMemo(() => {
    const items = coins.map((c, i) => ({
      ...c,
      value: c.holdings * c.price,
      color: COLORS[i % COLORS.length],
    }))
    const total = items.reduce((s, c) => s + c.value, 0)
    const prevTotal = items.reduce(
      (s, c) => s + c.holdings * (c.price / (1 + c.change24h / 100)),
      0
    )
    const changePct = total > 0 ? ((total - prevTotal) / prevTotal) * 100 : 0
    return {
      totalValue: total,
      totalChange24h: changePct,
      allocations: items.map((c) => ({
        ...c,
        pct: total > 0 ? (c.value / total) * 100 : 0,
      })),
    }
  }, [coins])

  const positive = totalChange24h >= 0

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Crypto Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Total value */}
        <div className="mb-1">
          <p className="text-3xl font-bold tabular-nums">
            $
            {totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-sm font-medium",
              positive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            )}
          >
            {positive ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4" />
            )}
            <span className="tabular-nums">
              {positive ? "+" : ""}
              {totalChange24h.toFixed(2)}% (24h)
            </span>
          </div>
        </div>

        {/* Allocation bar */}
        <div className="my-4 flex h-2.5 overflow-hidden rounded-full">
          {allocations.map((a) => (
            <div
              key={a.id}
              className={cn("h-full transition-all", a.color)}
              style={{ width: `${a.pct}%` }}
            />
          ))}
        </div>

        {/* Allocation list */}
        <div className="space-y-2.5">
          {allocations.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <Image
                src={a.logo}
                alt={a.name}
                width={24}
                height={24}
                unoptimized
                className="size-6 rounded-full"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate font-medium">{a.name}</span>
                  <span className="ml-2 font-medium tabular-nums">
                    $
                    {a.value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="tabular-nums">
                    {a.holdings} {a.symbol}
                  </span>
                  <span className="tabular-nums">{a.pct.toFixed(1)}%</span>
                </div>
                {/* Percentage bar */}
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full", a.color)}
                    style={{ width: `${a.pct}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
