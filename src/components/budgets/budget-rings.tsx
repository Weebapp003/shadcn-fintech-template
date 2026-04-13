"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { budgetCategories } from "@/data/seed"
import { motion } from "motion/react"
import {
  UtensilsIcon,
  CarIcon,
  Gamepad2Icon,
  ShoppingBagIcon,
  RepeatIcon,
  HeartPulseIcon,
  GraduationCapIcon,
  PlaneIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ReactNode> = {
  utensils: <UtensilsIcon className="size-5" />,
  car: <CarIcon className="size-5" />,
  "gamepad-2": <Gamepad2Icon className="size-5" />,
  "shopping-bag": <ShoppingBagIcon className="size-5" />,
  repeat: <RepeatIcon className="size-5" />,
  "heart-pulse": <HeartPulseIcon className="size-5" />,
  "graduation-cap": <GraduationCapIcon className="size-5" />,
  plane: <PlaneIcon className="size-5" />,
}

const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function BudgetRings() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Monthly Budgets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {budgetCategories.map((b, i) => {
            const percent = Math.min((b.spent / b.budget) * 100, 100)
            const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE
            const isOver = b.spent > b.budget

            return (
              <div key={b.id} className="flex flex-col items-center gap-2">
                <div className="relative size-24">
                  <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                    {/* Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r={RADIUS}
                      fill="none"
                      stroke="currentColor"
                      className="text-muted"
                      strokeWidth="8"
                    />
                    {/* Progress */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={RADIUS}
                      fill="none"
                      stroke="currentColor"
                      className={isOver ? "text-destructive" : b.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      initial={{ strokeDashoffset: CIRCUMFERENCE }}
                      animate={{
                        strokeDashoffset: offset,
                        ...(isOver
                          ? { scale: [1, 1.03, 1], opacity: [1, 0.8, 1] }
                          : {}),
                      }}
                      transition={{
                        strokeDashoffset: {
                          duration: 1,
                          delay: i * 0.1,
                          ease: "easeOut",
                        },
                        scale: isOver
                          ? { duration: 1.5, repeat: Infinity }
                          : undefined,
                        opacity: isOver
                          ? { duration: 1.5, repeat: Infinity }
                          : undefined,
                      }}
                    />
                  </svg>
                  {/* Center icon */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center",
                      isOver ? "text-destructive" : b.color
                    )}
                  >
                    {iconMap[b.iconName]}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{b.category}</p>
                  <p className="text-xs tabular-nums text-muted-foreground">
                    ${b.spent.toLocaleString()}{" "}
                    <span className="text-muted-foreground/60">
                      / ${b.budget.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
