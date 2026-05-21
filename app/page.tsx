import { Hero, Features, Testimonials, CTA } from "@/components/sections";
import { Navbar } from "@/components/layout/navbar";
import"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const reviews = [
  { name: "Sofia M.", location: "Downtown Resident", text: "I came home after work to find everything immaculate. It honestly felt like moving into a brand new apartment. I've tried other services before but nothing compares — I'm never going back." },
  { name: "James & Priya L.", location: "Family of 4", text: "With two kids and two jobs, our house was always a disaster zone. Now it's consistently clean without us lifting a finger. The attention to detail is incredible — even the baseboards!" },
  { name: "Camille R.", location: "Remote Worker", text: "As someone who works from home, my environment has a huge impact on my focus. Having a clean, organized space every week has genuinely changed how productive I feel. 100% worth it." },
];

const cases = [
  {
    label: "Kitchen",
    before: "https://media.istockphoto.com/id/2163323710/photo/messy-kitchen.jpg?s=1024x1024&w=is&k=20&c=2FWofVdu1AO-8O6siKyDMTzPoXFPVXos0_8jnkVvpe0=",
    after: "https://images.pexels.com/photos/7304442/pexels-photo-7304442.jpeg",
    quality: "Deep kitchen cleans — degreasing stovetops, scrubbing grout, sanitizing every appliance inside and out.",
  },
  {
    label: "Bedroom",
    before: "https://media.istockphoto.com/id/519556371/photo/disoder-in-the-room.jpg?s=1024x1024&w=is&k=20&c=Pzg_nMGjfyLMtWOu7g0uxz-UdY2EvEFmeTF5RYlcQSE=",
    after: "https://media.istockphoto.com/id/1269670706/photo/folding-clothes-and-organizing-stuff-in-boxes-and-baskets-concept-of-tidiness-minimalist.jpg?s=1024x1024&w=is&k=20&c=SuARa9YgpANSTFxfCidwaMBxLjyDo3UKHlpDLOI02XM=",
    quality: "From cluttered chaos to calm and organized — folding, dusting every corner, restoring peace.",
  },
  {
    label: "Living Room",
    before: "https://media.istockphoto.com/id/2184396949/photo/lazy-teenager-girl-using-phone-on-the-sofa-of-a-messy-living-room.jpg?s=1024x1024&w=is&k=20&c=h8gjyBuGaeaNkb4ksRWhGapCqKmMBm2KQ15dkrPyN1o=",
    after: "https://media.istockphoto.com/id/2155881158/photo/living-room-featuring-a-sofa-with-colorful-pillows.jpg?s=1024x1024&w=is&k=20&c=yoYdNvVBRW-s0SRr_RC43XiOoGLKY7jIFIsML5Yfno4=",
    quality: "Vacuuming upholstery, wiping surfaces, fluffing cushions — every detail attended to with care.",
  },
];

const PRICES: Record<string, Record<string, Record<string, number>>> = {
  apartment: { standard: { small: 90, medium: 130, large: 170 }, deep: { small: 150, medium: 200, large: 260 }, "move-in/out": { small: 180, medium: 240, large: 310 } },
  condo:     { standard: { small: 100, medium: 140, large: 180 }, deep: { small: 160, medium: 210, large: 270 }, "move-in/out": { small: 190, medium: 250, large: 320 } },
  house:     { standard: { small: 140, medium: 190, large: 260 }, deep: { small: 210, medium: 280, large: 370 }, "move-in/out": { small: 250, medium: 330, large: 430 } },
  room:      { standard: { small: 55, medium: 75, large: 95 }, deep: { small: 85, medium: 110, large: 140 }, "move-in/out": { small: 100, medium: 130, large: 165 } },
};

const howItWorks = [
  { step: "01", icon: "📋", title: "Book or Get a Quote", desc: "Choose your space type, cleaning preference, and a time that works — takes less than 2 minutes." },
  { step: "02", icon: "🗓️", title: "Maria Confirms", desc: "You'll hear back within 24 hours to confirm your appointment." },
  { step: "03", icon: "✨", title: "She Shows Up & Gets to Work", desc: "Maria arrives on time, fully equipped — no supervision needed." },
  { step: "04", icon: "🏠", title: "Come Home to Clean", desc: "Walk through the door to a spotless space. Pay only once you're satisfied." },
];

const whyChoose = [
  { title: "Same Person Every Time", desc: "No strangers. Maria shows up every visit and learns your space." },
  { title: "Exceptional Detail", desc: "Baseboards, behind appliances, inside cabinets — nothing overlooked." },
  { title: "Fully Trustworthy", desc: "Many clients give Maria a key. Complete discretion, always." },
  { title: "Direct Communication", desc: "Text or call Maria directly — no call centers, no middlemen." },
  { title: "Transparent Pricing", desc: "What you see is what you pay. No surprise fees." },
  { title: "She Actually Cares", desc: "She takes pride in her work and wants your home to feel like a sanctuary." },
];

const faqs = [
  { q: "How long does a typical cleaning take?", a: "Most cleans range from 2 to 5 hours depending on the size and condition of the space." },
  { q: "Do I need to be home during the cleaning?", a: "Not at all. Many clients leave a key or provide entry instructions. Maria is fully trusted and discreet." },
  { q: "What's included in a standard clean?", a: "Dusting, vacuuming, mopping, bathroom sanitization, kitchen wipe-down, and surface cleaning throughout." },
  { q: "What's the difference between standard and deep clean?", a: "A deep clean goes further — inside appliances, scrubbing grout, behind furniture, and areas not typically covered in a standard visit." },
  { q: "How do I pay?", a: "Maria accepts cash, Zelle, Venmo, and major credit/debit cards. Payment is collected after the service." },
  { q: "How far in advance should I book?", a: "At least 48 hours ahead is recommended, though same-week slots are sometimes available." },
  { q: "Do I need to provide cleaning supplies?", a: "No — Maria comes fully equipped with everything needed. Just let her know if you have any product preferences." },
  { q: "Can I request the same time every week?", a: "Yes! Recurring clients get priority scheduling and can lock in a regular time slot." },
];

// ── Hooks
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ── SVG Icons
function FacebookIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>;
}
function InstagramIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
}

// ── Navbar
function Navbar({ onBook, onQuote }: { onBook: () => void; onQuote: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/80 shadow-lg shadow-[#2c2f5b]/10 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div>
          <span className={`font-serif text-xl font-bold transition-colors ${scrolled ? "text-[#2c2f5b]" : "text-white"}`}>Maria's</span>
          <span className={`text-xs ml-1 tracking-widest uppercase transition-colors ${scrolled ? "text-[#a0829a]" : "text-white/70"}`}>Cleaning</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Services", "How It Works", "Reviews", "About"].map((item) => (
            <span key={item} className={`text-xs uppercase tracking-widest cursor-pointer transition-colors font-medium ${scrolled ? "text-[#5a5068] hover:text-[#2c2f5b]" : "text-white/80 hover:text-white"}`}>{item}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onQuote} className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${scrolled ? "border-[#2c2f5b] text-[#2c2f5b] hover:bg-[#2c2f5b] hover:text-white" : "border-white/60 text-white hover:bg-white/20"}`}>Quote</button>
          <button onClick={onBook} className="text-xs uppercase tracking-widest px-5 py-2 rounded-full bg-[#a0829a] text-white hover:bg-[#8a6d84] transition-colors">Book Now</button>
        </div>
      </div>
    </nav>
  );
}

// ── Before/After Card — shows BEFORE first
function BeforeAfterCard({ c, delay }: { c: typeof cases[0]; delay: number }) {
  const [showAfter, setShowAfter] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      const interval = setInterval(() => setShowAfter((p) => !p), 3500);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <Reveal delay={delay * 0.001}>
      <div className="group rounded-3xl overflow-hidden border border-white/20 shadow-xl shadow-[#2c2f5b]/10 bg-white">
        <div className="relative w-full h-64 overflow-hidden">
          {/* Before always underneath, after fades in on top */}
          <img src={c.before} alt="before" className="absolute inset-0 w-full h-full object-cover" />
          <img src={c.after} alt="after" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${showAfter ? "opacity-100" : "opacity-0"}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute top-4 left-4 text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-white">
            {showAfter ? "✦ After" : "Before"}
          </span>
          <span className="absolute bottom-4 right-4 text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-[#a0829a] text-white">{c.label}</span>
        </div>
        <div className="p-5 bg-white">
          <p className="text-[#5a5068] text-sm leading-relaxed">{c.quality}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ── How Step
function HowStep({ item, index }: { item: typeof howItWorks[0]; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.6s ease ${index * 0.18}s, transform 0.6s ease ${index * 0.18}s` }} className="flex gap-5 items-start">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a0829a] to-[#2c2f5b] flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-[#2c2f5b]/20">
          {item.icon}
        </div>
        {index < howItWorks.length - 1 && (
          <div style={{ height: visible ? "56px" : "0px", transition: `height 0.5s ease ${index * 0.18 + 0.4}s` }} className="w-px bg-gradient-to-b from-[#a0829a] to-transparent mt-2" />
        )}
      </div>
      <div className="pb-8 pt-1">
        <span className="text-xs text-[#a0829a] font-bold tracking-widest uppercase">{item.step}</span>
        <h4 className="text-[#2c2f5b] font-serif text-xl mt-1 mb-2 font-semibold">{item.title}</h4>
        <p className="text-[#6b6280] text-sm leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

// ── Quote Modal
function QuoteModal({ onClose }: { onClose: () => void }) {
  const [spaceType, setSpaceType] = useState("apartment");
  const [cleanType, setCleanType] = useState("standard");
  const [size, setSize] = useState("medium");
  const [quoted, setQuoted] = useState(false);
  const price = PRICES[spaceType]?.[cleanType]?.[size] ?? 0;
  const sizeLabels: Record<string, string> = { small: "Small (under 600 sq ft)", medium: "Medium (600–1,200 sq ft)", large: "Large (1,200+ sq ft)" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(44,47,91,0.4)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative border border-[#e0d9ea]">
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0eaf5] flex items-center justify-center text-[#a09ab0] hover:text-[#2c2f5b] font-bold text-sm">✕</button>
        <h3 className="text-2xl font-serif text-[#2c2f5b] mb-1">Get an Approximate Quote</h3>
        <p className="text-xs text-[#a09ab0] mb-6">Prices are estimates — final quote confirmed at booking.</p>
        <label className="block text-xs uppercase tracking-widest text-[#a0829a] mb-2">Type of Space</label>
        <div className="grid grid-cols-4 gap-2 mb-5">
          {["apartment", "condo", "house", "room"].map((t) => (
            <button key={t} onClick={() => { setSpaceType(t); setQuoted(false); }} className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${spaceType === t ? "bg-[#2c2f5b] text-white border-[#2c2f5b]" : "bg-[#faf8fb] text-[#5a5068] border-[#d4c9df] hover:border-[#a0829a]"}`}>{t}</button>
          ))}
        </div>
        <label className="block text-xs uppercase tracking-widest text-[#a0829a] mb-2">Type of Cleaning</label>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {["standard", "deep", "move-in/out"].map((t) => (
            <button key={t} onClick={() => { setCleanType(t); setQuoted(false); }} className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${cleanType === t ? "bg-[#2c2f5b] text-white border-[#2c2f5b]" : "bg-[#faf8fb] text-[#5a5068] border-[#d4c9df] hover:border-[#a0829a]"}`}>{t}</button>
          ))}
        </div>
        <label className="block text-xs uppercase tracking-widest text-[#a0829a] mb-2">Relative Size</label>
        <div className="flex flex-col gap-2 mb-6">
          {["small", "medium", "large"].map((s) => (
            <button key={s} onClick={() => { setSize(s); setQuoted(false); }} className={`py-2.5 px-4 rounded-xl text-xs font-semibold text-left border transition-all ${size === s ? "bg-[#2c2f5b] text-white border-[#2c2f5b]" : "bg-[#faf8fb] text-[#5a5068] border-[#d4c9df] hover:border-[#a0829a]"}`}>{sizeLabels[s]}</button>
          ))}
        </div>
        <button onClick={() => setQuoted(true)} className="w-full py-3.5 bg-gradient-to-r from-[#2c2f5b] to-[#a0829a] text-white text-sm uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity font-semibold">Show My Estimate</button>
        {quoted && (
          <div className="mt-5 bg-gradient-to-br from-[#2c2f5b] to-[#1e2147] rounded-2xl px-6 py-5 text-center">
            <p className="text-[#c9b8d8] text-xs uppercase tracking-widest mb-1">Your Approximate Quote</p>
            <p className="text-5xl font-bold text-white font-serif">${price}</p>
            <p className="text-[#9ba3cc] text-xs mt-1 capitalize">{sizeLabels[size]} · {spaceType} · {cleanType} clean</p>
            <p className="text-[#6b75a8] text-xs mt-3 italic">Final price may vary based on actual condition of the space.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── FAQ
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #faf8fb 0%, #f0eaf5 100%)" }}>
      <div className="max-w-3xl mx-auto">
        <Reveal><p className="text-center text-xs uppercase tracking-[0.25em] text-[#a0829a] mb-2">Got Questions?</p></Reveal>
        <Reveal delay={0.1}><h2 className="text-center text-4xl md:text-5xl font-serif text-[#2c2f5b] mb-10">Frequently Asked</h2></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="bg-white/80 rounded-2xl border border-[#e0d9ea] overflow-hidden shadow-sm h-full" style={{ backdropFilter: "blur(8px)" }}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left px-5 py-4 flex justify-between items-start gap-3 text-[#2c2f5b] font-semibold text-sm hover:text-[#a0829a] transition-colors">
                  <span>{faq.q}</span>
                  <span className={`text-[#a0829a] text-lg flex-shrink-0 transition-transform duration-300 mt-0.5 ${open === i ? "rotate-45" : "rotate-0"}`}>+</span>
                </button>
                {open === i && <div className="px-5 pb-4 text-[#6b6280] text-sm leading-relaxed border-t border-[#f0eaf5] pt-3">{faq.a}</div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main
export default function Home() {
  const [showQuote, setShowQuote] = useState(false);
  const router = useRouter();

  return (
    <main className="bg-[#faf8fb] overflow-x-hidden">
      {showQuote && <QuoteModal onClose={() => setShowQuote(false)} />}
      <Navbar onBook={() => router.push("/booking")} onQuote={() => setShowQuote(true)} />

      {/* ── HERO — blurred photo bg + color overlay ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Blurred photo background */}
        <div className="absolute inset-0">
          <img
            src="https://www.thespruce.com/thmb/_QTe-TS1WncuDUjLiyfvk-GM_os=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc()/SPR-how-to-deep-cleaning-house-7152794-Hero-01-e5cd99973ec24e69b00b5ee6b992f760.jpg"
            alt="clean home"
            className="w-full h-full object-cover"
            style={{ filter: "blur(3px) brightness(0.4)", transform: "scale(1.05)" }}
          />
          {/* Color overlay matching navy/mauve palette */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(30,33,71,0.82) 0%, rgba(44,47,91,0.75) 50%, rgba(74,48,96,0.70) 100%)" }} />
        </div>

        {/* Mesh orbs */}
        <div className="absolute top-[-10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #a0829a, transparent 70%)" }} />
        <div className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #6b75a8, transparent 70%)" }} />

        {/* Content grid */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left: text */}
            <div>
              <div style={{ animation: "fadeUp 0.8s ease 0.25s both" }}>
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#c9b8d8] mb-6 border border-[#a0829a]/40 px-4 py-1.5 rounded-full">
                  Professional Home Cleaning
                </span>
              </div>
              <div style={{ animation: "fadeUp 0.8s ease 0.25s both" }}>
                <h1 className="text-6xl md:text-7xl font-serif text-white leading-[0.95] mb-6">
                  A Clean<br />
                  Home,<br />
                  <span className="italic text-[#c9b8d8]">A Better</span><br />
                  <span className="text-[#a0829a]">You.</span>
                </h1>
              </div>
              <div style={{ animation: "fadeUp 0.8s ease 0.25s both" }}>
                <p className="text-[#9ba3cc] text-lg leading-relaxed mb-10 max-w-sm">
                  Your space, spotless — so you can focus on what truly matters in life.
                </p>
              </div>
              <div className="flex flex-wrap gap-4" style={{ animation: "fadeUp 0.8s ease 0.55s both" }}>
                <button onClick={() => router.push("/booking")}
                  className="px-8 py-4 bg-[#a0829a] text-white text-sm uppercase tracking-widest rounded-full hover:bg-[#8a6d84] transition-all hover:shadow-lg hover:shadow-[#a0829a]/30 hover:-translate-y-0.5">
                  Book Now
                </button>
                <button onClick={() => setShowQuote(true)}
                  className="px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">
                  Get a Quote
                </button>
              </div>
              {/* Trust bar */}
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10" style={{ animation: "fadeUp 0.8s ease 0.7s both" }}>
                <div>
                  <p className="text-white font-bold text-2xl font-serif">5.0</p>
                  <div className="flex gap-0.5 mt-0.5">{"★★★★★".split("").map((s, i) => <span key={i} className="text-[#a0829a] text-sm">{s}</span>)}</div>
                  <p className="text-[#7a80b0] text-xs mt-0.5">Average rating</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-white font-bold text-2xl font-serif">[X]+</p>
                  <p className="text-[#7a80b0] text-xs mt-1">Happy homes</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-wrap gap-1.5">
                  {["💵 Cash", "💳 Card", "Zelle", "Venmo"].map((m) => (
                    <span key={m} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">{m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Maria PNG (transparent bg) */}
            <div className="relative hidden md:flex justify-center items-end h-[520px]">
              {/* Soft glow behind her */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #a0829a, transparent)" }} />
              <img
                src="https://www.vhv.rs/dpng/d/492-4921677_transparent-cleaning-lady-png-domestic-cleaner-png-download.png"
                alt="Maria"
                className="relative z-10 h-full object-contain drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 20px 40px rgba(44,47,91,0.5))" }}
              />
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z" fill="#faf8fb"/>
          </svg>
        </div>
      </section>

      {/* ── MEET MARIA ── */}
      <section className="py-16 px-6 bg-[#faf8fb]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative">
              <div className="w-full h-[460px] rounded-3xl overflow-hidden shadow-2xl shadow-[#2c2f5b]/15 border border-[#e0d9ea]">
                <img src="https://images.pexels.com/photos/9462170/pexels-photo-9462170.jpeg" alt="Maria cleaning" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl border border-[#e0d9ea] px-5 py-4 max-w-[200px]">
                <p className="text-[#2c2f5b] font-serif text-lg font-bold">[X]+ Years</p>
                <p className="text-[#a0829a] text-xs">of trusted cleaning experience</p>
                <p className="text-[#c9b8d8] text-xs italic mt-1">* update with your number</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-5">
              <span className="text-xs uppercase tracking-[0.25em] text-[#a0829a] font-semibold">Meet Maria</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2c2f5b] leading-tight">
                Best Cleaning Service in <span className="italic text-[#a0829a]">[Location]</span>
              </h2>
              <p className="text-[#6b6280] leading-relaxed">
                Maria doesn't just clean — she genuinely cares about every space she enters. Reliable, thorough, and kind, she's built her reputation on showing up, doing the job right, and making sure you feel it the moment you walk through the door.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { icon: "⭐", val: "5.0", label: "Avg Rating" },
                  { icon: "🏠", val: "[X]+", label: "Homes Cleaned" },
                  { icon: "📅", val: "[X]+", label: "Years Active" },
                  { icon: "💬", val: "100%", label: "Response Rate" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-4 border border-[#e0d9ea] shadow-sm flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <p className="text-[#2c2f5b] font-bold font-serif text-lg leading-none">{s.val}</p>
                      <p className="text-[#a0829a] text-xs mt-0.5">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY CHOOSE HER — blurred photo bg ── */}
      <section className="relative py-16 px-6 overflow-hidden">
        {/* Blurred photo background */}
        <div className="absolute inset-0">
          <img
            src="https://th.bing.com/th/id/R.871904a754f1fb7b4385c6ca5995f729?rik=nPdlgPcLCl2Xng&pid=ImgRaw&r=0"
            alt="clean home background"
            className="w-full h-full object-cover"
            style={{ filter: "blur(4px) brightness(0.3)", transform: "scale(1.06)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(30,33,71,0.80) 0%, rgba(44,47,91,0.72) 50%, rgba(74,48,96,0.75) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal><p className="text-center text-xs uppercase tracking-[0.25em] text-[#c9b8d8] mb-2">Why Maria</p></Reveal>
          <Reveal delay={0.1}><h2 className="text-center text-4xl md:text-5xl font-serif text-white mb-12">Not just another cleaning service</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {whyChoose.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="rounded-3xl p-6 border border-white/15 hover:border-[#a0829a]/60 transition-all duration-300 hover:-translate-y-1 group h-full"
                  style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
                  {/* Modern accent line instead of emoji */}
                  <div className="w-8 h-0.5 bg-gradient-to-r from-[#a0829a] to-[#c9b8d8] mb-4 group-hover:w-12 transition-all duration-300" />
                  <h4 className="text-white font-serif text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-[#c4bedd] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-6 bg-[#faf8fb]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal><p className="text-xs uppercase tracking-[0.25em] text-[#a0829a] mb-2">Simple Process</p></Reveal>
            <Reveal delay={0.1}><h2 className="text-4xl md:text-5xl font-serif text-[#2c2f5b] mb-10">How it works</h2></Reveal>
            {howItWorks.map((item, i) => <HowStep key={item.step} item={item} index={i} />)}
          </div>
          <Reveal delay={0.3}>
            <div className="relative h-[480px] hidden md:block">
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img src="https://images.pexels.com/photos/7304442/pexels-photo-7304442.jpeg" alt="clean kitchen" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2f5b]/60 to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl p-5 border border-white/20" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(16px)" }}>
                <p className="text-white font-serif text-lg font-bold mb-1">Ready for a clean home?</p>
                <p className="text-white/70 text-xs mb-4">Booking takes less than 2 minutes.</p>
                <button onClick={() => router.push("/booking")} className="w-full py-3 bg-[#a0829a] text-white text-xs uppercase tracking-widest rounded-full hover:bg-[#8a6d84] transition-colors">Book Now →</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #faf8fb, #f0eaf5)" }}>
        <Reveal><p className="text-center text-xs uppercase tracking-[0.25em] text-[#a0829a] mb-2">What Clients Say</p></Reveal>
        <Reveal delay={0.1}><h2 className="text-center text-4xl md:text-5xl font-serif text-[#2c2f5b] mb-12">Real homes. Real results.</h2></Reveal>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.1}>
              <div className="bg-white rounded-3xl p-7 flex flex-col gap-4 border border-[#e0d9ea] hover:border-[#a0829a] hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <div className="flex gap-0.5">{"★★★★★".split("").map((s, j) => <span key={j} className="text-[#a0829a]">{s}</span>)}</div>
                <p className="text-[#5a5068] text-sm leading-relaxed flex-1">"{review.text}"</p>
                <div className="border-t border-[#f0eaf5] pt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a0829a] to-[#2c2f5b] flex items-center justify-center text-white text-xs font-bold">{review.name[0]}</div>
                  <div>
                    <p className="text-[#2c2f5b] font-semibold text-sm">{review.name}</p>
                    <p className="text-[#b0a8c0] text-xs">{review.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── BEFORE & AFTER — before shows first ── */}
      <section className="py-16 px-6 bg-[#faf8fb]">
        <Reveal><p className="text-center text-xs uppercase tracking-[0.25em] text-[#a0829a] mb-2">See the Difference</p></Reveal>
        <Reveal delay={0.1}><h2 className="text-center text-4xl md:text-5xl font-serif text-[#2c2f5b] mb-2">Take a look at her work</h2></Reveal>
        <Reveal delay={0.15}><p className="text-center text-[#b0a8c0] text-sm mb-10">Each card switches automatically from before to after.</p></Reveal>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => <BeforeAfterCard key={c.label} c={c} delay={i * 900} />)}
        </div>
      </section>

      {/* ── FAQ — 2 column grid ── */}
      <FAQ />

      {/* ── GET IN TOUCH ── */}
      <section className="py-16 px-6 bg-[#faf8fb]">
        <Reveal>
          <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #2c2f5b, #a0829a)" }}>
            <div className="p-12 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-3">Prefer a personal touch?</p>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">Not wanting to book online?</h2>
              <p className="text-white/70 text-base mb-8 max-w-md mx-auto">Reach out directly and Maria will get back to you personally to set everything up.</p>
              <button className="px-8 py-4 bg-white text-[#2c2f5b] text-sm uppercase tracking-widest rounded-full font-semibold cursor-not-allowed opacity-80">Get in Touch</button>
              <p className="text-white/40 text-xs mt-4 italic">Contact details coming soon.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1e2147] pt-14 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-[#2c2f5b]">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-white font-serif text-2xl font-bold">Maria's</p>
                <p className="text-[#a0829a] text-xs tracking-widest uppercase">Cleaning Service</p>
              </div>
              <p className="text-[#7a80b0] text-xs leading-relaxed">Professional, personal, and thorough home cleaning in [Location].</p>
              <div className="flex gap-3 mt-1">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity"><FacebookIcon /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}><InstagramIcon /></a>
              </div>
            </div>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">Services</p>
              <ul className="flex flex-col gap-2">
                {["Standard Clean", "Deep Clean", "Move-in / Move-out", "Room Cleaning"].map((item) => (
                  <li key={item} className="text-[#7a80b0] text-sm hover:text-[#c9b8d8] transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">Company</p>
              <ul className="flex flex-col gap-2">
                {["About Maria", "Why Choose Her", "How It Works", "Reviews"].map((item) => (
                  <li key={item} className="text-[#7a80b0] text-sm hover:text-[#c9b8d8] transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">Get in Touch</p>
              <ul className="flex flex-col gap-2">
                <li className="text-[#7a80b0] text-sm">📞 <span className="hover:text-[#c9b8d8] cursor-pointer">[Phone number]</span></li>
                <li className="text-[#7a80b0] text-sm">✉️ <span className="hover:text-[#c9b8d8] cursor-pointer">[Email address]</span></li>
                <li className="text-[#7a80b0] text-sm">📍 [Location / Service Area]</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {["💵 Cash", "💳 Card", "Zelle", "Venmo"].map((m) => (
                  <span key={m} className="text-xs px-2 py-1 rounded-full bg-[#2c2f5b] text-[#9ba3cc] border border-[#454880]">{m}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[#454880] text-xs">
            <p>© {new Date().getFullYear()} Maria's Cleaning Service. All rights reserved.</p>
            <p className="italic text-[#3a3f6e]">A clean you can count on.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
} { Footer } from "@/components/layout/footer";

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
