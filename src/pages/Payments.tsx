import { useState } from "react";
import type { FormEvent } from "react";
import { useBanking } from "../BankingContext";

interface Payee {
  id: string;
  name: string;
  category: string;
}

const payees: Payee[] = [
  {
    id: "electric",
    name: "Electric Company",
    category: "Utilities",
  },
  {
    id: "internet",
    name: "Internet Provider",
    category: "Utilities",
  },
  {
    id: "rent",
    name: "Property Management",
    category: "Housing",
  },
  {
    id: "phone",
    name: "Mobile Provider",
    category: "Phone",
  },
];

function Payments() {
  const {
    accounts,
    makePayment,
  } = useBanking();

  const [accountId, setAccountId] =
    useState("");

  const [selectedPayee, setSelectedPayee] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [paymentDate, setPaymentDate] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    const numericAmount =
      Number(amount);

    if (!accountId) {
      setError(
        "Please select an account."
      );
      return;
    }

    if (!selectedPayee) {
      setError(
        "Please select a payee."
      );
      return;
    }

    if (
      !numericAmount ||
      numericAmount <= 0
    ) {
      setError(
        "Please enter a valid payment amount."
      );
      return;
    }

    if (!paymentDate) {
      setError(
        "Please select a payment date."
      );
      return;
    }

    const selectedAccount =
      accounts.find(
        (account) =>
          account.id === accountId
      );

    const selectedPayeeData =
      payees.find(
        (payee) =>
          payee.id === selectedPayee
      );

    if (!selectedAccount) {
      setError(
        "The selected account could not be found."
      );
      return;
    }

    if (!selectedPayeeData) {
      setError(
        "The selected payee could not be found."
      );
      return;
    }

    if (
      selectedAccount.balance <
      numericAmount
    ) {
      setError(
        "Insufficient funds in the selected account."
      );
      return;
    }

   const successful =
  makePayment(
    accountId,
    selectedPayeeData.name,
    numericAmount,
    paymentDate,
    description
  );

    if (!successful) {
      setError(
        "The payment could not be completed."
      );
      return;
    }

    setMessage(
      `Payment of $${numericAmount.toFixed(
        2
      )} to ${
        selectedPayeeData.name
      } was completed successfully.`
    );

    setAccountId("");
    setSelectedPayee("");
    setAmount("");
    setPaymentDate("");
    setDescription("");
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">
          Bill Pay
        </p>

        <h1>
          Payments
        </h1>

        <p className="subtitle">
          Make payments directly from your
          CapitalOne Federal Credit Union
          account.
        </p>
      </section>

      <section className="payment-layout">
        <div className="payment-form-panel">
          <div className="section-header">
            <div>
              <h2>
                Make a Payment
              </h2>

              <p>
                Select an account and payee,
                then enter the payment details.
              </p>
            </div>
          </div>

          <form
            className="payment-form"
            onSubmit={handleSubmit}
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

                {accounts.map(
                  (account) => (
                    <option
                      value={account.id}
                      key={account.id}
                    >
                      {account.name} — $
                      {account.balance.toFixed(
                        2
                      )}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="payment-payee">
                Payee
              </label>

              <select
                id="payment-payee"
                value={selectedPayee}
                onChange={(event) =>
                  setSelectedPayee(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Select a payee
                </option>

                {payees.map(
                  (payee) => (
                    <option
                      value={payee.id}
                      key={payee.id}
                    >
                      {payee.name} —{" "}
                      {payee.category}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="payment-form-grid">
              <div className="form-group">
                <label htmlFor="payment-amount">
                  Amount
                </label>

                <div className="currency-input">
                  <span>$</span>

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

              <div className="form-group">
                <label htmlFor="payment-date">
                  Payment Date
                </label>

                <input
                  id="payment-date"
                  type="date"
                  value={paymentDate}
                  onChange={(event) =>
                    setPaymentDate(
                      event.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="payment-description">
                Description
              </label>

              <input
                id="payment-description"
                type="text"
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                placeholder="Optional payment note"
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

            <button
              type="submit"
              className="primary-button"
            >
              Make Payment
            </button>
          </form>
        </div>

        <aside className="payment-info-panel">
          <div className="payment-info-icon">
            $
          </div>

          <h2>
            Payment Information
          </h2>

          <p>
            Payments made here are connected
            to your fictional banking data.
          </p>

          <div className="payment-info-list">
            <div>
              <span>
                Available Accounts
              </span>

              <strong>
                {accounts.length}
              </strong>
            </div>

            <div>
              <span>
                Available Payees
              </span>

              <strong>
                {payees.length}
              </strong>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Payments;