import React from "react"
import { Card, Row, Col, Image } from "antd"
import styled from "@emotion/styled"
import { getImage } from "gatsby-plugin-image"

// Higher order component to add noOffset className support
const PhyCardComponent = ({
  className,
  noOffset,
  noPadding,
  grow,
  images,
  children,
  stickyImage,
  ...props
}) => {
  // If images are provided, render with image column layout
  if (images) {
    return (
      <PhyCardWithImages
        className={`${className || ""} ${noOffset ? "no-offset" : ""}`}
        grow={grow}
        bodyStyle={{ padding: 0 }}
        images={images}
        stickyImage={stickyImage}
        {...props}
      >
        {children}
      </PhyCardWithImages>
    )
  }

  // Default PhyCard behavior (no images)
  return (
    <PhyCard
      className={`${className || ""} ${noOffset ? "no-offset" : ""}`}
      grow={grow}
      styles={{ body: noPadding ? { padding: 0 } : undefined }}
      {...props}
    >
      {children}
    </PhyCard>
  )
}

const PhyCardWithImages = ({ images, stickyImage, children, ...props }) => {
  // Render images - handle both JSX (legacy) and data array (new)
  const renderImages = () => {
    if (!images) return null

    // If images is JSX (React element), render it directly
    if (React.isValidElement(images)) {
      return images
    }

    // If images is an array of image data, render Ant Design Images with preview
    if (Array.isArray(images)) {
      return images.map((imageData, index) => {
        const image = getImage(imageData)
        if (!image) return null

        return (
          <Image
            key={index}
            alt={`Step image ${index + 1}`}
            src={image.images.fallback.src}
            preview={{
              src: image.images.fallback.src,
            }}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--ant-border-radius)",
              boxShadow: "var(--ant-box-shadow)",
            }}
          />
        )
      })
    }

    return null
  }

  return (
    <PhyCard bodyStyle={{ padding: 0 }} {...props}>
      <Row>
        <Col
          sm={24}
          lg={12}
          style={{
            borderRight: "1px solid var(--ant-color-border-secondary)",
            padding: "var(--ant-padding-md) var(--ant-padding-lg)",
          }}
        >
          <Content>{children}</Content>
        </Col>
        <Col
          style={{
            padding: "var(--ant-padding-md)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--ant-margin-md)",
          }}
          sm={24}
          lg={12}
        >
          <ImageWrapper sticky={stickyImage}>{renderImages()}</ImageWrapper>
        </Col>
      </Row>
    </PhyCard>
  )
}

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--ant-margin-md);
  width: 100%;
  height: 100%;

  ${props =>
    props.sticky &&
    `
    .ant-image {    
      position: sticky;
      top: var(--ant-padding-md);
  }
  `}
`

const Content = styled.div`
  position: sticky;
  top: var(--ant-padding-md);

  ul,
  p,
  ol {
    color: var(--ant-color-text-secondary);
  }

  ul {
  }
`

const PhyCard = styled(Card)`
  ${props => props.grow && `height: 100%;`}
  .ant-card-cover {
    opacity: 0.8;
    overflow: hidden;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        var(--ant-color-bg-container)
      );
    }

    img {
      transform: scale(1);
      transition: transform var(--ant-motion-duration-mid)
        var(--ant-motion-ease-in-out);
    }
  }
  &:hover {
    .ant-card-cover {
      opacity: 1;
      img {
        transform: scale(1.1);
      }
    }
  }
`

export default PhyCardComponent
