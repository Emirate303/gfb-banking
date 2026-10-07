import { useBanking } from "../BankingContext";

function Cards() {
  const {
    accounts,
    showBalance,
    setShowBalance,
  } = useBanking();

  function formatCurrency(amount: number) {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <main className="cards-page">

      {/* PAGE HEADER */}

      <section className="cards-page-header">

        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Cards
          </h1>

          <p>
            Manage your GFB cards and view
            available balances.
          </p>
        </div>

        <button
          type="button"
          className="balance-hide-button"
          onClick={() =>
            setShowBalance(!showBalance)
          }
        >
          {showBalance
            ? "Hide Balance"
            : "Show Balance"}
        </button>

      </section>


      {/* CARD OVERVIEW */}

      <section className="cards-overview">

        <div className="cards-overview-top">

          <div>
            <span className="cards-overview-label">
              Available Balance
            </span>

            <strong>
              {showBalance
                ? `$${formatCurrency(
                    accounts.reduce(
                      (total, account) =>
                        total + account.balance,
                      0
                    )
                  )}`
                : "••••••••"}
            </strong>

            <small>
              Across your GFB accounts
            </small>
          </div>

          <div className="cards-overview-mark">
            GFB
          </div>

        </div>

      </section>


      {/* CARDS */}

      <section className="cards-section">

        <div className="cards-section-header">

          <div>
            <p className="eyebrow">
              Your Cards
            </p>

            <h2>
              GFB Cards
            </h2>
          </div>

          <span className="cards-count">
            {accounts.length}{" "}
            {accounts.length === 1
              ? "Account"
              : "Accounts"}
          </span>

        </div>


        <div className="cards-grid">

          {accounts.map((account, index) => (

            <article
              className="gfb-bank-card"
              key={account.id}
            >

              {/* CARD TOP */}

              <div className="gfb-bank-card-top">

                <div>

                  <span className="gfb-card-label">
                    GUARDIAN FEDERAL BANK
                  </span>

                  <strong>
                    {index % 2 === 0
                      ? "GFB DEBIT"
                      : "GFB BANKING CARD"}
                  </strong>

                </div>

                <div className="gfb-card-chip">
                  GFB
                </div>

              </div>


              {/* CARD NUMBER */}

              <div className="gfb-card-number">
                •••• &nbsp; •••• &nbsp; •••• &nbsp;
                {account.number.slice(-4)}
              </div>


              {/* CARD DETAILS */}

              <div className="gfb-card-details">

                <div>
                  <span>
                    CARDHOLDER
                  </span>

                  <strong>
                    GFB CUSTOMER
                  </strong>
                </div>

                <div>
                  <span>
                    ACCOUNT
                  </span>

                  <strong>
                    {account.number}
                  </strong>
                </div>

              </div>


              {/* CARD BALANCE */}

              <div className="gfb-card-balance">

                <span>
                  Available Balance
                </span>

                <strong>
                  {showBalance
                    ? `$${formatCurrency(
                        account.balance
                      )}`
                    : "••••••••"}
                </strong>

              </div>


              {/* CARD FOOTER */}

              <div className="gfb-card-footer">

                <span>
                  {account.type}
                </span>

                <span>
                  ACTIVE
                </span>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* CARD SECURITY */}

      <section className="cards-security">

        <div className="cards-security-icon">
          ✓
        </div>

        <div>

          <strong>
            Your cards are protected
          </strong>

          <p>
            Keep your card information
            private and contact GFB if you
            notice activity you don't
            recognize.
          </p>

        </div>

        <span className="cards-security-status">
          Secure
        </span>

      </section>

    </main>
  );
}

export default Cards;