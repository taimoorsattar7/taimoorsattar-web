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
  const [userSubscription, setUserSubscription] = useState<any>(null)

  useEffect(() => {
    const user = getCurrentUser()
    setUsr(user)
    if (user?.name) {
      setFullName(user.name)
    }

    if (user?.token) {
      axios
        .get(`/api/isSubscribe?token=${user.token}`)
        .then(res => {
          if (res.data?.is) {
            setUserSubscription(res.data)
          }
        })
        .catch(() => {})
    }

    // Load course product for subscription update
    fetchSanityProduct('build-standout-website').then(res => {
      if (res) {
        setSanityProduct(res)
        const plans = res.productPrice?.plans || []
        const unpaidPlan = plans.find((p: any) => p.priceID_test || p.priceID) || plans[0]
        if (unpaidPlan) {
          setSelectedPlanPriceId(unpaidPlan.priceID_test || unpaidPlan.priceID || '')
        }
      }
    })
  }, [])

  // Helper to resolve Stripe price ID according to active keys
  const getStripePriceId = (prc: any) => {
    if (!prc) return ''
    const isLiveKey = (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_ID || '').startsWith('pk_live')
    return isLiveKey ? prc.priceID || prc.priceID_test || '' : prc.priceID_test || prc.priceID || ''
  }

  // Direct Stripe checkout update using authenticated user details (100% Discount)
  const handleProceedToStripe = async (priceIdToUse?: string) => {
    setIsRedirectingToStripe(true)
    const productPrice = sanityProduct?.productPrice
    const plans = productPrice?.plans || []

    const selectedPlan =
      plans.find((p: any) => p.priceID === priceIdToUse || p.priceID_test === priceIdToUse) ||
      plans.find((p: any) => getStripePriceId(p)) ||
      plans[0]

    const stripePriceId = getStripePriceId(selectedPlan) || priceIdToUse || 'price_12345'

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://taimoorsattar.dev'
      const { data } = await axios.post('/api/checkout', {
        email: usr?.email || 'student@example.com',
        name: usr?.name || fullName || 'Student',
        mode: 'subscription',
        priceId: stripePriceId,
        metadata: {
          priceId: stripePriceId,
          priceRef: productPrice?._id || '',
        },
        allow_promotion_codes: true,
        cancelUrl: `${origin}/settings`,
        successUrl: `${origin}/api/createSubscription?name=${encodeURIComponent(usr?.name || fullName || 'Student')}&email=${encodeURIComponent(usr?.email || '')}&priceId=${stripePriceId}&priceRef=${productPrice?._id || ''}&redirectOrigin=${encodeURIComponent(`${origin}/settings`)}`,
      })

      if (data?.url) {
        window.location.href = data.url
      } else {
        toast.error('Could not generate Stripe Checkout URL.')
        setIsRedirectingToStripe(false)
      }
    } catch (err: any) {
      console.error('Stripe update error:', err)
      toast.error(err?.response?.data?.message || 'Failed to start Stripe checkout session.')
      setIsRedirectingToStripe(false)
    }
  }

  // Save Account Profile Details
  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingAccount(true)

    try {
      const updatedUser = {
        ...usr,
        name: fullName,
      }
      setUser(updatedUser)
      setUsr(updatedUser)
      toast.success('Account profile updated successfully!')
    } catch (e) {
      toast.error('Failed to update profile.')
    } finally {
      setIsSavingAccount(false)
    }
  }

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.')
      return
    }

    setIsChangingPassword(true)
    try {
      const res = await axios.post('/api/changePassword', {
        email: usr?.email,
        prvPassword: currentPassword,
        newPassword: newPassword,
      })

      if (res.data?.is) {
        toast.success('Password updated successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        toast.error(res.data?.message || 'Password update failed.')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Password change failed.')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const loggedIn = isLoggedIn()

  return (
    <Layout>
      <Toaster position="top-center" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Account Settings
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Manage your personal information, subscription plan, and security settings.
            </p>
          </div>

          {usr?.email && (
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
              {usr?.avatar && (
                <img
                  src={usr.avatar}
                  alt={usr.name || 'User'}
                  className="w-6 h-6 rounded-full object-cover shrink-0"
                />
              )}
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                {usr.email}
              </span>
            </div>
          )}
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <User className="w-4 h-4 text-teal-500" /> Account Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('subscription')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'subscription'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <CreditCard className="w-4 h-4 text-teal-500" /> Subscription Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'security'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Key className="w-4 h-4 text-teal-500" /> Security
          </button>
        </div>

        {/* TAB 1: Account Profile Details */}
        {activeTab === 'profile' && (
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Personal Information</h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Update your full display name associated with your student profile.
              </p>
            </div>

            <form onSubmit={handleSaveAccount} className="space-y-5 max-w-xl">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Full Name
                </label>
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
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={usr?.email || ''}
                  disabled
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-sm cursor-not-allowed"
                />
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  Email address is linked to your course enrollment records.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSavingAccount}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold text-sm shadow-md hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {isSavingAccount ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: Subscription Plan */}
        {activeTab === 'subscription' && (
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Course Membership</h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  Manage your active course subscription tier and billing.
                </p>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 100% Off Enabled
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Current Active Plan
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
                Update Subscription Plan
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Logged-in user: <strong className="text-zinc-800 dark:text-zinc-200">{usr?.name || 'Student'}</strong> ({usr?.email}). Select a plan that requires Stripe payment to update your subscription.
              </p>
            </div>

            <div className="space-y-3">
              {(sanityProduct?.productPrice?.plans || []).map((prc: any, index: number) => {
                const stripePriceId = getStripePriceId(prc)
                const isPaidStripePlan = Boolean(stripePriceId)
                const isCurrentPlan = !isPaidStripePlan || (userSubscription?.is && !isPaidStripePlan)
                const planPriceId = stripePriceId || `plan-${index}`
                const isSelected = selectedPlanPriceId === planPriceId

                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (isPaidStripePlan) {
                        setSelectedPlanPriceId(planPriceId)
                      }
                    }}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      isCurrentPlan
                        ? 'border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/20 cursor-default opacity-85'
                        : isSelected
                        ? 'border-teal-500 bg-teal-500/10 dark:bg-teal-950/30 ring-2 ring-teal-500/30 cursor-pointer'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                          {prc.keyword || (isPaidStripePlan ? 'Pro Plan' : 'Free Basic Access')}
                        </span>
                        {isCurrentPlan ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase">
                            <CheckCircle2 className="w-3 h-3" /> Current Plan
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                        {isPaidStripePlan ? `${prc.price ? `$${prc.price} / month` : 'Requires Stripe Payment'} (100% Off Applied)` : 'Free Tier'}
                      </p>
                    </div>

                    {isCurrentPlan ? (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        Active
                      </span>
                    ) : (
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${isSelected ? 'bg-teal-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}>
                        {isSelected ? 'Selected' : 'Select'}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              disabled={isRedirectingToStripe || !selectedPlanPriceId}
              onClick={() => handleProceedToStripe(selectedPlanPriceId)}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-extrabold text-sm shadow-xl hover:opacity-95 disabled:opacity-50 transition-all mt-4"
            >
              {isRedirectingToStripe ? (
                'Connecting to Stripe Checkout...'
              ) : (
                <>
                  <CreditCard className="w-4 h-4" /> Update Subscription via Stripe (100% Off) <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </Modal>
      </div>
    </Layout>
  )
}
