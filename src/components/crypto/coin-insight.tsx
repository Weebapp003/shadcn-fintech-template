"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  ReferenceLine,
} from "recharts"
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
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cryptoCoins } from "@/data/seed"
import type { CryptoPrices } from "./crypto-page-client"

/* ── candlestick data generator ───────────────────────────────────────── */

interface CandlestickData {
  date: string
  openClose: [number, number]
  high: number
  low: number
}

function generateCandlestickData(basePrice: number, count: number): CandlestickData[] {
  const data: CandlestickData[] = []
  let price = basePrice * 0.92
  const now = new Date()
  // Use enough decimal precision so small-price coins have visible candles
  const decimals = basePrice >= 100 ? 2 : basePrice >= 1 ? 4 : 6
  const factor = Math.pow(10, decimals)
  const round = (v: number) => Math.round(v * factor) / factor

  for (let i = count; i > 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    if (date.getDay() === 0 || date.getDay() === 6) continue

    const volatility = price * 0.025
    const open = price
    const change = (Math.random() - 0.45) * volatility
    const close = open + change
    const high = Math.max(open, close) + Math.random() * volatility * 0.4
    const low = Math.min(open, close) - Math.random() * volatility * 0.4

    data.push({
      date: date.toISOString().split("T")[0],
      openClose: [round(open), round(close)],
      high: round(high),
      low: round(low),
    })
    price = close
  }
  return data
}

/* ── candlestick shape ────────────────────────────────────────────────── */

interface CandlestickProps {
  x: number
  y: number
  width: number
  height: number
  low: number
  high: number
  openClose: [number, number]
}

function CandlestickShape(props: CandlestickProps) {
  const { x, y, width, height, low, high, openClose: [open, close] } = props
  const isGrowing = open < close
  const ratio = Math.abs(height / (open - close)) || 0

  return (
    <g>
      <path
        className={isGrowing ? "fill-emerald-500" : "fill-rose-500"}
        d={`M ${x},${y} L ${x},${y + height} L ${x + width},${y + height} L ${x + width},${y} Z`}
      />
      <g className={isGrowing ? "stroke-emerald-500" : "stroke-rose-500"} strokeWidth="1">
        {isGrowing ? (
          <>
            <path d={`M ${x + width / 2},${y + height} v ${(open - low) * ratio}`} />
            <path d={`M ${x + width / 2},${y} v ${(close - high) * ratio}`} />
          </>
        ) : (
          <>
            <path d={`M ${x + width / 2},${y} v ${(close - low) * ratio}`} />
            <path d={`M ${x + width / 2},${y + height} v ${(open - high) * ratio}`} />
          </>
        )}
      </g>
    </g>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCandlestick(props: any) {
  const { x, y, width, height, payload } = props as {
    x: number; y: number; width: number; height: number
    payload?: CandlestickData
  }
  if (payload?.openClose) {
    return (
      <CandlestickShape
        x={x} y={y} width={width} height={height}
        low={payload.low} high={payload.high} openClose={payload.openClose}
      />
    )
  }
  return <CandlestickShape x={0} y={0} width={0} height={0} low={0} high={0} openClose={[0, 0]} />
}

/* ── tooltip ──────────────────────────────────────────────────────────── */

function CandlestickTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload?: CandlestickData }> }) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  if (!d) return null
  const [open, close] = d.openClose
  const isGrowing = close > open

  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md">
      <p className="mb-1 font-medium">
        {new Date(d.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-muted-foreground">
        <span>Open</span><span className="text-right font-medium text-foreground tabular-nums">{open.toLocaleString()}</span>
        <span>High</span><span className="text-right font-medium text-foreground tabular-nums">{d.high.toLocaleString()}</span>
        <span>Low</span><span className="text-right font-medium text-foreground tabular-nums">{d.low.toLocaleString()}</span>
        <span>Close</span>
        <span className={cn("text-right font-medium tabular-nums", isGrowing ? "text-emerald-500" : "text-rose-500")}>
          {close.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

/* ── config ────────────────────────────────────────────────────────────── */

const chartConfig = {
  openClose: { label: "Price", color: "var(--chart-1)" },
} satisfies ChartConfig

const PERIODS = ["1D", "1W", "1M", "3M", "1Y", "ALL"] as const
const PERIOD_DAYS: Record<string, number> = { "1D": 15, "1W": 30, "1M": 60, "3M": 130, "1Y": 365, ALL: 365 }

/* ── component ─────────────────────────────────────────────────────────── */

interface CoinInsightProps {
  prices: CryptoPrices
  selectedCoin: string
}

export function CoinInsight({ prices, selectedCoin }: CoinInsightProps) {
  const [period, setPeriod] = React.useState<string>("3M")

  const coin = cryptoCoins.find((c) => c.id === selectedCoin)
  const livePrice = prices[selectedCoin] ?? (coin?.price ?? 0)

  const data = React.useMemo(
    () => generateCandlestickData(livePrice, PERIOD_DAYS[period] ?? 25),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCoin, period]
  )

  const minVal = data.reduce((m, d) => Math.min(m, d.low, ...d.openClose), Infinity)
  const maxVal = data.reduce((m, d) => Math.max(m, d.high, ...d.openClose), -Infinity)
  const pad = (maxVal - minVal) * 0.1

  const lastCandle = data[data.length - 1]
  const lastClose = lastCandle?.openClose[1]
  const lastIsGrowing = lastCandle ? lastCandle.openClose[1] > lastCandle.openClose[0] : true

  const formatTick = (val: string, idx: number) => {
    const d = new Date(val)
    const mo = d.getMonth()
    const yr = d.getFullYear().toString().slice(2)
    if (idx === 0) return `${d.toLocaleString("en-US", { month: "short" })} '${yr}`
    const prev = data[idx - 1]
    if (prev && new Date(prev.date).getMonth() !== mo) {
      return `${d.toLocaleString("en-US", { month: "short" })} '${yr}`
    }
    return ""
  }

  return (
    <Card className="lg:col-span-8">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <CardTitle>{coin?.name ?? "Coin"} Insight</CardTitle>
          <span className={cn(
            "rounded px-2 py-0.5 text-sm font-bold tabular-nums",
            lastIsGrowing ? "text-emerald-500" : "text-rose-500"
          )}>
            ${livePrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <CardAction>
          <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground">
            More Insight <ArrowRightIcon className="size-3" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="min-w-0 space-y-4">
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-sm bg-emerald-500" /> Bullish
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-sm bg-rose-500" /> Bearish
          </span>
        </div>

        {/* Candlestick chart */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCoin}-${period}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[340px] w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-zinc-950/5 dark:[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-zinc-950/25 [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/64 [&_.recharts-cartesian-axis-line]:stroke-border/64 [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground/72 dark:[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground/64"
            >
              <BarChart data={data} maxBarSize={20} margin={{ left: 20, right: -5 }}>
                <CartesianGrid vertical={false} strokeWidth={1} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickFormatter={formatTick}
                  interval={0}
                  minTickGap={5}
                  tickMargin={12}
                />
                <YAxis
                  domain={[minVal - pad, maxVal + pad]}
                  tickCount={7}
                  tickLine={false}
                  orientation="right"
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v >= 1 ? v.toFixed(2) : v.toFixed(4)
                  }
                />
                {lastClose != null && (
                  <ReferenceLine
                    y={lastClose}
                    stroke="var(--muted-foreground)"
                    opacity={0.5}
                    strokeWidth={1}
                    strokeDasharray="2 2"
                    label={({ viewBox }: { viewBox: { x: number; y: number; width: number } }) => (
                      <g transform={`translate(${viewBox.x + viewBox.width + 5},${viewBox.y})`}>
                        <rect x={-2} y={-10} width={50} height={20}
                          fill={lastIsGrowing ? "var(--color-emerald-500)" : "var(--color-rose-500)"}
                          rx={4}
                        />
                        <text x={2} y={4} fill="#fff" fontSize={10} fontWeight="500" textAnchor="start" className="tabular-nums">
                          {lastClose >= 1000 ? `${(lastClose / 1000).toFixed(1)}k` : lastClose.toFixed(2)}
                        </text>
                      </g>
                    )}
                  />
                )}
                <ChartTooltip content={<CandlestickTooltip />} />
                <Bar dataKey="openClose" shape={renderCandlestick}>
                  {data.map((d) => (
                    <Cell key={d.date} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </motion.div>
        </AnimatePresence>

        {/* Period pills */}
        <div className="flex flex-wrap items-center gap-1">
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
