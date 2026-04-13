"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ArrowRightIcon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cryptoCoins, cryptoPriceHistory } from "@/data/seed"
import type { CryptoPrices } from "./crypto-page-client"

/* ── chart data builder ────────────────────────────────────────────────── */

function buildChartData(coinId: string, period: string, livePrice: number) {
  const coin = cryptoCoins.find((c) => c.id === coinId)
  if (!coin) return []

  const sparkline = coin.sparklineData

  // Different slice sizes simulate period filtering
  let sliceCount: number
  switch (period) {
    case "1D": sliceCount = sparkline.length; break
    case "1W": sliceCount = Math.min(7, sparkline.length); break
    case "1M": sliceCount = sparkline.length; break
    case "3M": sliceCount = sparkline.length; break
    case "1Y": sliceCount = sparkline.length; break
    case "ALL": sliceCount = sparkline.length; break
    default: sliceCount = sparkline.length
  }

  // Use multiplier to simulate longer timeframes
  const multiplier = period === "1W" ? 1 : period === "1M" ? 1.02 : period === "3M" ? 1.08 : period === "1Y" ? 1.2 : period === "ALL" ? 1.35 : 1

  const sliced = sparkline.slice(0, sliceCount)
  const timeLabels = period === "1D"
    ? cryptoPriceHistory.map((p) => p.time)
    : sliced.map((_, i) => `${i + 1}`)

  const data = sliced.map((val, i) => {
    const scaled = val * (1 + (i / sliced.length) * (multiplier - 1))
    return {
      time: timeLabels[i] ?? `${i + 1}`,
      portfolio: Math.round(scaled * 100) / 100,
      movingAvg: Math.round(scaled * 0.985 * 100) / 100,
    }
  })

  // Append live price as last point
  if (data.length > 0) {
    data.push({
      time: "Now",
      portfolio: livePrice,
      movingAvg: Math.round(livePrice * 0.985 * 100) / 100,
    })
  }

  return data
}

const chartConfig = {
  portfolio: {
    label: "Portfolio Value",
    color: "var(--color-primary)",
  },
  movingAvg: {
    label: "Moving Average",
    color: "var(--color-muted-foreground)",
  },
} satisfies ChartConfig

const PERIODS = ["1D", "1W", "1M", "3M", "1Y", "ALL"] as const

/* ── component ─────────────────────────────────────────────────────────── */

interface CoinInsightProps {
  prices: CryptoPrices
  selectedCoin: string
}

export function CoinInsight({ prices, selectedCoin }: CoinInsightProps) {
  const [period, setPeriod] = React.useState<string>("1M")
  const [flashDirection, setFlashDirection] = React.useState<"up" | "down" | null>(null)
  const [prevPrice, setPrevPrice] = React.useState<number>(0)

  const coin = cryptoCoins.find((c) => c.id === selectedCoin)
  const livePrice = prices[selectedCoin] ?? (coin?.price ?? 0)

  React.useEffect(() => {
    if (prevPrice > 0) {
      if (livePrice > prevPrice) setFlashDirection("up")
      else if (livePrice < prevPrice) setFlashDirection("down")
      else setFlashDirection(null)
    }

    const timer = setTimeout(() => {
      setPrevPrice(livePrice)
      setFlashDirection(null)
    }, 600)
    return () => clearTimeout(timer)
  }, [livePrice, prevPrice])

  const data = React.useMemo(
    () => buildChartData(selectedCoin, period, livePrice),
    [selectedCoin, period, livePrice]
  )

  return (
    <Card className="lg:col-span-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>
            {coin?.name ?? "Coin"} Insight
          </CardTitle>
          {/* Live price display with flash */}
          <motion.span
            key={livePrice}
            initial={
              flashDirection
                ? { backgroundColor: flashDirection === "up" ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)" }
                : undefined
            }
            animate={{ backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.6 }}
            className="rounded px-2 py-0.5 text-sm font-bold tabular-nums"
          >
            ${livePrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </motion.span>
        </div>
        <CardAction>
          <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground">
            More Insight
            <ArrowRightIcon className="size-3" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* legend */}
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 rounded-full bg-primary" />
            {coin?.symbol ?? "Coin"} Price
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 rounded-full border-b border-dashed border-muted-foreground" />
            Moving Average
          </span>
        </div>

        {/* animated chart area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCoin}-${period}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ChartContainer config={chartConfig} className="aspect-auto h-[240px] w-full">
              <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <YAxis
                  hide
                  domain={["dataMin - 200", "dataMax + 200"]}
                />
                <ChartTooltip
                  cursor={{ stroke: "var(--color-border)", strokeDasharray: "4 4" }}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#portfolioGrad)"
                  isAnimationActive={true}
                  animationDuration={500}
                />
                <Area
                  type="monotone"
                  dataKey="movingAvg"
                  stroke="var(--color-muted-foreground)"
                  strokeWidth={1.5}
                  strokeDasharray="6 3"
                  fill="none"
                  isAnimationActive={true}
                  animationDuration={500}
                />
              </AreaChart>
            </ChartContainer>
          </motion.div>
        </AnimatePresence>

        {/* period pills */}
        <div className="flex items-center gap-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium tabular-nums transition-colors",
                p === period
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
