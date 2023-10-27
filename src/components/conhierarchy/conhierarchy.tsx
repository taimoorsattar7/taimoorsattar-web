"use client"

import React from "react"
import { Link } from "gatsby"

// import "@components/_headline.scss"
import "@components/_FAQ.scss"

// import { MenuIcon } from "lucide-react"

const ConHierarchy = ({ nav, slug, main }: any) => {
  const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let isopen = e.currentTarget.getAttribute("aria-expanded")

    if (isopen === "false") {
      e.currentTarget.setAttribute("aria-expanded", "true")
    } else {
      e.currentTarget.setAttribute("aria-expanded", "false")
    }
  }

  function isdropdown(doc: any[]) {
    let res = doc.filter(d => {
      return d?.slug?.current === slug
    })
    if (res.length > 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <section>
      <h2 className="mt-2 mb-2 text-2xl">
        <b>Table of content</b>
      </h2>
      {nav?.map(
        (
          lists: { doc: any[]; title: string },
          index: React.Key | null | undefined
        ) => {
          return (
            <aside key={index}>
              <div className="accordion">
                <button
                  id="accordion-button-1"
                  className="flex"
                  aria-expanded={
                    isdropdown(lists?.doc) === true ? "true" : "false"
                  }
                  onClick={e => toggle(e)}
                >
                  <span className="block text-lg mr-8">
                    <b>{lists.title}</b>
                  </span>
                  <span className="icon" aria-hidden="false"></span>
                </button>
                <div className="accordion-content">
                  {lists?.doc?.map((content, index) => {
                    return (
                      <div key={index} className="block mb-1">
                        <Link
                          key={index}
                          className="no-underline mb-4"
                          to={`/modules/${main}/${content?.slug?.current}`}
                        >
                          <span
                            className={`text-neutral-900 text-sm ${
                              content?.slug?.current === slug &&
                              "text-indigo-500 bold"
                            }`}
                          >
                            {content.title}
                          </span>
                        </Link>
                        <hr />
                      </div>
                    )
                  })}
                </div>
              </div>
            </aside>
          )
        }
      )}
    </section>
  )
}

export default ConHierarchy
