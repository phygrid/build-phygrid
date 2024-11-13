// styles/buttonStyles.js
import { css } from "@emotion/react"

export const primaryButtonStyles = css`
  all: unset;
  display: flex;
  flex: 0 none;
  padding: 10px 20px;
  color: var(--color-black);
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--font-sm);
  /* line-height: 1; */
  font-weight: 700;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary);
    background: var(--color-black);
  }
`

export const secondaryButtonStyles = css`
  ${primaryButtonStyles}
  color: var(--color-black);
  background-color: var(--color-hover-bg);

  &:hover {
    color: var(--color-black);
    background-color: rgba(0, 0, 0, 0.2);
  }
`
