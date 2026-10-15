"use client";

import { AuthGuard } from "@/components/auth/AuthGaurd";
import { useAuth } from "@/context/AuthContext";
import { LogOut, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Navigation bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-slate-900">
              Bank<span className="text-indigo-600">Flow</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </header>
        INSIDE DASHBOARD PAGE
      </div>
    </AuthGuard>
  );
}
