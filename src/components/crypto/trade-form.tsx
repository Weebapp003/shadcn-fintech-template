"use client"

import * as React from "react"
import { ArrowDownUpIcon, SettingsIcon, LoaderCircleIcon, CheckCircleIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
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
import type { CryptoPrices } from "./crypto-page-client"

const TABS = ["Exchange", "Trade", "Buy", "Sell"] as const

interface TradeFormProps {
  prices: CryptoPrices
}

export function TradeForm({ prices }: TradeFormProps) {
  const [activeTab, setActiveTab] = React.useState<string>("Trade")
  const [amount, setAmount] = React.useState("0.5")
  const [fromCoin, setFromCoin] = React.useState("eth")
  const [toCoin, setToCoin] = React.useState("usd")
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [successDetail, setSuccessDetail] = React.useState("")

  const isBuyMode = activeTab === "Buy"
  const isSellMode = activeTab === "Sell"

  // For Buy mode: amount is in USD, fromCoin is "usd", toCoin is a crypto
  // For Sell mode: amount is in crypto, fromCoin is crypto, toCoin is "usd"
  // For Exchange/Trade: amount is from crypto, converted to toCoin

  const fromPrice = prices[fromCoin] ?? 0
  const toPrice = prices[toCoin] ?? 0

  const converted = React.useMemo(() => {
    const val = parseFloat(amount || "0")
    if (val <= 0) return "0.00"

    if (isBuyMode) {
      // USD -> crypto: val USD / crypto price
      const cryptoPrice = prices[toCoin] ?? 0
      if (cryptoPrice <= 0) return "0.00"
      return (val / cryptoPrice).toFixed(6)
    }

    if (isSellMode) {
      // Crypto -> USD: val * crypto price
      const cryptoPrice = prices[fromCoin] ?? 0
      return (val * cryptoPrice).toFixed(2)
    }

    // Exchange/Trade: crypto -> crypto or crypto -> usd
    if (toCoin === "usd") {
      return (val * fromPrice).toFixed(2)
    }
    if (fromPrice <= 0 || toPrice <= 0) return "0.00"
    return ((val * fromPrice) / toPrice).toFixed(6)
  }, [amount, fromCoin, toCoin, fromPrice, toPrice, prices, isBuyMode, isSellMode])

  // Adapt form fields when tab changes
  React.useEffect(() => {
    if (isBuyMode) {
      setFromCoin("usd")
      if (toCoin === "usd") setToCoin("btc")
    } else if (isSellMode) {
      if (fromCoin === "usd") setFromCoin("eth")
      setToCoin("usd")
    } else {
      if (fromCoin === "usd") setFromCoin("eth")
      if (toCoin === fromCoin) setToCoin("usd")
    }
  // Only run when tab changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  function handleTrade() {
    const val = parseFloat(amount || "0")
    if (val <= 0) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      const fromLabel = fromCoin === "usd" ? "USD" : (cryptoCoins.find((c) => c.id === fromCoin)?.symbol ?? fromCoin.toUpperCase())
      const toLabel = toCoin === "usd" ? "USD" : (cryptoCoins.find((c) => c.id === toCoin)?.symbol ?? toCoin.toUpperCase())
      setSuccessDetail(`${val} ${fromLabel} -> ${converted} ${toLabel}`)

      setTimeout(() => {
        setSuccess(false)
        setSuccessDetail("")
      }, 2000)
    }, 1500)
  }

  function handleSwap() {
    const prevFrom = fromCoin
    const prevTo = toCoin
    setFromCoin(prevTo === "usd" ? "btc" : prevTo)
    setToCoin(prevFrom)
  }

  const amountLabel = isBuyMode ? "Amount (USD)" : isSellMode ? "Amount (Crypto)" : "Amount"
  const receivedLabel = isBuyMode ? "You Receive" : isSellMode ? "You Receive (USD)" : "Received"

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
          <label className="text-xs text-muted-foreground">{amountLabel}</label>
          <div className="flex items-center gap-2 rounded-lg border border-input bg-transparent px-2.5">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading || success}
              className="h-10 border-0 bg-transparent px-0 text-base font-semibold tabular-nums shadow-none focus-visible:ring-0"
            />
            {isBuyMode ? (
              <span className="shrink-0 text-sm font-medium text-muted-foreground px-2">USD</span>
            ) : (
              <Select value={fromCoin} onValueChange={(v) => v && setFromCoin(v)} disabled={loading || success}>
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
            )}
          </div>
        </div>

        {/* swap button -- hide for Buy/Sell */}
        {!isBuyMode && !isSellMode && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleSwap}
              disabled={loading || success}
            >
              <ArrowDownUpIcon className="size-4" />
            </Button>
          </div>
        )}

        {/* received field */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">{receivedLabel}</label>
          <div className="flex items-center gap-2 rounded-lg border border-input bg-muted/40 px-2.5">
            <p className="h-10 flex-1 truncate py-2.5 text-base font-semibold tabular-nums text-muted-foreground">
              {converted}
            </p>
            {isSellMode ? (
              <span className="shrink-0 text-sm font-medium text-muted-foreground px-2">USD</span>
            ) : (
              <Select value={toCoin} onValueChange={(v) => v && setToCoin(v)} disabled={loading || success}>
                <SelectTrigger size="sm" className="w-auto shrink-0 border-0 bg-transparent shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {!isBuyMode && <SelectItem value="usd">USD</SelectItem>}
                  {cryptoCoins.map((coin) => (
                    <SelectItem key={coin.id} value={coin.id}>
                      {coin.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* trade button + success state */}
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-1 rounded-lg bg-emerald-500/10 py-3 text-center"
            >
              <CheckCircleIcon className="size-6 text-emerald-500" />
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Trade completed!</p>
              {successDetail && (
                <p className="text-xs text-muted-foreground">{successDetail}</p>
              )}
            </motion.div>
          ) : (
            <motion.div key="button" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
                ) : (
                  `${activeTab} Now`
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
