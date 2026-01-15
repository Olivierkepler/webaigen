import { Hero, Features, Testimonials, CTA } from "@/components/sections";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-slate-900 antialiased dark:bg-black dark:text-white">
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.08),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.12),transparent_55%)]" />
    <Navbar />
    <main className="flex flex-col">
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </main>
    <Footer />
  </div>
  
  );
}
