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
  SendIcon,
  LoaderCircleIcon,
  CheckCircle2Icon,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

type SendState = "idle" | "sending" | "success"

export function QuickSend() {
  const [selectedContact, setSelectedContact] = useState(contacts[0].id)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [sendState, setSendState] = useState<SendState>("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const selected = contacts.find((c) => c.id === selectedContact)

  const handleSend = () => {
    if (sendState !== "idle" || !amount || parseFloat(amount) <= 0) return
    setSendState("sending")

    timeoutRef.current = setTimeout(() => {
      setSendState("success")
      timeoutRef.current = setTimeout(() => {
        setSendState("idle")
        setAmount("")
        setNote("")
      }, 2000)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Quick Send</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {sendState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-2 py-4"
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
              className="flex flex-col gap-4 lg:flex-row lg:items-end"
            >
              {/* Contact selector */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">To</label>
                <div className="flex items-center gap-1">
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
                          scale: isSelected ? 1.15 : 0.9,
                          opacity: isSelected ? 1 : 0.6,
                        }}
                        whileHover={{ scale: isSelected ? 1.15 : 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Avatar
                          className={
                            isSelected
                              ? "size-9 ring-2 ring-primary ring-offset-1 ring-offset-background"
                              : "size-8"
                          }
                        >
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback className="text-[10px]">
                            {contact.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      </motion.button>
                    )
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedContact}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.12 }}
                    className="text-xs text-muted-foreground"
                  >
                    Sending to{" "}
                    <span className="font-medium text-foreground">
                      {selected?.name}
                    </span>
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Amount input */}
              <div className="flex-1 space-y-1.5 lg:max-w-[160px]">
                <label className="text-xs text-muted-foreground">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="text"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={sendState === "sending"}
                    className="h-9 pl-7 tabular-nums"
                  />
                </div>
              </div>

              {/* Note input */}
              <div className="flex-1 space-y-1.5 lg:max-w-[200px]">
                <label className="text-xs text-muted-foreground">
                  Note <span className="text-muted-foreground/60">(optional)</span>
                </label>
                <Input
                  type="text"
                  placeholder="What's it for?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={sendState === "sending"}
                  className="h-9"
                />
              </div>

              {/* Send button */}
              <Button
                className="h-9 gap-2 px-6"
                disabled={sendState === "sending" || !amount || parseFloat(amount) <= 0}
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
