// src/components/Accordion.js
import React, { useState } from "react"
import styled from "@emotion/styled"
import { CaretDown, CaretUp } from "@phosphor-icons/react"

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <AccordionContainer>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span>{isOpen ? <CaretUp size={12} /> : <CaretDown size={12} />}</span>
      </AccordionHeader>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </AccordionContainer>
  )
}

export default Accordion

const AccordionContainer = styled.div`
  display: block;
  width: 100%;
  padding: 0 0 var(--space-3) 0;
`

const AccordionHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 var(--space-2) var(--space-1) var(--space-2);
  color: rgba(255, 255, 255, 0.5);
  font-size: var(--font-sm);
  line-height: 1;

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    color: var(--color-title);
  }
`

const AccordionContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  display: block;
`
