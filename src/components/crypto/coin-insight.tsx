"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ArrowRightIcon } from "lucide-react"
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
import { cryptoPriceHistory } from "@/data/seed"

/* ── chart data ─────────────────────────────────────────────────────────── */

function buildChartData(period: string) {
  if (period === "1D") {
    return cryptoPriceHistory.map((p) => ({
      time: p.time,
      portfolio: p.btc + p.eth * 0.056,
      movingAvg: (p.btc + p.eth * 0.056) * 0.985,
    }))
  }
  // Simulate weekly/monthly by repeating & shifting the base data
  const base = cryptoPriceHistory
  const multiplier = period === "1W" ? 1.02 : period === "1M" ? 1.05 : period === "3M" ? 1.12 : period === "1Y" ? 1.24 : 1.35
  return base.map((p, i) => ({
    time: p.time,
    portfolio: Math.round((p.btc + p.eth * 0.056) * (1 + (i / base.length) * (multiplier - 1))),
    movingAvg: Math.round((p.btc + p.eth * 0.056) * 0.985 * (1 + (i / base.length) * (multiplier - 1))),
  }))
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

/* ── component ──────────────────────────────────────────────────────────── */

export function CoinInsight() {
  const [period, setPeriod] = React.useState<string>("1M")
  const data = React.useMemo(() => buildChartData(period), [period])

  return (
    <Card className="lg:col-span-8">
      <CardHeader>
        <CardTitle>Coin Insight</CardTitle>
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
            Portfolio Value
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 rounded-full border-b border-dashed border-muted-foreground" />
            Moving Average
          </span>
        </div>

        {/* chart */}
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
            />
            <Area
              type="monotone"
              dataKey="movingAvg"
              stroke="var(--color-muted-foreground)"
              strokeWidth={1.5}
              strokeDasharray="6 3"
              fill="none"
            />
          </AreaChart>
        </ChartContainer>

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
