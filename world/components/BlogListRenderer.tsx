import { BlogType } from "@core/core/data/entities";
import Link from "next/link";
import Image from "next/image";
import styles from "./BlogListRenderer.module.css";

function BlogListRenderer({ entities }: { entities: BlogType[] }) {
  return (
    <ul className={styles.blogList}>
      {entities.map((blog) => (
        <li key={blog.id} className={styles.blogItem}>
          <Link
            href={`/view/view-postDetailView?entityId=${blog.id}`}
            className={styles.cardLink}
          >
            {blog.featuredImage && (
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                width={120}
                height={120}
                style={{
                  objectFit: "cover",
                  borderRadius: 16,
                  marginRight: 24,
                }}
              />
            )}
            <div className={styles.content}>
              <h2>{blog.title}</h2>
              {/* <p>{blog.content.slice(0, 100)}...</p> */}
              <p>Author: {blog.author}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default BlogListRenderer;
