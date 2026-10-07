import { useState } from "react";
import { useBanking } from "../BankingContext";

function Transactions() {
  const {
    transactions,
    accounts,
    showBalance,
    setShowBalance,
  } = useBanking();

  const [selectedTransaction, setSelectedTransaction] =
    useState<
      (typeof transactions)[number] | null
    >(null);

  function formatCurrency(amount: number) {
    return Math.abs(amount).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  }

  function getAccountName(accountId?: string) {
    if (!accountId) {
      return "GFB Account";
    }

    const account = accounts.find(
      (item) => item.id === accountId
    );

    return account?.name ?? "GFB Account";
  }

  return (
    <main className="transactions-page">

      {/* PAGE HEADER */}

      <section className="transactions-header">

        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Transactions
          </h1>

          <p>
            Review your recent banking activity.
          </p>
        </div>

        <button
          type="button"
          className="balance-hide-button"
          onClick={() =>
            setShowBalance(!showBalance)
          }
        >
          {showBalance
            ? "Hide Amounts"
            : "Show Amounts"}
        </button>

      </section>


      {/* TRANSACTION SUMMARY */}

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
            Account Activity
          </span>

          <strong>
            {accounts.length}
          </strong>

          <small>
            Active accounts
          </small>

        </div>


        <div className="transaction-summary-card">

          <span>
            Recent Spending
          </span>

          <strong>
            {showBalance
              ? `$${formatCurrency(
                  transactions
                    .filter(
                      (transaction) =>
                        transaction.amount < 0
                    )
                    .reduce(
                      (total, transaction) =>
                        total +
                        transaction.amount,
                      0
                    )
                )}`
              : "••••••••"}
          </strong>

          <small>
            Recorded payments
          </small>

        </div>

      </section>


      {/* TRANSACTIONS LIST */}

      <section className="transactions-section">

        <div className="transactions-section-header">

          <div>
            <p className="eyebrow">
              Activity
            </p>

            <h2>
              Recent Transactions
            </h2>
          </div>

          <span>
            {transactions.length}{" "}
            {transactions.length === 1
              ? "Transaction"
              : "Transactions"}
          </span>

        </div>


        {transactions.length === 0 ? (

          <div className="transactions-empty">

            <div className="transactions-empty-icon">
              $
            </div>

            <h3>
              No transactions yet
            </h3>

            <p>
              Your transaction activity will
              appear here.
            </p>

          </div>

        ) : (

          <div className="transactions-list">

            {transactions.map(
              (transaction) => {

                const isDebit =
                  transaction.amount < 0;

                return (
                  <button
                    type="button"
                    className="transaction-item"
                    key={transaction.id}
                    onClick={() =>
                      setSelectedTransaction(
                        transaction
                      )
                    }
                  >

                    <div className="transaction-icon">
                      {isDebit ? "-" : "+"}
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
                        {getAccountName(
                          transaction.accountId
                        )}
                      </span>

                      <small>
                        {transaction.date}
                      </small>

                    </div>


                    <div
                      className={
                        isDebit
                          ? "transaction-amount spending"
                          : "transaction-amount income"
                      }
                    >
                      {showBalance
                        ? `${
                            isDebit
                              ? "-"
                              : "+"
                          }$${formatCurrency(
                            transaction.amount
                          )}`
                        : "••••••••"}
                    </div>

                    <div className="transaction-arrow">
                      ›
                    </div>

                  </button>
                );
              }
            )}

          </div>

        )}

      </section>


      {/* RECEIPT */}

      {selectedTransaction && (

        <div className="receipt-overlay">

          <div className="receipt-modal">

            {/* RECEIPT HEADER */}

            <div className="receipt-header">

              <div className="receipt-brand">

                <div className="receipt-logo">
                  GFB
                </div>

                <div>
                  <strong>
                    Guardian Federal Bank
                  </strong>

                  <span>
                    Transaction Receipt
                  </span>
                </div>

              </div>

              <button
                type="button"
                className="receipt-close"
                onClick={() =>
                  setSelectedTransaction(null)
                }
                aria-label="Close receipt"
              >
                ×
              </button>

            </div>


            {/* RECEIPT STATUS */}

            <div className="receipt-status">

              <div className="receipt-status-icon">
                ✓
              </div>

              <div>
                <strong>
                  Transaction Complete
                </strong>

                <span>
                  Successfully processed
                </span>
              </div>

            </div>


            {/* RECEIPT AMOUNT */}

            <div className="receipt-amount">

              <span>
                Transaction Amount
              </span>

              <strong>
                {showBalance
                  ? `${
                      selectedTransaction.amount <
                      0
                        ? "-"
                        : "+"
                    }$${formatCurrency(
                      selectedTransaction.amount
                    )}`
                  : "••••••••"}
              </strong>

            </div>


            {/* RECEIPT DETAILS */}

            <div className="receipt-details">

              <div className="receipt-row">

                <span>
                  Merchant
                </span>

                <strong>
                  {selectedTransaction.merchant}
                </strong>

              </div>


              <div className="receipt-row">

                <span>
                  Description
                </span>

                <strong>
                  {selectedTransaction.description}
                </strong>

              </div>


              <div className="receipt-row">

                <span>
                  Account
                </span>

                <strong>
                  {getAccountName(
                    selectedTransaction.accountId
                  )}
                </strong>

              </div>


              <div className="receipt-row">

                <span>
                  Date
                </span>

                <strong>
                  {selectedTransaction.date}
                </strong>

              </div>


              <div className="receipt-row">

                <span>
                  Transaction ID
                </span>

                <strong className="receipt-id">
                  {selectedTransaction.id}
                </strong>

              </div>


              <div className="receipt-row">

                <span>
                  Status
                </span>

                <strong className="receipt-success">
                  Completed
                </strong>

              </div>

            </div>


            {/* RECEIPT FOOTER */}

            <div className="receipt-footer">

              <span>
                Guardian Federal Bank
              </span>

              <small>
                GFB Online Banking
              </small>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Transactions;