import React from "react";

export type StatsCardVariant = "default" | "income" | "expense";

interface StatsCardProps {
  title: string;
  amount: string;
  icon: React.ReactNode;
  subtitle?: string;
  badge?: string;
  variant?: StatsCardVariant;
}

export function StatsCard(props: StatsCardProps) {
  const { title, amount, icon, subtitle, badge, variant = "default" } = props;
  // Styles based on variant
  const iconBgClasses = {
    default: "bg-indigo-50 text-indigo-600",
    income: "bg-emerald-50 text-emerald-600",
    expense: "bg-rose-50 text-rose-600",
  }[variant];

  const amountColorClasses = {
    default: "text-slate-900",
    income: "text-emerald-600",
    expense: "text-slate-900",
  }[variant];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBgClasses}`}
        >
          {icon}
        </div>
      </div>

      <div>
        <p
          className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${amountColorClasses}`}
        >
          {amount}
        </p>

        {badge && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
            <span>{badge}</span>
          </div>
        )}

        {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
      </div>
    </div>
  );
}
