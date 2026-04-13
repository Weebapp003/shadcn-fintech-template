"use client"

import { useMemo, useState } from "react"

import { transferRecords, type TransferRecord } from "@/data/seed"
import { cn } from "@/lib/utils"
import { TransferStats } from "@/components/transfers/transfer-stats"
import { TransferList } from "@/components/transfers/transfer-list"
import { QuickSend } from "@/components/transfers/quick-send"

type TabKey = "all" | "sent" | "received" | "scheduled"

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "sent", label: "Sent" },
  { key: "received", label: "Received" },
  { key: "scheduled", label: "Scheduled" },
]

export function TransfersPageClient() {
  const [activeTab, setActiveTab] = useState<TabKey>("all")
  const [transfers, setTransfers] = useState<TransferRecord[]>(transferRecords)

  const filtered = useMemo(() => {
    if (activeTab === "all") return transfers
    return transfers.filter((t) => t.type === activeTab)
  }, [activeTab, transfers])

  function handleCancel(id: string) {
    setTransfers((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Stats */}
      <TransferStats transfers={transfers} />

      {/* Tab filter bar */}
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transfer list */}
      <TransferList transfers={filtered} onCancel={handleCancel} />

      {/* Quick send */}
      <QuickSend
        onSend={(record) =>
          setTransfers((prev) => [record, ...prev])
        }
      />
    </div>
  )
}
