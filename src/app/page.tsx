"use client";

import { AccountList } from "@/components/accounts/AccountList";
import { AuthGuard } from "@/components/auth/AuthGaurd";
import { Navbar } from "@/components/common/Navbar";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import {
  CategorySpendingItem,
  SpendingChart,
} from "@/components/dashboard/SpendingChart";
import { TransactionHistory } from "@/components/transactions/TransactionHistory";
import { TransferModal } from "@/components/transfer/TransferModal";
import { useAuth } from "@/context/AuthContext";
import { INITIAL_ACCOUNTS, INITIAL_TRANSACTIONS } from "@/lib/mockData";
import { createTransferTransactionRecords } from "@/lib/transferHelpers";
import { Account, Transaction } from "@/types";
import { useMemo, useState } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] =
    useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const [isTransferOpen, setIsTransferOpen] = useState(false);

  // Total Balance & Linked Accounts
  const totalBalance = useMemo(() => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }, [accounts]);

  const selectedAccount = useMemo(() => {
    return accounts.find((acc) => acc.id === selectedAccountId);
  }, [accounts, selectedAccountId]);

  //  Monthly Income & Expenses
  const { monthlyIncome, monthlyExpenses } = useMemo(() => {
    let income = 0;
    let expenses = 0;

    for (const txn of transactions) {
      if (txn.status === "successful") {
        if (txn.type === "credit") {
          income = income + txn.amount;
        } else if (txn.type === "debit") {
          expenses = expenses + txn.amount;
        }
      }
    }

    return { monthlyIncome: income, monthlyExpenses: expenses };
  }, [transactions, selectedAccountId]);

  const displayedTransactions = useMemo(() => {
    const list = selectedAccountId
      ? transactions.filter((txn) => txn.accountId === selectedAccountId)
      : transactions;

    return [...list].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [transactions, selectedAccountId]);

  const categorySpending: CategorySpendingItem[] = useMemo(() => {
    const expenseMap: Record<string, number> = {};

    for (const txn of displayedTransactions) {
      if (txn.type === "debit" && txn.status === "successful") {
        expenseMap[txn.category] = (expenseMap[txn.category] || 0) + txn.amount;
      }
    }

    return Object.entries(expenseMap)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage:
          monthlyExpenses > 0
            ? Math.round((amount / monthlyExpenses) * 100)
            : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [displayedTransactions, monthlyExpenses]);

  const handleScrollToHistory = () => {
    document
      .getElementById("transaction-history")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  //

  const handleExecuteTransfer = ({
    sourceAccountId,
    destinationAccountId,
    amount,
    note,
  }: {
    sourceAccountId: string;
    destinationAccountId: string;
    amount: number;
    note?: string;
  }): string => {
    const sourceAcc = accounts.find((a) => a.id === sourceAccountId);
    const destAcc = accounts.find((a) => a.id === destinationAccountId);
    if (!sourceAcc || !destAcc || amount <= 0 || amount > sourceAcc.balance)
      return "";

    const refNo = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowIso = new Date().toISOString();

    // Deduct from source and credit to destination atomically
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === sourceAccountId)
          return { ...acc, balance: Number((acc.balance - amount).toFixed(2)) };
        if (acc.id === destinationAccountId)
          return { ...acc, balance: Number((acc.balance + amount).toFixed(2)) };
        return acc;
      }),
    );

    // Create corresponding debit and credit records
    const [debitTxn, creditTxn] = createTransferTransactionRecords({
      sourceAccount: sourceAcc,
      destAccount: destAcc,
      amount,
      note,
      refNo,
      nowIso,
    });

    setTransactions((prev) => [debitTxn, creditTxn, ...prev]);
    return refNo;
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar user={user} onLogout={logout} />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Dashboard Header & Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome back, {user?.name || "Customer"}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Here is your financial summary and recent account activities.
              </p>
            </div>
            <QuickActions
              onTransferClick={() => setIsTransferOpen(true)}
              onHistoryClick={handleScrollToHistory}
            />
          </div>

          <DashboardMetrics
            totalBalance={totalBalance}
            linkedAccountsCount={accounts.length}
            monthlyIncome={monthlyIncome}
            monthlyExpenses={monthlyExpenses}
            selectedAccount={selectedAccount}
          />

          <AccountList
            accounts={accounts}
            selectedAccountId={selectedAccountId}
            onSelectAccount={setSelectedAccountId}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 flex flex-col">
              <SpendingChart
                categories={categorySpending}
                totalExpenses={monthlyExpenses}
              />
            </div>

            <div className="lg:col-span-2 flex flex-col">
              <RecentTransactions
                transactions={displayedTransactions}
                maxDisplay={5}
                selectedAccountName={selectedAccount?.name}
              />
            </div>
          </div>

          <TransactionHistory
            transactions={displayedTransactions}
            selectedAccountName={selectedAccount?.name}
          />

          <TransferModal
            isOpen={isTransferOpen}
            onClose={() => setIsTransferOpen(false)}
            accounts={accounts}
            onTransfer={handleExecuteTransfer}
          />
        </main>
      </div>
    </AuthGuard>
  );
}
