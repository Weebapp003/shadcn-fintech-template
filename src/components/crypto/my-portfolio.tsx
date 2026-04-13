"use client"

import * as React from "react"
import Image from "next/image"
import { MoreHorizontalIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { motion } from "motion/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { cryptoCoins } from "@/data/seed"
import type { CryptoPrices } from "./crypto-page-client"

const COLORS = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-rose-500",
]

interface MyPortfolioProps {
  prices: CryptoPrices
  originalPrices: CryptoPrices
  selectedCoin: string
  onSelectCoin: (id: string) => void
}

export function MyPortfolio({ prices, originalPrices, selectedCoin, onSelectCoin }: MyPortfolioProps) {
  const top3 = cryptoCoins.slice(0, 3)

  const total = top3.reduce((s, c) => s + c.holdings * (prices[c.id] ?? c.price), 0)
  const origTotal = top3.reduce((s, c) => s + c.holdings * (originalPrices[c.id] ?? c.price), 0)
  const profitPct = origTotal > 0 ? ((total - origTotal) / origTotal) * 100 : 0
  const profitPositive = profitPct >= 0

  const segments = top3.map((c, i) => {
    const livePrice = prices[c.id] ?? c.price
    const origPrice = originalPrices[c.id] ?? c.price
    const value = c.holdings * livePrice
    const change = ((livePrice - origPrice) / origPrice) * 100
    return {
      coin: c,
      value,
      pct: total > 0 ? (value / total) * 100 : 0,
      change,
      color: COLORS[i % COLORS.length],
    }
  })

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>My Portfolio</CardTitle>
          <Badge variant="secondary" className="text-xs tabular-nums">
            {top3.length} Total Assets
          </Badge>
        </div>
        <CardAction>
          <Badge
            variant="outline"
            className={cn(
              profitPositive
                ? "border-emerald-200 bg-emerald-500/10 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400"
                : "border-rose-200 bg-rose-500/10 text-rose-600 dark:border-rose-800 dark:text-rose-400"
            )}
          >
            {profitPositive ? (
              <TrendingUpIcon className="size-3" />
            ) : (
              <TrendingDownIcon className="size-3" />
            )}
            {profitPositive ? "+" : ""}
            {profitPct.toFixed(1)}%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Profit in last 30 days
        </p>

        {/* allocation bar */}
        <div className="flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full">
          {segments.map((seg) => (
            <motion.div
              key={seg.coin.id}
              className={cn("h-full rounded-full", seg.color)}
              animate={{ width: `${seg.pct}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ width: `${seg.pct}%` }}
            />
          ))}
        </div>

        {/* holdings list */}
        <div className="space-y-1">
          {segments.map((seg) => {
            const positive = seg.change >= 0
            return (
              <div
                key={seg.coin.id}
                className={cn(
                  "group/row flex items-center gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-muted/60 cursor-pointer",
                  selectedCoin === seg.coin.id && "bg-muted/60"
                )}
                onClick={() => onSelectCoin(seg.coin.id)}
              >
                <Image
                  src={seg.coin.logo}
                  alt={seg.coin.name}
                  width={32}
                  height={32}
                  className="size-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">
                    {seg.coin.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {seg.coin.symbol}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold tabular-nums">
                    $
                    {seg.value.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <span
                    className={cn(
                      "text-xs font-medium tabular-nums",
                      positive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    )}
                  >
                    {positive ? "+" : ""}
                    {seg.change.toFixed(2)}%
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button
                      variant="ghost"
                      size="icon-xs"
                      className="opacity-0 transition-opacity group-hover/row:opacity-100"
                    />}
                  >
                    <MoreHorizontalIcon className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem>Buy More</DropdownMenuItem>
                    <DropdownMenuItem>Sell</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onSelectCoin(seg.coin.id)}>View Chart</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
