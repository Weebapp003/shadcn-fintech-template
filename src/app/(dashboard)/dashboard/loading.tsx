import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
      {/* Row 1: Chart + Cards */}
      <div className="grid gap-4 lg:grid-cols-12">
        <Skeleton className="h-[380px] rounded-xl lg:col-span-8" />
        <Skeleton className="h-[380px] rounded-xl lg:col-span-4" />
      </div>
      {/* Row 2: 3 cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[280px] rounded-xl" />
        <Skeleton className="h-[280px] rounded-xl" />
        <Skeleton className="h-[280px] rounded-xl" />
      </div>
      {/* Row 3: Table */}
      <Skeleton className="h-[320px] rounded-xl" />
    </div>
  )
}
