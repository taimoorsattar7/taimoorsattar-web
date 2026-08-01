"use client"

import React from "react"
import PortableText from "@components/portabletext/portableText"

const Testimonial = (props: { testimonial: any }) => {
  const testimonials = props.testimonial

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {testimonials?.map((item: any, index: number) => (
        <figure
          key={index}
          className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm"
        >
          <div className="mb-3">
            <h5 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {item.name || item.author}
            </h5>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 italic">
              {item.profession || item.role}
            </span>
          </div>

          <blockquote className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {item._rawMessage ? (
              <PortableText blocks={item._rawMessage} />
            ) : (
              item.quote
            )}
          </blockquote>
        </figure>
      ))}
    </div>
  )
}

export default Testimonial
