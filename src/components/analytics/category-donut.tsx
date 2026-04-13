"use client"

import { useMemo, useState } from "react"
import { PieChart, Pie, Cell } from "recharts"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeftIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { categoryBreakdowns } from "@/data/seed"

const SUBCATEGORY_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

export function CategoryDonut() {
  const [selected, setSelected] = useState<string | null>(null)

  const total = useMemo(
    () => categoryBreakdowns.reduce((s, c) => s + c.amount, 0),
    []
  )

  const selectedCategory = useMemo(
    () => categoryBreakdowns.find((c) => c.category === selected) ?? null,
    [selected]
  )

  const chartConfig = useMemo<ChartConfig>(() => {
    if (selectedCategory) {
      const config: ChartConfig = {}
      selectedCategory.subcategories.forEach((sub, i) => {
        config[sub.name] = {
          label: sub.name,
          color: SUBCATEGORY_COLORS[i % SUBCATEGORY_COLORS.length],
        }
      })
      return config
    }
    const config: ChartConfig = {}
    categoryBreakdowns.forEach((c) => {
      config[c.category] = {
        label: c.category,
        color: c.color,
      }
    })
    return config
  }, [selectedCategory])

  const pieData = useMemo(() => {
    if (selectedCategory) {
      return selectedCategory.subcategories.map((sub, i) => ({
        name: sub.name,
        value: sub.amount,
        fill: SUBCATEGORY_COLORS[i % SUBCATEGORY_COLORS.length],
      }))
    }
    return categoryBreakdowns.map((c) => ({
      name: c.category,
      value: c.amount,
      fill: c.color,
    }))
  }, [selectedCategory])

  const centerAmount = selectedCategory ? selectedCategory.amount : total

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {selectedCategory
              ? selectedCategory.category
              : "Spending by Category"}
          </CardTitle>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => setSelected(null)}
            >
              <ArrowLeftIcon className="size-3" />
              Back to all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected ?? "all"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-[280px]"
            >
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        `$${Number(value).toLocaleString()}`
                      }
                    />
                  }
                />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={110}
                  strokeWidth={2}
                  stroke="var(--color-card)"
                  paddingAngle={2}
                  onClick={(_, index) => {
                    if (!selectedCategory) {
                      setSelected(categoryBreakdowns[index].category)
                    }
                  }}
                  className={selectedCategory ? "" : "cursor-pointer"}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                {/* Center label */}
                <text
                  x="50%"
                  y="47%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-2xl font-bold tabular-nums"
                >
                  ${centerAmount.toLocaleString()}
                </text>
                <text
                  x="50%"
                  y="56%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-xs"
                >
                  {selectedCategory ? "category total" : "total spent"}
                </text>
              </PieChart>
            </ChartContainer>
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
          {pieData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="truncate text-muted-foreground">
                {entry.name}
              </span>
              <span className="ml-auto font-medium tabular-nums">
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
