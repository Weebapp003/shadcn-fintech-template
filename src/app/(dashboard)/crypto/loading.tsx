import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 lg:grid-cols-12">
        <Skeleton className="h-[260px] rounded-xl lg:col-span-4" />
        <div className="grid grid-cols-3 gap-4 lg:col-span-8">
          <Skeleton className="h-[120px] rounded-xl" />
          <Skeleton className="h-[120px] rounded-xl" />
          <Skeleton className="h-[120px] rounded-xl" />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-12">
        <Skeleton className="h-[300px] rounded-xl lg:col-span-4" />
        <Skeleton className="h-[380px] rounded-xl lg:col-span-8" />
      </div>
      <div className="grid gap-4 lg:grid-cols-12">
        <Skeleton className="h-[320px] rounded-xl lg:col-span-4" />
        <Skeleton className="h-[320px] rounded-xl lg:col-span-8" />
      </div>
    </div>
  )
}
