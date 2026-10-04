import { useEffect, useState } from "react";
import type { Page } from "../App";
import { useBanking } from "../BankingContext";
import { useBankingSettings } from "../BankingSettingsContext";

interface DashboardProps {
  onNavigate?: (page: Page) => void;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "activity" | "account";
}

const defaultProfile: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Dashboard({
  onNavigate,
}: DashboardProps) {
  const {
    accounts,
    transactions,
  } = useBanking();

  const { settings } =
    useBankingSettings();

  const [profile, setProfile] =
    useState<ProfileData>(() => {
      const savedProfile =
        localStorage.getItem(
          "banking_profile"
        );

      if (!savedProfile) {
        return defaultProfile;
      }

      try {
        return JSON.parse(
          savedProfile
        ) as ProfileData;
      } catch {
        return defaultProfile;
      }
    });

  useEffect(() => {
    function loadProfile() {
      const savedProfile =
        localStorage.getItem(
          "banking_profile"
        );

      if (!savedProfile) {
        setProfile(defaultProfile);
        return;
      }

      try {
        setProfile(
          JSON.parse(
            savedProfile
          ) as ProfileData
        );
      } catch {
        setProfile(defaultProfile);
      }
    }

    loadProfile();

    window.addEventListener(
      "storage",
      loadProfile
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadProfile
      );
    };
  }, []);

  const firstName =
    profile.firstName.trim();

  const lastName =
    profile.lastName.trim();

  const displayName =
    firstName ||
    lastName ||
    "there";

  const totalBalance =
    accounts.reduce(
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
        total +
        Math.abs(transaction.amount),
      0
    );

  const transactionCount =
    spendingTransactions.length;

  const recentTransactions =
    [...transactions]
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 5);

  const monthlySpending = Array.from(
    { length: 6 },
    (_, index) => {
      const date = new Date();

      date.setMonth(
        date.getMonth() - (5 - index)
      );

      const month =
        date.getMonth();

      const year =
        date.getFullYear();

      const amount =
        spendingTransactions
          .filter((transaction) => {
            const transactionDate =
              new Date(
                transaction.date
              );

            return (
              transactionDate.getMonth() ===
                month &&
              transactionDate.getFullYear() ===
                year
            );
          })
          .reduce(
            (total, transaction) =>
              total +
              Math.abs(
                transaction.amount
              ),
            0
          );

      return {
        label:
          date.toLocaleDateString(
            "en-US",
            {
              month: "short",
            }
          ),
        amount,
      };
    }
  );

  const maximumMonthlySpending =
    Math.max(
      ...monthlySpending.map(
        (month) => month.amount
      ),
      1
    );

  const notifications: Notification[] = [
    {
      id: "security",
      title: "Account security",
      message:
        "Your account security settings are up to date.",
      type: "info",
    },
    {
      id: "transactions",
      title: "Recent activity",
      message:
        `${transactionCount} outgoing transaction${
          transactionCount === 1
            ? ""
            : "s"
        } recorded.`,
      type: "activity",
    },
    {
      id: "accounts",
      title: "Account overview",
      message:
        `${accounts.length} account${
          accounts.length === 1
            ? ""
            : "s"
        } connected to your profile.`,
      type: "account",
    },
  ];

  function showBalance(
    amount: number
  ) {
    if (
      settings &&
      settings.showBalances === false
    ) {
      return "••••••";
    }

    return formatCurrency(amount);
  }

  function handleNavigate(
    page: Page
  ) {
    onNavigate?.(page);
  }

  return (
    <main className="page-container">
      {/* Welcome */}
      <section className="dashboard-welcome">
        <div>
          <p className="eyebrow">
            Personal Banking
          </p>

          <h1>
            Welcome back, {displayName}
          </h1>

          <p className="subtitle">
            Here's an overview of your
            accounts and recent activity.
          </p>
        </div>
      </section>

      {/* Account Summary */}
      <section className="account-summary-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">
              Overview
            </p>

            <h2>
              Account Summary
            </h2>
          </div>
        </div>

        <div className="account-summary-grid">
          <div className="summary-card summary-card-primary">
            <div className="summary-card-top">
              <span>
                Total Balance
              </span>

              <span className="summary-card-icon">
                $
              </span>
            </div>

            <strong>
              {showBalance(
                totalBalance
              )}
            </strong>

            <p>
              Across all accounts
            </p>
          </div>

          {accounts
            .slice(0, 3)
            .map((account) => (
              <div
                className="summary-card"
                key={account.id}
              >
                <div className="summary-card-top">
                  <span>
                    {account.name}
                  </span>

                  <span className="summary-card-icon">
                    $
                  </span>
                </div>

                <strong>
                  {showBalance(
                    account.balance
                  )}
                </strong>

                <p>
                  {account.type} •{" "}
                  {account.number}
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">
              Shortcuts
            </p>

            <h2>
              Quick Actions
            </h2>

            <p>
              Manage your banking activity
              quickly.
            </p>
          </div>
        </div>

        <div className="quick-actions-grid">
          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              handleNavigate(
                "transfers"
              )
            }
          >
            <span className="quick-action-icon">
              →
            </span>

            <span>
              <strong>
                Transfer Money
              </strong>

              <small>
                Move money between accounts
              </small>
            </span>
          </button>

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              handleNavigate(
                "transactions"
              )
            }
          >
            <span className="quick-action-icon">
              ↔
            </span>

            <span>
              <strong>
                Transactions
              </strong>

              <small>
                View your recent activity
              </small>
            </span>
          </button>

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              handleNavigate("cards")
            }
          >
            <span className="quick-action-icon">
              ▣
            </span>

            <span>
              <strong>
                Manage Cards
              </strong>

              <small>
                View and manage your cards
              </small>
            </span>
          </button>

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              handleNavigate("profile")
            }
          >
            <span className="quick-action-icon">
              ●
            </span>

            <span>
              <strong>
                Profile
              </strong>

              <small>
                Manage your personal information
              </small>
            </span>
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="recent-activity-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">
              Activity
            </p>

            <h2>
              Recent Activity
            </h2>

            <p>
              Your latest account
              transactions.
            </p>
          </div>

          <button
            type="button"
            className="text-button"
            onClick={() =>
              handleNavigate(
                "transactions"
              )
            }
          >
            View All
          </button>
        </div>

        <div className="recent-activity-panel">
          {recentTransactions.length ===
          0 ? (
            <div className="empty-state">
              <strong>
                No recent transactions
              </strong>

              <p>
                Your recent account
                activity will appear here.
              </p>
            </div>
          ) : (
            <div className="transaction-list">
              {recentTransactions.map(
                (transaction) => {
                  const isOutgoing =
                    transaction.amount <
                    0;

                  return (
                    <div
                      className="transaction-row"
                      key={transaction.id}
                    >
                      <div className="transaction-main">
                        <div className="transaction-icon">
                          {isOutgoing
                            ? "−"
                            : "+"}
                        </div>

                        <div>
                          <strong>
                            {
                              transaction.merchant
                            }
                          </strong>

                          <span>
                            {
                              transaction.description
                            }
                          </span>

                          <small>
                            {formatDate(
                              transaction.date
                            )}
                          </small>
                        </div>
                      </div>

                      <strong
                        className={
                          isOutgoing
                            ? "transaction-amount outgoing"
                            : "transaction-amount incoming"
                        }
                      >
                        {settings &&
                        settings.showBalances ===
                          false
                          ? "••••••"
                          : `${
                              isOutgoing
                                ? "-"
                                : "+"
                            }${formatCurrency(
                              Math.abs(
                                transaction.amount
                              )
                            )}`}
                      </strong>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </section>

      {/* Spending Summary */}
      <section className="spending-summary-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">
              Spending
            </p>

            <h2>
              Spending Summary
            </h2>

            <p>
              An overview of your outgoing
              transactions.
            </p>
          </div>
        </div>

        <div className="spending-summary-card">
          <div className="spending-summary-main">
            <span className="spending-summary-label">
              Total Spending
            </span>

            <strong>
              {settings &&
              settings.showBalances ===
                false
                ? "••••••"
                : formatCurrency(
                    totalSpending
                  )}
            </strong>

            <span className="spending-summary-count">
              {transactionCount} outgoing{" "}
              {transactionCount === 1
                ? "transaction"
                : "transactions"}
            </span>
          </div>

          <div className="spending-summary-icon">
            −
          </div>
        </div>
      </section>

      {/* Monthly Spending */}
      <section className="monthly-spending-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">
              Spending Trends
            </p>

            <h2>
              Monthly Spending
            </h2>

            <p>
              Your outgoing spending over
              the last six months.
            </p>
          </div>
        </div>

        <div className="monthly-spending-card">
          <div className="monthly-chart">
            {monthlySpending.map(
              (month) => {
                const height =
                  month.amount === 0
                    ? 4
                    : Math.max(
                        (month.amount /
                          maximumMonthlySpending) *
                          100,
                        8
                      );

                return (
                  <div
                    className="monthly-chart-column"
                    key={`${month.label}-${month.amount}`}
                  >
                    <div className="monthly-chart-value">
                      {settings &&
                      settings.showBalances ===
                        false
                        ? "•••"
                        : formatCurrency(
                            month.amount
                          )}
                    </div>

                    <div className="monthly-chart-track">
                      <div
                        className="monthly-chart-bar"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>

                    <span>
                      {month.label}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="notifications-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">
              Alerts
            </p>

            <h2>
              Notifications
            </h2>

            <p>
              Important updates about your
              banking activity.
            </p>
          </div>
        </div>

        <div className="notifications-panel">
          {notifications.map(
            (notification) => (
              <div
                className="notification-row"
                key={notification.id}
              >
                <div
                  className={`notification-icon notification-${notification.type}`}
                >
                  !
                </div>

                <div className="notification-content">
                  <strong>
                    {notification.title}
                  </strong>

                  <p>
                    {notification.message}
                  </p>
                </div>

                <span className="notification-status">
                  Current
                </span>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;