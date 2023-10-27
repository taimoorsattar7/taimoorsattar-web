import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"

import SEOHead from "@atom/seo-head/index"

import { isLoggedIn, getCurrentUser } from "@utils/auth"
import { sanityRequest } from "@lib/sanity/sanityActions"
import Tabs from "@atom/tabs/index"

import Button from "@atom/button/index"
import Layout from "@components/layout"

const Modules = ({ location }: any) => {
  const [content, setcontent] = useState([])

  useEffect(() => {
    if (isLoggedIn()) {
      fetchData()
    } else {
      navigate("/auth")
    }
  }, [location])

  async function fetchData() {
    let usr = getCurrentUser()

    let data = await sanityRequest(
      `*[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${usr.email}']._id]{'module': price->content->{_id, title, seo, 'img': seo.image.asset->{_updatedAt, extension, originalFilename, url}, slug}}`
    )

    setcontent(data)
  }

  return (
    <Layout>
      <section className="m-t-25 p-b-35">
        <div className="wrapper wrapper--narrow">
          <Tabs
            tabs={[
              {
                name: "Modules",
                href: "/modules",
                current: location?.pathname == "/modules" ? true : false,
              },
              {
                name: "Settings",
                href: "/settings",
                current: location?.pathname == "/settings" ? true : false,
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
    </Layout>
  )
}

export const Head = ({
  location,
  // params,
  data,
}: // pageContext
any) => (
  <SEOHead
    title={"Modules"}
    description="My name is Taimoor Sattar, a full-stack developer. I have a bachelor's degree in engineering, but love to code."
    location={location}
  />
)

export default Modules
