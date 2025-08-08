import { css } from "@emotion/react"

export const markdownStyles = css`
  /* CSS Variables */
  --base-size-4: 0.25rem;
  --base-size-8: 0.5rem;
  --base-size-16: 1rem;
  --base-size-24: 1.5rem;
  --base-size-40: 2.5rem;
  --base-text-weight-normal: 400;
  --base-text-weight-medium: 500;
  --base-text-weight-semibold: 600;
  --fontStack-monospace: var(--ant-font-family-code);

  /* Map GitHub variables to Ant Design variables */
  --fgColor-default: var(--ant-color-text-secondary);
  --fgColor-muted: var(--ant-color-text-secondary);
  --fgColor-accent: var(--ant-color-primary);
  --fgColor-success: var(--ant-color-success);
  --fgColor-attention: var(--ant-color-warning);
  --fgColor-danger: var(--ant-color-error);
  --fgColor-done: var(--ant-purple-6);
  --bgColor-default: var(--ant-color-bg-layout);
  --bgColor-muted: var(--ant-color-bg-container);
  --bgColor-neutral-muted: var(--ant-color-fill);
  --bgColor-attention-muted: var(--ant-color-warning-bg);
  --borderColor-default: var(--ant-color-border);
  --borderColor-muted: var(--ant-color-border-secondary);
  --borderColor-neutral-muted: var(--ant-color-border-secondary);
  --borderColor-accent-emphasis: var(--ant-color-primary);
  --borderColor-success-emphasis: var(--ant-color-success);
  --borderColor-attention-emphasis: var(--ant-color-warning);
  --borderColor-danger-emphasis: var(--ant-color-error);
  --borderColor-done-emphasis: var(--ant-purple-6);
  --focus-outlineColor: var(--ant-color-primary);

  /* Base styles */
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  color: var(--fgColor-default);
  background-color: var(--bgColor-default);
  font-family: var(--ant-font-family);
  font-size: var(--ant-font-size);
  line-height: var(--ant-line-height);
  word-wrap: break-word;

  h1:hover .anchor .octicon-link:before,
  h2:hover .anchor .octicon-link:before,
  h3:hover .anchor .octicon-link:before,
  h4:hover .anchor .octicon-link:before,
  h5:hover .anchor .octicon-link:before,
  h6:hover .anchor .octicon-link:before {
    width: 16px;
    height: 16px;
    content: " ";
    display: inline-block;
    background-color: currentColor;
  }

  details,
  figcaption,
  figure {
    display: block;
  }

  summary {
    display: list-item;
  }

  [hidden] {
    display: none !important;
  }

  a {
    background-color: transparent;
    color: var(--fgColor-accent);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  abbr[title] {
    border-bottom: none;
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }

  dfn {
    font-style: italic;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--ant-color-text);
    font-weight: var(--ant-font-weight-strong);
  }

  h2 {
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid var(--borderColor-muted);
  }

  h3 {
    font-size: 1.25em;
    margin-bottom: 0.5em;
  }

  h4 {
    font-size: 1em;
  }

  h5 {
    font-size: 1em;
  }

  h6 {
    font-size: 0.85em;
    color: var(--fgColor-muted);
  }

  mark {
    background-color: var(--bgColor-attention-muted);
    color: var(--fgColor-default);
  }

  small {
    font-size: 90%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
    max-width: 100%;
    box-sizing: content-box;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: var(--fontStack-monospace);
    font-size: var(--ant-font-size-sm);
  }

  figure {
    margin: 1em var(--base-size-40);
  }

  hr {
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border-bottom: 1px solid var(--borderColor-muted);
    height: 0.25em;
    padding: 0;
    margin: var(--base-size-24) 0;
    background-color: var(--borderColor-default);
    border: 0;
  }

  hr::before {
    display: table;
    content: "";
  }

  hr::after {
    display: table;
    clear: both;
    content: "";
  }

  input {
    font: inherit;
    margin: 0;
    overflow: visible;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  kbd {
    display: inline-block;
    padding: var(--base-size-4);
    font: 11px var(--fontStack-monospace);
    line-height: 10px;
    color: var(--fgColor-default);
    vertical-align: middle;
    background-color: var(--bgColor-muted);
    border: solid 1px var(--borderColor-neutral-muted);
    border-bottom-color: var(--borderColor-neutral-muted);
    border-radius: var(--ant-border-radius);
    box-shadow: inset 0 -1px 0 var(--borderColor-neutral-muted);
  }

  p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  blockquote {
    margin: 0;
    padding: 0 1em;
    color: var(--fgColor-muted);
    border-left: 0.25em solid var(--borderColor-default);
  }

  ul,
  ol {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 2em;
  }

  ol ol,
  ul ol {
    list-style-type: lower-roman;
  }

  ul ul ol,
  ul ol ol,
  ol ul ol,
  ol ol ol {
    list-style-type: lower-alpha;
  }

  dd {
    margin-left: 0;
  }

  tt,
  code,
  samp {
    font-family: var(--fontStack-monospace);
    font-size: var(--ant-font-size-sm);
  }

  pre {
    margin-top: 0;
    margin-bottom: 0;
    font-family: var(--fontStack-monospace);
    font-size: var(--ant-font-size-sm);
    word-wrap: normal;
  }

  ::before {
    display: table;
    content: "";
  }

  ::after {
    display: table;
    clear: both;
    content: "";
  }

  > *:first-child {
    margin-top: 0 !important;
  }

  > *:last-child {
    margin-bottom: 0 !important;
  }

  a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  .absent {
    color: var(--fgColor-danger);
  }

  .anchor {
    float: left;
    padding-right: var(--base-size-4);
    margin-left: -20px;
    line-height: 1;
  }

  .anchor:focus {
    outline: none;
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre,
  details {
    margin-top: 0;
    margin-bottom: var(--base-size-16);
  }

  blockquote > :first-child {
    margin-top: 0;
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  a:focus,
  [role="button"]:focus,
  input[type="radio"]:focus,
  input[type="checkbox"]:focus {
    outline: 2px solid var(--focus-outlineColor);
    outline-offset: -2px;
    box-shadow: none;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
    max-width: 100%;
    overflow: auto;
    border-radius: var(--ant-border-radius);
  }

  table th,
  table td {
    padding: var(--ant-padding-xs) var(--ant-padding-sm);
    border: 1px solid var(--ant-color-border-secondary);
    background-color: var(--ant-color-bg-container);
  }

  table th {
    font-weight: normal;
    text-align: left;
    color: var(--ant-color-text);
    background: var(--ant-color-fill-secondary);
  }

  table.center td {
    text-align: center;
  }

  table td > :last-child {
    margin-bottom: 0;
  }

  code,
  tt {
    padding: 0.2em 0.4em;
    font-size: 85%;
    white-space: break-spaces;
    background-color: var(--bgColor-neutral-muted);
    border-radius: var(--ant-border-radius);
  }

  code br,
  tt br {
    display: none;
  }

  del code {
    text-decoration: inherit;
  }

  samp {
    font-size: 85%;
  }

  pre code {
    font-size: 100%;
  }

  pre > code {
    padding: 0;
    margin: 0;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .highlight {
    margin-bottom: var(--base-size-16);
  }

  .highlight pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .highlight pre,
  pre {
    padding: var(--base-size-16);
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    color: var(--fgColor-default);
    background-color: var(--bgColor-muted);
    border-radius: var(--ant-border-radius);
    margin: 0;
    width: 100%;
    overflow-x: auto;
  }

  pre code,
  pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  ul.no-list,
  ol.no-list {
    padding: 0;
    list-style-type: none;
  }

  ul ul,
  ul ol,
  ol ol,
  ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  li > p {
    margin-top: var(--base-size-16);
  }

  li + li {
    margin-top: 0.25em;
  }

  dl {
    padding: 0;
  }

  dl dt {
    padding: 0;
    margin-top: var(--base-size-16);
    font-size: 1em;
    font-style: italic;
    font-weight: var(--base-text-weight-semibold, 600);
  }

  dl dd {
    padding: 0 var(--base-size-16);
    margin-bottom: var(--base-size-16);
  }

  /* Image styling */
  .gatsby-resp-image-wrapper {
    margin: 1rem 0;
    img {
      border-radius: var(--ant-border-radius);
    }
  }

  .text-red {
    color: #dc2626;
  }

  /* Task lists */
  .task-list-item {
    list-style-type: none;
  }

  .task-list-item label {
    font-weight: var(--base-text-weight-normal, 400);
  }

  .task-list-item.enabled label {
    cursor: pointer;
  }

  .task-list-item + .task-list-item {
    margin-top: var(--base-size-4);
  }

  .task-list-item-checkbox {
    margin: 0 0.2em 0.25em -1.4em;
    vertical-align: middle;
  }

  /* Alerts/Callouts */
  .markdown-alert {
    padding: var(--base-size-8) var(--base-size-16);
    margin-bottom: var(--base-size-16);
    color: inherit;
    border-left: 0.25em solid var(--borderColor-default);
  }

  .markdown-alert > :first-child {
    margin-top: 0;
  }

  .markdown-alert > :last-child {
    margin-bottom: 0;
  }

  .markdown-alert .markdown-alert-title {
    display: flex;
    font-weight: var(--base-text-weight-medium, 500);
    align-items: center;
    line-height: 1;
  }

  .markdown-alert.markdown-alert-note {
    border-left-color: var(--borderColor-accent-emphasis);
  }

  .markdown-alert.markdown-alert-note .markdown-alert-title {
    color: var(--fgColor-accent);
  }

  .markdown-alert.markdown-alert-important {
    border-left-color: var(--borderColor-done-emphasis);
  }

  .markdown-body
    .markdown-alert.markdown-alert-important
    .markdown-alert-title {
    color: var(--fgColor-done);
  }

  .markdown-alert.markdown-alert-warning {
    border-left-color: var(--borderColor-attention-emphasis);
  }

  .markdown-alert.markdown-alert-warning .markdown-alert-title {
    color: var(--fgColor-attention);
  }

  .markdown-alert.markdown-alert-tip {
    border-left-color: var(--borderColor-success-emphasis);
  }

  .markdown-alert.markdown-alert-tip .markdown-alert-title {
    color: var(--fgColor-success);
  }

  .markdown-alert.markdown-alert-caution {
    border-left-color: var(--borderColor-danger-emphasis);
  }

  .markdown-alert.markdown-alert-caution .markdown-alert-title {
    color: var(--fgColor-danger);
  }

  /* Code syntax highlighting - using simple Ant Design colors */
  code[class*="language-"],
  pre[class*="language-"] {
    white-space: break-spaces;
  }

  .gatsby-highlight pre {
    width: 100%;
    overflow-x: auto;
    background: var(--ant-color-bg-container);
    border-radius: var(--ant-border-radius-lg);
    border: 1px solid var(--ant-color-border-secondary);
  }
`
