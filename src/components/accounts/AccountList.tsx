import React from "react";
import { Account } from "@/types";
import { AccountCard } from "./AccountCard";
import { Layers } from "lucide-react";

interface AccountListProps {
  accounts: Account[];
  selectedAccountId: string | null;
  onSelectAccount: (accountId: string | null) => void;
}

export function AccountList(props: AccountListProps) {
  const { accounts, selectedAccountId, onSelectAccount } = props;
  return (
    <section aria-labelledby="accounts-section-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="accounts-section-heading"
            className="text-base font-bold text-slate-900"
          >
            Linked Accounts
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select an account to inspect its transactions and spending breakdown
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectAccount(null)}
          aria-pressed={selectedAccountId === null}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            selectedAccountId === null
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5" aria-hidden="true" />
          <span>All Accounts</span>
        </button>
      </div>

      <ul
        role="list"
        aria-label="Linked accounts list"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
      >
        {accounts.map((account) => {
          const isSelected = selectedAccountId === account.id;
          return (
            <li key={account.id} className="flex">
              <AccountCard
                account={account}
                isSelected={isSelected}
                onSelect={() => {
                  onSelectAccount(isSelected ? null : account.id);
                }}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
