"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { LandmarkIcon, MailIcon, LockIcon, UserIcon, EyeOffIcon, LoaderIcon, CheckCircle2Icon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import Image from "next/image"

export default function Page() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState<"idle" | "loading" | "success">("idle")

  const handleSignUp = () => {
    if (!name || !email || !password) return
    setState("loading")
    setTimeout(() => setState("success"), 1500)
    setTimeout(() => setState("idle"), 3500)
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Sign Up</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <LandmarkIcon className="size-6" />
              </div>
              <CardTitle className="text-xl">Create your account</CardTitle>
              <CardDescription>Start managing your finances today</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {state === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3 py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2Icon className="size-12 text-emerald-500" />
                    </motion.div>
                    <p className="font-semibold">Account created!</p>
                    <p className="text-sm text-muted-foreground">Welcome to Shadcn Fintech</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Social buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="gap-2">
                        <Image src="/logos/google-com.png" alt="Google" width={16} height={16} />
                        Google
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Image src="/logos/apple-com.png" alt="Apple" width={16} height={16} />
                        Apple
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">or continue with</span>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-9 focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9 focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-9 pr-9 focus-visible:ring-0"
                          onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <EyeOffIcon className="size-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-muted-foreground">Must be at least 8 characters</p>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-2">
                      <Checkbox id="terms" className="mt-0.5" />
                      <label htmlFor="terms" className="text-xs text-muted-foreground leading-snug">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                      </label>
                    </div>

                    {/* Submit */}
                    <Button
                      className="w-full gap-2"
                      onClick={handleSignUp}
                      disabled={state === "loading" || !name || !email || !password}
                    >
                      {state === "loading" ? (
                        <>
                          <LoaderIcon className="size-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create account"
                      )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <a href="/sign-in" className="font-medium text-primary hover:underline">Sign in</a>
                    </p>

                    {/* Clerk badge */}
                    <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] text-muted-foreground/60">
                      Secured by
                      <Badge variant="outline" className="h-5 gap-1 px-1.5 text-[10px] font-medium">
                        <svg viewBox="0 0 24 24" className="size-3" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.5 3.75v7.5L12 19.18l-7.5-3.75v-7.5L12 4.18z"/></svg>
                        Clerk
                      </Badge>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
