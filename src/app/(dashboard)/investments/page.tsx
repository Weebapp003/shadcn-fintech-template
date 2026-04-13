import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { LiveTicker } from "@/components/investments/live-ticker"
import { PortfolioAllocation } from "@/components/investments/portfolio-allocation"
import { PerformanceChart } from "@/components/investments/performance-chart"
import { HoldingsTable } from "@/components/investments/holdings-table"
import { Watchlist } from "@/components/investments/watchlist"

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
              <BreadcrumbItem>
                <BreadcrumbPage>Investments</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Live ticker — full width, no padding */}
      <LiveTicker />

      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Row 1: Allocation + Performance */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <PortfolioAllocation />
          </div>
          <div className="lg:col-span-8">
            <PerformanceChart />
          </div>
        </div>

        {/* Row 2: Holdings table */}
        <HoldingsTable />

        {/* Row 3: Watchlist */}
        <Watchlist />
      </div>
    </>
  )
}
