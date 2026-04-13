"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  LayoutDashboardIcon,
  WalletIcon,
  ArrowLeftRightIcon,
  CreditCardIcon,
  SendIcon,
  TrendingUpIcon,
  BitcoinIcon,
  ChartAreaIcon,
  TargetIcon,
  SettingsIcon,
  BellIcon,
  LogInIcon,
  UserPlusIcon,
  SearchIcon,
  MoonIcon,
  SunIcon,
  MonitorIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { contacts, recentTransactions, cryptoCoins } from "@/data/seed"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const run = useCallback(
    (fn: () => void) => {
      setOpen(false)
      fn()
    },
    []
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command Palette"
      description="Search pages, transactions, contacts, and more"
    >
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            {[
              { label: "Dashboard", icon: LayoutDashboardIcon, href: "/dashboard" },
              { label: "Accounts", icon: WalletIcon, href: "/accounts" },
              { label: "Transactions", icon: ArrowLeftRightIcon, href: "/transactions" },
              { label: "Transfers", icon: SendIcon, href: "/transfers" },
              { label: "Cards", icon: CreditCardIcon, href: "/cards" },
              { label: "Crypto", icon: BitcoinIcon, href: "/crypto" },
              { label: "Analytics", icon: ChartAreaIcon, href: "/analytics" },
              { label: "Investments", icon: TrendingUpIcon, href: "/investments" },
              { label: "Budgets", icon: TargetIcon, href: "/budgets" },
              { label: "Settings", icon: SettingsIcon, href: "/settings" },
              { label: "Notifications", icon: BellIcon, href: "/notifications" },
              { label: "Sign In", icon: LogInIcon, href: "/sign-in" },
              { label: "Sign Up", icon: UserPlusIcon, href: "/sign-up" },
            ].map((page) => (
              <CommandItem key={page.href} onSelect={() => run(() => router.push(page.href))}>
                <page.icon className="mr-2 size-4" />
                {page.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Recent Transactions">
            {recentTransactions.slice(0, 5).map((tx) => (
              <CommandItem key={tx.id} onSelect={() => run(() => router.push("/transactions"))}>
                <SearchIcon className="mr-2 size-4" />
                {tx.merchant}
                <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Quick Transfer">
            {contacts.slice(0, 4).map((c) => (
              <CommandItem key={c.id} onSelect={() => run(() => router.push("/transfers"))}>
                <SendIcon className="mr-2 size-4" />
                Send to {c.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Crypto">
            {cryptoCoins.slice(0, 4).map((coin) => (
              <CommandItem key={coin.id} onSelect={() => run(() => router.push("/crypto"))}>
                <BitcoinIcon className="mr-2 size-4" />
                {coin.name}
                <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                  ${coin.price.toLocaleString()}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => run(() => setTheme("light"))}>
              <SunIcon className="mr-2 size-4" />
              Light Mode
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 size-4" />
              Dark Mode
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme("system"))}>
              <MonitorIcon className="mr-2 size-4" />
              System Theme
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
