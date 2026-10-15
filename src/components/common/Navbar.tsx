"use client";

import React from "react";
import { User } from "@/types";
import { ShieldCheck, LogOut } from "lucide-react";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export function Navbar(props: NavbarProps) {
  const { user, onLogout } = props;
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg text-slate-900 tracking-tight">
          Bank<span className="text-indigo-600">Flow</span>
        </span>
      </div>

      {/* User profile & actions */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign out</span>
        </button>
      </div>
    </header>
  );
}
