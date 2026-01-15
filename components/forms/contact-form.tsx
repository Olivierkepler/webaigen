"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Send a message</CardTitle>
        <CardDescription>We’ll reply within 1–2 business days.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <Input name="name" label="Name" placeholder="Your name" required />
          <Input name="email" label="Email" type="email" placeholder="you@company.com" required />
          <Textarea name="message" label="Message" placeholder="What are you looking to build?" required />

          {status === "success" ? (
            <p className="text-sm text-emerald-600">Message sent. We’ll get back to you soon.</p>
          ) : null}
          {status === "error" ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex items-center gap-3">
            <Button type="submit" isLoading={status === "submitting"}>
              Send
            </Button>
            <p className="text-xs text-slate-500">
              By sending, you agree to be contacted about your request.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
