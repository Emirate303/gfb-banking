import { useBanking } from "../BankingContext";
import {
  useBankingSettings,
} from "../BankingSettingsContext";

function Accounts() {
  const {
    accounts,
  } = useBanking();

  const {
    settings,
  } = useBankingSettings();

  function formatCurrency(
    value: number
  ) {
    return value.toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    );
  }

  function displayBalance(
    balance: number
  ) {
    if (!settings.showBalances) {
      return "••••••";
    }

    return formatCurrency(balance);
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">
          Account Overview
        </p>

        <h1>Accounts</h1>

        <p className="subtitle">
          View your available accounts and
          current balances.
        </p>
      </section>

      <section className="accounts-panel">
        <div className="section-header">
          <div>
            <h2>
              Your Accounts
            </h2>

            <p>
              Current account information.
            </p>
          </div>
        </div>

        <div className="accounts-grid">
          {accounts.length === 0 ? (
            <div className="empty-accounts">
              <strong>
                No accounts available
              </strong>

              <span>
                Add an account to get started.
              </span>
            </div>
          ) : (
            accounts.map((account) => (
              <article
                className="account-card"
                key={account.id}
              >
                <div className="account-card-top">
                  <div>
                    <span className="account-type">
                      {account.type}
                    </span>

                    <h2>
                      {account.name}
                    </h2>
                  </div>

                  <span className="account-status">
                    Active
                  </span>
                </div>

                <div className="account-number">
                  {account.number}
                </div>

                <div className="account-balance">
                  <span>
                    Available Balance
                  </span>

                  <strong>
                    {displayBalance(
                      account.balance
                    )}
                  </strong>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Accounts;