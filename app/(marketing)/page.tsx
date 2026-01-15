import { Hero, Features, Testimonials, CTA } from "@/components/sections";
import { Container } from "@/components/ui/container";

export default function MarketingHomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />

      <section className="bg-white">
        <Container className="py-14">
          <div className="rounded-3xl border border-slate-200 p-8">
            <h2 className="text-2xl font-semibold tracking-tight">What happens after you contact us</h2>
            <ol className="mt-4 grid gap-3 text-slate-700 md:grid-cols-3">
              <li className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">1) Discovery</p>
                <p className="mt-2 text-sm text-slate-600">
                  A quick call to understand your goals, stack, and timeline.
                </p>
              </li>
              <li className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">2) Proposal</p>
                <p className="mt-2 text-sm text-slate-600">
                  Clear scope, milestones, and pricing—no surprises.
                </p>
              </li>
              <li className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">3) Build & Launch</p>
                <p className="mt-2 text-sm text-slate-600">
                  Weekly updates, fast iterations, and a production-ready delivery.
                </p>
              </li>
            </ol>
          </div>
        </Container>
      </section>
    </main>
  );
}
