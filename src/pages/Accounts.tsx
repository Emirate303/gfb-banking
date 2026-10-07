import { useState } from "react";
import { useBanking } from "../BankingContext";

interface AccountsProps {
  onNavigate?: (page: string) => void;
}

function Accounts({ onNavigate }: AccountsProps) {
  const { accounts } = useBanking();

  const [showBalances, setShowBalances] =
    useState(true);

  const totalBalance = accounts.reduce(
    (total, account) =>
      total + account.balance,
    0
  );

  function money(value: number) {
    return `$${value.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  function maskedAccountNumber(
    number: string
  ) {
    const clean =
      number.replace(/\s/g, "");

    return `•••• ${clean.slice(-4)}`;
  }

  return (
    <main className="accounts-page polished-accounts-page">

      {/* HEADER */}

      <header className="polished-accounts-header">

        <div>
          <div className="accounts-breadcrumb">
            Banking
            <span>/</span>
            Accounts
          </div>

          <h1>
            Accounts
          </h1>

          <p>
            View your accounts and manage
            your available funds.
          </p>
        </div>

        <button
          type="button"
          className="accounts-balance-toggle"
          onClick={() =>
            setShowBalances(
              (value) => !value
            )
          }
        >
          <span>
            {showBalances ? "◉" : "○"}
          </span>

          {showBalances
            ? "Hide balances"
            : "Show balances"}
        </button>

      </header>


      {/* TOTAL BALANCE */}

      <section className="accounts-total-panel">

        <div>

          <span>
            TOTAL AVAILABLE BALANCE
          </span>

          <strong>
            {showBalances
              ? money(totalBalance)
              : "••••••••"}
          </strong>

          <small>
            Across all your GFB accounts
          </small>

        </div>

        <div className="accounts-total-icon">
          $
        </div>

      </section>


      {/* ACCOUNT COUNT */}

      <div className="accounts-section-heading">

        <div>
          <span>
            YOUR ACCOUNTS
          </span>

          <h2>
            {accounts.length}{" "}
            {accounts.length === 1
              ? "account"
              : "accounts"}
          </h2>
        </div>

        <span className="accounts-active-status">
          <i />
          All accounts active
        </span>

      </div>


      {/* ACCOUNT CARDS */}

      <section className="accounts-grid">

        {accounts.map(
          (account, index) => {

            const accountNumber =
              String(
                account.number ?? ""
              );

            const isChecking =
              account.type
                .toLowerCase()
                .includes("checking");

            return (
              <article
                key={account.id}
                className={`modern-account-card ${
                  index === 0
                    ? "primary-account"
                    : ""
                }`}
              >

                {/* CARD HEADER */}

                <div className="account-card-header">

                  <div className="account-type-icon">
                    {isChecking
                      ? "C"
                      : "S"}
                  </div>

                  <div className="account-type-info">

                    <span>
                      {account.type}
                    </span>

                    <strong>
                      {account.name}
                    </strong>

                  </div>

                  {index === 0 && (
                    <span className="primary-label">
                      PRIMARY
                    </span>
                  )}

                </div>


                {/* BALANCE */}

                <div className="account-card-balance">

                  <span>
                    AVAILABLE BALANCE
                  </span>

                  <strong>
                    {showBalances
                      ? money(
                          account.balance
                        )
                      : "••••••••"}
                  </strong>

                </div>


                {/* ACCOUNT NUMBER */}

                <div className="account-card-number">

                  <span>
                    ACCOUNT NUMBER
                  </span>

                  <strong>
                    {maskedAccountNumber(
                      accountNumber
                    )}
                  </strong>

                </div>


                {/* FOOTER */}

                <div className="account-card-footer">

                  <span>
                    {isChecking
                      ? "Everyday banking"
                      : "Savings"}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      onNavigate?.(
                        "transactions"
                      )
                    }
                  >
                    View activity →
                  </button>

                </div>

              </article>
            );
          }
        )}

      </section>


      {/* EMPTY STATE */}

      {accounts.length === 0 && (
        <section className="accounts-empty-state">

          <div>
            $
          </div>

          <h2>
            No accounts available
          </h2>

          <p>
            Your GFB accounts will appear
            here once they are available.
          </p>

        </section>
      )}


      {/* ACCOUNT SERVICES */}

      <section className="account-services">

        <div className="account-services-heading">

          <span>
            ACCOUNT SERVICES
          </span>

          <h2>
            Manage your banking
          </h2>

        </div>


        <div className="account-services-grid">

          <button
            type="button"
            onClick={() =>
              onNavigate?.(
                "transfers"
              )
            }
          >
            <span className="service-icon">
              →
            </span>

            <div>
              <strong>
                Transfer money
              </strong>

              <small>
                Move money between accounts
              </small>
            </div>

            <b>
              →
            </b>
          </button>


          <button
            type="button"
            onClick={() =>
              onNavigate?.(
                "payments"
              )
            }
          >
            <span className="service-icon">
              $
            </span>

            <div>
              <strong>
                Make a payment
              </strong>

              <small>
                Pay a recipient or bill
              </small>
            </div>

            <b>
              →
            </b>
          </button>


          <button
            type="button"
            onClick={() =>
              onNavigate?.(
                "cards"
              )
            }
          >
            <span className="service-icon">
              ▣
            </span>

            <div>
              <strong>
                Manage cards
              </strong>

              <small>
                View and secure your cards
              </small>
            </div>

            <b>
              →
            </b>
          </button>

        </div>

      </section>


      {/* SECURITY */}

      <section className="accounts-security">

        <div className="accounts-security-icon">
          ✓
        </div>

        <div>
          <strong>
            Your accounts are protected
          </strong>

          <p>
            Guardian Federal Bank uses
            security controls to help protect
            your account information.
          </p>
        </div>

      </section>

    </main>
  );
}

export default Accounts;