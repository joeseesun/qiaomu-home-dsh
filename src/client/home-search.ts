import { SuggestModal, TFile, Notice } from "./original-ui";
import { L } from "../original/i18n";
/** Harness has no Obsidian search core; this local modal searches only the configured Home workspace. */
export class HomeSearchModal extends SuggestModal<TFile> {
  private searchId = 0;
  constructor(
    app: any,
    private openFile: (file: TFile) => Promise<any>,
    query = "",
  ) {
    super(app);
    this.modalEl.addClass("qh-ui");
    this.setTitle(L("搜索 Home 笔记", "Search Home notes"));
    this.setPlaceholder(
      L("正文、文件名、path: 或 tag:", "Text, file name, path: or tag:"),
    );
    this.inputEl.value = query;
  }
  async getSuggestions(query: string) {
    const id = ++this.searchId;
    const terms =
      query.match(/(?:-?(?:path|file|tag|content):)?(?:"[^"]*"|\S+)/g) || [];
    if (terms.some((term) => /^[()[\]]|^\/(?:.*)\/$/.test(term)))
      throw Error(
        L(
          "此处支持文字、path:、file:、tag:、content:、OR 和减号排除",
          "Supported: text, path:, file:, tag:, content:, OR and minus exclusions",
        ),
      );
    const groups: Array<Array<(file: TFile, text: string) => boolean>> = [[]];
    for (const raw of terms) {
      if (raw === "OR") {
        groups.push([]);
        continue;
      }
      const negated = raw.startsWith("-"),
        term = negated ? raw.slice(1) : raw;
      const field = /^(path|file|tag|content):/.exec(term)?.[1] || "any";
      const value = (field === "any" ? term : term.slice(field.length + 1))
        .replace(/^"|"$/g, "")
        .toLocaleLowerCase();
      if (!value) continue;
      groups.at(-1)!.push((file, text) => {
        let match = false;
        if (field === "path")
          match = file.path.toLocaleLowerCase().includes(value);
        else if (field === "file")
          match = file.name.toLocaleLowerCase().includes(value);
        else if (field === "tag") {
          const cache = this.app.metadataCache.getFileCache(file) || {};
          let tags = cache.frontmatter?.tags || [];
          if (typeof tags === "string") tags = tags.split(/[,\s]+/);
          match = [
            ...(cache.tags || []).map((tag: any) => tag.tag),
            ...(Array.isArray(tags) ? tags : []),
          ].some(
            (tag: any) =>
              typeof tag === "string" &&
              tag.replace(/^#/, "").toLocaleLowerCase() ===
                value.replace(/^#/, ""),
          );
        } else
          match =
            (field === "any" &&
              file.path.toLocaleLowerCase().includes(value)) ||
            text.toLocaleLowerCase().includes(value);
        return negated ? !match : match;
      });
    }
    const files = this.app.vault
        .getMarkdownFiles()
        .sort(
          (a: TFile, b: TFile) => (b.stat.mtime || 0) - (a.stat.mtime || 0),
        ),
      found: Array<{ file: TFile; index: number }> = [];
    let cursor = 0;
    await Promise.all(
      Array.from({ length: Math.min(6, files.length) }, async () => {
        while (cursor < files.length && id === this.searchId && this.opened) {
          const index = cursor++,
            file = files[index];
          try {
            const text = query ? await this.app.vault.cachedRead(file) : "";
            if (
              groups.some((group) => group.every((match) => match(file, text)))
            )
              found.push({ file, index });
          } catch {}
        }
      }),
    );
    return found
      .sort((a, b) => a.index - b.index)
      .slice(0, 200)
      .map((item) => item.file);
  }
  renderSuggestion(file: TFile, el: any) {
    el.setText(file.path);
  }
  onChooseSuggestion(file: TFile) {
    void this.openFile(file).catch((error) => new Notice(error.message));
  }
  onClose() {
    this.searchId++;
    super.onClose();
  }
}
