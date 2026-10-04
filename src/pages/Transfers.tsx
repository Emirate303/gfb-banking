import { useState } from "react";

import { useBanking } from "../BankingContext";

function Transfers() {
  const {
    accounts,
    transferMoney,
  } = useBanking();

  const [fromId, setFromId] =
    useState("");

  const [toId, setToId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  function handleTransfer(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    const transferAmount =
      Number(amount);

    if (!fromId || !toId) {
      setError(
        "Please select both accounts."
      );
      return;
    }

    if (fromId === toId) {
      setError(
        "The source and destination accounts must be different."
      );
      return;
    }

    if (
      !Number.isFinite(
        transferAmount
      ) ||
      transferAmount <= 0
    ) {
      setError(
        "Enter a valid transfer amount."
      );
      return;
    }

    const success =
      transferMoney(
        fromId,
        toId,
        transferAmount
      );

    if (!success) {
      setError(
        "The transfer could not be completed. Check the account balance and try again."
      );
      return;
    }

    setMessage(
      "Transfer completed successfully."
    );

    setAmount("");
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">
          Money Movement
        </p>

        <h1>Transfers</h1>

        <p className="subtitle">
          Move money between your accounts.
        </p>
      </section>

      <section className="transfer-panel">
        <div className="section-header">
          <div>
            <h2>
              Transfer Money
            </h2>

            <p>
              Select the accounts and amount
              you want to transfer.
            </p>
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
              value={fromId}
              onChange={(event) =>
                setFromId(
                  event.target.value
                )
              }
            >
              <option value="">
                Select account
              </option>

              {accounts.map(
                (account) => (
                  <option
                    key={account.id}
                    value={account.id}
                  >
                    {account.name} —{" "}
                    {account.number}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="to-account">
              To Account
            </label>

            <select
              id="to-account"
              value={toId}
              onChange={(event) =>
                setToId(
                  event.target.value
                )
              }
            >
              <option value="">
                Select account
              </option>

              {accounts.map(
                (account) => (
                  <option
                    key={account.id}
                    value={account.id}
                  >
                    {account.name} —{" "}
                    {account.number}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="transfer-amount">
              Amount
            </label>

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

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {message && (
            <div className="form-success">
              {message}
            </div>
          )}

          <div className="transfer-actions">
            <button
              type="submit"
              className="primary-button"
            >
              Transfer Money
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Transfers;