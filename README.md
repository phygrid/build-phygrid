# Phygrid Developer Documentation 🚀

This is a Gatsby-based documentation website for **Project Name**. The site is organized using a folder-based structure, with support for MDX files that allow for React components, interactive elements, and custom styling. The documentation is organized into sections, and an expandable sidebar enables easy navigation through the nested folder structure.

[hacker](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGswZ2pvMGMxaTJsMzlmeG1waGs5cHMzZTRoOXJ3dWpyeGVoazdiNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YQitE4YNQNahy/giphy-downsized-large.gif)

## Table of Contents

- [Phygrid Developer Documentation 🚀](#phygrid-developer-documentation-)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [Features](#features)
  - [Setup Instructions](#setup-instructions)
  - [Usage](#usage)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

This project is designed to provide documentation in a clean, responsive format. The site leverages Gatsby’s powerful static site generation with MDX for creating interactive documentation pages that include code blocks, accordions, and other dynamic elements.

## Project Structure

The project follows a typical Gatsby directory structure with additional folders for documentation content. Key parts of the project include:

- **`src/content/docs/`**: Main documentation folder where MDX files are stored. These files are organized into folders to represent sections and subsections of the documentation.
- **`src/components/`**: Contains React components used across the site, such as `Sidebar`, `Accordion`, `Header`, and `Search`.
- **`gatsby-node.js`**: Gatsby’s server-side file, where we create custom slugs, define page generation, and customize the GraphQL schema for MDX fields.
- **`src/templates/`**: Contains template files for generating pages from MDX content. These templates define the layout and structure for each page.

## Features

- **MDX Support**: Allows embedding React components directly in markdown files.
- **Dynamic Sidebar**: Expands and collapses sections based on folder structure, with nested accordions for easy navigation.
- **Custom Slug Generation**: Creates slugs based on folder structure to support nested content.
- **Expandable Sections**: Uses `Accordion` components to create expandable sections within the sidebar.
- **Syntax Highlighting**: Code blocks in documentation use syntax highlighting for better readability.
- **Search**: Integrates search functionality (if implemented) to allow users to find content quickly.

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/project-name.git
   cd project-name
   ```

2. **Install Dependencies**:
   This project uses Yarn. Install dependencies by running:

   ```bash
   yarn install
   ```

3. **Start Development Server**:
   Run the development server:

   ```bash
   yarn develop
   ```

   Your site should now be running at `http://localhost:8000`.

4. **Build for Production**:
   To create a production build, use:

   ```bash
   yarn build
   ```

5. **Serve the Production Build**:
   To test the production build locally:
   ```bash
   yarn serve
   ```

## Usage

- **Adding New Documentation Pages**:

  - Add new `.mdx` files to `src/content/docs/`. Create folders to structure sections and subsections.
  - Each `.mdx` file can include YAML frontmatter, such as `title` and `order`, to control the display in the sidebar.

- **Configuring Sidebar Sections**:

  - The sidebar automatically organizes content based on the folder structure within `src/content/docs/`.
  - Folder names are used as section titles in the sidebar, and you can use nested folders to create subsections.

- **Customizing the Sidebar**:
  - The `Sidebar` component is set up with expandable `Accordion` components to handle nested folders. The sidebar automatically highlights the current section based on the URL.

## Folder Structure

Here’s a breakdown of the primary folders in the project:

```
.
├── src
│   ├── components       # Reusable React components (Sidebar, Accordion, Header, etc.)
│   ├── content
│   │   └── docs         # Main documentation content in MDX format
│   ├── templates        # Page templates for MDX content
│   ├── images           # Image assets for the site
│   └── styles           # Global styles and custom CSS
├── gatsby-config.js     # Gatsby configuration, plugins, and site metadata
├── gatsby-node.js       # Node API for custom page generation and slug creation
└── README.md            # Project documentation
```

## Contributing

If you’d like to contribute to this project, please create a pull request with your changes. Make sure to run the project locally and test your changes before submitting.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
