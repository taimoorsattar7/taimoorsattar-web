import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"

import Header from "@components/header"
import SEO from "@components/seo"

import { isLoggedIn, getCurrentUser } from "@utils/auth"

import { sanityRequest } from "@lib/sanity/sanityActions"

import Button from "@atom/button/index"
import HorizontalNavbar from "@atom/horizontal-navbar/index"

const Modules = ({ location }: any) => {
  const [content, setcontent] = useState([])

  useEffect(() => {
    if (isLoggedIn()) {
      fetchData()
    } else {
      navigate("/auth")
    }
  }, [])

  async function fetchData() {
    let usr = getCurrentUser()

    let data = await sanityRequest(
      `*[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${usr.email}']._id]{'module': price->content->{_id, title, seo, 'img': seo.image.asset->{_updatedAt, extension, originalFilename, url}, slug}}`
    )

    setcontent(data)
  }

  return (
    <>
      <SEO title="Login" location={location} />
      {/* <Toaster position="top-center" /> */}

      <Header location={location} />

      <section className="m-t-25 p-b-35">
        <div className="wrapper wrapper--narrow">
          <HorizontalNavbar
            nav={[
              {
                title: "Modules",
                goto: "/modules",
                state: location.pathname == "/modules" ? "active" : "",
              },
              {
                title: "Settings",
                goto: "/settings",
                state: location.pathname == "/settings" ? "active" : "",
              },
            ]}
          />

          <h1 className="headline m-b-35">
            <b>Your courses</b>
          </h1>

          {content ? (
            <div>
              {content?.map(
                (
                  doc: {
                    module: any
                  },
                  index: React.Key | null | undefined
                ) => {
                  return (
                    <div key={index} className="flex">
                      <div className="w-full p-4 bg-white border border-gray-200">
                        <h3 className="text-xl font-medium sm:text-2xl">
                          {doc.module.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500 sm:text-base">
                          {doc.module?.seo?.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center justify-between w-full mt-2">
                          <div className="w-full mt-4 sm:mt-0 sm:w-auto">
                            <Button
                              onClickHandler={() => {
                                navigate(doc.module.slug.current)
                              }}
                              btnSize="large"
                              btnTheme="filled"
                              iconRight={"feather"}
                              textValue="Go to the course"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          ) : (
            <p className="headline headline__text">
              Please wait while we are fetching your data.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default Modules
