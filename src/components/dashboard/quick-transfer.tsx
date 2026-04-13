"use client"

import { useState, useRef } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { contacts } from "@/data/seed"
import {
  ChevronRightIcon,
  SendIcon,
  LoaderCircleIcon,
  CheckCircle2Icon,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

type SendState = "idle" | "sending" | "success"

export function QuickTransfer() {
  const [selectedContact, setSelectedContact] = useState(contacts[0].id)
  const [amount, setAmount] = useState("250.00")
  const [sendState, setSendState] = useState<SendState>("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const selected = contacts.find((c) => c.id === selectedContact)

  const handleSend = () => {
    if (sendState !== "idle" || !amount || parseFloat(amount) <= 0) return
    setSendState("sending")

    // simulate network delay
    timeoutRef.current = setTimeout(() => {
      setSendState("success")
      timeoutRef.current = setTimeout(() => {
        setSendState("idle")
      }, 2000)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">
          Quick Transfer
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-auto gap-1 px-0 text-xs text-muted-foreground">
          See All Contacts
          <ChevronRightIcon className="size-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact avatars row */}
        <div className="flex items-center gap-2">
          <div className="flex items-center py-2">
            {contacts.slice(0, 6).map((contact) => {
              const isSelected = selectedContact === contact.id
              return (
                <motion.button
                  key={contact.id}
                  onClick={() => {
                    if (sendState === "idle") setSelectedContact(contact.id)
                  }}
                  className="relative shrink-0 rounded-full"
                  animate={{
                    scale: isSelected ? 1.2 : 0.9,
                    marginLeft: isSelected ? 6 : -4,
                    marginRight: isSelected ? 6 : -4,
                    zIndex: isSelected ? 10 : 1,
                    opacity: isSelected ? 1 : 0.7,
                  }}
                  whileHover={{ scale: isSelected ? 1.2 : 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Avatar
                    className={
                      isSelected
                        ? "size-11 ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "size-10"
                    }
                  >
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="text-xs">
                      {contact.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-10 shrink-0 rounded-full"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>

        {/* Selected contact name */}
        <AnimatePresence mode="wait">
          <motion.p
            key={selectedContact}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-muted-foreground"
          >
            Sending to{" "}
            <span className="font-medium text-foreground">
              {selected?.name}
            </span>
          </motion.p>
        </AnimatePresence>

        {/* Amount + Send */}
        <AnimatePresence mode="wait">
          {sendState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-2 py-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              >
                <CheckCircle2Icon className="size-10 text-emerald-500" />
              </motion.div>
              <p className="text-sm font-semibold">
                ${parseFloat(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })} sent!
              </p>
              <p className="text-xs text-muted-foreground">
                To {selected?.name}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-3"
            >
              <div className="flex-1 space-y-1.5">
                <label className="text-xs text-muted-foreground">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={sendState === "sending"}
                    className="h-10 pl-7 text-lg font-semibold tabular-nums"
                  />
                </div>
              </div>
              <Button
                className="h-10 gap-2 px-6"
                disabled={sendState === "sending"}
                onClick={handleSend}
              >
                {sendState === "sending" ? (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                ) : (
                  <SendIcon className="size-4" />
                )}
                {sendState === "sending" ? "Sending..." : "Send"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
