"use client"

import * as React from "react"
import { MyBalance } from "@/components/crypto/my-balance"
import { TopCoins } from "@/components/crypto/top-coins"
import { MyPortfolio } from "@/components/crypto/my-portfolio"
import { CoinInsight } from "@/components/crypto/coin-insight"
import { TradeForm } from "@/components/crypto/trade-form"
import { MarketOverview } from "@/components/crypto/market-overview"
import { cryptoCoins } from "@/data/seed"

export type CryptoPrices = Record<string, number>

export function CryptoPageClient() {
  const [selectedCoin, setSelectedCoin] = React.useState("btc")

  // Build initial prices from seed data
  const [prices, setPrices] = React.useState<CryptoPrices>(() => {
    const initial: CryptoPrices = {}
    for (const coin of cryptoCoins) {
      initial[coin.id] = coin.price
    }
    return initial
  })

  // Store original prices for 24h change calculation
  const originalPrices = React.useMemo(() => {
    const orig: CryptoPrices = {}
    for (const coin of cryptoCoins) {
      orig[coin.id] = coin.price
    }
    return orig
  }, [])

  // Simulate live price drift every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev }
        for (const id of Object.keys(next)) {
          // Drift +/- 0.3%
          const drift = 1 + (Math.random() - 0.5) * 0.006
          next[id] = Math.round(next[id] * drift * 100) / 100
        }
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 px-4 pb-6 lg:grid-cols-12">
      {/* Row 1 */}
      <MyBalance prices={prices} />
      <TopCoins
        prices={prices}
        originalPrices={originalPrices}
        selectedCoin={selectedCoin}
        onSelectCoin={setSelectedCoin}
      />

      {/* Row 2 */}
      <MyPortfolio
        prices={prices}
        originalPrices={originalPrices}
        selectedCoin={selectedCoin}
        onSelectCoin={setSelectedCoin}
      />
      <CoinInsight
        prices={prices}
        selectedCoin={selectedCoin}
      />

      {/* Row 3 */}
      <TradeForm prices={prices} />
      <MarketOverview
        prices={prices}
        originalPrices={originalPrices}
        selectedCoin={selectedCoin}
        onSelectCoin={setSelectedCoin}
      />
    </div>
  )
}
