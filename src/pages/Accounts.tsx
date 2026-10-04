import { useBanking } from "../BankingContext";

function Accounts() {
  const { accounts } = useBanking();

  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  return (
    <main className="accounts-page">
      {/* Page Header */}
      <section className="page-heading">
        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>Your Accounts</h1>

          <p>
            View your GFB accounts and available
            balances.
          </p>
        </div>
      </section>

      {/* Account Summary */}
      <section className="accounts-summary">
        <div className="accounts-summary-card">
          <span>Total Balance</span>

          <strong>
            $
            {totalBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>

          <small>
            Across all accounts
          </small>
        </div>

        <div className="accounts-summary-card">
          <span>Total Accounts</span>

          <strong>
            {accounts.length}
          </strong>

          <small>
            Active GFB accounts
          </small>
        </div>
      </section>

      {/* Account List */}
      <section className="accounts-list-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">
              Banking
            </p>

            <h2>
              Account Overview
            </h2>
          </div>
        </div>

        {accounts.length > 0 ? (
          <div className="accounts-grid">
            {accounts.map((account) => (
              <article
                className="account-card"
                key={account.id}
              >
                <div className="account-card-header">
                  <div className="account-card-icon">
                    $
                  </div>

                  <span className="account-status">
                    Active
                  </span>
                </div>

                <div className="account-card-content">
                  <span className="account-type">
                    {account.type}
                  </span>

                  <h3>
                    {account.name}
                  </h3>

                  <p className="account-number">
                    Account ••••
                    {account.number.slice(-4)}
                  </p>

                  <div className="account-card-balance">
                    <span>
                      Available Balance
                    </span>

                    <strong>
                      $
                      {account.balance.toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>
              No accounts found
            </h3>

            <p>
              There are currently no accounts
              available.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Accounts;