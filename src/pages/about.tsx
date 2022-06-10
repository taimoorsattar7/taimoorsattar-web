import React from "react"
import SEO from "@components/seo"

import { Link } from "gatsby"

import Layout from "@components/layout"

const IndexPage = ({ location }: any) => (
  <Layout location={location}>
    <SEO
      title={"About - Taimoor Sattar"}
      description="My name is Taimoor Sattar and I'm a full-stack developer and educator. I've been building user interfaces for half a decade. I've always been intrigued by languages used elegantly and efficiently, regardless of whether they are interpreted by humans or computers."
      location={location}
    />
    <section className="m-t-25 m-b-35">
      <div className="wrapper wrapper--narrow">
        <div className="m-b-20">
          <h2 className="headline m-b-20">About Me</h2>
        </div>
        <p className="w-full max-w-full mb-6 prose prose-xl">
          My name is Taimoor Sattar and I'm a full-stack developer and educator.
          I've been building user interfaces for half a decade.
        </p>

        <img
          className="block max-w-xl m-auto mb-8"
          src="https://res.cloudinary.com/taimoorsattar/image/upload/v1648794558/taimoorsattar_dev/profile/profile-banner.jpg"
          alt="Profile"
          loading="lazy"
        />

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
      </div>
    </section>
  </Layout>
)

export default IndexPage
