import { useBanking } from "../BankingContext";
import {
  useBankingSettings,
} from "../BankingSettingsContext";

function Transactions() {
  const {
    accounts,
    transactions,
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

  function displayAmount(
    amount: number
  ) {
    if (!settings.showBalances) {
      return "••••••";
    }

    const prefix =
      amount < 0 ? "-" : "+";

    return `${prefix}${formatCurrency(
      Math.abs(amount)
    )}`;
  }

  function getAccountName(
    accountId: string
  ) {
    const account = accounts.find(
      (item) => item.id === accountId
    );

    if (!account) {
      return "Unknown Account";
    }

    return account.name;
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">
          Account Activity
        </p>

        <h1>Transactions</h1>

        <p className="subtitle">
          Review your recent account activity.
        </p>
      </section>

      <section className="transactions-panel">
        <div className="section-header">
          <div>
            <h2>
              Transaction History
            </h2>

            <p>
              Your latest transactions and
              account activity.
            </p>
          </div>
        </div>

        <div className="transactions-list">
          {transactions.length === 0 ? (
            <div className="empty-transactions">
              <strong>
                No transactions yet
              </strong>

              <span>
                Your account activity will
                appear here.
              </span>
            </div>
          ) : (
            transactions.map(
              (transaction) => (
                <article
                  className="transaction-row"
                  key={transaction.id}
                >
                  <div className="transaction-main">
                    <div className="transaction-icon">
                      {transaction.merchant
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="transaction-details">
                      <strong>
                        {transaction.merchant}
                      </strong>

                      <span>
                        {transaction.description}
                      </span>

                      <small>
                        {transaction.date}
                        {" • "}
                        {getAccountName(
                          transaction.accountId ??
                            ""
                        )}
                      </small>
                    </div>
                  </div>

                  <div className="transaction-amount">
                    <strong
                      className={
                        transaction.amount <
                        0
                          ? "transaction-negative"
                          : "transaction-positive"
                      }
                    >
                      {displayAmount(
                        transaction.amount
                      )}
                    </strong>
                  </div>
                </article>
              )
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default Transactions;