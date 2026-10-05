// If a file has no "title:" line, fall back to its file name:
// "notes-on-reading.md" is shown as "Notes on reading".
const fromFileName = (name = "") => {
  const words = String(name).replace(/[-_]+/g, " ").trim();
  return words ? words[0].toUpperCase() + words.slice(1) : "Untitled";
};

export default {
  displayTitle: (data) => data.title || fromFileName(data.page?.fileSlug),
};
