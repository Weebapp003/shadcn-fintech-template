"use client"

import { useMemo } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { spendingHeatmapData } from "@/data/seed"

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""]
const CELL_SIZE = 13
const CELL_GAP = 3
const TOTAL = CELL_SIZE + CELL_GAP

function intensityClass(amount: number, max: number): string {
  if (amount === 0) return "fill-muted/40"
  const ratio = amount / max
  if (ratio < 0.2) return "fill-primary/10"
  if (ratio < 0.4) return "fill-primary/25"
  if (ratio < 0.65) return "fill-primary/45"
  return "fill-primary/70"
}

export function SpendingHeatmap() {
  const { grid, monthLabels, yearTotal, max } = useMemo(() => {
    const data = spendingHeatmapData
    const max = Math.max(...data.map((d) => d.amount))
    const yearTotal = data.reduce((s, d) => s + d.amount, 0)

    // Build 52-column x 7-row grid
    // Find the first Sunday on or before the start date
    const firstDate = new Date(data[0].date)
    const startDay = firstDate.getDay()
    const gridStart = new Date(firstDate)
    gridStart.setDate(gridStart.getDate() - startDay)

    // Build lookup
    const lookup = new Map(data.map((d) => [d.date, d.amount]))

    const weeks: { date: string; amount: number; col: number; row: number }[] =
      []
    const months: { label: string; col: number }[] = []
    const seenMonths = new Set<string>()

    for (let col = 0; col < 53; col++) {
      for (let row = 0; row < 7; row++) {
        const d = new Date(gridStart)
        d.setDate(d.getDate() + col * 7 + row)
        const key = d.toISOString().split("T")[0]
        const amount = lookup.get(key) ?? 0

        weeks.push({ date: key, amount, col, row })

        // Month labels — show at the first occurrence of a new month
        const monthKey = `${d.getFullYear()}-${d.getMonth()}`
        if (!seenMonths.has(monthKey) && row === 0) {
          seenMonths.add(monthKey)
          const label = d.toLocaleDateString("en-US", { month: "short" })
          months.push({ label, col })
        }
      }
    }

    return { grid: weeks, monthLabels: months, yearTotal, max }
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Spending Activity</CardTitle>
            <CardDescription>
              <span className="tabular-nums font-medium text-foreground">
                ${yearTotal.toLocaleString()}
              </span>{" "}
              total spent this year
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Less</span>
            <span className="inline-block size-3 rounded-sm bg-muted/40" />
            <span className="inline-block size-3 rounded-sm bg-primary/10" />
            <span className="inline-block size-3 rounded-sm bg-primary/25" />
            <span className="inline-block size-3 rounded-sm bg-primary/45" />
            <span className="inline-block size-3 rounded-sm bg-primary/70" />
            <span>More</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <TooltipProvider delay={0}>
            <svg
              width={53 * TOTAL + 32}
              height={7 * TOTAL + 24}
              className="text-muted-foreground"
            >
              {/* Month labels */}
              {monthLabels.map((m) => (
                <text
                  key={`${m.label}-${m.col}`}
                  x={m.col * TOTAL + 32}
                  y={10}
                  className="fill-muted-foreground text-[10px]"
                >
                  {m.label}
                </text>
              ))}

              {/* Day labels */}
              {DAY_LABELS.map((label, i) =>
                label ? (
                  <text
                    key={i}
                    x={0}
                    y={i * TOTAL + 28}
                    className="fill-muted-foreground text-[10px]"
                    dominantBaseline="middle"
                  >
                    {label}
                  </text>
                ) : null
              )}

              {/* Day cells */}
              {grid.map((cell) => (
                <Tooltip key={cell.date}>
                  <TooltipTrigger
                    render={
                      <rect
                        x={cell.col * TOTAL + 32}
                        y={cell.row * TOTAL + 18}
                        width={CELL_SIZE}
                        height={CELL_SIZE}
                        rx={2}
                        className={`${intensityClass(cell.amount, max)} transition-colors hover:stroke-foreground/30 hover:stroke-1`}
                      />
                    }
                  />
                  <TooltipContent>
                    <span className="tabular-nums">
                      ${cell.amount.toLocaleString()}
                    </span>{" "}
                    on{" "}
                    {new Date(cell.date + "T12:00:00").toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </TooltipContent>
                </Tooltip>
              ))}
            </svg>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
