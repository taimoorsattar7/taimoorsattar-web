import * as React from "react"
import { FunctionComponent } from "react"

const Section: FunctionComponent = ({ diff, children }: any) => {
  return <section className={`
    ${diff=="sml"? "mt-2 mb-2":""}
    ${diff=="med"? "mt-4 mb-4":""}
    ${diff=="large"? "mt-6 mb-6":""}
    `}>{children}</section>
}

export default Section
