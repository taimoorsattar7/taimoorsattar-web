"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, LogOut, User, BookOpen, Mail, Lock } from "lucide-react"
import { getCurrentUser, logout, isLoggedIn } from "@utils/auth"

const HeaderLogin = ({ onClickSideMenuHandler }: any) => {
  const [toggleAvatar, setToggleAvatar] = useState(false)
  const [usr, setUsr] = useState<any>(null)
  const router = useRouter()

  function handleLogout() {
    logout(() => router.push("/auth"))
  }

  useEffect(() => {
    setUsr(getCurrentUser())
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-[#0b0f19]/90 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left Logo & Mobile Drawer Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClickSideMenuHandler}
              type="button"
              className="p-2 text-zinc-600 dark:text-zinc-300 rounded-xl sm:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800/80 focus:outline-none transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/modules" className="flex items-center gap-2.5 no-underline group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold text-sm flex items-center justify-center shadow-md">
                T
              </div>
              <span className="font-extrabold text-lg tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                Taimoor Sattar
              </span>
            </Link>
          </div>

          {/* Right User State & Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/p/build-standout-website"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors no-underline"
            >
              <BookOpen className="w-3.5 h-3.5" /> Course Overview
            </Link>

            {isLoggedIn() === true ? (
              <div className="relative">
                <button
                  onClick={() => setToggleAvatar(prev => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 transition-colors focus:outline-none"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden grayscale">
                    <Image
                      src={usr?.avatar || "/profile-pic.jpg"}
                      alt="User avatar"
                      fill
                      className="object-cover grayscale"
                      unoptimized
                    />
                  </div>
                </button>

                {toggleAvatar && (
                  <div className="absolute right-0 z-50 mt-3 w-56 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 space-y-1">
                    <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800/80 mb-1">
                      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Signed in as</p>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{usr?.email || "Student"}</p>
                    </div>

                    <Link
                      href="/modules"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 no-underline transition-colors"
                      onClick={() => setToggleAvatar(false)}
                    >
                      <BookOpen className="w-4 h-4 text-zinc-500" /> Course Modules
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 no-underline transition-colors"
                      onClick={() => setToggleAvatar(false)}
                    >
                      <User className="w-4 h-4 text-zinc-500" /> Account Settings
                    </Link>

                    <Link
                      href="/contact"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 no-underline transition-colors"
                      onClick={() => setToggleAvatar(false)}
                    >
                      <Mail className="w-4 h-4 text-zinc-500" /> Contact Instructor
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-left transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs shadow-md hover:opacity-90 transition-opacity no-underline"
              >
                <Lock className="w-3.5 h-3.5" /> Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderLogin
