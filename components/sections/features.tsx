import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "High-performance websites",
    description: "SEO-ready, accessible, and built for conversion.",
  },
  {
    title: "AI assistants & chatbots",
    description: "Answer questions, capture leads, and support customers 24/7.",
  },
  {
    title: "Workflow automations",
    description: "Connect tools like email, CRM, and calendars to save time.",
  },
];

export function Features() {
  return (
    <section className="bg-slate-50">
      <Container className="py-16">
        <div className="max-w-full">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">What we build</h2>
          <p className="mt-3 text-slate-600">
            Modern, maintainable systems that are easy to extend as your business grows.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="rounded-2xl">
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-24 rounded-xl bg-white" />
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
