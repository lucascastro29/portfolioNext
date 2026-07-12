export type Lang = "es" | "en";

export type PostAuthor = {
  name?: string;
  picture?: string;
};

export type LocalizedContent = {
  title: string;
  excerpt?: string;
  content: string;
};

export type Post = {
  slug: string;
  date: string;
  coverImage: string;
  author?: PostAuthor;
  ogImage?: { url: string };

  // Default-language (es) fields — kept flat for SSR/SEO and backward compatibility.
  title: string;
  excerpt?: string;
  content: string;

  // Per-language content. `en` falls back to `es` when no <slug>.en.md exists.
  i18n: Record<Lang, LocalizedContent>;
};
