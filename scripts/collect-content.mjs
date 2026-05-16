import { writeFile } from "node:fs/promises";

const updatedAt = new Date().toISOString();

const news = [
  {
    title: "Daily AI + design news automation placeholder",
    source: "AI Product Design Lab",
    url: "resources.html",
    summary:
      "Replace this placeholder with RSS/API collection for AI product, UX, and design system sources.",
    updatedAt,
  },
];

const videos = [
  {
    title: "Daily YouTube curation automation placeholder",
    channel: "AI Product Design Lab",
    url: "resources.html",
    summary:
      "Replace this placeholder with YouTube channel RSS or API results for AI portfolio learning videos.",
    updatedAt,
  },
];

await writeFile("data/ai-design-news.json", `${JSON.stringify(news, null, 2)}\n`);
await writeFile("data/youtube-videos.json", `${JSON.stringify(videos, null, 2)}\n`);
