import { TransactionsPageClient } from "@/components/transactions/transactions-page-client"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <TransactionsPageClient />
    </div>
  )
}
