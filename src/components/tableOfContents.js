import React from "react"
import styled from "@emotion/styled"
import useActiveSection from "../hooks/useActiveSection"

import { breakpoints } from "../styles/breakpoints"

const renderTableOfContents = (items, activeSection) => {
  if (!items) return null

  return (
    <ul>
      {items.map(item => (
        <li key={item.url}>
          <a
            href={item.url}
            className={activeSection === item.url ? "active" : ""}
          >
            {item.title}
          </a>
          {renderTableOfContents(item.items, activeSection)}{" "}
          {/* Recursive call */}
        </li>
      ))}
    </ul>
  )
}

const TableOfContents = ({ items }) => {
  const activeSection = useActiveSection(items?.items || []) // Hook must be called at the top level

  if (!items || !items.items) return null // Render logic after the hook

  return (
    <Aside>
      <Title>Step by step</Title>
      {renderTableOfContents(items.items, activeSection)}
    </Aside>
  )
}

export default TableOfContents

const Title = styled.span`
  color: var(--color-title);
  font-weight: 600;
`

const Aside = styled.aside`
  flex: 1 auto;
  padding-left: var(--space-6);
  position: sticky;
  top: var(--space-3);
  align-self: flex-start;
  display: none;

  @media (min-width: ${breakpoints.md}) {
    display: block;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    ul {
      margin-left: var(--space-1);
      padding-left: var(--space-2);
      border-left: 1px solid rgba(255, 255, 255, 0.12);
    }

    li {
      margin: 0;

      a {
        text-decoration: none;
        color: inherit;
        font-size: var(--font-xs);
        white-space: nowrap;

        &:hover {
          color: var(--color-title);
        }

        &.active {
          font-weight: bold;
          color: var(--color-primary);
        }
      }
    }
  }
`
