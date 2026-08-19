import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell flex flex-col items-center py-32 text-center">
      <p className="font-mono text-6xl font-semibold tracking-tighter text-[var(--muted)]">404</p>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">This page does not exist</h1>
      <p className="mt-3 text-[var(--muted)]">
        Either it moved, or it never existed and we are both confused.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-[var(--line)] px-5 py-2 text-sm transition-colors hover:border-[var(--muted)] hover:bg-[var(--surface)]"
      >
        Take me home
      </Link>
    </div>
  );
}
