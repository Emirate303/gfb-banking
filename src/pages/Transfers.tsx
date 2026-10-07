import { useState } from "react";
import { useBanking } from "../BankingContext";
import { useNotifications } from "../NotificationContext";

function Transfers() {
  const {
    accounts,
    transferMoney,
  } = useBanking();

  const { addNotification } =
  useNotifications();
  const [fromAccount, setFromAccount] =
    useState("");

  const [toAccount, setToAccount] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  function handleTransfer(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    const transferAmount =
      Number(amount);

    if (!fromAccount) {
      setError(
        "Please select the account to transfer from."
      );
      return;
    }

    if (!toAccount) {
      setError(
        "Please select the account to transfer to."
      );
      return;
    }

    if (fromAccount === toAccount) {
      setError(
        "The source and destination accounts must be different."
      );
      return;
    }

    if (
      !amount ||
      Number.isNaN(transferAmount) ||
      transferAmount <= 0
    ) {
      setError(
        "Please enter a valid transfer amount."
      );
      return;
    }

    const successful =
      transferMoney(
        fromAccount,
        toAccount,
        transferAmount
      );

    if (!successful) {
      addNotification(
  "Transfer sent",
  `$${Number(amount).toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )} was successfully transferred.`,
  "success"
);
      setError(
        "Transfer could not be completed. Please check the account balance and transfer details."
      );
      addNotification(
  "Transfer unsuccessful",
  "The transfer could not be completed. Please review the account details and try again.",
  "warning"
);
      return;
    }

    setMessage(
      "Transfer completed successfully."
    );

    setAmount("");
    setFromAccount("");
    setToAccount("");
  }

  const selectedFromAccount =
    accounts.find(
      (account) =>
        account.id === fromAccount
    );

  return (
    <main className="transfers-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Transfer Money
          </h1>

          <p>
            Move money securely between your
            GFB accounts.
          </p>
        </div>
      </section>

      <section className="transfer-layout">
        <div className="transfer-card">

          <div className="transfer-card-header">
            <div>
              <p className="eyebrow">
                New Transfer
              </p>

              <h2>
                Move Money
              </h2>
            </div>

            <div className="transfer-icon">
              ⇄
            </div>
          </div>

          <form
            className="transfer-form"
            onSubmit={handleTransfer}
          >
            <div className="form-group">
              <label htmlFor="from-account">
                From Account
              </label>

              <select
                id="from-account"
                value={fromAccount}
                onChange={(event) =>
                  setFromAccount(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Select an account
                </option>

                {accounts.map(
                  (account) => (
                    <option
                      key={account.id}
                      value={account.id}
                    >
                      {account.name} —
                      {" "}
                      $
                      {account.balance.toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </option>
                  )
                )}
              </select>
            </div>

            {selectedFromAccount && (
              <div className="transfer-available">
                Available balance:
                {" "}
                <strong>
                  $
                  {selectedFromAccount.balance.toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </strong>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="to-account">
                To Account
              </label>

              <select
                id="to-account"
                value={toAccount}
                onChange={(event) =>
                  setToAccount(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Select an account
                </option>

                {accounts.map(
                  (account) => (
                    <option
                      key={account.id}
                      value={account.id}
                    >
                      {account.name} ••••
                      {account.number.slice(
                        -4
                      )}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="transfer-amount">
                Amount
              </label>

              <div className="amount-input">
                <span>
                  $
                </span>

                <input
                  id="transfer-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(event) =>
                    setAmount(
                      event.target.value
                    )
                  }
                  placeholder="0.00"
                />
              </div>
            </div>

            {error && (
              <div className="transfer-message transfer-error">
                {error}
              </div>
            )}

            {message && (
              <div className="transfer-message transfer-success">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="primary-button transfer-submit"
            >
              Transfer Money
            </button>
          </form>
        </div>

        <aside className="transfer-info-card">
          <div className="transfer-info-icon">
            ✓
          </div>

          <h2>
            Secure Transfers
          </h2>

          <p>
            Transfer money between your GFB
            accounts quickly and easily.
          </p>

          <div className="transfer-info-list">
            <div>
              <span>✓</span>
              <p>
                Transfers update your account
                balances immediately.
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                Every transfer is recorded in
                your transaction history.
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                You cannot transfer more than
                your available balance.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Transfers;