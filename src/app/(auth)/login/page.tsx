"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validateLoginForm } from "@/lib/validations";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-slate-50"
        role="status"
      >
        <span className="sr-only">Loading BankFlow authentication...</span>
        <div
          className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100 to-slate-200">
      {/* header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Bank<span className="text-indigo-600">Flow</span>
          </span>
        </div>
        <h1 className="text-center text-xl font-semibold text-slate-700">
          Sign in to your digital banking
        </h1>
      </div>

      {/* form section */}

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <section
          aria-labelledby="login-form-heading"
          className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-2xl border border-slate-100 sm:px-10"
        >
          <h2 id="login-form-heading" className="sr-only">
            Account Login Form
          </h2>

          <LoginForm />
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
