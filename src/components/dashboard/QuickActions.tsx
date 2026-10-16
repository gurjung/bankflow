import React from "react";
import { ArrowRightLeft, History } from "lucide-react";

interface QuickActionsProps {
  onTransferClick?: () => void;
  onHistoryClick?: () => void;
}

export function QuickActions(props: QuickActionsProps) {
  const { onTransferClick, onHistoryClick } = props;
  return (
    <nav
      aria-label="Quick banking actions"
      className="flex items-center justify-center sm:justify-end gap-2.5 w-full sm:w-auto"
    >
      <button
        type="button"
        onClick={onTransferClick}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium transition-colors shadow-sm cursor-pointer"
      >
        <ArrowRightLeft className="w-4 h-4" aria-hidden="true" />
        <span>Transfer Money</span>
      </button>
      <button
        type="button"
        onClick={onHistoryClick}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors cursor-pointer"
      >
        <History className="w-4 h-4" aria-hidden="true" />
        <span>Transaction History</span>
      </button>
    </nav>
  );
}
