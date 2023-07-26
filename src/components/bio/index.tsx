import * as React from "react"
import { FunctionComponent } from "react"
import { StaticImage } from "gatsby-plugin-image"

import AnimateOnScroll from "@atom/animate-on-scroll/index"

const Bio: FunctionComponent = ({ data }: any) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-between text-black">
      <div className="w-full flex flex-col md:flex-row flex-wrap items-center justify-start gap-11">
        <section className="flex-1">
          <div className="w-full max-w-5xl">
            <span className="w-full">
              <h1 className="text-3xl">
                <b>Hi, I'm Taimoor Sattar</b>
                <br /> - Full Stack Developer
              </h1>

              <p className="text-base">
                I've been building user interfaces for half a decade. I designed
                the website using components, take care of every pixel during
                development, and responsive to different screen sizes.
              </p>
            </span>
          </div>

          <div
            className="relative w-full flex flex-row items-start justify-start gap-9"

          >
            <a
              className="no-underline"
              href="https://twitter.com/taimoorsattar7"
            >
              <StaticImage
                src="../../images/social-img/twitter-img.png"
                className={`relative object-cover w-8 h-8 overflow-hidden shrink-0`}
                alt="Twitter"
                placeholder="blurred"
                layout="fixed"
              />
            </a>

            <a
              className="no-underline"
              href="https://github.com/taimoorsattar7"
            >
              <StaticImage
                src="../../images/social-img/github-img.png"
                className={`relative object-cover w-8 h-8 overflow-hidden shrink-0`}
                alt="Github"
                placeholder="blurred"
                layout="fixed"
              />
            </a>

            <a
              className="no-underline"
              href="https://www.tiktok.com/@taimoornotes"
            >
              <StaticImage
                src="../../images/social-img/tiktok-img.png"
                className={`relative object-cover w-8 h-8 overflow-hidden shrink-0`}
                alt="Tiktok"
                placeholder="blurred"
                layout="fixed"
              />
            </a>
          </div>
        </section>
        <AnimateOnScroll
          className="h-full"
          BoxVariants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
            hidden: { opacity: 0, y: 30 },
          }}
        >
          <StaticImage
            src="../../images/photos/IMG_6457.jpg"
            className={`relative border border-b-[2px] border-solid border-darkgray rounded-full w-56 h-56 object-cover`}
            alt="Avatar"
            placeholder="blurred"
            layout="fixed"
          />
        </AnimateOnScroll>
      </div>
    </div>
  )
}

export default Bio
