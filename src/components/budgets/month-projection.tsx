"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, ReferenceLine, XAxis, YAxis } from "recharts"
import { budgetCategories, dailySpending } from "@/data/seed"
import { AlertTriangleIcon, CheckCircle2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

const chartConfig = {
  cumulative: {
    label: "Spending",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

export function MonthProjection() {
  const stats = useMemo(() => {
    const totalBudget = budgetCategories.reduce((s, b) => s + b.budget, 0)
    const spentDays = dailySpending.filter((d) => d.amount > 0)
    const totalSpent = spentDays.reduce((s, d) => s + d.amount, 0)
    const avgDaily = spentDays.length > 0 ? totalSpent / spentDays.length : 0
    const daysLeft = 30 - spentDays.length
    const projected = totalSpent + avgDaily * daysLeft
    const overBudget = projected > totalBudget

    // Build cumulative chart data
    let cumulative = 0
    const chartData = dailySpending.map((d, i) => {
      cumulative += d.amount
      return { day: i + 1, cumulative, budget: (totalBudget / 30) * (i + 1) }
    })

    return { totalBudget, totalSpent, avgDaily, daysLeft, projected, overBudget, chartData }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Month Projection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status */}
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
            stats.overBudget
              ? "bg-destructive/10 text-destructive"
              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
          )}
        >
          {stats.overBudget ? (
            <AlertTriangleIcon className="size-4" />
          ) : (
            <CheckCircle2Icon className="size-4" />
          )}
          {stats.overBudget
            ? "Projected to exceed budget"
            : "On track this month"}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-medium text-muted-foreground">
              Days Left
            </p>
            <p className="text-lg font-bold tabular-nums">{stats.daysLeft}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-muted-foreground">
              Avg/Day
            </p>
            <p className="text-lg font-bold tabular-nums">
              ${Math.round(stats.avgDaily)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-muted-foreground">
              Spent So Far
            </p>
            <p className="text-lg font-bold tabular-nums">
              ${stats.totalSpent.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-muted-foreground">
              Projected
            </p>
            <p
              className={cn(
                "text-lg font-bold tabular-nums",
                stats.overBudget && "text-destructive"
              )}
            >
              ${Math.round(stats.projected).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Cumulative spend chart */}
        <ChartContainer config={chartConfig} className="h-[140px] w-full">
          <AreaChart
            data={stats.chartData}
            margin={{ top: 4, right: 4, bottom: 0, left: -24 }}
          >
            <defs>
              <linearGradient id="fillSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickMargin={4}
              stroke="var(--color-muted-foreground)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickMargin={4}
              stroke="var(--color-muted-foreground)"
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              }
            />
            <ReferenceLine
              y={stats.totalBudget}
              stroke="var(--color-destructive)"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
            />
            <Area
              dataKey="budget"
              type="linear"
              stroke="var(--color-muted-foreground)"
              strokeOpacity={0.2}
              strokeDasharray="4 4"
              fill="transparent"
              dot={false}
            />
            <Area
              dataKey="cumulative"
              type="monotone"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#fillSpend)"
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
