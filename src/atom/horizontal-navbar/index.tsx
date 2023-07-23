import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import Button from "@atom/button/index"

const HorizontalNavbar = ({ nav }: any) => {
  return (
    <nav className="flex pl-3 pr-3 pb-3 pt-3 mb-3 mt-3">
      {nav.map((evt: any) => {
        return (
          <span className="mr-3">
            <Button
              textValue={evt.title}
              iconRight={`${evt.state == "active" ? "pin" : ""}`}
              className="mx-auto"
              btnSize="med"
              btnTheme={`${evt.state == "active" ? "indigo" : "outline"}`}
              onClickHandler={() => {
                navigate(evt.goto)
              }}
            />
          </span>
        )
      })}
    </nav>
  )
}

export default HorizontalNavbar

HorizontalNavbar.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.bool,
  required: PropTypes.bool,
}

HorizontalNavbar.defaultProps = {
  id: "text",
  type: "text",
  placeholder: "Place text here",
  autoComplete: "on",
  required: false,
}
