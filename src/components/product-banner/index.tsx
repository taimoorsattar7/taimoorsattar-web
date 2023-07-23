import * as React from "react"
import { FunctionComponent } from "react"

import Avatar from "@atom/avatar/index"
import Button from "@atom/button/index"
import VideoPlayer from "@atom/video-player/index"
import AnimateOnScroll from "@atom/animate-on-scroll/index"

import { Link } from "gatsby"

const ProductBanner: FunctionComponent = (props: any) => {
  let bgImage = props.bgImage,
    title = props.title,
    text = props.text,
    logSlug = props.logSlug,
    isLog = props.isLog,
    onEventLog = props.onEventLog,
    vidUrl = props.vidUrl,
    vidPoster = props.vidPoster

  return (
    <section
    // className="m-t-25 m-b-35"
    >
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
                className="text-3xl sm::text-4xl lg:text-5xl text-center md_text_center mt-3 mb-3 gradient"
              >
                <b>{title}</b>
              </h1>

              <AnimateOnScroll
                className="h-full"
                BoxVariants={{
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  hidden: { opacity: 0, y: 100 },
                }}
              >
                <div className="mb-6 prose prose-base sm:prose-xl lg:prose-xl text-center">
                  {text}
                </div>
              </AnimateOnScroll>
            </section>

            <section className="mb-6">
              <AnimateOnScroll
                className="h-full"
                BoxVariants={{
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  hidden: { opacity: 0, y: 100 },
                }}
              >
                <VideoPlayer
                  className={"mx-auto max-w-3xl"}
                  videoUrl={vidUrl}
                  videoPoster={vidPoster}
                />
              </AnimateOnScroll>
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

          {/* btnSize = props.btnSize || "large", // sml, med, large
    textValue = props.textValue || "Place Text here ...",
    isLeftIcon = props.leftIcon.is || false,
    srcLeftIcon = props.leftIcon.src || "",
    isRightIcon = props.rightIcon.is || false,
    srcRightIcon = props.rightIcon.src || "" */}

          {/* <div className="flex flex--items-center">
            {data?.is ? (
              <button className="btn btn__black md_margin_lr radius5 p-t-5 p-b-5 p-l-30 p-r-30">
                <a href={`/modules/${productPrice.content.slug.current}`}>
                  <b className="headline headline__text headline--white">
                    Go to the couse →
                  </b>
                </a>
              </button>
            ) : (
              <button
                className="btn btn__black md_margin_lr radius5 p-t-5 p-b-5 p-l-30 p-r-30"
                onClick={() => {
                  setModalState("form")
                  setShowModal(true)
                }}
              >
                <b className="headline headline__text headline--white">
                  Start from Here 🔥
                </b>
              </button>
            )}
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default ProductBanner
