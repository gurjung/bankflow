"use client";

import { AuthGuard } from "@/components/auth/AuthGaurd";
import { Navbar } from "@/components/common/Navbar";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/formatter";
import { INITIAL_ACCOUNTS, INITIAL_TRANSACTIONS } from "@/lib/mockData";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  // Total Balance & Linked Accounts
  const totalBalance = useMemo(() => {
    return INITIAL_ACCOUNTS.reduce((sum, acc) => sum + acc.balance, 0);
  }, []);

  const linkedAccountsCount = INITIAL_ACCOUNTS.length;

  //  Monthly Income & Expenses
  const { monthlyIncome, monthlyExpenses } = useMemo(() => {
    let income = 0;
    let expenses = 0;

    for (const txn of INITIAL_TRANSACTIONS) {
      if (txn.status === "successful") {
        if (txn.type === "credit") {
          income = income + txn.amount;
        } else if (txn.type === "debit") {
          expenses = expenses + txn.amount;
        }
      }
    }

    return { monthlyIncome: income, monthlyExpenses: expenses };
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar user={user} onLogout={logout} />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {user?.name || "Customer"}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Here is your financial summary and recent account activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <StatsCard
              title="Total Balance"
              amount={formatCurrency(totalBalance)}
              icon={<Wallet className="w-4 h-4" />}
              badge={`${linkedAccountsCount} linked accounts`}
              variant="default"
            />
            <StatsCard
              title="Monthly Income"
              amount={`+${formatCurrency(monthlyIncome)}`}
              icon={<TrendingUp className="w-4 h-4" />}
              subtitle="Total incoming funds this month"
              variant="income"
            />
            <StatsCard
              title="Monthly Expenses"
              amount={`-${formatCurrency(monthlyExpenses)}`}
              icon={<TrendingDown className="w-4 h-4" />}
              subtitle="Total outgoing debits this month"
              variant="expense"
            />
          </div>

          <QuickActions />
        </main>
      </div>
    </AuthGuard>
  );
}
