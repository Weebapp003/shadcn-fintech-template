import Image from "next/image"
import { MoreHorizontalIcon, TrendingUpIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cryptoCoins } from "@/data/seed"

const COLORS = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-rose-500",
]

export function MyPortfolio() {
  const top3 = cryptoCoins.slice(0, 3)
  const total = top3.reduce((s, c) => s + c.holdings * c.price, 0)
  const segments = top3.map((c, i) => ({
    coin: c,
    value: c.holdings * c.price,
    pct: ((c.holdings * c.price) / total) * 100,
    color: COLORS[i % COLORS.length],
  }))

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>My Portfolio</CardTitle>
          <Badge variant="secondary" className="text-xs tabular-nums">
            {top3.length} Total Assets
          </Badge>
        </div>
        <CardAction>
          <Badge
            variant="outline"
            className="border-emerald-200 bg-emerald-500/10 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400"
          >
            <TrendingUpIcon className="size-3" />
            +55%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Profit in last 30 days
        </p>

        {/* allocation bar */}
        <div className="flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full">
          {segments.map((seg) => (
            <div
              key={seg.coin.id}
              className={cn("h-full rounded-full", seg.color)}
              style={{ width: `${seg.pct}%` }}
            />
          ))}
        </div>

        {/* holdings list */}
        <div className="space-y-1">
          {segments.map((seg) => (
            <div
              key={seg.coin.id}
              className="group/row flex items-center gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-muted/60"
            >
              <Image
                src={seg.coin.logo}
                alt={seg.coin.name}
                width={32}
                height={32}
                className="size-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">
                  {seg.coin.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {seg.coin.symbol}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold tabular-nums">
                  $
                  {seg.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <span
                  className={cn(
                    "text-xs font-medium tabular-nums",
                    seg.coin.change24h >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  )}
                >
                  {seg.coin.change24h >= 0 ? "+" : ""}
                  {seg.coin.change24h.toFixed(2)}%
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                className="opacity-0 transition-opacity group-hover/row:opacity-100"
              >
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
