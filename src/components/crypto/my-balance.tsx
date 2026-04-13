"use client"

import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { cryptoCoins } from "@/data/seed"

export function MyBalance() {
  const totalBalance = cryptoCoins.reduce(
    (sum, coin) => sum + coin.holdings * coin.price,
    0
  )

  const stats = [
    { label: "Total Profit", value: "+$2,784.87", positive: true },
    { label: "Avg. Growing", value: "+14.63%", positive: true },
    { label: "Best Token", value: "Ethereum", positive: null },
  ]

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>My Balance</CardTitle>
        <CardAction>
          <Select defaultValue="eth" onValueChange={(v) => v && void 0}>
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cryptoCoins.slice(0, 5).map((coin) => (
                <SelectItem key={coin.id} value={coin.id}>
                  {coin.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-3xl font-bold tabular-nums tracking-tight">
          ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p
                className={cn(
                  "text-sm font-semibold tabular-nums",
                  stat.positive === true && "text-emerald-600 dark:text-emerald-400",
                  stat.positive === false && "text-rose-600 dark:text-rose-400"
                )}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <Button className="flex-1 gap-2" size="lg">
            <ArrowUpIcon className="size-4" />
            Top Up
          </Button>
          <Button variant="outline" className="flex-1 gap-2" size="lg">
            <ArrowDownIcon className="size-4" />
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
