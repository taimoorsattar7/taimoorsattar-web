"use client"

import * as React from "react"
// import { FunctionComponent } from "react"

import Avatar from "@atom/avatar/index"
import Button from "@atom/button/index"
import VideoPlayer from "@atom/video-player/index"
// import AnimateOnScroll from "@atom/animate-on-scroll/index"

import { Link } from "gatsby"

const ProductBanner: any = (props: any) => {
  let bgImage = props.bgImage,
    title = props.title,
    text = props.text,
    logSlug = props.logSlug,
    isLog = props.isLog,
    onEventLog = props.onEventLog,
    vidUrl = props.vidUrl,
    vidPoster = props.vidPoster

  return (
    <section typeof="Course">
      <div
        className="m-5 px-6 bg-gray-500 pt-8 pb-8 rounded-lg"
        style={{
          backgroundImage: `url(${bgImage || ""})`,
          backgroundRepeat: "round",
        }}
      >
        <div className="max-w-full">
          <Avatar className={"mx-auto justify-center"} size="medium" />

          <main>
            <section className="max-w-full mx-auto md:max-w-3xl">
              <h1
                title={title}
                className="text-3xl sm:text-2xl lg:text-5xl font-bold text-center md:text-center mt-3 mb-3"
              >
                {title}
              </h1>

              <p className="mb-6 prose prose-base sm:prose-xl lg:prose-xl text-center">
                {text}
              </p>

              <VideoPlayer
                className={"block mb-8 max-w-full md:max-w-full mx-auto"}
                videoUrl={vidUrl}
                videoPoster={vidPoster}
              />

              {isLog ? (
                <Link className="no-underline" to={logSlug}>
                  <Button
                    textValue="Go to the course"
                    iconRight="arrowuprightsquare"
                    className="mx-auto"
                    btnSize="large"
                    btnTheme="filled"
                    // onClickHandler={(event: any) => onEventLog(event)}
                  />
                </Link>
              ) : (
                <Button
                  textValue="Enroll in the course"
                  iconRight="sparkle"
                  className="mx-auto"
                  btnSize="large"
                  btnTheme="indigo"
                  onClickHandler={(event: any) => onEventLog(event)}
                />
              )}
            </section>
          </main>
        </div>
      </div>
    </section>
  )
}

export default ProductBanner
