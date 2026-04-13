"use client"

import { useMemo, useState } from "react"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
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
import { cryptoCoins, cryptoPriceHistory } from "@/data/seed"

const COIN_OPTIONS = [
  { id: "btc", label: "BTC", dataKey: "btc" },
  { id: "eth", label: "ETH", dataKey: "eth" },
] as const

const TIME_PERIODS = ["1H", "24H", "7D", "1M"] as const

export function PriceChart({
  selectedCoin,
  onCoinChange,
}: {
  selectedCoin: string
  onCoinChange: (id: string) => void
}) {
  const [timePeriod, setTimePeriod] = useState<string>("24H")

  const coinInfo = useMemo(
    () => cryptoCoins.find((c) => c.id === selectedCoin),
    [selectedCoin]
  )

  // Determine the dataKey for the chart
  const dataKey = useMemo(() => {
    const opt = COIN_OPTIONS.find((o) => o.id === selectedCoin)
    return opt ? opt.dataKey : "btc"
  }, [selectedCoin])

  const positive = coinInfo ? coinInfo.change24h >= 0 : true
  const strokeColor = positive
    ? "var(--color-emerald-500)"
    : "var(--color-rose-500)"
  const gradientId = `cryptoGrad-${selectedCoin}`

  const chartConfig: ChartConfig = useMemo(
    () => ({
      [dataKey]: {
        label: coinInfo?.name ?? "Price",
        color: strokeColor,
      },
    }),
    [dataKey, coinInfo?.name, strokeColor]
  )

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Price Chart</CardTitle>
          <div className="flex gap-1">
            {COIN_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onCoinChange(opt.id)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  selectedCoin === opt.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Current price + change */}
        {coinInfo && (
          <div className="mb-4">
            <p className="text-2xl font-bold tabular-nums">
              $
              {coinInfo.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <div
              className={cn(
                "mt-0.5 flex items-center gap-1 text-sm font-medium",
                positive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              {positive ? (
                <TrendingUp className="size-3.5" />
              ) : (
                <TrendingDown className="size-3.5" />
              )}
              <span className="tabular-nums">
                {positive ? "+" : ""}
                {coinInfo.change24h.toFixed(2)}% (24h)
              </span>
            </div>
          </div>
        )}

        {/* Chart */}
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={cryptoPriceHistory}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
                <stop
                  offset="100%"
                  stopColor={strokeColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={55}
              tickFormatter={(v: number) =>
                v >= 1000
                  ? `$${(v / 1000).toFixed(1)}k`
                  : `$${v.toFixed(0)}`
              }
              tick={{ fontSize: 11 }}
              domain={["auto", "auto"]}
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
              dataKey={dataKey}
              stroke={strokeColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ChartContainer>

        {/* Time period tabs */}
        <div className="mt-3 flex items-center justify-center gap-1">
          {TIME_PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setTimePeriod(p)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                timePeriod === p
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
