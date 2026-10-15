export interface User {
  id: string;
  name: string;
  email: string;
}

export type AccountType = "Savings" | "Current" | "Salary";

export interface Account {
  id: string;
  name: string;
  accountNumber: string;
  accountType: AccountType;
  balance: number;
}

export type TransactionType = "credit" | "debit";
export type TransactionStatus = "successful" | "pending" | "failed";

export interface Transaction {
  id: string;
  accountId: string;
  description: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  date: string;
  category: string;
  referenceNumber: string;
}
