import React from "react"
import styled from "@emotion/styled"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default ({ media }) => {
  // Check if media exists and has elements before rendering
  if (!media || !Array.isArray(media) || media.length === 0) {
    return null
  }

  // Extract the gatsby image data from the childImageSharp structure
  const imageData = getImage(media[0])

  if (!imageData) {
    return null
  }

  return (
    <Preview>
      <GatsbyImage image={imageData} alt="Overview" />
    </Preview>
  )
}

const Preview = styled.div`
  width: 100%;
  margin: var(--ant-margin-md) 0;

  .gatsby-image-wrapper {
    max-width: 720px;
    border: 1px solid var(--ant-color-border-secondary);
    border-radius: var(--ant-border-radius);
    box-shadow: var(--ant-box-shadow);
  }
`
