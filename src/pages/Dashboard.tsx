import { useMemo } from "react";
import { useBanking } from "../BankingContext";

function formatCurrency(amount: number) {
return amount.toLocaleString("en-US", {
style: "currency",
currency: "USD",
minimumFractionDigits: 2,
});
}

function Dashboard() {
const {
accounts,
transactions,
showBalance,
setShowBalance,
} = useBanking();

const totalBalance = useMemo(
() =>
accounts.reduce(
(total, account) => total + account.balance,
0
),
[accounts]
);

const moneyIn = useMemo(
() =>
transactions
.filter((transaction) => transaction.amount > 0)
.reduce(
(total, transaction) =>
total + transaction.amount,
0
),
[transactions]
);

const moneyOut = useMemo(
() =>
transactions
.filter((transaction) => transaction.amount < 0)
.reduce(
(total, transaction) =>
total + Math.abs(transaction.amount),
0
),
[transactions]
);

const recentTransactions = useMemo(
() => transactions.slice(0, 6),
[transactions]
);

const maskBalance = (value: string) =>
showBalance ? value : "••••••••";

return ( <section className="dashboard-page"> <div className="dashboard-header"> <div> <p className="eyebrow">PERSONAL BANKING</p>

```
      <h1>Welcome back</h1>

      <p className="page-description">
        Here's your financial overview and recent
        account activity.
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

  <div className="dashboard-balance-card">
    <div className="dashboard-balance-content">
      <div>
        <p className="dashboard-balance-label">
          TOTAL AVAILABLE BALANCE
        </p>

        <h2>
          {maskBalance(
            formatCurrency(totalBalance)
          )}
        </h2>

        <p className="dashboard-balance-subtitle">
          Across {accounts.length} linked{" "}
          {accounts.length === 1
            ? "account"
            : "accounts"}
        </p>
      </div>

      <div className="dashboard-balance-icon">
        $
      </div>
    </div>

    <div className="dashboard-balance-footer">
      <span>Account status</span>

      <strong>
        <span className="dashboard-status-dot" />
        All accounts active
      </strong>
    </div>
  </div>

  <div className="dashboard-stat-grid">
    <div className="dashboard-stat-card">
      <div className="dashboard-stat-icon dashboard-stat-icon-green">
        ↑
      </div>

      <div>
        <p>Money in</p>

        <strong>
          {maskBalance(
            formatCurrency(moneyIn)
          )}
        </strong>

        <span>
          Incoming transaction activity
        </span>
      </div>
    </div>

    <div className="dashboard-stat-card">
      <div className="dashboard-stat-icon dashboard-stat-icon-red">
        ↓
      </div>

      <div>
        <p>Money out</p>

        <strong>
          {maskBalance(
            formatCurrency(moneyOut)
          )}
        </strong>

        <span>
          Outgoing transaction activity
        </span>
      </div>
    </div>

    <div className="dashboard-stat-card">
      <div className="dashboard-stat-icon dashboard-stat-icon-blue">
        #
      </div>

      <div>
        <p>Accounts</p>

        <strong>{accounts.length}</strong>

        <span>
          Active linked accounts
        </span>
      </div>
    </div>
  </div>

  <div className="dashboard-content-grid">
    <div className="dashboard-panel">
      <div className="dashboard-panel-header">
        <div>
          <p className="eyebrow">
            YOUR MONEY
          </p>

          <h2>Account overview</h2>
        </div>

        <span className="dashboard-panel-count">
          {accounts.length}{" "}
          {accounts.length === 1
            ? "account"
            : "accounts"}
        </span>
      </div>

      <div className="dashboard-account-list">
        {accounts.length === 0 ? (
          <div className="dashboard-empty">
            <div>+</div>

            <strong>
              No accounts available
            </strong>

            <span>
              Your linked accounts will
              appear here.
            </span>
          </div>
        ) : (
          accounts.map((account) => (
            <div
              className="dashboard-account-row"
              key={account.id}
            >
              <div className="dashboard-account-mark">
                {account.type
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="dashboard-account-info">
                <strong>
                  {account.name}
                </strong>

                <span>
                  {account.type} ••••{" "}
                  {account.number.slice(-4)}
                </span>
              </div>

              <div className="dashboard-account-balance">
                <strong>
                  {maskBalance(
                    formatCurrency(
                      account.balance
                    )
                  )}
                </strong>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    <div className="dashboard-panel">
      <div className="dashboard-panel-header">
        <div>
          <p className="eyebrow">
            RECENT ACTIVITY
          </p>

          <h2>Recent transactions</h2>
        </div>

        <span className="dashboard-panel-count">
          {recentTransactions.length}
        </span>
      </div>

      <div className="dashboard-transaction-list">
        {recentTransactions.length === 0 ? (
          <div className="dashboard-empty">
            <div>✓</div>

            <strong>
              No recent transactions
            </strong>

            <span>
              Your latest account activity
              will appear here.
            </span>
          </div>
        ) : (
          recentTransactions.map(
            (transaction) => {
              const isIncoming =
                transaction.amount > 0;

              return (
                <div
                  className="dashboard-transaction-row"
                  key={transaction.id}
                >
                  <div
                    className={`dashboard-transaction-icon ${
                      isIncoming
                        ? "incoming"
                        : "outgoing"
                    }`}
                  >
                    {isIncoming ? "↑" : "↓"}
                  </div>

                  <div className="dashboard-transaction-info">
                    <strong>
                      {transaction.merchant}
                    </strong>

                    <span>
                      {transaction.description}
                    </span>

                    <small>
                      {transaction.date}
                    </small>
                  </div>

                  <strong
                    className={`dashboard-transaction-amount ${
                      isIncoming
                        ? "incoming"
                        : "outgoing"
                    }`}
                  >
                    {showBalance
                      ? `${isIncoming ? "+" : "-"}${formatCurrency(
                          Math.abs(
                            transaction.amount
                          )
                        )}`
                      : "••••"}
                  </strong>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  </div>

  <div className="dashboard-security-banner">
    <div className="dashboard-security-icon">
      ✓
    </div>

    <div>
      <strong>
        Your account is protected
      </strong>

      <span>
        Guardian Federal Bank monitors
        account activity and helps protect
        your banking information.
      </span>
    </div>

    <span className="dashboard-security-status">
      Secure
    </span>
  </div>
</section>

);
}

export default Dashboard;