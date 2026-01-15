import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const items = [
  { title: "Websites & Landing Pages", desc: "Fast Next.js builds with SEO, analytics, and conversion-focused UX." },
  { title: "AI Assistants & Chatbots", desc: "Answer FAQs, capture leads, and support customers with smart routing." },
  { title: "Automations & Integrations", desc: "Connect CRM, email, calendars, payments, and internal tools." },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <Container className="py-16">
        <Badge variant="secondary">Services</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Everything you need to launch and scale</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Practical solutions that improve operations and generate revenue—built with clean code and reliable delivery.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((i) => (
            <Card key={i.title} className="rounded-2xl">
              <CardHeader>
                <CardTitle>{i.title}</CardTitle>
                <CardDescription>{i.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-24 rounded-xl bg-slate-50" />
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
