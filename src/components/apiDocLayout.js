import React from "react"
import { Row, Col } from "antd"
import styled from "@emotion/styled"

const ApiDocLayout = ({ children }) => {
  return (
    <ApiContainer>
      <Row>
        {children}
      </Row>
    </ApiContainer>
  )
}

const ApiSection = ({ children, type = "left" }) => {
  const isLeft = type === "left"
  
  return (
    <Col
      xs={24}
      lg={isLeft ? 12 : 12}
      style={{
        padding: isLeft ? "var(--ant-padding-lg)" : "var(--ant-padding-md)",
        borderRight: isLeft ? "1px solid var(--ant-color-border-secondary)" : "none",
        background: isLeft ? "transparent" : "var(--ant-color-bg-container)",
      }}
    >
      {isLeft ? (
        <StickyContent>{children}</StickyContent>
      ) : (
        <CodeContent>{children}</CodeContent>
      )}
    </Col>
  )
}

const ApiEndpoint = ({ method, endpoint, children }) => {
  return (
    <EndpointContainer>
      <EndpointHeader>
        <MethodBadge method={method}>{method}</MethodBadge>
        <EndpointPath>{endpoint}</EndpointPath>
      </EndpointHeader>
      {children}
    </EndpointContainer>
  )
}

const ParameterList = ({ title = "Parameters", children }) => {
  return (
    <ParameterListContainer>
      <h4>{title}</h4>
      <ParameterListItems>
        {children}
      </ParameterListItems>
    </ParameterListContainer>
  )
}

const Parameter = ({ name, type, badge, required, children }) => {
  return (
    <ParameterItem>
      <ParameterHeader>
        <ParameterName>{name}</ParameterName>
        {required && <RequiredBadge>required</RequiredBadge>}
      </ParameterHeader>
      <ParameterMeta>
        <ParameterType>{type}</ParameterType>
        {badge && <ParameterBadge>{badge}</ParameterBadge>}
      </ParameterMeta>
      <ParameterDescription>{children}</ParameterDescription>
    </ParameterItem>
  )
}

const ApiContainer = styled.div`
  margin: var(--ant-margin-lg) 0;
`

const StickyContent = styled.div`
  position: sticky;
  top: var(--ant-padding-lg);
  
  h3, h4 {
    margin-top: 0;
  }
`

const CodeContent = styled.div`
  background: var(--ant-color-bg-container);
  min-height: 100vh;
  
  pre {
    background: var(--ant-color-bg-layout) !important;
    border-radius: var(--ant-border-radius);
    padding: var(--ant-padding-md);
    margin: var(--ant-margin-md) 0;
    overflow-x: auto;
  }
`

const EndpointContainer = styled.div`
  margin-bottom: var(--ant-margin-lg);
`

const EndpointHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--ant-margin-sm);
  margin-bottom: var(--ant-margin-md);
  padding: var(--ant-padding-sm);
  background: var(--ant-color-bg-layout);
  border-radius: var(--ant-border-radius);
  border-left: 4px solid var(--ant-color-primary);
`

const MethodBadge = styled.span`
  padding: 4px 8px;
  border-radius: var(--ant-border-radius);
  font-weight: 600;
  font-size: var(--ant-font-size-sm);
  color: white;
  background: ${props => {
    switch (props.method) {
      case 'GET': return '#52c41a'
      case 'POST': return '#1890ff'
      case 'PATCH': return '#fa8c16'
      case 'DELETE': return '#f5222d'
      default: return '#666'
    }
  }};
`

const EndpointPath = styled.code`
  font-family: 'Courier New', monospace;
  font-size: var(--ant-font-size);
  color: var(--ant-color-text-heading);
  background: transparent;
  padding: 0;
`

const ParameterListContainer = styled.div`
  margin: var(--ant-margin-md) 0;
  
  h4 {
    margin-bottom: var(--ant-margin-sm);
    color: var(--ant-color-text-heading);
    font-size: var(--ant-font-size-lg);
  }
`

const ParameterListItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--ant-margin-md);
`

const ParameterItem = styled.div`
  padding-bottom: var(--ant-padding-sm);
  border-bottom: 1px solid var(--ant-color-border-secondary);
  
  &:last-child {
    border-bottom: none;
  }
`

const ParameterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--ant-margin-xs);
  margin-bottom: var(--ant-margin-xs);
`

const ParameterName = styled.code`
  font-weight: 600;
  color: var(--ant-color-text-heading);
  background: transparent;
  padding: 0;
  font-size: var(--ant-font-size);
`

const RequiredBadge = styled.span`
  padding: 2px 6px;
  background: var(--ant-color-warning);
  color: white;
  border-radius: var(--ant-border-radius);
  font-size: var(--ant-font-size-xs);
  font-weight: 500;
`

const ParameterMeta = styled.div`
  display: flex;
  align-items: center;
  gap: var(--ant-margin-xs);
  margin-bottom: var(--ant-margin-xs);
`

const ParameterType = styled.span`
  font-size: var(--ant-font-size-sm);
  color: var(--ant-color-text-secondary);
  font-style: italic;
`

const ParameterBadge = styled.span`
  padding: 2px 6px;
  background: var(--ant-color-bg-layout);
  color: var(--ant-color-text-tertiary);
  border-radius: var(--ant-border-radius);
  font-size: var(--ant-font-size-xs);
  font-weight: 500;
`

const ParameterDescription = styled.div`
  font-size: var(--ant-font-size-sm);
  color: var(--ant-color-text);
  line-height: 1.5;
`

const ParameterTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: var(--ant-margin-md) 0;
  
  th, td {
    padding: var(--ant-padding-xs) var(--ant-padding-sm);
    text-align: left;
    border-bottom: 1px solid var(--ant-color-border-secondary);
  }
  
  th {
    font-weight: 600;
    color: var(--ant-color-text-heading);
    background: var(--ant-color-bg-layout);
  }
  
  code {
    background: var(--ant-color-bg-layout);
    padding: 2px 4px;
    border-radius: var(--ant-border-radius);
    font-size: var(--ant-font-size-sm);
  }
`

const ResponseContainer = styled.div`
  margin: var(--ant-margin-md) 0;
  
  h4 {
    margin-bottom: var(--ant-margin-sm);
    color: var(--ant-color-text-heading);
  }
`

const AuthBadge = styled.span`
  background-color: var(--ant-color-info);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
`

export { ApiDocLayout, ApiSection, ApiEndpoint, ParameterList, Parameter, ParameterTable, ResponseContainer, AuthBadge }
export default ApiDocLayout 