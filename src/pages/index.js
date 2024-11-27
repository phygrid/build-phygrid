import * as React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "@emotion/styled"
import * as PhosphorIcons from "@phosphor-icons/react"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { breakpoints } from "../styles/breakpoints"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: [fields___order], order: ASC }) {
        nodes {
          fields {
            slug
            order
            pathParts
          }
          frontmatter {
            title
            icon
          }
        }
      }
    }
  `)

  const renderSections = nodes => {
    const buildNestedStructure = nodes => {
      const nestedStructure = {}

      nodes.forEach(node => {
        const { pathParts, slug } = node.fields
        const { title = "Untitled", icon } = node.frontmatter
        const folderKey = pathParts[0] // Top-level folder key (e.g., "1-getting-started")
        const folderOrderMatch = folderKey.match(/^(\d+)-/)
        const folderOrder = folderOrderMatch
          ? parseInt(folderOrderMatch[1], 10)
          : 0
        const folderTitle = folderKey.replace(/^\d+-/, "").replace(/-/g, " ")

        if (!nestedStructure[folderKey]) {
          nestedStructure[folderKey] = {
            title: folderTitle,
            order: folderOrder,
            slug,
            icon,
          }
        }
      })

      return nestedStructure
    }

    const nestedSections = buildNestedStructure(nodes)
    const sortedFolders = Object.keys(nestedSections).sort((a, b) => {
      return nestedSections[a].order - nestedSections[b].order
    })

    return (
      <Sections>
        {sortedFolders.map(key => {
          const section = nestedSections[key]
          const IconComponent = section.icon
            ? PhosphorIcons[section.icon] || null
            : null

          return (
            <Section key={key}>
              <Link to={section.slug}>
                {IconComponent && <IconComponent weight="fill" size={80} />}
                {section.title}
              </Link>
            </Section>
          )
        })}
      </Sections>
    )
  }

  return <Layout>{renderSections(data.allMdx.nodes)}</Layout>
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Welcome" />

export default IndexPage

const Sections = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  list-style: none;
  margin: 0;
  padding: var(--space-4);

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(5, 1fr);
  }
`
const Section = styled.li`
  margin: 0;
  padding: 0;

  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    padding: var(--space-4);
    background: var(--color-light-bg);
    border-radius: var(--border-radius);
    font-weight: 600;
    color: var(--color-text);

    &:hover {
      color: var(--color-primary);
    }
  }
`
