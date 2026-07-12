import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import type { Post, LocalizedContent } from "../../models/post";

const postsDirectory = join(process.cwd(), "_posts");

// Base slugs = every ".md" that is NOT a "<slug>.en.md" translation file.
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md") && !f.endsWith(".en.md"));
}

function readLocalized(realSlug: string, lang: "es" | "en"): LocalizedContent | null {
  const file = lang === "es" ? `${realSlug}.md` : `${realSlug}.en.md`;
  const fullPath = join(postsDirectory, file);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  return {
    title: (data.title as string) ?? "",
    excerpt: data.excerpt as string | undefined,
    content,
  };
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const esPath = join(postsDirectory, `${realSlug}.md`);
  const { data } = matter(fs.readFileSync(esPath, "utf8"));

  const es = readLocalized(realSlug, "es")!;
  const en = readLocalized(realSlug, "en") ?? es; // fallback to Spanish

  return {
    slug: realSlug,
    date: data.date as string,
    coverImage: data.coverImage as string,
    author: data.author,
    ogImage: data.ogImage,
    // flat es fields (SSR/SEO/back-compat)
    title: es.title,
    excerpt: es.excerpt,
    content: es.content,
    i18n: { es, en },
  } as Post;
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(getPostBySlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
