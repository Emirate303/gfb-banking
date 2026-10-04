import { useEffect, useState } from "react";
import type { Page } from "../App";
import { useBanking } from "../BankingContext";

interface DashboardProps {
  onNavigate?: (page: Page) => void;
  customerName?: string;
}

function Dashboard({
  onNavigate,
  customerName,
}: DashboardProps) {
  const {
    accounts,
    transactions,
  } = useBanking();

  const [showBalance, setShowBalance] =
    useState(true);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const totalBalance = accounts.reduce(
    (total, account) =>
      total + account.balance,
    0
  );

  const spendingTransactions =
    transactions.filter(
      (transaction) =>
        transaction.amount < 0
    );

  const totalSpending =
    spendingTransactions.reduce(
      (total, transaction) =>
        total + Math.abs(transaction.amount),
      0
    );

  const recentTransactions =
    transactions.slice(0, 5);

  function navigate(page: Page) {
    if (onNavigate) {
      onNavigate(page);
    }
  }

  return (
    <main className="dashboard-page">

      {/* Welcome */}
      <section className="dashboard-welcome">
        <div>
          <p className="eyebrow">
            Personal Banking
          </p>

          <h1>
            Welcome back
            {customerName
              ? `, ${customerName}`
              : ""}
          </h1>

          <p className="dashboard-date">
            {currentTime.toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </p>
        </div>

        <div className="dashboard-secure-status">
          <span className="security-dot" />
          Secure Session
        </div>
      </section>

      {/* Balance Summary */}
      <section className="dashboard-balance-grid">

        <div className="dashboard-balance-card">
          <div className="balance-card-top">
            <span>
              Total Available Balance
            </span>

            <button
              type="button"
              className="balance-toggle"
              onClick={() =>
                setShowBalance(
                  !showBalance
                )
              }
            >
              {showBalance
                ? "Hide"
                : "Show"}
            </button>
          </div>

          <div className="dashboard-total-balance">
            {showBalance
              ? `$${totalBalance.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`
              : "••••••"}
          </div>

          <p>
            Across all accounts
          </p>
        </div>

        <div className="dashboard-stat-card">
          <span>
            Accounts
          </span>

          <strong>
            {accounts.length}
          </strong>

          <p>
            Active accounts
          </p>
        </div>

        <div className="dashboard-stat-card">
          <span>
            Recent Spending
          </span>

          <strong>
            {showBalance
              ? `$${totalSpending.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`
              : "••••••"}
          </strong>

          <p>
            Recorded transactions
          </p>
        </div>

      </section>

      {/* Quick Actions */}
      <section className="dashboard-quick-actions">

        <div className="section-header">
          <div>
            <p className="eyebrow">
              Quick Access
            </p>

            <h2>
              What would you like to do?
            </h2>
          </div>
        </div>

        <div className="quick-action-grid">

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              navigate("transfers")
            }
          >
            <span className="quick-action-icon">
              ⇄
            </span>

            <strong>
              Transfer Money
            </strong>

            <span>
              Move money between accounts
            </span>
          </button>

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              navigate("payments")
            }
          >
            <span className="quick-action-icon">
              $
            </span>

            <strong>
              Make a Payment
            </strong>

            <span>
              Pay a bill or service
            </span>
          </button>

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              navigate("accounts")
            }
          >
            <span className="quick-action-icon">
              ▣
            </span>

            <strong>
              View Accounts
            </strong>

            <span>
              Review your account balances
            </span>
          </button>

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              navigate("transactions")
            }
          >
            <span className="quick-action-icon">
              ↔
            </span>

            <strong>
              Transactions
            </strong>

            <span>
              Review recent activity
            </span>
          </button>

        </div>
      </section>

      {/* Accounts + Transactions */}
      <section className="dashboard-content-grid">

        {/* Accounts */}
        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <p className="eyebrow">
                Accounts
              </p>

              <h2>
                Your Accounts
              </h2>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() =>
                navigate("accounts")
              }
            >
              View All
            </button>
          </div>

          <div className="account-list">

            {accounts.length === 0 ? (
              <div className="empty-state">
                <p>
                  No accounts available.
                </p>
              </div>
            ) : (
              accounts.map((account) => (
                <div
                  className="account-row"
                  key={account.id}
                >

                  <div className="account-info">

                    <div className="account-icon">
                      $
                    </div>

                    <div>
                      <strong>
                        {account.name}
                      </strong>

                      <span>
                        {account.type} ••••
                        {account.number.slice(
                          -4
                        )}
                      </span>
                    </div>

                  </div>

                  <strong className="account-balance">
                    {showBalance
                      ? `$${account.balance.toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}`
                      : "••••••"}
                  </strong>

                </div>
              ))
            )}

          </div>
        </div>

        {/* Transactions */}
        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <p className="eyebrow">
                Activity
              </p>

              <h2>
                Recent Transactions
              </h2>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() =>
                navigate("transactions")
              }
            >
              View All
            </button>

          </div>

          <div className="transaction-list">

            {recentTransactions.length ===
            0 ? (
              <div className="empty-state">
                <p>
                  No transactions yet.
                </p>
              </div>
            ) : (
              recentTransactions.map(
                (transaction) => (
                  <div
                    className="transaction-row"
                    key={transaction.id}
                  >

                    <div className="transaction-info">

                      <div className="transaction-icon">
                        {transaction.amount <
                        0
                          ? "−"
                          : "+"}
                      </div>

                      <div>
                        <strong>
                          {transaction.merchant}
                        </strong>

                        <span>
                          {
                            transaction.description
                          }
                        </span>

                        <small>
                          {transaction.date}
                        </small>
                      </div>

                    </div>

                    <strong
                      className={
                        transaction.amount <
                        0
                          ? "transaction-negative"
                          : "transaction-positive"
                      }
                    >
                      {transaction.amount <
                      0
                        ? "-"
                        : "+"}
                      $
                      {Math.abs(
                        transaction.amount
                      ).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </strong>

                  </div>
                )
              )
            )}

          </div>
        </div>

      </section>

      {/* Footer */}
      <section className="dashboard-footer-card">

        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h2>
            Your banking, simply organized.
          </h2>

          <p>
            Manage accounts, payments,
            transfers and transactions from
            one secure fictional banking
            dashboard.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() =>
            navigate("profile")
          }
        >
          View Profile
        </button>

      </section>

    </main>
  );
}

export default Dashboard;