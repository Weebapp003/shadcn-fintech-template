import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { savingsGoals } from "@/data/seed"
import {
  PalmtreeIcon,
  ShieldIcon,
  CarIcon,
  HomeIcon,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  "palm-tree": <PalmtreeIcon className="size-5" />,
  shield: <ShieldIcon className="size-5" />,
  car: <CarIcon className="size-5" />,
  home: <HomeIcon className="size-5" />,
}

export function SavingsGoals() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Savings Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {savingsGoals.map((g) => {
            const percent = Math.round(
              (g.currentAmount / g.targetAmount) * 100
            )
            const monthsLeft = Math.ceil(
              (g.targetAmount - g.currentAmount) / g.monthlyContribution
            )
            const projectedDate = new Date()
            projectedDate.setMonth(projectedDate.getMonth() + monthsLeft)
            const deadlineDate = new Date(g.deadline + " 1")
            const onTrack = projectedDate <= deadlineDate

            return (
              <div
                key={g.id}
                className="flex gap-4 rounded-xl border p-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {iconMap[g.iconName]}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{g.name}</p>
                    <Badge
                      variant={onTrack ? "secondary" : "destructive"}
                      className="text-[10px]"
                    >
                      {onTrack ? "On track" : "Behind"}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold tabular-nums">
                      ${g.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      / ${g.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={percent} className="h-2" />
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>${g.monthlyContribution}/mo</span>
                    <span>Target: {g.deadline}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
