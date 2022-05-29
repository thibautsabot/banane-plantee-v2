import * as fs from "node:fs";

import {
  getBlogPostsSlugs,
  getFileContent,
  getFrontMatter,
} from "./frontmatter";

function buildLunr() {
  const slugs = getBlogPostsSlugs({ limit: 1000 });
  const frontmatters = slugs.map((slug, i) => {
    const fileContent = getFileContent(slug);

    return {
      title: getFrontMatter(fileContent).frontmatter.title,
      slug,
      id: i + 1
    };
  });

  const data = JSON.stringify(frontmatters);
  fs.writeFileSync("lunrIndex.json", data);
}

buildLunr();
