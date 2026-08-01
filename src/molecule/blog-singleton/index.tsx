import React from "react"
import Link from "next/link"

const BlogSingleton = ({
  index,
  title,
  slug,
  smDescription,
  date,
}: any) => {
  const formattedSlug = slug?.startsWith('/blogs/') ? slug : `/blogs/${slug?.replace(/^\//, '')}`

  return (
    <article className="group relative flex flex-col items-start py-6 border-b border-zinc-100 dark:border-zinc-800/60 last:border-b-0">
      {/* Date */}
      {date && (
        <time 
          dateTime={date} 
          className="relative z-10 order-first mb-3 flex items-center text-xs font-medium text-zinc-400 dark:text-zinc-500 pl-3.5"
        >
          <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
          </span>
          {date}
        </time>
      )}

      {/* Title */}
      <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
        <Link href={formattedSlug} className="no-underline">
          <span className="absolute -inset-x-4 -inset-y-3 z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 bg-zinc-50 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
          <span className="relative z-10">{title}</span>
        </Link>
      </h2>

      {/* Description */}
      <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed font-normal">
        {smDescription}
      </p>

      {/* Read action */}
      <div 
        aria-hidden="true" 
        className="relative z-10 mt-4 flex items-center text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform"
      >
        Read article <span className="ml-1">&rarr;</span>
      </div>
    </article>
  )
}

export default BlogSingleton
