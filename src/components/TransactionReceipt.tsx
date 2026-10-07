import type { Transaction } from "../BankingContext";

interface TransactionReceiptProps {
  transaction: Transaction;
  showBalance: boolean;
  onClose: () => void;
}

function TransactionReceipt({
  transaction,
  showBalance,
  onClose,
}: TransactionReceiptProps) {
  const formattedAmount = Math.abs(
    transaction.amount
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const reference =
    transaction.reference ??
    `GFB-${transaction.id}`;

  function handlePrint() {
  window.print();
}
  return (
    <div
      className="receipt-overlay"
      onClick={onClose}
    >
      <div
        className="receipt-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* RECEIPT HEADER */}

        <div className="receipt-header">

          <div className="receipt-brand">

            <div className="receipt-logo">
              GFB
            </div>

            <div>
              <strong>
                Guardian Federal Bank
              </strong>

              <span>
                Transaction Receipt
              </span>
            </div>

          </div>

          <button
            type="button"
            className="receipt-close"
            onClick={onClose}
            aria-label="Close receipt"
          >
            ×
          </button>

        </div>


        {/* TRANSACTION STATUS */}

        <div className="receipt-status">

          <div className="receipt-status-icon">
            ✓
          </div>

          <div>
            <strong>
              Transaction Complete
            </strong>

            <span>
              Successfully processed
            </span>
          </div>

        </div>


        {/* AMOUNT */}

        <div className="receipt-amount">

          <span>
            Transaction Amount
          </span>

          <strong>
            {showBalance
              ? `${
                  transaction.amount < 0
                    ? "-"
                    : "+"
                }$${formattedAmount}`
              : "••••••••"}
          </strong>

        </div>


        {/* RECEIPT DETAILS */}

        <div className="receipt-details">

          {/* RECIPIENT */}

          <div className="receipt-row">

            <span>
              Recipient
            </span>

            <strong>
              {transaction.merchant}
            </strong>

          </div>


          {/* DESCRIPTION */}

          <div className="receipt-row">

            <span>
              Description
            </span>

            <strong>
              {transaction.description}
            </strong>

          </div>


          {/* RECIPIENT BANK */}

          {transaction.recipientBank && (
            <div className="receipt-row">

              <span>
                Recipient Bank
              </span>

              <strong>
                {transaction.recipientBank}
              </strong>

            </div>
          )}


          {/* RECIPIENT ACCOUNT */}

          {transaction.recipientAccountNumber && (
            <div className="receipt-row">

              <span>
                Recipient Account
              </span>

              <strong>
                ••••{" "}
                {transaction.recipientAccountNumber.slice(
                  -4
                )}
              </strong>

            </div>
          )}


          {/* DATE */}

          <div className="receipt-row">

            <span>
              Date
            </span>

            <strong>
              {transaction.date}
            </strong>

          </div>


          {/* REFERENCE */}

          <div className="receipt-row">

            <span>
              Reference
            </span>

            <strong className="receipt-id">
              {reference}
            </strong>

          </div>


          {/* TRANSACTION ID */}

          <div className="receipt-row">

            <span>
              Transaction ID
            </span>

            <strong className="receipt-id">
              {transaction.id}
            </strong>

          </div>


          {/* STATUS */}

          <div className="receipt-row">

            <span>
              Status
            </span>

            <strong className="receipt-success">
              Completed
            </strong>

          </div>

        </div>


        {/* RECEIPT FOOTER */}

       <div className="receipt-footer">

  <div className="receipt-footer-brand">

    <span>
      Guardian Federal Bank
    </span>

    <small>
      GFB Online Banking
    </small>

  </div>

  <button
    type="button"
    className="receipt-print-button"
    onClick={handlePrint}
  >
    Print Receipt
  </button>

</div>

      </div>
    </div>
  );
}

export default TransactionReceipt;