'use client'

import React from 'react'
import Layout from '@/src/components/layout'

export default function SettingsPage() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          Account Settings
        </h1>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-900/40">
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Manage your course subscription and account details here.
          </p>
        </div>
      </div>
    </Layout>
  )
}
