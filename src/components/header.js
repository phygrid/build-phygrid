import * as React from "react"
import { Link } from "gatsby"
import { Layout, Button, Space, Flex } from "antd"
import { MenuOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"

import logo from "../images/logo.svg"

const { Header: AntHeader } = Layout

const Header = ({ siteTitle, onToggleSidebar, sidebarCollapsed }) => {
  return (
    <AntHeader
      style={{
        background: "var(--ant-layout-color-bg-body)",
        borderBottom: "1px solid var(--ant-color-border-secondary)",
        padding: "0 var(--ant-padding-lg)",
        height: "auto",
        lineHeight: "normal",
      }}
    >
      <Flex justify="space-between" align="center" style={{ height: "64px" }}>
        <Link to="/">
          <Logo src={logo} alt={siteTitle} />
        </Link>

        {/* <Space>
          <NavLink href="/">Console</NavLink>
          <NavLink href="https://learn.phygrid.com">Solutions</NavLink>
        </Space> */}

        <Space size="small">
          {/* <NavLink href="https://build.phygrid.com">Build</NavLink>
          <NavLink href="https://learn.phygrid.com">Learn</NavLink> */}
          <Button href="https://console.phygrid.com">Login</Button>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onToggleSidebar}
            style={{
              color: "var(--ant-color-text)",
            }}
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          />
        </Space>
      </Flex>
    </AntHeader>
  )
}

export default Header

const Logo = styled.img`
  height: var(--ant-font-size);
  margin: 0;
`

const NavLink = styled.a`
  color: var(--ant-color-text);
  text-decoration: none;
  padding: var(--ant-padding-xxs) var(--ant-padding-xs);
  border-radius: var(--ant-border-radius);
  display: none;

  &:hover {
    color: var(--ant-color-text-heading);
    background: var(--ant-color-bg-text-hover);
  }

  @media (min-width: 768px) {
    display: inline-block;
  }
`
