import * as React from "react"
import { FunctionComponent } from "react"

import AnimateOnScroll from "@atom/animate-on-scroll/index"
import IMG_6457 from "../../images/photos/IMG_6457.jpg"

import TwitterImg from "../../images/social-img/twitter-img.png"
import TiktokImg from "../../images/social-img/tiktok-img.png"
import GithubImg from "../../images/social-img/github-img.png"

const Bio: FunctionComponent = ({ data }: any) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-between text-black">
      <div className="w-full flex flex-col md:flex-row flex-wrap items-center justify-start gap-11">
        <section className="flex-1">
          <div className="w-96">
            <span className="w-full">
              <AnimateOnScroll
                BoxVariants={{
                  visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
                  hidden: { opacity: 0, y: 30 },
                }}
              >
                <h1 className="text-3xl">
                  <b>Hi, I'm Taimoor Sattar</b>
                  <br /> - Full Stack Developer
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll
                BoxVariants={{
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  hidden: { opacity: 0, y: 30 },
                }}
              >
                <p className="text-base">
                  I've been building user interfaces for half a decade. I
                  designed the website using components, take care of every
                  pixel during development, and responsive to different screen
                  sizes.
                </p>
              </AnimateOnScroll>
            </span>
          </div>

          <AnimateOnScroll
            className="relative w-full flex flex-row items-start justify-start gap-9"
            BoxVariants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              hidden: { opacity: 0, y: 30 },
            }}
          >
            <a
              className="no-underline"
              href="https://twitter.com/taimoorsattar7"
            >
              <img
                className="relative w-8 h-auto overflow-hidden shrink-0"
                alt="Twitter icon"
                src={TwitterImg}
              />
            </a>

            <a
              className="no-underline"
              href="https://github.com/taimoorsattar7"
            >
              <img
                className="relative w-8 h-auto overflow-hidden shrink-0"
                alt="Tiktok icon"
                src={TiktokImg}
              />
            </a>

            <a
              className="no-underline"
              href="https://www.tiktok.com/@taimoornotes"
            >
              <img
                className="relative w-8 h-auto"
                alt="Github Icon"
                src={GithubImg}
              />
            </a>
          </AnimateOnScroll>
        </section>
        <AnimateOnScroll
          className="h-full"
          BoxVariants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
            hidden: { opacity: 0, y: 30 },
          }}
        >
          <img
            className="relative border border-b-[2px] border-solid border-darkgray rounded-full w-56 h-56 object-cover"
            alt=""
            src={IMG_6457}
          />
        </AnimateOnScroll>
      </div>
    </div>
  )
}

export default Bio
