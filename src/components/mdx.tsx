import type { ComponentProps } from "react";
import Link from "next/link";

function A({ href = "", ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} {...rest} />;
  return <a href={href} target="_blank" rel="noreferrer" {...rest} />;
}

export const mdxComponents = { a: A };
