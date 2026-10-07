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
    );
  }, [accounts]);

  const savingsAccounts = useMemo(() => {
    return accounts.filter(
      (account) =>
        account.type.toLowerCase() === "savings"
    );
  }, [accounts]);

  const checkingBalance = useMemo(() => {
    return checkingAccounts.reduce(
      (total, account) => total + account.balance,
      0
    );
  }, [checkingAccounts]);

  const savingsBalance = useMemo(() => {
    return savingsAccounts.reduce(
      (total, account) => total + account.balance,
      0
    );
  }, [savingsAccounts]);

  return (
    <section className="accounts-page">
      <div className="accounts-header">
        <div>
          <p className="eyebrow">BANKING</p>

          <h1>Your accounts</h1>

          <p className="page-description">
            Manage your Guardian Federal Bank accounts,
            balances, and everyday banking activity from
            one secure place.
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

      <div className="accounts-overview-card">
        <div className="accounts-overview-main">
          <div>
            <p className="accounts-overview-label">
              TOTAL AVAILABLE BALANCE
            </p>

            <h2>
              {showBalance
                ? formatCurrency(totalBalance)
                : "••••••••"}
            </h2>

            <span>
              Across {accounts.length} active account
              {accounts.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="accounts-overview-icon">
            $
          </div>
        </div>

        <div className="accounts-overview-footer">
          <div>
            <span className="accounts-status-dot" />

            <strong>All accounts active</strong>
          </div>

          <span>Guardian Federal Bank</span>
        </div>
      </div>

      <div className="accounts-stat-grid">
        <div className="accounts-stat-card">
          <div className="accounts-stat-icon">
            #
          </div>

          <div>
            <span>Total accounts</span>

            <strong>{accounts.length}</strong>

            <small>Linked accounts</small>
          </div>
        </div>

        <div className="accounts-stat-card">
          <div className="accounts-stat-icon checking">
            C
          </div>

          <div>
            <span>Checking</span>

            <strong>
              {showBalance
                ? formatCurrency(checkingBalance)
                : "••••••"}
            </strong>

            <small>
              {checkingAccounts.length} account
              {checkingAccounts.length === 1
                ? ""
                : "s"}
            </small>
          </div>
        </div>

        <div className="accounts-stat-card">
          <div className="accounts-stat-icon savings">
            S
          </div>

          <div>
            <span>Savings</span>

            <strong>
              {showBalance
                ? formatCurrency(savingsBalance)
                : "••••••"}
            </strong>

            <small>
              {savingsAccounts.length} account
              {savingsAccounts.length === 1
                ? ""
                : "s"}
            </small>
          </div>
        </div>
      </div>

      <div className="accounts-section">
        <div className="accounts-section-header">
          <div>
            <p className="eyebrow">
              ACCOUNT PORTFOLIO
            </p>

            <h2>All accounts</h2>

            <p>
              Your current GFB deposit accounts and
              available balances.
            </p>
          </div>

          <span className="accounts-section-count">
            {accounts.length} total
          </span>
        </div>

        {accounts.length === 0 ? (
          <div className="accounts-empty">
            <div className="accounts-empty-icon">
              $
            </div>

            <strong>
              No accounts available
            </strong>

            <span>
              Your banking accounts will appear here.
            </span>
          </div>
        ) : (
          <div className="accounts-grid">
            {accounts.map((account) => {
              const accountType =
                account.type.toLowerCase();

              const isChecking =
                accountType === "checking";

              return (
                <article
                  className="account-card"
                  key={account.id}
                >
                  <div className="account-card-top">
                    <div
                      className={`account-type-icon ${
                        isChecking
                          ? "checking"
                          : "savings"
                      }`}
                    >
                      {isChecking ? "C" : "S"}
                    </div>

                    <span className="account-active-status">
                      <span />
                      Active
                    </span>
                  </div>

                  <div className="account-card-content">
                    <p className="account-card-type">
                      {account.type}
                    </p>

                    <h3>{account.name}</h3>

                    <span className="account-number">
                      Account ending in{" "}
                      {account.number.slice(-4)}
                    </span>

                    <div className="account-card-balance">
                      <span>Available balance</span>

                      <strong>
                        {showBalance
                          ? formatCurrency(
                              account.balance
                            )
                          : "••••••"}
                      </strong>
                    </div>
                  </div>

                  <div className="account-card-footer">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        onNavigate?.("transactions")
                      }
                    >
                      View activity
                    </button>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={() =>
                        onNavigate?.("transfers")
                      }
                    >
                      Transfer
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <div className="accounts-help-banner">
        <div className="accounts-help-icon">
          ✓
        </div>

        <div>
          <strong>
            Your accounts are protected
          </strong>

          <span>
            Keep your account information secure and
            contact GFB support if you notice
            anything unusual.
          </span>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            onNavigate?.("settings")
          }
        >
          Account settings
        </button>
      </div>
    </section>
  );
}

export default Accounts;