export const Form = {
  id: "form-Form",
  type: "Form",
  fields: [
    {
      name: "fields",
      type: "Object[]",
      required: true,
    },
  ],
};

export const Blog = {
  id: "form-Blog",
  type: "Form",
  fields: [
    {
      name: "title",
      type: "Text",
      required: true,
    },
    {
      name: "content",
      type: "Text",
      required: true,
    },
    {
      name: "author",
      type: "Text",
      required: true,
    },
  ],
};

// TypeScript type based on the Blog schema above
export interface BlogType {
  id: string;
  type: "Blog";
  title: string;
  content: string;
  author: string;
  featuredImage?: string; // Optional field for thumbnail image
}

export const View = {
  id: "form-View",
  type: "Form",
  fields: [
    {
      name: "title",
      type: "Text",
      required: true,
    },
    {
      name: "description",
      type: "Text",
      required: true,
    },
    {
      name: "targetEntity",
      type: "Text",
      required: true,
    },
    {
      name: "fields",
      type: "Text[]",
      required: false,
    },
    {
      name: "rendererComponent",
      type: "Text",
      required: false,
    },
  ],
};

export const Blog1 = {
  id: "blog-Blog1",
  type: "Blog",
  title: "Blog 1",
  content: `
# The Future of Meaning

![Omnilith Symbol](https://images.stockcake.com/public/d/9/5/d95264c8-14d8-4b6a-b6c9-97fbe07822d7_large/dove-in-flight-stockcake.jpg)

The Omnilith is not a product. It's a system of becoming.

---

## Why It Exists

In a world saturated with noise, we needed a new signal—something recursive, semantic, and alive.

## Core Principles

- **Ontology first**: Meaning is structured.
- **Action is sacred**: Tasks are expressions of will.
- **Entropy is real**: We burn beautifully.

## Final Thought

> “The only way out is through the pattern.” — Unknown

[Learn more](https://www.omnilith.io)
`,
  author: "Author 1",
  featuredImage: "/images/Dove-Doves.png",
};

export const BlogsListView = {
  id: "view-BlogsListView",
  type: "View",
  title: "Blogs List",
  description: "A view to display a list of blogs.",
  targetEntity: "Blog",
  fields: ["title", "author"],
  rendererComponent: "BlogsListRenderer",
};

export const BlogDetailView = {
  id: "view-BlogDetailView",
  type: "View",
  title: "Blog Detail",
  description: "A view to display the details of a blog.",
  targetEntity: "Blog",
  fields: ["title", "author", "content"],
  rendererComponent: "BlogDetailRenderer",
};

export const entities = {
  Form: [Form, Blog, View],
  Blog: [Blog1],
  View: [BlogsListView, BlogDetailView],
};
