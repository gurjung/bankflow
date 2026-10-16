# BankFlow - Digital Banking Dashboard

A responsive digital banking dashboard built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

BankFlow simulates a digital banking experience where users can view account balances, inspect individual account transactions, search and filter transaction history, and transfer funds between their own accounts with full client-side validation and atomic ledger updates.

**Live Demo**: [https://bankflow-pi.vercel.app/](https://bankflow-pi.vercel.app/)  
**GitHub Repository**: [https://github.com/gurjung/bankflow](https://github.com/gurjung/bankflow)

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing across models and props)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (`useState`, `useMemo`, `useContext`) + React Context API

---

## Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm, pnpm, or yarn

### Installation & Run

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/gurjung/bankflow.git
   cd bankflow
   npm install
   ```

2. Start the local development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Demo Credentials

The login page uses mock client-side authentication:

- **Email**: `gurjung@bankflow.io` (or any valid email format)
- **Password**: Any password (entering `wrongpassword` simulates an authentication failure)

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/             # Mock login page route
│   ├── layout.tsx             # Root layout with AuthProvider & metadata
│   ├── page.tsx               # Main dashboard page (protected by AuthGuard)
│   └── globals.css            # Global styles and Tailwind imports
├── components/
│   ├── accounts/              # Account cards and selection pills
│   ├── auth/                  # LoginForm and AuthGuard wrapper
│   ├── common/                # Navbar, badges, status indicators
│   ├── dashboard/             # Metric cards, quick actions, spending chart
│   ├── transactions/          # Table, filter bars, search, and pagination
│   └── transfer/              # 3-step modal (Form -> Review -> Success)
├── context/
│   └── AuthContext.tsx        # Authentication state & localStorage session sync
├── lib/
│   ├── constants.ts           # Storage keys and shared constants
│   ├── formatter.ts           # Currency and date formatting helpers
│   ├── mockData.ts            # Initial seed data for accounts & transactions
│   ├── transferHelpers.ts     # Transaction record generators
│   ├── transferValidation.ts  # Isolated validation logic for fund transfers
│   ├── uiHelpers.tsx          # Badge styles and status color mappings
│   └── validations.ts         # Login form validation rules
└── types/
    └── index.ts               # Shared TypeScript interfaces and types
```

---

## Architecture & State Management

### 1. In-Memory Dashboard State

Since this is an interactive prototype, account balances and transaction logs live in the top-level `DashboardPage` component state (`accounts` and `transactions`).

- When an internal transfer completes, balances are updated immutably and two matching transaction records (debit from source, credit to destination) are appended to the ledger.
- The `selectedAccountId` state acts as a filter lens across the dashboard, focusing metrics, the category spending breakdown, and the transaction list to the chosen account.

### 2. Derived State with `useMemo`

Rather than keeping duplicate state variables in sync, the dashboard derives key metrics on the fly:

- **Total Balance & Linked Accounts**: Computed directly from the `accounts` array.
- **Monthly Income & Expenses**: Filtered over successful credit/debit records.
- **Category Spending**: Aggregated from debit transactions and mapped to percentage distribution for the spending visualizer.
- **Filtered & Sorted Transactions**: Processed sequentially through search term matching, type/status dropdown filters, column sorting (date/amount), and 5-item-per-page pagination.

### 3. Authentication & Route Protection

- `AuthContext` manages user authentication state and persists session data to `localStorage`.
- The `AuthGuard` higher-order component wraps the dashboard layout. Unauthenticated users are redirected to `/login`, while authenticated users visiting `/login` are automatically redirected to `/`.

---

## Features

- **Account Management**: Displays at least 3 distinct accounts (Salary, Savings, Current) with masked account numbers, types, and real-time balances. Clicking an account filters the entire dashboard to that account's activity.
- **Dashboard Overview**: Summary cards for total combined balance, active accounts count, total monthly income, and total expenses.
- **Category Spending Visualizer**: Breakdown of expense categories with visual progress bars and percentage weights.
- **Transaction History**:
  - Full-text search across descriptions and transaction reference IDs.
  - Multi-select filters for transaction type (`credit` / `debit`) and status (`successful` / `pending` / `failed`).
  - Tri-state column sorting (date ascending/descending and amount ascending/descending).
  - Clean pagination with empty state illustrations when no transactions match.
- **Internal Money Transfer**:
  - Modal-driven 3-step flow: **Enter Details** &rarr; **Review & Confirm** &rarr; **Receipt / Success**.
  - Dynamic source account balance display while entering amounts.
  - Generates realistic reference codes (e.g. `TXN-839201`) and timestamps.
- **Responsive & Accessible**: Fully usable across mobile, tablet, and desktop viewports with responsive navigation, accessible ARIA attributes, and clear error banners.

---

## Transfer Validation & Testing

Validation rules are strictly separated in `src/lib/transferValidation.ts` and tested against the following scenarios:

1. **Same Account Selection**: Selecting the same account for both source and destination triggers an inline error and disables submission.
2. **Zero or Negative Values**: Amounts equal to or less than zero, empty input, or non-numeric characters are blocked with descriptive messaging.
3. **Overdraft / Insufficient Funds**: Attempting to transfer more than the selected source account's available balance triggers an insufficient funds error showing the exact available balance.
4. **State Integrity**:
   - Cancelled transfers make zero mutations to account balances or transaction records.
   - Successful transfers update both accounts simultaneously using functional state updates (`setAccounts(prev => ...)`) to avoid stale state bugs.
   - Two ledger records are created with identical reference numbers, correct account IDs, and matching ISO timestamps.
   - Balances are rounded to two decimal places via `Number(...toFixed(2))` to avoid JavaScript floating-point precision issues.

---

## Assumptions & Limitations

- **Mock Session Persistence**: Auth state uses `localStorage` for convenience during demo sessions; in a production app, this would be backed by secure, HTTP-only session cookies.
- **Client In-Memory Storage**: Transfer mutations persist within the active browser session. Hard-refreshing the browser resets the accounts and transactions back to `mockData.ts` defaults.
- **Single Currency**: All balances and transactions are formatted in Indian Rupees (`₹` / INR) as established in the base mock data.
- **Single-User Scope**: Internal transfers are strictly between accounts owned by the authenticated customer (Salary, Savings, Current). External peer-to-peer or beneficiary routing is omitted by design.

---

## Review Discussion & Technical Q&A

### 1. Why did you choose Server Components and Client Components for specific features?

- **Server Components**: Ideal for static wrappers, root layout shells, and static page metadata where no client-side state, event handlers, or browser APIs are needed. This minimizes the initial JavaScript bundle sent to the client.
- **Client Components (`"use client"`)**: Used for the dashboard root, modals, interactive forms, and filter bars because they require immediate user feedback, state hooks (`useState`, `useMemo`), DOM interactions (smooth scrolling, modal focus traps), and browser storage access (`localStorage`). In a production version with a database, the initial account list and transaction history would be fetched in a Server Component and passed as initial props to interactive client components.

### 2. How do transaction filtering and pagination work?

- Filtering runs inside a memoized pipeline (`useMemo`):
  1. **Search**: Matches the search query against transaction descriptions and reference IDs (case-insensitive).
  2. **Dropdown Filters**: Filters by transaction type (`credit` / `debit`) and transaction status (`successful` / `pending` / `failed`).
  3. **Sorting**: Sorts by timestamp or numerical amount in ascending or descending order.
  4. **Pagination**: Slices the filtered and sorted array based on `currentPage` and `itemsPerPage` (default: 5). Changing any filter or search term automatically resets `currentPage` back to `1` to avoid landing on empty pages.

### 3. How do you prevent invalid transfers from changing account balances?

- Validation is enforced at two stages:
  - **UI / Client Layer**: The transfer modal validates input fields on change and before entering the review step (`validateTransfer`). The confirm button cannot be triggered if errors exist.
  - **Execution Handler**: `handleExecuteTransfer` performs an additional defensive guard check verifying that both accounts exist, the amount is positive, and the source account has sufficient balance before updating state. If validation fails, execution aborts immediately without mutating state.

### 4. How would you prevent race conditions if multiple transfers occurred simultaneously?

In the current client-side implementation, React's functional state updater (`setAccounts(prev => ...)`) guarantees updates operate on the latest state snapshot. In a production backend system, this would be handled with:

- **Database Transactions (ACID)**: Wrap debit, credit, and ledger entries in a single serializable database transaction.
- **Pessimistic Row Locking**: Use `SELECT ... FOR UPDATE` on account rows so simultaneous transactions must wait until the running transaction commits or rolls back.
- **Idempotency Keys**: Assign client-generated idempotency keys (UUIDs) to each transfer request to prevent duplicate processing if users double-click submit or network retries occur.

### 5. How would you replace mock data with a real API?

- Replace local state setters with server communications via Server Actions or standard API endpoints (e.g., using TanStack React Query or SWR).
- Use React Query for caching, automatic background revalidation, and optimistic updates:
  ```ts
  const { data: accounts, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });
  ```
- Use Server Actions or API routes (`POST /api/transfers`) with proper request validation (e.g. Zod) to execute transfers on the server.
- Return standardized API error codes (`INSUFFICIENT_FUNDS`, `ACCOUNT_LOCKED`) and map them directly to UI form errors.

### 6. How would you secure authentication and account access in production?

- **HTTP-Only Cookies**: Store session tokens or JWTs in `Secure`, `HttpOnly`, `SameSite=Strict` cookies to mitigate XSS attacks (instead of `localStorage`).
- **Middleware-Based Route Protection**: Use Next.js `middleware.ts` to inspect the session cookie and redirect unauthenticated requests before the page even renders on the client.
- **Multi-Factor Authentication (MFA)**: Require SMS OTP or authenticator app confirmation for high-risk actions like money transfers or password changes.
- **Rate Limiting & Brute Force Protection**: Implement IP and account-level rate limiting on login attempts and transfer requests using Redis / Upstash.
- **CSRF Tokens**: Enforce CSRF protection on state-modifying requests.
- **Backend Authorization Checks**: Always verify account ownership on the backend; never trust account IDs sent from the client without verifying the session user owns the account.
