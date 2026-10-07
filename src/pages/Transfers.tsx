import {
  useMemo,
  useState,
  type FormEvent,
} from "react";

import type { Page } from "../App";
import { useBanking } from "../BankingContext";

interface TransfersProps {
  onNavigate?: (page: Page) => void;
}

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

function Transfers({ onNavigate }: TransfersProps) {
  const {
    accounts,
    showBalance,
    transferMoney,
  } = useBanking();

  const [fromAccount, setFromAccount] =
    useState("");

  const [toAccount, setToAccount] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [memo, setMemo] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState<"success" | "error">("success");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const selectedFromAccount = useMemo(() => {
    return accounts.find(
      (account) => account.id === fromAccount
    );
  }, [accounts, fromAccount]);

  const selectedToAccount = useMemo(() => {
    return accounts.find(
      (account) => account.id === toAccount
    );
  }, [accounts, toAccount]);

  const numericAmount =
    Number.parseFloat(amount);

  const isValidAmount =
    Number.isFinite(numericAmount) &&
    numericAmount > 0;

  const hasSufficientFunds =
    !!selectedFromAccount &&
    isValidAmount &&
    selectedFromAccount.balance >= numericAmount;

  const canSubmit =
    !!selectedFromAccount &&
    !!selectedToAccount &&
    fromAccount !== toAccount &&
    hasSufficientFunds &&
    !isSubmitting;

  function handleSubmit(
   event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");

    if (!fromAccount || !toAccount) {
      setMessageType("error");
      setMessage(
        "Please select both the source and destination accounts."
      );
      return;
    }

    if (fromAccount === toAccount) {
      setMessageType("error");
      setMessage(
        "Your source and destination accounts must be different."
      );
      return;
    }

    if (!isValidAmount) {
      setMessageType("error");
      setMessage(
        "Enter a valid transfer amount."
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

    const success = transferMoney(
      fromAccount,
      toAccount,
      numericAmount
    );

    if (!success) {
      setMessageType("error");
      setMessage(
        "The transfer could not be completed. Please review the details and try again."
      );
      setIsSubmitting(false);
      return;
    }

    setMessageType("success");
    setMessage(
      `${formatCurrency(
        numericAmount
      )} transfer completed successfully.`
    );

    setAmount("");
    setMemo("");

    setIsSubmitting(false);
  }

  function handleSwapAccounts() {
    const currentFrom = fromAccount;

    setFromAccount(toAccount);
    setToAccount(currentFrom);

    setMessage("");
  }

  return (
    <section className="transfers-page">
      <div className="transfers-header">
        <div>
          <p className="eyebrow">
            MONEY MOVEMENT
          </p>

          <h1>Transfer money</h1>

          <p className="page-description">
            Move money securely between your Guardian
            Federal Bank accounts.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            onNavigate?.("transactions")
          }
        >
          View activity
        </button>
      </div>

      <div className="transfer-layout">
        <div className="transfer-main-card">
          <div className="transfer-card-header">
            <div>
              <p className="eyebrow">
                NEW TRANSFER
              </p>

              <h2>Transfer between accounts</h2>

              <p>
                Select your source account, destination
                account, and transfer amount.
              </p>
            </div>

            <div className="transfer-secure-badge">
              <span>✓</span>
              Secure
            </div>
          </div>

          <form
            className="transfer-form"
            onSubmit={handleSubmit}
          >
            <div className="transfer-account-section">
              <div className="transfer-account-heading">
                <span className="transfer-step">
                  1
                </span>

                <div>
                  <strong>
                    Choose accounts
                  </strong>

                  <span>
                    Where should the money come from
                    and where should it go?
                  </span>
                </div>
              </div>

              <div className="transfer-account-grid">
                <div className="transfer-field">
                  <label htmlFor="from-account">
                    From account
                  </label>

                  <select
                    id="from-account"
                    value={fromAccount}
                    onChange={(event) => {
                      setFromAccount(
                        event.target.value
                      );
                      setMessage("");
                    }}
                  >
                    <option value="">
                      Select source account
                    </option>

                    {accounts.map((account) => (
                      <option
                        key={account.id}
                        value={account.id}
                        disabled={
                          account.id === toAccount
                        }
                      >
                        {account.name} ••••{" "}
                        {account.number.slice(-4)}
                      </option>
                    ))}
                  </select>

                  {selectedFromAccount && (
                    <div className="transfer-available">
                      <span>
                        Available
                      </span>

                      <strong>
                        {showBalance
                          ? formatCurrency(
                              selectedFromAccount.balance
                            )
                          : "••••••"}
                      </strong>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="transfer-swap-button"
                  onClick={handleSwapAccounts}
                  disabled={
                    !fromAccount &&
                    !toAccount
                  }
                  aria-label="Swap accounts"
                >
                  ⇄
                </button>

                <div className="transfer-field">
                  <label htmlFor="to-account">
                    To account
                  </label>

                  <select
                    id="to-account"
                    value={toAccount}
                    onChange={(event) => {
                      setToAccount(
                        event.target.value
                      );
                      setMessage("");
                    }}
                  >
                    <option value="">
                      Select destination account
                    </option>

                    {accounts.map((account) => (
                      <option
                        key={account.id}
                        value={account.id}
                        disabled={
                          account.id === fromAccount
                        }
                      >
                        {account.name} ••••{" "}
                        {account.number.slice(-4)}
                      </option>
                    ))}
                  </select>

                  {selectedToAccount && (
                    <div className="transfer-destination">
                      <span>
                        Destination
                      </span>

                      <strong>
                        {selectedToAccount.type}
                      </strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="transfer-divider" />

            <div className="transfer-amount-section">
              <div className="transfer-account-heading">
                <span className="transfer-step">
                  2
                </span>

                <div>
                  <strong>
                    Enter transfer amount
                  </strong>

                  <span>
                    Choose how much you want to move.
                  </span>
                </div>
              </div>

              <div className="transfer-amount-field">
                <label htmlFor="transfer-amount">
                  Amount
                </label>

                <div className="transfer-amount-input">
                  <span>$</span>

                  <input
                    id="transfer-amount"
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
                  selectedFromAccount && (
                    <div
                      className={
                        hasSufficientFunds
                          ? "transfer-funds-ok"
                          : "transfer-funds-error"
                      }
                    >
                      {hasSufficientFunds
                        ? `Available balance: ${
                            showBalance
                              ? formatCurrency(
                                  selectedFromAccount.balance
                                )
                              : "••••••"
                          }`
                        : "Insufficient available funds"}
                    </div>
                  )}
              </div>
            </div>

            <div className="transfer-divider" />

            <div className="transfer-details-section">
              <div className="transfer-account-heading">
                <span className="transfer-step">
                  3
                </span>

                <div>
                  <strong>
                    Add a memo
                  </strong>

                  <span>
                    Optional note for your records.
                  </span>
                </div>
              </div>

              <div className="transfer-field">
                <label htmlFor="transfer-memo">
                  Memo
                </label>

                <input
                  id="transfer-memo"
                  type="text"
                  value={memo}
                  onChange={(event) =>
                    setMemo(
                      event.target.value
                    )
                  }
                  placeholder="What's this transfer for?"
                  maxLength={80}
                />
              </div>
            </div>

            {message && (
              <div
                className={
                  messageType === "success"
                    ? "transfer-message success"
                    : "transfer-message error"
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
                      ? "Transfer complete"
                      : "Transfer unavailable"}
                  </strong>

                  <p>{message}</p>
                </div>
              </div>
            )}

            <div className="transfer-form-footer">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setFromAccount("");
                  setToAccount("");
                  setAmount("");
                  setMemo("");
                  setMessage("");
                }}
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
                  : "Review transfer"}
              </button>
            </div>
          </form>
        </div>

        <aside className="transfer-side-panel">
          <div className="transfer-side-card">
            <div className="transfer-side-icon">
              ✓
            </div>

            <h3>
              Secure transfers
            </h3>

            <p>
              Transfers between your GFB accounts
              are processed securely and recorded in
              your transaction history.
            </p>

            <div className="transfer-security-list">
              <div>
                <span>✓</span>
                <span>Encrypted banking session</span>
              </div>

              <div>
                <span>✓</span>
                <span>Transaction confirmation</span>
              </div>

              <div>
                <span>✓</span>
                <span>Activity history</span>
              </div>
            </div>
          </div>

          <div className="transfer-side-card transfer-help-card">
            <p className="eyebrow">
              NEED HELP?
            </p>

            <h3>
              Review your account activity
            </h3>

            <p>
              Check your recent transactions after
              completing a transfer.
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

export default Transfers;