'use client'

import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { handleLogin, isLoggedIn } from "@utils/auth"
import Layout from "@components/layout"
import { Lock, Mail, ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/modules/build-a-standout-website")
    }
  }, [router])

  async function onSubmit(data: any) {
    setLoading(true)
    try {
      const success = await handleLogin({
        email: data.email,
        password: data.password,
      })

      if (success) {
        toast.success("Welcome back! Signed in successfully 🎉")
        router.push("/modules/build-a-standout-website")
      } else {
        toast.error("Invalid email or password. Please check your credentials.")
      }
    } catch (e) {
      toast.error("Failed to connect to authentication server.")
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setValue("email", "taimoorsattar7@gmail.com")
    setValue("password", "qwety")
    toast.success("Demo credentials loaded!")
  }

  return (
    <Layout>
      <Toaster position="top-center" />
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl p-8 sm:p-10 space-y-6">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Student Sign In
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Access your course modules & dashboard
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="yours@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs font-semibold text-red-500">{String(errors.email.message)}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:underline no-underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    {...register("password", { required: "Password is required" })}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs font-semibold text-red-500">{String(errors.password.message)}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm shadow-lg hover:opacity-90 disabled:opacity-50 transition-all mt-2"
              >
                {loading ? "Authenticating..." : "Sign In to Course"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Quick Demo Fill Helper */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5" /> Auto-fill Demo Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
