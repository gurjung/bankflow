import React from "react";
import { ArrowRightLeft, History } from "lucide-react";

interface QuickActionsProps {
  onTransferClick?: () => void;
  onHistoryClick?: () => void;
}

export function QuickActions(props: QuickActionsProps) {
  const { onTransferClick, onHistoryClick } = props;
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Quick Actions
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onTransferClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium transition-colors shadow-sm cursor-pointer"
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Transfer Money</span>
        </button>
        <button
          type="button"
          onClick={onHistoryClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors cursor-pointer"
        >
          <History className="w-4 h-4" />
          <span>Transaction History</span>
        </button>
      </div>
    </div>
  );
}
