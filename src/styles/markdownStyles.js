import { css } from "@emotion/react"

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
  
  img {
    max-width: 800px;
    width: 100%;
    height: auto;
    margin: 1rem 0;
  }
  code {
    font-size: var(--font-xs) !important;
  }

  table {
    border: 1px solid var(--color-border);
    border-collapse: collapse;
    th,
    td {
      padding: var(--space-2);
    }
    thead {
      th {
        font-weight: normal;
        text-align: left;
        color: var(--color-title);
        border-bottom: 1px solid var(--color-border);
      }
    }
    tbody {
      td {
        border-bottom: 1px solid var(--color-border);
      }
    }
  }
  .gatsby-highlight pre {
    margin: 0;
  }
  /* .header-anchor.before {
    &:after {
      content: "#";
    }
  } */

  .text-red {
    color: #dc2626;
  }
`
