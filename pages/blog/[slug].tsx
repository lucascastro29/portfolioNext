import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { GetStaticProps, GetStaticPaths } from "next";
import { getPostSlugs, getPostBySlug, getAllPosts } from "../../lib/server/post";
import { Post } from "../../models/post";

const SITE_URL = "https://portfolio-next-three-mu.vercel.app";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type PostRef = {
  slug: string;
  title: string;
};

type PostPageProps = {
  post: Post;
  readingMinutes: number;
  toc: TocItem[];
  previousPost: PostRef | null;
  nextPost: PostRef | null;
};

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const clearInlineMarkdown = (text: string): string =>
  text
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[*_~`>#]/g, "")
    .trim();

const extractHeadings = (content: string): TocItem[] => {
  const matches = [...content.matchAll(/^(##|###)\s+(.+)$/gm)];
  return matches
    .map((m) => {
      const level = m[1] === "##" ? 2 : 3;
      const text = clearInlineMarkdown(m[2]);
      const id = slugify(text);
      if (!text || !id) return null;
      return { id, text, level } as TocItem;
    })
    .filter((x): x is TocItem => Boolean(x));
};

const estimateReadingTime = (content: string): number => {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = plain ? plain.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 220));
};

const extractTextFromNode = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractTextFromNode).join("");
  if (React.isValidElement(node)) return extractTextFromNode(node.props.children);
  return "";
};

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.replace(".md", "") } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = ({ params }) => {
  const post = getPostBySlug(params!.slug as string);
  const posts = getAllPosts();

  const currentIndex = posts.findIndex((p) => p.slug === post.slug);
  const previousPost =
    currentIndex >= 0 && currentIndex < posts.length - 1
      ? { slug: posts[currentIndex + 1].slug, title: posts[currentIndex + 1].title }
      : null;
  const nextPost =
    currentIndex > 0
      ? { slug: posts[currentIndex - 1].slug, title: posts[currentIndex - 1].title }
      : null;

  return {
    props: {
      post,
      readingMinutes: estimateReadingTime(post.content),
      toc: extractHeadings(post.content),
      previousPost,
      nextPost,
    },
  };
};

export default function PostPage({ post, readingMinutes, toc, previousPost, nextPost }: PostPageProps) {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `${SITE_URL}${post.coverImage}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? "",
    url: postUrl,
    datePublished: post.date,
    image: ogImage,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "Lucas Castro",
      url: SITE_URL,
    },
  };

  return (
    <>
      <Head>
        <title>{post.title} — Lucas Castro</title>
        <meta name="description" content={post.excerpt ?? post.title} />
        <link rel="canonical" href={postUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt ?? post.title} />
        {post.coverImage && <meta property="og:image" content={ogImage} />}
        {post.date && <meta property="article:published_time" content={post.date} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt ?? post.title} />
        {post.coverImage && <meta name="twitter:image" content={ogImage} />}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="site-shell min-h-screen">
        <article
          className="parallax-large mx-auto w-full max-w-6xl px-4 py-10 sm:py-14"
          data-parallax-depth="0.14"
        >
          {post.coverImage && (
            <div className="led-sign relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
          )}

          <header className="led-sign section-panel blog-post-header mb-10">
            <h1 className="blog-post-title">{post.title}</h1>
            {post.excerpt && <p className="blog-post-excerpt">{post.excerpt}</p>}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {post.author?.picture && (
                  <Image
                    src="/images/foto.jpg"
                    alt={post.author?.name ?? "Autor"}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border border-white/10 object-cover"
                  />
                )}
                <div className="leading-tight">
                  <p className="text-sm font-medium text-white">{post.author?.name ?? "Lucas Castro"}</p>
                  {post.date && (
                    <p className="text-sm text-slate-400">
                      {new Date(post.date).toLocaleDateString("es-UY", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>
              <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                {readingMinutes} min
              </div>
            </div>
          </header>

          <div className="led-sign section-panel blog-post-body">
            <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 text-slate-300 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:rounded prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/40">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h2: ({ children, ...props }) => {
                    const text = extractTextFromNode(children);
                    const id = slugify(text);
                    return <h2 id={id} {...props}>{children}</h2>;
                  },
                  h3: ({ children, ...props }) => {
                    const text = extractTextFromNode(children);
                    const id = slugify(text);
                    return <h3 id={id} {...props}>{children}</h3>;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          <footer className="mt-10 pt-2 text-sm text-slate-400">
            <div className="led-sign section-panel blog-post-footer">
              <div className="grid gap-4 md:grid-cols-12">
                <section className="rounded-xl border border-cyan-200/20 bg-slate-950/35 p-4 md:col-span-7">
                  <p className="m-0 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Índice</p>
                  {toc.length === 0 ? (
                    <p className="mt-3 mb-0 text-sm text-cyan-100/70">Sin subtítulos detectados.</p>
                  ) : (
                    <ul className="mt-3 mb-0 max-h-72 space-y-1.5 overflow-y-auto pr-1">
                      {toc.map((item, idx) => (
                        <li key={item.id} className={item.level === 3 ? "ml-5" : "ml-0"}>
                          <a
                            href={`#${item.id}`}
                            className={`group flex items-start gap-2 no-underline text-left leading-snug ${
                              item.level === 3
                                ? "text-[0.93rem] text-cyan-100/78 hover:text-cyan-100"
                                : "text-[0.98rem] font-medium text-cyan-50/95 hover:text-white"
                            }`}
                          >
                            <span className="mt-[0.42rem] h-1.5 w-1.5 rounded-full bg-cyan-300/80 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                            <span>{item.level === 2 ? `${idx + 1}. ${item.text}` : item.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section className="rounded-xl border border-cyan-200/20 bg-slate-950/35 p-4 md:col-span-2">
                  <p className="m-0 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Lectura</p>
                  <p className="mt-3 mb-0 text-base font-semibold text-cyan-50">~{readingMinutes} min</p>
                </section>

                <section className="rounded-xl border border-cyan-200/20 bg-slate-950/35 p-4 md:col-span-3">
                  <p className="m-0 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Navegación</p>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {previousPost ? (
                      <Link href={`/blog/${previousPost.slug}`} legacyBehavior>
                        <a className="group rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-cyan-100/90 no-underline transition hover:border-cyan-300/40 hover:text-white">
                          ← <span className="font-medium">Anterior:</span> {previousPost.title}
                        </a>
                      </Link>
                    ) : (
                      <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-cyan-100/45">← Sin post anterior</span>
                    )}
                    {nextPost ? (
                      <Link href={`/blog/${nextPost.slug}`} legacyBehavior>
                        <a className="group rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-cyan-100/90 no-underline transition hover:border-cyan-300/40 hover:text-white">
                          <span className="font-medium">Siguiente:</span> {nextPost.title} →
                        </a>
                      </Link>
                    ) : (
                      <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-cyan-100/45">Sin post siguiente →</span>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}
