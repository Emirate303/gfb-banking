import { useState } from "react";
import type { FormEvent } from "react";
import { useBanking } from "../BankingContext";

function Payments() {
  const {
    accounts,
    makePayment,
  } = useBanking();

  const [accountId, setAccountId] =
    useState("");

  const [biller, setBiller] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  function handlePayment(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    const paymentAmount = Number(amount);

    if (!accountId) {
      setError(
        "Please select an account."
      );
      return;
    }

    if (!biller.trim()) {
      setError(
        "Please enter the biller or service name."
      );
      return;
    }

    if (
      !amount ||
      Number.isNaN(paymentAmount) ||
      paymentAmount <= 0
    ) {
      setError(
        "Please enter a valid payment amount."
      );
      return;
    }

    const successful = makePayment(
      accountId,
      biller.trim(),
      paymentAmount
    );

    if (!successful) {
      setError(
        "Payment could not be completed. Please check your available balance."
      );
      return;
    }

    setMessage(
      "Payment completed successfully."
    );

    setBiller("");
    setAmount("");
  }

  const selectedAccount = accounts.find(
    (account) => account.id === accountId
  );

  return (
    <main className="payments-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Payments
          </h1>

          <p>
            Pay bills and services securely
            from your GFB account.
          </p>
        </div>
      </section>

      <section className="payment-layout">
        <div className="payment-card">
          <div className="payment-card-header">
            <div>
              <p className="eyebrow">
                New Payment
              </p>

              <h2>
                Make a Payment
              </h2>
            </div>

            <div className="payment-icon">
              $
            </div>
          </div>

          <form
            className="payment-form"
            onSubmit={handlePayment}
          >
            <div className="form-group">
              <label htmlFor="payment-account">
                Pay From
              </label>

              <select
                id="payment-account"
                value={accountId}
                onChange={(event) =>
                  setAccountId(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Select an account
                </option>

                {accounts.map((account) => (
                  <option
                    key={account.id}
                    value={account.id}
                  >
                    {account.name} — $
                    {account.balance.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </option>
                ))}
              </select>
            </div>

            {selectedAccount && (
              <div className="payment-available">
                Available balance:{" "}
                <strong>
                  $
                  {selectedAccount.balance.toLocaleString(
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
              <label htmlFor="biller">
                Biller or Service
              </label>

              <input
                id="biller"
                type="text"
                value={biller}
                onChange={(event) =>
                  setBiller(
                    event.target.value
                  )
                }
                placeholder="e.g. Electric Company"
              />
            </div>

            <div className="form-group">
              <label htmlFor="payment-amount">
                Payment Amount
              </label>

              <div className="amount-input">
                <span>
                  $
                </span>

                <input
                  id="payment-amount"
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
              <div className="payment-message payment-error">
                {error}
              </div>
            )}

            {message && (
              <div className="payment-message payment-success">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="primary-button payment-submit"
            >
              Submit Payment
            </button>
          </form>
        </div>

        <aside className="payment-info-card">
          <div className="payment-info-icon">
            ✓
          </div>

          <h2>
            Secure Payments
          </h2>

          <p>
            Use your GFB accounts to pay
            bills and services from one
            convenient place.
          </p>

          <div className="payment-info-list">
            <div>
              <span>✓</span>

              <p>
                Payments are deducted from
                the selected account.
              </p>
            </div>

            <div>
              <span>✓</span>

              <p>
                Each successful payment is
                added to your transaction
                history.
              </p>
            </div>

            <div>
              <span>✓</span>

              <p>
                Payments cannot exceed your
                available balance.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Payments;