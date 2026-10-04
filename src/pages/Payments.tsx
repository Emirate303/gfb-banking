import { useState } from "react";
import type { FormEvent } from "react";
import { useBanking } from "../BankingContext";

interface Recipient {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
}

const RECIPIENTS_STORAGE_KEY =
  "gfb_payment_recipients";

function loadRecipients(): Recipient[] {
  const savedRecipients =
    localStorage.getItem(
      RECIPIENTS_STORAGE_KEY
    );

  if (!savedRecipients) {
    return [];
  }

  try {
    return JSON.parse(savedRecipients);
  } catch {
    return [];
  }
}

function Payments() {
  const {
    accounts,
    makePayment,
  } = useBanking();

  const [accountId, setAccountId] =
    useState("");

  const [recipientId, setRecipientId] =
    useState("");

  const [recipientName, setRecipientName] =
    useState("");

  const [
    recipientAccountNumber,
    setRecipientAccountNumber,
  ] = useState("");

  const [recipientBank, setRecipientBank] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [saveRecipient, setSaveRecipient] =
    useState(true);

  const [recipients, setRecipients] =
    useState<Recipient[]>(loadRecipients);

  const [showRecipientForm, setShowRecipientForm] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  function handleRecipientSelect(
    id: string
  ) {
    setRecipientId(id);

    const recipient = recipients.find(
      (item) => item.id === id
    );

    if (!recipient) {
      return;
    }

    setRecipientName(recipient.name);
    setRecipientAccountNumber(
      recipient.accountNumber
    );
    setRecipientBank(recipient.bank);

    setShowRecipientForm(false);
  }

  function clearRecipient() {
    setRecipientId("");
    setRecipientName("");
    setRecipientAccountNumber("");
    setRecipientBank("");
    setShowRecipientForm(true);
  }

  function saveNewRecipient(): Recipient | null {
    if (
      !recipientName.trim() ||
      !recipientAccountNumber.trim() ||
      !recipientBank.trim()
    ) {
      return null;
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
      RECIPIENTS_STORAGE_KEY,
      JSON.stringify(updatedRecipients)
    );

    setRecipientId(newRecipient.id);

    return newRecipient;
  }

  function handlePayment(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    const paymentAmount = Number(amount);

    if (!accountId) {
      setError(
        "Please select the GFB account to pay from."
      );
      return;
    }

    if (!recipientName.trim()) {
      setError(
        "Please enter the recipient name."
      );
      return;
    }

    if (!recipientAccountNumber.trim()) {
      setError(
        "Please enter the recipient account number."
      );
      return;
    }

    if (!recipientBank.trim()) {
      setError(
        "Please enter the recipient bank."
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

    if (
      saveRecipient &&
      !recipientId
    ) {
      saveNewRecipient();
    }

   const successful = makePayment(
  accountId,
  recipientName.trim(),
  paymentAmount,
  recipientAccountNumber.trim(),
  recipientBank.trim()
);

    if (!successful) {
      setError(
        "Payment could not be completed. Please check your available balance."
      );
      return;
    }

    setMessage(
      `Payment to ${recipientName.trim()} completed successfully.`
    );

    setAmount("");
  }

  const selectedAccount = accounts.find(
    (account) => account.id === accountId
  );

  return (
    <main className="payments-page">

      {/* Page Header */}
      <section className="page-heading">
        <div>
          <p className="eyebrow">
            Guardian Federal Bank
          </p>

          <h1>
            Payments
          </h1>

          <p>
            Pay a recipient securely from
            your GFB account.
          </p>
        </div>
      </section>

      <section className="payment-layout">

        {/* Payment Card */}
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

            {/* Pay From */}
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

            {/* Saved Recipients */}
            {recipients.length > 0 && (
              <div className="saved-recipient-section">

                <div className="recipient-section-header">
                  <label htmlFor="saved-recipient">
                    Saved Recipients
                  </label>

                  <button
                    type="button"
                    className="recipient-link-button"
                    onClick={clearRecipient}
                  >
                    + New Recipient
                  </button>
                </div>

                <select
                  id="saved-recipient"
                  value={recipientId}
                  onChange={(event) =>
                    handleRecipientSelect(
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    Select a saved recipient
                  </option>

                  {recipients.map(
                    (recipient) => (
                      <option
                        key={recipient.id}
                        value={recipient.id}
                      >
                        {recipient.name} —{" "}
                        {recipient.bank}
                      </option>
                    )
                  )}
                </select>

              </div>
            )}

            {/* Recipient Form */}
            {showRecipientForm && (
              <div className="recipient-form">

                <div className="recipient-form-heading">
                  <div>
                    <p className="eyebrow">
                      Recipient
                    </p>

                    <h3>
                      Enter Recipient Details
                    </h3>
                  </div>
                </div>

                <div className="form-group">
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
                    placeholder="Full recipient name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recipient-account">
                    Account Number
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
                    placeholder="Recipient account number"
                  />
                </div>

                <div className="form-group">
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
                    placeholder="Recipient bank name"
                  />
                </div>

                <label className="save-recipient">
                  <input
                    type="checkbox"
                    checked={saveRecipient}
                    onChange={(event) =>
                      setSaveRecipient(
                        event.target.checked
                      )
                    }
                  />

                  <span>
                    Save this recipient for
                    future payments
                  </span>
                </label>

              </div>
            )}

            {/* Selected Recipient */}
            {!showRecipientForm &&
              recipientName && (
                <div className="selected-recipient">

                  <div className="selected-recipient-icon">
                    {recipientName
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {recipientName}
                    </strong>

                    <span>
                      {recipientBank}
                      {" • "}
                      ••••
                      {recipientAccountNumber.slice(
                        -4
                      )}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={clearRecipient}
                  >
                    Change
                  </button>

                </div>
              )}

            {/* Amount */}
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

            {/* Messages */}
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

        {/* Information Card */}
        <aside className="payment-info-card">

          <div className="payment-info-icon">
            ✓
          </div>

          <h2>
            Pay a Recipient
          </h2>

          <p>
            Add a recipient manually and
            securely make a payment from
            your GFB account.
          </p>

          <div className="payment-info-list">

            <div>
              <span>✓</span>

              <p>
                Enter the recipient's name,
                account number and bank.
              </p>
            </div>

            <div>
              <span>✓</span>

              <p>
                Save recipients so you can
                quickly pay them again.
              </p>
            </div>

            <div>
              <span>✓</span>

              <p>
                Every successful payment is
                added to your transaction
                history.
              </p>
            </div>

            <div>
              <span>✓</span>

              <p>
                Payments are limited by the
                available balance in your
                selected account.
              </p>
            </div>

          </div>
        </aside>

      </section>
    </main>
  );
}

export default Payments;