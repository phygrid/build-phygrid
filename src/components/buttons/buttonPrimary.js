import React from "react"
import styled from "@emotion/styled"

const StyledButton = styled.a`
  display: flex;
  flex: 0 none;
  padding: 5px 10px;
  color: var(--color-black);
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--font-sm);
  line-height: 1;
  font-weight: 500;
  text-transform: uppercase;

  &:hover {
    color: var(--color-black);
    background-color: rgba(255, 255, 255, 1);
  }
`

const ButtonPrimary = ({ href, title }) => {
  return (
    <StyledButton href={href} title={title}>
      {title}
    </StyledButton>
  )
}

export default ButtonPrimary
