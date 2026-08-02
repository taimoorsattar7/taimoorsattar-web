'use client'

import React, { useState, useEffect, Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import { BookOpen, Sparkles, User, LogOut } from "lucide-react"
import { Container } from "@components/Container"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { getCurrentUser, logout } from "@utils/auth"
import { useTheme } from "../context/ThemeContext"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Header() {
  const [usr, setUsr] = useState<any>(null)
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    logout(() => router.push("/auth"))
  }

  const isCoursePage =
    pathname?.startsWith("/p/") ||
    pathname?.startsWith("/modules") ||
    pathname?.startsWith("/course") ||
    pathname === "/auth" ||
    pathname === "/settings"

  const siteNavigation = [
    {
      name: "About",
      href: "/about",
      current: pathname === "/about" || pathname?.startsWith("/about/"),
    },
    {
      name: "Blogs",
      href: "/blogs",
      current: pathname === "/blogs" || pathname?.startsWith("/blogs/"),
    },
    {
      name: "Course",
      href: "/course",
      current: pathname === "/course" || pathname?.startsWith("/course/") || pathname?.startsWith("/p/") || pathname?.startsWith("/modules/"),
    },
    {
      name: "Contact",
      href: "/contact",
      current: pathname === "/contact" || pathname?.startsWith("/contact/"),
    },
  ]

  const courseNavigation = [
    {
      name: "Overview",
      href: "/p/build-standout-website",
      current: pathname === "/p/build-standout-website" || pathname?.startsWith("/p/"),
    },
    {
      name: "Modules",
      href: "/modules",
      current: pathname?.startsWith("/modules"),
    },
    {
      name: "All Courses",
      href: "/course",
      current: pathname === "/course" || pathname?.startsWith("/course/"),
    },
    {
      name: "Blogs",
      href: "/blogs",
      current: pathname === "/blogs" || pathname?.startsWith("/blogs/"),
    },
  ]

  const activeNav = isCoursePage ? courseNavigation : siteNavigation

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setUsr(getCurrentUser())
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={classNames(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled
        ? "backdrop-blur-md bg-white/90 dark:bg-[#0b0f19]/90 border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-sm"
        : "bg-white dark:bg-[#0b0f19] border-b border-transparent"
    )}>
      <Disclosure as="nav" aria-label="Main Navigation">
        {({ open }: any) => (
          <>
            <Container>
              <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  
                  {/* Mobile Hamburger Button */}
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <Disclosure.Button 
                      className="relative inline-flex items-center justify-center rounded-full p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition-colors"
                      aria-label={open ? "Close main menu" : "Open main menu"}
                    >
                      <span className="sr-only">{open ? "Close main menu" : "Open main menu"}</span>
                      {open ? (
                        <XMarkIcon className="block h-5 w-5 transition-transform duration-200 rotate-90" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-5 w-5 transition-transform duration-200" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>

                  {/* Dynamic Brand Logo & Info based on route */}
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    {isCoursePage ? (
                      <Link 
                        href="/p/build-standout-website" 
                        className="flex items-center gap-3 group no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-full px-1 py-0.5"
                      >
                        <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold text-sm flex items-center justify-center shadow-sm shrink-0 border border-zinc-200 dark:border-zinc-800">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              Build a Standout Website
                            </span>
                            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold uppercase tracking-wider">
                              <Sparkles className="w-3 h-3 text-amber-500" /> Course
                            </span>
                          </div>
                          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hidden sm:block">
                            Gatsby, Sanity & Stripe Masterclass
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <Link 
                        href="/" 
                        className="flex items-center gap-3 group no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-full px-1 py-0.5"
                      >
                        <div className="relative h-9 w-9 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700/80 shadow-sm shrink-0">
                          <Image
                            src="/profile-pic.jpg"
                            alt="Taimoor Sattar"
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                            priority
                            unoptimized
                          />
                        </div>
                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          Taimoor Sattar
                        </span>
                      </Link>
                    )}

                    {/* Nav links matching floating nav style */}
                    <div className="hidden sm:ml-8 sm:flex sm:items-center">
                      <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-800/90 shadow-md shadow-zinc-800/5 border border-zinc-200/80 dark:border-zinc-700/60 backdrop-blur">
                        {activeNav.map(item => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "text-teal-600 dark:text-teal-400 font-semibold"
                                : "text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400",
                              "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                            {item.current && (
                              <span 
                                className="nav-active-indicator absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-teal-500 dark:bg-teal-400 shadow-sm" 
                                aria-hidden="true"
                              />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: Dark/Light Mode Switcher & User Profile */}
                  <div className="flex items-center gap-2">
                    
                    {/* Theme Toggle Button */}
                    <button
                      onClick={toggleTheme}
                      type="button"
                      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                      className="theme-toggle-button p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 border border-zinc-200/80 dark:border-zinc-700/60"
                    >
                      {theme === "dark" ? (
                        <SunIcon className="theme-toggle-icon h-4 w-4 text-amber-400" aria-hidden="true" />
                      ) : (
                        <MoonIcon className="theme-toggle-icon h-4 w-4 text-zinc-700" aria-hidden="true" />
                      )}
                    </button>

                    {/* User Profile / Access Link */}
                    {typeof usr?.avatar === "string" && usr.avatar.length > 0 ? (
                      <Menu as="div" className="relative ml-1">
                        <div>
                          <Menu.Button className="cursor-pointer relative flex rounded-full text-sm ring-1 ring-zinc-300 dark:ring-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition-transform duration-150 hover:scale-105 motion-reduce:hover:scale-100">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full object-cover"
                              src={usr.avatar}
                              onError={(e: any) => {
                                e.currentTarget.src = "/profile-pic.jpg"
                              }}
                              alt="User profile avatar"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-150"
                          enterFrom="transform opacity-0 scale-95 -translate-y-1"
                          enterTo="transform opacity-100 scale-100 translate-y-0"
                          leave="transition ease-in duration-100"
                          leaveFrom="transform opacity-100 scale-100 translate-y-0"
                          leaveTo="transform opacity-0 scale-95 -translate-y-1"
                        >
                          <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-1 shadow-xl focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/modules"
                                  className={classNames(
                                    active ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300",
                                    "block px-4 py-2.5 text-xs font-medium transition-colors"
                                  )}
                                >
                                  Modules
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/settings"
                                  className={classNames(
                                    active ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300",
                                    "block px-4 py-2.5 text-xs font-medium transition-colors"
                                  )}
                                >
                                  Account Settings
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={handleLogout}
                                  className={classNames(
                                    active ? "bg-zinc-100 dark:bg-zinc-800 text-red-600 dark:text-red-400" : "text-zinc-700 dark:text-zinc-300",
                                    "w-full text-left block px-4 py-2.5 text-xs font-medium transition-colors"
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <Link href="/auth" className="no-underline hidden sm:inline-block focus:outline-none rounded-full">
                        <span className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700/80 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-teal-500 inline-block">
                          Course Access
                        </span>
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            </Container>

            {/* Mobile Navigation Panel */}
            <Transition
              as={Fragment}
              enter="transition duration-200 ease-out"
              enterFrom="transform opacity-0 -translate-y-2 scale-98"
              enterTo="transform opacity-100 translate-y-0 scale-100"
              leave="transition duration-150 ease-in"
              leaveFrom="transform opacity-100 translate-y-0 scale-100"
              leaveTo="transform opacity-0 -translate-y-2 scale-98"
            >
              <Disclosure.Panel className="sm:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-5 space-y-1.5 shadow-lg">
                {activeNav.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 font-semibold border-l-4 border-teal-500"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white",
                      "block rounded-lg px-3.5 py-2.5 text-base font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </header>
  )
}
