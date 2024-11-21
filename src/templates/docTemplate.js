// src/templates/docTemplate.js
import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { StaticImage } from "gatsby-plugin-image"

import Seo from "../components/seo"
import Layout from "../components/layout"

const components = {
  StaticImage, // Add StaticImage to MDX scope
}

const DocTemplate = ({ data, children }) => {
  const { title } = data.mdx.frontmatter
  const { slug } = data.mdx.fields

  // Function to convert slug to title format, reversed for desired hierarchy
  const generateTitleFromSlug = slug => {
    return slug
      .split("/")
      .filter(part => part) // Remove empty strings from leading/trailing slashes
      .reverse() // Reverse the order to match desired hierarchy
      .map(part =>
        part.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase())
      )
      .join(" - ")
  }

  // Use either the frontmatter title or a generated title from slug
  const seoTitle = title || generateTitleFromSlug(slug)

  return (
    <Layout>
      <Seo title={seoTitle} />
      <h1>{title}</h1>
      <MDXProvider components={components}>
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
      fields {
        slug
      }
    }
  }
`

export default DocTemplate
