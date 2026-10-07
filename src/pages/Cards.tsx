import { useMemo } from "react";
import { useBanking } from "../BankingContext";

interface CardsProps {
  onNavigate?: (page: string) => void;
}

function Cards({
  onNavigate,
}: CardsProps) {
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
    <main className="cards-page">

      <header className="cards-header">

        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Cards
          </h1>

          <p>
            Manage your GFB debit and
            account cards.
          </p>
        </div>

        <button
          type="button"
          className="cards-balance-toggle"
          onClick={() =>
            setShowBalance(!showBalance)
          }
        >
          {showBalance
            ? "Hide balances"
            : "Show balances"}
        </button>

      </header>


      <section className="cards-overview">

        <div className="cards-overview-content">

          <span>
            TOTAL ACCOUNT BALANCE
          </span>

          <strong>
            {displayBalance(
              totalBalance
            )}
          </strong>

          <small>
            Across all linked GFB accounts
          </small>

        </div>

        <div className="cards-overview-icon">
          ◆
        </div>

      </section>


      <section className="cards-section">

        <div className="cards-section-header">

          <div>
            <p className="eyebrow">
              Your cards
            </p>

            <h2>
              GFB account cards
            </h2>
          </div>

          <span>
            {accounts.length} card
            {accounts.length === 1
              ? ""
              : "s"}
          </span>

        </div>


        <div className="gfb-card-grid">

          {accounts.map(
            (account, index) => {

              const lastFour =
                account.number.slice(-4);

              return (
                <article
                  className="gfb-bank-card"
                  key={account.id}
                >

                  <div className="gfb-card-top">

                    <div>
                      <span className="gfb-card-label">
                        GUARDIAN FEDERAL BANK
                      </span>

                      <strong>
                        GFB
                      </strong>
                    </div>

                    <div className="gfb-card-chip">
                      ▦
                    </div>

                  </div>


                  <div className="gfb-card-number">

                    <span>
                      •••• •••• ••••{" "}
                      {lastFour}
                    </span>

                  </div>


                  <div className="gfb-card-bottom">

                    <div>
                      <small>
                        CARDHOLDER
                      </small>

                      <strong>
                        GFB CUSTOMER
                      </strong>
                    </div>

                    <div>
                      <small>
                        TYPE
                      </small>

                      <strong>
                        {account.type}
                      </strong>
                    </div>

                  </div>


                  <div className="gfb-card-balance">

                    <span>
                      Available balance
                    </span>

                    <strong>
                      {displayBalance(
                        account.balance
                      )}
                    </strong>

                  </div>


                  <div className="gfb-card-index">
                    0{index + 1}
                  </div>

                </article>
              );
            }
          )}

        </div>

      </section>


      <section className="cards-management-grid">

        <div className="cards-management-card">

          <div className="cards-management-icon">
            ✓
          </div>

          <div>
            <p className="eyebrow">
              Card security
            </p>

            <h2>
              Your cards are protected
            </h2>

            <p>
              Keep your card information
              private and review your
              transactions regularly.
            </p>
          </div>

        </div>


        <div className="cards-management-card">

          <div className="cards-management-icon">
            →
          </div>

          <div>
            <p className="eyebrow">
              Account activity
            </p>

            <h2>
              Review transactions
            </h2>

            <p>
              Check recent activity and
              view detailed transaction
              receipts.
            </p>

            <button
              type="button"
              onClick={() =>
                onNavigate?.(
                  "transactions"
                )
              }
            >
              View transactions →
            </button>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Cards;