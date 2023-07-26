import React from "react"
import PortableText from "@components/portabletext/portableText"

import "./_headline.scss"
import "./_FAQ.scss"

import "./_wrapper.scss"

const Footer = (props: { FAQ: any }) => {
  const FAQ = props.FAQ

  const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let isopen = e.currentTarget.getAttribute("aria-expanded")

    if (isopen === "false") {
      e.currentTarget.setAttribute("aria-expanded", "true")
    } else {
      e.currentTarget.setAttribute("aria-expanded", "false")
    }
  }

  return (
    <div className="wrapper margin-b-large">
      <div className="accordion">
        {FAQ?.map((item: any, index: number) => (
          <div key={index} className="accordion-item">
            <button
              id={`accordion-button-${index}`}
              aria-expanded="true"
              onClick={e => toggle(e)}
            >
              <span className="headline headline__text accordion-title">
                <b>{item.question}</b>
              </span>
              <span className="icon" aria-hidden="true"></span>
            </button>

            <div className="accordion-content">
              <div className="text-base">
                {item._rawAnswer && <PortableText blocks={item._rawAnswer} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
