// ---------------------------------------------------------------------------
// Seed data – realistic fintech dashboard mock data
// ---------------------------------------------------------------------------

// Avatar URLs (local)
const avatar = (id: number) => `/avatars/${id}.jpg`

// ── Contacts (Quick Transfer) ──────────────────────────────────────────────
export const contacts = [
  { id: "1", name: "Sarah Chen", avatar: avatar(1) },
  { id: "2", name: "Marcus Johnson", avatar: avatar(3) },
  { id: "3", name: "Elena Rodriguez", avatar: avatar(5) },
  { id: "4", name: "James Wilson", avatar: avatar(8) },
  { id: "5", name: "Aisha Patel", avatar: avatar(9) },
  { id: "6", name: "David Kim", avatar: avatar(11) },
  { id: "7", name: "Olivia Brown", avatar: avatar(16) },
  { id: "8", name: "Liam Murphy", avatar: avatar(12) },
]

// ── Account Cards ──────────────────────────────────────────────────────────
export type AccountCard = {
  id: string
  label: string
  balance: string
  currency: string
  variant: "default" | "dark" | "primary"
}

export const accountCards: AccountCard[] = [
  {
    id: "1",
    label: "Euro Account",
    balance: "42,500",
    currency: "€",
    variant: "default",
  },
  {
    id: "2",
    label: "Crypto Wallet",
    balance: "1.24",
    currency: "BTC",
    variant: "dark",
  },
  {
    id: "3",
    label: "Investment Portfolio",
    balance: "28,300",
    currency: "$",
    variant: "primary",
  },
]

// ── Wallet Balance ─────────────────────────────────────────────────────────
export const walletBalance = {
  amount: 84765.0,
  changePercent: 12.4,
  changeDirection: "up" as const,
}

// ── Monthly Spending Limit ─────────────────────────────────────────────────
export const spendingLimit = {
  budget: 3000,
  spent: 2180,
  remaining: 920,
  currency: "USD",
  periodStart: "Apr 01",
  periodEnd: "Apr 30",
}

// ── Financial Overview (monthly revenue chart) ─────────────────────────────
export const financialOverview = [
  { month: "Jan", currentYear: 48200, lastYear: 42100 },
  { month: "Feb", currentYear: 51800, lastYear: 45300 },
  { month: "Mar", currentYear: 53573, lastYear: 48900 },
  { month: "Apr", currentYear: 124000, lastYear: 52400 },
  { month: "May", currentYear: 98400, lastYear: 61200 },
  { month: "Jun", currentYear: 105600, lastYear: 72800 },
  { month: "Jul", currentYear: 112300, lastYear: 78500 },
  { month: "Aug", currentYear: 108900, lastYear: 82100 },
  { month: "Sep", currentYear: 115200, lastYear: 85400 },
  { month: "Oct", currentYear: 109800, lastYear: 88900 },
  { month: "Nov", currentYear: 118500, lastYear: 92300 },
  { month: "Dec", currentYear: 124000, lastYear: 98500 },
]

// ── Money Movement ─────────────────────────────────────────────────────────
export const moneyMovement7d = [
  { label: "Sun", moneyIn: 2400, moneyOut: 1800 },
  { label: "Mon", moneyIn: 3200, moneyOut: 2100 },
  { label: "Tue", moneyIn: 2800, moneyOut: 1600 },
  { label: "Wed", moneyIn: 4100, moneyOut: 3120 },
  { label: "Thu", moneyIn: 3600, moneyOut: 2400 },
  { label: "Fri", moneyIn: 4250, moneyOut: 3120 },
  { label: "Sat", moneyIn: 1900, moneyOut: 1200 },
]

export const moneyMovement30d = [
  { label: "Week 1", moneyIn: 12400, moneyOut: 8900 },
  { label: "Week 2", moneyIn: 15800, moneyOut: 11200 },
  { label: "Week 3", moneyIn: 9600, moneyOut: 7400 },
  { label: "Week 4", moneyIn: 18200, moneyOut: 13500 },
]

export const moneyMovement90d = [
  { label: "Jan", moneyIn: 42500, moneyOut: 31200 },
  { label: "Feb", moneyIn: 38900, moneyOut: 29800 },
  { label: "Mar", moneyIn: 51200, moneyOut: 37400 },
  { label: "Apr", moneyIn: 46800, moneyOut: 34100 },
  { label: "May", moneyIn: 55300, moneyOut: 41200 },
  { label: "Jun", moneyIn: 48700, moneyOut: 35800 },
  { label: "Jul", moneyIn: 52100, moneyOut: 38900 },
  { label: "Aug", moneyIn: 44600, moneyOut: 33200 },
  { label: "Sep", moneyIn: 49800, moneyOut: 36500 },
  { label: "Oct", moneyIn: 53400, moneyOut: 39100 },
  { label: "Nov", moneyIn: 47200, moneyOut: 34800 },
  { label: "Dec", moneyIn: 56000, moneyOut: 41000 },
]

export const moneyMovementByPeriod = {
  "7d": moneyMovement7d,
  "30d": moneyMovement30d,
  "90d": moneyMovement90d,
} as const

// ── Logo helper ────────────────────────────────────────────────────────────
export const logo = (domain: string) =>
  `/logos/${domain.replace(/\./g, "-")}.png`

// ── Recent Transactions ────────────────────────────────────────────────────
export type Transaction = {
  id: string
  merchant: string
  transactionId: string
  amount: number
  date: string
  logo: string
  category: string
}

export const recentTransactions: Transaction[] = [
  {
    id: "1",
    merchant: "Spotify",
    transactionId: "INV_920076",
    amount: -9.99,
    date: "Apr 10, 2026",
    logo: logo("spotify.com"),
    category: "Entertainment",
  },
  {
    id: "2",
    merchant: "AWS Cloud Services",
    transactionId: "INV_918263",
    amount: -120.0,
    date: "Apr 09, 2026",
    logo: "/logos/aws-amazon-com.svg",
    category: "Technology",
  },
  {
    id: "3",
    merchant: "Stripe Payout",
    transactionId: "TXN_847291",
    amount: 4250.0,
    date: "Apr 08, 2026",
    logo: logo("stripe.com"),
    category: "Income",
  },
  {
    id: "4",
    merchant: "Figma Pro",
    transactionId: "INV_773920",
    amount: -15.0,
    date: "Apr 07, 2026",
    logo: logo("figma.com"),
    category: "Design",
  },
  {
    id: "5",
    merchant: "ChatGPT Plus",
    transactionId: "INV_920077",
    amount: -20.0,
    date: "Apr 06, 2026",
    logo: logo("openai.com"),
    category: "AI Tools",
  },
  {
    id: "6",
    merchant: "Google Workspace",
    transactionId: "INV_661204",
    amount: -12.0,
    date: "Apr 05, 2026",
    logo: logo("google.com"),
    category: "Productivity",
  },
  {
    id: "7",
    merchant: "Client Payment",
    transactionId: "TXN_559831",
    amount: 8500.0,
    date: "Apr 04, 2026",
    logo: logo("paypal.com"),
    category: "Income",
  },
]

// ── Sidebar Navigation ─────────────────────────────────────────────────────
export const sidebarNav = {
  main: [
    {
      title: "Overview",
      url: "/dashboard",
      iconName: "layout-dashboard" as const,
      isActive: true,
    },
    {
      title: "Accounts",
      url: "#",
      iconName: "wallet" as const,
      items: [
        { title: "All Accounts", url: "#" },
        { title: "Savings", url: "#" },
        { title: "Crypto", url: "#" },
      ],
    },
    {
      title: "Transactions",
      url: "#",
      iconName: "arrow-left-right" as const,
      items: [
        { title: "All Transactions", url: "#" },
        { title: "Pending", url: "#" },
        { title: "Recurring", url: "#" },
      ],
    },
    {
      title: "Cards",
      url: "#",
      iconName: "credit-card" as const,
      items: [
        { title: "My Cards", url: "#" },
        { title: "Virtual Cards", url: "#" },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      iconName: "chart-area" as const,
      items: [
        { title: "Spending", url: "#" },
        { title: "Income", url: "#" },
        { title: "Net Worth", url: "#" },
      ],
    },
    {
      title: "Budgets",
      url: "#",
      iconName: "target" as const,
      items: [
        { title: "Monthly Budget", url: "#" },
        { title: "Goals", url: "#" },
      ],
    },
  ],
  secondary: [
    { title: "Settings", url: "#", iconName: "settings" as const },
    { title: "Help & Support", url: "#", iconName: "life-buoy" as const },
  ],
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Transactions
// ══════════════════════════════════════════════════════════════════════════════

export type FullTransaction = {
  id: string
  merchant: string
  transactionId: string
  amount: number
  date: string
  logo: string
  category: string
  status: "completed" | "pending" | "failed"
  type: "expense" | "income"
  notes?: string
  merchantInfo?: string
  cardLast4?: string
}

export const fullTransactions: FullTransaction[] = [
  { id: "t1", merchant: "Spotify", transactionId: "INV_920076", amount: -9.99, date: "Apr 10, 2026", logo: logo("spotify.com"), category: "Entertainment", status: "completed", type: "expense", merchantInfo: "Spotify AB, Stockholm, SE", cardLast4: "4589" },
  { id: "t2", merchant: "AWS Cloud Services", transactionId: "INV_918263", amount: -120.00, date: "Apr 09, 2026", logo: "/logos/aws-amazon-com.svg", category: "Technology", status: "completed", type: "expense", merchantInfo: "Amazon Web Services, Seattle, WA", cardLast4: "4589" },
  { id: "t3", merchant: "Stripe Payout", transactionId: "TXN_847291", amount: 4250.00, date: "Apr 08, 2026", logo: logo("stripe.com"), category: "Income", status: "completed", type: "income", merchantInfo: "Stripe Inc, San Francisco, CA" },
  { id: "t4", merchant: "Figma Pro", transactionId: "INV_773920", amount: -15.00, date: "Apr 07, 2026", logo: logo("figma.com"), category: "Design", status: "completed", type: "expense", merchantInfo: "Figma Inc, San Francisco, CA", cardLast4: "7321" },
  { id: "t5", merchant: "ChatGPT Plus", transactionId: "INV_920077", amount: -20.00, date: "Apr 06, 2026", logo: logo("openai.com"), category: "AI Tools", status: "completed", type: "expense", merchantInfo: "OpenAI LLC, San Francisco, CA", cardLast4: "4589" },
  { id: "t6", merchant: "Google Workspace", transactionId: "INV_661204", amount: -12.00, date: "Apr 05, 2026", logo: logo("google.com"), category: "Productivity", status: "completed", type: "expense", merchantInfo: "Google LLC, Mountain View, CA", cardLast4: "4589" },
  { id: "t7", merchant: "Client Payment", transactionId: "TXN_559831", amount: 8500.00, date: "Apr 04, 2026", logo: logo("paypal.com"), category: "Income", status: "completed", type: "income", merchantInfo: "PayPal Holdings, San Jose, CA" },
  { id: "t8", merchant: "Uber", transactionId: "INV_882341", amount: -24.50, date: "Apr 03, 2026", logo: logo("uber.com"), category: "Transport", status: "completed", type: "expense", merchantInfo: "Uber Technologies, San Francisco, CA", cardLast4: "9012" },
  { id: "t9", merchant: "Netflix", transactionId: "INV_773001", amount: -15.99, date: "Apr 02, 2026", logo: logo("netflix.com"), category: "Entertainment", status: "completed", type: "expense", merchantInfo: "Netflix Inc, Los Gatos, CA", cardLast4: "4589" },
  { id: "t10", merchant: "Amazon", transactionId: "INV_990123", amount: -89.99, date: "Apr 01, 2026", logo: logo("amazon.com"), category: "Shopping", status: "completed", type: "expense", merchantInfo: "Amazon.com Inc, Seattle, WA", cardLast4: "4589" },
  { id: "t11", merchant: "Starbucks", transactionId: "INV_445501", amount: -6.75, date: "Mar 31, 2026", logo: logo("starbucks.com"), category: "Food & Dining", status: "completed", type: "expense", cardLast4: "9012" },
  { id: "t12", merchant: "DoorDash", transactionId: "INV_334112", amount: -32.40, date: "Mar 30, 2026", logo: logo("doordash.com"), category: "Food & Dining", status: "completed", type: "expense", cardLast4: "4589" },
  { id: "t13", merchant: "Adobe Creative Cloud", transactionId: "INV_221098", amount: -54.99, date: "Mar 29, 2026", logo: logo("adobe.com"), category: "Design", status: "completed", type: "expense", merchantInfo: "Adobe Inc, San Jose, CA", cardLast4: "7321" },
  { id: "t14", merchant: "Slack", transactionId: "INV_110987", amount: -8.75, date: "Mar 28, 2026", logo: logo("slack.com"), category: "Productivity", status: "completed", type: "expense", cardLast4: "4589" },
  { id: "t15", merchant: "GitHub Pro", transactionId: "INV_998877", amount: -4.00, date: "Mar 27, 2026", logo: logo("github.com"), category: "Technology", status: "completed", type: "expense", merchantInfo: "GitHub Inc, San Francisco, CA", cardLast4: "4589" },
  { id: "t16", merchant: "Notion", transactionId: "INV_887766", amount: -10.00, date: "Mar 26, 2026", logo: logo("notion.so"), category: "Productivity", status: "pending", type: "expense", cardLast4: "7321" },
  { id: "t17", merchant: "Vercel Pro", transactionId: "INV_776655", amount: -20.00, date: "Mar 25, 2026", logo: logo("vercel.com"), category: "Technology", status: "completed", type: "expense", merchantInfo: "Vercel Inc, San Francisco, CA", cardLast4: "4589" },
  { id: "t18", merchant: "LinkedIn Premium", transactionId: "INV_665544", amount: -29.99, date: "Mar 24, 2026", logo: logo("linkedin.com"), category: "Productivity", status: "completed", type: "expense", cardLast4: "9012" },
  { id: "t19", merchant: "Apple iCloud+", transactionId: "INV_554433", amount: -2.99, date: "Mar 23, 2026", logo: logo("apple.com"), category: "Technology", status: "completed", type: "expense", cardLast4: "4589" },
  { id: "t20", merchant: "Airbnb Booking", transactionId: "INV_443322", amount: -245.00, date: "Mar 22, 2026", logo: logo("airbnb.com"), category: "Travel", status: "completed", type: "expense", merchantInfo: "Airbnb Inc, San Francisco, CA", cardLast4: "9012" },
  { id: "t21", merchant: "Freelance Project", transactionId: "TXN_332211", amount: 3200.00, date: "Mar 21, 2026", logo: logo("wise.com"), category: "Income", status: "completed", type: "income", merchantInfo: "Wise (TransferWise), London, UK" },
  { id: "t22", merchant: "Target", transactionId: "INV_221100", amount: -67.43, date: "Mar 20, 2026", logo: logo("target.com"), category: "Shopping", status: "completed", type: "expense", cardLast4: "9012" },
  { id: "t23", merchant: "Shell Gas", transactionId: "INV_110099", amount: -52.30, date: "Mar 19, 2026", logo: logo("shell.com"), category: "Transport", status: "failed", type: "expense", notes: "Card declined — insufficient funds", cardLast4: "7321" },
  { id: "t24", merchant: "Delta Airlines", transactionId: "INV_009988", amount: -389.00, date: "Mar 18, 2026", logo: logo("delta.com"), category: "Travel", status: "pending", type: "expense", merchantInfo: "Delta Air Lines, Atlanta, GA", cardLast4: "9012" },
  { id: "t25", merchant: "Dividend — AAPL", transactionId: "TXN_889977", amount: 142.50, date: "Mar 17, 2026", logo: logo("apple.com"), category: "Income", status: "completed", type: "income", notes: "Q1 2026 dividend payment" },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Cards
// ══════════════════════════════════════════════════════════════════════════════

export type CardData = {
  id: string
  name: string
  type: "physical" | "virtual"
  last4: string
  cardNumber: string
  holder: string
  expiry: string
  cvv: string
  network: "visa" | "mastercard"
  frozen: boolean
  dailyLimit: number
  monthlySpend: number
  monthlyLimit: number
  color: string
}

export const cardsData: CardData[] = [
  {
    id: "c1",
    name: "Main Debit",
    type: "physical",
    last4: "4589",
    cardNumber: "**** **** **** 4589",
    holder: "ALEX MORGAN",
    expiry: "09/28",
    cvv: "317",
    network: "visa",
    frozen: false,
    dailyLimit: 5000,
    monthlySpend: 2180,
    monthlyLimit: 10000,
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "c2",
    name: "Travel Credit",
    type: "physical",
    last4: "7321",
    cardNumber: "**** **** **** 7321",
    holder: "ALEX MORGAN",
    expiry: "03/27",
    cvv: "892",
    network: "mastercard",
    frozen: false,
    dailyLimit: 3000,
    monthlySpend: 890,
    monthlyLimit: 8000,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    id: "c3",
    name: "Virtual Shopping",
    type: "virtual",
    last4: "9012",
    cardNumber: "**** **** **** 9012",
    holder: "ALEX MORGAN",
    expiry: "12/26",
    cvv: "445",
    network: "visa",
    frozen: false,
    dailyLimit: 1000,
    monthlySpend: 456,
    monthlyLimit: 3000,
    color: "bg-muted text-foreground",
  },
  {
    id: "c4",
    name: "Business Expense",
    type: "physical",
    last4: "3456",
    cardNumber: "**** **** **** 3456",
    holder: "ALEX MORGAN",
    expiry: "06/29",
    cvv: "661",
    network: "mastercard",
    frozen: true,
    dailyLimit: 10000,
    monthlySpend: 0,
    monthlyLimit: 25000,
    color: "bg-card text-card-foreground ring-1 ring-border",
  },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Analytics
// ══════════════════════════════════════════════════════════════════════════════

export type SpendingHeatmapDay = { date: string; amount: number }

// Generate 365 days of spending data programmatically
function generateHeatmap(): SpendingHeatmapDay[] {
  const data: SpendingHeatmapDay[] = []
  const start = new Date(2025, 3, 14) // Apr 14, 2025
  for (let i = 0; i < 365; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const dayOfWeek = d.getDay()
    // Weekdays spend more, weekends less, some zero days
    const base = dayOfWeek === 0 || dayOfWeek === 6 ? 40 : 120
    const noise = Math.sin(i * 0.3) * 60 + Math.cos(i * 0.7) * 40
    const amount = Math.max(0, Math.round(base + noise + (i % 7) * 15))
    data.push({
      date: d.toISOString().split("T")[0],
      amount: Math.random() > 0.1 ? amount : 0, // 10% zero days
    })
  }
  return data
}

export const spendingHeatmapData = generateHeatmap()

export type CategoryBreakdown = {
  category: string
  amount: number
  color: string
  subcategories: { name: string; amount: number }[]
}

export const categoryBreakdowns: CategoryBreakdown[] = [
  { category: "Food & Dining", amount: 820, color: "var(--color-chart-1)", subcategories: [{ name: "Restaurants", amount: 420 }, { name: "Groceries", amount: 280 }, { name: "Coffee", amount: 120 }] },
  { category: "Transport", amount: 450, color: "var(--color-chart-2)", subcategories: [{ name: "Uber/Lyft", amount: 180 }, { name: "Gas", amount: 150 }, { name: "Public Transit", amount: 120 }] },
  { category: "Entertainment", amount: 340, color: "var(--color-chart-3)", subcategories: [{ name: "Streaming", amount: 45 }, { name: "Games", amount: 120 }, { name: "Events", amount: 175 }] },
  { category: "Shopping", amount: 560, color: "var(--color-chart-4)", subcategories: [{ name: "Clothing", amount: 280 }, { name: "Electronics", amount: 180 }, { name: "Home", amount: 100 }] },
  { category: "Subscriptions", amount: 215, color: "var(--color-chart-5)", subcategories: [{ name: "SaaS Tools", amount: 95 }, { name: "Media", amount: 45 }, { name: "Cloud", amount: 75 }] },
  { category: "Health", amount: 180, color: "var(--color-chart-1)", subcategories: [{ name: "Gym", amount: 50 }, { name: "Pharmacy", amount: 80 }, { name: "Supplements", amount: 50 }] },
  { category: "Travel", amount: 634, color: "var(--color-chart-2)", subcategories: [{ name: "Flights", amount: 389 }, { name: "Hotels", amount: 245 }] },
  { category: "Education", amount: 250, color: "var(--color-chart-3)", subcategories: [{ name: "Courses", amount: 150 }, { name: "Books", amount: 100 }] },
]

export type RecurringCharge = {
  id: string
  merchant: string
  logo: string
  amount: number
  frequency: "monthly" | "yearly"
  nextDate: string
  status: "wanted" | "review" | "unset"
  category: string
}

export const recurringCharges: RecurringCharge[] = [
  { id: "r1", merchant: "Spotify", logo: logo("spotify.com"), amount: 9.99, frequency: "monthly", nextDate: "May 10, 2026", status: "wanted", category: "Entertainment" },
  { id: "r2", merchant: "Netflix", logo: logo("netflix.com"), amount: 15.99, frequency: "monthly", nextDate: "May 02, 2026", status: "wanted", category: "Entertainment" },
  { id: "r3", merchant: "ChatGPT Plus", logo: logo("openai.com"), amount: 20.00, frequency: "monthly", nextDate: "May 06, 2026", status: "wanted", category: "AI Tools" },
  { id: "r4", merchant: "Figma Pro", logo: logo("figma.com"), amount: 15.00, frequency: "monthly", nextDate: "May 07, 2026", status: "wanted", category: "Design" },
  { id: "r5", merchant: "Adobe CC", logo: logo("adobe.com"), amount: 54.99, frequency: "monthly", nextDate: "Apr 29, 2026", status: "review", category: "Design" },
  { id: "r6", merchant: "AWS", logo: "/logos/aws-amazon-com.svg", amount: 120.00, frequency: "monthly", nextDate: "May 09, 2026", status: "wanted", category: "Technology" },
  { id: "r7", merchant: "Google Workspace", logo: logo("google.com"), amount: 12.00, frequency: "monthly", nextDate: "May 05, 2026", status: "wanted", category: "Productivity" },
  { id: "r8", merchant: "Slack", logo: logo("slack.com"), amount: 8.75, frequency: "monthly", nextDate: "Apr 28, 2026", status: "review", category: "Productivity" },
  { id: "r9", merchant: "GitHub Pro", logo: logo("github.com"), amount: 4.00, frequency: "monthly", nextDate: "Apr 27, 2026", status: "wanted", category: "Technology" },
  { id: "r10", merchant: "Notion", logo: logo("notion.so"), amount: 10.00, frequency: "monthly", nextDate: "Apr 26, 2026", status: "unset", category: "Productivity" },
  { id: "r11", merchant: "LinkedIn Premium", logo: logo("linkedin.com"), amount: 29.99, frequency: "monthly", nextDate: "Apr 24, 2026", status: "review", category: "Productivity" },
  { id: "r12", merchant: "iCloud+", logo: logo("apple.com"), amount: 2.99, frequency: "monthly", nextDate: "Apr 23, 2026", status: "wanted", category: "Technology" },
]

export type MonthComparison = { category: string; thisMonth: number; lastMonth: number }

export const monthComparisons: MonthComparison[] = [
  { category: "Food & Dining", thisMonth: 820, lastMonth: 690 },
  { category: "Transport", thisMonth: 450, lastMonth: 520 },
  { category: "Entertainment", thisMonth: 340, lastMonth: 280 },
  { category: "Shopping", thisMonth: 560, lastMonth: 410 },
  { category: "Subscriptions", thisMonth: 215, lastMonth: 215 },
  { category: "Health", thisMonth: 180, lastMonth: 200 },
  { category: "Travel", thisMonth: 634, lastMonth: 0 },
  { category: "Education", thisMonth: 250, lastMonth: 300 },
]

export type AiInsight = {
  id: string
  text: string
  trend: "up" | "down" | "neutral"
  percentChange: number
  category: string
}

export const aiInsights: AiInsight[] = [
  { id: "ai1", text: "Your dining spending is up 19% this month — mostly DoorDash orders on weeknights.", trend: "up", percentChange: 19, category: "Food & Dining" },
  { id: "ai2", text: "Transport costs dropped 13% — great job using public transit more.", trend: "down", percentChange: 13, category: "Transport" },
  { id: "ai3", text: "You have 3 subscriptions flagged for review totaling $93.74/month.", trend: "neutral", percentChange: 0, category: "Subscriptions" },
  { id: "ai4", text: "Shopping jumped 37% — a $245 Airbnb booking and $90 Amazon order drove most of it.", trend: "up", percentChange: 37, category: "Shopping" },
  { id: "ai5", text: "You're on track to save $1,200 this month if spending stays consistent.", trend: "down", percentChange: 8, category: "Savings" },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Investments
// ══════════════════════════════════════════════════════════════════════════════

function generateSparkline(base: number, volatility: number): number[] {
  const points: number[] = []
  let price = base
  for (let i = 0; i < 30; i++) {
    price += (Math.sin(i * 0.5) * volatility) + (Math.random() - 0.48) * volatility
    points.push(Math.round(price * 100) / 100)
  }
  return points
}

export type Holding = {
  id: string
  symbol: string
  name: string
  quantity: number
  avgBuyPrice: number
  currentPrice: number
  logo: string
  sparklineData: number[]
  sector: string
}

export const holdings: Holding[] = [
  { id: "h1", symbol: "AAPL", name: "Apple Inc", quantity: 25, avgBuyPrice: 178.50, currentPrice: 198.30, logo: logo("apple.com"), sparklineData: generateSparkline(198, 3), sector: "Technology" },
  { id: "h2", symbol: "GOOGL", name: "Alphabet Inc", quantity: 10, avgBuyPrice: 142.00, currentPrice: 168.75, logo: logo("google.com"), sparklineData: generateSparkline(168, 4), sector: "Technology" },
  { id: "h3", symbol: "MSFT", name: "Microsoft", quantity: 15, avgBuyPrice: 380.00, currentPrice: 425.60, logo: logo("microsoft.com"), sparklineData: generateSparkline(425, 5), sector: "Technology" },
  { id: "h4", symbol: "AMZN", name: "Amazon", quantity: 8, avgBuyPrice: 175.30, currentPrice: 192.40, logo: logo("amazon.com"), sparklineData: generateSparkline(192, 3), sector: "Consumer" },
  { id: "h5", symbol: "TSLA", name: "Tesla Inc", quantity: 12, avgBuyPrice: 245.00, currentPrice: 218.90, logo: logo("tesla.com"), sparklineData: generateSparkline(218, 8), sector: "Automotive" },
  { id: "h6", symbol: "NVDA", name: "NVIDIA", quantity: 20, avgBuyPrice: 480.00, currentPrice: 892.50, logo: logo("nvidia.com"), sparklineData: generateSparkline(892, 15), sector: "Technology" },
  { id: "h7", symbol: "META", name: "Meta Platforms", quantity: 6, avgBuyPrice: 320.00, currentPrice: 510.20, logo: logo("meta.com"), sparklineData: generateSparkline(510, 7), sector: "Technology" },
  { id: "h8", symbol: "V", name: "Visa Inc", quantity: 18, avgBuyPrice: 260.00, currentPrice: 285.30, logo: logo("visa.com"), sparklineData: generateSparkline(285, 2), sector: "Financial" },
]

export type WatchlistItem = {
  id: string
  symbol: string
  name: string
  currentPrice: number
  dayChange: number
  logo: string
  sparklineData: number[]
}

export const watchlistItems: WatchlistItem[] = [
  { id: "w1", symbol: "NFLX", name: "Netflix", currentPrice: 682.40, dayChange: 1.24, logo: logo("netflix.com"), sparklineData: generateSparkline(682, 8) },
  { id: "w2", symbol: "AMD", name: "AMD", currentPrice: 164.80, dayChange: -0.87, logo: logo("amd.com"), sparklineData: generateSparkline(164, 4) },
  { id: "w3", symbol: "CRM", name: "Salesforce", currentPrice: 272.50, dayChange: 0.56, logo: logo("salesforce.com"), sparklineData: generateSparkline(272, 3) },
  { id: "w4", symbol: "PYPL", name: "PayPal", currentPrice: 68.90, dayChange: -1.32, logo: logo("paypal.com"), sparklineData: generateSparkline(68, 2) },
  { id: "w5", symbol: "SQ", name: "Block Inc", currentPrice: 78.20, dayChange: 2.15, logo: logo("block.xyz"), sparklineData: generateSparkline(78, 3) },
]

export type PortfolioHistoryPoint = { date: string; portfolio: number; sp500: number }

export const portfolioHistory: PortfolioHistoryPoint[] = [
  { date: "May 2025", portfolio: 42000, sp500: 44000 },
  { date: "Jun 2025", portfolio: 44500, sp500: 45200 },
  { date: "Jul 2025", portfolio: 43800, sp500: 44800 },
  { date: "Aug 2025", portfolio: 46200, sp500: 46100 },
  { date: "Sep 2025", portfolio: 48100, sp500: 47300 },
  { date: "Oct 2025", portfolio: 47500, sp500: 46800 },
  { date: "Nov 2025", portfolio: 51200, sp500: 48900 },
  { date: "Dec 2025", portfolio: 53800, sp500: 50200 },
  { date: "Jan 2026", portfolio: 52400, sp500: 49800 },
  { date: "Feb 2026", portfolio: 55100, sp500: 51400 },
  { date: "Mar 2026", portfolio: 58200, sp500: 53100 },
  { date: "Apr 2026", portfolio: 61450, sp500: 54800 },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Budgets
// ══════════════════════════════════════════════════════════════════════════════

export type BudgetCategory = {
  id: string
  category: string
  iconName: string
  budget: number
  spent: number
  color: string
}

export const budgetCategories: BudgetCategory[] = [
  { id: "b1", category: "Food & Dining", iconName: "utensils", budget: 800, spent: 820, color: "text-orange-500" },
  { id: "b2", category: "Transport", iconName: "car", budget: 400, spent: 310, color: "text-blue-500" },
  { id: "b3", category: "Entertainment", iconName: "gamepad-2", budget: 300, spent: 340, color: "text-purple-500" },
  { id: "b4", category: "Shopping", iconName: "shopping-bag", budget: 500, spent: 560, color: "text-pink-500" },
  { id: "b5", category: "Subscriptions", iconName: "repeat", budget: 200, spent: 215, color: "text-cyan-500" },
  { id: "b6", category: "Health & Fitness", iconName: "heart-pulse", budget: 150, spent: 95, color: "text-emerald-500" },
  { id: "b7", category: "Education", iconName: "graduation-cap", budget: 250, spent: 150, color: "text-amber-500" },
  { id: "b8", category: "Travel", iconName: "plane", budget: 600, spent: 634, color: "text-rose-500" },
]

export type SavingsGoal = {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  iconName: string
  monthlyContribution: number
}

export const savingsGoals: SavingsGoal[] = [
  { id: "g1", name: "Vacation Fund", targetAmount: 5000, currentAmount: 2400, deadline: "Aug 2026", iconName: "palm-tree", monthlyContribution: 400 },
  { id: "g2", name: "Emergency Fund", targetAmount: 15000, currentAmount: 8200, deadline: "Dec 2026", iconName: "shield", monthlyContribution: 850 },
  { id: "g3", name: "New Car", targetAmount: 35000, currentAmount: 12500, deadline: "Jun 2027", iconName: "car", monthlyContribution: 1500 },
  { id: "g4", name: "Home Down Payment", targetAmount: 60000, currentAmount: 24000, deadline: "Dec 2027", iconName: "home", monthlyContribution: 2000 },
]

export type DailySpending = { date: string; amount: number }

export const dailySpending: DailySpending[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2026, 3, i + 1) // April 2026
  const dayOfWeek = d.getDay()
  const base = dayOfWeek === 0 || dayOfWeek === 6 ? 45 : 95
  const amount = Math.round(base + Math.sin(i * 0.8) * 40 + Math.random() * 30)
  return { date: d.toISOString().split("T")[0], amount: i < 13 ? amount : 0 }
})

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Accounts
// ══════════════════════════════════════════════════════════════════════════════

export type BankAccount = {
  id: string
  name: string
  type: "checking" | "savings" | "crypto" | "investment"
  institution: string
  institutionLogo: string
  accountNumber: string
  balance: number
  currency: string
  change: number
  changePercent: number
  lastActivity: string
  color: string
}

export const bankAccounts: BankAccount[] = [
  {
    id: "ba1",
    name: "Primary Checking",
    type: "checking",
    institution: "Chase",
    institutionLogo: logo("chase.com"),
    accountNumber: "****4589",
    balance: 24850.42,
    currency: "$",
    change: 1240.00,
    changePercent: 5.2,
    lastActivity: "Today",
    color: "bg-blue-500",
  },
  {
    id: "ba2",
    name: "High-Yield Savings",
    type: "savings",
    institution: "Marcus by Goldman Sachs",
    institutionLogo: logo("marcus.com"),
    accountNumber: "****7821",
    balance: 35200.00,
    currency: "$",
    change: 880.50,
    changePercent: 2.6,
    lastActivity: "Yesterday",
    color: "bg-emerald-500",
  },
  {
    id: "ba3",
    name: "Bitcoin Wallet",
    type: "crypto",
    institution: "Coinbase",
    institutionLogo: logo("coinbase.com"),
    accountNumber: "****3bc9",
    balance: 18450.80,
    currency: "$",
    change: -620.30,
    changePercent: -3.2,
    lastActivity: "2 hours ago",
    color: "bg-orange-500",
  },
  {
    id: "ba4",
    name: "Brokerage Account",
    type: "investment",
    institution: "Fidelity",
    institutionLogo: logo("fidelity.com"),
    accountNumber: "****9012",
    balance: 61450.00,
    currency: "$",
    change: 2840.00,
    changePercent: 4.8,
    lastActivity: "Today",
    color: "bg-violet-500",
  },
  {
    id: "ba5",
    name: "Travel Fund",
    type: "savings",
    institution: "Ally Bank",
    institutionLogo: logo("ally.com"),
    accountNumber: "****5567",
    balance: 4200.00,
    currency: "$",
    change: 400.00,
    changePercent: 10.5,
    lastActivity: "3 days ago",
    color: "bg-pink-500",
  },
  {
    id: "ba6",
    name: "Euro Account",
    type: "checking",
    institution: "Wise",
    institutionLogo: logo("wise.com"),
    accountNumber: "****8834",
    balance: 8750.00,
    currency: "€",
    change: 320.00,
    changePercent: 3.8,
    lastActivity: "Today",
    color: "bg-cyan-500",
  },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Transfers
// ══════════════════════════════════════════════════════════════════════════════

export type TransferRecord = {
  id: string
  type: "sent" | "received" | "scheduled"
  contactName: string
  contactAvatar: string
  amount: number
  date: string
  status: "completed" | "pending" | "scheduled"
  note?: string
}

export const transferRecords: TransferRecord[] = [
  { id: "tr1", type: "sent", contactName: "Sarah Chen", contactAvatar: avatar(1), amount: 250.00, date: "Apr 12, 2026", status: "completed", note: "Dinner split" },
  { id: "tr2", type: "received", contactName: "Marcus Johnson", contactAvatar: avatar(3), amount: 1200.00, date: "Apr 11, 2026", status: "completed", note: "Freelance payment" },
  { id: "tr3", type: "sent", contactName: "Elena Rodriguez", contactAvatar: avatar(5), amount: 85.00, date: "Apr 10, 2026", status: "completed", note: "Concert tickets" },
  { id: "tr4", type: "scheduled", contactName: "James Wilson", contactAvatar: avatar(8), amount: 500.00, date: "Apr 20, 2026", status: "scheduled", note: "Monthly rent share" },
  { id: "tr5", type: "received", contactName: "Aisha Patel", contactAvatar: avatar(9), amount: 340.00, date: "Apr 09, 2026", status: "completed", note: "Birthday gift" },
  { id: "tr6", type: "sent", contactName: "David Kim", contactAvatar: avatar(11), amount: 45.00, date: "Apr 08, 2026", status: "pending" },
  { id: "tr7", type: "scheduled", contactName: "Sarah Chen", contactAvatar: avatar(1), amount: 250.00, date: "May 01, 2026", status: "scheduled", note: "Monthly dinner budget" },
  { id: "tr8", type: "received", contactName: "Olivia Brown", contactAvatar: avatar(16), amount: 175.00, date: "Apr 07, 2026", status: "completed" },
  { id: "tr9", type: "sent", contactName: "Liam Murphy", contactAvatar: avatar(12), amount: 920.00, date: "Apr 06, 2026", status: "completed", note: "Equipment purchase" },
  { id: "tr10", type: "scheduled", contactName: "Elena Rodriguez", contactAvatar: avatar(5), amount: 150.00, date: "Apr 25, 2026", status: "scheduled", note: "Gym membership split" },
]
