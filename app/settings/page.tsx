'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Layout from '@/src/components/layout'
import Modal from '@/src/atom/modal/index'
import { getCurrentUser, setUser, isLoggedIn } from '@/src/utils/auth'
import { fetchSanityProduct } from '@/src/lib/sanity/fetchCourse'
import {
  User,
  Key,
  CreditCard,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'

export default function SettingsPage() {
  const [usr, setUsr] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'security'>('profile')

  // Account Details form state
  const [fullName, setFullName] = useState('')
  const [isSavingAccount, setIsSavingAccount] = useState(false)

  // Password Change state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Subscription modal & data
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [sanityProduct, setSanityProduct] = useState<any>(null)
  const [selectedPlanPriceId, setSelectedPlanPriceId] = useState<string>('')
  const [isRedirectingToStripe, setIsRedirectingToStripe] = useState(false)

  useEffect(() => {
    const user = getCurrentUser()
    setUsr(user)
    if (user?.name) {
      setFullName(user.name)
    }

    // Load course product for subscription update
    fetchSanityProduct('build-standout-website').then(res => {
      if (res) {
        setSanityProduct(res)
        const defaultPlan = res.productPrice?.plans?.[0]
        if (defaultPlan) {
          setSelectedPlanPriceId(defaultPlan.priceID_test || defaultPlan.priceID || '')
        }
      }
    })
  }, [])

  // Direct Stripe checkout update using authenticated user details (100% Discount)
  const handleProceedToStripe = async (priceIdToUse?: string) => {
    setIsRedirectingToStripe(true)
    const productPrice = sanityProduct?.productPrice
    const plans = productPrice?.plans || []

    const selectedPlan =
      plans.find((p: any) => p.priceID === priceIdToUse || p.priceID_test === priceIdToUse) ||
      plans.find((p: any) => p.priceID || p.priceID_test) ||
      plans[0]

    const isLiveKey = (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_ID || '').startsWith('pk_live')
    const stripePriceId = isLiveKey
      ? selectedPlan?.priceID || selectedPlan?.priceID_test
      : selectedPlan?.priceID_test || selectedPlan?.priceID || 'free'

    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const hrefURL = `${origin}/p/build-standout-website`

    try {
      const {
        data: { url },
      } = await axios.post('/api/checkout', {
        email: usr?.email || 'student@example.com',
        name: usr?.name || 'Student',
        mode: 'subscription',
        priceId: stripePriceId,
        metadata: {
          priceId: stripePriceId,
          priceRef: productPrice?._id || '',
        },
        allow_promotion_codes: true,
        cancelUrl: `${origin}/settings?state=fail`,
        successUrl: `${origin}/api/createSubscription?name=${encodeURIComponent(usr?.name || 'Student')}&email=${encodeURIComponent(usr?.email || '')}&priceId=${stripePriceId}&priceRef=${productPrice?._id || ''}&redirectOrigin=${encodeURIComponent(`${origin}/settings`)}`,
      })

      if (url) {
        window.location.href = url
      } else {
        toast.error('Failed to generate Stripe update session.')
        setIsRedirectingToStripe(false)
      }
    } catch (err: any) {
      console.error('Stripe update error:', err?.response?.data || err?.message)
      toast.error(err?.response?.data?.message || 'Subscription update failed.')
      setIsRedirectingToStripe(false)
    }
  }

  // Handle Account Details update
  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingAccount(true)

    try {
      const updatedUser = {
        ...usr,
        name: fullName || 'Student',
      }
      setUser(updatedUser)
      setUsr(updatedUser)
      toast.success('Account details updated successfully!')
    } catch (err) {
      toast.error('Failed to update account details.')
    } finally {
      setIsSavingAccount(false)
    }
  }

  // Handle Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword) {
      toast.error('Please enter your current password.')
      return
    }

    if (!newPassword || newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.')
      return
    }

    setIsChangingPassword(true)

    try {
      const res = await axios.post('/api/changePassword', {
        email: usr?.email,
        prvPassword: currentPassword,
        newPassword: newPassword,
      })

      if (res.data?.is || res.data?.message === 'success') {
        toast.success('Password updated successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        toast.error(res.data?.message || 'Password update failed.')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Current password incorrect.')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const productPrice = sanityProduct?.productPrice

  return (
    <Layout>
      <Toaster position="top-center" />

      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Profile Header Banner */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-teal-500 shadow-md shrink-0">
            <Image
              src={usr?.avatar && typeof usr.avatar === 'string' && usr.avatar.length > 0 ? usr.avatar : '/profile-pic.jpg'}
              alt="User profile avatar"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {usr?.name || 'Student Account'}
              </h1>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> 100% Discounted Member
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Manage your course subscription, account preferences, and password security.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <User className="w-4 h-4" /> Account Details
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'subscription'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Subscription (100% Off)
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'security'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <Key className="w-4 h-4" /> Password & Security
          </button>
        </div>

        {/* TAB 1: Account Details */}
        {activeTab === 'profile' && (
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Personal Information</h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Update your account details and display name.
              </p>
            </div>

            <form onSubmit={handleSaveAccount} className="space-y-5 max-w-xl">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Your Full Name"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                  <span>Registered Email</span>
                  <span className="text-xs text-zinc-400 font-normal flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Account ID
                  </span>
                </label>
                <input
                  type="email"
                  value={usr?.email || 'student@example.com'}
                  disabled
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-sm cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={isSavingAccount}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-extrabold text-sm shadow-md hover:opacity-95 disabled:opacity-50 transition-all"
              >
                {isSavingAccount ? 'Saving...' : 'Save Account Details'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: Subscription & Billing */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active Subscription
                  </div>
                  <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
                    Build a Standout Website — Full Access
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    100% Discounted Membership (Initial & Recurring Payments 100% Off)
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">$0</span>
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 block">/ forever (100% Off)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-1">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Discount Status</span>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> 100% Discount Code Applied
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-1">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Billing Cycle</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Recurring Monthly ($0.00 / month)
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowSubscriptionModal(true)}
                  className="flex items-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-extrabold text-sm shadow-lg hover:opacity-95 transition-all"
                >
                  <Sparkles className="w-4 h-4" /> Update Subscription (100% Off) <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Security & Password */}
        {activeTab === 'security' && (
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Password & Security</h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Update your password to keep your course access secure.
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-5 max-w-xl">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 6 chars)"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold text-sm shadow-md hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {isChangingPassword ? 'Updating Password...' : 'Update Password'} <Key className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Subscription Update Direct Confirmation Modal */}
        <Modal
          onClose={() => setShowSubscriptionModal(false)}
          show={showSubscriptionModal}
          success={showSubscriptionModal}
          title="Update Course Subscription"
        >
          <div className="space-y-6 text-left p-2 sm:p-4">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
                Confirm Subscription Tier Update
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Updating subscription for logged-in user: <strong className="text-zinc-800 dark:text-zinc-200">{usr?.name || 'Student'}</strong> ({usr?.email}).
              </p>
            </div>

            <div className="space-y-3">
              {(productPrice?.plans || []).map((prc: any, index: number) => {
                const planPriceId = prc.priceID_test || prc.priceID || `plan-${index}`
                const isSelected = selectedPlanPriceId === planPriceId || (index === 0 && !selectedPlanPriceId)

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedPlanPriceId(planPriceId)}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-teal-500 bg-teal-500/10 dark:bg-teal-950/30 ring-2 ring-teal-500/30'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                        {prc.keyword || 'Premium Tier'}
                      </span>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                        {prc.price ? `$${prc.price} / month` : 'Premium Access'}
                      </p>
                    </div>

                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400">
                      Select
                    </span>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              disabled={isRedirectingToStripe}
              onClick={() => handleProceedToStripe(selectedPlanPriceId)}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-extrabold text-sm shadow-xl hover:opacity-95 disabled:opacity-50 transition-all mt-4"
            >
              {isRedirectingToStripe ? (
                'Connecting to Stripe...'
              ) : (
                <>
                  <CreditCard className="w-4 h-4" /> Proceed to Stripe Checkout <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </Modal>
      </div>
    </Layout>
  )
}
