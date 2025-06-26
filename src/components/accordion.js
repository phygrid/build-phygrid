// src/components/Accordion.js
import React, { useState } from "react"
import styled from "@emotion/styled"
import { DownOutlined, UpOutlined } from "@ant-design/icons"

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <AccordionContainer>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span>
          {isOpen ? (
            <UpOutlined style={{ fontSize: 12 }} />
          ) : (
            <DownOutlined style={{ fontSize: 12 }} />
          )}
        </span>
      </AccordionHeader>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </AccordionContainer>
  )
}

export default Accordion

const AccordionContainer = styled.div`
  display: block;
  width: 100%;
  padding: 0 0 var(--ant-padding) 0;
`

const AccordionHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 var(--ant-padding-xs) var(--ant-padding-xxs) var(--ant-padding-xs);
  color: var(--ant-color-text-tertiary);
  font-size: var(--ant-font-size);
  line-height: 1;

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    color: var(--ant-color-text-heading);
  }
`

const AccordionContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  display: block;
`
