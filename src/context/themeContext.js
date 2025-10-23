import React from "react"
import { ConfigProvider, App, theme } from "antd"
import { Global, css } from "@emotion/react"

// Our shared theme configuration
const themeConfig = {
  algorithm: theme.darkAlgorithm,
  cssVar: { key: "phystack" },
  token: {
    colorPrimary: "#00b140", // PhyStack Matrix Green
    colorLink: "#00b140",
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeightStrong: 500,
  },
  components: {
    Card: {
      // This alone won't work because of the CSS override
      colorBorderSecondaryHover: ({ token }) => token.colorBorder,
    },
  },
}

// Theme wrapper component
export const ThemeProvider = ({ children }) => {
  return (
    <ConfigProvider theme={themeConfig}>
      {/* Add global style to override some ant d styles i dont like */}
      <Global
        styles={css`
          body {
            font-weight: 400;
          }
          .no-offset .ant-card-cover {
            margin: 0 !important;
          }
          .ant-card-hoverable:hover {
            border-color: var(--ant-color-border);
          }
          .shimmer {
            color: var(--ant-color-text-secondary);
            background: linear-gradient(
              -45deg,
              var(--ant-color-bg-layout) 20%,
              #fff 50%,
              var(--ant-color-bg-layout) 80%
            );
            background-size: 125px 100%;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shimmer 5s infinite;
            background-repeat: no-repeat;
            background-position: 0 0;
            background-color: var(--ant-color-bg-layout);
          }

          p {
            color: var(--ant-color-text-secondary);
          }

          strong {
            color: var(--ant-color-text);
            font-weight: 500;
          }

          @keyframes shimmer {
            0% {
              background-position: top left;
            }
            50% {
              background-position: top right;
            }
            100% {
              background: linear-gradient(
                45deg,
                var(--ant-color-bg-layout) 0%,
                var(--ant-color-bg-layout) 50%,
                var(--ant-color-bg-layout) 100%
              );
            }
          }
        `}
      />
      <App>{children}</App>
    </ConfigProvider>
  )
}

// Export the theme config separately if needed elsewhere
export { themeConfig }
