"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dailySpending } from "@/data/seed"
import { cn } from "@/lib/utils"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function SpendingCalendar() {
  const { weeks, maxAmount } = useMemo(() => {
    const map = new Map(dailySpending.map((d) => [d.date, d.amount]))
    // Build April 2026 calendar
    const firstDay = new Date(2026, 3, 1) // April 1
    const startPad = firstDay.getDay() // day of week offset
    const daysInMonth = 30
    const cells: { day: number | null; amount: number; date: string }[] = []

    for (let i = 0; i < startPad; i++) cells.push({ day: null, amount: 0, date: "" })
    let max = 0
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `2026-04-${String(d).padStart(2, "0")}`
      const amount = map.get(dateStr) ?? 0
      if (amount > max) max = amount
      cells.push({ day: d, amount, date: dateStr })
    }

    const weeks: typeof cells[] = []
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7))
    }
    // Pad last week
    const last = weeks[weeks.length - 1]
    while (last.length < 7) last.push({ day: null, amount: 0, date: "" })

    return { weeks, maxAmount: max }
  }, [])

  const today = new Date().getDate()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          April 2026 Spending
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-muted-foreground">
          {DAYS.map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>
        {/* Weeks */}
        <div className="mt-1 grid gap-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1">
              {week.map((cell, ci) => {
                if (cell.day === null) {
                  return <div key={ci} />
                }
                const intensity =
                  cell.amount === 0
                    ? 0
                    : Math.min(Math.round((cell.amount / maxAmount) * 4), 4)
                const isToday = cell.day === 13 // April 13 (today in seed)
                return (
                  <div
                    key={ci}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-lg py-1.5 text-center transition-colors",
                      intensity === 0 && "bg-transparent",
                      intensity === 1 && "bg-primary/10",
                      intensity === 2 && "bg-primary/20",
                      intensity === 3 && "bg-primary/35",
                      intensity === 4 && "bg-primary/50",
                      isToday && "ring-2 ring-primary ring-offset-1 ring-offset-background"
                    )}
                  >
                    <span className="text-[11px] font-medium">{cell.day}</span>
                    {cell.amount > 0 && (
                      <span className="text-[9px] tabular-nums text-muted-foreground">
                        ${cell.amount}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
