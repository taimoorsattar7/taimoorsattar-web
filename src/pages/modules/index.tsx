import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"

import Header from "@components/header"
import SEO from "@components/seo"

import { isLoggedIn, getCurrentUser } from "@utils/auth"

import { sanityRequest } from "@lib/sanity/sanityActions"

import Button from "@atom/button/index"

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
          <div className="flex items-center justify-center mb-8">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`flex items-center h-10 px-2 py-2 -mb-px text-center ${
                  location.pathname == "/modules"
                    ? "text-indigo-600 dark:border-indigo-400 cursor-base border-indigo-500"
                    : "border-transparent text-gray-700 dark:text-white hover:border-gray-400"
                }  bg-transparent border-b-2  sm:px-4 -px-1  dark:text-indigo-300 whitespace-nowrap focus:outline-none`}
              >
                <Link className="no-underline" to="/modules">
                  <span className="mx-1 text-sm sm:text-base"> Modules </span>
                </Link>
              </button>

              <button
                className={`flex items-center h-10 px-2 py-2 -mb-px text-center ${
                  location.pathname == "/settings"
                    ? "text-indigo-600 dark:border-indigo-400 cursor-base border-indigo-500"
                    : "border-transparent text-gray-700 dark:text-white hover:border-gray-400"
                }  bg-transparent border-b-2  sm:px-4 -px-1  dark:text-indigo-300 whitespace-nowrap focus:outline-none`}
              >
                <Link className="no-underline" to="/settings">
                  <span className="mx-1 text-sm sm:text-base"> Settings </span>
                </Link>
              </button>
            </div>
          </div>

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
