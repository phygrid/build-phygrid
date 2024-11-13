// src/components/Accordion.js
import React, { useState } from "react"
import styled from "@emotion/styled"

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <AccordionContainer>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span>{isOpen ? "-" : "+"}</span>
      </AccordionHeader>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </AccordionContainer>
  )
}

export default Accordion

const AccordionContainer = styled.div`
  display: block;
  width: 100%;
`

const AccordionHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
  font-weight: bold;
  padding: var(--space-2);
  color: var(--color-title);
  font-size: var(--font-xs);
  text-transform: uppercase;
  border-radius: var(--border-radius);

  &:hover {
    background: var(--color-hover-bg);
  }
`

const AccordionContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  display: block;
  padding: ${({ isOpen }) =>
    isOpen
      ? "var(--space-1) 0 var(--space-1) var(--space-2)"
      : "0 0 0 var(--space-2)"};
  /* border-left: ${({ isOpen }) =>
    isOpen ? "1px solid var(--color-primary)" : "0"}; */
`
