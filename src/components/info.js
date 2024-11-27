import * as React from "react"
import styled from "@emotion/styled"
import { Info, Warning, XCircle, CheckCircle } from "@phosphor-icons/react"

// Define the styles for different types
const TYPE_STYLES = {
  info: { color: "var(--color-info)", Icon: Info },
  warning: { color: "var(--color-warning)", Icon: Warning },
  success: { color: "var(--color-success)", Icon: CheckCircle },
  error: { color: "var(--color-error)", Icon: XCircle },
}

function InfoBox({ type = "info", children }) {
  const { color, Icon } = TYPE_STYLES[type] || {
    color: "var(--color-default)",
    Icon: Info,
  } // Fallback to default styles

  return (
    <InfoWrapper bgColor={color}>
      <Icon size={32} />
      <Content>{children}</Content>
    </InfoWrapper>
  )
}

export default InfoBox

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

// Styled component
const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-4);
  padding: var(--space-4);
  color: var(--color-title);
  background: ${props => props.bgColor};
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);

  // Add some optional margin or spacing
  margin-bottom: var(--space-4);

  p,
  ol,
  ul {
    margin-bottom: 0;
  }
`
