import React from "react"
import SEO from "@components/seo"

import { Link } from "gatsby"

import Layout from "@components/layout"

import Newsletter from "@components/newsletter"

const IndexPage = ({ location }: any) => (
  <Layout location={location}>
    <SEO
      title={"About - Taimoor Sattar"}
      description="My name is Taimoor Sattar and I'm a full-stack developer and educator. I've been building user interfaces for half a decade. I've always been intrigued by languages used elegantly and efficiently, regardless of whether they are interpreted by humans or computers."
      location={location}
    />
    <section className="m-b-35">
      <div
        className="w-full mb-16 pt-28 pb-32 bg-gray-500 bg-no-repeat"
        style={{
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          backgroundImage:
            "url('https://res.cloudinary.com/taimoorsattar/image/upload/v1648794558/taimoorsattar_dev/profile/profile-banner.jpg')",
        }}
      >
        <div className="wrapper wrapper--narrow">
          <div className="m-b-20">
            <header>
              <h2 className="mb-4 text-white font-heading font-semibold text-6xl sm:text-7xl">
                <b>About Me</b>
              </h2>

              <p className="text-lg text-slate-200">
                My name is Taimoor Sattar and I'm a full-stack developer and
                educator. I've been building user interfaces for half a decade.
                I've always been intrigued by languages used elegantly and
                efficiently, regardless of whether they are interpreted by
                humans or computers.
              </p>
            </header>
          </div>
        </div>
      </div>

      <div className="wrapper wrapper--narrow">
        <p className="w-full max-w-full mb-6 prose prose-xl">
          My name is Taimoor Sattar and I'm a full-stack developer and educator.
          I've been building user interfaces for half a decade.
        </p>

        <p className="w-full max-w-full mb-6 prose prose-xl">
          I work with techology like Gatsby, Tailwind CSS, React Query,
          Sendgrid, Sanity, Stripe payments, etc to build the website. I've
          always been intrigued by languages used elegantly and efficiently,
          regardless of whether they are interpreted by humans or computers.
        </p>

        <p className="w-full max-w-full mb-6 prose prose-xl">
          I wrote a course, Build A Standout Website With Gatsby, Sanity, and
          Stripe. In this course, we use the Gatsby (React) framework to build
          websites that connect with Stripe payment and Sanity Server.
        </p>

        <p className="w-full max-w-full mb-6 prose prose-xl">
          Furthermore, If you have any question about me, you can contact me on{" "}
          <Link to="/contact?from=about-page">this page</Link>.
        </p>

        <div className="max-w-xl">
          <Newsletter />
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage
