import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import type { Post } from "../../models/post";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    ...(data as Omit<Post, "slug" | "content">),
    content,
  } as Post;
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(getPostBySlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}