module.exports = {
  siteMetadata: {
    title: `Phygrid Developers`,
    description: `Learn how to use the Phygrid platform with tips, tricks, and user guides`,
    author: `@rmalpass`,
    siteUrl: `https://phygrid.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts the following options, all of which are defined by `@emotion/babel-plugin` plugin.
        // The values for each key in this example are the defaults the plugin uses.
        sourceMap: true,
        autoLabel: "dev-only",
        labelFormat: `[local]`,
        cssPropOptimization: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/content/docs`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Enable line highlighting, inline diff highlighting, etc.
            },
          },
        ],
      },
    },
    // SET THIS UP LATER
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `YOUR_GOOGLE_ANALYTICS_TRACKING_ID`,
    //   },
    // },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`, // For SEO tags
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Phygrid User Guides`,
        short_name: `Docs`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        // Algolia Search configuration
      },
    },
    `gatsby-plugin-catch-links`, // Automatically catch all internal links and use Gatsby's Link
  ],
}
