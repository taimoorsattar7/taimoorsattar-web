"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Menu, LogOut, User, BookOpen, Mail, Lock, Sparkles, Sun, Moon } from "lucide-react"
import { getCurrentUser, logout, isLoggedIn } from "@utils/auth"
import { useTheme } from "../../context/ThemeContext"

const HeaderLogin = ({ onClickSideMenuHandler }: any) => {
  const [toggleAvatar, setToggleAvatar] = useState(false)
  const [usr, setUsr] = useState<any>(null)
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  function handleLogout() {
    logout(() => router.push("/auth"))
  }

  useEffect(() => {
    setUsr(getCurrentUser())
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-[#0b0f19]/90 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors shadow-sm">
      <div className="px-4 py-2.5 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left Course Logo & Information (No Author Name) */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClickSideMenuHandler}
              type="button"
              className="p-2 text-zinc-600 dark:text-zinc-300 rounded-xl sm:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800/80 focus:outline-none transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/p/build-standout-website" className="flex items-center gap-3 no-underline group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white font-extrabold text-sm flex items-center justify-center shadow-md shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    Build a Standout Website
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Course
                  </span>
                </div>
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hidden sm:block">
                  Gatsby, Sanity & Stripe Masterclass
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Pills & Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="hidden md:flex items-center space-x-1 px-3 py-1 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60">
              <Link
                href="/p/build-standout-website"
                className={`px-3 py-1 rounded-full text-xs font-semibold no-underline transition-colors ${
                  pathname === "/p/build-standout-website"
                    ? "bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                Course Overview
              </Link>
              <Link
                href="/modules"
                className={`px-3 py-1 rounded-full text-xs font-semibold no-underline transition-colors ${
                  pathname?.startsWith("/modules")
                    ? "bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                Modules
              </Link>
              <Link
                href="/blogs"
                className="px-3 py-1 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 no-underline transition-colors"
              >
                Blogs
              </Link>
            </nav>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200/80 dark:border-zinc-700/60"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            {isLoggedIn() === true ? (
              <div className="relative">
                <button
                  onClick={() => setToggleAvatar(prev => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 transition-colors focus:outline-none"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={usr?.avatar && typeof usr.avatar === "string" && usr.avatar.length > 0 ? usr.avatar : "/profile-pic.jpg"}
                      alt="User avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </button>

                {toggleAvatar && (
                  <div className="absolute right-0 z-50 mt-3 w-56 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 space-y-1">
                    <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800/80 mb-1">
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{usr?.name || "Account"}</p>
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
