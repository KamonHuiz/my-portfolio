"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Chờ client render xong mới biết theme thật, tránh lệch server/client
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:text-[var(--fg)] hover:border-[var(--muted)]"
    >
      {mounted ? (
        isDark ? <LuSun className="h-[1.05rem] w-[1.05rem]" /> : <LuMoon className="h-[1.05rem] w-[1.05rem]" />
      ) : (
        <span className="h-[1.05rem] w-[1.05rem]" />
      )}
    </button>
  );
}
