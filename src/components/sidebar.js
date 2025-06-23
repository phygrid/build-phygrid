import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { Menu } from "antd"
import { useLocation } from "@reach/router"
import { css } from "@emotion/react"
import * as Icons from "@ant-design/icons"

// Helper function to get saved open keys
const getSavedOpenKeys = () => {
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem("sidebar-open-keys")
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return []
      }
    }
  }
  return []
}

const Sidebar = ({ onNavigate }) => {
  const location = useLocation()
  // Initialize with saved state to prevent flash
  const [openKeys, setOpenKeys] = useState(getSavedOpenKeys())

  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: [fields___order], order: ASC }) {
        nodes {
          fields {
            slug
            order
            pathParts
            skipNavigation
          }
          frontmatter {
            title
            icon
          }
        }
      }
    }
  `)

  const buildNestedStructure = nodes => {
    const root = {
      topLevel: [], // To store top-level files
      folders: {}, // To store nested folder structure
    }

    // Helper function to create nested folder structure
    const createNestedPath = (pathParts, node) => {
      const { slug, order, skipNavigation } = node.fields
      const { title = "Untitled", icon } = node.frontmatter

      // Skip navigation items marked as `skipNavigation`
      if (skipNavigation) return

      // If it's a top-level file
      if (pathParts.length === 1) {
        root.topLevel.push({ slug, title, icon, order, type: "file" })
        return
      }

      // Navigate through the folder structure and create nested folders
      let currentLevel = root.folders

      // Process all path parts except the last one (which is the file)
      for (let i = 0; i < pathParts.length - 1; i++) {
        const pathPart = pathParts[i]

        const folderOrderMatch = pathPart.match(/^(\d+)-/)
        const folderOrder = folderOrderMatch
          ? parseInt(folderOrderMatch[1], 10)
          : 0
        const folderTitle = pathPart.replace(/^\d+-/, "").replace(/-/g, " ")

        // Use just the current path part as the key at this level
        const folderKey = pathPart

        // Create folder if it doesn't exist at current level
        if (!currentLevel[folderKey]) {
          currentLevel[folderKey] = {
            title: folderTitle,
            order: folderOrder,
            children: [],
            subfolders: {},
            type: "folder",
          }
        }

        // For the last folder in the path, add the file
        if (i === pathParts.length - 2) {
          currentLevel[folderKey].children.push({
            slug,
            title,
            icon,
            order,
            type: "file",
          })
        }

        // Move to the subfolders of this folder for next iteration
        currentLevel = currentLevel[folderKey].subfolders
      }
    }

    // Process all nodes
    nodes.forEach(node => {
      createNestedPath(node.fields.pathParts, node)
    })

    // Sort everything recursively
    const sortRecursively = structure => {
      // Sort top-level files
      if (structure.topLevel) {
        structure.topLevel.sort((a, b) => a.order - b.order)
      }

      // Sort folders and their contents
      if (structure.folders) {
        Object.values(structure.folders).forEach(folder => {
          folder.children.sort((a, b) => a.order - b.order)
          if (Object.keys(folder.subfolders).length > 0) {
            sortRecursively({ folders: folder.subfolders })
          }
        })
      }
    }

    sortRecursively(root)
    return root
  }

  const nestedSections = buildNestedStructure(data.allMdx.nodes)

  // Helper function to get all pages from nested structure
  const getAllPages = (structure = nestedSections) => {
    let pages = [...structure.topLevel]

    const traverseFolders = folders => {
      Object.values(folders).forEach(folder => {
        pages = pages.concat(folder.children)
        if (Object.keys(folder.subfolders).length > 0) {
          traverseFolders(folder.subfolders)
        }
      })
    }

    traverseFolders(structure.folders)
    return pages
  }

  // Helper function to find required open keys for current page
  const getRequiredOpenKeys = () => {
    const requiredKeys = []
    const allPages = getAllPages()

    const currentPage = allPages.find(page =>
      location.pathname.includes(page.slug)
    )

    if (currentPage) {
      // Find all folder paths that contain this page
      const findFolderPaths = (folders, targetSlug, currentPath = []) => {
        Object.entries(folders).forEach(([folderKey, folder]) => {
          const newPath = [...currentPath, folderKey]

          // Check if this folder contains the target page
          if (folder.children.some(child => child.slug === targetSlug)) {
            requiredKeys.push(...newPath)
          }

          // Recursively check subfolders
          if (Object.keys(folder.subfolders).length > 0) {
            findFolderPaths(folder.subfolders, targetSlug, newPath)
          }
        })
      }

      findFolderPaths(nestedSections.folders, currentPage.slug)
    }

    return [...new Set(requiredKeys)]
  }

  // Ensure current page's section is open when location changes
  useEffect(() => {
    const requiredKeys = getRequiredOpenKeys()
    if (requiredKeys.length > 0) {
      setOpenKeys(prevKeys => {
        const newKeys = [...new Set([...prevKeys, ...requiredKeys])]
        if (typeof window !== "undefined") {
          sessionStorage.setItem("sidebar-open-keys", JSON.stringify(newKeys))
        }
        return newKeys
      })
    }
  }, [location.pathname])

  // Get currently selected keys based on location
  const getCurrentKey = () => {
    if (location.pathname === "/") return ["welcome"]

    const allPages = getAllPages()

    // Normalize pathname for comparison (decode URL and remove trailing slash)
    const normalizedPathname = decodeURIComponent(location.pathname).replace(
      /\/$/,
      ""
    )

    // Debug logging
    console.log("Original pathname:", location.pathname)
    console.log("Normalized pathname:", normalizedPathname)
    console.log(
      "All pages:",
      allPages.map(p => ({ title: p.title, slug: p.slug }))
    )

    const currentPage = allPages.find(page => {
      // Normalize the slug for comparison (remove trailing slash if present)
      const normalizedSlug = page.slug.replace(/\/$/, "")
      return normalizedPathname === normalizedSlug
    })

    console.log("Found current page:", currentPage)

    return currentPage ? [currentPage.slug] : []
  }

  // Handle menu open/close
  const handleOpenChange = keys => {
    setOpenKeys(keys)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sidebar-open-keys", JSON.stringify(keys))
    }
  }

  // Build menu items recursively
  const buildMenuItems = (
    folders = nestedSections.folders,
    includeTopLevel = true
  ) => {
    const items = []

    // Add top-level files (only at root level)
    if (includeTopLevel) {
      nestedSections.topLevel.forEach(file => {
        const IconComponent = file.icon ? Icons[file.icon] : null
        items.push({
          key: file.slug,
          label: (
            <Link to={file.slug} onClick={onNavigate}>
              {IconComponent && <IconComponent style={{ marginRight: 8 }} />}
              {file.title}
            </Link>
          ),
          order: file.order,
          type: "file",
        })
      })
    }

    // Add folders
    Object.entries(folders).forEach(([folderKey, folder]) => {
      const children = []

      // Add files in this folder
      folder.children.forEach(child => {
        const IconComponent = child.icon ? Icons[child.icon] : null
        children.push({
          key: child.slug,
          label: (
            <Link to={child.slug} onClick={onNavigate}>
              {IconComponent && <IconComponent style={{ marginRight: 8 }} />}
              {child.title}
            </Link>
          ),
        })
      })

      // Add subfolders recursively
      if (Object.keys(folder.subfolders).length > 0) {
        const subfolderItems = buildMenuItems(folder.subfolders, false)
        children.push(...subfolderItems)
      }

      items.push({
        key: folderKey,
        label: folder.title,
        children: children.length > 0 ? children : undefined,
        order: folder.order,
        type: "folder",
      })
    })

    // Sort all items by order
    items.sort((a, b) => a.order - b.order)

    // Remove the temporary properties and return clean items
    return items.map(item => {
      const { order, type, ...cleanItem } = item
      return cleanItem
    })
  }

  return (
    <div
      style={{
        padding: "var(--ant-padding-xs)",
        height: "calc(100vh - 64px)", // Account for header
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Menu
        mode="inline"
        inlineIndent={4}
        selectedKeys={getCurrentKey()}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        items={buildMenuItems()}
        style={{
          border: "none",
          background: "#000",
          width: "100%",
        }}
        css={css`
          // This makes sidebar labels wrap to the next line
          .ant-menu-item,
          .ant-menu-submenu-title {
            white-space: normal !important;
            height: auto !important;
            line-height: 1.4 !important;
            padding-top: 8px !important;
            padding-bottom: 8px !important;
            /* Don't override horizontal padding - let inlineIndent work */

            .ant-menu-title-content {
              white-space: normal !important;
              overflow: visible !important;
              text-overflow: unset !important;
            }

            a {
              white-space: normal !important;
              overflow: visible !important;
              text-overflow: unset !important;
              word-wrap: break-word !important;
            }
          }
        `}
      />
    </div>
  )
}

export default Sidebar
