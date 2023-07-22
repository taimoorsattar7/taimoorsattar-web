import React from "react"
import SEO from "@components/seo"

import { Link } from "gatsby"

import AnimateLayout from "@components/AnimateLayout"

const IndexPage = ({ location }: any) => (
  <AnimateLayout location={location}>
    <SEO
      title={"About - Taimoor Sattar"}
      description="My name is Taimoor Sattar and I'm a full-stack developer and educator. I've been building user interfaces for half a decade. I've always been intrigued by languages used elegantly and efficiently, regardless of whether they are interpreted by humans or computers."
      location={location}
    />
    <section className="m-b-35">
      <div className="wrapper wrapper--narrow">
        <header>
          <h2 className="text-5xl mb-1 font-heading text-center sm:text-left">
            <b>About Me</b>
          </h2>
        </header>
      </div>

      <main className="prose prose-base mt-4 pb-12 wrapper wrapper--narrow">
        <p className="w-full max-w-full mb-6">
          I'm Taimoor Sattar, a full-stack developer and educator. I've always
          been intrigued by languages used elegantly and efficiently, regardless
          of whether they are interpreted by humans or computers.
        </p>

        <p className="w-full max-w-full mb-6">
          I have experience with technology such as React (Typescript), Gatsby,
          Tailwind CSS, Sanity, Stripe payments, etc. I love to code and accept
          challenges in any field of life and programming.
        </p>

        <p className="w-full max-w-full mb-6">
          Also, I've publish a Developer course, "Build A Standout Website".
          This course is complete and you can enroll in it to learn the skillset
          and framework needed to build a dynamic website using Gatsby, Sanity
          and Stripe.
        </p>

        <p className="w-full max-w-full mb-6">
          If you have any question about me, you can send me a message on{" "}
          <Link to="/contact?from=about-page">this page</Link>.
        </p>
      </main>
    </section>
  </AnimateLayout>
)

export default IndexPage
