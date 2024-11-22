import { css } from "@emotion/react"
import { breakpoints } from "./breakpoints"

export const markdownStyles = css`
  h3,
  h4,
  h5 {
    opacity: 0.8;
  }
  .gatsby-resp-image-wrapper {
    margin: 1rem 0;
    img {
      border-radius: var(--border-radius);
    }
  }
  code {
    font-size: var(--font-xs) !important;
  }
`
