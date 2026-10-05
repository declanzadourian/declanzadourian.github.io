// Shared settings for the folders that hold writing (book-reviews, opinion).

// Turn a file name into a clean web address: "My Review.md" becomes "my-review".
const slug = (name) =>
  String(name)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "untitled";

export function section(folder) {
  return {
    layout: "piece.njk",
    section: folder,
    // Unless a file gives its own date, use the day it was first added.
    date: "git Created",
    eleventyComputed: {
      // A piece marked "draft: true" gets no page at all.
      permalink: (data) => (data.draft ? false : `/${folder}/${slug(data.page.fileSlug)}/`),
    },
  };
}
