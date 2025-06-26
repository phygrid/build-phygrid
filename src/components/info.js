import * as React from "react"
import styled from "@emotion/styled"
import {
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"

// Define the styles for different types
const TYPE_STYLES = {
  info: { color: "var(--ant-color-info)", Icon: InfoCircleOutlined },
  warning: { color: "var(--ant-color-warning)", Icon: WarningOutlined },
  success: { color: "var(--ant-color-success)", Icon: CheckCircleOutlined },
  error: { color: "var(--ant-color-error)", Icon: CloseCircleOutlined },
}

function InfoBox({ type = "info", children }) {
  const { color, Icon } = TYPE_STYLES[type] || {
    color: "var(--ant-color-text)",
    Icon: InfoCircleOutlined,
  } // Fallback to default styles

  return (
    <InfoWrapper bgColor={color}>
      <Icon style={{ fontSize: 32 }} />
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
  gap: var(--ant-margin-lg);
  padding: var(--ant-padding-lg);
  color: var(--ant-color-text-heading);
  background: ${props => props.bgColor};
  border-radius: var(--ant-border-radius);
  box-shadow: var(--ant-box-shadow-tertiary);

  // Add some optional margin or spacing
  margin-bottom: var(--ant-margin-lg);

  p,
  ol,
  ul {
    margin-bottom: 0;
  }
`
