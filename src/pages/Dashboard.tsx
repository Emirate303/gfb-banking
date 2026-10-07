import { useMemo } from "react";
import { useBanking } from "../BankingContext";

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

interface SavedProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
}

function Dashboard() {
  const {
    accounts,
    transactions,
    showBalance,
    setShowBalance,
  } = useBanking();

  const profile = useMemo<SavedProfile>(() => {
    const saved = localStorage.getItem("banking_profile");

    if (!saved) {
      return {};
    }

    try {
      return JSON.parse(saved) as SavedProfile;
    } catch {
      return {};
    }
  }, []);

  const displayName =
    profile.firstName?.trim() || "Customer";

  const totalBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => total + account.balance,
      0
    );
  }, [accounts]);

  const moneyIn = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [transactions]);

  const moneyOut = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce(
        (total, transaction) =>
          total + Math.abs(transaction.amount),
        0
      );
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 6);
  }, [transactions]);

  const maskBalance = (value: string) =>
    showBalance ? value : "••••••••";

  function navigate(page: string) {
    window.dispatchEvent(
      new CustomEvent("gfb:navigate", {
        detail: page,
      })
    );
  }

  return (
    <section className="dashboard-page dashboard-mobile-page">

      {/* HEADER */}

      <header className="dashboard-header dashboard-mobile-header">

        <div className="dashboard-welcome">

          <p className="eyebrow">
            PERSONAL BANKING
          </p>

          <h1>
            Welcome back, {displayName}
          </h1>

          <p className="page-description">
            Here's your financial overview and recent
            account activity.
          </p>

        </div>

        <button
          type="button"
          className="secondary-button dashboard-balance-toggle"
          onClick={() =>
            setShowBalance(!showBalance)
          }
        >
          <span>
            {showBalance ? "◉" : "○"}
          </span>

          {showBalance
            ? "Hide balances"
            : "Show balances"}
        </button>

      </header>


      {/* QUICK ACTIONS */}

      <section className="dashboard-quick-actions">

        <button
          type="button"
          className="dashboard-quick-action"
          onClick={() => navigate("transfers")}
        >
          <span className="dashboard-quick-action-icon">
            ⇄
          </span>

          <span className="dashboard-quick-action-content">
            <strong>
              Transfer money
            </strong>

            <small>
              Move money between accounts
            </small>
          </span>

          <span className="dashboard-quick-action-arrow">
            →
          </span>
        </button>


        <button
          type="button"
          className="dashboard-quick-action"
          onClick={() => navigate("payments")}
        >
          <span className="dashboard-quick-action-icon">
            $
          </span>

          <span className="dashboard-quick-action-content">
            <strong>
              Make a payment
            </strong>

            <small>
              Pay a company or recipient
            </small>
          </span>

          <span className="dashboard-quick-action-arrow">
            →
          </span>
        </button>


        <button
          type="button"
          className="dashboard-quick-action"
          onClick={() => navigate("accounts")}
        >
          <span className="dashboard-quick-action-icon">
            #
          </span>

          <span className="dashboard-quick-action-content">
            <strong>
              View accounts
            </strong>

            <small>
              Review balances and details
            </small>
          </span>

          <span className="dashboard-quick-action-arrow">
            →
          </span>
        </button>

      </section>


      {/* BALANCE */}

      <section className="dashboard-balance-card">

        <div className="dashboard-balance-content">

          <div className="dashboard-balance-main">

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

          <span>
            Account status
          </span>

          <strong>
            <span className="dashboard-status-dot" />
            All accounts active
          </strong>

        </div>

      </section>


      {/* STATISTICS */}

      <section className="dashboard-stat-grid">

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon dashboard-stat-icon-green">
            ↑
          </div>

          <div className="dashboard-stat-content">

            <p>
              Money in
            </p>

            <strong>
              {maskBalance(
                formatCurrency(moneyIn)
              )}
            </strong>

            <span>
              Incoming activity
            </span>

          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon dashboard-stat-icon-red">
            ↓
          </div>

          <div className="dashboard-stat-content">

            <p>
              Money out
            </p>

            <strong>
              {maskBalance(
                formatCurrency(moneyOut)
              )}
            </strong>

            <span>
              Outgoing activity
            </span>

          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon dashboard-stat-icon-blue">
            #
          </div>

          <div className="dashboard-stat-content">

            <p>
              Accounts
            </p>

            <strong>
              {accounts.length}
            </strong>

            <span>
              Active accounts
            </span>

          </div>

        </div>

      </section>


      {/* CONTENT */}

      <section className="dashboard-content-grid">


        {/* ACCOUNTS */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>
              <p className="eyebrow">
                YOUR MONEY
              </p>

              <h2>
                Account overview
              </h2>
            </div>

            <span className="dashboard-panel-count">
              {accounts.length}
            </span>

          </div>


          <div className="dashboard-account-list">

            {accounts.length === 0 ? (

              <div className="dashboard-empty">

                <div>
                  +
                </div>

                <strong>
                  No accounts available
                </strong>

                <span>
                  Your linked accounts will appear here.
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


        {/* TRANSACTIONS */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>
              <p className="eyebrow">
                RECENT ACTIVITY
              </p>

              <h2>
                Recent transactions
              </h2>
            </div>

            <span className="dashboard-panel-count">
              {recentTransactions.length}
            </span>

          </div>


          <div className="dashboard-transaction-list">

            {recentTransactions.length === 0 ? (

              <div className="dashboard-empty">

                <div>
                  ✓
                </div>

                <strong>
                  No recent transactions
                </strong>

                <span>
                  Your latest account activity will appear here.
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
                        {isIncoming
                          ? "↑"
                          : "↓"}
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
                          ? `${
                              isIncoming
                                ? "+"
                                : "-"
                            }${formatCurrency(
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

      </section>


      {/* SECURITY */}

      <section className="dashboard-security-banner">

        <div className="dashboard-security-icon">
          ✓
        </div>

        <div>

          <strong>
            Your account is protected
          </strong>

          <span>
            Guardian Federal Bank monitors account
            activity and helps protect your banking
            information.
          </span>

        </div>

        <span className="dashboard-security-status">
          Secure
        </span>

      </section>

    </section>
  );
}

export default Dashboard;