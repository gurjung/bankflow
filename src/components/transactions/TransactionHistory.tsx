"use client";

import React, { useState, useMemo } from "react";
import { Transaction } from "@/types";
import { TransactionFiltersBar } from "./TransactionFiltersBar";
import { TransactionTable } from "./TransactionTable";
import { TransactionPagination } from "./TransactionPagination";

interface TransactionHistoryProps {
  transactions: Transaction[];
  selectedAccountName?: string;
}

export function TransactionHistory(props: TransactionHistoryProps) {
  const { transactions, selectedAccountName } = props;

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<"date" | "amount" | null>(null);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Filter change handlers
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: string) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // sorting cycle: desc -> asc -> null
  const handleSort = (field: "date" | "amount") => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortOrder("asc");
    } else {
      setSortField(null);
      setSortOrder(null);
    }
    setCurrentPage(1);
  };

  // Reset only dropdown filters
  const handleResetDropdownFilters = () => {
    setTypeFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const isDropdownFilterActive = typeFilter !== "all" || statusFilter !== "all";

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return transactions.filter((txn) => {
      const matchesSearch =
        query === "" ||
        txn.description.toLowerCase().includes(query) ||
        txn.referenceNumber.toLowerCase().includes(query);

      const matchesType = typeFilter === "all" || txn.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || txn.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [transactions, search, typeFilter, statusFilter]);

  // Sorted filtered transactions
  const sortedTransactions = useMemo(() => {
    const list = [...filteredTransactions];

    if (sortField && sortOrder) {
      list.sort((a, b) => {
        if (sortField === "date") {
          const timeA = new Date(a.date).getTime();
          const timeB = new Date(b.date).getTime();
          return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
        }
        if (sortField === "amount") {
          return sortOrder === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount;
        }
        return 0;
      });
    }

    return list;
  }, [filteredTransactions, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(sortedTransactions.length / itemsPerPage),
  );
  const validPage = Math.min(currentPage, totalPages);

  const paginatedTransactions = useMemo(() => {
    const start = (validPage - 1) * itemsPerPage;
    return sortedTransactions.slice(start, start + itemsPerPage);
  }, [sortedTransactions, validPage, itemsPerPage]);

  return (
    <section
      id="transaction-history"
      aria-labelledby="transaction-history-heading"
      className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5"
    >
      {/* Section Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2
            id="transaction-history-heading"
            className="text-lg font-bold text-slate-900 tracking-tight"
          >
            Transaction History
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {selectedAccountName
              ? `Showing filtered records for ${selectedAccountName}`
              : "Search, filter, and inspect records across all linked accounts"}
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 self-start sm:self-auto">
          {sortedTransactions.length} records found
        </span>
      </header>

      {/* Filter and Search Bar Component */}
      <TransactionFiltersBar
        search={search}
        onSearchChange={handleSearchChange}
        typeFilter={typeFilter}
        onTypeChange={handleTypeChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        isDropdownFilterActive={isDropdownFilterActive}
        onResetDropdownFilters={handleResetDropdownFilters}
      />

      {/* Sortable Table Component */}
      <TransactionTable
        transactions={paginatedTransactions}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        isDropdownFilterActive={isDropdownFilterActive}
        hasSearchText={search.trim() !== ""}
        onResetDropdownFilters={handleResetDropdownFilters}
      />

      {/* Pagination Component */}
      <TransactionPagination
        currentPage={validPage}
        totalPages={totalPages}
        totalCount={sortedTransactions.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
