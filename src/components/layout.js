/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

import { breakpoints } from "../styles/breakpoints"
import Header from "./header"
import Sidebar from "./sidebar"
import "./global.css"

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

  return (
    <Wrapper>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Container>
        <Sidebar />
        <Main>
          <Page>{children}</Page>
        </Main>
      </Container>
      <Footer>
        © {new Date().getFullYear()} &middot; Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </Footer>
    </Wrapper>
  )
}

export default Layout

const Footer = styled.footer`
  width: 100%;
  display: flex;
  border-top: 1px solid var(--color-border);
  font-size: var(--font-sm);
  padding: var(--space-3);
`

const Wrapper = styled.div``

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
  max-width: var(--size-content);
  padding: var(--space-4);
  margin: var(--space-4) auto;
  border-radius: var(--border-radius);
`
const Main = styled.main`
  flex: 1 auto;
  background: var(--color-pageBg);
`
