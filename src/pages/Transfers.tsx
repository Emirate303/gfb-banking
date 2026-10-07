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

  function formatMoney(value: number) {
    return `$${value.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

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

    const selectedSource =
      accounts.find(
        (account) =>
          account.id === fromAccount
      );

    if (
      selectedSource &&
      transferAmount >
        selectedSource.balance
    ) {
      setError(
        "The transfer amount exceeds your available balance."
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
      setError(
        "Transfer could not be completed. Please review the account details and available balance."
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

    addNotification(
      "Transfer sent",
      `${formatMoney(
        transferAmount
      )} was successfully transferred.`,
      "success"
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

  const selectedToAccount =
    accounts.find(
      (account) =>
        account.id === toAccount
    );

  return (
    <main className="transfers-page polished-transfers-page">

      {/* PAGE HEADER */}

      <header className="polished-transfers-header">

        <div>

          <div className="transfers-breadcrumb">
            Banking
            <span>/</span>
            Transfers
          </div>

          <h1>
            Transfer Money
          </h1>

          <p>
            Move money securely between
            your GFB accounts.
          </p>

        </div>

        <div className="transfer-security-badge">
          <span>✓</span>
          Secure transfer
        </div>

      </header>


      {/* MAIN CONTENT */}

      <section className="polished-transfer-layout">

        {/* TRANSFER FORM */}

        <div className="polished-transfer-card">

          <div className="polished-transfer-card-header">

            <div>

              <span>
                NEW TRANSFER
              </span>

              <h2>
                Move money
              </h2>

              <p>
                Choose your accounts and
                enter the amount you want
                to transfer.
              </p>

            </div>

            <div className="polished-transfer-icon">
              ⇄
            </div>

          </div>


          <form
            className="polished-transfer-form"
            onSubmit={handleTransfer}
          >

            {/* FROM */}

            <div className="polished-form-group">

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
                  setError("");
                  setMessage("");
                }}
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
                      {account.name}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* AVAILABLE BALANCE */}

            {selectedFromAccount && (
              <div className="transfer-balance-preview">

                <div>

                  <span>
                    AVAILABLE BALANCE
                  </span>

                  <strong>
                    {formatMoney(
                      selectedFromAccount.balance
                    )}
                  </strong>

                </div>

                <div className="balance-check">
                  ✓
                </div>

              </div>
            )}


            {/* TRANSFER DIRECTION */}

            <div className="transfer-direction">
              <div />
              <span>
                ↓
              </span>
              <div />
            </div>


            {/* TO */}

            <div className="polished-form-group">

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
                  setError("");
                  setMessage("");
                }}
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
                      {String(
                        account.number
                      ).slice(-4)}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* SELECTED RECIPIENT */}

            {selectedToAccount && (
              <div className="transfer-recipient-preview">

                <div className="recipient-avatar">
                  {selectedToAccount.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <span>
                    TRANSFER TO
                  </span>

                  <strong>
                    {selectedToAccount.name}
                  </strong>

                  <small>
                    Account ••••
                    {String(
                      selectedToAccount.number
                    ).slice(-4)}
                  </small>

                </div>

              </div>
            )}


            {/* AMOUNT */}

            <div className="polished-form-group">

              <label htmlFor="transfer-amount">
                Transfer amount
              </label>

              <div className="polished-amount-input">

                <span>
                  $
                </span>

                <input
                  id="transfer-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(event) => {
                    setAmount(
                      event.target.value
                    );
                    setError("");
                    setMessage("");
                  }}
                  placeholder="0.00"
                />

              </div>

            </div>


            {/* MESSAGE */}

            {error && (
              <div className="polished-transfer-message transfer-error">
                <span>!</span>
                {error}
              </div>
            )}

            {message && (
              <div className="polished-transfer-message transfer-success">
                <span>✓</span>
                {message}
              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="polished-transfer-submit"
            >
              <span>
                Transfer money
              </span>

              <b>
                →
              </b>
            </button>

          </form>

        </div>


        {/* SIDE PANEL */}

        <aside className="polished-transfer-sidebar">

          <div className="transfer-side-security">

            <div className="transfer-side-icon">
              ✓
            </div>

            <span>
              GFB SECURE TRANSFER
            </span>

            <h2>
              Move money with confidence.
            </h2>

            <p>
              Your transfer is processed
              securely and your account
              balances update immediately.
            </p>

          </div>


          <div className="transfer-side-details">

            <div>

              <span>
                01
              </span>

              <div>
                <strong>
                  Select an account
                </strong>

                <p>
                  Choose where the money
                  will come from.
                </p>
              </div>

            </div>


            <div>

              <span>
                02
              </span>

              <div>
                <strong>
                  Choose destination
                </strong>

                <p>
                  Select the GFB account
                  receiving the funds.
                </p>
              </div>

            </div>


            <div>

              <span>
                03
              </span>

              <div>
                <strong>
                  Enter amount
                </strong>

                <p>
                  Confirm the amount before
                  sending your transfer.
                </p>
              </div>

            </div>

          </div>


          <div className="transfer-side-note">

            <span>
              ✓
            </span>

            <p>
              Transfers are recorded in
              your transaction history.
            </p>

          </div>

        </aside>

      </section>

    </main>
  );
}

export default Transfers;