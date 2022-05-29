import * as fs from "node:fs";

import {
  getBlogPostsSlugs,
  getFileContent,
  getFrontMatter,
} from "./frontmatter";

function buildLunr() {
  const slugs = getBlogPostsSlugs({ limit: 1000 });
  const frontmatters = slugs.map((slug) => {
    const fileContent = getFileContent(slug);

    return {
      title: getFrontMatter(fileContent).frontmatter.title,
      slug,
    };
  });

  const data = JSON.stringify(frontmatters);
  fs.writeFileSync("lunrIndex.json", data);
}

buildLunr();
