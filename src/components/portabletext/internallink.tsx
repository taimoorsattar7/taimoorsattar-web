import React from "react"
import Link from "next/link"

export const InternalLink = (props: any) => {
  const slug = props?.value?.content?.slug?.current || ""
  return (
    <Link
      className="block cursor-pointer p-4 border-2 border-zinc-700 dark:border-zinc-300 rounded-lg no-underline font-semibold"
      href={`/p/${slug}`}
    >
      {props?.value?.content?.title}
    </Link>
  )
}
