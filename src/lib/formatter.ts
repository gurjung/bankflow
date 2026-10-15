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
