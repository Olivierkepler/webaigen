import Link from "next/link";
import { cn } from "@/lib/utils";

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("w-64 border-r border-slate-200 bg-white p-4", className)}>
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-900">Dashboard</p>
        <p className="text-xs text-slate-500">Manage your projects</p>
      </div>

      <nav className="grid gap-2">
        <Link href="/dashboard" className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
          Overview
        </Link>
        <Link href="/settings" className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
