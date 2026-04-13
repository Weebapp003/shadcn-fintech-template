"use client"

import { useMemo, useState, useCallback } from "react"
import { PieChart, Pie, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"
import { holdings } from "@/data/seed"

const SECTOR_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

export function PortfolioAllocation() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const { sectorData, totalValue } = useMemo(() => {
    const map = new Map<string, number>()
    for (const h of holdings) {
      const value = h.quantity * h.currentPrice
      map.set(h.sector, (map.get(h.sector) ?? 0) + value)
    }
    const data = Array.from(map.entries()).map(([sector, value], i) => ({
      name: sector,
      value: Math.round(value * 100) / 100,
      fill: SECTOR_COLORS[i % SECTOR_COLORS.length],
    }))
    const total = data.reduce((s, d) => s + d.value, 0)
    return { sectorData: data, totalValue: total }
  }, [])

  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {}
    sectorData.forEach((s) => {
      config[s.name] = { label: s.name, color: s.fill }
    })
    return config
  }, [sectorData])

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index)
  }, [])

  const onPieLeave = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const centerLabel = useMemo(() => {
    if (activeIndex !== null && sectorData[activeIndex]) {
      const s = sectorData[activeIndex]
      const pct = ((s.value / totalValue) * 100).toFixed(1)
      return { title: s.name, value: s.value, pct }
    }
    return { title: "Total Value", value: totalValue, pct: null }
  }, [activeIndex, sectorData, totalValue])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[260px]"
        >
          <PieChart>
            <Pie
              data={sectorData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              strokeWidth={2}
              stroke="var(--color-card)"
              paddingAngle={2}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {sectorData.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={entry.fill}
                  opacity={activeIndex === null || activeIndex === i ? 1 : 0.4}
                  strokeWidth={activeIndex === i ? 3 : 2}
                />
              ))}
            </Pie>
            <text
              x="50%"
              y="44%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {centerLabel.title}
            </text>
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-xl font-bold tabular-nums"
            >
              ${centerLabel.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </text>
            {centerLabel.pct && (
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px] tabular-nums"
              >
                {centerLabel.pct}%
              </text>
            )}
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-2 grid gap-1.5 text-xs">
          {sectorData.map((entry) => {
            const pct = ((entry.value / totalValue) * 100).toFixed(1)
            return (
              <div
                key={entry.name}
                className="flex items-center gap-2"
                onMouseEnter={() =>
                  setActiveIndex(sectorData.indexOf(entry))
                }
                onMouseLeave={() => setActiveIndex(null)}
              >
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="truncate text-muted-foreground">
                  {entry.name}
                </span>
                <span className="ml-auto font-medium tabular-nums">
                  {pct}%
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
