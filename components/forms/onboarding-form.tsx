"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function OnboardingForm({ onComplete }: { onComplete?: (data: any) => void }) {
  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // TODO: send to your API / save to DB
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    onComplete?.(payload);
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Project onboarding</CardTitle>
        <CardDescription>Basic details so we can scope correctly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <Input name="company" label="Company" placeholder="Company name" required />
          <Input name="website" label="Website (optional)" placeholder="https://..." />
          <Input name="goal" label="Primary goal" placeholder="Increase leads, automate support, etc." required />
          <div className="flex items-center justify-end">
            <Button type="submit" isLoading={isLoading}>Continue</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
