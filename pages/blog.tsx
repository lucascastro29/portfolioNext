import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "../models/post";
import { getAllPosts } from "../lib/server/post"; // ✅ plural

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default function Blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="site-shell" style={styles.page}>
      <div className="parallax-large" data-parallax-depth="0.16" style={styles.container}>
        <header className="led-sign" style={styles.header}>
          <h1 style={styles.h1}>From the blog</h1>
          <p style={styles.subtitle}>
            Learn how to grow your business with our expert advice.
          </p>
        </header>

        <section style={styles.grid}>
          {posts.map((post) => (
            <article key={post.slug} className="led-sign" style={styles.card}>
              <Link href={`/blog/${post.slug}`} legacyBehavior>
              <a style={styles.cardLink}>
                <div style={styles.imageWrap}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={1200}
                    height={780}
                    style={styles.image}
                  />
                </div>

                <div style={styles.body}>
                  <div style={styles.metaRow}>
                    <span style={styles.date}>{formatDate(post.date)}</span>
                    <span style={styles.pill}>Marketing</span>
                  </div>

                  <h2 style={styles.title}>{post.title}</h2>

                  <p style={styles.excerpt}>{post.excerpt}</p>

                  <div style={styles.authorRow}>
                    <Image
                      src={post.author.picture}
                      alt={post.author.name}
                      width={44}
                      height={44}
                      style={styles.avatar}
                    />
                    <div style={styles.authorText}>
                      <div style={styles.authorName}>{post.author.name}</div>
                      <div style={styles.authorRole}>Co-Founder / CTO</div>
                    </div>
                  </div>
                </div>
              </a>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    color: "#e5e7eb",
  },
  container: {
    maxWidth: "1920px", // ✅ 1920 te deja demasiado “vacío”
    margin: "0 auto",
    padding: "72px 20px 96px",
  },

  header: {
    textAlign: "justify" as const,
    marginBottom: "44px",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    padding: "28px",
    background: "rgba(11,18,32,0.35)",
    backdropFilter: "blur(8px)",
  },
  h1: {
    margin: 0,
    fontSize: "56px",
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    color: "#f9fafb",
  },
  subtitle: {
    margin: "14px auto 0",
    maxWidth: "680px",
    fontSize: "18px",
    lineHeight: 1.7,
    color: "rgba(229,231,235,0.72)",
    textAlign: "justify" as const,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "36px",
  },

  card: {
    borderRadius: "26px",
    overflow: "hidden",
    background: "rgba(11,18,32,0.32)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "16px",
  },
  cardLink: {
    display: "block",
    textDecoration: "none",
    color: "inherit",
  },

  imageWrap: {
    borderRadius: "26px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  image: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    display: "block",
  },

  body: {
    paddingTop: "18px",
  },

  metaRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "12px",
  },
  date: {
    fontSize: "14px",
    color: "rgba(229,231,235,0.55)",
  },
  pill: {
    fontSize: "13px",
    padding: "8px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(229,231,235,0.88)",
  },

  title: {
    margin: "0 0 12px",
    fontSize: "22px",
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
    color: "#f9fafb",
  },

  excerpt: {
    margin: "0 0 18px",
    fontSize: "15px",
    lineHeight: 1.75,
    color: "rgba(229,231,235,0.62)",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical" as any,
    overflow: "hidden",
  },

  authorRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    paddingTop: "14px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "999px",
    objectFit: "cover",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  authorText: {},
  authorName: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#f3f4f6",
    lineHeight: 1.15,
  },
  authorRole: {
    marginTop: "2px",
    fontSize: "14px",
    color: "rgba(229,231,235,0.55)",
  },
};
