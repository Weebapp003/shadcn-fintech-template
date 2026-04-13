"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { SnowflakeIcon, WifiIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CardData } from "@/data/seed"

interface InteractiveCardProps {
  card: CardData
  frozen: boolean
}

export function InteractiveCard({
  card,
  frozen,
}: InteractiveCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [cvvRevealed, setCvvRevealed] = useState(false)

  return (
    <div
      className="aspect-[1.586/1] w-full max-w-[400px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* ── Front Face ── */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-between rounded-2xl p-5",
            card.color,
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top row */}
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium">{card.name}</span>
            <Image
              src={card.network === "visa" ? "/logos/visa-com.svg" : "/logos/mastercard-com.svg"}
              alt={card.network}
              width={48}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Chip + NFC */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-11 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 opacity-80" />
            <WifiIcon className="size-5 rotate-90 opacity-60" />
          </div>

          {/* Card number */}
          <p className="font-mono text-base tracking-widest tabular-nums">
            **** **** **** {card.last4}
          </p>

          {/* Bottom row */}
          <div className="flex items-end justify-between">
            <span className="text-xs font-medium uppercase tracking-wide">
              {card.holder}
            </span>
            <span className="text-xs tabular-nums">{card.expiry}</span>
          </div>
        </div>

        {/* ── Back Face ── */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl bg-primary text-primary-foreground"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Magnetic stripe */}
          <div className="mt-6 h-10 w-full bg-foreground/80" />

          <div className="flex flex-1 flex-col justify-between p-5 pt-4">
            {/* Signature + CVV area */}
            <div className="flex items-center gap-3">
              <div className="h-8 flex-1 rounded bg-muted/20" />
              <div
                className="flex h-8 w-14 items-center justify-center rounded bg-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setCvvRevealed((r) => !r)
                }}
              >
                <AnimatePresence mode="wait">
                  {cvvRevealed ? (
                    <motion.span
                      key="cvv"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="font-mono text-sm font-bold text-foreground tabular-nums"
                    >
                      {card.cvv}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="hidden"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="font-mono text-sm text-muted-foreground"
                    >
                      ***
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className="text-xs text-primary-foreground/60">
              Tap CVV box to reveal. Click card to flip back.
            </p>
          </div>
        </div>

        {/* ── Freeze Overlay ── */}
        <AnimatePresence>
          {frozen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 rounded-2xl bg-background/70 backdrop-blur-sm"
            >
              <SnowflakeIcon className="size-8 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Card Frozen
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
