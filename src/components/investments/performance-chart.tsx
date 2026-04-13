"use client"

import { useMemo, useState } from "react"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { portfolioHistory } from "@/data/seed"

const PERIODS = [
  { label: "1M", months: 1 },
  { label: "3M", months: 3 },
  { label: "6M", months: 6 },
  { label: "1Y", months: 12 },
] as const

const chartConfig: ChartConfig = {
  portfolio: { label: "My Portfolio", color: "var(--color-chart-1)" },
  sp500: { label: "S&P 500", color: "var(--color-chart-3)" },
}

export function PerformanceChart() {
  const [period, setPeriod] = useState<number>(12)

  const data = useMemo(
    () => portfolioHistory.slice(-period),
    [period]
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Performance</CardTitle>
          <div className="flex gap-1">
            {PERIODS.map((p) => (
              <button
                key={p.label}
                onClick={() => setPeriod(p.months)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  period === p.months
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: string) => {
                const parts = v.split(" ")
                return parts[0]?.slice(0, 3) ?? v
              }}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={50}
              tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    `$${Number(value).toLocaleString()}`
                  }
                />
              }
            />
            <Area
              type="monotone"
              dataKey="portfolio"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              fill="url(#portfolioGrad)"
            />
            <Area
              type="monotone"
              dataKey="sp500"
              stroke="var(--color-chart-3)"
              strokeWidth={1.5}
              strokeDasharray="5 3"
              fill="none"
            />
          </AreaChart>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 rounded-full bg-[var(--color-chart-1)]" />
            <span className="text-muted-foreground">My Portfolio</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 rounded-full border-t-2 border-dashed border-[var(--color-chart-3)]" />
            <span className="text-muted-foreground">S&P 500</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
