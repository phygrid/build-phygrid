import React from "react"
import styled from "@emotion/styled"

const StepImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--ant-margin-sm);
  margin-bottom: var(--ant-margin-md);
`

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: var(--ant-border-radius);
  box-shadow: var(--ant-box-shadow);
`

const Caption = styled.p`
  margin: 0;
  font-size: var(--ant-font-size-sm);
  color: var(--ant-color-text-secondary);
  text-align: center;
  font-style: italic;
`

export default ({ src, description, alt, ...props }) => {
  return (
    <StepImageWrapper {...props}>
      <StyledImage src={src} alt={alt || description || "Step image"} />
      {description && <Caption>{description}</Caption>}
    </StepImageWrapper>
  )
}
