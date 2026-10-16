import React from "react";
import { Account } from "@/types";
import { formatCurrency, maskAccountNumber } from "@/lib/formatter";

interface TransferReviewStepProps {
  sourceAccount?: Account;
  destAccount?: Account;
  numericAmount: number;
  note: string;
  onBack: () => void;
  onConfirm: () => void;
}

export function TransferReviewStep(props: TransferReviewStepProps) {
  const { sourceAccount, destAccount, numericAmount, note, onBack, onConfirm } =
    props;
  return (
    <div className="space-y-4">
      {/* Review Summary Card */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3 text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
          <span className="text-slate-500">Transfer Amount</span>
          <span className="text-base font-extrabold text-slate-900">
            {formatCurrency(numericAmount)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">From</span>
          <span className="font-semibold text-slate-800 text-right">
            {sourceAccount?.name} (
            {maskAccountNumber(sourceAccount?.accountNumber || "")})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">To</span>
          <span className="font-semibold text-slate-800 text-right">
            {destAccount?.name} (
            {maskAccountNumber(destAccount?.accountNumber || "")})
          </span>
        </div>
        {note.trim() && (
          <div className="flex justify-between">
            <span className="text-slate-500">Note</span>
            <span className="text-slate-700 text-right italic">
              {note.trim()}
            </span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-slate-200 text-slate-400">
          <span>Transfer Fee</span>
          <span className="text-emerald-600 font-semibold">₹0.00 (Free)</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs cursor-pointer"
        >
          Confirm & Transfer
        </button>
      </div>
    </div>
  );
}
