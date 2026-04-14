"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { financialHealthScore, type HealthFactor } from "@/data/seed"
import {
  HeartPulseIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PiggyBankIcon,
  ShoppingCartIcon,
  LandmarkIcon,
  LineChartIcon,
  ShieldIcon,
  ReceiptIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react"

// ── Score color helpers ──────────────────────────────────────────────────────

function getScoreGradient(score: number) {
  if (score >= 80) return { from: "#10b981", to: "#34d399" }
  if (score >= 60) return { from: "#3b82f6", to: "#60a5fa" }
  if (score >= 40) return { from: "#f59e0b", to: "#fbbf24" }
  return { from: "#ef4444", to: "#f87171" }
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Good"
  if (score >= 40) return "Fair"
  return "Needs Work"
}

// ── Factor icons ─────────────────────────────────────────────────────────────

const factorIcons: Record<string, React.ReactNode> = {
  hf1: <PiggyBankIcon className="size-4" />,
  hf2: <ShoppingCartIcon className="size-4" />,
  hf3: <LandmarkIcon className="size-4" />,
  hf4: <LineChartIcon className="size-4" />,
  hf5: <ShieldIcon className="size-4" />,
  hf6: <ReceiptIcon className="size-4" />,
}

const statusColor = {
  excellent: { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", fill: "#10b981" },
  good: { text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10", fill: "#3b82f6" },
  fair: { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10", fill: "#f59e0b" },
  poor: { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10", fill: "#ef4444" },
}

// ── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const raf = useRef<ReturnType<typeof requestAnimationFrame>>(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * target)
      setCount(start)
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate)
      }
    }
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [target])

  return <>{count}</>
}

// ── SVG Semi-circle Gauge ─────────────────────────────────────────────────────

const GAUGE_W = 180
const GAUGE_H = 110
const ARC_R = 70
const ARC_CX = GAUGE_W / 2
const ARC_CY = 95
const STROKE = 12

// Semi-circle arc (180 degrees)
const HALF_CIRC = Math.PI * ARC_R

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = {
    x: cx + r * Math.cos((startAngle * Math.PI) / 180),
    y: cy + r * Math.sin((startAngle * Math.PI) / 180),
  }
  const end = {
    x: cx + r * Math.cos((endAngle * Math.PI) / 180),
    y: cy + r * Math.sin((endAngle * Math.PI) / 180),
  }
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

function ScoreGauge({ score }: { score: number }) {
  const { from, to } = getScoreGradient(score)
  const gradientId = "health-gauge-grad"
  const glowId = "health-gauge-glow"
  const trackPath = describeArc(ARC_CX, ARC_CY, ARC_R, -180, 0)
  const scoreDash = (score / 100) * HALF_CIRC
  const scoreGap = HALF_CIRC - scoreDash

  return (
    <div className="relative flex items-center justify-center">
      {/* Soft glow */}
      <motion.div
        className="absolute top-0 h-[90px] w-[160px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(ellipse, ${from}18 0%, transparent 70%)` }}
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg width={GAUGE_W} height={GAUGE_H} viewBox={`0 0 ${GAUGE_W} ${GAUGE_H}`} className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={from} stopOpacity={0.25} />
            <stop offset="50%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <path
          d={trackPath}
          fill="none"
          stroke="var(--color-muted, hsl(var(--muted)))"
          strokeWidth={STROKE}
          strokeLinecap="round"
          opacity={0.2}
        />

        {/* Score arc */}
        <motion.path
          d={trackPath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${HALF_CIRC}`}
          initial={{ strokeDashoffset: HALF_CIRC }}
          animate={{ strokeDashoffset: scoreGap }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          filter={`url(#${glowId})`}
        />

        {/* Scale labels */}
        <text x={ARC_CX - ARC_R - 2} y={ARC_CY + 14} textAnchor="middle" className="fill-muted-foreground/40 text-[9px] tabular-nums">0</text>
        <text x={ARC_CX} y={ARC_CY - ARC_R - 6} textAnchor="middle" className="fill-muted-foreground/40 text-[9px] tabular-nums">50</text>
        <text x={ARC_CX + ARC_R + 2} y={ARC_CY + 14} textAnchor="middle" className="fill-muted-foreground/40 text-[9px] tabular-nums">100</text>
      </svg>

      {/* Center content — positioned over the arc */}
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="text-3xl font-bold tabular-nums tracking-tight">
          <AnimatedCounter target={score} />
        </span>
        <span className="text-[11px] font-medium text-muted-foreground">
          {getScoreLabel(score)}
        </span>
      </div>
    </div>
  )
}

// ── Factor detail panel ──────────────────────────────────────────────────────

function FactorDetail({ factor, onClose }: { factor: HealthFactor; onClose: () => void }) {
  const cfg = statusColor[factor.status]
  const RING_R = 22
  const RING_C = 2 * Math.PI * RING_R

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="space-y-3"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className={cn("flex size-9 items-center justify-center rounded-xl", cfg.bg, cfg.text)}>
            {factorIcons[factor.id]}
          </div>
          <div>
            <p className="text-sm font-semibold">{factor.label}</p>
            <Badge variant="outline" className={cn("text-[10px]", cfg.text)}>
              {factor.status}
            </Badge>
          </div>
        </div>
        <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-muted">
          <XIcon className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      {/* Mini ring + description */}
      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
        <svg width="54" height="54" viewBox="0 0 54 54" className="shrink-0">
          <circle cx="27" cy="27" r={RING_R} fill="none" stroke="var(--color-muted, hsl(var(--muted)))" strokeWidth="5" opacity={0.3} />
          <motion.circle
            cx="27"
            cy="27"
            r={RING_R}
            fill="none"
            stroke={cfg.fill}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            initial={{ strokeDashoffset: RING_C }}
            animate={{ strokeDashoffset: RING_C - (factor.score / 100) * RING_C }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            transform="rotate(-90 27 27)"
          />
          <text x="27" y="27" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-[11px] font-bold tabular-nums">
            {factor.score}
          </text>
        </svg>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {factor.description}
        </p>
      </div>
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export function HealthScore() {
  const { overall, trend, trendDelta, factors } = financialHealthScore
  const [selectedFactor, setSelectedFactor] = useState<HealthFactor | null>(null)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <HeartPulseIcon className="size-4 text-primary" />
          Financial Health
        </CardTitle>
        <CardAction>
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
              trend === "up"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
            )}
          >
            {trend === "up" ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
            +{trendDelta} pts
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {/* Gauge */}
          <ScoreGauge score={overall} />

          {/* Factors */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {selectedFactor ? (
                <FactorDetail
                  key={selectedFactor.id}
                  factor={selectedFactor}
                  onClose={() => setSelectedFactor(null)}
                />
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1"
                >
                  {factors.map((factor, i) => {
                    const cfg = statusColor[factor.status]
                    return (
                      <motion.button
                        key={factor.id}
                        type="button"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.06 }}
                        onClick={() => setSelectedFactor(factor)}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-muted/50"
                      >
                        <div className={cn("flex size-6 shrink-0 items-center justify-center rounded-md", cfg.bg, cfg.text)}>
                          {factorIcons[factor.id]}
                        </div>
                        <span className="flex-1 truncate text-xs font-medium">{factor.label}</span>
                        <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-muted sm:block">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: cfg.fill }}
                            initial={{ width: 0 }}
                            animate={{ width: `${factor.score}%` }}
                            transition={{ duration: 0.7, delay: 1 + i * 0.06 }}
                          />
                        </div>
                        <span className="w-6 text-right text-[11px] font-semibold tabular-nums">{factor.score}</span>
                        <ChevronRightIcon className="size-3 text-muted-foreground" />
                      </motion.button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
