"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { navLinks, site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Đổi nền thanh nav khi cuộn xuống
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Đóng menu mobile mỗi khi chuyển trang
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="page-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          {site.handle}
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-md px-3 py-2 text-[0.95rem] transition-colors ${
                    isActive(link.href)
                      ? "text-[var(--fg)]"
                      : "text-[var(--muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-[var(--link)]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <span className="mx-2 hidden h-5 w-px bg-[var(--line)] sm:block" />
          <ThemeToggle />

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] sm:hidden"
          >
            {open ? <LuX className="h-[1.05rem] w-[1.05rem]" /> : <LuMenu className="h-[1.05rem] w-[1.05rem]" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-[var(--line)] bg-[var(--bg)] px-6 py-3 sm:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block py-2.5 ${
                  isActive(link.href) ? "text-[var(--fg)]" : "text-[var(--muted)]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
