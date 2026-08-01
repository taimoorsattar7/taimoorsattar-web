import React from "react"
import Link from "next/link"
import Image from "next/image"

const format_date = (dateStr: string) => {
  if (!dateStr) return ""
  const date_var = new Date(dateStr)
  return date_var.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

const BlogPage = ({ data }: any) => {
  const post = data?.markdownRemark || {}
  const frontmatter = post.frontmatter || {}

  return (
    <article className="max-w-3xl mx-auto py-6">
      <header className="mb-8">
        <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
          {format_date(frontmatter.date)}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-2">
          {frontmatter.title}
        </h1>
      </header>

      <div
        className="prose prose-zinc dark:prose-invert max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.html || "" }}
      />
    </article>
  )
}

export default BlogPage
