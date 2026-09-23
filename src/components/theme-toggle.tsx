"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-8 place-items-center rounded-full border border-line text-ink-2 transition hover:border-line-strong hover:text-ink"
    >
      {mounted ? dark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" /> : <span className="size-3.5" />}
    </button>
  );
}
