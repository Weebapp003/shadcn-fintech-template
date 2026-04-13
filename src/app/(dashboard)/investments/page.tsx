import { LiveTicker } from "@/components/investments/live-ticker"
import { PortfolioAllocation } from "@/components/investments/portfolio-allocation"
import { PerformanceChart } from "@/components/investments/performance-chart"
import { HoldingsTable } from "@/components/investments/holdings-table"
import { Watchlist } from "@/components/investments/watchlist"

export default function Page() {
  return (
    <>
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
