"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const PRICES: Record<string, Record<string, Record<string, number>>> = {
  apartment: { standard: { small: 90, medium: 130, large: 170 }, deep: { small: 150, medium: 200, large: 260 }, "move-in/out": { small: 180, medium: 240, large: 310 } },
  condo:     { standard: { small: 100, medium: 140, large: 180 }, deep: { small: 160, medium: 210, large: 270 }, "move-in/out": { small: 190, medium: 250, large: 320 } },
  house:     { standard: { small: 140, medium: 190, large: 260 }, deep: { small: 210, medium: 280, large: 370 }, "move-in/out": { small: 250, medium: 330, large: 430 } },
  room:      { standard: { small: 55,  medium: 75,  large: 95  }, deep: { small: 85,  medium: 110, large: 140 }, "move-in/out": { small: 100, medium: 130, large: 165 } },
};

const sizeLabels: Record<string, string> = {
  small: "Small (under 600 sq ft)",
  medium: "Medium (600–1,200 sq ft)",
  large: "Large (1,200+ sq ft)",
};

type FormData = {
  // Step 1 — Service
  spaceType: string;
  cleanType: string;
  size: string;
  // Step 2 — Schedule
  date: string;
  time: string;
  address: string;
  notes: string;
  // Step 3 — Contact
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Step 4 — Payment
  paymentMethod: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  zellePhone: string;
  venmoHandle: string;
};

const initial: FormData = {
  spaceType: "apartment", cleanType: "standard", size: "medium",
  date: "", time: "", address: "", notes: "",
  firstName: "", lastName: "", email: "", phone: "",
  paymentMethod: "", cardNumber: "", cardName: "", expiry: "", cvv: "",
  zellePhone: "", venmoHandle: "",
};

const steps = ["Service", "Schedule", "Your Info", "Payment", "Confirm"];

function ChipGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`px-4 py-2 rounded-full text-xs font-semibold capitalize border transition-all ${value === o ? "bg-[#2c2f5b] text-white border-[#2c2f5b]" : "bg-white text-[#5a5068] border-[#d4c9df] hover:border-[#a0829a]"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-widest text-[#a0829a] font-semibold">{label}</label>
      <input {...props}
        className="w-full px-4 py-3 rounded-xl border border-[#d4c9df] bg-white text-[#2c2f5b] text-sm focus:outline-none focus:border-[#a0829a] transition-colors placeholder:text-[#c0b8cc]" />
    </div>
  );
}

function Textarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-widest text-[#a0829a] font-semibold">{label}</label>
      <textarea {...props} rows={3}
        className="w-full px-4 py-3 rounded-xl border border-[#d4c9df] bg-white text-[#2c2f5b] text-sm focus:outline-none focus:border-[#a0829a] transition-colors resize-none placeholder:text-[#c0b8cc]" />
    </div>
  );
}

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const set = (key: keyof FormData, val: string) => setForm((f) => ({ ...f, [key]: val }));
  const price = PRICES[form.spaceType]?.[form.cleanType]?.[form.size] ?? 0;

  const canNext = () => {
    if (step === 0) return form.spaceType && form.cleanType && form.size;
    if (step === 1) return form.date && form.time && form.address;
    if (step === 2) return form.firstName && form.lastName && form.email && form.phone;
    if (step === 3) return form.paymentMethod;
    return true;
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#faf8fb] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-3xl font-serif text-[#2c2f5b] mb-3">You're all set!</h2>
          <p className="text-[#6b6280] text-sm leading-relaxed mb-2">
            Your booking request has been received. Maria will confirm your appointment within 24 hours via email or phone.
          </p>
          <p className="text-[#a0829a] text-xs mb-8 italic">
            Remember: payment is collected after the service is completed to your satisfaction.
          </p>
          <button onClick={() => router.push("/")}
            className="px-8 py-3 bg-[#2c2f5b] text-white text-sm uppercase tracking-widest rounded-full hover:bg-[#a0829a] transition-colors">
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8fb] px-6 py-12">
      <div className="max-w-xl mx-auto">

        {/* Back link */}
        <button onClick={() => router.push("/")} className="text-xs text-[#a0829a] uppercase tracking-widest mb-8 hover:text-[#2c2f5b] transition-colors">
          ← Back
        </button>

        {/* Header */}
        <h1 className="text-4xl font-serif text-[#2c2f5b] mb-1">Book a Clean</h1>
        <p className="text-[#a0829a] text-sm mb-8">Payment is saved for after the service — no charge today.</p>

        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1 flex-1">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border-2 transition-all ${i < step ? "bg-[#a0829a] border-[#a0829a] text-white" : i === step ? "bg-[#2c2f5b] border-[#2c2f5b] text-white" : "bg-white border-[#d4c9df] text-[#c0b8cc]"}`}>
                {i < step ? "✓" : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-[#a0829a]" : "bg-[#d4c9df]"}`} />}
            </div>
          ))}
        </div>

        {/* Step label */}
        <p className="text-xs uppercase tracking-[0.2em] text-[#a0829a] mb-6 font-semibold">
          Step {step + 1} — {steps[step]}
        </p>

        {/* ── STEP 0: Service ── */}
        {step === 0 && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#a0829a] font-semibold mb-2">Type of Space</p>
              <ChipGroup options={["apartment", "condo", "house", "room"]} value={form.spaceType} onChange={(v) => set("spaceType", v)} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#a0829a] font-semibold mb-2">Type of Cleaning</p>
              <ChipGroup options={["standard", "deep", "move-in/out"]} value={form.cleanType} onChange={(v) => set("cleanType", v)} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#a0829a] font-semibold mb-2">Size</p>
              <div className="flex flex-col gap-2">
                {["small", "medium", "large"].map((s) => (
                  <button key={s} type="button" onClick={() => set("size", s)}
                    className={`px-4 py-3 rounded-xl text-sm text-left border transition-all ${form.size === s ? "bg-[#2c2f5b] text-white border-[#2c2f5b]" : "bg-white text-[#5a5068] border-[#d4c9df] hover:border-[#a0829a]"}`}>
                    {sizeLabels[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Price preview */}
            <div className="bg-[#2c2f5b] rounded-2xl px-6 py-5 flex justify-between items-center">
              <div>
                <p className="text-[#9ba3cc] text-xs uppercase tracking-widest">Estimated Price</p>
                <p className="text-white text-3xl font-serif font-bold mt-1">${price}</p>
              </div>
              <p className="text-[#6b75a8] text-xs max-w-[140px] text-right italic">Final price confirmed after assessment</p>
            </div>
          </div>
        )}

        {/* ── STEP 1: Schedule ── */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <Input label="Preferred Date" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} min={new Date().toISOString().split("T")[0]} />
            <div>
              <p className="text-xs uppercase tracking-widest text-[#a0829a] font-semibold mb-2">Preferred Time</p>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((t) => (
                  <button key={t} type="button" onClick={() => set("time", t)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${form.time === t ? "bg-[#2c2f5b] text-white border-[#2c2f5b]" : "bg-white text-[#5a5068] border-[#d4c9df] hover:border-[#a0829a]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Input label="Full Address" placeholder="123 Main St, City, State, ZIP" value={form.address} onChange={(e) => set("address", e.target.value)} />
            <Textarea label="Special Instructions (optional)" placeholder="Pets, access codes, areas to focus on..." value={form.notes} onChange={(e) => set("notes", e.target.value)} />
          </div>
        )}

        {/* ── STEP 2: Contact Info ── */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="Jane" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
              <Input label="Last Name" placeholder="Doe" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
            </div>
            <Input label="Email" type="email" placeholder="jane@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
            <Input label="Phone Number" type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
        )}

        {/* ── STEP 3: Payment ── */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div className="bg-[#f0eaf5] border border-[#d4c9df] rounded-xl px-5 py-4 text-sm text-[#5a5068]">
              💜 Your card is saved for convenience. <span className="font-semibold text-[#2c2f5b]">You will not be charged today.</span> Payment is collected after the service, once you're satisfied.
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#a0829a] font-semibold mb-2">Payment Method</p>
              <div className="grid grid-cols-2 gap-2">
                {["Card", "Cash", "Zelle", "Venmo"].map((m) => (
                  <button key={m} type="button" onClick={() => set("paymentMethod", m)}
                    className={`py-3 rounded-xl text-sm font-semibold border transition-all ${form.paymentMethod === m ? "bg-[#2c2f5b] text-white border-[#2c2f5b]" : "bg-white text-[#5a5068] border-[#d4c9df] hover:border-[#a0829a]"}`}>
                    {m === "Card" ? "💳 Card" : m === "Cash" ? "💵 Cash" : m === "Zelle" ? "🟡 Zelle" : "💜 Venmo"}
                  </button>
                ))}
              </div>
            </div>

            {form.paymentMethod === "Card" && (
              <div className="flex flex-col gap-4">
                <Input label="Name on Card" placeholder="Jane Doe" value={form.cardName} onChange={(e) => set("cardName", e.target.value)} />
                <Input label="Card Number" placeholder="•••• •••• •••• ••••" maxLength={19} value={form.cardNumber}
                  onChange={(e) => set("cardNumber", e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim())} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry" placeholder="MM / YY" maxLength={7} value={form.expiry}
                    onChange={(e) => set("expiry", e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1 / $2"))} />
                  <Input label="CVV" placeholder="•••" maxLength={4} type="password" value={form.cvv} onChange={(e) => set("cvv", e.target.value)} />
                </div>
              </div>
            )}

            {form.paymentMethod === "Zelle" && (
              <Input label="Your Zelle Phone or Email" placeholder="(555) 000-0000" value={form.zellePhone} onChange={(e) => set("zellePhone", e.target.value)} />
            )}

            {form.paymentMethod === "Venmo" && (
              <Input label="Your Venmo Handle" placeholder="@yourhandle" value={form.venmoHandle} onChange={(e) => set("venmoHandle", e.target.value)} />
            )}

            {form.paymentMethod === "Cash" && (
              <div className="bg-white border border-[#d4c9df] rounded-xl px-5 py-4 text-sm text-[#6b6280]">
                💵 You've selected Cash. Payment will be collected in person after the service is complete.
              </div>
            )}
          </div>
        )}

        {/* ── STEP 4: Confirm ── */}
        {step === 4 && (
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-[#e0d9ea] rounded-2xl overflow-hidden">
              {[
                ["Service", `${form.spaceType} · ${form.cleanType} · ${sizeLabels[form.size]}`],
                ["Date & Time", `${form.date} at ${form.time}`],
                ["Address", form.address],
                ["Name", `${form.firstName} ${form.lastName}`],
                ["Email", form.email],
                ["Phone", form.phone],
                ["Payment", form.paymentMethod],
                ["Estimated Price", `$${price}`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between px-6 py-3 border-b border-[#f0eaf5] last:border-0">
                  <span className="text-xs uppercase tracking-widest text-[#a0829a] font-semibold">{label}</span>
                  <span className="text-sm text-[#2c2f5b] font-medium text-right max-w-[55%] capitalize">{val}</span>
                </div>
              ))}
            </div>
            {form.notes && (
              <div className="bg-white border border-[#e0d9ea] rounded-xl px-6 py-4">
                <p className="text-xs uppercase tracking-widest text-[#a0829a] mb-1">Notes</p>
                <p className="text-sm text-[#6b6280]">{form.notes}</p>
              </div>
            )}
            <p className="text-xs text-[#b0a8c0] italic text-center">By confirming, you agree that payment will be collected after the service.</p>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex justify-between mt-10">
          {step > 0 ? (
            <button onClick={() => setStep((s) => s - 1)}
              className="px-6 py-3 border-2 border-[#2c2f5b] text-[#2c2f5b] text-sm uppercase tracking-widest rounded-full hover:border-[#a0829a] hover:text-[#a0829a] transition-colors">
              Back
            </button>
          ) : <div />}

          {step < steps.length - 1 ? (
            <button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}
              className={`px-8 py-3 text-sm uppercase tracking-widest rounded-full transition-colors ${canNext() ? "bg-[#2c2f5b] text-white hover:bg-[#a0829a]" : "bg-[#d4c9df] text-[#b0a8c0] cursor-not-allowed"}`}>
              Continue
            </button>
          ) : (
            <button onClick={() => setSubmitted(true)}
              className="px-8 py-3 bg-[#a0829a] text-white text-sm uppercase tracking-widest rounded-full hover:bg-[#8a6d84] transition-colors">
              Confirm Booking ✓
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
