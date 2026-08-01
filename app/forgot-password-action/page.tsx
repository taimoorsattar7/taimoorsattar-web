'use client'

import React from 'react'
import Layout from '@/src/components/layout'
import Link from 'next/link'

export default function ForgotPasswordActionPage() {
  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          Password Reset Link Sent
        </h1>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-900/40 mb-4">
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
            If an account exists with that email, a password reset link has been dispatched.
          </p>
          <Link href="/auth" className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </Layout>
  )
}
