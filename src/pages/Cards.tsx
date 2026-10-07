import { useState } from "react";
import { useBanking } from "../BankingContext";
import { useNotifications } from "../NotificationContext";

interface CardsProps {
  onNavigate?: (page: string) => void;
}

function Cards({
  onNavigate,
}: CardsProps) {
  const { accounts } = useBanking();

  const { addNotification } =
    useNotifications();

  const [selectedCard, setSelectedCard] =
    useState(0);

  const [isLocked, setIsLocked] =
    useState(false);

  const [showNumber, setShowNumber] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);

  /*
   * Use the first account as the card's
   * available balance.
   */
  const currentAccount =
    accounts.length > 0
      ? accounts[0]
      : null;

  const availableBalance =
    currentAccount?.balance ?? 0;

  /*
   * Demo card data used by the banking UI.
   */
  const cards = [
    {
      id: "gfb-001",
      type: "GFB Signature",
      number: "4582 9134 7621 0846",
      expiry: "09/29",
      cvv: "428",
      holder: "CARDHOLDER",
    },
    {
      id: "gfb-002",
      type: "GFB Platinum",
      number: "5274 6819 3047 2158",
      expiry: "04/30",
      cvv: "731",
      holder: "CARDHOLDER",
    },
  ];

  const card = cards[selectedCard];

  function handleLockToggle() {
    const newLockedState = !isLocked;

    setIsLocked(newLockedState);

    if (newLockedState) {
      addNotification(
        "Card locked",
        "Your GFB card has been locked successfully.",
        "security"
      );
    } else {
      addNotification(
        "Card unlocked",
        "Your GFB card has been unlocked successfully.",
        "security"
      );
    }
  }

  function handleActivate() {
    addNotification(
      "Card activated",
      "Your GFB card has been activated successfully.",
      "success"
    );
  }

  function handleReplaceCard() {
    addNotification(
      "Card replacement requested",
      "Your GFB card replacement request has been submitted.",
      "info"
    );
  }

  function formatBalance(
    balance: number
  ) {
    return `$${balance.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  return (
    <main className="cards-page">

      {/* HEADER */}

      <section className="cards-header">

        <div>
          <span className="cards-eyebrow">
            GFB • CARD SERVICES
          </span>

          <h1>
            Cards
          </h1>

          <p>
            Manage your Guardian Federal Bank
            cards securely.
          </p>
        </div>

        <div className="cards-header-actions">

          <button
            type="button"
            className="cards-secondary-button"
            onClick={() =>
              setShowDetails(
                (value) => !value
              )
            }
          >
            {showDetails
              ? "Hide details"
              : "Card details"}
          </button>

          <button
            type="button"
            className="cards-primary-button"
            onClick={handleActivate}
          >
            Activate card
          </button>

        </div>

      </section>


      {/* CARD SELECTOR */}

      <section className="card-selector">

        {cards.map(
          (item, index) => (
            <button
              type="button"
              key={item.id}
              className={
                selectedCard === index
                  ? "card-selector-item active"
                  : "card-selector-item"
              }
              onClick={() =>
                setSelectedCard(index)
              }
            >
              <span className="card-selector-dot" />

              <span>
                {item.type}
              </span>

              <small>
                ••••{" "}
                {item.number.slice(-4)}
              </small>
            </button>
          )
        )}

      </section>


      {/* MAIN CARD AREA */}

      <section className="card-display-section">

        <div className="gfb-card-column">

          <div
            className={`gfb-bank-card ${
              isLocked
                ? "gfb-bank-card-locked"
                : ""
            }`}
          >

            {/* CARD TOP */}

            <div className="gfb-card-top">

              <div className="gfb-card-brand">
                <span>
                  GFB
                </span>

                <small>
                  Guardian Federal Bank
                </small>
              </div>

              <div className="gfb-card-chip">
                <div />
              </div>

            </div>


            {/* CARD NUMBER */}

            <div className="gfb-card-number">

              {showNumber
                ? card.number
                : "•••• •••• •••• " +
                  card.number.slice(-4)}

            </div>


            {/* CARD BOTTOM */}

            <div className="gfb-card-bottom">

              <div>
                <span>
                  CARDHOLDER
                </span>

                <strong>
                  {card.holder}
                </strong>
              </div>

              <div>
                <span>
                  EXPIRES
                </span>

                <strong>
                  {card.expiry}
                </strong>
              </div>

              <div className="gfb-card-network">
                VISA
              </div>

            </div>


            {/* LOCK OVERLAY */}

            {isLocked && (
              <div className="gfb-card-lock-overlay">

                <div className="gfb-lock-icon">
                  🔒
                </div>

                <strong>
                  Card locked
                </strong>

                <span>
                  This card is temporarily
                  unavailable.
                </span>

              </div>
            )}

          </div>


          {/* CARD CONTROLS */}

          <div className="card-controls">

            <button
              type="button"
              onClick={() =>
                setShowNumber(
                  (value) => !value
                )
              }
            >
              {showNumber
                ? "Hide number"
                : "Show number"}
            </button>

            <button
              type="button"
              onClick={handleLockToggle}
            >
              {isLocked
                ? "Unlock card"
                : "Lock card"}
            </button>

            <button
              type="button"
              onClick={handleReplaceCard}
            >
              Replace card
            </button>

          </div>

        </div>


        {/* CARD INFORMATION */}

        <div className="card-information">

          <div className="card-information-header">

            <div>
              <span className="cards-eyebrow">
                SELECTED CARD
              </span>

              <h2>
                {card.type}
              </h2>
            </div>

            <span
              className={
                isLocked
                  ? "card-status locked"
                  : "card-status active"
              }
            >
              <span />

              {isLocked
                ? "Locked"
                : "Active"}
            </span>

          </div>


          {/* AVAILABLE BALANCE */}

          <div className="card-balance-card">

            <span>
              Available balance
            </span>

            <strong>
              {formatBalance(
                availableBalance
              )}
            </strong>

            <small>
              Available across your
              primary account
            </small>

          </div>


          {/* DETAILS */}

          <div className="card-details-grid">

            <div className="card-detail">

              <span>
                Card number
              </span>

              <strong>
                {showDetails
                  ? card.number
                  : "•••• •••• •••• " +
                    card.number.slice(-4)}
              </strong>

            </div>


            <div className="card-detail">

              <span>
                Expiration
              </span>

              <strong>
                {card.expiry}
              </strong>

            </div>


            <div className="card-detail">

              <span>
                Security code
              </span>

              <strong>
                {showDetails
                  ? card.cvv
                  : "•••"}
              </strong>

            </div>


            <div className="card-detail">

              <span>
                Card type
              </span>

              <strong>
                {card.type}
              </strong>

            </div>

          </div>


          {/* SECURITY NOTICE */}

          <div className="card-security-notice">

            <div className="card-security-icon">
              ✓
            </div>

            <div>

              <strong>
                Card security
              </strong>

              <p>
                Your card information is
                protected. Never share your
                card number or security code
                with anyone.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* RECENT CARD ACTIVITY */}

      <section className="card-activity-section">

        <div className="card-section-heading">

          <div>
            <span className="cards-eyebrow">
              CARD ACTIVITY
            </span>

            <h2>
              Recent activity
            </h2>
          </div>

          {onNavigate && (
            <button
              type="button"
              onClick={() =>
                onNavigate(
                  "transactions"
                )
              }
            >
              View transactions →
            </button>
          )}

        </div>


        <div className="card-activity-grid">

          <div className="card-activity-item">

            <div className="activity-icon">
              $
            </div>

            <div>
              <strong>
                Available balance
              </strong>

              <span>
                Current card spending
                availability
              </span>
            </div>

            <b>
              {formatBalance(
                availableBalance
              )}
            </b>

          </div>


          <div className="card-activity-item">

            <div className="activity-icon">
              ✓
            </div>

            <div>
              <strong>
                Card status
              </strong>

              <span>
                Current security state
              </span>
            </div>

            <b>
              {isLocked
                ? "Locked"
                : "Active"}
            </b>

          </div>


          <div className="card-activity-item">

            <div className="activity-icon">
              •••
            </div>

            <div>
              <strong>
                Card ending
              </strong>

              <span>
                Selected card
              </span>
            </div>

            <b>
              {card.number.slice(-4)}
            </b>

          </div>

        </div>

      </section>


      {/* BOTTOM SECURITY STRIP */}

      <section className="cards-security-strip">

        <div className="cards-security-mark">
          ✓
        </div>

        <div>

          <strong>
            Your card is protected
          </strong>

          <span>
            Guardian Federal Bank monitors
            your account for unusual activity.
          </span>

        </div>

        <button
          type="button"
          onClick={() =>
            addNotification(
              "Security check",
              "Your GFB card security settings are currently active.",
              "security"
            )
          }
        >
          Check security
        </button>

      </section>

    </main>
  );
}

export default Cards;