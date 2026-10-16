import React, { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`w-full appearance-none bg-white border border-slate-200 rounded-lg py-2.5 pl-3 pr-9 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-colors ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
        <ChevronDown className="w-4 h-4" aria-hidden="true" />
      </div>
    </div>
  );
}
