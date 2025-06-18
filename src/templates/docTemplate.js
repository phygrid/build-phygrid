// src/templates/docTemplate.js
import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import { StaticImage } from "gatsby-plugin-image"
import * as PhosphorIcons from "@phosphor-icons/react"

import Seo from "../components/seo"
import Layout from "../components/layout"
import Accordion from "../components/accordion"
import TableOfContents from "../components/tableOfContents"
import InfoBox from "../components/info"

import { markdownStyles } from "../styles/markdownStyles"
import { breakpoints } from "../styles/breakpoints"

const components = {
  StaticImage, // Add StaticImage to MDX scope
  Accordion,
  PhosphorIcons,
  InfoBox,
}

const DocTemplate = ({ data, children }) => {
  const { title } = data.mdx.frontmatter
  const { tableOfContents } = data.mdx
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
      <Title>
        {title}
        {/* {IconComponent && <IconComponent />} {title} */}
      </Title>
      <Container>
        <Article className="mdc">
          <MDXProvider components={components}>{children}</MDXProvider>
        </Article>
        <TableOfContents items={tableOfContents} />
      </Container>
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
      tableOfContents
    }
  }
`

export default DocTemplate

const Title = styled.h1`
  padding: 0 var(--space-4) var(--space-4) var(--space-4);
  margin: auto;
  max-width: 980px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--space-5);

  @media (min-width: ${breakpoints.md}) {
    font-size: var(--space-6);
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0 var(--space-4);
  margin: auto;
  max-width: 980px;
  width: 100%;
`

const Article = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1 100%;
  width: 100%;

  ${markdownStyles};
`
