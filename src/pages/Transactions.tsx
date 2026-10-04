import { useState } from "react";
import { useBanking } from "../BankingContext";

function Transactions() {
  const { transactions, accounts } = useBanking();

  const [filter, setFilter] = useState("all");

  const [selectedTransaction, setSelectedTransaction] =
    useState<(typeof transactions)[number] | null>(null);

  const filteredTransactions = transactions.filter(
    (transaction) => {
      if (filter === "all") {
        return true;
      }

      if (filter === "payments") {
        return transaction.merchant !== "Account Transfer";
      }

      if (filter === "transfers") {
        return transaction.merchant === "Account Transfer";
      }

      if (filter === "income") {
        return transaction.amount > 0;
      }

      if (filter === "spending") {
        return transaction.amount < 0;
      }

      return true;
    }
  );

  const totalSpending = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce(
      (total, transaction) =>
        total + Math.abs(transaction.amount),
      0
    );

  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  function getAccountName(accountId?: string) {
    const account = accounts.find(
      (item) => item.id === accountId
    );

    return account?.name ?? "GFB Account";
  }

  return (
    <main className="transactions-page">

      {/* PAGE HEADER */}

      <section className="page-heading">
        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Transactions
          </h1>

          <p>
            Review your recent GFB account activity.
          </p>
        </div>
      </section>

      {/* SUMMARY CARDS */}

      <section className="transaction-summary">

        <div className="transaction-summary-card">
          <span>
            Total Transactions
          </span>

          <strong>
            {transactions.length}
          </strong>

          <small>
            Recorded activity
          </small>
        </div>

        <div className="transaction-summary-card">
          <span>
            Total Spending
          </span>

          <strong>
            $
            {totalSpending.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>

          <small>
            Outgoing transactions
          </small>
        </div>

        <div className="transaction-summary-card">
          <span>
            Total Income
          </span>

          <strong>
            $
            {totalIncome.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>

          <small>
            Incoming transactions
          </small>
        </div>

      </section>

      {/* TRANSACTION HISTORY */}

      <section className="transactions-panel">

        <div className="transactions-panel-header">

          <div>
            <p className="eyebrow">
              Account Activity
            </p>

            <h2>
              Transaction History
            </h2>
          </div>

          <div className="transaction-filters">

            <button
              type="button"
              className={
                filter === "all"
                  ? "transaction-filter active"
                  : "transaction-filter"
              }
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              type="button"
              className={
                filter === "payments"
                  ? "transaction-filter active"
                  : "transaction-filter"
              }
              onClick={() => setFilter("payments")}
            >
              Payments
            </button>

            <button
              type="button"
              className={
                filter === "transfers"
                  ? "transaction-filter active"
                  : "transaction-filter"
              }
              onClick={() => setFilter("transfers")}
            >
              Transfers
            </button>

            <button
              type="button"
              className={
                filter === "income"
                  ? "transaction-filter active"
                  : "transaction-filter"
              }
              onClick={() => setFilter("income")}
            >
              Income
            </button>

            <button
              type="button"
              className={
                filter === "spending"
                  ? "transaction-filter active"
                  : "transaction-filter"
              }
              onClick={() => setFilter("spending")}
            >
              Spending
            </button>

          </div>

        </div>

        {/* TABLE */}

        <div className="transactions-table">

          <div className="transactions-table-header">
            <span>
              Transaction
            </span>

            <span>
              Date
            </span>

            <span>
              Amount
            </span>
          </div>

          {filteredTransactions.length === 0 ? (

            <div className="transaction-empty">

              <div className="transaction-empty-icon">
                $
              </div>

              <h3>
                No transactions found
              </h3>

              <p>
                Your transaction activity will
                appear here.
              </p>

            </div>

          ) : (

            filteredTransactions.map(
              (transaction) => (

                <button
                  type="button"
                  className="transaction-table-row transaction-clickable"
                  key={transaction.id}
                  onClick={() =>
                    setSelectedTransaction(transaction)
                  }
                >

                  <div className="transaction-main">

                    <div
                      className={
                        transaction.amount < 0
                          ? "transaction-row-icon spending"
                          : "transaction-row-icon income"
                      }
                    >
                      {transaction.amount < 0
                        ? "−"
                        : "+"}
                    </div>

                    <div>
                      <strong>
                        {transaction.merchant}
                      </strong>

                      <span>
                        {transaction.description}
                      </span>
                    </div>

                  </div>

                  <div className="transaction-date">
                    {transaction.date}
                  </div>

                  <div
                    className={
                      transaction.amount < 0
                        ? "transaction-amount spending"
                        : "transaction-amount income"
                    }
                  >
                    {transaction.amount < 0
                      ? "-"
                      : "+"}
                    $
                    {Math.abs(
                      transaction.amount
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>

                </button>

              )
            )

          )}

        </div>

      </section>

      {/* RECEIPT */}

      {selectedTransaction && (

        <div
          className="receipt-overlay"
          onClick={() =>
            setSelectedTransaction(null)
          }
        >

          <div
            className="receipt-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="receipt-header">

              <div>
                <p className="eyebrow">
                  Guardian Federal Bank
                </p>

                <h2>
                  Transaction Receipt
                </h2>
              </div>

              <button
                type="button"
                className="receipt-close"
                onClick={() =>
                  setSelectedTransaction(null)
                }
              >
                ×
              </button>

            </div>

            <div className="receipt-success">

              <div className="receipt-check">
                ✓
              </div>

              <div>
                <strong>
                  Transaction Completed
                </strong>

                <span>
                  Your transaction was successfully
                  recorded.
                </span>
              </div>

            </div>

            <div className="receipt-amount">

              <span>
                {selectedTransaction.amount < 0
                  ? "Amount Paid"
                  : "Amount Received"}
              </span>

              <strong>
                {selectedTransaction.amount < 0
                  ? "-"
                  : "+"}
                $
                {Math.abs(
                  selectedTransaction.amount
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </strong>

            </div>

            <div className="receipt-details">

              <div className="receipt-detail">
                <span>
                  Recipient / Merchant
                </span>

                <strong>
                  {selectedTransaction.merchant}
                </strong>
              </div>

              {selectedTransaction.recipientBank && (
                <div className="receipt-detail">
                  <span>
                    Bank
                  </span>

                  <strong>
                    {selectedTransaction.recipientBank}
                  </strong>
                </div>
              )}

              {selectedTransaction.recipientAccountNumber && (
                <div className="receipt-detail">
                  <span>
                    Account Number
                  </span>

                  <strong>
                    ••••
                    {selectedTransaction.recipientAccountNumber.slice(
                      -4
                    )}
                  </strong>
                </div>
              )}

              <div className="receipt-detail">
                <span>
                  Paid From
                </span>

                <strong>
                  {getAccountName(
                    selectedTransaction.accountId
                  )}
                </strong>
              </div>

              <div className="receipt-detail">
                <span>
                  Description
                </span>

                <strong>
                  {selectedTransaction.description}
                </strong>
              </div>

              <div className="receipt-detail">
                <span>
                  Date
                </span>

                <strong>
                  {selectedTransaction.date}
                </strong>
              </div>

              <div className="receipt-detail">
                <span>
                  Status
                </span>

                <strong className="receipt-status">
                  Completed
                </strong>
              </div>

              <div className="receipt-detail">
                <span>
                  GFB Reference
                </span>

                <strong>
                  {selectedTransaction.reference ??
                    `GFB-${selectedTransaction.id}`}
                </strong>
              </div>

            </div>

            <div className="receipt-footer">

              <span>
                Guardian Federal Bank
              </span>

              <small>
                Keep this receipt for your records.
              </small>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Transactions;