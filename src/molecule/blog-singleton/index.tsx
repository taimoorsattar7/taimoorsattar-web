"use client"
import React from "react"
import { Link } from "gatsby"

const BlogSingleton = ({
  index,
  title,
  slug,
  smDescription,
  date,
  category,
  isFeature,
}: any) => {
  return (
    <article
      key={index}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={date} className="text-gray-500">
          {date}
        </time>

        {category ? (
          <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            {category}
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link to={slug}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {smDescription}
        </p>
      </div>
    </article>
  )
}

export default BlogSingleton
