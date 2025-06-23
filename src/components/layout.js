/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Layout, Drawer } from "antd"
import styled from "@emotion/styled"

import Header from "./header"
import Sidebar from "./sidebar"
import "./global.css"

const { Sider, Content, Footer } = Layout

const AppLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [drawerVisible, setDrawerVisible] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // Handle responsive behavior
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Close drawer when switching to desktop
      if (!mobile) {
        setDrawerVisible(false)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setDrawerVisible(!drawerVisible)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  const closeMobileDrawer = () => {
    setDrawerVisible(false)
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />
      <Layout>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Sider
            collapsed={sidebarCollapsed}
            onCollapse={setSidebarCollapsed}
            breakpoint="md"
            collapsedWidth={0}
            width={280}
            style={{
              background: "var(--ant-layout-color-bg-body)",
              borderRight: "1px solid var(--ant-color-border-secondary)",
            }}
          >
            <Sidebar />
          </Sider>
        )}

        {/* Mobile Drawer */}
        <Drawer
          title="Navigation"
          placement="left"
          onClose={closeMobileDrawer}
          open={drawerVisible}
          width={280}
          style={{
            display: isMobile ? "block" : "none",
          }}
          styles={{
            body: {
              padding: 0,
              background: "#000",
            },
          }}
        >
          <Sidebar onNavigate={closeMobileDrawer} />
        </Drawer>

        <StyledContent>
          <ContentWrapper>{children}</ContentWrapper>
        </StyledContent>
      </Layout>
      <StyledFooter>
        <p>
          © {new Date().getFullYear()} &middot; Phygrid. An{" "}
          <a href="https://ombori.com">Ombori</a> company
        </p>
      </StyledFooter>
    </Layout>
  )
}

export default AppLayout

const StyledContent = styled(Content)`
  background: transparent;
  /* max-width: 1400px; */
  margin: 0 auto;
`

const ContentWrapper = styled.div`
  margin: var(--ant-margin-lg) 0;
  border-radius: var(--ant-border-radius);
`

const StyledFooter = styled(Footer)`
  border-top: 1px solid var(--ant-color-border-secondary);
  font-size: var(--ant-font-size);
  background: transparent;

  p {
    margin: 0;
  }
`
