import { useMemo, useState } from "react";
import { useBanking } from "../BankingContext";
import TransactionReceipt from "../components/TransactionReceipt";
import type { Page } from "../App";

interface TransactionsProps {
  onNavigate?: (page: Page) => void;
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

  const [sortOrder, setSortOrder] =
    useState("newest");

  const [selectedTransaction, setSelectedTransaction] =
    useState<any>(null);

  const [showReceipt, setShowReceipt] =
    useState(false);

  const filteredTransactions =
    useMemo(() => {
      const results =
        transactions.filter(
          (transaction) => {
            const searchText =
              search.toLowerCase().trim();

            const merchant =
              String(
                transaction.merchant ?? ""
              ).toLowerCase();

            const description =
              String(
                transaction.description ?? ""
              ).toLowerCase();

            const accountName =
              String(
                accounts.find(
                  (account) =>
                    account.id ===
                    transaction.accountId
                )?.name ?? ""
              ).toLowerCase();

            const matchesSearch =
              !searchText ||
              merchant.includes(
                searchText
              ) ||
              description.includes(
                searchText
              ) ||
              accountName.includes(
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

      return [...results].sort(
        (a, b) => {
          if (
            sortOrder === "amount-high"
          ) {
            return (
              Math.abs(
                Number(b.amount)
              ) -
              Math.abs(
                Number(a.amount)
              )
            );
          }

          if (
            sortOrder === "amount-low"
          ) {
            return (
              Math.abs(
                Number(a.amount)
              ) -
              Math.abs(
                Number(b.amount)
              )
            );
          }

          const dateA =
            new Date(
              a.date
            ).getTime();

          const dateB =
            new Date(
              b.date
            ).getTime();

          if (
            sortOrder === "oldest"
          ) {
            return dateA - dateB;
          }

          return dateB - dateA;
        }
      );
    }, [
      transactions,
      accounts,
      search,
      filter,
      sortOrder,
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
    return `$${Math.abs(
      value
    ).toLocaleString(
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
    const account =
      accounts.find(
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

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
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

  function clearFilters() {
    setSearch("");
    setFilter("all");
    setSortOrder("newest");
  }

  return (
    <main className="transactions-page polished-transactions-page">

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
              aria-label="Clear search"
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


        <div className="transaction-sort">

          <label htmlFor="transaction-sort">
            Sort
          </label>

          <select
            id="transaction-sort"
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(
                event.target.value
              )
            }
          >
            <option value="newest">
              Newest first
            </option>

            <option value="oldest">
              Oldest first
            </option>

            <option value="amount-high">
              Largest amount
            </option>

            <option value="amount-low">
              Smallest amount
            </option>
          </select>

        </div>

      </section>


      {(search ||
        filter !== "all" ||
        sortOrder !== "newest") && (

        <div className="transaction-filter-status">

          <span>
            Showing{" "}
            {filteredTransactions.length}{" "}
            transaction
            {filteredTransactions.length ===
            1
              ? ""
              : "s"}
          </span>

          <button
            type="button"
            onClick={clearFilters}
          >
            Clear filters
          </button>

        </div>

      )}


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


        {filteredTransactions.length ===
        0 ? (

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

            <button
              type="button"
              onClick={clearFilters}
            >
              Reset filters
            </button>

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