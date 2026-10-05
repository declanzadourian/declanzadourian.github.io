// Settings for Eleventy, the tool that turns the text files into web pages.

// The folders that hold writing. Each one becomes a list page of titles.
const SECTIONS = ["book-reviews", "opinion"];

// Work out the path from one page to another, so links never depend on the
// site's address. "/about/" seen from "/opinion/a-piece/" becomes "../../about/".
function relativeUrl(to, from) {
  const [, path, rest] = to.match(/^([^?#]*)(.*)$/);
  const fromDir = from.endsWith("/") ? from : from.slice(0, from.lastIndexOf("/") + 1);
  const fromParts = fromDir.split("/").filter(Boolean);
  const toParts = path.split("/").filter(Boolean);
  let shared = 0;
  while (shared < fromParts.length && shared < toParts.length && fromParts[shared] === toParts[shared]) shared++;
  let out = "../".repeat(fromParts.length - shared) + toParts.slice(shared).join("/");
  if (path.endsWith("/") && toParts.length > shared) out += "/";
  return (out || "./") + rest;
}

export default function (eleventyConfig) {
  // Fonts, the stylesheet and the icon are copied to the site unchanged.
  eleventyConfig.addPassthroughCopy({ "_design/assets": "assets" });

  // These files are for people reading the folder, not pages of the site.
  eleventyConfig.ignores.add("README.md");

  // Typeset straight quotes as curly quotes, and -- and --- as dashes.
  eleventyConfig.amendLibrary("md", (markdown) => markdown.set({ typographer: true }));

  // Dates as readers see them ("October 5, 2026") and as machines read them.
  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(date)
  );
  eleventyConfig.addFilter("isoDate", (date) => date.toISOString().slice(0, 10));

  // One list per folder, newest piece first. Drafts are left out.
  for (const folder of SECTIONS) {
    eleventyConfig.addCollection(folder, (collection) =>
      collection
        .getFilteredByGlob(`${folder}/*.md`)
        .filter((piece) => !piece.data.draft)
        .sort((a, b) => b.date - a.date || a.inputPath.localeCompare(b.inputPath))
    );
  }

  // While any example piece or placeholder text remains, the site asks search
  // engines not to list it. The request disappears once they are all replaced.
  const PLACEHOLDER_TITLE = /^\s*\[.*\]\s*$/;
  const PLACEHOLDER_TEXT = /^\s*\[(This is an example|A few paragraphs about you go here)/;
  eleventyConfig.addCollection("placeholders", (collection) =>
    collection
      .getAll()
      .filter((item) => !item.data.draft)
      .filter((item) => PLACEHOLDER_TITLE.test(item.data.title || "") || PLACEHOLDER_TEXT.test(item.rawInput || ""))
  );

  // Rewrite every internal link so it is relative to the page it sits on.
  // The "page not found" page is the exception: it can appear at any address.
  eleventyConfig.addTransform("relative-links", function (content) {
    const { outputPath, url } = this.page;
    if (!outputPath || !outputPath.endsWith(".html") || url === "/404.html") return content;
    return content.replace(
      /(\s(?:href|src))="(\/(?!\/)[^"]*)"/g,
      (match, attribute, target) => `${attribute}="${relativeUrl(target, url)}"`
    );
  });

  return {
    dir: {
      input: ".",
      includes: "_design/layouts",
      data: "_design/data",
      output: "_site",
    },
    templateFormats: ["md", "njk"],
    // Writing is treated as plain Markdown, so curly brackets in a piece are safe.
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
