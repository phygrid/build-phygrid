import * as React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import logo from "../images/logo.svg"
import ButtonPrimary from "./buttons/buttonPrimary"

const Header = ({ siteTitle }) => (
  <Container>
    <Link to="/">
      <Logo src={logo} alt={siteTitle} />
    </Link>
    <Nav>
      <ul>
        <NavItem>
          <Link to="/docs">Docs</Link>
        </NavItem>
        <NavItem>
          <Link to="/apis">APIs</Link>
        </NavItem>
        <NavItem>
          <Link to="/user-guide">User Guides</Link>
        </NavItem>
        <li>
          <ButtonPrimary title="Login" url="https://console.phygrid.com" />
        </li>
      </ul>
    </Nav>
  </Container>
)

export default Header

const Nav = styled.nav`
  display: flex;
  align-items: center;
  ul {
    display: flex;
    list-style: none;
    align-items: center;
    margin: 0;
    padding: 0;
    gap: var(--space-2);
  }
  li {
    margin: 0;
  }
`

const NavItem = styled.li`
  a {
    color: var(--color-text);
    text-decoration: none;
    display: block;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--border-radius);

    & .active {
      color: var(--color-title);
    }

    &:hover {
      color: var(--color-title);
      background: var(--color-hover-bg);
    }
  }
`
const Logo = styled.img`
  height: 40px;
  margin: 0;
`
const Container = styled.header`
  margin: 0 auto;
  padding: var(--space-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
  a {
    align-self: center;
    display: flex;
  }
`
