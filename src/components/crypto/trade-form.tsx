"use client"

import * as React from "react"
import { ArrowDownUpIcon, SettingsIcon, LoaderCircleIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { cryptoCoins } from "@/data/seed"

const TABS = ["Exchange", "Trade", "Buy", "Sell"] as const

export function TradeForm() {
  const [activeTab, setActiveTab] = React.useState<string>("Trade")
  const [amount, setAmount] = React.useState("0.5")
  const [fromCoin, setFromCoin] = React.useState("eth")
  const [toCoin, setToCoin] = React.useState("usd")
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const selectedCoin = cryptoCoins.find((c) => c.id === fromCoin)
  const converted = selectedCoin
    ? (parseFloat(amount || "0") * selectedCoin.price).toFixed(2)
    : "0.00"

  function handleTrade() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    }, 1200)
  }

  function handleSwap() {
    // swap the fields visually
    const prevFrom = fromCoin
    const prevTo = toCoin
    setFromCoin(prevTo === "usd" ? "btc" : prevTo)
    setToCoin(prevFrom)
  }

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Transaction</CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon-xs">
            <SettingsIcon className="size-4 text-muted-foreground" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* tab bar */}
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                tab === activeTab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* amount field */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Amount</label>
          <div className="flex items-center gap-2 rounded-lg border border-input bg-transparent px-2.5">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-10 border-0 bg-transparent px-0 text-base font-semibold tabular-nums shadow-none focus-visible:ring-0"
            />
            <Select value={fromCoin} onValueChange={(v) => v && setFromCoin(v)}>
              <SelectTrigger size="sm" className="w-auto shrink-0 border-0 bg-transparent shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cryptoCoins.map((coin) => (
                  <SelectItem key={coin.id} value={coin.id}>
                    {coin.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* swap button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={handleSwap}
          >
            <ArrowDownUpIcon className="size-4" />
          </Button>
        </div>

        {/* received field */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Received</label>
          <div className="flex items-center gap-2 rounded-lg border border-input bg-muted/40 px-2.5">
            <p className="h-10 flex-1 truncate py-2.5 text-base font-semibold tabular-nums text-muted-foreground">
              {converted}
            </p>
            <Select value={toCoin} onValueChange={(v) => v && setToCoin(v)}>
              <SelectTrigger size="sm" className="w-auto shrink-0 border-0 bg-transparent shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                {cryptoCoins.map((coin) => (
                  <SelectItem key={coin.id} value={coin.id}>
                    {coin.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* trade button */}
        <Button
          className="w-full gap-2"
          size="lg"
          onClick={handleTrade}
          disabled={loading || !amount || parseFloat(amount) <= 0}
        >
          {loading ? (
            <>
              <LoaderCircleIcon className="size-4 animate-spin" />
              Processing...
            </>
          ) : success ? (
            "Trade Successful!"
          ) : (
            `${activeTab} Now`
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
