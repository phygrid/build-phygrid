// src/templates/docTemplate.js
import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import * as Icons from "@ant-design/icons"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Typography } from "antd"

import Seo from "../components/seo"
import Layout from "../components/layout"
import Accordion from "../components/accordion"
import TableOfContents from "../components/tableOfContents"
import PhyCard from "../components/phyCard"
import ResponsivePlayer from "../components/responsivePlayer"
import { Alert } from "antd"
import InfoBox from "../components/info"

import { markdownStyles } from "../styles/markdownStyles"

const components = {
  Accordion,
  Icons,
  Alert,
  PhyCard,
  InfoBox,
  GatsbyImage,
  getImage,
  ResponsivePlayer,
}

const DocTemplate = ({ data, children }) => {
  const { title, icon, images } = data.mdx.frontmatter
  const { tableOfContents } = data.mdx
  const { slug } = data.mdx.fields

  const IconComponent = icon && Icons[icon] ? Icons[icon] : null

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
        {IconComponent && <IconComponent style={{ marginRight: 8 }} />}
        {title}
        {/* {category && <Tag color="blue">{category}</Tag>}
        {access && <Tag color="green">{access}</Tag>} */}
      </Title>

      <Container>
        <Article className="mdc">
          <MDXProvider components={components}>
            {React.cloneElement(children, {
              images: images || [], // Pass images as props to MDX
            })}
          </MDXProvider>
        </Article>
        <TableOfContentsWrapper>
          <TableOfContents items={tableOfContents} />
        </TableOfContentsWrapper>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        icon
        category
        access
        images {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      fields {
        slug
      }
      tableOfContents
      body
    }
  }
`

export default DocTemplate

const Title = styled(Typography.Title)`
  margin: 0 var(--ant-padding-lg) var(--ant-padding-md) var(--ant-padding-lg);
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--ant-margin-xs);
  font-size: var(--ant-font-size-heading-2);
`

const Container = styled.div`
  padding: 0 var(--ant-padding-lg);
  width: 100%;
  display: flex;
  gap: var(--ant-margin-lg);
`

const TableOfContentsWrapper = styled.div`
  @media (max-width: 1199px) {
    display: none;
  }
`

const Article = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1 100%;
  width: 100%;

  ${markdownStyles};
`
