import React from "react";
import { Account } from "@/types";
import { formatCurrency, maskAccountNumber } from "@/lib/formatter";
import { ArrowRight } from "lucide-react";

interface TransferFormStepProps {
  accounts: Account[];
  sourceId: string;
  destId: string;
  amount: string;
  note: string;
  errors: { source?: string; dest?: string; amount?: string };
  onSourceChange: (id: string) => void;
  onDestChange: (id: string) => void;
  onAmountChange: (amount: string) => void;
  onNoteChange: (note: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function TransferFormStep(props: TransferFormStepProps) {
  const {
    accounts,
    sourceId,
    destId,
    amount,
    note,
    errors,
    onSourceChange,
    onDestChange,
    onAmountChange,
    onNoteChange,
    onSubmit,
    onCancel,
  } = props;

  const sourceAccount = accounts.find((a) => a.id === sourceId);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          From Account
        </label>
        <select
          value={sourceId}
          onChange={(e) => onSourceChange(e.target.value)}
          className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({maskAccountNumber(acc.accountNumber)})
            </option>
          ))}
        </select>
        {errors.source && (
          <p className="text-rose-600 text-[11px] mt-1">{errors.source}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          To Account
        </label>
        <select
          value={destId}
          onChange={(e) => onDestChange(e.target.value)}
          className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({maskAccountNumber(acc.accountNumber)})
            </option>
          ))}
        </select>
        {errors.dest && (
          <p className="text-rose-600 text-[11px] mt-1">{errors.dest}</p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-semibold text-slate-700">
            Amount (₹)
          </label>
          {sourceAccount && (
            <span className="text-[11px] text-slate-500">
              Available:{" "}
              <strong className="text-slate-800">
                {formatCurrency(sourceAccount.balance)}
              </strong>
            </span>
          )}
        </div>
        <input
          type="number"
          step="0.01"
          min="0.01"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.00"
          className="w-full text-sm font-semibold p-2.5 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.amount && (
          <p className="text-rose-600 text-[11px] mt-1">{errors.amount}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Note <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          maxLength={50}
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="e.g. Monthly savings contribution"
          className="w-full text-xs p-2.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs cursor-pointer"
        >
          <span>Review Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}
