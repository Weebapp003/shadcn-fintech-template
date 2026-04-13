"use client"

import { useState, useEffect, useCallback } from "react"
import { accountCards, walletBalance } from "@/data/seed"
import {
  CreditCardIcon,
  PlusIcon,
  TrendingUpIcon,
  EuroIcon,
  BitcoinIcon,
  ChartLineIcon,
  NfcIcon,
  XIcon,
  CheckCircle2Icon,
  LoaderCircleIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

type AddState = "idle" | "form" | "adding" | "success"

const initialCards = [
  {
    ...accountCards[0],
    style: "bg-muted text-foreground",
    icon: <EuroIcon className="size-5 opacity-30" />,
    chipColor: "bg-foreground/10",
    last4: "4589",
  },
  {
    ...accountCards[1],
    style: "bg-primary text-primary-foreground",
    icon: <BitcoinIcon className="size-5 opacity-30" />,
    chipColor: "bg-primary-foreground/20",
    last4: "7321",
  },
  {
    ...accountCards[2],
    style: "bg-card text-card-foreground ring-1 ring-border",
    icon: <ChartLineIcon className="size-5 opacity-30" />,
    chipColor: "bg-foreground/10",
    last4: "9012",
  },
]

const newCardOptions = [
  { value: "savings", label: "Savings Account", currency: "$", style: "bg-emerald-600 text-white", icon: <TrendingUpIcon className="size-5 opacity-30" />, chipColor: "bg-white/20" },
  { value: "business", label: "Business Account", currency: "$", style: "bg-violet-600 text-white", icon: <CreditCardIcon className="size-5 opacity-30" />, chipColor: "bg-white/20" },
  { value: "travel", label: "Travel Card", currency: "€", style: "bg-amber-600 text-white", icon: <EuroIcon className="size-5 opacity-30" />, chipColor: "bg-white/20" },
]

export function AccountCards() {
  const [cards, setCards] = useState(initialCards)
  const [order, setOrder] = useState(() => initialCards.map((_, i) => i))
  const [addState, setAddState] = useState<AddState>("idle")
  const [newCardType, setNewCardType] = useState("savings")
  const [newCardName, setNewCardName] = useState("")

  const cycle = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev]
      const front = next.pop()!
      next.unshift(front)
      return next
    })
  }, [])

  useEffect(() => {
    if (addState !== "idle") return
    const id = setInterval(cycle, 2000)
    return () => clearInterval(id)
  }, [cycle, addState])

  const handleAdd = () => {
    setAddState("adding")
    setTimeout(() => {
      const option = newCardOptions.find((o) => o.value === newCardType)!
      const newCard = {
        id: String(cards.length + 1),
        label: newCardName || option.label,
        balance: "0",
        currency: option.currency,
        variant: "default" as const,
        style: option.style,
        icon: option.icon,
        chipColor: option.chipColor,
        last4: String(Math.floor(1000 + Math.random() * 9000)),
      }
      setCards((prev) => [...prev, newCard])
      setOrder((prev) => [...prev, prev.length])
      setAddState("success")
      setTimeout(() => {
        setAddState("idle")
        setNewCardName("")
      }, 1500)
    }, 1200)
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-5 pt-6">
        <AnimatePresence mode="wait">
          {addState === "idle" ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Stacked cards */}
              <div className="relative h-[200px]">
                {order.map((cardIndex, stackPos) => {
                  const c = cards[cardIndex]
                  if (!c) return null
                  const isFront = stackPos === order.length - 1
                  const maxOffset = 48 / Math.max(order.length - 1, 1)
                  return (
                    <motion.button
                      key={c.id}
                      onClick={cycle}
                      layout
                      animate={{
                        y: stackPos * Math.min(maxOffset, 16),
                        scale: 1 - (order.length - 1 - stackPos) * (0.12 / Math.max(order.length - 1, 1)),
                        zIndex: stackPos,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      className={cn(
                        "absolute inset-x-0 flex h-[152px] cursor-pointer flex-col justify-between rounded-2xl px-5 py-4",
                        c.style,
                        isFront ? "shadow-xl" : "shadow-md"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold tracking-wide">{c.label}</span>
                        {c.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={cn("h-7 w-10 rounded-md", c.chipColor)} />
                        <NfcIcon className="size-4 opacity-20" />
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="font-mono text-[10px] tracking-widest opacity-40">
                          **** {c.last4}
                        </span>
                        <p className="text-xl font-bold tabular-nums tracking-tight">
                          {c.currency === "BTC"
                            ? `${c.balance} ${c.currency}`
                            : `${c.currency}${c.balance}`}
                        </p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="add-flow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex h-[200px] flex-col"
            >
              {addState === "success" ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle2Icon className="size-10 text-emerald-500" />
                  </motion.div>
                  <p className="text-sm font-semibold">Card added!</p>
                  <p className="text-xs text-muted-foreground">
                    {newCardName || newCardOptions.find((o) => o.value === newCardType)?.label}
                  </p>
                </div>
              ) : addState === "adding" ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3">
                  <LoaderCircleIcon className="size-8 animate-spin text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Creating card...</p>
                </div>
              ) : (
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Add New Card</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => setAddState("idle")}
                    >
                      <XIcon className="size-4" />
                    </Button>
                  </div>
                  <Select value={newCardType} onValueChange={(v) => v && setNewCardType(v)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {newCardOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Card name (optional)"
                    value={newCardName}
                    onChange={(e) => setNewCardName(e.target.value)}
                    className="h-9 text-xs"
                  />
                  <Button className="h-9 gap-2 text-xs" onClick={handleAdd}>
                    <PlusIcon className="size-3.5" />
                    Create Card
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card count + add */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CreditCardIcon className="size-3.5" />
            <span>{cards.length} cards</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-7 rounded-full"
            onClick={() => addState === "idle" && setAddState("form")}
          >
            <PlusIcon className="size-3.5" />
          </Button>
        </div>

        {/* Wallet balance */}
        <div className="space-y-1.5 border-t pt-5">
          <p className="text-xs font-medium text-muted-foreground">Wallet Balance</p>
          <p className="text-3xl font-bold tabular-nums tracking-tight">
            ${walletBalance.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <TrendingUpIcon className="size-4" />
            <span>+{walletBalance.changePercent}% this month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
