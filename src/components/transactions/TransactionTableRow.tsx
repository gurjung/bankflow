import React from "react";
import { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/lib/formatter";
import {
  getTransactionTypeMeta,
  getTransactionStatusBadge,
} from "@/lib/uiHelpers";

interface TransactionTableRowProps {
  transaction: Transaction;
}

export function TransactionTableRow({ transaction }: TransactionTableRowProps) {
  const { icon, badgeBg, amountColor, prefix } = getTransactionTypeMeta(
    transaction.type,
  );
  const statusBadgeStyle = getTransactionStatusBadge(transaction.status);

  return (
    <tr className="hover:bg-slate-50/70 transition-colors">
      {/* Description & Type Icon */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${badgeBg}`}
            aria-hidden="true"
          >
            {icon}
          </div>
          <span className="font-semibold text-slate-800 line-clamp-1">
            {transaction.description}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="py-3.5 px-3">
        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[11px]">
          {transaction.category}
        </span>
      </td>

      {/* Date */}
      <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
        <time dateTime={transaction.date}>{formatDate(transaction.date)}</time>
      </td>

      {/* Reference Number */}
      <td className="py-3.5 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
        {transaction.referenceNumber}
      </td>

      {/* Status Badge */}
      <td className="py-3.5 px-3 whitespace-nowrap">
        <span
          className={`inline-block px-2 py-0.5 rounded-full border text-[11px] font-semibold capitalize ${statusBadgeStyle}`}
        >
          {transaction.status}
        </span>
      </td>

      {/* Amount */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        <span className={`font-bold ${amountColor}`}>
          {prefix}
          {formatCurrency(transaction.amount)}
        </span>
      </td>
    </tr>
  );
}
