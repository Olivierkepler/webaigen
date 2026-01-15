import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="   ">
      <Container className="py-16 sm:py-20">
        <div className="max-w-full">
          <Badge className="mb-4" variant="secondary">
            AI + Web Services for Businesses
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Build faster with modern websites and practical AI automation.
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            We help teams launch high-converting sites, integrate AI assistants, and automate workflows—without
            complexity.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact">
              <Button size="lg">Book a call</Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">See services</Button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 text-sm text-slate-600 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Fast</p>
              <p className="mt-1">Next.js + Vercel</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Secure</p>
              <p className="mt-1">Best practices</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Scalable</p>
              <p className="mt-1">Clean architecture</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
