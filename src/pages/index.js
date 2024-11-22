import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import icon from "../images/icon-animated.png"

const IndexPage = () => (
  <Layout>
    <h1 style={{ margin: "auto" }}>The Digital Store Standard</h1>
    <img
      src={icon}
      alt="Phygrid"
      style={{ width: "80%", margin: "0 auto", opacity: ".25" }}
    />
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
