import React, { useState, useEffect } from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useQuery } from "react-query"
import queryString from "query-string"
import "./ProductPage.scss"

import ProgressBar from "@components/progressBar/ProgressBar"

import Form from "./modalState/form"
import Success from "./modalState/success"
import Fail from "./modalState/fail"

// @ts-ignore
import { getCurrentUser } from "@utils/auth.ts"

const Modal = React.lazy(() => import("@components/modal/Modal"))

import PortableText from "@components/portabletext/portableText"
import FAQ from "@components/FAQ"

const Testimonial = React.lazy(() => import("@components/testimonial"))

function ProductPage({
  location,
  avatar,
  author,
  techs,
  _rawBody,
  _rawShort,
  bgimage,
  title,
  mainvideo,
  productPrice,
  faqs,
  testimonials,
  curriculum,
}: any) {
  const isSSR = typeof window === "undefined"

  const avatarImg = getImage(avatar)

  let [showModal, setShowModal] = useState(false)
  let [modalState, setModalState] = useState("") //form, success, fail, pending

  const { data } = useQuery(
    [
      "issub",
      productPrice?.content?._id ? productPrice?.content?._id : "nothing",
    ],
    () => {
      let moduleRef = productPrice.content._id
      let { token } = getCurrentUser()
      if (token) {
        return fetch(
          `/api/isSubscribe?token=${token}&moduleRef=${moduleRef}`
        ).then(res => res.json())
      } else {
        return null
      }
    }
  )

  useEffect(() => {
    const queriedTheme = queryString.parse(location.search)

    if (
      ["form", "success", "fail", "pending"].includes(
        String(queriedTheme.state)
      )
    ) {
      setShowModal(true)
      setModalState(String(queriedTheme.state))
    }
  }, [])

  return (
    <article>
      {/* <Toaster position="top-center" /> */}

      <div className="p-b-30">
        <div
          className="m-3 bg-light-grey p-t-10 p-b-10 radius10"
          style={{
            backgroundImage: `url(${
              bgimage?.asset?.gatsbyImageData?.images?.fallback?.src || ""
            })`,
            backgroundRepeat: "round",
          }}
        >
          <div className="wrapper wrapper--narrow p-t-20 p-b-40">
            <div className="block m-b-20">
              <div className="flex m-auto flex--items-center">
                {avatarImg && (
                  <GatsbyImage
                    className="mwfitcontents radius50prs border-blue-2"
                    image={avatarImg}
                    alt={"author"}
                  />
                )}

                <div className="flex-grow-1">
                  <span className="headline headline__sml headline--dull">
                    <b>Taimoor Sattar</b>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap align-top m-b-20">
              <section className="mw600 md_max_width_full">
                <h1
                  title={title}
                  className="headline md_text_center m-b-15 gradient"
                >
                  <b>{title}</b>
                </h1>

                <div className="mb-16 prose prose-xl">
                  {_rawShort && <PortableText blocks={_rawShort} />}
                </div>
              </section>

              {mainvideo?.asset?.url && (
                <section className="mw300 md_max_width_full md_margin_lr">
                  <video
                    className="rounded-sm drop-shadow-lg"
                    src={mainvideo?.asset?.url}
                    poster={mainvideo.image?.asset?.url}
                    controls="controls"
                  ></video>

                  {/* <GatsbyImage image={imagePlaceholder} alt={"heading"} /> */}
                </section>
              )}
            </div>
            {/* </div> */}

            <div className="flex flex--items-center">
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
            </div>
          </div>
        </div>

        <div className="wrapper wrapper--narrow">
          <section>
            <h2 className="headline gradient m-b-30 m-t-20">
              <b>Tech Covered</b>
            </h2>

            <div className="max-w-full mx-auto mb-28" data-path="0.0.1">
              <div
                className="flex flex-wrap justify-center xl:justify-between items-center gap-10 sm:gap-5 md:gap-3"
                data-path="0.0.1.0"
              >
                {techs.map(
                  (
                    tech: { logo: { asset: ImageDataLike } },
                    index: React.Key | null | undefined
                  ) => {
                    return (
                      <div
                        className="w-1/2 sm:w-1/4 md:w-1/6 px-4"
                        data-path="0.0.1.0.0"
                        key={index}
                      >
                        <GatsbyImage
                          className="block mx-auto grayscale"
                          width="fit-content"
                          height="fit-content"
                          image={getImage(tech.logo.asset)}
                          alt={"heading"}
                          data-config-id="auto-img-1-10"
                          data-path="0.0.1.0.0.0"
                        />
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          </section>

          <div className="w-full prose prose-xl">
            {_rawBody && <PortableText blocks={_rawBody} />}
          </div>

          <div className="mb-36">
            <button
              type="submit"
              className="px-6 py-3 m-auto text-xl font-medium text-white bg-indigo-600 border border-transparent rounded-md cursor-pointer group max-w-fit hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none disabled:pointer-events-none"
              onClick={() => {
                setModalState("form")
                setShowModal(true)
              }}
            >
              Enroll in the course
            </button>
          </div>

          <section className="m-b-135">
            <h2 className="headline gradient m-b-40">
              <b>The Curriculum</b>
            </h2>

            <div className="flex gap-4 flex--wrap flex--align-stretch flex--justify-center">
              {curriculum.map(
                (
                  chapter: {
                    title:
                      | boolean
                      | React.ReactChild
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined
                    _rawBody: any
                  },
                  index: React.Key | null | undefined
                ) => {
                  return (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-100 drop-shadow-sm radius3 column-xs-12 column-md-4 column-sm-6"
                    >
                      <article className="information [ card ]">
                        <span className="tag">Module {index + 1}</span>
                        <h2 className="title">{chapter.title}</h2>

                        {chapter._rawBody && (
                          <p className="info">
                            <PortableText blocks={chapter._rawBody} />
                          </p>
                        )}
                      </article>
                    </div>
                  )
                }
              )}
            </div>
          </section>

          <section className="m-b-135">
            <h2 className="headline gradient m-b-40">
              <b>The Author</b>
            </h2>

            <div className="flex gap-5 items-start">
              {author?.image?.asset?.gatsbyImageData && (
                <GatsbyImage
                  className="mw100 radius50prs"
                  image={author.image.asset.gatsbyImageData}
                  alt={"heading"}
                />
              )}

              <div>
                <div>
                  <span className="headline">
                    <b>{author.name}</b>
                  </span>

                  <p className="headline headline__sml headline--dull">
                    <i>
                      Instructor for <b>{title}</b>
                    </i>
                  </p>
                </div>

                {author._rawDescription && (
                  <p className="prose prose-xl">
                    <PortableText blocks={author._rawDescription} />
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="wrapper wrapper--narrow">
          <section>
            <h2 className="headline gradient m-b-40">
              <b>Frequently Asked Questions</b>
            </h2>
            <FAQ FAQ={faqs} />
          </section>

          {testimonials.length !== 0 && (
            <section>
              <h2 className="headline gradient m-b-40">
                <b>What people says?</b>
              </h2>

              {!isSSR && (
                <React.Suspense fallback={<div />}>
                  <Testimonial testimonial={testimonials} />
                </React.Suspense>
              )}
            </section>
          )}

          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <Modal
                onClose={() => setShowModal(false)}
                show={showModal}
                success={showModal}
              >
                {/* setSectionTabs("newUser")
                    setShowModal(true)
                    sectionTabs == "newUser" ? "ul ul-blue" : "opacity-3" */}

                <div>
                  <>
                    <ProgressBar
                      pbData={[
                        {
                          name: "Home",
                          active: modalState == "form" ? true : true,
                        },
                        {
                          name: "Payment",
                          active: modalState == "success" ? true : false,
                        },
                        {
                          name: "Done",
                          active: modalState == "success" ? true : false,
                        },
                      ]}
                    />

                    {modalState == "form" && (
                      <Form
                        location={location}
                        productPrice={productPrice}
                        onModalState={(state: React.SetStateAction<string>) => {
                          setModalState(state)
                        }}
                      />
                    )}

                    {modalState == "success" && (
                      <Success
                        location={location}
                        happyURL={`/modules/${productPrice.content.slug.current}`}
                      />
                    )}

                    {modalState == "fail" && <Fail />}

                    {/* {modalState == "pending" && (
                        <Pending
                          productPrice={productPrice}
                          onModalState={(
                            state: React.SetStateAction<string>
                          ) => {
                            setModalState(state)
                          }}
                        />
                      )} */}
                  </>
                </div>
              </Modal>
            </React.Suspense>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductPage
