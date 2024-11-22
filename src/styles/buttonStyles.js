// styles/buttonStyles.js
import { css } from "@emotion/react"

export const navButtonStyles = css`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 12px;
  background: rgba(255, 255, 255, 0);
  font-weight: 600;
  border-radius: 4px;
  color: var(--color-title);
  text-decoration: none;
  line-height: 1;
  position: relative;

  &.active {
    color: var(--color-primary);
    &:after {
      content: "";
      width: 2px;
      border-radius: 2px;
      top: 4px;
      bottom: 4px;
      left: 4px;
      position: absolute;
      background: var(--color-primary);
    }
  }

  &:hover {
    background: var(--color-hover-bg);
    opacity: 1;
  }
`

export const primaryButtonStyles = css`
  all: unset;
  display: flex;
  flex: 0 none;
  /* padding: 10px 20px; */
  color: var(--color-black);
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  /* transition: all 0.3s ease; */
  font-size: var(--font-sm);
  /* line-height: 1; */
  font-weight: 700;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary);
    background: var(--color-hover-bg);
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
