"use client"

import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { monthComparisons } from "@/data/seed"

const chartConfig = {
  thisMonth: {
    label: "This Month",
    color: "var(--color-primary)",
  },
  lastMonth: {
    label: "Last Month",
    color: "var(--color-muted-foreground)",
  },
} satisfies ChartConfig

function ChangeLabel(props: Record<string, unknown>) {
  const { x, y, width, index } = props as {
    x: number
    y: number
    width: number
    index: number
  }
  const row = monthComparisons[index]
  if (!row || row.lastMonth === 0) return null
  const pct = Math.round(((row.thisMonth - row.lastMonth) / row.lastMonth) * 100)
  if (pct === 0) return null
  const isUp = pct > 0
  return (
    <text
      x={x + width / 2}
      y={y - 6}
      textAnchor="middle"
      className={`text-[10px] font-medium tabular-nums ${isUp ? "fill-rose-500" : "fill-emerald-500"}`}
    >
      {isUp ? "+" : ""}
      {pct}%
    </text>
  )
}

export function MonthComparison() {
  const totals = useMemo(() => {
    const thisMonth = monthComparisons.reduce((s, r) => s + r.thisMonth, 0)
    const lastMonth = monthComparisons.reduce((s, r) => s + r.lastMonth, 0)
    return { thisMonth, lastMonth }
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Month vs Last Month</CardTitle>
            <CardDescription>
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary" />
                  This Month{" "}
                  <span className="font-medium tabular-nums text-foreground">
                    ${totals.thisMonth.toLocaleString()}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-muted-foreground/30" />
                  Last Month{" "}
                  <span className="font-medium tabular-nums text-foreground">
                    ${totals.lastMonth.toLocaleString()}
                  </span>
                </span>
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-w-0">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart
            data={monthComparisons}
            margin={{ top: 24, right: 8, bottom: 0, left: -20 }}
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              tickMargin={8}
              stroke="var(--color-muted-foreground)"
              tickFormatter={(v: string) =>
                v.length > 8 ? v.slice(0, 7) + "..." : v
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={11}
              tickMargin={8}
              stroke="var(--color-muted-foreground)"
              tickFormatter={(v: number) => `$${v}`}
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
            <Bar
              dataKey="lastMonth"
              fill="var(--color-muted-foreground)"
              fillOpacity={0.3}
              radius={[4, 4, 0, 0]}
              barSize={18}
            />
            <Bar
              dataKey="thisMonth"
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
              barSize={18}
            >
              <LabelList
                dataKey="thisMonth"
                content={<ChangeLabel />}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
