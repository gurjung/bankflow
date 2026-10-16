import React from "react";
import { Transaction } from "@/types";
import { TransactionTableRow } from "./TransactionTableRow";
import { ArrowUpDown, ArrowUp, ArrowDown, Inbox } from "lucide-react";

interface TransactionTableProps {
  transactions: Transaction[];
  sortField: "date" | "amount" | null;
  sortOrder: "desc" | "asc" | null;
  onSort: (field: "date" | "amount") => void;
  isDropdownFilterActive: boolean;
  hasSearchText: boolean;
  onResetDropdownFilters: () => void;
}

export function TransactionTable(props: TransactionTableProps) {
  const {
    transactions,
    sortField,
    sortOrder,
    onSort,
    isDropdownFilterActive,
    hasSearchText,
    onResetDropdownFilters,
  } = props;
  return (
    <div className="overflow-x-auto border border-slate-100 rounded-xl">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold">
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-3">Category</th>
            {/* sorting */}
            <th
              aria-sort={
                sortField === "date"
                  ? sortOrder === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              className="py-3 px-3"
            >
              <button
                type="button"
                onClick={() => onSort("date")}
                title="Click to cycle: Descending → Ascending → Default"
                className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer select-none"
              >
                <span>Date</span>
                {sortField === "date" ? (
                  sortOrder === "asc" ? (
                    <ArrowUp className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                  ) : (
                    <ArrowDown className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                  )
                ) : (
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </th>

            <th className="py-3 px-3">Ref No.</th>
            <th className="py-3 px-3">Status</th>

            {/* sorting */}
            <th
              aria-sort={
                sortField === "amount"
                  ? sortOrder === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              className="py-3 px-4 text-right"
            >
              <button
                type="button"
                onClick={() => onSort("amount")}
                title="Click to cycle: Descending → Ascending → Default"
                className="inline-flex items-center justify-end gap-1.5 font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer select-none w-full"
              >
                <span>Amount</span>
                {sortField === "amount" ? (
                  sortOrder === "asc" ? (
                    <ArrowUp className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                  ) : (
                    <ArrowDown className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                  )
                ) : (
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"
                    aria-hidden="true"
                  >
                    <Inbox className="w-5 h-5" />
                  </div>
                  <p className="font-semibold text-slate-700 text-sm">
                    No transactions found
                  </p>
                  <p className="text-slate-400 text-xs max-w-sm">
                    {isDropdownFilterActive || hasSearchText
                      ? "No transactions matched your current search or filter combinations."
                      : "No transaction activity recorded for this selection yet."}
                  </p>
                  {isDropdownFilterActive && (
                    <button
                      type="button"
                      onClick={onResetDropdownFilters}
                      className="mt-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Reset dropdown filters
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ) : (
            transactions.map((txn) => (
              <TransactionTableRow key={txn.id} transaction={txn} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
