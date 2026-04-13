"use client"

import { motion } from "motion/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { aiInsights } from "@/data/seed"
import { cn } from "@/lib/utils"
import {
  BrainIcon,
  SparklesIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
} from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

function TrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
  switch (trend) {
    case "up":
      return <TrendingUpIcon className="size-3" />
    case "down":
      return <TrendingDownIcon className="size-3" />
    default:
      return <MinusIcon className="size-3" />
  }
}

export function AiInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SparklesIcon className="size-4 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-3"
        >
          {aiInsights.map((insight, i) => (
            <motion.div
              key={insight.id}
              variants={item}
              className="flex gap-3 rounded-lg border border-border/50 bg-muted/30 p-3"
            >
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                {i % 2 === 0 ? (
                  <BrainIcon className="size-4 text-primary" />
                ) : (
                  <SparklesIcon className="size-4 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <p className="text-sm leading-snug">{insight.text}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums",
                      insight.trend === "up" &&
                        "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                      insight.trend === "down" &&
                        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      insight.trend === "neutral" &&
                        "bg-muted text-muted-foreground"
                    )}
                  >
                    <TrendIcon trend={insight.trend} />
                    {insight.percentChange > 0
                      ? `${insight.percentChange}%`
                      : "No change"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {insight.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
