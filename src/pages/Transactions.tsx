import { useMemo, useState } from "react";
import type { Page } from "../App";
import { useBanking } from "../BankingContext";

interface TransactionsProps {
onNavigate?: (page: Page) => void;
}

function formatCurrency(amount: number) {
return amount.toLocaleString("en-US", {
style: "currency",
currency: "USD",
minimumFractionDigits: 2,
});
}

function Transactions({
onNavigate,
}: TransactionsProps) {
const {
accounts,
transactions,
showBalance,
setShowBalance,
} = useBanking();

const [search, setSearch] =
useState("");

const [filter, setFilter] =
useState<"all" | "incoming" | "outgoing">(
"all"
);

const [selectedAccount, setSelectedAccount] =
useState("all");

const [selectedTransaction, setSelectedTransaction] =
useState<string | null>(null);

const filteredTransactions = useMemo(() => {
const query =
search.trim().toLowerCase();


return transactions.filter(
  (transaction) => {
    const matchesSearch =
      !query ||
      transaction.merchant
        .toLowerCase()
        .includes(query) ||
      transaction.description
        .toLowerCase()
        .includes(query) ||
      transaction.reference
        ?.toLowerCase()
        .includes(query);

    const matchesFilter =
      filter === "all" ||
      (filter === "incoming" &&
        transaction.amount > 0) ||
      (filter === "outgoing" &&
        transaction.amount < 0);

    const matchesAccount =
      selectedAccount === "all" ||
      transaction.accountId ===
        selectedAccount;

    return (
      matchesSearch &&
      matchesFilter &&
      matchesAccount
    );
  }
);

}, [
transactions,
search,
filter,
selectedAccount,
]);

const selectedTransactionData =
transactions.find(
(transaction) =>
transaction.id ===
selectedTransaction
);

const incomingTotal = useMemo(() => {
return transactions
.filter(
(transaction) =>
transaction.amount > 0
)
.reduce(
(total, transaction) =>
total + transaction.amount,
0
);
}, [transactions]);

const outgoingTotal = useMemo(() => {
return transactions
.filter(
(transaction) =>
transaction.amount < 0
)
.reduce(
(total, transaction) =>
total +
Math.abs(transaction.amount),
0
);
}, [transactions]);

function getAccountName(
accountId?: string
) {
if (!accountId) {
return "GFB Account";
}

return (
  accounts.find(
    (account) =>
      account.id === accountId
  )?.name ?? "GFB Account"
);


}

return ( <section className="transactions-page"> <div className="transactions-header"> <div> <p className="eyebrow">
ACTIVITY </p>

      <h1>Transactions</h1>

      <p className="page-description">
        Review your recent Guardian Federal Bank
        account activity and payment history.
      </p>
    </div>

    <button
      type="button"
      className="secondary-button"
      onClick={() =>
        setShowBalance(!showBalance)
      }
    >
      {showBalance
        ? "Hide amounts"
        : "Show amounts"}
    </button>
  </div>

  <div className="transaction-summary-grid">
    <div className="transaction-summary-card">
      <div className="transaction-summary-icon incoming">
        ↑
      </div>

      <div>
        <span>Money received</span>

        <strong>
          {showBalance
            ? formatCurrency(
                incomingTotal
              )
            : "••••••"}
        </strong>
      </div>
    </div>

    <div className="transaction-summary-card">
      <div className="transaction-summary-icon outgoing">
        ↓
      </div>

      <div>
        <span>Money sent</span>

        <strong>
          {showBalance
            ? formatCurrency(
                outgoingTotal
              )
            : "••••••"}
        </strong>
      </div>
    </div>

    <div className="transaction-summary-card">
      <div className="transaction-summary-icon neutral">
        #
      </div>

      <div>
        <span>Total transactions</span>

        <strong>
          {transactions.length}
        </strong>
      </div>
    </div>
  </div>

  <div className="transactions-toolbar">
    <div className="transaction-search">
      <span className="transaction-search-icon">
        ⌕
      </span>

      <input
        type="search"
        value={search}
        onChange={(event) =>
          setSearch(
            event.target.value
          )
        }
        placeholder="Search transactions..."
        aria-label="Search transactions"
      />

      {search && (
        <button
          type="button"
          className="transaction-search-clear"
          onClick={() =>
            setSearch("")
          }
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>

    <select
      value={selectedAccount}
      onChange={(event) =>
        setSelectedAccount(
          event.target.value
        )
      }
      aria-label="Filter by account"
    >
      <option value="all">
        All accounts
      </option>

      {accounts.map((account) => (
        <option
          key={account.id}
          value={account.id}
        >
          {account.name}
        </option>
      ))}
    </select>
  </div>

  <div className="transaction-filter-bar">
    <button
      type="button"
      className={
        filter === "all"
          ? "active"
          : ""
      }
      onClick={() =>
        setFilter("all")
      }
    >
      All
    </button>

    <button
      type="button"
      className={
        filter === "incoming"
          ? "active"
          : ""
      }
      onClick={() =>
        setFilter("incoming")
      }
    >
      Money in
    </button>

    <button
      type="button"
      className={
        filter === "outgoing"
          ? "active"
          : ""
      }
      onClick={() =>
        setFilter("outgoing")
      }
    >
      Money out
    </button>
  </div>

  <div className="transactions-list-panel">
    <div className="transactions-list-header">
      <div>
        <p className="eyebrow">
          ACCOUNT ACTIVITY
        </p>

        <h2>
          Recent transactions
        </h2>
      </div>

      <span>
        {filteredTransactions.length} result
        {filteredTransactions.length ===
        1
          ? ""
          : "s"}
      </span>
    </div>

    {filteredTransactions.length === 0 ? (
      <div className="transactions-empty">
        <div>⌕</div>

        <strong>
          No transactions found
        </strong>

        <span>
          Try changing your search or
          transaction filters.
        </span>

        {(search ||
          filter !== "all" ||
          selectedAccount !==
            "all") && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              setSearch("");
              setFilter("all");
              setSelectedAccount(
                "all"
              );
            }}
          >
            Clear filters
          </button>
        )}
      </div>
    ) : (
      <div className="transactions-table">
        {filteredTransactions.map(
          (transaction) => {
            const isIncoming =
              transaction.amount > 0;

            return (
              <button
                type="button"
                className="transaction-row"
                key={transaction.id}
                onClick={() =>
                  setSelectedTransaction(
                    transaction.id
                  )
                }
              >
                <div
                  className={`transaction-icon ${
                    isIncoming
                      ? "incoming"
                      : "outgoing"
                  }`}
                >
                  {isIncoming
                    ? "↑"
                    : "↓"}
                </div>

                <div className="transaction-main">
                  <strong>
                    {transaction.merchant}
                  </strong>

                  <span>
                    {transaction.description}
                  </span>
                </div>

                <div className="transaction-account">
                  <span>
                    Account
                  </span>

                  <strong>
                    {getAccountName(
                      transaction.accountId
                    )}
                  </strong>
                </div>

                <div className="transaction-date">
                  <span>
                    Date
                  </span>

                  <strong>
                    {transaction.date}
                  </strong>
                </div>

                <strong
                  className={`transaction-amount ${
                    isIncoming
                      ? "incoming"
                      : "outgoing"
                  }`}
                >
                  {showBalance
                    ? `${
                        isIncoming
                          ? "+"
                          : "-"
                      }${formatCurrency(
                        Math.abs(
                          transaction.amount
                        )
                      )}`
                    : "••••••"}
                </strong>

                <span className="transaction-chevron">
                  ›
                </span>
              </button>
            );
          }
        )}
      </div>
    )}
  </div>

  <div className="transactions-security-banner">
    <div className="transactions-security-icon">
      ✓
    </div>

    <div>
      <strong>
        Review your activity regularly
      </strong>

      <span>
        If you notice a transaction you don't
        recognize, contact Guardian Federal Bank
        support immediately.
      </span>
    </div>

    <button
      type="button"
      className="secondary-button"
      onClick={() =>
        onNavigate?.("settings")
      }
    >
      Security settings
    </button>
  </div>

  {selectedTransactionData && (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={() =>
        setSelectedTransaction(null)
      }
    >
      <div
        className="modal transaction-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-detail-title"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="transaction-detail-header">
          <div>
            <p className="eyebrow">
              TRANSACTION DETAILS
            </p>

            <h2 id="transaction-detail-title">
              {
                selectedTransactionData.merchant
              }
            </h2>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={() =>
              setSelectedTransaction(null)
            }
            aria-label="Close transaction details"
          >
            ×
          </button>
        </div>

        <div className="transaction-detail-amount">
          <span>
            {selectedTransactionData.amount >
            0
              ? "Money received"
              : "Money sent"}
          </span>

          <strong
            className={
              selectedTransactionData.amount >
              0
                ? "incoming"
                : "outgoing"
            }
          >
            {showBalance
              ? `${
                  selectedTransactionData
                    .amount > 0
                    ? "+"
                    : "-"
                }${formatCurrency(
                  Math.abs(
                    selectedTransactionData.amount
                  )
                )}`
              : "••••••"}
          </strong>
        </div>

        <div className="transaction-detail-list">
          <div>
            <span>
              Description
            </span>

            <strong>
              {
                selectedTransactionData.description
              }
            </strong>
          </div>

          <div>
            <span>
              Account
            </span>

            <strong>
              {getAccountName(
                selectedTransactionData.accountId
              )}
            </strong>
          </div>

          <div>
            <span>
              Date
            </span>

            <strong>
              {
                selectedTransactionData.date
              }
            </strong>
          </div>

          {selectedTransactionData.reference && (
            <div>
              <span>
                Reference
              </span>

              <strong>
                {
                  selectedTransactionData.reference
                }
              </strong>
            </div>
          )}

          {selectedTransactionData.recipientBank && (
            <div>
              <span>
                Bank
              </span>

              <strong>
                {
                  selectedTransactionData.recipientBank
                }
              </strong>
            </div>
          )}

          {selectedTransactionData.recipientAccountNumber && (
            <div>
              <span>
                Recipient account
              </span>

              <strong>
                ••••
                {selectedTransactionData.recipientAccountNumber.slice(
                  -4
                )}
              </strong>
            </div>
          )}
        </div>

        <button
          type="button"
          className="primary-button transaction-detail-close"
          onClick={() =>
            setSelectedTransaction(null)
          }
        >
          Done
        </button>
      </div>
    </div>
  )}
</section>

);
}

export default Transactions;