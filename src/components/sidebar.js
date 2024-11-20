import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "@emotion/styled"
import Accordion from "./accordion"
import { useLocation } from "@reach/router"
import { CaretDown, CaretUp } from "@phosphor-icons/react"

import { breakpoints } from "../styles/breakpoints"

const Sidebar = () => {
  const location = useLocation()

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
          }
        }
      }
    }
  `)

  const [browseTopics, setBrowseTopics] = useState(false)
  const toggleBrowseTopics = () => {
    setBrowseTopics(prev => !prev)
  }

  const buildNestedStructure = nodes => {
    const nestedStructure = {}

    nodes.forEach(node => {
      const { slug, order, pathParts } = node.fields
      const title = node.frontmatter.title || "Untitled" // Get title from frontmatter
      const folderKey = pathParts[0] // Top-level folder (e.g., "1-getting-started")

      // Extract folder order and clean up folder title
      const folderOrderMatch = folderKey.match(/^(\d+)-/)
      const folderOrder = folderOrderMatch
        ? parseInt(folderOrderMatch[1], 10)
        : 0
      const folderTitle = folderKey
        .replace(/^\d+-/, "")
        .replace(/-/g, " ")
        .toUpperCase()

      // Ensure the folder exists in the structure
      if (!nestedStructure[folderKey]) {
        nestedStructure[folderKey] = {
          title: folderTitle,
          order: folderOrder,
          children: [],
        }
      }

      // Add the file to the folder's children
      nestedStructure[folderKey].children.push({
        slug,
        title, // Use the title from frontmatter
        order,
      })
    })

    // Sort files within each folder by their order
    Object.values(nestedStructure).forEach(folder => {
      folder.children.sort((a, b) => a.order - b.order)
    })

    return nestedStructure
  }

  const nestedSections = buildNestedStructure(data.allMdx.nodes)

  // Render nested sections as accordions
  const renderSections = sections => {
    // Sort folders by their order
    const sortedFolders = Object.keys(sections).sort((a, b) => {
      const orderA = sections[a].order || 0
      const orderB = sections[b].order || 0
      return orderA - orderB
    })

    return (
      <ul>
        <li>
          <StyledLink to="/" activeClassName="active">
            Welcome
          </StyledLink>
        </li>

        {sortedFolders.map(key => {
          const section = sections[key]

          // Check if any child slug matches the current path to determine defaultOpen
          const isDefaultOpen = section.children.some(child =>
            location.pathname.includes(child.slug)
          )

          return (
            <li key={key}>
              <Accordion title={section.title} defaultOpen={isDefaultOpen}>
                <ul>
                  {section.children.map(child => (
                    <li key={child.slug}>
                      <StyledLink to={child.slug} activeClassName="active">
                        {child.title}
                      </StyledLink>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <SidebarContainer>
      <ToggleSidebar onClick={toggleBrowseTopics}>
        <span>Browse Topics</span>
        {browseTopics ? <CaretUp /> : <CaretDown />}
      </ToggleSidebar>
      <Nav open={browseTopics}>{renderSections(nestedSections)}</Nav>
    </SidebarContainer>
  )
}

export default Sidebar

const ToggleSidebar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-sm);
  padding: var(--space-1) var(--space-2);

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
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-2);

  @media (min-width: ${breakpoints.md}) {
    width: 300px;
    border-bottom: 0;
    border-right: 1px solid var(--color-border);
  }

  nav > ul > li {
    margin-bottom: var(--space-2);
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
