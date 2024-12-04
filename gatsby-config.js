module.exports = {
  siteMetadata: {
    title: `Phygrid Developers`,
    description: `Learn how to use the Phygrid platform with tips, tricks, and user guides`,
    author: `@rmalpass`,
    siteUrl: `https://build.phygrid.com`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/content/docs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              className: `header-anchor`,
              maxDepth: 3,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `section`, `content`],
        // How to resolve each field's value for a supported node type
        resolvers: {
          Mdx: {
            title: node => node.fields.title, // Use the custom 'title' field from gatsby-node
            section: node => node.fields.section, // Use the custom 'section' field from gatsby-node
            content: node => node.rawBody, // Use rawBody for full content indexing
            slug: node => node.fields.slug, // Use the custom 'slug' field from gatsby-node
          },
        },
        // Optional filter to limit indexed nodes
        filter: (node, getNode) => true, // Index all MDX nodes by default
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Phygrid User Guides`,
        short_name: `Docs`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-catch-links`,
  ],
}
