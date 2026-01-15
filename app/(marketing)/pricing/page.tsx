import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tiers = [
  {
    title: "Starter",
    desc: "Best for a new website or landing page.",
    price: "From $1,500",
    bullets: ["Landing page + contact", "Basic SEO + performance", "Deployment on Vercel"],
  },
  {
    title: "Growth",
    desc: "Website + lead capture + integrations.",
    price: "From $3,500",
    bullets: ["Multi-page site", "Forms + CRM integration", "Analytics + tracking"],
    highlight: true,
  },
  {
    title: "AI + Automation",
    desc: "AI assistant + workflow automation.",
    price: "From $5,000",
    bullets: ["Chatbot / AI assistant", "Automation workflows", "Dashboards / reporting"],
  },
];

export default function PricingPage() {
  return (
    <main className="bg-white">
      <Container className="py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Transparent starting points. We’ll finalize scope after a short discovery call.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <Card key={t.title} className={t.highlight ? "rounded-2xl border-slate-900" : "rounded-2xl"}>
              <CardHeader>
                <CardTitle>{t.title}</CardTitle>
                <CardDescription>{t.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-slate-900">{t.price}</p>
                <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-300" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/contact" className="w-full">
                  <Button className="w-full" variant={t.highlight ? "primary" : "outline"}>
                    Get started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
