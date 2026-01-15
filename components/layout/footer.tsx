import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">WebAI Gen</p>
            <p className="mt-1 text-sm text-slate-600">AI + Web services for businesses.</p>
          </div>

          <div className="flex gap-6">
            <Link className="text-sm text-slate-600 hover:text-slate-900" href="/services">Services</Link>
            <Link className="text-sm text-slate-600 hover:text-slate-900" href="/pricing">Pricing</Link>
            <Link className="text-sm text-slate-600 hover:text-slate-900" href="/contact">Contact</Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} WebAI Gen LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="text-xs text-slate-500 hover:text-slate-900" href="/privacy">Privacy</Link>
            <Link className="text-xs text-slate-500 hover:text-slate-900" href="/terms">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
