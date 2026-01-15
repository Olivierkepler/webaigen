"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC to close
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Prevent background scroll when drawer open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-semibold">
              W
            </span>
            <span className="text-sm font-semibold text-slate-900">WebAI Gen</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "text-sm transition-colors",
                    active ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link href="/contact">
              <Button>Book a call</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              aria-label="Open menu"
              aria-controls="mobile-drawer"
              aria-expanded={open}
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>

      {/* ✅ GLOBAL overlay layer (guaranteed above any page) */}
      <div
        className={cn(
          "fixed inset-0 z-[9999] md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        {/* Backdrop (behind drawer) */}
        <div
          className={cn(
            "fixed inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        {/* Drawer */}
        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          className={cn(
            "fixed left-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-semibold">
                W
              </span>
              <span className="text-sm font-semibold text-slate-900">WebAI Gen</span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              aria-label="Close menu"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 py-4">
            <nav className="grid gap-1">
              {navLinks.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition",
                      active
                        ? "bg-slate-900 text-white"
                        : "text-slate-800 hover:bg-slate-100"
                    )}
                  >
                    <span>{l.label}</span>
                    <span className={cn("text-xs", active ? "text-white/80" : "text-slate-400")}>
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 grid gap-3">
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  Dashboard
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)}>
                <Button className="w-full">Book a call</Button>
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">AI + Web, done right.</p>
              <p className="mt-1 text-xs text-slate-600">
                Fast builds, clean code, and scalable architecture.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
