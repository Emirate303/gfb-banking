import type { Transaction } from "../BankingContext";

interface TransactionReceiptProps {
  transaction: Transaction;
  accountName: string;
  onClose: () => void;
}

function TransactionReceipt({
  transaction,
  accountName,
  onClose,
}: TransactionReceiptProps) {
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

        <div className="receipt-header">

          <div>
            <p className="eyebrow">
              Guardian Federal Bank
            </p>

            <h2>
              Transaction Receipt
            </h2>
          </div>

          <button
            type="button"
            className="receipt-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        <div className="receipt-success">

          <div className="receipt-check">
            ✓
          </div>

          <div>
            <strong>
              Transaction Completed
            </strong>

            <span>
              Your transaction was successfully
              recorded.
            </span>
          </div>

        </div>


        <div className="receipt-amount">

          <span>
            {transaction.amount < 0
              ? "Amount Paid"
              : "Amount Received"}
          </span>

          <strong>
            {transaction.amount < 0
              ? "-"
              : "+"}
            $
            {Math.abs(
              transaction.amount
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>

        </div>


        <div className="receipt-details">

          <div className="receipt-detail">
            <span>
              Recipient / Merchant
            </span>

            <strong>
              {transaction.merchant}
            </strong>
          </div>


          {transaction.recipientBank && (
            <div className="receipt-detail">
              <span>
                Bank
              </span>

              <strong>
                {transaction.recipientBank}
              </strong>
            </div>
          )}


          {transaction.recipientAccountNumber && (
            <div className="receipt-detail">
              <span>
                Account Number
              </span>

              <strong>
                ••••
                {transaction.recipientAccountNumber.slice(
                  -4
                )}
              </strong>
            </div>
          )}


          <div className="receipt-detail">
            <span>
              Paid From
            </span>

            <strong>
              {accountName}
            </strong>
          </div>


          <div className="receipt-detail">
            <span>
              Description
            </span>

            <strong>
              {transaction.description}
            </strong>
          </div>


          <div className="receipt-detail">
            <span>
              Date
            </span>

            <strong>
              {transaction.date}
            </strong>
          </div>


          <div className="receipt-detail">
            <span>
              Status
            </span>

            <strong className="receipt-status">
              Completed
            </strong>
          </div>


          <div className="receipt-detail">
            <span>
              GFB Reference
            </span>

            <strong>
              {transaction.reference ??
                `GFB-${transaction.id}`}
            </strong>
          </div>

        </div>


        <div className="receipt-footer">

          <span>
            Guardian Federal Bank
          </span>

          <small>
            Keep this receipt for your records.
          </small>

        </div>

      </div>
    </div>
  );
}

export default TransactionReceipt;