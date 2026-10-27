import { Notice } from "./original-ui";
import { L } from "../original/i18n";
/** Known DSH repositories; Obsidian-only dependencies cannot be installed in Harness. */
export const DSH_REPOSITORIES: Record<string, string> = {
  "qiaomu-reader": "qiaomu-reader-dsh",
  "qiaomu-ai-rss": "qiaomu-rss-dsh",
  "qiaomu-radio": "qiaomu-radio-dsh",
  "qiaomu-audio": "qiaomu-audio-dsh",
  "qiaomu-ui-learn": "qiaomu-ui-learn-dsh",
  "qiaomu-publish": "qiaomu-publish-dsh",
  "qiaomu-cover-design": "qiaomu-cover-design-dsh",
  "qiaomu-blog-publisher": "qiaomu-blog-publisher-dsh",
};
export function openHarnessPluginPage(id: string) {
  const repository = DSH_REPOSITORIES[id];
  if (repository)
    window.open(
      "https://github.com/joeseesun/" + repository + "/releases",
      "_blank",
      "noopener,noreferrer",
    );
  else
    new Notice(
      L(
        "这项集成依赖 Obsidian 插件，当前没有可安装的 Harness 版本。",
        "This integration requires an Obsidian plugin. A Harness version is not available here.",
      ),
    );
}
