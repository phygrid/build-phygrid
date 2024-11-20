import * as React from "react"
import { useState } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { List } from "@phosphor-icons/react"

import logo from "../images/logo.svg"
import { breakpoints } from "../styles/breakpoints"

import {
  primaryButtonStyles,
  secondaryButtonStyles,
} from "../styles/buttonStyles"

const Header = ({ siteTitle }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const toggleMenu = () => {
    setOpenMenu(prev => !prev)
  }

  return (
    <Container>
      <Link to="/">
        <Logo src={logo} alt={siteTitle} />
      </Link>
      <Nav open={openMenu}>
        <ul>
          <NavItem>
            <Link to="https://build.phygrid.com">Build</Link>
          </NavItem>
          <NavItem>
            <Link to="/apis">APIs</Link>
          </NavItem>
          <NavItem>
            <Link to="https://learn.phygrid.com">Learn</Link>
          </NavItem>
          <li>
            <ButtonPrimary href="https://console.phygrid.com">
              Login
            </ButtonPrimary>
          </li>
          <li>
            <MenuButton onClick={toggleMenu}>
              <List />
            </MenuButton>
          </li>
        </ul>
      </Nav>
    </Container>
  )
}

export default Header

const ButtonPrimary = styled.a`
  ${primaryButtonStyles}

  font-size: var(--font-lg);
  padding: var(--space-1) var(--space-2);
`

const Nav = styled.nav`
  align-items: center;
  display: flex;

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
  display: none;
  @media (min-width: ${breakpoints.md}) {
    display: block;
  }

  a {
    color: var(--color-text);
    text-decoration: none;
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

const MenuButton = styled.button`
  ${secondaryButtonStyles}
  color: var(--color-text);
  @media (min-width: ${breakpoints.md}) {
    display: none !important;
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
`
