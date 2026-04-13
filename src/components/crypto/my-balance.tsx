"use client"

import * as React from "react"
import { ArrowUpIcon, ArrowDownIcon, CheckIcon, LoaderCircleIcon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
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
import type { CryptoPrices } from "./crypto-page-client"

type ActionFlow = "idle" | "input" | "loading" | "success"

export function MyBalance({ prices }: { prices: CryptoPrices }) {
  const [highlightedCoin, setHighlightedCoin] = React.useState("eth")
  const [topUpFlow, setTopUpFlow] = React.useState<ActionFlow>("idle")
  const [withdrawFlow, setWithdrawFlow] = React.useState<ActionFlow>("idle")
  const [topUpAmount, setTopUpAmount] = React.useState("")
  const [withdrawAmount, setWithdrawAmount] = React.useState("")
  const [successMsg, setSuccessMsg] = React.useState("")

  const totalBalance = cryptoCoins.reduce(
    (sum, coin) => sum + coin.holdings * (prices[coin.id] ?? coin.price),
    0
  )

  const coin = cryptoCoins.find((c) => c.id === highlightedCoin)
  const coinPrice = coin ? (prices[coin.id] ?? coin.price) : 0
  const coinValue = coin ? coin.holdings * coinPrice : 0

  const stats = [
    {
      label: "Total Profit",
      value: `+$${(totalBalance * 0.033).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      positive: true,
    },
    { label: "Avg. Growing", value: "+14.63%", positive: true },
    {
      label: coin ? coin.symbol : "Best Token",
      value: coin
        ? `$${coinValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "Ethereum",
      positive: null,
    },
  ]

  function handleTopUp() {
    if (topUpFlow === "idle") {
      setTopUpFlow("input")
      return
    }
    if (topUpFlow === "input") {
      const val = parseFloat(topUpAmount)
      if (!val || val <= 0) return
      setTopUpFlow("loading")
      setTimeout(() => {
        setSuccessMsg(`Topped up $${val.toFixed(2)}`)
        setTopUpFlow("success")
        setTimeout(() => {
          setTopUpFlow("idle")
          setTopUpAmount("")
          setSuccessMsg("")
        }, 2000)
      }, 1000)
    }
  }

  function handleWithdraw() {
    if (withdrawFlow === "idle") {
      setWithdrawFlow("input")
      return
    }
    if (withdrawFlow === "input") {
      const val = parseFloat(withdrawAmount)
      if (!val || val <= 0) return
      setWithdrawFlow("loading")
      setTimeout(() => {
        setSuccessMsg(`Withdrew $${val.toFixed(2)}`)
        setWithdrawFlow("success")
        setTimeout(() => {
          setWithdrawFlow("idle")
          setWithdrawAmount("")
          setSuccessMsg("")
        }, 2000)
      }, 1000)
    }
  }

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>My Balance</CardTitle>
        <CardAction>
          <Select value={highlightedCoin} onValueChange={(v) => v && setHighlightedCoin(v)}>
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cryptoCoins.slice(0, 5).map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.p
          key={Math.round(totalBalance)}
          initial={{ opacity: 0.6, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold tabular-nums tracking-tight"
        >
          ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </motion.p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

        {/* Success message */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400"
            >
              <CheckIcon className="size-4" />
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inline inputs */}
        <AnimatePresence>
          {topUpFlow === "input" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Input
                type="text"
                inputMode="decimal"
                placeholder="Enter amount..."
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="mb-2 focus-visible:ring-0"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleTopUp()}
              />
            </motion.div>
          )}
          {withdrawFlow === "input" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Input
                type="text"
                inputMode="decimal"
                placeholder="Enter amount..."
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="mb-2 focus-visible:ring-0"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleWithdraw()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2 pt-1">
          <Button
            className="flex-1 gap-2"
            size="lg"
            onClick={handleTopUp}
            disabled={topUpFlow === "loading" || topUpFlow === "success" || withdrawFlow !== "idle"}
          >
            {topUpFlow === "loading" ? (
              <LoaderCircleIcon className="size-4 animate-spin" />
            ) : (
              <ArrowUpIcon className="size-4" />
            )}
            {topUpFlow === "input" ? "Confirm" : topUpFlow === "loading" ? "Processing..." : "Top Up"}
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2"
            size="lg"
            onClick={handleWithdraw}
            disabled={withdrawFlow === "loading" || withdrawFlow === "success" || topUpFlow !== "idle"}
          >
            {withdrawFlow === "loading" ? (
              <LoaderCircleIcon className="size-4 animate-spin" />
            ) : (
              <ArrowDownIcon className="size-4" />
            )}
            {withdrawFlow === "input" ? "Confirm" : withdrawFlow === "loading" ? "Processing..." : "Withdraw"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
