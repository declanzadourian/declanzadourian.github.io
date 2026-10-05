# Declan Zadourian: writing site

This folder is the whole website. The words are yours. The design lives in `_design`.

## Where things are

| What | Where |
| --- | --- |
| The About me page | `about.md` |
| Book reviews, one file each | `book-reviews/` |
| Opinion pieces, one file each | `opinion/` |
| Layout, fonts and colors | `_design/` |

Nothing in `_design` needs touching to publish writing.

## Add a piece

1. On github.com, open the `book-reviews` or `opinion` folder and choose **Add file**, then **Create new file**.
2. Name the file in lowercase with hyphens, ending in `.md`, for example `title-of-the-book.md`. The name becomes the page's address.
3. Start with a title block between two dashed lines, then write underneath:

   ```
   ---
   title: Title of the Book
   author: Name of the Author
   ---

   Your first paragraph.

   Your second paragraph.
   ```

   Opinion pieces only need the `title` line.
4. Choose **Commit changes**. The site rebuilds itself, and the piece appears at the top of its list within a couple of minutes.

If a title contains a colon, wrap the whole title in quotes: `title: "Title: With a Subtitle"`.

## Optional lines in the title block

- `date: 2026-10-05` sets the date shown on the piece. Without it, the date is the day the file was first added.
- `draft: true` keeps a piece off the site until the line is removed.

## Formatting

- Leave a blank line between paragraphs.
- `*italics*` and `**bold**`.
- `## A subheading`.
- `> A quotation`.
- `[words to click](https://example.com)` makes a link.
- `---` on a line of its own makes a break between parts.

Straight quotes and double hyphens are turned into curly quotes and dashes automatically.

## Change a piece, or remove one

Open the file on github.com and choose the pencil icon to edit it, or the menu beside it to delete it. The three `example` files in each folder are placeholders: edit them into real pieces or delete them.

## Search engines

While any example piece or the placeholder About text is still on the site, every page asks search engines not to list it. Once the last placeholder is replaced or deleted, that request disappears by itself and the site can be found in search.

## Change the design

The look of the site is set in `_design/assets/site.css`, and the page structure in `_design/layouts`. Ask Claude to change either.
