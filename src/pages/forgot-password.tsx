import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import AnimateLayout from "@components/AnimateLayout"
import ForgetPassword from "@components/forgotPassword"

const ForgetPasswordPage: React.FC<PageProps<any>> = ({ data, location }) => {
  return (
    <AnimateLayout location={location}>
      <ForgetPassword />
    </AnimateLayout>
  )
}

export default ForgetPasswordPage
