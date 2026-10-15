import { getStatCardStyle } from "@/lib/uiHelpers";
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

  const { iconBg, amountColor } = getStatCardStyle(variant);

  return (
    <article
      aria-label={`${title}: ${amount}`}
      className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
    >
      <header className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </h3>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
      </header>

      <div>
        <p
          className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${amountColor}`}
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
    </article>
  );
}
