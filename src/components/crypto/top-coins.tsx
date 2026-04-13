"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowUpRightIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cryptoCoins } from "@/data/seed"
import type { CryptoPrices } from "./crypto-page-client"

interface TopCoinsProps {
  prices: CryptoPrices
  originalPrices: CryptoPrices
  selectedCoin: string
  onSelectCoin: (id: string) => void
}

type FlashMap = Record<string, "up" | "down" | null>

export function TopCoins({ prices, originalPrices, selectedCoin, onSelectCoin }: TopCoinsProps) {
  const top3 = cryptoCoins.slice(0, 3)

  // Track flash directions in state (computed inside effect, not during render)
  const [flashes, setFlashes] = React.useState<FlashMap>({})

  // Compare previous prices using a state-based approach
  const [prevPrices, setPrevPrices] = React.useState<CryptoPrices>(prices)

  React.useEffect(() => {
    // Compute flash directions
    const newFlashes: FlashMap = {}
    for (const coin of top3) {
      const prev = prevPrices[coin.id] ?? coin.price
      const curr = prices[coin.id] ?? coin.price
      if (curr > prev) newFlashes[coin.id] = "up"
      else if (curr < prev) newFlashes[coin.id] = "down"
      else newFlashes[coin.id] = null
    }
    setFlashes(newFlashes)

    // Clear flashes and update prevPrices after animation
    const timer = setTimeout(() => {
      setPrevPrices({ ...prices })
      setFlashes({})
    }, 600)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-8">
      {top3.map((coin) => {
        const livePrice = prices[coin.id] ?? coin.price
        const origPrice = originalPrices[coin.id] ?? coin.price
        const change24h = ((livePrice - origPrice) / origPrice) * 100
        const positive = change24h >= 0
        const flash = flashes[coin.id] ?? null

        return (
          <Card
            key={coin.id}
            className={cn(
              "relative cursor-pointer transition-all",
              selectedCoin === coin.id && "ring-2 ring-primary"
            )}
            onClick={() => onSelectCoin(coin.id)}
          >
            <CardContent className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Image
                    src={coin.logo}
                    alt={coin.name}
                    width={32}
                    height={32}
                    className="size-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium leading-tight">{coin.name}</p>
                    <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                  </div>
                </div>
                <div className="flex size-7 items-center justify-center rounded-lg bg-muted">
                  <ArrowUpRightIcon className="size-3.5 text-muted-foreground" />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <motion.span
                  key={livePrice}
                  initial={
                    flash
                      ? { backgroundColor: flash === "up" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)" }
                      : undefined
                  }
                  animate={{ backgroundColor: "rgba(0,0,0,0)" }}
                  transition={{ duration: 0.6 }}
                  className="rounded px-1 text-xl font-bold tabular-nums"
                >
                  $
                  {livePrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </motion.span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
                    positive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  )}
                >
                  {positive ? (
                    <TrendingUpIcon className="size-3" />
                  ) : (
                    <TrendingDownIcon className="size-3" />
                  )}
                  {positive ? "+" : ""}
                  {change24h.toFixed(2)}%
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
