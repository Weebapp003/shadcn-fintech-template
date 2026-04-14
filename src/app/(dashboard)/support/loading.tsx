import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      {/* Layout */}
      <div className="flex flex-1 flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <div className="hidden w-52 flex-col gap-2 lg:flex">
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="mt-4 h-[220px] w-full rounded-xl" />
        </div>
        {/* Content */}
        <div className="flex-1 space-y-4">
          <div className="flex gap-3">
            <Skeleton className="h-10 flex-1 rounded-md" />
            <Skeleton className="h-10 w-[160px] rounded-md" />
          </div>
          <Skeleton className="h-[420px] rounded-xl" />
        </div>
      </div>
    </div>
  )
}
