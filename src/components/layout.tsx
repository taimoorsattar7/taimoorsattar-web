'use client'

import React from "react"
import Header from "@components/header"
import Footer from "@components/footer/footer"
import { Container } from "@components/Container"

const Layout = ({
  children,
  noMargin,
  noFooter = false,
}: {
  children: React.ReactNode
  noMargin?: boolean
  noFooter?: boolean
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-teal-500 selection:text-white">
      
      {/* Section 508 Skip to main content link */}
      <a 
        href="#main-content" 
        className="skip-nav-link sr-only focus:not-sr-only"
      >
        Skip to main content
      </a>

      <Header />

      <div className="flex-1 relative">
        {noMargin ? (
          <main id="main-content" tabIndex={-1} className="animate-page-enter focus:outline-none">
            {children}
          </main>
        ) : (
          <Container className="mt-8 sm:mt-12 pb-16">
            <main id="main-content" tabIndex={-1} className="animate-page-enter focus:outline-none">
              {children}
            </main>
          </Container>
        )}
      </div>

      {!noFooter && <Footer />}
    </div>
  )
}

export default Layout
