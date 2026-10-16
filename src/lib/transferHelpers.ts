import { Account, Transaction } from "@/types";

interface CreateTransferParams {
  sourceAccount: Account;
  destAccount: Account;
  amount: number;
  note?: string;
  refNo: string;
  nowIso: string;
}

export function createTransferTransactionRecords(
  props: CreateTransferParams,
): [Transaction, Transaction] {
  const { sourceAccount, destAccount, amount, note, refNo, nowIso } = props;

  const debitTxn: Transaction = {
    id: `txn_${Date.now()}_dr`,
    accountId: sourceAccount.id,
    description: `Transfer to ${destAccount.name}${note ? ` - ${note}` : ""}`,
    amount,
    type: "debit",
    status: "successful",
    date: nowIso,
    referenceNumber: refNo,
    category: "Transfer",
  };

  const creditTxn: Transaction = {
    id: `txn_${Date.now()}_cr`,
    accountId: destAccount.id,
    description: `Transfer from ${sourceAccount.name}${note ? ` - ${note}` : ""}`,
    amount,
    type: "credit",
    status: "successful",
    date: nowIso,
    referenceNumber: refNo,
    category: "Transfer",
  };

  return [debitTxn, creditTxn];
}
