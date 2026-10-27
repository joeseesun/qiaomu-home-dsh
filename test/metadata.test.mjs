import test from "node:test";
import assert from "node:assert/strict";
import { noteMetadata } from "../src/metadata.js";
test("Home indexes prose tags/links, including nested Markdown and wiki embeds, but excludes code and escapes", () => {
  const result = noteMetadata(
    "---\naliases: [Alias]\ntags: [yaml]\n---\n# Heading\n#work **#bold** [[Note|label]] ![[Image.png]] [other](Other.md)\n`#code [[ignored]]`\n\\#escaped\n```md\n#fenced [[fenced]]\n```\n",
  );
  assert.deepEqual(result.frontmatter.aliases, ["Alias"]);
  assert.deepEqual(
    result.tags.map((t) => t.tag),
    ["#work", "#bold"],
  );
  assert.deepEqual(
    result.links.map((t) => t.link),
    ["Note", "Image.png", "Other.md"],
  );
  assert.deepEqual(result.headings, [{ heading: "Heading", level: 1 }]);
});
