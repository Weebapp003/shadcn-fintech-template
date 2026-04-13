import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="grid gap-4 lg:grid-cols-12">
        <Skeleton className="h-[340px] rounded-xl lg:col-span-4" />
        <Skeleton className="h-[340px] rounded-xl lg:col-span-8" />
      </div>
      <Skeleton className="h-[400px] rounded-xl" />
      <Skeleton className="h-[240px] rounded-xl" />
    </div>
  )
}
