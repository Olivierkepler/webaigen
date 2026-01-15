import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-semibold">
            W
          </span>
          <span className="text-sm font-semibold text-slate-900">WebAI Gen</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link className="text-sm text-slate-600 hover:text-slate-900" href="/services">Services</Link>
          <Link className="text-sm text-slate-600 hover:text-slate-900" href="/pricing">Pricing</Link>
          <Link className="text-sm text-slate-600 hover:text-slate-900" href="/contact">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="hidden md:block">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Link href="/contact">
            <Button>Book a call</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}
