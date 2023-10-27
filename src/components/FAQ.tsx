"use client"

import React from "react"
import { Disclosure } from "@headlessui/react"
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline"
import PortableText from "@components/portabletext/portableText"

const FAQ = (props: { FAQ: any }) => {
  const FAQ = props.FAQ

  return (
    <section>
            <h2 className="headline gradient m-b-40">
              <b>Frequently Asked Questions</b>
            </h2>
    <div className="accordion">
      {FAQ?.map((item: any, index: number) => (
        <div key={index} className="accordion-item">
          <Disclosure as="div" key={index} className="pt-6">
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base font-semibold leading-7">
                      {item.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      {open ? (
                        <MinusSmallIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 mr-0 ml-0">
                  {item._rawAnswer && (
                    <PortableText
                      className="text-base leading-7 text-gray-600"
                      blocks={item._rawAnswer}
                    />
                  )}
                  {/* <p className="text-base leading-7 text-gray-600">
                      {item._rawAnswer}
                    </p> */}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
    </section>
  )
}

export default FAQ
