import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const markdown = new MarkdownIt({ html: true, linkify: true });

export function renderFeedContent(body: string): string {
  return sanitizeHtml(markdown.render(body), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "iframe", "img"],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "id"],
      iframe: ["src", "title", "loading", "allow", "allowfullscreen"],
      img: [
        "src",
        "srcset",
        "sizes",
        "alt",
        "title",
        "width",
        "height",
        "loading",
      ],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}
