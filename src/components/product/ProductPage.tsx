import React, { useState, useEffect } from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useQuery } from "react-query"
import queryString from "query-string"
import "./ProductPage.scss"
import Pricing from "@components/Pricing"

import Button from "@atom/button/index"
// import ProgressBar from "@components/progressBar/ProgressBar"

import Form from "./modalState/form"
import Success from "./modalState/success"
import Fail from "./modalState/fail"

import CurriculumList from "@components/curriculum-list/index"
import { Author } from "@components/Author"

// @ts-ignore
import { getCurrentUser } from "@utils/auth.ts"

const Modal = React.lazy(() => import("@atom/modal/index"))

import PortableTextReact from "@components/portabletext/portableText"
import ProductBanner from "@components/product-banner/index"
import FAQ from "@components/FAQ"

import Testimonial from "@components/testimonial"
import { Container } from "@components/Container"
// const Testimonial = React.lazy(() => import("@components/testimonial"))

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
        try {
          return fetch(
            `/api/isSubscribe?token=${token}&moduleRef=${moduleRef}`
          ).then(res => res.json())
        } catch {
          return null
        }
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
        text={<PortableTextReact blocks={_rawShort} />}
        logSlug={`/modules/${productPrice?.content?.slug?.current}`}
        isLog={data?.is ? true : false}
        onEventLog={() => {
          setModalState("form")
          setShowModal(true)
        }}
        vidUrl={mainvideo?.asset?.url}
        vidPoster={mainvideo?.image?.asset?.url}
      />
      <Container className="mt-12 sm:mt-16">
        <section>
          <div className="max-w-full mx-auto mb-28" data-path="0.0.1">
            <div
              className="flex flex-wrap justify-center xl:justify-between items-center gap-10 sm:gap-5 md:gap-3"
              data-path="0.0.1.0"
            >
              {techs?.map(
                (
                  tech: { logo: { asset: any } },
                  index: React.Key | null | undefined
                ) => {
                  let image = getImage(tech?.logo?.asset)
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
                        image={image}
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

        <div className="max-w-3xl prose prose-lg mx-auto">
          {_rawBody && <PortableTextReact blocks={_rawBody} />}
        </div>

        <Button
          id="form-modal-select-1"
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

        <Author
          description={<PortableTextReact blocks={author?._rawDescription} />}
          authorImage={author?.image?.asset?.gatsbyImageData}
        />

        <FAQ FAQ={faqs} />

        {testimonials && testimonials?.length !== 0 && (
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

        <Pricing setShowModal={setShowModal} setModalState={setModalState} />

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
                {/* <ProgressBar
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
                    /> */}

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
              </div>
            </Modal>
          </React.Suspense>
        )}
      </Container>
    </article>
  )
}

export default ProductPage
