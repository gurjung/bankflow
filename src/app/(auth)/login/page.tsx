"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { validateLoginForm } from "@/lib/validations";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  //error state
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

  const onChangeField = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "email" | "password",
  ) => {
    if (type === "email") {
      setEmail(e.target.value);
      if (errors.email) {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
    if (type === "password") {
      setPassword(e.target.value);
      if (errors.password) {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setAuthError(null);

    const validation = validateLoginForm(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setAuthError(
        err instanceof Error
          ? err.message
          : "Authentication failed. Please check your credentials.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Bank<span className="text-indigo-600">Flow</span>
          </span>
        </div>
        <h1 className="text-center text-xl font-semibold text-slate-700">
          Sign in to your digital banking
        </h1>
        <p className="mt-1 text-center text-xs text-slate-500">
          Secure, mock customer portal
        </p>
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

          {authError && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2"
            >
              <span className="font-medium">{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Email Address{" "}
                <span className="text-rose-500" aria-hidden="true">
                  *
                </span>
              </label>
              <div className="relative rounded-lg">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
                  aria-hidden="true"
                >
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : "false"}
                  value={email}
                  onChange={(e) => onChangeField(e, "email")}
                  placeholder="name@example.com"
                  className={`block w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                    errors.email
                      ? "border-rose-300 focus-visible:border-rose-500 focus-visible:ring-rose-200 text-rose-900"
                      : "border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-indigo-100 text-slate-900"
                  }`}
                />
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="mt-1.5 text-xs text-rose-600 font-medium"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Password{" "}
                  <span className="text-rose-500" aria-hidden="true">
                    *
                  </span>
                </label>
              </div>
              <div className="relative rounded-lg">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
                  aria-hidden="true"
                >
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  aria-required="true"
                  aria-invalid={errors.password ? "true" : "false"}
                  value={password}
                  onChange={(e) => onChangeField(e, "password")}
                  placeholder="••••••••"
                  className={`block w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                    errors.password
                      ? "border-rose-300 focus-visible:border-rose-500 focus-visible:ring-rose-200 text-rose-900"
                      : "border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-indigo-100 text-slate-900"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded p-1 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="mt-1.5 text-xs text-rose-600 font-medium"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm shadow-md shadow-indigo-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
