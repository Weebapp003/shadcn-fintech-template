import Image from "next/image"
import { ArrowUpRightIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cryptoCoins } from "@/data/seed"

export function TopCoins() {
  const top3 = cryptoCoins.slice(0, 3)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-8">
      {top3.map((coin) => {
        const positive = coin.change24h >= 0
        return (
          <Card key={coin.id} className="relative">
            <CardContent className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Image
                    src={coin.logo}
                    alt={coin.name}
                    width={32}
                    height={32}
                    className="size-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium leading-tight">{coin.name}</p>
                    <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                  </div>
                </div>
                <div className="flex size-7 items-center justify-center rounded-lg bg-muted">
                  <ArrowUpRightIcon className="size-3.5 text-muted-foreground" />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <p className="text-xl font-bold tabular-nums">
                  $
                  {coin.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
                    positive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  )}
                >
                  {positive ? (
                    <TrendingUpIcon className="size-3" />
                  ) : (
                    <TrendingDownIcon className="size-3" />
                  )}
                  {positive ? "+" : ""}
                  {coin.change24h.toFixed(2)}%
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
