"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { PortfolioContext } from "../components/context/PortfolioContext";
import translations from "../content/translations.json";
import type { Post } from "../models/post";

type BlogFeedProps = {
  posts: Post[];
};

function formatDate(iso: string, language: "es" | "en") {
  const d = new Date(iso);
  return d.toLocaleDateString(language === "es" ? "es-UY" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function estimateReadingTime(content: string): number {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = plain ? plain.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 220));
}

const TAG_COLORS: Record<string, { bg: string; border: string; text: string; date: string; corners: string }> = {
  default:      { bg: "rgba(34,211,238,0.1)",  border: "rgba(34,211,238,0.28)",  text: "var(--cyan)",   date: "var(--cyan)",   corners: "rgba(56,189,248,0.45)" },
  architecture: { bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.28)", text: "var(--violet)", date: "var(--violet)", corners: "rgba(167,139,250,0.45)" },
  tutorial:     { bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.28)",  text: "var(--blue)",   date: "var(--blue)",   corners: "rgba(96,165,250,0.45)" },
};

function getTagFromTitle(title: string): { label: string; colorKey: string } {
  const lower = title.toLowerCase();
  if (lower.includes("cnn") || lower.includes("modelo") || lower.includes("tensorflow"))
    return { label: "CNN · ML", colorKey: "default" };
  if (lower.includes("arquitect") || lower.includes("skill") || lower.includes("diseñ"))
    return { label: "Architecture", colorKey: "architecture" };
  return { label: "Tutorial", colorKey: "tutorial" };
}

const BlogFeed = ({ posts }: BlogFeedProps) => {
  const ctx = useContext(PortfolioContext);
  const language = (ctx?.language ?? "es") as "es" | "en";
  const t = translations[language];

  return (
    <section id="blog" aria-label="Blog section" className="section-stack">
      <article className="led-sign section-panel blog-terminal parallax-large" data-aos="fade-up">

        {/* Terminal title bar */}
        <div className="blog-terminal-bar">
          <div className="blog-terminal-dots">
            <span className="blog-dot blog-dot--red" />
            <span className="blog-dot blog-dot--yellow" />
            <span className="blog-dot blog-dot--green" />
          </div>
          <div className="blog-terminal-path">
            <span className="blog-terminal-user">lucas@portfolio:~/blog $</span>
            <span className="blog-terminal-cmd">ls --latest --verbose</span>
          </div>
          <div className="blog-terminal-live">
            <span className="blog-live-dot" />
            <span className="blog-live-label">Live</span>
          </div>
        </div>

        {/* Section header */}
        <div className="section-label" data-aos="fade-up">{t.blogTitle ? `05 / ${t.blogTitle}` : "05 / Blog"}</div>
        <h2 className="subtitle" data-aos="fade-up" data-aos-delay="60">
          {language === "es" ? "Notas & Artículos" : "Notes & Articles"}
        </h2>
        <p className="section-kicker" data-aos="fade-up" data-aos-delay="90">{t.blogSubtitle}</p>

        {/* Blog entries */}
        {posts.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", marginTop: "2rem" }}>
            {language === "es" ? "No hay posts todavía." : "No posts yet."}
          </p>
        ) : (
          <div className="blog-feed-list">
            {posts.map((post, i) => {
              const { label, colorKey } = getTagFromTitle(post.title);
              const colors = TAG_COLORS[colorKey] || TAG_COLORS.default;
              const minutes = estimateReadingTime(post.content || "");

              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} legacyBehavior>
                  <a
                    className={`blog-feed-entry blog-feed-entry--${colorKey}`}
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                  >
                    <div className="blog-feed-meta">
                      <span className="blog-feed-date" style={{ color: colors.date }}>
                        {formatDate(post.date, language)}
                      </span>
                      <span
                        className="blog-feed-tag"
                        style={{
                          background: colors.bg,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      >
                        {label}
                      </span>
                      <span className="blog-feed-reading">
                        {minutes} min read
                      </span>
                    </div>

                    <div className="blog-feed-content">
                      <h3 className="blog-feed-title">{post.title}</h3>
                      <p className="blog-feed-excerpt">{post.excerpt}</p>
                      <div className="blog-feed-author">
                        <Image
                          src={post.author?.picture || "/images/foto.jpg"}
                          alt={post.author?.name || "Lucas Castro"}
                          width={24}
                          height={24}
                          className="blog-feed-avatar"
                        />
                        <span className="blog-feed-author-name">
                          {post.author?.name || "Lucas Castro"}
                        </span>
                      </div>
                    </div>

                    <div className="blog-feed-thumb">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={160}
                        height={100}
                        className="blog-feed-thumb-img"
                      />
                      {/* Detection corners */}
                      <div className="blog-feed-corners" style={{ "--corner-color": colors.corners } as React.CSSProperties}>
                        <span className="bfc bfc--tl" />
                        <span className="bfc bfc--tr" />
                        <span className="bfc bfc--bl" />
                        <span className="bfc bfc--br" />
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        )}

        {/* Terminal prompt */}
        <div className="blog-terminal-prompt">
          <span className="blog-terminal-user">lucas@portfolio:~/blog $</span>
          <span className="blog-terminal-cursor">▌</span>
        </div>
      </article>
    </section>
  );
};

export default BlogFeed;
