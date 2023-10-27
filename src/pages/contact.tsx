import React from "react"
import Layout from "@components/layout"
import SEOHead from "@atom/seo-head/index"
import Contact from "@components/contact"

const ContactUs = ({ location }: any) => (
  <Layout containersize={"small"} location={location} title="Contact">
    <div className="lg:px-32">
      <Contact />
    </div>
  </Layout>
)

export const Head = ({
  location,
  // params,
  data,
}: // pageContext
any) => (
  <SEOHead
    title={"Contact"}
    description="Fill the contact form."
    location={location}
  />
)

export default ContactUs
