import React, { useState, useEffect } from "react"
import { Anchor } from "antd"
import styled from "@emotion/styled"

// Hook to extract headings from DOM at runtime
const useRuntimeHeadings = () => {
  const [headings, setHeadings] = useState([])

  useEffect(() => {
    // Get all headings from the document
    const headingElements = document.querySelectorAll(
      "article h1, article h2, article h3, article h4, article h5, article h6"
    )

    const extractedHeadings = Array.from(headingElements).map(
      (heading, index) => {
        // Create an ID if it doesn't have one
        if (!heading.id) {
          heading.id = `heading-${index}`
        }

        return {
          id: heading.id,
          text: heading.textContent.trim(),
          level: parseInt(heading.tagName.charAt(1), 10),
        }
      }
    )

    setHeadings(extractedHeadings)
  }, [])

  return headings
}

// Transform runtime headings to Ant Design Anchor format
const buildHierarchy = headings => {
  const items = []
  const stack = []

  headings.forEach(heading => {
    const item = {
      key: `#${heading.id}`,
      href: `#${heading.id}`,
      title: heading.text,
      children: [],
    }

    // Find the correct parent level
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      items.push(item)
    } else {
      stack[stack.length - 1].children.push(item)
    }

    stack.push({ ...item, level: heading.level })
  })

  // Clean up empty children arrays
  const cleanItems = items =>
    items.map(item => ({
      ...item,
      children:
        item.children.length > 0 ? cleanItems(item.children) : undefined,
    }))

  return cleanItems(items)
}

// Transform the data structure to match Ant Design's Anchor format (fallback for static data)
const transformItems = items => {
  if (!items) return []

  return items.map(item => ({
    key: item.url,
    href: item.url,
    title: item.title,
    children: item.items ? transformItems(item.items) : undefined,
  }))
}

const TableOfContents = ({ items }) => {
  const runtimeHeadings = useRuntimeHeadings()

  // Use runtime headings if available, otherwise fall back to static data
  const anchorItems =
    runtimeHeadings.length > 0
      ? buildHierarchy(runtimeHeadings)
      : items?.items
      ? transformItems(items.items)
      : []

  if (anchorItems.length === 0) return null

  return (
    <Container>
      {anchorItems.length > 1 && (
        <Anchor
          items={anchorItems}
          offsetTop={20}
          targetOffset={60}
          showInkInFixed={false}
        />
      )}
    </Container>
  )
}

export default TableOfContents

const Container = styled.aside`
  flex: 1 auto;
  padding-left: var(--ant-padding-xxl);
  margin-top: var(--ant-margin-xl);
  position: sticky;
  top: var(--ant-padding);
  align-self: flex-start;
  display: none;
  width: 100%;
  max-width: 280px;

  @media (min-width: 768px) {
    display: block;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
`
