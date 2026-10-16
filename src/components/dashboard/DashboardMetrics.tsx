import React from "react";
import { Account } from "@/types";
import { formatCurrency } from "@/lib/formatter";
import { StatsCard } from "./StatsCard";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

interface DashboardMetricsProps {
  totalBalance: number;
  linkedAccountsCount: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  selectedAccount?: Account;
}

export function DashboardMetrics(props: DashboardMetricsProps) {
  const {
    totalBalance,
    linkedAccountsCount,
    monthlyIncome,
    monthlyExpenses,
    selectedAccount,
  } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      <StatsCard
        title="Total Balance"
        amount={formatCurrency(totalBalance)}
        icon={<Wallet className="w-4 h-4" />}
        badge={`${linkedAccountsCount} linked accounts`}
        variant="default"
      />
      <StatsCard
        title={
          selectedAccount
            ? `${selectedAccount.accountType} Income`
            : "Monthly Income"
        }
        amount={`+${formatCurrency(monthlyIncome)}`}
        icon={<TrendingUp className="w-4 h-4" />}
        subtitle={
          selectedAccount
            ? `Incoming funds to ${selectedAccount.name}`
            : "Total incoming funds this month"
        }
        variant="income"
      />
      <StatsCard
        title={
          selectedAccount
            ? `${selectedAccount.accountType} Expenses`
            : "Monthly Expenses"
        }
        amount={`-${formatCurrency(monthlyExpenses)}`}
        icon={<TrendingDown className="w-4 h-4" />}
        subtitle={
          selectedAccount
            ? `Outgoing debits from ${selectedAccount.name}`
            : "Total outgoing debits this month"
        }
        variant="expense"
      />
    </div>
  );
}
