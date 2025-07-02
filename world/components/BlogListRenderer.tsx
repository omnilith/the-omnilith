import { BlogType } from "@core/core/data/entities";

function BlogListRenderer({ entities }: { entities: BlogType[] }) {
  return (
    <div>
      {entities.map((blog) => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>Author: {blog.author}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogListRenderer;
