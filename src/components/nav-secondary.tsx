"use client"

import * as React from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { notifications } from "@/data/seed"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowDownLeftIcon,
  ShieldAlertIcon,
  CreditCardIcon,
  AlertTriangleIcon,
  SparklesIcon,
  CheckCircleIcon,
  LockIcon,
  RepeatIcon,
  ClockIcon,
  TrendingUpIcon,
  FileTextIcon,
  ShieldCheckIcon,
  HandCoinsIcon,
  SplitIcon,
  CheckIcon,
  XIcon,
  LoaderIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const unreadCount = notifications.filter((n) => !n.read).length

const iconMap: Record<string, React.ReactNode> = {
  "arrow-down-left": <ArrowDownLeftIcon className="size-3.5" />,
  "shield-alert": <ShieldAlertIcon className="size-3.5" />,
  "credit-card": <CreditCardIcon className="size-3.5" />,
  "alert-triangle": <AlertTriangleIcon className="size-3.5" />,
  sparkles: <SparklesIcon className="size-3.5" />,
  "check-circle": <CheckCircleIcon className="size-3.5" />,
  lock: <LockIcon className="size-3.5" />,
  repeat: <RepeatIcon className="size-3.5" />,
  clock: <ClockIcon className="size-3.5" />,
  "trending-up": <TrendingUpIcon className="size-3.5" />,
  "file-text": <FileTextIcon className="size-3.5" />,
  "shield-check": <ShieldCheckIcon className="size-3.5" />,
  "hand-coins": <HandCoinsIcon className="size-3.5" />,
  split: <SplitIcon className="size-3.5" />,
}

const typeColor: Record<string, string> = {
  transaction: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  security: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
  system: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  promotion: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
  request: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
}

function NotificationDropdown({ icon, badge }: { icon: React.ReactNode; badge: number }) {
  const latest = notifications.slice(0, 6)
  const [actionStates, setActionStates] = React.useState<Record<string, "idle" | "loading" | "accepted" | "declined">>({})

  const handleAction = (id: string, action: "accepted" | "declined") => {
    setActionStates((prev) => ({ ...prev, [id]: "loading" }))
    setTimeout(() => {
      setActionStates((prev) => ({ ...prev, [id]: action }))
    }, 800)
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <SidebarMenuButton size="sm" className="relative" />
        }
      >
        {icon}
        <span className="flex-1">Notifications</span>
        {badge > 0 && (
          <span className="flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold leading-none text-primary-foreground tabular-nums">
            {badge}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent side="right" align="end" sideOffset={8} className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
          {badge > 0 && (
            <span className="text-[10px] font-medium text-muted-foreground">
              {badge} unread
            </span>
          )}
        </div>
        <div className="max-h-[380px] overflow-y-auto">
          {latest.map((n) => {
            const state = actionStates[n.id] ?? "idle"
            return (
              <div
                key={n.id}
                className={cn(
                  "flex gap-3 border-b px-4 py-3 last:border-0",
                  !n.read && "bg-muted/50"
                )}
              >
                {/* Avatar for requests, icon for others */}
                {n.actionable?.fromAvatar ? (
                  <Avatar className="mt-0.5 size-7 shrink-0">
                    <AvatarImage src={n.actionable.fromAvatar} />
                    <AvatarFallback className="text-[9px]">
                      {n.actionable.from?.split(" ").map((w) => w[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full", typeColor[n.type])}>
                    {iconMap[n.icon]}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-xs", !n.read ? "font-semibold" : "font-medium")}>
                      {n.title}
                    </p>
                    {!n.read && !n.actionable && (
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    {n.description}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/60">
                    {n.time}
                  </p>

                  {/* Action buttons for actionable notifications */}
                  {n.actionable && (
                    <div className="mt-2">
                      {state === "idle" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="h-7 gap-1 text-[11px]"
                            onClick={(e) => { e.stopPropagation(); handleAction(n.id, "accepted") }}
                          >
                            <CheckIcon className="size-3" />
                            {n.actionable.accept}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 gap-1 text-[11px]"
                            onClick={(e) => { e.stopPropagation(); handleAction(n.id, "declined") }}
                          >
                            <XIcon className="size-3" />
                            {n.actionable.decline}
                          </Button>
                        </div>
                      )}
                      {state === "loading" && (
                        <div className="flex items-center gap-1.5 py-1 text-[11px] text-muted-foreground">
                          <LoaderIcon className="size-3 animate-spin" />
                          Processing...
                        </div>
                      )}
                      {state === "accepted" && (
                        <div className="flex items-center gap-1.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircleIcon className="size-3" />
                          Accepted
                        </div>
                      )}
                      {state === "declined" && (
                        <div className="flex items-center gap-1.5 py-1 text-[11px] font-medium text-muted-foreground">
                          <XIcon className="size-3" />
                          Declined
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="border-t p-2">
          <a
            href="/notifications"
            className="flex items-center justify-center rounded-md py-1.5 text-xs font-medium text-primary hover:bg-muted transition-colors"
          >
            View all notifications
          </a>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: React.ReactNode
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.title === "Notifications" ? (
                <NotificationDropdown icon={item.icon} badge={unreadCount} />
              ) : (
                <SidebarMenuButton size="sm" render={<a href={item.url} />}>
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
