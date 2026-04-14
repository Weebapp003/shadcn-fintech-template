"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  faqItems,
  supportTickets,
  systemStatus,
  type FaqItem,
  type SupportTicket,
} from "@/data/seed"
import {
  SearchIcon,
  ChevronDownIcon,
  MessageSquarePlusIcon,
  BookOpenIcon,
  TicketIcon,
  ActivityIcon,
  MailIcon,
  MessageCircleIcon,
  HeadphonesIcon,
  LoaderIcon,
  CheckCircle2Icon,
  ClockIcon,
  CircleDotIcon,
  AlertCircleIcon,
  ShieldIcon,
  CreditCardIcon,
  WalletIcon,
  HelpCircleIcon,
  SendIcon,
  XIcon,
  BotIcon,
  UserIcon,
} from "lucide-react"

// ── Types ────────────────────────────────────────────────────────────────────

type TabId = "faq" | "tickets" | "contact" | "status"

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "faq", label: "FAQ", icon: <BookOpenIcon className="size-4" /> },
  { id: "tickets", label: "My Tickets", icon: <TicketIcon className="size-4" /> },
  { id: "contact", label: "Contact Us", icon: <MessageSquarePlusIcon className="size-4" /> },
  { id: "status", label: "System Status", icon: <ActivityIcon className="size-4" /> },
]

const categoryIcons: Record<FaqItem["category"], React.ReactNode> = {
  account: <WalletIcon className="size-3.5" />,
  payments: <CreditCardIcon className="size-3.5" />,
  security: <ShieldIcon className="size-3.5" />,
  billing: <MailIcon className="size-3.5" />,
  general: <HelpCircleIcon className="size-3.5" />,
}

const categoryColors: Record<FaqItem["category"], string> = {
  account: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  payments: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  security: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  billing: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  general: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
}

// ── FAQ Tab ──────────────────────────────────────────────────────────────────

const categoryFilters = ["all", "account", "payments", "security", "billing", "general"] as const

function FaqTab() {
  const [search, setSearch] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all")
  const [openId, setOpenId] = React.useState<string | null>(null)

  const filtered = faqItems.filter((item) => {
    const matchesSearch =
      !search ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      {/* Search + category pills */}
      <div className="space-y-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors capitalize",
                categoryFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {cat === "all" ? "All Topics" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <Card>
        <CardContent className="p-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground"
              >
                <SearchIcon className="size-10 opacity-30" />
                <p className="text-sm font-medium">No matching questions</p>
                <p className="text-xs">Try a different search term or category</p>
              </motion.div>
            ) : (
              filtered.map((item, i) => {
                const isOpen = openId === item.id
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, delay: i * 0.02 }}
                    className="border-b last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50"
                    >
                      <div className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg", categoryColors[item.category])}>
                        {categoryIcons[item.category]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm", isOpen ? "font-semibold" : "font-medium")}>{item.question}</p>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                              <div className="mt-3 flex items-center gap-3">
                                <span className="text-[11px] text-muted-foreground">Was this helpful?</span>
                                <div className="flex gap-1">
                                  <button type="button" className="rounded-md px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-600">Yes</button>
                                  <button type="button" className="rounded-md px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-rose-500/10 hover:text-rose-600">No</button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-0.5 shrink-0"
                      >
                        <ChevronDownIcon className="size-4 text-muted-foreground" />
                      </motion.div>
                    </button>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Tickets Tab ──────────────────────────────────────────────────────────────

const ticketStatusConfig: Record<SupportTicket["status"], { label: string; icon: React.ReactNode; className: string }> = {
  open: { label: "Open", icon: <CircleDotIcon className="size-3" />, className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  "in-progress": { label: "In Progress", icon: <ClockIcon className="size-3" />, className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  resolved: { label: "Resolved", icon: <CheckCircle2Icon className="size-3" />, className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
}

const priorityConfig: Record<SupportTicket["priority"], { label: string; dot: string }> = {
  high: { label: "High", dot: "bg-rose-500" },
  medium: { label: "Medium", dot: "bg-amber-500" },
  low: { label: "Low", dot: "bg-muted-foreground" },
}

function TicketsTab() {
  const [tickets] = React.useState<SupportTicket[]>(supportTickets)

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {(["open", "in-progress", "resolved"] as const).map((status) => {
          const count = tickets.filter((t) => t.status === status).length
          const cfg = ticketStatusConfig[status]
          return (
            <Card key={status}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={cn("flex size-9 items-center justify-center rounded-xl", cfg.className)}>
                  {cfg.icon}
                </div>
                <div>
                  <p className="text-lg font-bold tabular-nums">{count}</p>
                  <p className="text-[11px] text-muted-foreground">{cfg.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Ticket timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket History</CardTitle>
          <CardDescription>Track progress on your support requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-0">
            {/* Vertical line */}
            <div className="absolute left-[18px] top-3 bottom-3 w-px bg-border" />

            {tickets.map((ticket, i) => {
              const sCfg = ticketStatusConfig[ticket.status]
              const pCfg = priorityConfig[ticket.priority]
              return (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className={cn("relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 bg-background", sCfg.className)}>
                    {sCfg.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{ticket.subject}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] text-muted-foreground">#{ticket.id}</span>
                          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <span className={cn("size-1.5 rounded-full", pCfg.dot)} />
                            {pCfg.label} priority
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className={cn("shrink-0 gap-1 text-[10px]", sCfg.className)}>
                        {sCfg.icon}
                        {sCfg.label}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span>Created {ticket.createdAt}</span>
                      <span>Updated {ticket.lastUpdate}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Contact Tab with Live Chat ───────────────────────────────────────────────

type ChatMessage = { id: string; sender: "user" | "bot"; text: string }

const botResponses = [
  "Thanks for reaching out! Let me look into that for you.",
  "I can see your account. Let me pull up the relevant details.",
  "I've escalated this to our specialist team. You should hear back within 2 hours.",
  "Is there anything else I can help you with today?",
]

function LiveChatSimulator() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: "welcome", sender: "bot", text: "Hi there! I'm Vault Assistant. How can I help you today?" },
  ])
  const [input, setInput] = React.useState("")
  const [typing, setTyping] = React.useState(false)
  const responseIdx = React.useRef(0)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing])

  function handleSend() {
    if (!input.trim()) return
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, sender: "user", text: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTyping(true)

    setTimeout(() => {
      const botText = botResponses[responseIdx.current % botResponses.length]
      responseIdx.current++
      setTyping(false)
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, sender: "bot", text: botText }])
    }, 1200 + Math.random() * 800)
  }

  return (
    <Card className="overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b bg-primary/5 px-4 py-3">
        <div className="relative">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <BotIcon className="size-4" />
          </div>
          <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
        </div>
        <div>
          <p className="text-sm font-semibold">Vault Assistant</p>
          <p className="text-[11px] text-muted-foreground">Online &middot; Avg. reply: 30s</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-[280px] overflow-y-auto p-4 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn("flex gap-2", msg.sender === "user" && "flex-row-reverse")}
            >
              <div className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full",
                msg.sender === "bot" ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                {msg.sender === "bot" ? <BotIcon className="size-3.5" /> : <UserIcon className="size-3.5 text-muted-foreground" />}
              </div>
              <div className={cn(
                "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm",
                msg.sender === "bot"
                  ? "rounded-tl-sm bg-muted"
                  : "rounded-tr-sm bg-primary text-primary-foreground"
              )}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <BotIcon className="size-3.5" />
              </div>
              <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-muted px-3.5 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-1.5 rounded-full bg-muted-foreground/50"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            disabled={typing}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || typing}>
            <SendIcon className="size-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}

function ContactChannels() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        { icon: <MessageCircleIcon className="size-5" />, label: "Live Chat", desc: "Avg. wait: 2 min", badge: "Online", badgeColor: "bg-emerald-500", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
        { icon: <MailIcon className="size-5" />, label: "Email Support", desc: "Response within 24h", badge: null, badgeColor: "", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
        { icon: <HeadphonesIcon className="size-5" />, label: "Phone", desc: "Mon-Fri, 9am-6pm", badge: null, badgeColor: "", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
      ].map((ch) => (
        <Card key={ch.label} className="group cursor-pointer transition-all hover:shadow-md hover:ring-1 hover:ring-primary/20">
          <CardContent className="flex items-center gap-3 p-4">
            <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110", ch.color)}>
              {ch.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{ch.label}</p>
                {ch.badge && <span className={cn("size-1.5 rounded-full", ch.badgeColor)} />}
              </div>
              <p className="text-xs text-muted-foreground">{ch.desc}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function TicketForm() {
  const [sending, setSending] = React.useState(false)
  const [sent, setSent] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquarePlusIcon className="size-4 text-primary" />
          Submit a Ticket
        </CardTitle>
        <CardDescription>Describe your issue and we&#39;ll get back to you</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="t-subject">Subject</label>
              <Input id="t-subject" placeholder="Brief description" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="t-category">Category</label>
              <Select defaultValue="general">
                <SelectTrigger id="t-category"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="account">Account</SelectItem>
                  <SelectItem value="payments">Payments</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="t-priority">Priority</label>
              <Select defaultValue="medium">
                <SelectTrigger id="t-priority"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="t-email">Email</label>
              <Input id="t-email" type="email" defaultValue="abderrahim@fintech.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="t-desc">Description</label>
            <Textarea id="t-desc" placeholder="Please provide as much detail as possible..." rows={4} required />
          </div>
          <div className="flex items-center justify-end gap-3">
            <AnimatePresence mode="wait">
              {sent && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2Icon className="size-4" />
                  Ticket submitted!
                </motion.span>
              )}
            </AnimatePresence>
            <Button type="submit" disabled={sending || sent}>
              {sending ? <><LoaderIcon className="size-4 animate-spin" /> Sending...</> : <><SendIcon className="size-4" /> Submit Ticket</>}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function ContactTab() {
  return (
    <div className="space-y-6">
      <ContactChannels />
      <div className="grid gap-6 lg:grid-cols-2">
        <LiveChatSimulator />
        <TicketForm />
      </div>
    </div>
  )
}

// ── Status Tab ───────────────────────────────────────────────────────────────

const statusColors = { operational: "#10b981", degraded: "#f59e0b", outage: "#ef4444" }
const statusLabels = { operational: "Operational", degraded: "Degraded", outage: "Outage" }

function StatusTab() {
  const allOperational = systemStatus.every((s) => s.status === "operational")

  // Generate fake uptime data for 90 days
  const uptimeData = React.useMemo(() => {
    return Array.from({ length: 90 }, (_, i) => {
      if (i === 52) return "outage"
      if (i === 53 || i === 67) return "degraded"
      return "operational" as const
    })
  }, [])

  const uptimePct = ((uptimeData.filter((d) => d === "operational").length / uptimeData.length) * 100).toFixed(2)

  return (
    <div className="space-y-4">
      {/* Overall status banner */}
      <Card className={allOperational ? "ring-1 ring-emerald-500/20" : "ring-1 ring-amber-500/20"}>
        <CardContent className="flex items-center gap-4 p-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={cn(
              "flex size-14 items-center justify-center rounded-2xl",
              allOperational ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            )}
          >
            {allOperational ? <CheckCircle2Icon className="size-7" /> : <AlertCircleIcon className="size-7" />}
          </motion.div>
          <div>
            <p className="text-lg font-semibold">{allOperational ? "All Systems Operational" : "Partial System Degradation"}</p>
            <p className="text-sm text-muted-foreground">{allOperational ? "All services running smoothly" : "Some services experiencing issues"}</p>
          </div>
          <div className="ml-auto hidden text-right sm:block">
            <p className="text-2xl font-bold tabular-nums">{uptimePct}%</p>
            <p className="text-xs text-muted-foreground">90-day uptime</p>
          </div>
        </CardContent>
      </Card>

      {/* Service list with live indicator bars */}
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {systemStatus.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 rounded-lg border p-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{service.name}</p>
              </div>

              {/* Mini uptime bars (last 30 days) */}
              <TooltipProvider>
                <div className="hidden items-center gap-[1.5px] md:flex">
                  {uptimeData.slice(-30).map((status, j) => (
                    <Tooltip key={j}>
                      <TooltipTrigger
                        render={
                          <div
                            className="h-6 w-[4px] rounded-sm transition-colors"
                            style={{ backgroundColor: service.status === "operational" ? statusColors[status] : statusColors[service.status] }}
                          />
                        }
                      />
                      <TooltipContent>
                        <span className="text-xs tabular-nums">{30 - j} days ago &middot; {statusLabels[status]}</span>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>

              <div className="flex items-center gap-2">
                <motion.span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: statusColors[service.status] }}
                  animate={service.status === "operational" ? {} : { opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className={cn(
                  "text-xs font-medium min-w-[80px]",
                  service.status === "operational" ? "text-emerald-600 dark:text-emerald-400"
                    : service.status === "degraded" ? "text-amber-600 dark:text-amber-400"
                      : "text-rose-600 dark:text-rose-400"
                )}>
                  {statusLabels[service.status]}
                </span>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Full 90-day uptime bar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Uptime &mdash; Last 90 Days</CardTitle>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-emerald-500" /> Up</span>
              <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-amber-500" /> Degraded</span>
              <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-rose-500" /> Down</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="flex gap-[1.5px]">
              {uptimeData.map((status, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger
                    render={
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 32 }}
                        transition={{ delay: i * 0.008, duration: 0.3 }}
                        className="flex-1 rounded-sm"
                        style={{ backgroundColor: statusColors[status] }}
                      />
                    }
                  />
                  <TooltipContent>
                    <span className="text-xs tabular-nums">{90 - i} days ago &middot; {statusLabels[status]}</span>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>90 days ago</span>
            <span className="font-medium text-foreground tabular-nums">{uptimePct}% uptime</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────

export function SupportPageClient() {
  const [activeTab, setActiveTab] = React.useState<TabId>("faq")

  const tabContent: Record<TabId, React.ReactNode> = {
    faq: <FaqTab />,
    tickets: <TicketsTab />,
    contact: <ContactTab />,
    status: <StatusTab />,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Help & Support</h1>
        <p className="text-sm text-muted-foreground">Find answers, chat with us, submit tickets, and check system status</p>
      </div>

      <div className="flex flex-1 flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <div className="flex shrink-0 flex-col gap-4 lg:w-52">
          <nav className="hidden flex-col gap-1 lg:flex">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                size="sm"
                className={cn("justify-start gap-2", activeTab === tab.id && "font-semibold")}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </Button>
            ))}
          </nav>
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-2 lg:hidden">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                size="sm"
                className="shrink-0 gap-1.5 text-xs"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">{tabContent[activeTab]}</div>
      </div>
    </div>
  )
}
