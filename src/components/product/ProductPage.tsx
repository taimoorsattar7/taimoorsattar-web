import React, { useState, useEffect } from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useQuery } from "react-query"
import queryString from "query-string"
import "./ProductPage.scss"

import Button from "@atom/button/index"
import ProgressBar from "@components/progressBar/ProgressBar"

import Form from "./modalState/form"
import Success from "./modalState/success"
import Fail from "./modalState/fail"

import CurriculumList from "@components/curriculum-list/index"

// @ts-ignore
import { getCurrentUser } from "@utils/auth.ts"

const Modal = React.lazy(() => import("@components/modal/Modal"))

import PortableText from "@components/portabletext/portableText"
import ProductBanner from "@components/product-banner/index"
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
      <ProductBanner
        bgImage={bgimage?.asset?.gatsbyImageData?.images?.fallback?.src}
        title={title}
        text={<PortableText blocks={_rawShort} />}
        logSlug={`/modules/${productPrice?.content?.slug?.current}`}
        isLog={data?.is ? true : false}
        onEventLog={() => {
          setModalState("form")
          setShowModal(true)
        }}
        vidUrl={mainvideo?.asset?.url}
        vidPoster={mainvideo?.image?.asset?.url}
      />

      <div className="p-b-30">
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

          <div className="max-w-3xl prose prose-base mx-auto">
            {_rawBody && <PortableText blocks={_rawBody} />}
          </div>

          <Button
            textValue="Enroll in the course"
            iconRight="sparkle"
            className="mx-auto"
            btnSize="large"
            btnTheme="outline"
            onClickHandler={() => {
              setModalState("form")
              setShowModal(true)
            }}
          />

          <CurriculumList curriculum={curriculum}>
            <h2 className="text-3xl mb-5">
              <b>The Curriculum</b>
            </h2>
          </CurriculumList>

          <section className="m-b-135">
            <h2 className="text-3xl mb-5">
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
