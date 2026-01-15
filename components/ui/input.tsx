import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, hint, error, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

    return (
      <div className="grid gap-2">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-900">
            {label}
          </label>
        ) : null}

        <input
          id={inputId}
          type={type}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-900 " +
              "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 " +
              "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500 focus:ring-red-400" : "border-slate-200",
            className
          )}
          {...props}
        />

        {hint && !error ? (
          <p id={`${inputId}-hint`} className="text-xs text-slate-500">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
