import { BlogType } from "@core/core/data/entities";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./BlogDetailRenderer.module.css";

function BlogDetailRenderer({ entities }: { entities: BlogType[] }) {
  const blog = entities[0];
  if (!blog) return <div className={styles.noBlog}>No blog found.</div>;

  return (
    <article className={styles.blogDetail}>
      {blog.featuredImage && (
        <Image
          src={blog.featuredImage}
          alt={blog.title}
          width={400}
          height={250}
          className={styles.featuredImage}
        />
      )}

      <h1 className={styles.title}>{blog.title}</h1>

      <p className={styles.author}>
        <strong>Author:</strong> {blog.author}
      </p>

      <div className={styles.contentContainer}>
        <div className={styles.markdownContent}>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

export default BlogDetailRenderer;
