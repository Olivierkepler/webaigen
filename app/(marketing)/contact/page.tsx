import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";

export default function ContactPage() {
  return (
    <main className="bg-white">
      <Container className="py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Tell us what you want to build. We’ll reply with next steps.
        </p>
        <div className="mt-10 max-w-xl">
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
