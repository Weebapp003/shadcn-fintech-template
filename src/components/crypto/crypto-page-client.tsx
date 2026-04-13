"use client"

import { MyBalance } from "@/components/crypto/my-balance"
import { TopCoins } from "@/components/crypto/top-coins"
import { MyPortfolio } from "@/components/crypto/my-portfolio"
import { CoinInsight } from "@/components/crypto/coin-insight"
import { TradeForm } from "@/components/crypto/trade-form"
import { MarketOverview } from "@/components/crypto/market-overview"

export function CryptoPageClient() {
  return (
    <div className="grid gap-4 px-4 pb-6 lg:grid-cols-12">
      {/* Row 1 */}
      <MyBalance />
      <TopCoins />

      {/* Row 2 */}
      <MyPortfolio />
      <CoinInsight />

      {/* Row 3 */}
      <TradeForm />
      <MarketOverview />
    </div>
  )
}
