"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { LineChart, Line } from "recharts"
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { motion } from "motion/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { CryptoCoin } from "@/data/seed"

type SortDir = "asc" | "desc" | null
type SortKey =
  | "name"
  | "price"
  | "change24h"
  | "change7d"
  | "marketCap"
  | "volume24h"
  | "value"

function SortIcon({
  col,
  sortKey,
  sortDir,
}: {
  col: SortKey
  sortKey: SortKey | null
  sortDir: SortDir
}) {
  if (sortKey !== col)
    return (
      <ArrowUpDown className="ml-1 inline size-3 text-muted-foreground/50" />
    )
  if (sortDir === "asc") return <ArrowUp className="ml-1 inline size-3" />
  return <ArrowDown className="ml-1 inline size-3" />
}

function formatCompact(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`
  return `$${n.toLocaleString()}`
}

export function CoinTable({ coins }: { coins: CryptoCoin[] }) {
  const initialPrices = useMemo(() => {
    const map: Record<string, number> = {}
    for (const c of coins) map[c.id] = c.price
    return map
  }, [coins])
  const [prices, setPrices] = useState<Record<string, number>>(initialPrices)
  const [flashMap, setFlashMap] = useState<Record<string, "up" | "down" | null>>(
    {}
  )
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const prevPricesRef = useRef<Record<string, number>>({ ...initialPrices })

  // Live price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev }
        const flashes: Record<string, "up" | "down" | null> = {}
        for (const c of coins) {
          const change = 1 + (Math.random() - 0.5) * 0.004 // +/- 0.2%
          const newPrice =
            Math.round(prev[c.id] * change * 10000) / 10000
          if (newPrice !== prev[c.id]) {
            flashes[c.id] = newPrice > prev[c.id] ? "up" : "down"
          }
          next[c.id] = newPrice
        }
        prevPricesRef.current = prev
        setFlashMap(flashes)
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [coins])

  // Clear flash after animation
  useEffect(() => {
    if (Object.keys(flashMap).length === 0) return
    const t = setTimeout(() => setFlashMap({}), 600)
    return () => clearTimeout(t)
  }, [flashMap])

  const liveCoins = useMemo(
    () =>
      coins.map((c) => ({
        ...c,
        price: prices[c.id] ?? c.price,
      })),
    [coins, prices]
  )

  const cycleSortDir = useCallback(
    (key: SortKey) => {
      if (sortKey !== key) {
        setSortKey(key)
        setSortDir("asc")
      } else if (sortDir === "asc") {
        setSortDir("desc")
      } else {
        setSortKey(null)
        setSortDir(null)
      }
    },
    [sortKey, sortDir]
  )

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return liveCoins
    const arr = [...liveCoins]
    arr.sort((a, b) => {
      let va: number, vb: number
      switch (sortKey) {
        case "name":
          return sortDir === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        case "price":
          va = a.price
          vb = b.price
          break
        case "change24h":
          va = a.change24h
          vb = b.change24h
          break
        case "change7d":
          va = a.change7d
          vb = b.change7d
          break
        case "marketCap":
          va = a.marketCap
          vb = b.marketCap
          break
        case "volume24h":
          va = a.volume24h
          vb = b.volume24h
          break
        case "value":
          va = a.holdings * a.price
          vb = b.holdings * b.price
          break
        default:
          return 0
      }
      return sortDir === "asc" ? va - vb : vb - va
    })
    return arr
  }, [liveCoins, sortKey, sortDir])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coin Market</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pl-4 text-center">#</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => cycleSortDir("name")}
              >
                Coin{" "}
                <SortIcon col="name" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-right"
                onClick={() => cycleSortDir("price")}
              >
                Price{" "}
                <SortIcon col="price" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-right"
                onClick={() => cycleSortDir("change24h")}
              >
                24h{" "}
                <SortIcon
                  col="change24h"
                  sortKey={sortKey}
                  sortDir={sortDir}
                />
              </TableHead>
              <TableHead
                className="hidden cursor-pointer select-none text-right md:table-cell"
                onClick={() => cycleSortDir("change7d")}
              >
                7d{" "}
                <SortIcon
                  col="change7d"
                  sortKey={sortKey}
                  sortDir={sortDir}
                />
              </TableHead>
              <TableHead
                className="hidden cursor-pointer select-none text-right lg:table-cell"
                onClick={() => cycleSortDir("marketCap")}
              >
                Market Cap{" "}
                <SortIcon
                  col="marketCap"
                  sortKey={sortKey}
                  sortDir={sortDir}
                />
              </TableHead>
              <TableHead
                className="hidden cursor-pointer select-none text-right lg:table-cell"
                onClick={() => cycleSortDir("volume24h")}
              >
                Volume{" "}
                <SortIcon
                  col="volume24h"
                  sortKey={sortKey}
                  sortDir={sortDir}
                />
              </TableHead>
              <TableHead
                className="hidden cursor-pointer select-none text-right xl:table-cell"
                onClick={() => cycleSortDir("value")}
              >
                Holdings{" "}
                <SortIcon col="value" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
              <TableHead className="hidden pr-4 text-right xl:table-cell">
                Trend
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((c, idx) => {
              const flash = flashMap[c.id]
              const positive24h = c.change24h >= 0
              const positive7d = c.change7d >= 0
              const holdingsValue = c.holdings * c.price
              return (
                <TableRow key={c.id}>
                  <TableCell className="pl-4 text-center text-xs text-muted-foreground tabular-nums">
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={c.logo}
                        alt={c.name}
                        width={28}
                        height={28}
                        unoptimized
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {c.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <motion.span
                      key={`${c.id}-${prices[c.id]}`}
                      initial={{
                        backgroundColor:
                          flash === "up"
                            ? "var(--color-emerald-500/0.2)"
                            : flash === "down"
                              ? "var(--color-rose-500/0.2)"
                              : "transparent",
                      }}
                      animate={{ backgroundColor: "transparent" }}
                      transition={{ duration: 0.6 }}
                      className="rounded px-1 py-0.5"
                    >
                      $
                      {c.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: c.price < 1 ? 4 : 2,
                      })}
                    </motion.span>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right tabular-nums font-medium",
                      positive24h
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    )}
                  >
                    <span className="inline-flex items-center gap-0.5">
                      {positive24h ? (
                        <TrendingUp className="size-3.5" />
                      ) : (
                        <TrendingDown className="size-3.5" />
                      )}
                      {positive24h ? "+" : ""}
                      {c.change24h.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "hidden text-right tabular-nums font-medium md:table-cell",
                      positive7d
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    )}
                  >
                    <span className="inline-flex items-center gap-0.5">
                      {positive7d ? (
                        <TrendingUp className="size-3.5" />
                      ) : (
                        <TrendingDown className="size-3.5" />
                      )}
                      {positive7d ? "+" : ""}
                      {c.change7d.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="hidden text-right tabular-nums lg:table-cell">
                    {formatCompact(c.marketCap)}
                  </TableCell>
                  <TableCell className="hidden text-right tabular-nums lg:table-cell">
                    {formatCompact(c.volume24h)}
                  </TableCell>
                  <TableCell className="hidden text-right xl:table-cell">
                    <div>
                      <div className="font-medium tabular-nums">
                        $
                        {holdingsValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground tabular-nums">
                        {c.holdings} {c.symbol}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden pr-4 xl:table-cell">
                    <div className="ml-auto h-[30px] w-[80px]">
                      <LineChart
                        width={80}
                        height={30}
                        data={c.sparklineData.map((v, i) => ({ i, v }))}
                      >
                        <Line
                          type="monotone"
                          dataKey="v"
                          stroke={
                            positive24h
                              ? "var(--color-emerald-500)"
                              : "var(--color-rose-500)"
                          }
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
