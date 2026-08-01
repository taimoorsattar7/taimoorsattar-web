'use client'

import React from 'react'
import Layout from '@/src/components/layout'
import { GitHubIcon } from '@/src/components/socialicons/SocialIcons'
import { motion } from 'framer-motion'
import { User, Mail } from 'lucide-react'

function SocialLink({
  className = '',
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={`flex ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors no-underline"
      >
        <Icon className="h-5 w-5 flex-none fill-zinc-500 group-hover:fill-zinc-900 dark:group-hover:fill-zinc-100 transition-colors" />
        <span className="ml-3">{children}</span>
      </a>
    </li>
  )
}

export default function AboutPage() {
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto py-8 space-y-10 text-left"
      >
        {/* Header Tag */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" /> About Me
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
            I'm Taimoor Sattar, a full-stack engineer and educator.
          </h1>
        </div>

        {/* Bio Text */}
        <div className="space-y-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed">
          <p>
            I have over five years of professional experience building web applications using React, TypeScript, Node.js, Next.js, and modern frontend tools. I specialize in developing intuitive user interfaces and scalable application architecture.
          </p>

          <p>
            My engineering background gives me a methodical approach to problem solving, automated testing, and performance optimization. I enjoy turning complex ideas into clean, accessible code.
          </p>

          <p>
            When I'm not writing software or building products, I create educational content, full-stack course modules, and engineering articles to help developers improve their skills.
          </p>
        </div>

        {/* Social Links Sidebar */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Connect & Follow
            </h2>
            <ul role="list" className="space-y-3">
              <SocialLink
                href="https://github.com/taimoorsattar7"
                icon={GitHubIcon}
              >
                Follow on GitHub
              </SocialLink>

              <SocialLink
                href="mailto:taimoor@taimoorsattar.dev"
                icon={Mail}
                className="pt-3 border-t border-zinc-200 dark:border-zinc-800"
              >
                taimoor@taimoorsattar.dev
              </SocialLink>
            </ul>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}
