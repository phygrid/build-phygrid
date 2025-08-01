import React from "react"
import { ThemeProvider } from "./src/context/themeContext"

// Import IBM Plex Mono font
import "@fontsource/ibm-plex-mono/400.css" // Regular
import "@fontsource/ibm-plex-mono/500.css" // Bold

import "prismjs/themes/prism.css"
import "./src/styles/prism-theme.css"

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>
}
