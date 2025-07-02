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
  content: "This is the content of Blog 1.",
  author: "Author 1",
  featuredImage: "https://example.com/blog1-thumbnail.jpg",
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
