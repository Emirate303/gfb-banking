import { useMemo } from "react";
import type { Page } from "../App";
import { useBanking } from "../BankingContext";

interface AccountsProps {
  onNavigate?: (page: Page) => void;
}

function Accounts({
  onNavigate,
}: AccountsProps) {
  const {
  accounts,
  showBalance,
  setShowBalance,
} = useBanking();

  const totalBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) =>
        total + account.balance,
      0
    );
  }, [accounts]);

  // KEEP THE REST OF YOUR EXISTING ACCOUNTS.TSX CODE BELOW THIS POINT

  function formatCurrency(
    value: number
  ) {
    return `$${value.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  function displayBalance(
    value: number
  ) {
    return showBalance
      ? formatCurrency(value)
      : "••••••";
  }

  return (
    <main className="accounts-page">

      <header className="accounts-header">

        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Accounts
          </h1>

          <p>
            View and manage your GFB
            accounts in one place.
          </p>
        </div>

        <button
          type="button"
          className="accounts-balance-toggle"
          onClick={() =>
            setShowBalance(!showBalance)
          }
        >
          {showBalance
            ? "Hide balances"
            : "Show balances"}
        </button>

      </header>


      <section className="accounts-total-card">

        <div>
          <span>
            TOTAL AVAILABLE BALANCE
          </span>

          <strong className="dashboard-total-balance">
            {displayBalance(
              totalBalance
            )}
          </strong>

          <small>
            Across {accounts.length}{" "}
            account
            {accounts.length === 1
              ? ""
              : "s"}
          </small>
        </div>

        <div className="accounts-total-icon">
          $
        </div>

      </section>


      <section className="accounts-section">

        <div className="accounts-section-header">

          <div>
            <p className="eyebrow">
              Account portfolio
            </p>

            <h2>
              Your accounts
            </h2>
          </div>

          <span>
            {accounts.length} account
            {accounts.length === 1
              ? ""
              : "s"}
          </span>

        </div>


        <div className="accounts-grid">

          {accounts.map((account) => (
            <article
              className="account-card"
              key={account.id}
            >

              <div className="account-card-top">

                <div className="account-card-icon">
                  $
                </div>

                <span className="account-card-type">
                  {account.type}
                </span>

              </div>


              <div className="account-card-details">

                <p>
                  {account.name}
                </p>

                <span>
                  Account ••••
                  {account.number.slice(-4)}
                </span>

              </div>


              <div className="account-card-balance-section">

                <span>
                  Available balance
                </span>

                <strong className="account-card-balance">
                  {displayBalance(
                    account.balance
                  )}
                </strong>

              </div>


              <button
                type="button"
                className="account-card-action"
                onClick={() =>
                  onNavigate?.(
                    "transactions"
                  )
                }
              >
                View transactions →
              </button>

            </article>
          ))}

        </div>

      </section>


      <section className="accounts-security-panel">

        <div className="accounts-security-icon">
          ✓
        </div>

        <div>
          <strong>
            Your account information
            is protected
          </strong>

          <p>
            Keep your banking information
            secure and never share your
            account credentials with others.
          </p>
        </div>

      </section>

    </main>
  );
}

export default Accounts;