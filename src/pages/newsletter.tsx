import React from "react"
import { PageProps } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"

import Newsletter from "@components/newsletter"

const NewsletterPage: React.FC<PageProps<any>> = ({ location }) => {
  return (
    <>
      <Layout location={location} title="Contact">
        <Seo
          title="Contact"
          location={location}
          description="Fill the contact form."
        />
        <section className="m-t-25 m-b-35">
          <div className="wrapper wrapper--narrow">
            <header>
              <h1 className="my-3 text-3xl text-gray-700 font-semibod">
                Newsletter for website development
              </h1>
              <p className="text-gray-400">
                Subscribe to get updates on my latest activities and web design
                tips. Fill out the form below to be notified..
              </p>
            </header>

            <div className="max-w-xl">
              <Newsletter />
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default NewsletterPage
