"use client";

import React, { useState } from "react";
import { Account } from "@/types";
import { TransferFormStep } from "./TransferFormStep";
import { TransferReviewStep } from "./TransferReviewStep";
import { TransferSuccessStep } from "./TransferSuccessStep";
import { validateTransfer, TransferErrors } from "@/lib/transferValidation";
import { X, ArrowRightLeft } from "lucide-react";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  onTransfer: (data: {
    sourceAccountId: string;
    destinationAccountId: string;
    amount: number;
    note?: string;
  }) => string;
}

export function TransferModal(props: TransferModalProps) {
  const { isOpen, onClose, accounts, onTransfer } = props;

  const [sourceId, setSourceId] = useState(accounts[0]?.id || "");
  const [destId, setDestId] = useState(accounts[1]?.id || "");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const [step, setStep] = useState<"form" | "review" | "success">("form");
  const [errors, setErrors] = useState<TransferErrors>({});
  const [completedRef, setCompletedRef] = useState("");

  if (!isOpen) return null;

  const sourceAccount = accounts.find((a) => a.id === sourceId);
  const destAccount = accounts.find((a) => a.id === destId);
  const numericAmount = parseFloat(amount);

  // Validate before proceeding to review step
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateTransfer({
      sourceId,
      destId,
      amount,
      sourceAccount,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStep("review");
  };

  // Execute transfer after user confirmation
  const handleConfirmTransfer = () => {
    if (
      !sourceAccount ||
      !destAccount ||
      isNaN(numericAmount) ||
      numericAmount <= 0
    )
      return;

    const refNo = onTransfer({
      sourceAccountId: sourceId,
      destinationAccountId: destId,
      amount: numericAmount,
      note: note.trim() || undefined,
    });

    setCompletedRef(refNo);
    setStep("success");
  };

  const handleClose = () => {
    setStep("form");
    setAmount("");
    setNote("");
    setErrors({});
    setCompletedRef("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="transfer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <h2
              id="transfer-modal-title"
              className="font-bold text-base text-slate-900"
            >
              {step === "review"
                ? "Review Transfer"
                : step === "success"
                  ? "Transfer Receipt"
                  : "Transfer Money"}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close transfer modal"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* multistep form */}
        <div className="p-6 overflow-y-auto">
          {step === "form" && (
            <TransferFormStep
              accounts={accounts}
              sourceId={sourceId}
              destId={destId}
              amount={amount}
              note={note}
              errors={errors}
              onSourceChange={(id) => {
                setSourceId(id);
                setErrors((prev) => ({
                  ...prev,
                  source: undefined,
                  dest: undefined,
                }));
              }}
              onDestChange={(id) => {
                setDestId(id);
                setErrors((prev) => ({ ...prev, dest: undefined }));
              }}
              onAmountChange={(val) => {
                setAmount(val);
                setErrors((prev) => ({ ...prev, amount: undefined }));
              }}
              onNoteChange={setNote}
              onSubmit={handleProceedToReview}
              onCancel={handleClose}
            />
          )}

          {step === "review" && (
            <TransferReviewStep
              sourceAccount={sourceAccount}
              destAccount={destAccount}
              numericAmount={numericAmount}
              note={note}
              onBack={() => setStep("form")}
              onConfirm={handleConfirmTransfer}
            />
          )}

          {step === "success" && (
            <TransferSuccessStep
              destAccount={destAccount}
              numericAmount={numericAmount}
              completedRef={completedRef}
              onDone={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
