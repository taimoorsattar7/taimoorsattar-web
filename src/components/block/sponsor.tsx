import React from "react"
import Link from "next/link"
import Image from "next/image"

const SponsorBlock = ({ data }: any) => {
  if (!data || !Array.isArray(data)) return null

  return (
    <div className="flex flex-col gap-8 my-8">
      {data.map(({ node }: any) => (
        <div key={node?.id || node?.slug?.current} className="flex items-center gap-4">
          <Link href={`/p/${node?.slug?.current}`} className="no-underline">
            <Image
              className="w-16 h-16 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800"
              src={node?.seo?.image?.asset?.url || "/banner.jpg"}
              alt={node?.title || "Sponsor"}
              width={64}
              height={64}
              unoptimized
            />
          </Link>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              SPONSOR
            </span>
            <Link
              href={`/p/${node?.slug?.current}`}
              className="font-bold text-zinc-900 dark:text-zinc-100 hover:underline no-underline"
            >
              {node.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SponsorBlock
