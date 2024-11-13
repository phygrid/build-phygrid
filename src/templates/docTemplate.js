import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import Seo from "../components/seo"
import Layout from "../components/layout"

const DocTemplate = ({ data, children }) => {
  const { title } = data.mdx.frontmatter

  // Customize MDX elements
  // const components = {
  //   h1: (props) => <h1 style={{ color: "tomato" }} {...props} />,
  //   p: (props) => <p style={{ fontSize: "18px", lineHeight: 1.6 }} {...props} />,
  // };

  return (
    <Layout>
      <h1>{title}</h1>
      <MDXProvider>
        <div>{children}</div>
      </MDXProvider>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`

export default DocTemplate
