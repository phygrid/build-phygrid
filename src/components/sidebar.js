// src/components/Sidebar.js
import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "@emotion/styled"
import Accordion from "./accordion"
import { useLocation } from "@reach/router"

import { breakpoints } from "../styles/breakpoints"

const Sidebar = () => {
  const location = useLocation()
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: [{ fields: { section: ASC } }, { frontmatter: { order: ASC } }]
      ) {
        nodes {
          fields {
            slug
            section
            title
            pathParts
          }
          frontmatter {
            title
            order
          }
        }
      }
    }
  `)

  const [browseTopics, setBrowseTopics] = useState(false)
  const toggleBrowseTopics = () => {
    setBrowseTopics(prev => !prev)
  }

  // Build a nested structure from the folder paths
  const buildNestedStructure = nodes => {
    const nestedStructure = {}

    nodes.forEach(node => {
      const { pathParts, slug } = node.fields
      const title = node.frontmatter.title || node.fields.title

      let currentLevel = nestedStructure

      pathParts.forEach((part, index) => {
        if (!currentLevel[part]) {
          currentLevel[part] = { title: part, children: {} }
        }
        if (index === pathParts.length - 1) {
          currentLevel[part].children[slug] = { title, slug }
        } else {
          currentLevel = currentLevel[part].children
        }
      })
    })

    return nestedStructure
  }

  const nestedSections = buildNestedStructure(data.allMdx.nodes)

  // Recursive function to render nested sections as accordions
  const renderSections = sections => (
    <ul>
      {Object.keys(sections).map(key => {
        const section = sections[key]
        const isFolder =
          section.children && Object.keys(section.children).length > 0

        return (
          <li key={key}>
            {isFolder ? (
              <Accordion
                title={section.title.replace(/-/g, " ").toUpperCase()}
                defaultOpen={location.pathname.includes(key)}
              >
                {renderSections(section.children)}
              </Accordion>
            ) : (
              <StyledLink to={section.slug} activeClassName="active">
                {section.title}
              </StyledLink>
            )}
          </li>
        )
      })}
    </ul>
  )

  return (
    <SidebarContainer>
      <ToggleSidebar onClick={toggleBrowseTopics}>Browse Topics</ToggleSidebar>
      <Nav open={browseTopics}>{renderSections(nestedSections)}</Nav>
    </SidebarContainer>
  )
}

export default Sidebar

const ToggleSidebar = styled.div`
  display: flex;
  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
`

const Nav = styled.nav`
  width: 100%;
  position: sticky;
  top: 0;
  align-self: flex-start;
  display: ${props => (props.open ? "block" : "none")};

  @media (min-width: ${breakpoints.md}) {
    display: block;
  }
`

const SidebarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-2);

  @media (min-width: ${breakpoints.md}) {
    width: 300px;
    border-bottom: 0;
  }

  /* Target top-level <li> elements in the sidebar navigation */
  nav > ul > li {
    margin-bottom: var(--space-2);
    /* border-left: 1px solid #fff; */
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin: 0;
    }
  }

  a.active {
    background: var(--color-primary);
    color: #fff;
  }
`

const StyledLink = styled(Link)`
  color: var(--color-text);
  display: block;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-sm);
  text-decoration: none;
  border-radius: var(--border-radius);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`
