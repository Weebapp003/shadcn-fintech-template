"use client"

import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { moneyMovementByPeriod } from "@/data/seed"
import { ArrowDownLeftIcon, ArrowUpRightIcon } from "lucide-react"

const chartConfig = {
  moneyIn: {
    label: "Money In",
    color: "var(--color-primary)",
  },
  moneyOut: {
    label: "Money Out",
    color: "var(--color-muted-foreground)",
  },
} satisfies ChartConfig

type Period = keyof typeof moneyMovementByPeriod

export function MoneyMovement() {
  const [period, setPeriod] = useState<Period>("7d")
  const data = moneyMovementByPeriod[period]

  const totals = useMemo(() => {
    const inTotal = data.reduce((s, d) => s + d.moneyIn, 0)
    const outTotal = data.reduce((s, d) => s + d.moneyOut, 0)
    return { in: inTotal, out: outTotal, net: inTotal - outTotal }
  }, [data])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">
          Money Movement
        </CardTitle>
        <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <SelectTrigger className="h-8 w-[110px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 days</SelectItem>
            <SelectItem value="30d">30 days</SelectItem>
            <SelectItem value="90d">90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 px-3 py-2.5 dark:bg-emerald-950/30">
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
              <ArrowDownLeftIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-emerald-600/70 dark:text-emerald-400/70">Money In</p>
              <p className="text-sm font-bold tabular-nums text-emerald-700 dark:text-emerald-300">
                ${totals.in.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 px-3 py-2.5 dark:bg-rose-950/30">
            <div className="flex size-8 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-900/50">
              <ArrowUpRightIcon className="size-4 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-rose-600/70 dark:text-rose-400/70">Money Out</p>
              <p className="text-sm font-bold tabular-nums text-rose-700 dark:text-rose-300">
                ${totals.out.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Net flow */}
        <div className="flex items-center justify-between rounded-lg border px-3 py-2">
          <span className="text-xs text-muted-foreground">Net Flow</span>
          <span className="text-sm font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
            +${totals.net.toLocaleString()}
          </span>
        </div>

        {/* Chart */}
        <ChartContainer config={chartConfig} className="h-[180px] w-full">
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, bottom: 0, left: -24 }}
            barGap={2}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
              strokeOpacity={0.4}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              tickMargin={6}
              stroke="var(--color-muted-foreground)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={11}
              tickMargin={4}
              stroke="var(--color-muted-foreground)"
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
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
              dataKey="moneyIn"
              fill="var(--color-primary)"
              radius={[6, 6, 0, 0]}
              maxBarSize={24}
            />
            <Bar
              dataKey="moneyOut"
              fill="var(--color-muted-foreground)"
              fillOpacity={0.25}
              radius={[6, 6, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
