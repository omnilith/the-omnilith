// import { BlogType } from "@core/core/data/entities";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./BlogDetailRenderer.module.css";
import { Entity } from "@core/entities/entityTypes";

function getYouTubeEmbedUrl(url: string) {
  // Extract the video ID from various YouTube URL formats
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function BlogDetailRenderer({ entities }: { entities: Entity[] }) {
  const blog = entities[0];
  if (!blog) return <div className={styles.noBlog}>No blog found.</div>;

  const embedUrl = blog.essence.featuredVideo
    ? getYouTubeEmbedUrl(blog.essence.featuredVideo as string)
    : null;

  return (
    <article className={styles.blogDetail}>
      {typeof blog.essence.featuredImage === "string" && (
        <Image
          src={blog.essence.featuredImage}
          alt={typeof blog.essence.title === "string" ? blog.essence.title : ""}
          width={400}
          height={250}
          className={styles.featuredImage}
        />
      )}

      <h1 className={styles.title}>{blog.essence.title as string}</h1>

      <p className={styles.author}>
        <strong>Author:</strong> {blog.essence.author as string}
      </p>

      {embedUrl && (
        <div className={styles.youtubeEmbed}>
          <iframe
            width="100%"
            height="400"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              borderRadius: 12,
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      )}

      <div className={styles.contentContainer}>
        <div className={styles.markdownContent}>
          <ReactMarkdown>{blog.essence.content as string}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

export default BlogDetailRenderer;
