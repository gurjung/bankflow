import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TransactionPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function TransactionPagination(props: TransactionPaginationProps) {
  const { currentPage, totalPages, totalCount, itemsPerPage, onPageChange } =
    props;

  if (totalCount === 0) return null;

  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
      <div>
        Showing{" "}
        <span className="font-semibold text-slate-800">{startRecord}</span> to{" "}
        <span className="font-semibold text-slate-800">{endRecord}</span> of{" "}
        <span className="font-semibold text-slate-800">{totalCount}</span>{" "}
        transactions
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          aria-label="Go to previous page"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <span className="px-2 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          aria-label="Go to next page"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
