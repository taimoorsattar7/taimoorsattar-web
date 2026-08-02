'use client'

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ContainerInner, ContainerOuter } from "@components/Container"

function NavLink({
  href,
  children,
  target,
  rel,
}: {
  href: string
  children: React.ReactNode
  target?: string
  rel?: string
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200 font-medium text-sm no-underline rounded-lg px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 inline-block"
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  const pathname = usePathname()

  const isCoursePage =
    pathname?.startsWith("/p/") ||
    pathname?.startsWith("/modules") ||
    pathname?.startsWith("/course") ||
    pathname === "/auth" ||
    pathname === "/settings"

  if (isCoursePage) {
    return (
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 py-8">
        <ContainerOuter>
          <ContainerInner>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Build a Standout Website — Course Material
              </p>
              <div className="flex items-center gap-4 font-medium">
                <Link href="/p/build-standout-website" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Overview
                </Link>
                <Link href="/modules" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Modules
                </Link>
                <a href="/blogs" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Blogs ↗
                </a>
              </div>
              <p>&copy; {new Date().getFullYear()} Build a Standout Website. All rights reserved.</p>
            </div>
          </ContainerInner>
        </ContainerOuter>
      </footer>
    )
  }

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
      <ContainerOuter>
        <div className="py-10">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              
              <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
                <span className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Taimoor Sattar
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                  Full-stack developer building clean, reliable web applications.
                </p>
              </div>

              {/* Footer Navigation Landmark */}
              <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/blogs" target="_blank" rel="noopener noreferrer">Blogs ↗</NavLink>
                <NavLink href="/course">Course</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </nav>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <a 
                  href="https://github.com/taimoorsattar7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200 rounded px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-500">
              &copy; {new Date().getFullYear()} Taimoor Sattar. All rights reserved.
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
