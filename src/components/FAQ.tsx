"use client"

import React from "react"
import { Disclosure } from "@headlessui/react"
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline"
import PortableText from "@components/portabletext/portableText"

const FAQ = ({ FAQ: faqs }: { FAQ: any[] }) => {
  if (!Array.isArray(faqs) || faqs.length === 0) return null

  return (
    <section className="my-16">
      <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-b border-zinc-200 dark:border-zinc-800">
        {faqs.map((item: any, index: number) => {
          if (!item || !item.question) return null
          const blocks = item.answer || item._rawAnswer

          return (
            <Disclosure as="div" key={index} className="py-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-zinc-900 dark:text-zinc-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none">
                      <span className="text-lg font-bold">
                        {item.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center text-zinc-400 shrink-0">
                        {open ? (
                          <MinusSmallIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        ) : (
                          <PlusSmallIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-4 pr-12">
                    {blocks && (
                      <div className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
                        <PortableText blocks={blocks} />
                      </div>
                    )}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          )
        })}
      </div>
    </section>
  )
}

export default FAQ
