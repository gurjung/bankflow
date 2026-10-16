import { Account } from "@/types";
import { formatCurrency } from "./formatter";

export interface TransferErrors {
  source?: string;
  dest?: string;
  amount?: string;
}

export interface TransferValidationInterface {
  sourceId: string;
  destId: string;
  amount: string;
  sourceAccount?: Account;
}

export function validateTransfer(props: TransferValidationInterface): {
  isValid: boolean;
  errors: TransferErrors;
} {
  const { sourceId, destId, amount, sourceAccount } = props;
  const errors: TransferErrors = {};
  const numericAmount = Number(amount);

  if (!sourceId) {
    errors.source = "Please select a source account.";
  }

  if (!destId) {
    errors.dest = "Please select a destination account.";
  } else if (sourceId === destId) {
    errors.dest = "Destination account must be different from source account.";
  }

  if (!amount.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    errors.amount = "Please enter a valid transfer amount greater than ₹0.";
  } else if (sourceAccount && numericAmount > sourceAccount.balance) {
    errors.amount = `Insufficient funds. Available balance is ${formatCurrency(
      sourceAccount.balance,
    )}.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
