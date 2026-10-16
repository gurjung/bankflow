import React from "react";
import { Account } from "@/types";
import { formatCurrency } from "@/lib/formatter";
import { CheckCircle2 } from "lucide-react";

interface TransferSuccessStepProps {
  destAccount?: Account;
  numericAmount: number;
  completedRef: string;
  onDone: () => void;
}

export function TransferSuccessStep(props: TransferSuccessStepProps) {
  const { destAccount, numericAmount, completedRef, onDone } = props;

  return (
    <div className="text-center py-4 space-y-4">
      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-7 h-7" />
      </div>
      <div>
        <h3 className="font-bold text-base text-slate-900">
          Transfer Successful!
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Successfully transferred{" "}
          <strong className="text-slate-800">
            {formatCurrency(numericAmount)}
          </strong>{" "}
          to <strong className="text-slate-800">{destAccount?.name}</strong>.
        </p>
        <p className="text-[11px] font-mono text-slate-400 mt-2 bg-slate-50 py-1 px-3 rounded-lg inline-block">
          Ref: {completedRef}
        </p>
      </div>
      <button
        type="button"
        onClick={onDone}
        className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
      >
        Done
      </button>
    </div>
  );
}
