import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { FinancialOverview } from "@/components/dashboard/financial-overview"
import { AccountCards } from "@/components/dashboard/account-cards"
import { QuickTransfer } from "@/components/dashboard/quick-transfer"
import { SpendingLimit } from "@/components/dashboard/spending-limit"
import { MoneyMovement } from "@/components/dashboard/money-movement"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

export default function Page() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid gap-4 lg:grid-cols-12">
          <FinancialOverview />
          <AccountCards />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <QuickTransfer />
          <SpendingLimit />
          <MoneyMovement />
        </div>
        <RecentTransactions />
      </div>
    </>
  )
}
