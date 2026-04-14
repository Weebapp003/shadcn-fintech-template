"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { XIcon } from "lucide-react"
import { EmptyState } from "@/components/empty-state"

import { cn } from "@/lib/utils"
import type { TransferRecord } from "@/data/seed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TransferListProps {
  transfers: TransferRecord[]
  onCancel: (id: string) => void
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n)

function statusBadge(status: TransferRecord["status"]) {
  switch (status) {
    case "completed":
      return <Badge variant="default">Completed</Badge>
    case "pending":
      return (
        <Badge variant="outline" className="text-amber-500 dark:text-amber-400">
          Pending
        </Badge>
      )
    case "scheduled":
      return (
        <Badge variant="outline" className="text-amber-500 dark:text-amber-400">
          Scheduled
        </Badge>
      )
  }
}

export function TransferList({ transfers, onCancel }: TransferListProps) {
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
      <div className="divide-y">
        <AnimatePresence mode="popLayout" initial={false}>
          {transfers.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState variant="filter" className="py-10" />
            </motion.div>
          )}

          {transfers.map((transfer, i) => (
            <motion.div
              key={transfer.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.2,
                delay: i * 0.03,
                layout: { duration: 0.2 },
              }}
              className="group flex items-center gap-3 px-4 py-3"
            >
              {/* Avatar */}
              <Image
                src={transfer.contactAvatar}
                alt={transfer.contactName}
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full object-cover"
                unoptimized
              />

              {/* Name + note */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {transfer.contactName}
                </p>
                {transfer.note && (
                  <p className="truncate text-xs italic text-muted-foreground">
                    {transfer.note}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div className="shrink-0 text-right">
                <p
                  className={cn(
                    "tabular-nums text-sm font-semibold",
                    transfer.type === "sent" && "text-rose-500",
                    transfer.type === "received" && "text-emerald-500",
                    transfer.type === "scheduled" && "text-amber-500"
                  )}
                >
                  {transfer.type === "sent" && "-"}
                  {transfer.type === "received" && "+"}
                  {fmt(transfer.amount)}
                </p>
                <p className="text-xs text-muted-foreground">{transfer.date}</p>
              </div>

              {/* Status badge */}
              <div className="hidden shrink-0 sm:block">
                {statusBadge(transfer.status)}
              </div>

              {/* Cancel button for scheduled */}
              <div className="w-16 shrink-0 text-right">
                {transfer.status === "scheduled" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => onCancel(transfer.id)}
                  >
                    <XIcon className="size-3" />
                    Cancel
                  </Button>
                ) : null}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
