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

export const Blog1 = {
  id: "blog-Blog1",
  type: "Blog",
  title: "Blog 1",
  content: "This is the content of Blog 1.",
  author: "Author 1",
};
