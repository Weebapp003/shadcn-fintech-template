"use client"

import { useMemo, useState } from "react"

import { fullTransactions, type FullTransaction } from "@/data/seed"
import { TransactionSummary } from "@/components/transactions/transaction-summary"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { TransactionTable } from "@/components/transactions/transaction-table"
import { TransactionActions } from "@/components/transactions/transaction-actions"

export function TransactionsPageClient() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(fullTransactions.map((t) => t.category))
    return Array.from(cats).sort()
  }, [])

  const filteredData = useMemo(() => {
    let data: FullTransaction[] = fullTransactions

    if (search) {
      const q = search.toLowerCase()
      data = data.filter(
        (t) =>
          t.merchant.toLowerCase().includes(q) ||
          t.transactionId.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }

    if (categoryFilter !== "all") {
      data = data.filter((t) => t.category === categoryFilter)
    }

    if (statusFilter !== "all") {
      data = data.filter((t) => t.status === statusFilter)
    }

    if (typeFilter !== "all") {
      data = data.filter((t) => t.type === typeFilter)
    }

    return data
  }, [search, categoryFilter, statusFilter, typeFilter])

  function handleExport() {
    const selected = fullTransactions.filter((t) => selectedIds.has(t.id))
    const header = "Merchant,Transaction ID,Amount,Date,Status,Type"
    const rows = selected.map(
      (t) =>
        `"${t.merchant}","${t.transactionId}",${t.amount},"${t.date}","${t.status}","${t.type}"`
    )
    const csv = [header, ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-4">
      <TransactionSummary transactions={filteredData} />

      <TransactionFilters
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categories={categories}
      />

      <TransactionTable
        transactions={filteredData}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
      />

      <TransactionActions
        selectedCount={selectedIds.size}
        onExport={handleExport}
        onClear={() => setSelectedIds(new Set())}
      />
    </div>
  )
}
