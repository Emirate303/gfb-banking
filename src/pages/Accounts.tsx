import { useMemo } from "react";
import type { Page } from "../App";
import { useBanking } from "../BankingContext";

interface AccountsProps {
  onNavigate?: (page: Page) => void;
}

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

function Accounts({ onNavigate }: AccountsProps) {
  const {
    accounts,
    showBalance,
    setShowBalance,
  } = useBanking();

  const totalBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => total + account.balance,
      0
    );
  }, [accounts]);

  const checkingAccounts = useMemo(() => {
    return accounts.filter(
      (account) =>
        account.type.toLowerCase() === "checking"
    ).length;
  }, [accounts]);

  const savingsAccounts = useMemo(() => {
    return accounts.filter(
      (account) =>
        account.type.toLowerCase() === "savings"
    ).length;
  }, [accounts]);

  return (
    <section className="accounts-page">
      <div className="accounts-header">
        <div>
          <p className="eyebrow">
            YOUR MONEY
          </p>

          <h1>Accounts</h1>

          <p className="page-description">
            View your Guardian Federal Bank accounts,
            balances, and account information in one
            place.
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
            ? "Hide balances"
            : "Show balances"}
        </button>
      </div>

      <div className="accounts-summary-grid">
        <div className="accounts-summary-card">
          <div className="accounts-summary-icon">
            $
          </div>

          <div>
            <span>Total available</span>

            <strong>
              {showBalance
                ? formatCurrency(totalBalance)
                : "••••••"}
            </strong>

            <small>
              Across all linked accounts
            </small>
          </div>
        </div>

        <div className="accounts-summary-card">
          <div className="accounts-summary-icon">
            ◉
          </div>

          <div>
            <span>Checking accounts</span>

            <strong>
              {checkingAccounts}
            </strong>

            <small>
              Active checking accounts
            </small>
          </div>
        </div>

        <div className="accounts-summary-card">
          <div className="accounts-summary-icon">
            ◇
          </div>

          <div>
            <span>Savings accounts</span>

            <strong>
              {savingsAccounts}
            </strong>

            <small>
              Active savings accounts
            </small>
          </div>
        </div>
      </div>

      <div className="accounts-content">
        <div className="accounts-list-panel">
          <div className="accounts-list-header">
            <div>
              <p className="eyebrow">
                LINKED ACCOUNTS
              </p>

              <h2>Your accounts</h2>

              <p>
                Review your current account balances
                and account details.
              </p>
            </div>

            <span className="accounts-count">
              {accounts.length}{" "}
              {accounts.length === 1
                ? "account"
                : "accounts"}
            </span>
          </div>

          {accounts.length === 0 ? (
            <div className="accounts-empty">
              <div className="accounts-empty-icon">
                +
              </div>

              <strong>
                No accounts available
              </strong>

              <span>
                Your linked accounts will appear here.
              </span>
            </div>
          ) : (
            <div className="accounts-list">
              {accounts.map((account) => (
                <article
                  className="account-card"
                  key={account.id}
                >
                  <div className="account-card-main">
                    <div className="account-card-icon">
                      {account.type
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="account-card-info">
                      <p className="eyebrow">
                        {account.type}
                      </p>

                      <h3>
                        {account.name}
                      </h3>

                      <span>
                        Account ••••{" "}
                        {account.number.slice(-4)}
                      </span>
                    </div>
                  </div>

                  <div className="account-card-balance">
                    <span>
                      Available balance
                    </span>

                    <strong>
                      {showBalance
                        ? formatCurrency(
                            account.balance
                          )
                        : "••••••"}
                    </strong>

                    <span className="account-active">
                      <span />
                      Active
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="accounts-sidebar">
          <div className="accounts-side-card">
            <div className="accounts-side-icon">
              ⇄
            </div>

            <p className="eyebrow">
              MONEY MOVEMENT
            </p>

            <h3>
              Move money between accounts
            </h3>

            <p>
              Transfer funds securely between your
              linked Guardian Federal Bank accounts.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={() =>
                onNavigate?.("transfers")
              }
            >
              Transfer money
            </button>
          </div>

          <div className="accounts-side-card">
            <div className="accounts-side-icon">
              $
            </div>

            <p className="eyebrow">
              PAYMENTS
            </p>

            <h3>
              Pay a company or recipient
            </h3>

            <p>
              Make a payment directly from one of
              your available accounts.
            </p>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                onNavigate?.("payments")
              }
            >
              Make a payment
            </button>
          </div>
        </aside>
      </div>

      <div className="accounts-security-banner">
        <div className="accounts-security-icon">
          ✓
        </div>

        <div>
          <strong>
            Your account information is protected
          </strong>

          <span>
            Keep your banking credentials and account
            information private and secure.
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
    </section>
  );
}

export default Accounts;