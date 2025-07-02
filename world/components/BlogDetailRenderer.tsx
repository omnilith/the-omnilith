import { BlogType } from "@core/core/data/entities";

function BlogDetailRenderer({ entities }: { entities: BlogType[] }) {
  const blog = entities[0];
  if (!blog) return <div>No blog found.</div>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h2>{blog.title}</h2>
      <p>
        <strong>Author:</strong> {blog.author}
      </p>
      <div>
        <strong>Content:</strong>
        <div>{blog.content}</div>
      </div>
      {/* Add more fields as needed */}
    </div>
  );
}

export default BlogDetailRenderer;
