import { formatCurrency } from "@/lib/formatter";
import React from "react";

export interface CategorySpendingItem {
  category: string;
  amount: number;
  percentage: number;
}

interface SpendingChartProps {
  categories: CategorySpendingItem[];
  totalExpenses: number;
}

export function SpendingChart(props: SpendingChartProps) {
  const { categories, totalExpenses } = props;

  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <header className="mb-4">
        <h2 className="text-base font-bold text-slate-900">
          Spending by Category
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Monthly expense allocation
        </p>
      </header>

      <div className="space-y-4 my-auto">
        {categories.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">
            No expenses recorded yet.
          </p>
        ) : (
          categories.map((item) => (
            <div key={item.category} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-700">
                  {item.category}
                </span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(item.amount)} ({item.percentage}%)
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={item.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden"
              >
                <div
                  className="w-full h-full bg-indigo-600 rounded-full transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${100 - Math.max(item.percentage, 4)}%)`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <footer className="mt-6 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-500">
        <span>Total Spent</span>
        <span className="font-bold text-slate-900">
          {formatCurrency(totalExpenses)}
        </span>
      </footer>
    </section>
  );
}
