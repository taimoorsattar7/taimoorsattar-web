"use client"
import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

export function Author({ description, authorImage }: any) {
  return (
    <section
      id="author"
      aria-labelledby="author-title"
      className="relative scroll-mt-14 pb-3 pt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-10 lg:pt-16"
    >
      <div className="relative mx-auto max-w-5xl pt-16 sm:px-6">
        <div className="bg-slate-50 pt-px sm:rounded-6xl">
          <div className="relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-slate-200 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-72 lg:w-72">
            <GatsbyImage
              className="absolute inset-0 h-full w-full object-cover"
              image={authorImage}
              alt={"heading"}
            />
          </div>
          <div className="px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-32">
            <p className="mt-8 font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              <span className="block text-blue-600">Taimoor Sattar –</span> I'm
              the author of this course.
            </p>
            <p className="mt-4 text-lg tracking-tight text-slate-700">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
