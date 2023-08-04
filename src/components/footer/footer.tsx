"use client"

import React from "react"
import { Link } from "gatsby"
import logo from "../../images/logo.svg"

import "../_wrapper.scss"
import "../_headline.scss"
import "./footer.scss"
import "@styles/_primary-nav.scss"
import "@styles/_flex.scss"
import "@components/_primary-nav.scss"

const Footer = () => (
  <footer className="footer m-t-35 m-b-25">
    <div className="flex flex-wrap justify-center items-center">
      <div className="logo">
        <Link to="/?from=header">
          <img className="site-header__logo" src={logo} alt="Taimoor Sattar" />
        </Link>
      </div>
      <nav className="footer_nav">
        <ul>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/contact/">Contact</Link>
          </li>

          <li>
            <b>
              <a href="/privacy-policy/">Privacy Policy</a>
            </b>
          </li>

          <li>
            <b>
              <a href="https://twitter.com/taimoorsattar7">Twitter</a>
            </b>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
)

export default Footer
