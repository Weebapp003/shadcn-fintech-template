import Image from "next/image"
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  ArrowLeftRightIcon,
  ShoppingCartIcon,
  StoreIcon,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { cryptoTransactions } from "@/data/seed"

const typeConfig: Record<
  string,
  { label: string; icon: React.ReactNode; className: string }
> = {
  buy: {
    label: "Buy",
    icon: <ShoppingCartIcon className="size-3" />,
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  },
  sell: {
    label: "Sell",
    icon: <StoreIcon className="size-3" />,
    className:
      "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
  },
  swap: {
    label: "Swap",
    icon: <ArrowLeftRightIcon className="size-3" />,
    className:
      "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
  },
  receive: {
    label: "Receive",
    icon: <ArrowDownLeftIcon className="size-3" />,
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  },
  send: {
    label: "Send",
    icon: <ArrowUpRightIcon className="size-3" />,
    className:
      "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
  },
}

export function CryptoActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Type</TableHead>
              <TableHead>Coin</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="pr-4 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cryptoTransactions.map((tx) => {
              const config = typeConfig[tx.type]
              return (
                <TableRow key={tx.id}>
                  <TableCell className="pl-4">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "h-5 gap-1 rounded-md px-1.5 text-[10px] font-medium",
                        config.className
                      )}
                    >
                      {config.icon}
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={tx.logo}
                        alt={tx.coin}
                        width={24}
                        height={24}
                        unoptimized
                        className="rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium">{tx.coin}</div>
                        <div className="text-xs text-muted-foreground">
                          {tx.coinSymbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {tx.amount.toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}{" "}
                    <span className="text-xs text-muted-foreground">
                      {tx.coinSymbol}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    $
                    {tx.value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {tx.date}
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "h-5 rounded-md px-1.5 text-[10px] font-medium",
                        tx.status === "completed"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                      )}
                    >
                      {tx.status === "completed" ? "Completed" : "Pending"}
                    </Badge>
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
