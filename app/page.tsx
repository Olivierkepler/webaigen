import { Hero, Features, Testimonials, CTA } from "@/components/sections";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Navbar />
      <main className="flex  w-full max-w-full flex-col items-center justify-between bg-white dark:bg-black ">
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      </main>
      <Footer/>
    </div>
  );
}
