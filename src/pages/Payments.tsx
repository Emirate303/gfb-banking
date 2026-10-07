import { useMemo, useState, type FormEvent } from "react";
import type { Page } from "../App";
import { useBanking } from "../BankingContext";

interface PaymentsProps {
  onNavigate?: (page: Page) => void;
}

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

function Payments({ onNavigate }: PaymentsProps) {
  const {
    accounts,
    showBalance,
    makePayment,
  } = useBanking();

  const [accountId, setAccountId] =
    useState("");

  const [biller, setBiller] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [recipientAccountNumber, setRecipientAccountNumber] =
    useState("");

  const [recipientBank, setRecipientBank] =
    useState("");

  const [reference, setReference] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState<"success" | "error">("success");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const selectedAccount = useMemo(() => {
    return accounts.find(
      (account) => account.id === accountId
    );
  }, [accounts, accountId]);

  const numericAmount =
    Number.parseFloat(amount);

  const isValidAmount =
    Number.isFinite(numericAmount) &&
    numericAmount > 0;

  const hasSufficientFunds =
    !!selectedAccount &&
    isValidAmount &&
    selectedAccount.balance >= numericAmount;

  const canSubmit =
    !!selectedAccount &&
    biller.trim().length > 0 &&
    hasSufficientFunds &&
    !isSubmitting;

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");

    if (!accountId) {
      setMessageType("error");
      setMessage(
        "Please select the account you want to pay from."
      );
      return;
    }

    if (!biller.trim()) {
      setMessageType("error");
      setMessage(
        "Enter the name of the company or recipient."
      );
      return;
    }

    if (!isValidAmount) {
      setMessageType("error");
      setMessage(
        "Enter a valid payment amount."
      );
      return;
    }

    if (!hasSufficientFunds) {
      setMessageType("error");
      setMessage(
        "The selected account does not have enough available funds."
      );
      return;
    }

    setIsSubmitting(true);

    const success = makePayment(
      accountId,
      biller.trim(),
      numericAmount,
      recipientAccountNumber.trim() || undefined,
      recipientBank.trim() || undefined
    );

    if (!success) {
      setMessageType("error");
      setMessage(
        "The payment could not be completed. Please review the payment details and try again."
      );
      setIsSubmitting(false);
      return;
    }

    setMessageType("success");
    setMessage(
      `${formatCurrency(
        numericAmount
      )} payment to ${biller.trim()} was completed successfully.`
    );

    setAmount("");
    setBiller("");
    setRecipientAccountNumber("");
    setRecipientBank("");
    setReference("");

    setIsSubmitting(false);
  }

  function clearForm() {
    setAccountId("");
    setBiller("");
    setAmount("");
    setRecipientAccountNumber("");
    setRecipientBank("");
    setReference("");
    setMessage("");
  }

  return (
    <section className="payments-page">
      <div className="payments-header">
        <div>
          <p className="eyebrow">
            BILL PAYMENTS
          </p>

          <h1>Make a payment</h1>

          <p className="page-description">
            Pay a company, service provider, or
            recipient securely from your Guardian
            Federal Bank account.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            onNavigate?.("transactions")
          }
        >
          View payment history
        </button>
      </div>

      <div className="payments-layout">
        <div className="payment-form-card">
          <div className="payment-form-header">
            <div>
              <p className="eyebrow">
                NEW PAYMENT
              </p>

              <h2>Payment details</h2>

              <p>
                Enter the payment information below.
              </p>
            </div>

            <div className="payment-secure-badge">
              <span>✓</span>
              Secure
            </div>
          </div>

          <form
            className="payment-form"
            onSubmit={handleSubmit}
          >
            <div className="payment-step">
              <div className="payment-step-heading">
                <span className="payment-step-number">
                  1
                </span>

                <div>
                  <strong>
                    Choose payment account
                  </strong>

                  <span>
                    Select the account you want to
                    use.
                  </span>
                </div>
              </div>

              <div className="payment-field">
                <label htmlFor="payment-account">
                  Pay from
                </label>

                <select
                  id="payment-account"
                  value={accountId}
                  onChange={(event) => {
                    setAccountId(
                      event.target.value
                    );
                    setMessage("");
                  }}
                >
                  <option value="">
                    Select an account
                  </option>

                  {accounts.map((account) => (
                    <option
                      key={account.id}
                      value={account.id}
                    >
                      {account.name} ••••{" "}
                      {account.number.slice(-4)}
                    </option>
                  ))}
                </select>

                {selectedAccount && (
                  <div className="payment-available-balance">
                    <span>
                      Available balance
                    </span>

                    <strong>
                      {showBalance
                        ? formatCurrency(
                            selectedAccount.balance
                          )
                        : "••••••"}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            <div className="payment-divider" />

            <div className="payment-step">
              <div className="payment-step-heading">
                <span className="payment-step-number">
                  2
                </span>

                <div>
                  <strong>
                    Recipient information
                  </strong>

                  <span>
                    Tell us who you're paying.
                  </span>
                </div>
              </div>

              <div className="payment-form-grid">
                <div className="payment-field payment-field-full">
                  <label htmlFor="payment-biller">
                    Company or recipient
                  </label>

                  <input
                    id="payment-biller"
                    type="text"
                    value={biller}
                    onChange={(event) => {
                      setBiller(
                        event.target.value
                      );
                      setMessage("");
                    }}
                    placeholder="e.g. Electric Company"
                    maxLength={80}
                  />
                </div>

                <div className="payment-field">
                  <label htmlFor="recipient-bank">
                    Bank
                  </label>

                  <input
                    id="recipient-bank"
                    type="text"
                    value={recipientBank}
                    onChange={(event) =>
                      setRecipientBank(
                        event.target.value
                      )
                    }
                    placeholder="Bank name"
                    maxLength={80}
                  />
                </div>

                <div className="payment-field">
                  <label htmlFor="recipient-account">
                    Account number
                  </label>

                  <input
                    id="recipient-account"
                    type="text"
                    inputMode="numeric"
                    value={
                      recipientAccountNumber
                    }
                    onChange={(event) =>
                      setRecipientAccountNumber(
                        event.target.value
                      )
                    }
                    placeholder="Account number"
                    maxLength={30}
                  />
                </div>
              </div>
            </div>

            <div className="payment-divider" />

            <div className="payment-step">
              <div className="payment-step-heading">
                <span className="payment-step-number">
                  3
                </span>

                <div>
                  <strong>
                    Payment amount
                  </strong>

                  <span>
                    Enter the amount you want to
                    send.
                  </span>
                </div>
              </div>

              <div className="payment-amount-field">
                <label htmlFor="payment-amount">
                  Amount
                </label>

                <div className="payment-amount-input">
                  <span>$</span>

                  <input
                    id="payment-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(event) => {
                      setAmount(
                        event.target.value
                      );
                      setMessage("");
                    }}
                    placeholder="0.00"
                  />
                </div>

                {isValidAmount &&
                  selectedAccount && (
                    <div
                      className={
                        hasSufficientFunds
                          ? "payment-funds-ok"
                          : "payment-funds-error"
                      }
                    >
                      {hasSufficientFunds
                        ? `Available: ${
                            showBalance
                              ? formatCurrency(
                                  selectedAccount.balance
                                )
                              : "••••••"
                          }`
                        : "Insufficient available funds"}
                    </div>
                  )}
              </div>
            </div>

            <div className="payment-divider" />

            <div className="payment-step">
              <div className="payment-step-heading">
                <span className="payment-step-number">
                  4
                </span>

                <div>
                  <strong>
                    Payment reference
                  </strong>

                  <span>
                    Optional note for your records.
                  </span>
                </div>
              </div>

              <div className="payment-field">
                <label htmlFor="payment-reference">
                  Reference
                </label>

                <input
                  id="payment-reference"
                  type="text"
                  value={reference}
                  onChange={(event) =>
                    setReference(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Monthly electricity bill"
                  maxLength={100}
                />
              </div>
            </div>

            {message && (
              <div
                className={
                  messageType === "success"
                    ? "payment-message success"
                    : "payment-message error"
                }
                role="status"
              >
                <span>
                  {messageType === "success"
                    ? "✓"
                    : "!"}
                </span>

                <div>
                  <strong>
                    {messageType === "success"
                      ? "Payment completed"
                      : "Payment unavailable"}
                  </strong>

                  <p>{message}</p>
                </div>
              </div>
            )}

            <div className="payment-form-footer">
              <button
                type="button"
                className="secondary-button"
                onClick={clearForm}
              >
                Clear
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={!canSubmit}
              >
                {isSubmitting
                  ? "Processing..."
                  : "Make payment"}
              </button>
            </div>
          </form>
        </div>

        <aside className="payments-side-panel">
          <div className="payments-side-card">
            <div className="payments-side-icon">
              $
            </div>

            <p className="eyebrow">
              PAYMENT CENTER
            </p>

            <h3>
              Pay with confidence
            </h3>

            <p>
              Your payment activity is recorded in
              your account history so you can easily
              review completed payments.
            </p>

            <div className="payments-feature-list">
              <div>
                <span>✓</span>
                <span>
                  Secure payment processing
                </span>
              </div>

              <div>
                <span>✓</span>
                <span>
                  Detailed transaction records
                </span>
              </div>

              <div>
                <span>✓</span>
                <span>
                  Account balance protection
                </span>
              </div>
            </div>
          </div>

          <div className="payments-side-card">
            <p className="eyebrow">
              QUICK ACCESS
            </p>

            <h3>
              Review your activity
            </h3>

            <p>
              See your recent payments and account
              transactions.
            </p>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                onNavigate?.("transactions")
              }
            >
              View transactions
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Payments;