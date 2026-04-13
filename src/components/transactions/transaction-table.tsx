"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import {
  CreditCardIcon,
  FileTextIcon,
  InfoIcon,
  MoreHorizontalIcon,
  StickyNoteIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { FullTransaction } from "@/data/seed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TransactionTableProps {
  transactions: FullTransaction[]
  selectedIds: Set<string>
  setSelectedIds: (ids: Set<string>) => void
  expandedId: string | null
  setExpandedId: (id: string | null) => void
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Math.abs(n))

function statusBadge(status: FullTransaction["status"]) {
  switch (status) {
    case "completed":
      return <Badge variant="default">Completed</Badge>
    case "pending":
      return (
        <Badge variant="outline" className="text-amber-500 dark:text-amber-400">
          Pending
        </Badge>
      )
    case "failed":
      return <Badge variant="destructive">Failed</Badge>
  }
}

export function TransactionTable({
  transactions,
  selectedIds,
  setSelectedIds,
  expandedId,
  setExpandedId,
}: TransactionTableProps) {
  const allSelected =
    transactions.length > 0 && transactions.every((t) => selectedIds.has(t.id))

  const someSelected =
    transactions.some((t) => selectedIds.has(t.id)) && !allSelected

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(transactions.map((t) => t.id)))
    }
  }

  function toggleOne(id: string) {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelectedIds(next)
  }

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 pl-3">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected
                }}
                onChange={toggleAll}
                className="size-4 cursor-pointer rounded accent-primary"
              />
            </TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead className="hidden sm:table-cell">Transaction ID</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-muted-foreground"
              >
                No transactions found.
              </TableCell>
            </TableRow>
          )}

          {transactions.map((tx) => {
            const isExpanded = expandedId === tx.id
            return (
              <TransactionRow
                key={tx.id}
                tx={tx}
                isSelected={selectedIds.has(tx.id)}
                isExpanded={isExpanded}
                onToggleSelect={() => toggleOne(tx.id)}
                onToggleExpand={() =>
                  setExpandedId(isExpanded ? null : tx.id)
                }
              />
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

function TransactionRow({
  tx,
  isSelected,
  isExpanded,
  onToggleSelect,
  onToggleExpand,
}: {
  tx: FullTransaction
  isSelected: boolean
  isExpanded: boolean
  onToggleSelect: () => void
  onToggleExpand: () => void
}) {
  return (
    <>
      <TableRow
        className={cn(
          "group cursor-pointer",
          isSelected && "bg-muted/50",
          isExpanded && "border-b-0"
        )}
        onClick={onToggleExpand}
      >
        <TableCell className="pl-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            onClick={(e) => e.stopPropagation()}
            className="size-4 cursor-pointer rounded accent-primary"
          />
        </TableCell>

        <TableCell>
          <div className="flex items-center gap-2.5">
            <Image
              src={tx.logo}
              alt={tx.merchant}
              width={32}
              height={32}
              className="size-8 rounded-lg object-cover"
              unoptimized
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{tx.merchant}</p>
              <Badge variant="secondary" className="mt-0.5 text-[10px]">
                {tx.category}
              </Badge>
            </div>
          </div>
        </TableCell>

        <TableCell className="hidden sm:table-cell">
          <span className="font-mono text-xs text-muted-foreground">
            {tx.transactionId}
          </span>
        </TableCell>

        <TableCell className="text-right">
          <span
            className={cn(
              "tabular-nums text-sm font-semibold",
              tx.type === "income" ? "text-emerald-500" : "text-foreground"
            )}
          >
            {tx.type === "income" ? "+" : "-"}
            {fmt(tx.amount)}
          </span>
        </TableCell>

        <TableCell className="hidden md:table-cell">
          <span className="text-sm text-muted-foreground">{tx.date}</span>
        </TableCell>

        <TableCell className="hidden lg:table-cell">
          {statusBadge(tx.status)}
        </TableCell>

        <TableCell>
          <Button
            variant="ghost"
            size="icon-xs"
            className="opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </TableCell>
      </TableRow>

      {/* Expanded detail row */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <tr>
            <td colSpan={7} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-4 border-b bg-muted/30 px-4 py-3 pl-12 text-sm">
                  {tx.merchantInfo && (
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <InfoIcon className="mt-0.5 size-3.5 shrink-0" />
                      <span>{tx.merchantInfo}</span>
                    </div>
                  )}

                  {tx.cardLast4 && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CreditCardIcon className="size-3.5 shrink-0" />
                      <span className="tabular-nums">
                        Paid with card ending ****{tx.cardLast4}
                      </span>
                    </div>
                  )}

                  {tx.notes && (
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <StickyNoteIcon className="mt-0.5 size-3.5 shrink-0" />
                      <span>{tx.notes}</span>
                    </div>
                  )}

                  <Button variant="ghost" size="xs" className="ml-auto">
                    <FileTextIcon className="size-3.5" />
                    View Receipt
                  </Button>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  )
}
