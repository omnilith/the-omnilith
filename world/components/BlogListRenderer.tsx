import { Entity } from "@core/entities/entityTypes";
import Link from "next/link";
import Image from "next/image";
import styles from "./BlogListRenderer.module.css";

function BlogListRenderer({ entities }: { entities: Entity[] }) {
  return (
    <ul className={styles.blogList}>
      {entities.map((blog) => (
        <li key={blog.id} className={styles.blogItem}>
          <Link
            href={`/view/view-postDetailView?entityId=${blog.id}`}
            className={styles.cardLink}
          >
            {typeof blog.essence.featuredImage === "string" && (
              <Image
                src={blog.essence.featuredImage}
                alt={
                  typeof blog.essence.title === "string"
                    ? blog.essence.title
                    : ""
                }
                width={120}
                height={120}
                className={styles.blogImage}
              />
            )}
            <div className={styles.content}>
              <h2>{blog.essence.title as string}</h2>
              {/* <p>{blog.content.slice(0, 100)}...</p> */}
              <p>Author: {blog.essence.author as string}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default BlogListRenderer;
