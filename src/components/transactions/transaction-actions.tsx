"use client"

import { AnimatePresence, motion } from "motion/react"
import { DownloadIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

interface TransactionActionsProps {
  selectedCount: number
  onExport: () => void
  onClear: () => void
}

export function TransactionActions({
  selectedCount,
  onExport,
  onClear,
}: TransactionActionsProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center p-4 md:pl-[calc(var(--sidebar-width)+1rem)]"
        >
          <div className="flex items-center gap-3 rounded-xl bg-card px-4 py-2.5 shadow-lg ring-1 ring-foreground/10">
            <span className="tabular-nums text-sm font-medium">
              {selectedCount} selected
            </span>

            <div className="h-4 w-px bg-border" />

            <Button variant="outline" size="sm" onClick={onExport}>
              <DownloadIcon className="size-3.5" />
              Export CSV
            </Button>

            <Button variant="ghost" size="sm" onClick={onClear}>
              <XIcon className="size-3.5" />
              Clear
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
