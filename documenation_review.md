You're assisting with writing documentation for the **Phygrid Console**. Our goal is to produce **structured, high-quality, and consistent documentation**, aligned with the four-quadrant model outlined in `.cursor/rules`.

### 🗂️ Document Classification

Every file must belong to **one—and only one—of the following categories**:

- **Tutorials**: Step-by-step beginner guides that enable users to _learn by doing_ and achieve a small but meaningful outcome.
- **How-To Guides**: Goal-oriented solutions to real-world problems for users who already have basic familiarity with the system.
- **Reference**: Technical descriptions of APIs, functions, components, or system behavior. These must be _descriptive only_, not instructional.
- **Explanation**: Contextual, discursive pieces that _illuminate a concept_, describe rationale or alternatives, or explain background systems.

❗️Do not blend multiple categories into a single file. Each type serves a distinct purpose and has its own tone, structure, and information requirements.

### 📋 Metadata Requirements (Frontmatter)

Each document should include:

- `category`: one of the four above
- `access`: any access restrictions (e.g., internal-only, requires login, admin-level)

### ✍️ Writing Style Guidelines

- **Use Bold for UI Labels**: Buttons, tabs, or fields should be wrapped in `**` (e.g., **New**, **Create Tag**)
- **Bullet Points for Options**: Use when listing available options or choices
- **Numbered Lists for Steps**: For sequential instructions, especially in Tutorials or How-To Guides
- **Don't End Bullet Points or Lists with Stops**: Makes the instructions feel more brief
- **Use Sentence Case for Page and Section Titles**: Only capitalize app names or navigation sections
- **Use Present Continous for Short Lists**: If the list has only a couple of steps, don't start with "Steps to..."

### 📌 Layout and Formatting Conventions

- **Use `<PhyCard>` wrappers** for all `##`-level sections:

  ```md
  <PhyCard title={<h2>Section Title</h2>} style={{ marginBottom: "var(--ant-margin-md)" }}>
  [content here]
  </PhyCard>
  ```

- Keep sentence structure **short, direct, and in active voice**.

- Match **visual formatting** (spacing, bullets, headings) across all documents.

- **Avoid explanation in tutorials or how-to guides**—link to explanation docs if needed.

### ✅ AI Output Checklist

Before finalizing content, make sure:

- The document only contains content aligned with its category.
- Explanations or context are separated into dedicated documents if needed.
- No “floating” or inconsistent headers.
- Actions always produce observable, verifiable results (especially in tutorials).
- Tutorial steps are robust, repeatable, and beginner-proof.
- Reference docs are minimal, factual, and avoid examples unless strictly illustrative.
