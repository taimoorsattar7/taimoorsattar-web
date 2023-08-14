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
        className="m-3 bg-light-grey p-t-10 p-b-10 radius10"
        style={{
          backgroundImage: `url(${bgImage || ""})`,
          backgroundRepeat: "round",
        }}
      >
        <div className="wrapper wrapper--narrow p-t-20 p-b-40">
          <Avatar className={"mx-auto justify-center"} size="medium" />

          <main>
            <section className="mw600 mx-auto md_max_width_full">
              <h1
                title={title}
                className="text-3xl sm::text-4xl lg:text-5xl text-center md_text_center mt-3 mb-3"
              >
                <b property="name">{title}</b>
              </h1>

              <p className="h-full">
                <div className="mb-6 prose prose-base sm:prose-xl lg:prose-xl text-center">
                  {text}
                </div>
              </p>
            </section>

            <section className="mb-6">
              <div className="h-full">
                <VideoPlayer
                  className={"mx-auto max-w-3xl"}
                  videoUrl={vidUrl}
                  videoPoster={vidPoster}
                />
              </div>
            </section>

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
          </main>
        </div>
      </div>
    </section>
  )
}

export default ProductBanner
