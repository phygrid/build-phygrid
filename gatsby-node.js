const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const fileNode = getNode(node.parent)
    if (fileNode && fileNode.relativePath) {
      const relativePath = fileNode.relativePath

      // Extract folder and file info
      const parts = relativePath.split(path.sep) // Split path into parts
      const isTopLevelFile = parts.length === 1 // Check if it's a top-level file
      const section = !isTopLevelFile
        ? parts[0].replace(/^\d+-/, "") // Remove prefix from folder
        : null // No section for top-level files
      const title = parts[parts.length - 1]
        .replace(/^\d+-/, "") // Remove prefix
        .replace(/\.mdx?$/, "") // Remove file extension

      // Sortable numeric prefix
      const prefixMatch = parts[parts.length - 1].match(/^(\d+)-/) // Match numeric prefix
      const order = prefixMatch ? parseInt(prefixMatch[1], 10) : 0

      // Build slug
      const rawSlug = isTopLevelFile
        ? `/${title}` // For top-level files, use just the title
        : `/${parts
            .map(part => part.replace(/^\d+-/, "").replace(/\.mdx?$/, ""))
            .join("/")}` // For others, use folder and file
      const slug = rawSlug.toLowerCase()

      // Check if navigation should skip this item (prefix `0-`)
      const skipNavigation = order === 0

      // Add fields to the node
      createNodeField({ node, name: "slug", value: slug })
      createNodeField({ node, name: "section", value: section })
      createNodeField({ node, name: "title", value: title })
      createNodeField({ node, name: "order", value: order })
      createNodeField({ node, name: "skipNavigation", value: skipNavigation }) // Add skipNavigation
      createNodeField({ node, name: "pathParts", value: parts }) // Add pathParts for sidebar logic
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Mdx implements Node {
      fields: MdxFields
      frontmatter: MdxFrontmatter
    }
    type MdxFields {
      slug: String
      section: String
      title: String
      order: Int
      skipNavigation: Boolean
      pathParts: [String]
    }
    type MdxFrontmatter {
      title: String
      category: String
      access: String
      icon: String
      images: [File] @fileByRelativePath
    }
  `)
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const templatePath = path.resolve("src/templates/docTemplate.js")

  const result = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    if (node.fields && node.fields.slug) {
      console.log("Creating page:", node.fields.slug)

      createPage({
        path: node.fields.slug,
        component: `${templatePath}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id: node.id,
        },
      })
    } else {
      console.warn(`Skipping node with id ${node.id} as it has no slug`)
    }
  })
}
