import {
  useEffect,
  useState,
} from "react";

import { useBanking } from "../BankingContext";

import TransactionReceipt from "../components/TransactionReceipt";

export type Page =
  | "dashboard"
  | "payments"
  | "accounts"
  | "transfers"
  | "transactions"
  | "cards"
  | "profile"
  | "settings";

interface DashboardProps {
  onNavigate?: (page: Page) => void;
  customerName?: string;
}

function Dashboard({
  onNavigate,
  customerName = "Customer",
}: DashboardProps) {
  const {
  accounts,
  transactions,
  showBalance,
  setShowBalance,
} = useBanking();

  const [selectedTransaction, setSelectedTransaction] =
    useState<
      (typeof transactions)[number] | null
    >(null);

  const [displayBalance, setDisplayBalance] =
    useState(0);

  const totalBalance = accounts.reduce(
    (total, account) =>
      total + account.balance,
    0
  );

  const totalSpending = transactions
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

  const recentTransactions =
    transactions.slice(0, 5);

  /*
   * Animated balance counter
   */
  useEffect(() => {
    if (!showBalance) {
      setDisplayBalance(0);
      return;
    }

    let current = 0;

    const increment =
      totalBalance / 30;

    const timer = window.setInterval(() => {
      current += increment;

      if (current >= totalBalance) {
        current = totalBalance;
        window.clearInterval(timer);
      }

      setDisplayBalance(current);
    }, 20);

    return () => {
      window.clearInterval(timer);
    };
  }, [totalBalance, showBalance]);

  function formatCurrency(
    amount: number
  ) {
    return amount.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  }

  function navigate(page: Page) {
    if (onNavigate) {
      onNavigate(page);
    }
  }

  return (
    <main className="dashboard-page">

      {/* =====================================
          DASHBOARD HEADER
      ===================================== */}

      <section className="dashboard-welcome">

        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Welcome back, {customerName}
          </h1>

          <p>
            Here's what's happening with
            your accounts today.
          </p>
        </div>

        <div className="dashboard-secure-badge">
          <span className="secure-dot"></span>
          Secure Session
        </div>

      </section>


      {/* =====================================
          ANIMATED SUMMARY CARDS
      ===================================== */}

      <section className="dashboard-stat-grid">

        {/* BALANCE */}

        <div className="dashboard-stat-card balance-stat-card">

          <div className="stat-card-glow"></div>

          <div className="stat-card-top">

            <span className="stat-card-label">
              Total Available Balance
            </span>

            <button
              type="button"
              className="balance-hide-button"
              onClick={() =>
  setShowBalance(!showBalance)
}
            >
              {showBalance
                ? "Hide"
                : "Show"}
            </button>

          </div>

          <div className="stat-card-value">

            {showBalance ? (
              <>
                $
                {formatCurrency(
                  displayBalance
                )}
              </>
            ) : (
              "••••••••"
            )}

          </div>

          <div className="stat-card-footer">

            <span>
              Across all accounts
            </span>

            <span className="stat-card-status">
              Available
            </span>

          </div>

        </div>


        {/* ACCOUNTS */}

        <button
          type="button"
          className="dashboard-stat-card accounts-stat-card"
          onClick={() =>
            navigate("accounts")
          }
        >

          <div className="stat-card-icon">
            $
          </div>

          <div className="stat-card-label">
            Accounts
          </div>

          <div className="stat-card-value">
            {accounts.length}
          </div>

          <div className="stat-card-footer">

            <span>
              Active accounts
            </span>

            <span className="stat-card-arrow">
              →
            </span>

          </div>

        </button>


        {/* SPENDING */}

        <button
          type="button"
          className="dashboard-stat-card spending-stat-card"
          onClick={() =>
            navigate("transactions")
          }
        >

          <div className="stat-card-icon spending-icon">
            −
          </div>

          <div className="stat-card-label">
            Recent Spending
          </div>

          <div className="stat-card-value">
            $
            {formatCurrency(
              totalSpending
            )}
          </div>

          <div className="stat-card-footer">

            <span>
              Recorded transactions
            </span>

            <span className="stat-card-arrow">
              →
            </span>

          </div>

        </button>


        {/* SECURE SESSION */}

        <div className="dashboard-stat-card secure-stat-card">

          <div className="secure-pulse"></div>

          <div className="stat-card-icon secure-icon">
            ✓
          </div>

          <div className="stat-card-label">
            Secure Session
          </div>

          <div className="secure-status-text">
            Protected
          </div>

          <div className="stat-card-footer">

            <span>
              GFB Online Banking
            </span>

            <span className="secure-dot"></span>

          </div>

        </div>

      </section>


      {/* =====================================
          QUICK ACTIONS
      ===================================== */}

      <section className="dashboard-section">

        <div className="dashboard-section-header">

          <div>
            <p className="eyebrow">
              Quick Access
            </p>

            <h2>
              What would you like to do?
            </h2>
          </div>

        </div>


        <div className="dashboard-actions-grid">

          <button
            type="button"
            className="dashboard-action-card"
            onClick={() =>
              navigate("payments")
            }
          >

            <span className="dashboard-action-icon">
              $
            </span>

            <span>
              <strong>
                Make a Payment
              </strong>

              <small>
                Pay a recipient or bill
              </small>
            </span>

            <span className="dashboard-action-arrow">
              →
            </span>

          </button>


          <button
            type="button"
            className="dashboard-action-card"
            onClick={() =>
              navigate("transfers")
            }
          >

            <span className="dashboard-action-icon">
              ↔
            </span>

            <span>
              <strong>
                Transfer Money
              </strong>

              <small>
                Move money between accounts
              </small>
            </span>

            <span className="dashboard-action-arrow">
              →
            </span>

          </button>


          <button
            type="button"
            className="dashboard-action-card"
            onClick={() =>
              navigate("accounts")
            }
          >

            <span className="dashboard-action-icon">
              ◉
            </span>

            <span>
              <strong>
                View Accounts
              </strong>

              <small>
                See your account balances
              </small>
            </span>

            <span className="dashboard-action-arrow">
              →
            </span>

          </button>

        </div>

      </section>


      {/* =====================================
          ACCOUNTS
      ===================================== */}

      <section className="dashboard-section">

        <div className="dashboard-section-header">

          <div>

            <p className="eyebrow">
              Your Money
            </p>

            <h2>
              Accounts
            </h2>

          </div>

          <button
            type="button"
            className="dashboard-view-button"
            onClick={() =>
              navigate("accounts")
            }
          >
            View all
          </button>

        </div>


        <div className="dashboard-accounts-grid">

          {accounts.map((account) => (

            <div
              className="dashboard-account-card"
              key={account.id}
            >

              <div className="dashboard-account-top">

                <div>

                  <span className="dashboard-account-type">
                    {account.type}
                  </span>

                  <h3>
                    {account.name}
                  </h3>

                </div>

                <span className="dashboard-account-mark">
                  GFB
                </span>

              </div>


              <div className="dashboard-account-number">
                {account.number}
              </div>


              <div className="dashboard-account-bottom">

                <span>
                  Available Balance
                </span>

                <strong>
                  $
                  {formatCurrency(
                    account.balance
                  )}
                </strong>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================
          RECENT TRANSACTIONS
      ===================================== */}

      <section className="dashboard-section">

        <div className="dashboard-section-header">

          <div>

            <p className="eyebrow">
              Account Activity
            </p>

            <h2>
              Recent Transactions
            </h2>

          </div>

          <button
            type="button"
            className="dashboard-view-button"
            onClick={() =>
              navigate("transactions")
            }
          >
            View all
          </button>

        </div>


        <div className="dashboard-transactions">

          {recentTransactions.length === 0 ? (

            <div className="dashboard-empty-state">

              <div className="dashboard-empty-icon">
                $
              </div>

              <h3>
                No transactions yet
              </h3>

              <p>
                Your recent account activity
                will appear here.
              </p>

            </div>

          ) : (

            recentTransactions.map(
              (transaction) => (

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

                  <div className="dashboard-transaction-main">

                    <div
                      className={
                        transaction.amount < 0
                          ? "dashboard-transaction-icon spending"
                          : "dashboard-transaction-icon income"
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


                  <div className="dashboard-transaction-date">
                    {transaction.date}
                  </div>


                  <div
                    className={
                      transaction.amount < 0
                        ? "dashboard-transaction-amount spending"
                        : "dashboard-transaction-amount income"
                    }
                  >
                    {transaction.amount < 0
                      ? "-"
                      : "+"}
                    $
                    {formatCurrency(
                      Math.abs(
                        transaction.amount
                      )
                    )}
                  </div>

                </button>

              )
            )

          )}

        </div>

      </section>


      {/* =====================================
          SECURITY FOOTER
      ===================================== */}

      <section className="dashboard-security-card">

        <div className="dashboard-security-icon">
          ✓
        </div>

        <div>

          <strong>
            Your banking session is secure
          </strong>

          <p>
            Guardian Federal Bank uses
            security controls to help protect
            your online banking activity.
          </p>

        </div>

        <span className="dashboard-security-status">
          Protected
        </span>

      </section>


      {/* =====================================
          TRANSACTION RECEIPT
      ===================================== */}

      {selectedTransaction && (
        <TransactionReceipt
          transaction={selectedTransaction}
          accountName={
            accounts.find(
              (account) =>
                account.id ===
                selectedTransaction.accountId
            )?.name ?? "GFB Account"
          }
          onClose={() =>
            setSelectedTransaction(null)
          }
        />
      )}

    </main>
  );
}

export default Dashboard;