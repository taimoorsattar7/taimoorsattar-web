"use client"

import React from "react"
import PortableText from "@components/portabletext/portableText"
import "@styles/_testimonial.scss"

const Testimonial = (props: { testimonial: any }) => {
  const testimonials = props.testimonial

  return (
    <>
      <div className="flex">
        {testimonials?.map((item: any, index: number) => (
          <figure key={index} className="testimonial">
            <div className="author">
              <h5>
                <b>{item.name}</b>
              </h5>
              <span>
                <i>{item.profession}</i>
              </span>
            </div>

            <blockquote className="headline headline__sml headline--dull">
              {item._rawMessage && <PortableText blocks={item._rawMessage} />}
            </blockquote>
          </figure>
        ))}
      </div>
    </>
  )
}

export default Testimonial
