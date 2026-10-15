import React from "react";
import { AccountType, TransactionType } from "@/types";
import {
  Landmark,
  PiggyBank,
  CreditCard,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

export type StatCardVariant = "default" | "income" | "expense";

export function getAccountBadgeStyle(type: AccountType): string {
  switch (type) {
    case "Salary":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Savings":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Current":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
}

export function getAccountIcon(type: AccountType): React.ReactNode {
  switch (type) {
    case "Salary":
      return <Landmark className="w-4 h-4 text-blue-600" />;
    case "Savings":
      return <PiggyBank className="w-4 h-4 text-emerald-600" />;
    case "Current":
      return <CreditCard className="w-4 h-4 text-purple-600" />;
  }
}

export function getStatCardStyle(variant: StatCardVariant = "default") {
  switch (variant) {
    case "income":
      return {
        iconBg: "bg-emerald-50 text-emerald-600",
        amountColor: "text-emerald-600",
      };
    case "expense":
      return {
        iconBg: "bg-rose-50 text-rose-600",
        amountColor: "text-slate-900",
      };
    default:
      return {
        iconBg: "bg-indigo-50 text-indigo-600",
        amountColor: "text-slate-900",
      };
  }
}

export function getTransactionTypeMeta(type: TransactionType) {
  const isCredit = type === "credit";
  return {
    isCredit,
    icon: isCredit ? (
      <ArrowDownRight className="w-3.5 h-3.5" />
    ) : (
      <ArrowUpRight className="w-3.5 h-3.5" />
    ),
    badgeBg: isCredit
      ? "bg-emerald-50 text-emerald-600"
      : "bg-slate-100 text-slate-600",
    amountColor: isCredit ? "text-emerald-600" : "text-slate-900",
    prefix: isCredit ? "+" : "-",
  };
}
