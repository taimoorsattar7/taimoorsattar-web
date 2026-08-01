'use client'

import React, { useState } from "react"
import Layout from "@/src/components/layout"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your registered email address")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      toast.success("Password reset instructions sent to your email!")
    }, 1000)
  }

  return (
    <Layout>
      <Toaster position="top-center" />
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl p-8 sm:p-10 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Reset Password
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Enter your account email to receive a password reset link
              </p>
            </div>

            {sent ? (
              <div className="p-6 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-teal-500 mx-auto" />
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Reset Email Sent</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  We sent instructions to <strong className="text-zinc-900 dark:text-zinc-100">{email}</strong>. Please check your inbox.
                </p>
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline no-underline pt-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Return to Sign In
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Your Registered Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="yours@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold text-sm shadow-lg hover:opacity-95 disabled:opacity-50 transition-all"
                >
                  {loading ? "Sending link..." : "Send Reset Link"}
                  {!loading && <Send className="w-4 h-4" />}
                </button>

                <div className="text-center pt-2">
                  <Link
                    href="/auth"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-teal-500 no-underline transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
