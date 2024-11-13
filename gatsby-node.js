const path = require("path")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const fileNode = getNode(node.parent)
    if (fileNode && fileNode.relativePath) {
      const relativePath = fileNode.relativePath
      const slug = `/${relativePath.replace(/\.mdx?$/, "")}` // Remove .md/.mdx extension

      // Extract section (top-level folder) and title (filename without extension)
      const pathParts = relativePath.split("/")
      const section = pathParts.length > 1 ? pathParts[0] : null
      const title = pathParts[pathParts.length - 1].replace(/\.mdx?$/, "")

      // Add fields for slug, section, title, and pathParts (array of folder structure)
      createNodeField({ node, name: "slug", value: slug })
      createNodeField({ node, name: "section", value: section })
      createNodeField({ node, name: "title", value: title })
      createNodeField({
        node,
        name: "pathParts",
        value: pathParts.slice(0, -1),
      }) // Exclude filename
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Mdx implements Node {
      fields: MdxFields
    }
    type MdxFields {
      slug: String
      section: String
      title: String
      pathParts: [String]
    }
    type MdxFrontmatter {
      title: String
      order: Int
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
