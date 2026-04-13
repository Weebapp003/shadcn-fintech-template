"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import {
  LandmarkIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  CheckIcon,
  ShieldCheckIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"
import dynamic from "next/dynamic"

const GlobeDemo = dynamic(() => import("@/components/globe-demo"), {
  ssr: false,
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 2000)
    }, 1500)
  }

  return (
    <div className="flex min-h-svh">
      {/* Left panel - Globe */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-[#09090b] lg:flex">
        {/* Logo */}
        <a href="/dashboard" className="relative z-20 flex items-center gap-2.5 p-8">
          <div className="flex size-8 items-center justify-center rounded-lg bg-white text-black">
            <LandmarkIcon className="size-4" />
          </div>
          <span className="text-sm font-semibold text-white">
            Shadcn Fintech
          </span>
        </a>

        {/* Globe */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <GlobeDemo />
        </div>

        {/* Quote overlay — pinned to bottom */}
        <div className="relative z-20 mt-auto p-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <blockquote className="text-sm leading-relaxed text-white/80">
              &ldquo;The best time to start investing was yesterday. The second
              best time is now.&rdquo;
            </blockquote>
            <p className="mt-3 text-xs text-white/50">
              &mdash; Financial Wisdom
            </p>
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-12">
        <motion.div
          className="w-full max-w-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo (mobile) */}
          <motion.div
            className="mb-8 flex flex-col items-center lg:hidden"
            variants={itemVariants}
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LandmarkIcon className="size-5" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div className="text-center" variants={itemVariants}>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to your account
            </p>
          </motion.div>

          {/* Social buttons */}
          <motion.div
            className="mt-8 grid grid-cols-2 gap-3"
            variants={itemVariants}
          >
            <Button variant="outline" size="lg" className="gap-2">
              <Image
                src="/logos/google-com.png"
                alt="Google"
                width={16}
                height={16}
                className="size-4"
              />
              <span className="text-sm">Google</span>
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Image
                src="/logos/apple-com.png"
                alt="Apple"
                width={16}
                height={16}
                className="size-4"
              />
              <span className="text-sm">Apple</span>
            </Button>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="relative my-6 flex items-center"
            variants={itemVariants}
          >
            <div className="flex-1 border-t border-border" />
            <span className="mx-3 text-xs text-muted-foreground">
              or continue with
            </span>
            <div className="flex-1 border-t border-border" />
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                Email
              </label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <MailIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </InputGroup>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Forgot password?
                </Link>
              </div>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <LockIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-3.5 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="size-3.5 text-muted-foreground" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-1">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckIcon className="size-4" />
                    <span>Success!</span>
                  </>
                ) : (
                  <span>Sign in</span>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.p
            className="mt-6 text-center text-sm text-muted-foreground"
            variants={itemVariants}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
            >
              Sign up
            </Link>
          </motion.p>

          {/* Secured badge */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60"
            variants={itemVariants}
          >
            <ShieldCheckIcon className="size-3.5" />
            <span>Secured by Clerk</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
