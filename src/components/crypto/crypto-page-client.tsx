"use client"

import { useState } from "react"
import { cryptoCoins } from "@/data/seed"
import { CryptoPortfolio } from "@/components/crypto/crypto-portfolio"
import { PriceChart } from "@/components/crypto/price-chart"
import { CoinTable } from "@/components/crypto/coin-table"
import { CryptoActivity } from "@/components/crypto/crypto-activity"

export function CryptoPageClient() {
  const [selectedCoin, setSelectedCoin] = useState("btc")

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Row 1: Portfolio + Price Chart */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <CryptoPortfolio coins={cryptoCoins} />
        </div>
        <div className="lg:col-span-8">
          <PriceChart
            selectedCoin={selectedCoin}
            onCoinChange={setSelectedCoin}
          />
        </div>
      </div>

      {/* Row 2: Coin Market Table */}
      <CoinTable coins={cryptoCoins} />

      {/* Row 3: Recent Activity */}
      <CryptoActivity />
    </div>
  )
}
