"use client"

import * as React from "react"
import Image from "next/image"
import {
  SearchIcon,
  SlidersHorizontalIcon,
  MoreHorizontalIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react"
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
import { cn } from "@/lib/utils"
import { cryptoCoins } from "@/data/seed"

function compactNumber(n: number) {
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`
  return n.toLocaleString()
}

export function MarketOverview() {
  const [search, setSearch] = React.useState("")

  const filtered = cryptoCoins.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  )

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Assets</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Volume</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="w-10 pr-4" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((coin) => {
              const positive = coin.change24h >= 0
              return (
                <TableRow key={coin.id}>
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
                    $
                    {coin.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {compactNumber(coin.volume24h)}
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
                  <TableCell className="pr-4">
                    <Button variant="ghost" size="icon-xs">
                      <MoreHorizontalIcon className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No coins match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
