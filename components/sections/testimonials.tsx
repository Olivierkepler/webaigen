import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "They shipped a clean site fast and helped automate our intake process.",
    name: "Operations Lead",
    company: "Local Services Co.",
  },
  {
    quote: "Our chatbot reduced support time and increased qualified leads.",
    name: "Founder",
    company: "E-commerce Brand",
  },
  {
    quote: "Professional, responsive, and the codebase is easy to maintain.",
    name: "CTO",
    company: "B2B Startup",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white">
      <Container className="py-16">
        <div className="max-w-full">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Trusted by teams</h2>
          <p className="mt-3 text-slate-600">Results-focused work with a clean delivery process.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="rounded-2xl">
              <CardContent className="p-6">
                <p className="text-slate-700">“{t.quote}”</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
