/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

import { breakpoints } from "../styles/breakpoints"
import Header from "./header"
import Sidebar from "./sidebar"
import "./global.css"
import Search from "./search"

import logo from "../images/logo.svg"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [showSearch, setShowSearch] = useState(false)

  const toggleSearch = () => {
    setShowSearch(prev => !prev)
  }

  // Show maintenance message in production build
  if (process.env.NODE_ENV !== "development") {
    return (
      <Wrapper>
        <Logo src={logo} alt="Phygrid" />
        <h2>🛠️ We're Updating Our Developer Docs</h2>
        <p>
          Our documentation site is currently down for scheduled updates. We're
          making improvements and will be back very soon.
        </p>
      </Wrapper>
    )
  }

  // Show normal documentation site in production/other environments
  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        toggleSearch={toggleSearch}
      />
      <Container>
        <Sidebar />
        <Main>
          <Page>{children}</Page>
        </Main>
      </Container>
      <Footer>
        <p>
          © {new Date().getFullYear()} &middot; Phygrid. An{" "}
          <a href="https://ombori.com">Ombori</a> company
        </p>
      </Footer>
      {showSearch && <Search toggleSearch={toggleSearch} />}
    </>
  )
}

export default Layout

const Logo = styled.img`
  height: 40px;
  margin: 0;
`

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
  font-size: var(--font-sm);
  padding: var(--space-3);
  p {
    margin: 0;
  }
`

const Wrapper = styled.div`
  /* Remove after update */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
  width: 100svw;
  padding: 20px;

  h2,
  p {
    max-width: 640px;
    text-align: center;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
  }
`
const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--space-4) 0;
  border-radius: var(--border-radius);
`
const Main = styled.main`
  flex: 1 auto;
  /* background: var(--color-pageBg); */
`
