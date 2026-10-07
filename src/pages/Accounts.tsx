import { useBanking } from "../BankingContext";

function Accounts() {
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

  const totalBalance = accounts.reduce(
    (total, account) =>
      total + account.balance,
    0
  );

  return (
    <main className="accounts-page">

      {/* PAGE HEADER */}

      <section className="accounts-header">

        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Accounts
          </h1>

          <p>
            View your accounts and available
            balances.
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


      {/* TOTAL BALANCE */}

      <section className="accounts-total-card">

        <div>
          <span>
            Total Available Balance
          </span>

          <strong>
            {showBalance
              ? `$${formatCurrency(
                  totalBalance
                )}`
              : "••••••••"}
          </strong>

          <small>
            Across all GFB accounts
          </small>
        </div>

        <div className="accounts-total-mark">
          GFB
        </div>

      </section>


      {/* ACCOUNTS */}

      <section className="accounts-list-section">

        <div className="accounts-section-heading">

          <div>
            <p className="eyebrow">
              Your Banking
            </p>

            <h2>
              All Accounts
            </h2>
          </div>

          <span>
            {accounts.length}{" "}
            {accounts.length === 1
              ? "Account"
              : "Accounts"}
          </span>

        </div>


        <div className="accounts-grid">

          {accounts.map((account) => (

            <article
              className="account-card"
              key={account.id}
            >

              <div className="account-card-top">

                <div>

                  <span className="account-type">
                    {account.type}
                  </span>

                  <h3>
                    {account.name}
                  </h3>

                </div>

                <div className="account-card-logo">
                  GFB
                </div>

              </div>


              <div className="account-number">
                {account.number}
              </div>


              <div className="account-card-balance">

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


              <div className="account-card-footer">

                <span>
                  Guardian Federal Bank
                </span>

                <span>
                  Active
                </span>

              </div>

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}

export default Accounts;