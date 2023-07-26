import React from "react"
import Layout from "@components/layout"
import Seo from "@components/seo"
import Contact from "@components/contact"
import Container from "@primitives/container/container"

const ContactUs = ({ location }: any) => (
  <>
    <Layout location={location} title="Contact">

      <Seo
        title="Contact"
        location={location}
        description="Fill the contact form."
      />

<Container>
      <Contact />
      </Container>
    </Layout>
  </>
)

export default ContactUs
