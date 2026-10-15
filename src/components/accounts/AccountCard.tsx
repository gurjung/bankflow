import React from "react";
import { Account } from "@/types";
import { formatCurrency, maskAccountNumber } from "@/lib/formatter";
import { getAccountBadgeStyle, getAccountIcon } from "@/lib/uiHelpers";
import { Check } from "lucide-react";

interface AccountCardProps {
  account: Account;
  isSelected: boolean;
  onSelect: () => void;
}

export function AccountCard(props: AccountCardProps) {
  const { account, isSelected, onSelect } = props;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`text-left p-5 rounded-2xl border transition-all duration-200 relative cursor-pointer w-full flex flex-col justify-between ${
        isSelected
          ? "bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-md"
          : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      {isSelected && (
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs"
        >
          <Check className="w-3 h-3 stroke-[3]" />
        </span>
      )}

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100"
          >
            {getAccountIcon(account.accountType)}
          </span>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getAccountBadgeStyle(
              account.accountType,
            )}`}
          >
            {account.accountType}
          </span>
        </div>

        <p className="font-bold text-sm text-slate-900 tracking-tight line-clamp-1">
          {account.name}
        </p>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          {maskAccountNumber(account.accountNumber)}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Available
        </span>
        <span className="text-lg font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(account.balance)}
        </span>
      </div>
    </button>
  );
}
