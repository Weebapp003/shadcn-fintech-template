"use client"

import { useState, useRef, useEffect } from "react"
import {
  DndContext,
  pointerWithin,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable"
import { Button } from "@/components/ui/button"
import { GripVerticalIcon, LayoutGridIcon, LockIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { FinancialOverview } from "@/components/dashboard/financial-overview"
import { AccountCards } from "@/components/dashboard/account-cards"
import { QuickTransfer } from "@/components/dashboard/quick-transfer"
import { SpendingLimit } from "@/components/dashboard/spending-limit"
import { MoneyMovement } from "@/components/dashboard/money-movement"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

type WidgetSize = "sm" | "lg" | "full"

type Block = {
  id: string
  label: string
  size: WidgetSize
  component: React.ReactNode
}

const defaultBlocks: Block[] = [
  { id: "financial-overview", label: "Financial Overview", size: "lg", component: <FinancialOverview /> },
  { id: "account-cards", label: "Account Cards", size: "sm", component: <AccountCards /> },
  { id: "quick-transfer", label: "Quick Transfer", size: "sm", component: <QuickTransfer /> },
  { id: "spending-limit", label: "Spending Limit", size: "sm", component: <SpendingLimit /> },
  { id: "money-movement", label: "Money Movement", size: "sm", component: <MoneyMovement /> },
  { id: "recent-transactions", label: "Recent Transactions", size: "full", component: <RecentTransactions /> },
]

const sizeClass: Record<WidgetSize, string> = {
  sm: "col-span-12 lg:col-span-4",
  lg: "col-span-12 lg:col-span-8",
  full: "col-span-12",
}

const STORAGE_KEY = "vault-dashboard-order"

// ── Null strategy: let CSS Grid handle layout, not dnd-kit transforms ──
const nullStrategy = () => null

function SortableWidget({
  block,
  editing,
  isDragActive,
}: {
  block: Block
  editing: boolean
  isDragActive: boolean
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: block.id,
    disabled: !editing,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        sizeClass[block.size],
        "relative transition-opacity duration-200",
        isDragging && "opacity-30",
        editing && !isDragging && "rounded-xl ring-2 ring-dashed ring-primary/20",
      )}
    >
      {editing && (
        <div
          {...attributes}
          {...listeners}
          className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 cursor-grab items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-medium text-primary-foreground shadow-md active:cursor-grabbing"
        >
          <GripVerticalIcon className="size-3" />
          {block.label}
        </div>
      )}
      <div className={editing ? "pointer-events-none select-none" : undefined}>
        {block.component}
      </div>
    </div>
  )
}

export function DashboardCustomizer() {
  const [editing, setEditing] = useState(false)
  const [blocks, setBlocks] = useState(defaultBlocks)
  const [activeId, setActiveId] = useState<string | null>(null)
  const snapshot = useRef<Block[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const order: string[] = JSON.parse(saved)
        const reordered = order
          .map((id) => defaultBlocks.find((b) => b.id === id))
          .filter(Boolean) as Block[]
        for (const b of defaultBlocks) {
          if (!reordered.find((r) => r.id === b.id)) reordered.push(b)
        }
        setBlocks(reordered)
      }
    } catch {}
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    snapshot.current = [...blocks]
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setBlocks((prev) => {
      const oldIndex = prev.findIndex((b) => b.id === active.id)
      const newIndex = prev.findIndex((b) => b.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  const handleDragEnd = (_event: DragEndEvent) => {
    setActiveId(null)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks.map((b) => b.id)))
  }

  const handleDragCancel = () => {
    setBlocks(snapshot.current)
    setActiveId(null)
  }

  const handleReset = () => {
    setBlocks(defaultBlocks)
    localStorage.removeItem(STORAGE_KEY)
  }

  const activeBlock = blocks.find((b) => b.id === activeId)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Edit toggle */}
      <div className="flex items-center justify-end gap-2">
        {editing && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground"
            onClick={handleReset}
          >
            Reset layout
          </Button>
        )}
        <Button
          variant={editing ? "default" : "outline"}
          size="sm"
          className="h-7 gap-1.5 text-xs"
          onClick={() => setEditing(!editing)}
        >
          {editing ? (
            <>
              <LockIcon className="size-3" />
              Lock
            </>
          ) : (
            <>
              <LayoutGridIcon className="size-3" />
              Customize
            </>
          )}
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={nullStrategy}
        >
          <div className="grid grid-cols-12 gap-4">
            {blocks.map((block) => (
              <SortableWidget
                key={block.id}
                block={block}
                editing={editing}
                isDragActive={activeId !== null}
              />
            ))}
          </div>
        </SortableContext>

        {/* Drag overlay — renders outside the grid, no distortion */}
        <DragOverlay dropAnimation={{ duration: 200, easing: "ease" }}>
          {activeBlock ? (
            <div className="rounded-xl bg-card p-4 shadow-2xl ring-2 ring-primary/30 rotate-[1deg] scale-[1.02]">
              <p className="text-sm font-medium text-muted-foreground">
                {activeBlock.label}
              </p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
