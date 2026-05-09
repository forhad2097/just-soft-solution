import "server-only";
import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

export async function renderMarkdown(md: string): Promise<string> {
  return marked.parse(md ?? "") as string;
}

export function plainTextFromMarkdown(md: string, max = 160): string {
  const stripped = (md ?? "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_~>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length > max ? stripped.slice(0, max - 1).trimEnd() + "…" : stripped;
}
