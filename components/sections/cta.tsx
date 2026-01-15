import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="bg-slate-900">
      <Container className="py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white">Ready to ship?</h2>
            <p className="mt-3 text-slate-200">
              Tell us what you’re building—we’ll propose a plan, timeline, and build path.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">
              Contact us
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
