"use client"

import * as React from "react"
import Image from "next/image"
import {
  SearchIcon,
  SlidersHorizontalIcon,
  MoreHorizontalIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react"
import { motion } from "motion/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { cryptoCoins } from "@/data/seed"
import type { CryptoPrices } from "./crypto-page-client"

function compactNumber(n: number) {
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`
  return n.toLocaleString()
}

type SortField = "price" | "volume" | "change"
type SortDir = "asc" | "desc" | null

interface MarketOverviewProps {
  prices: CryptoPrices
  originalPrices: CryptoPrices
  selectedCoin: string
  onSelectCoin: (id: string) => void
}

export function MarketOverview({ prices, originalPrices, selectedCoin, onSelectCoin }: MarketOverviewProps) {
  const [search, setSearch] = React.useState("")
  const [sortField, setSortField] = React.useState<SortField | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDir>(null)

  // Track flash directions in state (not refs) for React 19 compliance
  const [flashes, setFlashes] = React.useState<Record<string, "up" | "down" | null>>({})
  const [prevPrices, setPrevPrices] = React.useState<CryptoPrices>(prices)

  React.useEffect(() => {
    const newFlashes: Record<string, "up" | "down" | null> = {}
    for (const coin of cryptoCoins) {
      const prev = prevPrices[coin.id] ?? coin.price
      const curr = prices[coin.id] ?? coin.price
      if (curr > prev) newFlashes[coin.id] = "up"
      else if (curr < prev) newFlashes[coin.id] = "down"
      else newFlashes[coin.id] = null
    }
    setFlashes(newFlashes)

    const timer = setTimeout(() => {
      setPrevPrices({ ...prices })
      setFlashes({})
    }, 600)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices])

  function handleSort(field: SortField) {
    if (sortField === field) {
      // Cycle: asc -> desc -> none
      if (sortDir === "asc") setSortDir("desc")
      else if (sortDir === "desc") { setSortField(null); setSortDir(null) }
      else setSortDir("asc")
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  // Build coin data with live prices
  const coinsWithLive = cryptoCoins.map((coin) => {
    const livePrice = prices[coin.id] ?? coin.price
    const origPrice = originalPrices[coin.id] ?? coin.price
    const change24h = origPrice > 0 ? ((livePrice - origPrice) / origPrice) * 100 : 0
    // Recalculate volume and market cap proportionally
    const priceRatio = origPrice > 0 ? livePrice / origPrice : 1
    const volume = Math.round(coin.volume24h * priceRatio)
    const marketCap = Math.round(coin.marketCap * priceRatio)
    return { ...coin, livePrice, change24h, liveVolume: volume, liveMarketCap: marketCap }
  })

  const filtered = coinsWithLive.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = React.useMemo(() => {
    if (!sortField || !sortDir) return filtered

    return [...filtered].sort((a, b) => {
      let aVal: number, bVal: number
      switch (sortField) {
        case "price": aVal = a.livePrice; bVal = b.livePrice; break
        case "volume": aVal = a.liveVolume; bVal = b.liveVolume; break
        case "change": aVal = a.change24h; bVal = b.change24h; break
        default: return 0
      }
      return sortDir === "asc" ? aVal - bVal : bVal - aVal
    })
  }, [filtered, sortField, sortDir])

  function SortIndicator({ field }: { field: SortField }) {
    if (sortField !== field) return null
    return sortDir === "asc" ? (
      <ArrowUpIcon className="ml-1 inline size-3" />
    ) : (
      <ArrowDownIcon className="ml-1 inline size-3" />
    )
  }

  return (
    <Card className="lg:col-span-8">
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardAction className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-7 w-36 pl-7 text-xs"
            />
          </div>
          <Button variant="outline" size="icon-xs">
            <SlidersHorizontalIcon className="size-3.5" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Assets</TableHead>
              <TableHead
                className="cursor-pointer select-none text-right"
                onClick={() => handleSort("price")}
              >
                Price
                <SortIndicator field="price" />
              </TableHead>
              <TableHead
                className="hidden cursor-pointer select-none text-right sm:table-cell"
                onClick={() => handleSort("volume")}
              >
                Volume
                <SortIndicator field="volume" />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-right"
                onClick={() => handleSort("change")}
              >
                Change
                <SortIndicator field="change" />
              </TableHead>
              <TableHead className="w-10 pr-4" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((coin) => {
              const positive = coin.change24h >= 0
              const flash = flashes[coin.id] ?? null

              return (
                <TableRow
                  key={coin.id}
                  className={cn(
                    "cursor-pointer transition-colors",
                    selectedCoin === coin.id && "bg-muted/60"
                  )}
                  onClick={() => onSelectCoin(coin.id)}
                >
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={coin.logo}
                        alt={coin.name}
                        width={28}
                        height={28}
                        className="size-7 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {coin.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    <motion.span
                      key={coin.livePrice}
                      initial={
                        flash
                          ? { backgroundColor: flash === "up" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)" }
                          : undefined
                      }
                      animate={{ backgroundColor: "rgba(0,0,0,0)" }}
                      transition={{ duration: 0.6 }}
                      className="rounded px-1"
                    >
                      $
                      {coin.livePrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </motion.span>
                  </TableCell>
                  <TableCell className="hidden text-right tabular-nums text-muted-foreground sm:table-cell">
                    {compactNumber(coin.liveVolume)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                        positive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
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
                  </TableCell>
                  <TableCell className="pr-4" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant="ghost" size="icon-xs" />}
                      >
                        <MoreHorizontalIcon className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom" align="end">
                        <DropdownMenuItem>Buy</DropdownMenuItem>
                        <DropdownMenuItem>Sell</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onSelectCoin(coin.id)}>
                          View Chart
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No coins match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  )
}
