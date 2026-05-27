# Navigation System Documentation

This document explains the architecture and configuration of the website's navigation system, which consists of two distinct components: the **Top Navigation Bar** and the **Sidebar/Breadcrumbs**.

## 1. Top Navigation Bar (Manual Configuration)

The top navigation bar acts as the global menu. It is **not** automatically generated from your content folders. You must manually define which items appear here.

### Configuration Location
*   **File:** `hugo.yaml`
*   **Section:** `menu.main`

### How to Add a New Item
To add a new link to the top menu, append a new entry to the `menu.main` list in `hugo.yaml`:

```yaml
menu:
  main:
    # Existing items...
    - name: New Section      # The text displayed in the menu
      pageRef: /new-section  # The path to the content (relative to content/ folder)
      weight: 50             # Controls the order (lower numbers appear first)
```

**Key Concept:** This gives you precise control over what appears globally, allowing you to have sections in your content that do *not* necessarily appear in the top header.

---

## 2. Sidebar Navigation & Breadcrumbs (Dynamic/Automatic)

The sidebar navigation (on the left) and the breadcrumb trail (top of content) are **dynamic**. They automatically reflect the folder structure of your `content/` directory, provided the section is configured correctly.

### How it Works
The Hextra theme uses a specific layout called `docs` to render the sidebar and breadcrumbs. To ensure a section uses this layout, we apply a **cascade** configuration in the section's `_index.md` file.

### Configuration Location
*   **File:** `content/<section-name>/_index.md` (e.g., `content/discourses/_index.md`)

### Enabling for a Section
To enable automatic sidebar and breadcrumbs for any section, ensure its `_index.md` front matter includes the following:

```yaml
---
title: Section Title
weight: 1
cascade:
  type: docs  # <--- This forces all child pages to use the documentation layout
---
```

### Implications
*   **Automatic Updates:** Once configured, any new Markdown file (`.md`) or folder you add to this section will **automatically** appear in the sidebar and breadcrumbs. You do not need to edit `hugo.yaml` for these internal pages.
*   **Ordering:** You can control the order of pages in the sidebar using the `weight` parameter in each page's front matter.

---

## Summary of Workflow

| Goal | Action Required |
| :--- | :--- |
| **Add a new Top-Level Section** | 1. Create content folder.<br>2. Add entry to `menu.main` in `hugo.yaml`. |
| **Add a page/folder *inside* an existing section** | 1. Just create the `.md` file or folder.<br>2. (Ensure `_index.md` has `cascade: type: docs`). |
| **Reorder Top Menu** | Change `weight` in `hugo.yaml`. |
| **Reorder Sidebar Items** | Change `weight` in the specific page's `.md` file. |
