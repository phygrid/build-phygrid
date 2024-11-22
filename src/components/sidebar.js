import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "@emotion/styled"
import Accordion from "./accordion"
import { useLocation } from "@reach/router"
import * as PhosphorIcons from "@phosphor-icons/react"

import { breakpoints } from "../styles/breakpoints"
import { navButtonStyles } from "../styles/buttonStyles"

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
            icon
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
      const { title = "Untitled", icon } = node.frontmatter
      const folderKey = pathParts[0] // Top-level folder (e.g., "1-getting-started")

      const folderOrderMatch = folderKey.match(/^(\d+)-/)
      const folderOrder = folderOrderMatch
        ? parseInt(folderOrderMatch[1], 10)
        : 0
      const folderTitle = folderKey.replace(/^\d+-/, "").replace(/-/g, " ")

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
        title,
        icon,
        order,
      })
    })

    Object.values(nestedStructure).forEach(folder => {
      folder.children.sort((a, b) => a.order - b.order)
    })

    return nestedStructure
  }

  const nestedSections = buildNestedStructure(data.allMdx.nodes)

  // Render nested sections as accordions
  const renderSections = sections => {
    const sortedFolders = Object.keys(sections).sort((a, b) => {
      const orderA = sections[a].order || 0
      const orderB = sections[b].order || 0
      return orderA - orderB
    })

    return (
      <ul>
        <NavSection>
          <StyledLink to="/" activeClassName="active">
            Welcome
          </StyledLink>
        </NavSection>

        {sortedFolders.map(key => {
          const section = sections[key]
          const isDefaultOpen = section.children.some(child =>
            location.pathname.includes(child.slug)
          )

          return (
            <NavSection key={key}>
              <Accordion title={section.title} defaultOpen={true}>
                <ul>
                  {section.children.map(child => {
                    const IconComponent = child.icon
                      ? PhosphorIcons[child.icon]
                      : null

                    return (
                      <li key={child.slug}>
                        <StyledLink to={child.slug} activeClassName="active">
                          {IconComponent && <IconComponent />} {child.title}
                        </StyledLink>
                      </li>
                    )
                  })}
                </ul>
              </Accordion>
            </NavSection>
          )
        })}
      </ul>
    )
  }

  return (
    <SidebarContainer>
      <ToggleSidebar onClick={toggleBrowseTopics}>
        <span>Browse Topics</span>
        {browseTopics ? <PhosphorIcons.CaretUp /> : <PhosphorIcons.CaretDown />}
      </ToggleSidebar>
      <Nav open={browseTopics}>{renderSections(nestedSections)}</Nav>
    </SidebarContainer>
  )
}

export default Sidebar

const NavSection = styled.li`
  padding: var(--space-2) var(--space-1);
`

const ToggleSidebar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-md);
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
    width: auto;
    border-bottom: 0;
    /* border-right: 1px solid var(--color-border); */
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
`

const StyledLink = styled(Link)`
  ${navButtonStyles};
`
