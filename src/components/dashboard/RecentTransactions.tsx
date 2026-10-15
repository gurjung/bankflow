import React from "react";
import { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/lib/formatter";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getTransactionTypeMeta } from "@/lib/uiHelpers";

interface RecentTransactionsProps {
  transactions: Transaction[];
  maxDisplay?: number;
  selectedAccountName?: string;
}

export function RecentTransactions(props: RecentTransactionsProps) {
  const { transactions, maxDisplay = 5, selectedAccountName } = props;
  const displayed = transactions.slice(0, maxDisplay);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Recent Transactions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Latest activity across linked accounts
          </p>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Showing {displayed.length} latest
        </span>
      </header>
      {/* TABLE  */}
      <div className="overflow-x-auto overflow-y-auto max-h-[380px]">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 bg-white z-1 shadow-[0_1px_0_0_rgba(241,245,249,1)]">
            <tr className="border-b border-slate-100 text-slate-400 font-medium">
              <th className="pb-3 pt-1 font-semibold bg-white">Description</th>
              <th className="pb-3 pt-1 font-semibold bg-white">Category</th>
              <th className="pb-3 pt-1 font-semibold bg-white">Date</th>
              <th className="pb-3 pt-1 font-semibold text-right bg-white">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {displayed.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">
                  No recent transactions available.
                </td>
              </tr>
            ) : (
              displayed.map((txn) => {
                const { icon, badgeBg, amountColor, prefix } =
                  getTransactionTypeMeta(txn.type);
                return (
                  <tr
                    key={txn.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 pr-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${badgeBg}`}
                          aria-hidden="true"
                        >
                          {icon}
                        </div>
                        <span className="font-semibold text-slate-800 line-clamp-1">
                          {txn.description}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-2">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[11px]">
                        {txn.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-2 text-slate-500 whitespace-nowrap">
                      <time dateTime={txn.date}>{formatDate(txn.date)}</time>
                    </td>

                    <td className="py-3.5 pl-2 text-right whitespace-nowrap">
                      <span className={`font-bold ${amountColor}`}>
                        {prefix}
                        {formatCurrency(txn.amount)}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
