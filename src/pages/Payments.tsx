import { useState } from "react";
import { useBanking } from "../BankingContext";

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

  const [accountId, setAccountId] =
    useState(
      accounts[0]?.id ?? ""
    );

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

    const success = makePayment(
      accountId,
      recipientName,
      numericAmount,
      recipientAccountNumber,
      recipientBank
    );

    if (!success) {
      setMessage(
        "Payment could not be completed. Please check your account balance."
      );

      return;
    }

    setMessage(
      "Payment completed successfully."
    );

    setAmount("");
    setDescription("");
  }

  return (
    <main className="payments-page">

      {/* HEADER */}

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


      {/* PAYMENT FORM */}

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


          {/* FROM ACCOUNT */}

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
              {accounts.map((account) => (
                <option
                  key={account.id}
                  value={account.id}
                >
                  {account.name} —{" "}
                  {account.number}
                </option>
              ))}
            </select>

          </div>


          {/* RECIPIENT NAME */}

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


          {/* ACCOUNT NUMBER */}

          <div className="payment-field">

            <label htmlFor="recipient-account">
              Recipient Account Number
            </label>

            <input
              id="recipient-account"
              type="text"
              value={recipientAccountNumber}
              onChange={(event) =>
                setRecipientAccountNumber(
                  event.target.value
                )
              }
              placeholder="Enter account number"
            />

          </div>


          {/* BANK */}

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


          {/* AMOUNT */}

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


          {/* DESCRIPTION */}

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


          {/* SAVE RECIPIENT */}

          <button
            type="button"
            className="secondary-payment-button"
            onClick={addRecipient}
          >
            Save Recipient
          </button>


          {/* PAYMENT BUTTON */}

          <button
            type="button"
            className="primary-payment-button"
            onClick={handlePayment}
          >
            Send Payment
          </button>


          {/* MESSAGE */}

          {message && (
            <div className="payment-message">
              {message}
            </div>
          )}

        </div>


        {/* RECIPIENTS */}

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

                  <button
                    type="button"
                    className="recipient-card"
                    key={recipient.id}
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

                    <span className="recipient-arrow">
                      ›
                    </span>

                  </button>

                )
              )}

            </div>

          )}

        </aside>

      </section>

    </main>
  );
}

export default Payments;