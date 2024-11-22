# Phygrid Developer Documentation 🚀

The site is organized using a folder-based structure, with support for MDX files.

![Alt Text](https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif?cid=790b7611tpq5m5otqerlnwslqo4w0768xq1sjcsy6ikewcse&ep=v1_gifs_search&rid=giphy.gif)

## Table of Contents

- [Phygrid Developer Documentation 🚀](#phygrid-developer-documentation-)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [Setup Instructions](#setup-instructions)
  - [Usage](#usage)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [Page structure](#page-structure)
- [h1 is reserved for the page title](#h1-is-reserved-for-the-page-title)
  - [h2 for a new section of the page](#h2-for-a-new-section-of-the-page)
    - [Template for documentation:](#template-for-documentation)
    - [Writing style guidelines](#writing-style-guidelines)
  - [License](#license)

## Overview

This project is designed to provide documentation in a clean, responsive format using Gatsby with MDX for creating interactive documentation pages.

## Project Structure

The project follows a typical Gatsby directory structure with additional folders for documentation content. Key parts of the project include:

- **`src/content/docs/`**: Main documentation folder where MDX files are stored. These files are organized into folders to represent sections and subsections of the documentation.
- **`src/components/`**: Contains React components used across the site, such as `Sidebar`, `Accordion`, `Header`, and `Search`.
- **`gatsby-node.js`**: Gatsby’s server-side file, where we create custom slugs, define page generation, and customize the GraphQL schema for MDX fields.
- **`src/templates/`**: Contains template files for generating pages from MDX content. These templates define the layout and structure for each page.

## Setup Instructions

1. **Install Dependencies**:
   This project uses Yarn. Install dependencies by running:

   ```bash
   yarn install
   ```

2. **Start Development Server**:
   Run the development server:

   ```bash
   yarn develop
   ```

   Your site should now be running at `http://localhost:8000`.

3. **Build for Production**:
   To create a production build, use:

   ```bash
   yarn build
   ```

4. **Serve the Production Build**:
   To test the production build locally:
   ```bash
   yarn serve
   ```

## Usage

- **Adding New Documentation Pages**:

  - Add new `.mdx` files to `src/content/docs/`. Create folders to structure sections and subsections.
  - Each `.mdx` file can include YAML frontmatter, such as `title` and `icon`, to control the display in the sidebar.

- **Configuring Sidebar Sections**:

  - The sidebar automatically organizes content based on the folder structure within `src/content/docs/`.
  - Folder names are used as section titles in the sidebar, and you can use nested folders to create subsections.

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

## Page structure

# h1 is reserved for the page title

## h2 for a new section of the page

Documentation for each solution should explain the solution, how to use it, and how to set it up, and it should be readable by first-time users. Documentation should provide context for how the different pieces - app installations, devices, settings - all fit together.

### Template for documentation:

- **Introduction and solution overview**
  **Features** (don’t go into every single function or available setting, rather features the clients would want to use, or commercial team would want to include as selling points)
  - Make sure the list of features is updated by periodically reviewing the different Jira boards for items tagged with solution labels
  - Provide a separate section that describes the upcoming features so that any items that are of interest for potential clients are visible
  - These items should be reflected and kept up to date in the Product Monday boards as well
- **How-to guides**
  - Explain how the solution works on the customer-facing end
  - Provide step by step guidelines for each important goal that the user is capable of achieving on the device (ie. for Endless Aisle: How to browse products, How to search for a product, How to add products to the bag, How to complete a purchase, etc)
  - Keep the instructions brief and readable
  - Provide an introduction to every step by step guide
  - Provide number-labeled screenshots for every step in the guide
  - Follow a unified screenshot taking structure based on Figma files and components
  - If possible, keep different guides as part of a single page. If not, break down the guides into separate sub-pages.
- **Console settings**
  - Break down the settings and group them based on different app screens / functionalities. Ideally, settings should be organized as such to begin with (Lift and Learn or Find Your Style are examples of well organized settings), but in case the Settings are scattered, focus on usage rather than existing structure (Endless Aisle is an example of poorly organized settings).
  - Provide number-labeled screenshots for every option in a particular settings section
  - Follow a unified screenshot taking structure based on Figma files and components
  - If possible, keep different Settings descriptions on a single page. If necessary, break down the Settings into different pages for different sections

### Writing style guidelines

- Use Bold for UI Labels: Make any button, tab, or section label bold (e.g., **New**, **Create Tag**).
- Bullet Points for Options: Use bullets to list options or settings users can select.
- Numbered Lists for Steps: Number steps for actions to guide users through processes in a linear, easy-to-follow manner.
- Example Sections: Use call-out boxes in purple
- Warning Sections: Use call-out boxes in yellow
- Information Sections: Use call-out boxes in blue

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
