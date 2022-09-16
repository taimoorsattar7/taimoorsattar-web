import React from "react"
import { Link } from "gatsby"

import "@components/_headline.scss"
import "@components/_FAQ.scss"
import "@components/_wrapper.scss"

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
    <div className="sideBar p-t-25 p-b-10 p-l-10 p-r-10">
      <h2 className="mb-5 text-4xl">
        <b>Table of content</b>
      </h2>
      {nav?.map(
        (
          lists: { doc: any[]; title: string },
          index: React.Key | null | undefined
        ) => {
          return (
            <aside key={index} className="sideBarFlex">
              <div className="accordion">
                <button
                  id="accordion-button-1"
                  className="flex"
                  aria-expanded={
                    isdropdown(lists?.doc) === true ? "true" : "false"
                  }
                  onClick={e => toggle(e)}
                >
                  <span className="block text-lg m-r-20 gradient">
                    <b>{lists.title}</b>
                  </span>
                  <span className="icon" aria-hidden="false"></span>
                </button>
                <div className="accordion-content">
                  {lists?.doc?.map((content, index) => {
                    return (
                      <div key={index} className="block m-b-15">
                        <Link
                          key={index}
                          className="no-ul"
                          to={`/modules/${main}/${content?.slug?.current}`}
                        >
                          <span
                            className={`text-base ${
                              content?.slug?.current === slug && "bold"
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
    </div>
  )
}

export default ConHierarchy