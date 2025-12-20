import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.resolve("public/articles");
const outputPath = path.resolve("public/articles/index.json");

const files = fs.readdirSync(articlesDir);

const articles = files
  .filter(file => file.endsWith(".md"))
  .map(file => {
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    const { data } = matter(content);

    return {
      id: file.replace(".md", ""),
      title: data.title ?? "No title",
      date: data.date ?? "",
      summary: data.summary ?? "",
      tags: data.tags ?? []
    };
  })
  // 新しい順に並べる
  .sort((a, b) => (a.date < b.date ? 1 : -1));

fs.writeFileSync(
  outputPath,
  JSON.stringify(articles, null, 2),
  "utf-8"
);

console.log("✅ index.json generated");