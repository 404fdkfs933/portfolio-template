import "server-only";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";

/** Renders a Markdown body (project statement, about page) as prose. */
export async function Mdx({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, { ...runtime, remarkPlugins: [remarkGfm] });
  return <Content components={mdxComponents} />;
}
