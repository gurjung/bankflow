import React from "react";
import { Search, X, RotateCcw } from "lucide-react";

interface TransactionFiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  isDropdownFilterActive: boolean;
  onResetDropdownFilters: () => void;
}

export function TransactionFiltersBar(props: TransactionFiltersBarProps) {
  const {
    search,
    onSearchChange,
    typeFilter,
    onTypeChange,
    statusFilter,
    onStatusChange,
    isDropdownFilterActive,
    onResetDropdownFilters,
  } = props;
  return (
    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3.5 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Search Box */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <div
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
            aria-hidden="true"
          >
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search description or ref no..."
            aria-label="Search transactions by description or reference number"
            className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Type Filter */}
        <div>
          <select
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
            aria-label="Filter by transaction type"
            className="w-full py-2 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer transition-colors"
          >
            <option value="all">All Types (Credit & Debit)</option>
            <option value="credit">Money In (Credit)</option>
            <option value="debit">Money Out (Debit)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter by transaction status"
            className="w-full py-2 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Reset active dropdown filters button */}
      {isDropdownFilterActive && (
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-slate-500 font-medium">
            Dropdown filters are active
          </span>
          <button
            type="button"
            onClick={onResetDropdownFilters}
            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
