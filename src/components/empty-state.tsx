"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type EmptyStateVariant =
  | "accounts"
  | "transactions"
  | "cards"
  | "transfers"
  | "investments"
  | "crypto"
  | "analytics"
  | "budgets"
  | "notifications"
  | "search"
  | "filter"
  | "generic"

type EmptyStateProps = {
  variant?: EmptyStateVariant
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

// ── SVG Illustrations ────────────────────────────────────────────────────────

function WalletIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <motion.rect
        x="10" y="22" width="60" height="40" rx="8"
        className="fill-primary/10 stroke-primary/40"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.rect
        x="48" y="34" width="22" height="16" rx="4"
        className="fill-primary/20 stroke-primary/50"
        strokeWidth="1.5"
        initial={{ x: 70, opacity: 0 }}
        animate={{ x: 48, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />
      <motion.circle
        cx="59" cy="42" r="3"
        className="fill-primary"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
      />
      {/* Floating coins */}
      <motion.circle cx="25" cy="14" r="6" className="fill-amber-400/30 stroke-amber-500/50" strokeWidth="1" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }} />
      <motion.text x="25" y="17" textAnchor="middle" className="fill-amber-600/60 text-[7px] font-bold">$</motion.text>
      <motion.circle cx="55" cy="12" r="4.5" className="fill-emerald-400/30 stroke-emerald-500/50" strokeWidth="1" animate={{ y: [0, -3, 0] }} transition={{ duration: 3, delay: 0.5, repeat: Infinity }} />
      <motion.text x="55" y="14.5" textAnchor="middle" className="fill-emerald-600/60 text-[6px] font-bold">$</motion.text>
    </svg>
  )
}

function TransactionIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      {/* Document */}
      <motion.rect
        x="18" y="10" width="44" height="56" rx="6"
        className="fill-muted/50 stroke-border"
        strokeWidth="1.5"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 10, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* Lines */}
      {[26, 34, 42, 50].map((y, i) => (
        <motion.rect
          key={y}
          x="26" y={y} width={i === 3 ? 20 : 28} height="3" rx="1.5"
          className="fill-muted-foreground/15"
          initial={{ width: 0 }}
          animate={{ width: i === 3 ? 20 : 28 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
        />
      ))}
      {/* Arrows */}
      <motion.path
        d="M 10 40 L 18 40 M 62 40 L 70 40"
        className="stroke-primary/40"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      <motion.path
        d="M 6 40 L 12 36 L 12 44 Z"
        className="fill-primary/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: [-2, 0, -2] }}
        transition={{ opacity: { delay: 1 }, x: { duration: 2, repeat: Infinity } }}
      />
      <motion.path
        d="M 74 40 L 68 36 L 68 44 Z"
        className="fill-primary/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: [2, 0, 2] }}
        transition={{ opacity: { delay: 1 }, x: { duration: 2, repeat: Infinity } }}
      />
    </svg>
  )
}

function CardIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      {/* Back card */}
      <motion.rect
        x="14" y="20" width="52" height="34" rx="6"
        className="fill-muted stroke-border"
        strokeWidth="1"
        initial={{ rotate: -8, opacity: 0 }}
        animate={{ rotate: -8, opacity: 0.6 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ transformOrigin: "40px 37px" }}
      />
      {/* Front card */}
      <motion.rect
        x="14" y="24" width="52" height="34" rx="6"
        className="fill-primary/10 stroke-primary/40"
        strokeWidth="1.5"
        initial={{ y: 34, opacity: 0 }}
        animate={{ y: 24, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />
      {/* Chip */}
      <motion.rect
        x="22" y="32" width="10" height="7" rx="1.5"
        className="fill-amber-400/50 stroke-amber-500/60"
        strokeWidth="0.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      />
      {/* Dots for card number */}
      {[22, 27, 32, 40, 45, 50].map((x, i) => (
        <motion.circle
          key={x}
          cx={x} cy="46" r="1.5"
          className="fill-primary/25"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9 + i * 0.05 }}
        />
      ))}
      {/* Sparkle */}
      <motion.path
        d="M 58 18 L 60 14 L 62 18 L 66 20 L 62 22 L 60 26 L 58 22 L 54 20 Z"
        className="fill-primary/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "60px 20px" }}
      />
    </svg>
  )
}

function ChartIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      {/* Axes */}
      <motion.path
        d="M 15 65 L 15 15 M 15 65 L 70 65"
        className="stroke-border"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />
      {/* Bars */}
      {[
        { x: 22, h: 30, color: "fill-primary/20" },
        { x: 33, h: 42, color: "fill-primary/30" },
        { x: 44, h: 25, color: "fill-primary/20" },
        { x: 55, h: 48, color: "fill-primary/40" },
      ].map((bar, i) => (
        <motion.rect
          key={bar.x}
          x={bar.x} y={65 - bar.h} width="8" height={bar.h} rx="2"
          className={bar.color}
          initial={{ height: 0, y: 65 }}
          animate={{ height: bar.h, y: 65 - bar.h }}
          transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease: "easeOut" }}
        />
      ))}
      {/* Trend line */}
      <motion.path
        d="M 26 45 L 37 30 L 48 48 L 59 22"
        className="stroke-primary/50"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
      <motion.circle cx="59" cy="22" r="3" className="fill-primary/40" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ delay: 1.6 }} />
    </svg>
  )
}

function BellIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <motion.path
        d="M 40 16 C 30 16 22 24 22 34 L 22 46 L 16 54 L 64 54 L 58 46 L 58 34 C 58 24 50 16 40 16 Z"
        className="fill-muted/60 stroke-border"
        strokeWidth="1.5"
        animate={{ rotate: [0, 3, -3, 2, -2, 0] }}
        transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
        style={{ transformOrigin: "40px 16px" }}
      />
      <motion.path d="M 34 54 C 34 58 36 62 40 62 C 44 62 46 58 46 54" className="stroke-muted-foreground/30" strokeWidth="1.5" fill="none" />
      {/* Notification dot */}
      <motion.circle
        cx="52" cy="24" r="6"
        className="fill-primary/20 stroke-primary/50"
        strokeWidth="1"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle cx="52" cy="24" r="2" className="fill-primary" />
      {/* Checkmark */}
      <motion.path
        d="M 35 38 L 39 42 L 47 34"
        className="stroke-emerald-500/40"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
    </svg>
  )
}

function SearchIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <motion.circle
        cx="36" cy="36" r="20"
        className="fill-muted/40 stroke-border"
        strokeWidth="1.5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.line
        x1="50" y1="50" x2="66" y2="66"
        className="stroke-muted-foreground/40"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      />
      {/* X marks inside */}
      <motion.path
        d="M 30 30 L 42 42 M 42 30 L 30 42"
        className="stroke-muted-foreground/20"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      />
      {/* Floating question marks */}
      <motion.text x="14" y="22" className="fill-muted-foreground/15 text-[14px] font-bold" animate={{ y: [22, 18, 22] }} transition={{ duration: 3, repeat: Infinity }}>?</motion.text>
      <motion.text x="60" y="20" className="fill-muted-foreground/15 text-[10px] font-bold" animate={{ y: [20, 16, 20] }} transition={{ duration: 2.5, delay: 0.4, repeat: Infinity }}>?</motion.text>
    </svg>
  )
}

function GenericIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      {/* Box */}
      <motion.rect
        x="16" y="28" width="48" height="36" rx="4"
        className="fill-muted/40 stroke-border"
        strokeWidth="1.5"
        initial={{ y: 38, opacity: 0 }}
        animate={{ y: 28, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* Lid */}
      <motion.path
        d="M 12 28 L 40 16 L 68 28"
        className="stroke-border fill-muted/20"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      />
      {/* Sparkle particles */}
      {[
        { cx: 30, cy: 22, r: 1.5, delay: 0 },
        { cx: 50, cy: 20, r: 1, delay: 0.3 },
        { cx: 58, cy: 26, r: 1.5, delay: 0.6 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx} cy={p.cy} r={p.r}
          className="fill-primary/30"
          animate={{ y: [0, -6, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, delay: p.delay, repeat: Infinity }}
        />
      ))}
    </svg>
  )
}

// ── Variant config ───────────────────────────────────────────────────────────

const variants: Record<EmptyStateVariant, {
  illustration: React.ReactNode
  title: string
  description: string
}> = {
  accounts: {
    illustration: <WalletIllustration />,
    title: "No accounts linked",
    description: "Connect your bank accounts to see balances, track spending, and manage everything in one place.",
  },
  transactions: {
    illustration: <TransactionIllustration />,
    title: "No transactions yet",
    description: "Your transactions will appear here once you link an account or make your first transfer.",
  },
  cards: {
    illustration: <CardIllustration />,
    title: "No cards added",
    description: "Add a physical or virtual card to manage spending limits, freeze cards, and track payments.",
  },
  transfers: {
    illustration: <TransactionIllustration />,
    title: "No transfers yet",
    description: "Send money to friends, family, or businesses. Your transfer history will show up here.",
  },
  investments: {
    illustration: <ChartIllustration />,
    title: "No investments",
    description: "Start building your portfolio by connecting a brokerage account or making your first investment.",
  },
  crypto: {
    illustration: <ChartIllustration />,
    title: "No crypto assets",
    description: "Buy, sell, or transfer cryptocurrency to get started. Real-time prices update every 3 seconds.",
  },
  analytics: {
    illustration: <ChartIllustration />,
    title: "Not enough data",
    description: "Analytics will become available once you have at least one month of transaction history.",
  },
  budgets: {
    illustration: <ChartIllustration />,
    title: "No budgets set",
    description: "Create your first budget to track spending by category and get alerts when you're close to limits.",
  },
  notifications: {
    illustration: <BellIllustration />,
    title: "All caught up!",
    description: "You have no notifications right now. We'll let you know when something needs your attention.",
  },
  search: {
    illustration: <SearchIllustration />,
    title: "No results found",
    description: "Try adjusting your search terms or check for typos.",
  },
  filter: {
    illustration: <SearchIllustration />,
    title: "No matching results",
    description: "No items match your current filters. Try adjusting or clearing your filters.",
  },
  generic: {
    illustration: <GenericIllustration />,
    title: "Nothing here yet",
    description: "This section is empty. Content will appear here when data becomes available.",
  },
}

// ── Component ────────────────────────────────────────────────────────────────

export function EmptyState({
  variant = "generic",
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const config = variants[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className
      )}
    >
      {/* Illustration */}
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {config.illustration}
      </motion.div>

      {/* Text */}
      <div className="max-w-xs space-y-1.5">
        <motion.h3
          className="text-sm font-semibold"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title ?? config.title}
        </motion.h3>
        <motion.p
          className="text-xs leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {description ?? config.description}
        </motion.p>
      </div>

      {/* Action */}
      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button size="sm" variant="outline" onClick={onAction} className="mt-1">
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
