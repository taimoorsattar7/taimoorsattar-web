"use client"

import React, { useState } from "react"
import { Share2, Check, Copy } from "lucide-react"

function generateFBLink(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
}

function generateTwitterLink(url: string, title: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
}

function generateLinkedinLink(url: string) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
}

export default function ShareSocial({ title, slug }: { title?: string; slug?: string }) {
  const [copied, setCopied] = useState(false)

  const currentUrl = typeof window !== "undefined" 
    ? window.location.href 
    : `https://taimoorsattar.com/blogs/${slug || ""}`

  const shareTitle = title || "Check out this article by Taimoor Sattar"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  return (
    <div className="py-6 my-8 border-y border-zinc-200 dark:border-zinc-800/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-sm">
          <Share2 className="w-4 h-4 text-teal-500" />
          <span>Share this article</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* X / Twitter */}
          <a
            href={generateTwitterLink(currentUrl, shareTitle)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors no-underline"
          >
            <span>Share on X</span>
          </a>

          {/* LinkedIn */}
          <a
            href={generateLinkedinLink(currentUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors no-underline"
          >
            <span>LinkedIn</span>
          </a>

          {/* Facebook */}
          <a
            href={generateFBLink(currentUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors no-underline"
          >
            <span>Facebook</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
