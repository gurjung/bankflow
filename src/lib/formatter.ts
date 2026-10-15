/**
 * Format a number into INR (Indian Rupee) currency format (e.g. ₹12,450.00 or ₹1,50,000.00)
 */
export function formatCurrency(
  amount: number,
  currency: string = "INR",
): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return isoString;
  }
}

export function maskAccountNumber(accountNumber: string): string {
  if (!accountNumber) return "•••• 0000";
  const clean = accountNumber.replace(/\s+/g, "");
  const last4 = clean.slice(-4);
  return `•••• ${last4}`;
}
