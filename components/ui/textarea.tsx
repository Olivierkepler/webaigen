import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, rows = 5, ...props }, ref) => {
    const textareaId = id ?? React.useId();
    const describedBy = error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined;

    return (
      <div className="grid gap-2">
        {label ? (
          <label htmlFor={textareaId} className="text-sm font-medium text-slate-900">
            {label}
          </label>
        ) : null}

        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 " +
              "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 " +
              "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500 focus:ring-red-400" : "border-slate-200",
            className
          )}
          {...props}
        />

        {hint && !error ? (
          <p id={`${textareaId}-hint`} className="text-xs text-slate-500">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={`${textareaId}-error`} className="text-xs text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
