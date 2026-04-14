"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { notifications as seedNotifications, type Notification } from "@/data/seed"
import { EmptyState } from "@/components/empty-state"
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
  XIcon,
  BellIcon,
  CheckCheckIcon,
  HandCoinsIcon,
  SplitIcon,
} from "lucide-react"

type FilterType = "all" | "unread" | "transaction" | "security" | "system"

const iconMap: Record<string, React.ReactNode> = {
  "arrow-down-left": <ArrowDownLeftIcon className="size-4" />,
  "shield-alert": <ShieldAlertIcon className="size-4" />,
  "credit-card": <CreditCardIcon className="size-4" />,
  "alert-triangle": <AlertTriangleIcon className="size-4" />,
  sparkles: <SparklesIcon className="size-4" />,
  "check-circle": <CheckCircleIcon className="size-4" />,
  lock: <LockIcon className="size-4" />,
  repeat: <RepeatIcon className="size-4" />,
  clock: <ClockIcon className="size-4" />,
  "trending-up": <TrendingUpIcon className="size-4" />,
  "file-text": <FileTextIcon className="size-4" />,
  "shield-check": <ShieldCheckIcon className="size-4" />,
  "hand-coins": <HandCoinsIcon className="size-4" />,
  split: <SplitIcon className="size-4" />,
}

const typeColors: Record<Notification["type"], string> = {
  transaction: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  security: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  system: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  promotion: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  request: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
}

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Transactions", value: "transaction" },
  { label: "Security", value: "security" },
  { label: "System", value: "system" },
]

export function NotificationsPageClient() {
  const [items, setItems] = React.useState<Notification[]>(seedNotifications)
  const [filter, setFilter] = React.useState<FilterType>("all")

  const unreadCount = items.filter((n) => !n.read).length

  const filtered = items.filter((n) => {
    if (filter === "all") return true
    if (filter === "unread") return !n.read
    return n.type === filter
  })

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function toggleRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  function dismiss(id: string) {
    setItems((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="default" className="tabular-nums">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheckIcon className="size-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Notification List */}
      <Card>
        <CardContent className="p-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <EmptyState
                  variant={filter === "all" || filter === "unread" ? "notifications" : "filter"}
                  className="py-12"
                />
              </motion.div>
            ) : (
              filtered.map((n) => (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={cn(
                      "group relative flex cursor-pointer items-start gap-3 border-b px-4 py-3 transition-colors last:border-b-0 hover:bg-muted/50",
                      !n.read && "bg-primary/[0.03]"
                    )}
                    onClick={() => toggleRead(n.id)}
                  >
                    {/* Unread indicator */}
                    {!n.read && (
                      <span className="absolute left-1.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-emerald-500" />
                    )}

                    {/* Icon */}
                    <div
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                        typeColors[n.type]
                      )}
                    >
                      {iconMap[n.icon] ?? <BellIcon className="size-4" />}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-sm",
                          !n.read ? "font-semibold" : "font-medium"
                        )}
                      >
                        {n.title}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                        {n.description}
                      </p>
                    </div>

                    {/* Time + dismiss */}
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {n.time}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          dismiss(n.id)
                        }}
                      >
                        <XIcon className="size-3" />
                        <span className="sr-only">Dismiss</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
