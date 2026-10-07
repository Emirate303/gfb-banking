import { useMemo, useState } from "react";
import { useBanking } from "../BankingContext";
import TransactionReceipt from "../components/TransactionReceipt";

interface TransactionsProps {
  onNavigate?: (page: string) => void;
}

function Transactions({
  onNavigate,
}: TransactionsProps) {
  const { transactions, accounts } =
    useBanking();

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  const [selectedTransaction, setSelectedTransaction] =
    useState<any>(null);

  const [showReceipt, setShowReceipt] =
    useState(false);

  const filteredTransactions =
    useMemo(() => {
      return transactions.filter(
        (transaction) => {
          const searchText =
            search.toLowerCase();

          const merchant =
            String(
              transaction.merchant ?? ""
            ).toLowerCase();

          const description =
            String(
              transaction.description ?? ""
            ).toLowerCase();

          const matchesSearch =
            merchant.includes(searchText) ||
            description.includes(
              searchText
            );

          const amount =
            Number(transaction.amount);

          const matchesFilter =
            filter === "all" ||
            (filter === "money-in" &&
              amount > 0) ||
            (filter === "money-out" &&
              amount < 0);

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      transactions,
      search,
      filter,
    ]);

  const totalSpent =
    transactions
      .filter(
        (transaction) =>
          Number(transaction.amount) < 0
      )
      .reduce(
        (total, transaction) =>
          total +
          Math.abs(
            Number(transaction.amount)
          ),
        0
      );

  const totalReceived =
    transactions
      .filter(
        (transaction) =>
          Number(transaction.amount) > 0
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      );

  function money(value: number) {
    return `$${Math.abs(value).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  function getAccountName(
    accountId?: string
  ) {
    const account = accounts.find(
      (item) =>
        item.id === accountId
    );

    return (
      account?.name ??
      "GFB Account"
    );
  }

  function formatDate(
    date: string
  ) {
    const parsed =
      new Date(date);

    if (Number.isNaN(
      parsed.getTime()
    )) {
      return date;
    }

    return parsed.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  }

  function openReceipt(
    transaction: any
  ) {
    setSelectedTransaction(
      transaction
    );

    setShowReceipt(true);
  }

  return (
    <main className="transactions-page polished-transactions-page">

      {/* HEADER */}

      <header className="polished-transactions-header">

        <div>

          <div className="transactions-breadcrumb">
            Banking
            <span>/</span>
            Transactions
          </div>

          <h1>
            Transactions
          </h1>

          <p>
            Review your recent account
            activity and transaction details.
          </p>

        </div>

        <button
          type="button"
          className="transactions-header-button"
          onClick={() =>
            onNavigate?.("accounts")
          }
        >
          View accounts →
        </button>

      </header>


      {/* SUMMARY */}

      <section className="transaction-summary-grid">

        <div className="transaction-summary-card">

          <span>
            TOTAL TRANSACTIONS
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
            MONEY OUT
          </span>

          <strong>
            {money(totalSpent)}
          </strong>

          <small>
            Outgoing transactions
          </small>

        </div>


        <div className="transaction-summary-card">

          <span>
            MONEY IN
          </span>

          <strong>
            {money(totalReceived)}
          </strong>

          <small>
            Incoming transactions
          </small>

        </div>

      </section>


      {/* SEARCH / FILTER */}

      <section className="transaction-toolbar">

        <div className="transaction-search">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
            >
              ×
            </button>
          )}

        </div>


        <div className="transaction-filters">

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
              filter === "money-in"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("money-in")
            }
          >
            Money in
          </button>

          <button
            type="button"
            className={
              filter === "money-out"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("money-out")
            }
          >
            Money out
          </button>

        </div>

      </section>


      {/* TRANSACTIONS */}

      <section className="transactions-list-panel">

        <div className="transactions-list-header">

          <div>
            <span>
              ACCOUNT ACTIVITY
            </span>

            <h2>
              Recent transactions
            </h2>
          </div>

          <small>
            {filteredTransactions.length}{" "}
            results
          </small>

        </div>


        {filteredTransactions.length === 0 ? (

          <div className="transactions-empty">

            <div>
              $
            </div>

            <h3>
              No transactions found
            </h3>

            <p>
              Try changing your search or
              filter.
            </p>

          </div>

        ) : (

          <div className="transactions-table">

            {filteredTransactions.map(
              (transaction) => {

                const amount =
                  Number(
                    transaction.amount
                  );

                const incoming =
                  amount > 0;

                const accountName =
                  getAccountName(
                    transaction.accountId
                  );

                return (
                  <button
                    type="button"
                    className="transaction-row"
                    key={
                      transaction.id
                    }
                    onClick={() =>
                      openReceipt(
                        transaction
                      )
                    }
                  >

                    <div
                      className={
                        incoming
                          ? "transaction-icon incoming"
                          : "transaction-icon outgoing"
                      }
                    >
                      {incoming
                        ? "+"
                        : "−"}
                    </div>


                    <div className="transaction-main">

                      <strong>
                        {transaction.merchant ||
                          transaction.description ||
                          "Transaction"}
                      </strong>

                      <span>
                        {transaction.description ||
                          accountName}
                      </span>

                    </div>


                    <div className="transaction-account">

                      <span>
                        ACCOUNT
                      </span>

                      <strong>
                        {accountName}
                      </strong>

                    </div>


                    <div className="transaction-date">

                      <span>
                        DATE
                      </span>

                      <strong>
                        {formatDate(
                          transaction.date
                        )}
                      </strong>

                    </div>


                    <div
                      className={
                        incoming
                          ? "transaction-amount incoming"
                          : "transaction-amount"
                      }
                    >
                      {incoming
                        ? "+"
                        : "−"}

                      {money(amount)}
                    </div>


                    <div className="transaction-arrow">
                      →
                    </div>

                  </button>
                );
              }
            )}

          </div>

        )}

      </section>


      {/* INFORMATION */}

      <section className="transactions-info">

        <div className="transactions-info-icon">
          ✓
        </div>

        <div>

          <strong>
            Tap any transaction to view
            its receipt
          </strong>

          <p>
            Transaction receipts include
            payment details, account
            information, amount, date, and
            transaction reference.
          </p>

        </div>

      </section>


      {/* RECEIPT */}

      {showReceipt &&
        selectedTransaction && (
          <TransactionReceipt
  transaction={
    selectedTransaction
  }
  showBalance={true}
  onClose={() => {
    setShowReceipt(false);
    setSelectedTransaction(
      null
    );
  }}
/>
        )}

    </main>
  );
}

export default Transactions;