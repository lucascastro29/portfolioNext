import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "../models/post";
import { getAllPosts } from "../lib/server/post";

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="site-shell blog-page">
      <div className="blog-wrap parallax-large" data-parallax-depth="0.16">
        <header className="led-sign section-panel blog-hero">
          <h1>From the blog</h1>
          <p>
            Learn how to grow your business with practical engineering notes, AI workflows,
            and implementation insights from real projects.
          </p>
        </header>

        <section className="blog-grid">
          {posts.map((post) => (
            <article key={post.slug} className="led-sign blog-card">
              <Link href={`/blog/${post.slug}`} legacyBehavior>
                <a className="blog-card-link">
                  <div className="blog-card-media">
                    <Image src={post.coverImage} alt={post.title} width={1200} height={780} className="blog-card-image" />
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>{formatDate(post.date)}</span>
                      <span className="blog-chip">Article</span>
                    </div>

                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>

                    <div className="blog-author-row">
                      <Image src={post.author.picture} alt={post.author.name} width={44} height={44} className="blog-author-avatar" />
                      <div>
                        <div className="blog-author-name">{post.author.name}</div>
                        <div className="blog-author-role">Software & AI Developer</div>
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
