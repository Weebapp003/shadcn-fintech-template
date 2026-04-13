import { Suspense } from "react"
import { SettingsPageClient } from "@/components/settings/settings-page-client"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Suspense>
        <SettingsPageClient />
      </Suspense>
    </div>
  )
}
