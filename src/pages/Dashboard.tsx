import { useMemo, useState } from "react";
import { useBanking } from "../BankingContext";
import TransactionReceipt from "../components/TransactionReceipt";

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

function Dashboard({
  onNavigate,
}: DashboardProps) {
  const {
    accounts,
    transactions,
    showBalance,
    setShowBalance,
  } = useBanking();

  const [selectedTransaction, setSelectedTransaction] =
    useState<any>(null);

  const totalBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) =>
        total + account.balance,
      0
    );
  }, [accounts]);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  function formatMoney(value: number) {
    return `$${Math.abs(value).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  function formatBalance(value: number) {
    if (!showBalance) {
      return "••••••";
    }

    return `$${value.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  function formatDate(date: string) {
    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
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

  return (
    <main className="dashboard-page">

      <section className="dashboard-welcome">

        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Welcome back
          </h1>

          <p>
            Here's an overview of your
            accounts and recent activity.
          </p>
        </div>

        <button
          type="button"
          className="dashboard-balance-toggle"
          onClick={() =>
            setShowBalance(!showBalance)
          }
        >
          {showBalance
            ? "Hide balances"
            : "Show balances"}
        </button>

      </section>


      <section className="dashboard-overview">

        <div className="dashboard-total-card">

          <div className="dashboard-card-label">
            <span>
              TOTAL BALANCE
            </span>

            <button
              type="button"
              onClick={() =>
                setShowBalance(!showBalance)
              }
              aria-label={
                showBalance
                  ? "Hide balance"
                  : "Show balance"
              }
            >
              {showBalance
                ? "◉"
                : "◌"}
            </button>
          </div>

          <strong className="dashboard-total-balance">
            {formatBalance(
              totalBalance
            )}
          </strong>

          <p>
            Across all GFB accounts
          </p>

        </div>


        <div className="dashboard-stat-card">

          <span>
            ACCOUNTS
          </span>

          <strong>
            {accounts.length}
          </strong>

          <small>
            Active accounts
          </small>

        </div>


        <div className="dashboard-stat-card">

          <span>
            TRANSACTIONS
          </span>

          <strong>
            {transactions.length}
          </strong>

          <small>
            Recorded activity
          </small>

        </div>

      </section>


      <section className="dashboard-content-grid">

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>
              <p className="eyebrow">
                Your accounts
              </p>

              <h2>
                Account overview
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate?.("accounts")
              }
            >
              View all →
            </button>

          </div>


          <div className="dashboard-account-list">

            {accounts.map((account) => (
              <button
                type="button"
                className="dashboard-account-row"
                key={account.id}
                onClick={() =>
                  onNavigate?.("accounts")
                }
              >

                <div className="dashboard-account-icon">
                  $
                </div>

                <div className="dashboard-account-info">

                  <strong>
                    {account.name}
                  </strong>

                  <span>
                    {account.type} ••••
                    {account.number.slice(-4)}
                  </span>

                </div>

                <strong className="account-balance">
                  {formatBalance(
                    account.balance
                  )}
                </strong>

              </button>
            ))}

          </div>

        </div>


        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>
              <p className="eyebrow">
                Activity
              </p>

              <h2>
                Recent transactions
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate?.("transactions")
              }
            >
              View all →
            </button>

          </div>


          <div className="dashboard-transactions">

            {recentTransactions.length === 0 ? (

              <div className="dashboard-empty">
                <strong>
                  No transactions yet
                </strong>

                <p>
                  Your recent account activity
                  will appear here.
                </p>
              </div>

            ) : (

              recentTransactions.map(
                (transaction) => {

                  const amount =
                    Number(
                      transaction.amount
                    );

                  const incoming =
                    amount > 0;

                  return (
                    <button
                      type="button"
                      className="dashboard-transaction-row"
                      key={transaction.id}
                      onClick={() =>
                        setSelectedTransaction(
                          transaction
                        )
                      }
                    >

                      <div
                        className={
                          incoming
                            ? "dashboard-transaction-icon incoming"
                            : "dashboard-transaction-icon outgoing"
                        }
                      >
                        {incoming
                          ? "+"
                          : "−"}
                      </div>

                      <div className="dashboard-transaction-info">

                        <strong>
                          {transaction.merchant ||
                            transaction.description ||
                            "Transaction"}
                        </strong>

                        <span>
                          {formatDate(
                            transaction.date
                          )}
                          {" • "}
                          {getAccountName(
                            transaction.accountId
                          )}
                        </span>

                      </div>

                      <strong
                        className={
                          incoming
                            ? "dashboard-transaction-amount incoming"
                            : "dashboard-transaction-amount"
                        }
                      >
                        {incoming
                          ? "+"
                          : "−"}

                        {showBalance
                          ? formatMoney(amount)
                          : "••••••"}
                      </strong>

                    </button>
                  );
                }
              )

            )}

          </div>

        </div>

      </section>


      <section className="dashboard-quick-actions">

        <div>
          <p className="eyebrow">
            Quick actions
          </p>

          <h2>
            Manage your money
          </h2>
        </div>

        <div className="dashboard-action-buttons">

          <button
            type="button"
            onClick={() =>
              onNavigate?.("transfers")
            }
          >
            Transfer money
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigate?.("payments")
            }
          >
            Make a payment
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigate?.("cards")
            }
          >
            View cards
          </button>

        </div>

      </section>


      {selectedTransaction && (
        <TransactionReceipt
          transaction={
            selectedTransaction
          }
          showBalance={showBalance}
          onClose={() =>
            setSelectedTransaction(null)
          }
        />
      )}

    </main>
  );
}

export default Dashboard;