import Head from "next/head";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import type { Post } from "../models/post";
import { getAllPosts } from "../lib/server/post";
import { PortfolioContext } from "../components/context/PortfolioContext";
import translations from "../content/translations.json";

const SITE_URL = "https://portfolio-next-three-mu.vercel.app";

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const ctx = useContext(PortfolioContext);
  const language = (ctx?.language ?? "es") as "es" | "en";
  const t = translations[language];

  return (
    <>
      <Head>
        <title>{t.blogTitle} — Lucas Castro</title>
        <meta name="description" content={t.blogSubtitle} />
        <meta property="og:title" content={`${t.blogTitle} — Lucas Castro`} />
        <meta property="og:description" content={t.blogSubtitle} />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Head>

      <main className="site-shell blog-page">
        <div className="blog-wrap parallax-large" data-parallax-depth="0.16">
          <header className="led-sign section-panel blog-hero">
            <div className="section-label">
              {language === "es" ? "/ Blog" : "/ Blog"}
            </div>
            <h1>{t.blogTitle}</h1>
            <p>{t.blogSubtitle}</p>
          </header>

          {posts.length === 0 ? (
            <p className="mt-8 text-center" style={{ color: "var(--text-muted)" }}>
              {language === "es" ? "No hay posts todavía." : "No posts yet."}
            </p>
          ) : (
            <section className="blog-grid" aria-label="Blog posts">
              {posts.map((post) => (
                <article key={post.slug} className="led-sign blog-card">
                  <Link href={`/blog/${post.slug}`} legacyBehavior>
                    <a className="blog-card-link">
                      <div className="blog-card-media">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          width={1200}
                          height={780}
                          className="blog-card-image"
                        />
                      </div>

                      <div className="blog-card-body">
                        <div className="blog-card-meta">
                          <span>{formatDate(post.date, language)}</span>
                          <span className="blog-chip">
                            {language === "es" ? "Artículo" : "Article"}
                          </span>
                        </div>
                        <h2>{post.title}</h2>
                        <p>{post.excerpt}</p>

                        <div className="blog-author-row">
                          <Image
                            src={post.author.picture}
                            alt={post.author.name}
                            width={44}
                            height={44}
                            className="blog-author-avatar"
                          />
                          <div>
                            <div className="blog-author-name">{post.author.name}</div>
                            <div className="blog-author-role">
                              {language === "es" ? "Desarrollador & IA" : "Software & AI Developer"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
    </>
  );
}

function formatDate(iso: string, language: "es" | "en") {
  const d = new Date(iso);
  return d.toLocaleDateString(language === "es" ? "es-UY" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
