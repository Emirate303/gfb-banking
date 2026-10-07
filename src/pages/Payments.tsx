import { useState } from "react";
import { useBanking } from "../BankingContext";
import { useNotifications } from "../NotificationContext";

interface Recipient {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
}

function Payments() {
  const {
    accounts,
    makePayment,
  } = useBanking();

  const { addNotification } =
    useNotifications();

  const [accountId, setAccountId] =
    useState(accounts[0]?.id ?? "");

  const [amount, setAmount] =
    useState("");

  const [recipientName, setRecipientName] =
    useState("");

  const [
    recipientAccountNumber,
    setRecipientAccountNumber,
  ] = useState("");

  const [recipientBank, setRecipientBank] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [
    showConfirmation,
    setShowConfirmation,
  ] = useState(false);

  const [
    paymentComplete,
    setPaymentComplete,
  ] = useState(false);

  const [
    completedAmount,
    setCompletedAmount,
  ] = useState(0);

  const [paymentReference, setPaymentReference] =
    useState("");

  const [recipients, setRecipients] =
    useState<Recipient[]>(() => {
      const saved =
        localStorage.getItem(
          "gfb_recipients"
        );

      if (!saved) {
        return [];
      }

      try {
        return JSON.parse(saved) as Recipient[];
      } catch {
        return [];
      }
    });

  function addRecipient() {
    if (
      !recipientName.trim() ||
      !recipientAccountNumber.trim() ||
      !recipientBank.trim()
    ) {
      setMessage(
        "Please complete all recipient details."
      );

      return;
    }

    const newRecipient: Recipient = {
      id: Date.now().toString(),
      name: recipientName.trim(),
      accountNumber:
        recipientAccountNumber.trim(),
      bank: recipientBank.trim(),
    };

    const updatedRecipients = [
      ...recipients,
      newRecipient,
    ];

    setRecipients(updatedRecipients);

    localStorage.setItem(
      "gfb_recipients",
      JSON.stringify(updatedRecipients)
    );

    setMessage(
      "Recipient saved successfully."
    );
  }

  function selectRecipient(
    recipient: Recipient
  ) {
    setRecipientName(recipient.name);

    setRecipientAccountNumber(
      recipient.accountNumber
    );

    setRecipientBank(recipient.bank);

    setMessage("");
  }

  function deleteRecipient(
    id: string
  ) {
    const updatedRecipients =
      recipients.filter(
        (recipient) =>
          recipient.id !== id
      );

    setRecipients(updatedRecipients);

    localStorage.setItem(
      "gfb_recipients",
      JSON.stringify(updatedRecipients)
    );

    setMessage(
      "Recipient removed."
    );
  }

  function handlePayment() {
    setMessage("");

    const numericAmount =
      Number(amount);

    if (!accountId) {
      setMessage(
        "Please select an account."
      );

      return;
    }

    if (
      !recipientName.trim() ||
      !recipientAccountNumber.trim() ||
      !recipientBank.trim()
    ) {
      setMessage(
        "Please enter the recipient details."
      );

      return;
    }

    if (
      !numericAmount ||
      numericAmount <= 0
    ) {
      setMessage(
        "Please enter a valid payment amount."
      );

      return;
    }

    const selectedAccount =
      accounts.find(
        (account) =>
          account.id === accountId
      );

    if (!selectedAccount) {
      setMessage(
        "Selected account was not found."
      );

      return;
    }

    if (
      selectedAccount.balance <
      numericAmount
    ) {
      setMessage(
        "Insufficient available balance."
      );

      return;
    }

    setShowConfirmation(true);
  }

  function confirmPayment() {
    const numericAmount =
      Number(amount);

    const success = makePayment(
      accountId,
      recipientName,
      numericAmount,
      recipientAccountNumber,
      recipientBank
    );

    setShowConfirmation(false);

    if (!success) {
      setMessage(
        "Payment could not be completed."
      );

      addNotification(
        "Payment unsuccessful",
        `Your payment to ${recipientName} could not be completed.`,
        "warning"
      );

      return;
    }

    const reference =
      `GFB-PAY-${Date.now()
        .toString()
        .slice(-8)}`;

    setCompletedAmount(
      numericAmount
    );

    setPaymentReference(
      reference
    );

    setPaymentComplete(true);

    addNotification(
      "Payment sent",
      `$${numericAmount.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )} was successfully sent to ${recipientName}.`,
      "success"
    );

    setAmount("");
    setDescription("");
  }

  function startNewPayment() {
    setPaymentComplete(false);
    setPaymentReference("");
    setCompletedAmount(0);
    setMessage("");
  }

  if (paymentComplete) {
    return (
      <main className="payments-page">

        <section className="payment-success-page">

          <div className="payment-success-card">

            <div className="payment-success-icon">
              ✓
            </div>

            <p className="eyebrow">
              Payment Complete
            </p>

            <h1>
              Payment Sent
            </h1>

            <p className="payment-success-description">
              Your payment has been
              successfully processed.
            </p>

            <div className="payment-success-amount">
              $
              {completedAmount.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </div>

            <div className="payment-success-recipient">

              <span>
                Sent to
              </span>

              <strong>
                {recipientName}
              </strong>

              <small>
                {recipientBank} ••••{" "}
                {recipientAccountNumber.slice(
                  -4
                )}
              </small>

            </div>

            <div className="payment-reference">

              <span>
                Confirmation Number
              </span>

              <strong>
                {paymentReference}
              </strong>

            </div>

            {description.trim() && (
              <div className="payment-success-description-row">

                <span>
                  Description
                </span>

                <strong>
                  {description}
                </strong>

              </div>
            )}

            <div className="payment-success-actions">

              <button
                type="button"
                className="primary-payment-button"
                onClick={startNewPayment}
              >
                Make Another Payment
              </button>

            </div>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="payments-page">

      <section className="payments-header">

        <div>

          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Payments
          </h1>

          <p>
            Send a payment to a recipient
            securely.
          </p>

        </div>

      </section>

      <section className="payments-layout">

        <div className="payment-form-card">

          <div className="payment-card-header">

            <div>

              <p className="eyebrow">
                Make a Payment
              </p>

              <h2>
                Payment Details
              </h2>

            </div>

          </div>

          <div className="payment-field">

            <label htmlFor="payment-account">
              From Account
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

          <div className="payment-field">

            <label htmlFor="recipient-name">
              Recipient Name
            </label>

            <input
              id="recipient-name"
              type="text"
              value={recipientName}
              onChange={(event) =>
                setRecipientName(
                  event.target.value
                )
              }
              placeholder="Enter recipient name"
            />

          </div>

          <div className="payment-field">

            <label htmlFor="recipient-account">
              Recipient Account Number
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
              placeholder="Enter account number"
            />

          </div>

          <div className="payment-field">

            <label htmlFor="recipient-bank">
              Recipient Bank
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
              placeholder="Enter bank name"
            />

          </div>

          <div className="payment-field">

            <label htmlFor="payment-amount">
              Amount
            </label>

            <div className="amount-input">

              <span>
                $
              </span>

              <input
                id="payment-amount"
                type="number"
                min="0"
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

          <div className="payment-field">

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
              placeholder="What's this payment for?"
            />

          </div>

          <div className="payment-form-actions">

            <button
              type="button"
              className="secondary-payment-button"
              onClick={addRecipient}
            >
              Save Recipient
            </button>

            <button
              type="button"
              className="primary-payment-button"
              onClick={handlePayment}
            >
              Send Payment
            </button>

          </div>

          {message && (
            <div className="payment-message">
              {message}
            </div>
          )}

        </div>

        <aside className="saved-recipients">

          <div className="payments-section-heading">

            <div>

              <p className="eyebrow">
                Saved Recipients
              </p>

              <h2>
                Quick Pay
              </h2>

            </div>

          </div>

          {recipients.length === 0 ? (

            <div className="saved-recipients-empty">

              <div className="recipient-empty-icon">
                +
              </div>

              <strong>
                No saved recipients
              </strong>

              <span>
                Save a recipient to quickly
                use their details later.
              </span>

            </div>

          ) : (

            <div className="recipient-list">

              {recipients.map(
                (recipient) => (

                  <div
                    className="recipient-card"
                    key={recipient.id}
                  >

                    <button
                      type="button"
                      className="recipient-select-button"
                      onClick={() =>
                        selectRecipient(
                          recipient
                        )
                      }
                    >

                      <div className="recipient-avatar">
                        {recipient.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="recipient-info">

                        <strong>
                          {recipient.name}
                        </strong>

                        <span>
                          {recipient.bank}
                        </span>

                        <small>
                          ••••{" "}
                          {recipient.accountNumber.slice(
                            -4
                          )}
                        </small>

                      </div>

                    </button>

                    <div className="recipient-actions">

                      <button
                        type="button"
                        className="recipient-delete"
                        onClick={() =>
                          deleteRecipient(
                            recipient.id
                          )
                        }
                        aria-label={`Delete ${recipient.name}`}
                      >
                        ×
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </aside>

      </section>

      {showConfirmation && (

        <div className="payment-confirmation-overlay">

          <div className="payment-confirmation-modal">

            <div className="confirmation-icon">
              !
            </div>

            <p className="eyebrow">
              Review Payment
            </p>

            <h2>
              Confirm Payment
            </h2>

            <p className="confirmation-message">
              Please review the payment
              details before confirming.
            </p>

            <div className="confirmation-details">

              <div>

                <span>
                  Recipient
                </span>

                <strong>
                  {recipientName}
                </strong>

              </div>

              <div>

                <span>
                  Account
                </span>

                <strong>
                  ••••{" "}
                  {recipientAccountNumber.slice(
                    -4
                  )}
                </strong>

              </div>

              <div>

                <span>
                  Bank
                </span>

                <strong>
                  {recipientBank}
                </strong>

              </div>

              <div>

                <span>
                  Amount
                </span>

                <strong>
                  $
                  {Number(
                    amount
                  ).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </strong>

              </div>

              {description.trim() && (

                <div>

                  <span>
                    Description
                  </span>

                  <strong>
                    {description}
                  </strong>

                </div>

              )}

            </div>

            <div className="confirmation-actions">

              <button
                type="button"
                className="confirmation-cancel"
                onClick={() =>
                  setShowConfirmation(
                    false
                  )
                }
              >
                Go Back
              </button>

              <button
                type="button"
                className="confirmation-confirm"
                onClick={confirmPayment}
              >
                Confirm Payment
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Payments;