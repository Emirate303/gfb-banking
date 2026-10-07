import { useState } from "react";
import { useBanking } from "../BankingContext";
import { useNotifications } from "../NotificationContext";

interface CardsProps {
  onNavigate?: (page: string) => void;
}

function Cards({ onNavigate }: CardsProps) {
  const { accounts } = useBanking();

  const { addNotification } =
    useNotifications();

  const [selectedCard, setSelectedCard] =
    useState(0);

  const [isLocked, setIsLocked] =
    useState(false);

  const [showNumber, setShowNumber] =
    useState(false);

  const cards = [
    {
      id: "gfb-001",
      type: "GFB Signature",
      number: "4582 9134 7621 0846",
      expiry: "09/29",
      cvv: "428",
      holder: "CARDHOLDER",
      network: "VISA",
      color: "signature",
    },
    {
      id: "gfb-002",
      type: "GFB Platinum",
      number: "5274 6819 3047 2158",
      expiry: "04/30",
      cvv: "731",
      holder: "CARDHOLDER",
      network: "VISA",
      color: "platinum",
    },
  ];

  const card = cards[selectedCard];

  const currentAccount =
    accounts.length > 0
      ? accounts[0]
      : null;

  const availableBalance =
    currentAccount?.balance ?? 0;

  const monthlyLimit = 5000;

  const spentThisMonth = 1248.32;

  const remainingLimit =
    Math.max(
      monthlyLimit - spentThisMonth,
      0
    );

  const spendingPercentage =
    Math.min(
      (spentThisMonth / monthlyLimit) * 100,
      100
    );

  function money(value: number) {
    return `$${value.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  function handleLockToggle() {
    const nextLocked = !isLocked;

    setIsLocked(nextLocked);

    addNotification(
      nextLocked
        ? "Card locked"
        : "Card unlocked",
      nextLocked
        ? "Your GFB card has been locked successfully."
        : "Your GFB card has been unlocked successfully.",
      "security"
    );
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

  return (
    <main className="cards-page polished-cards-page">

      {/* PAGE HEADER */}

      <header className="polished-cards-header">

        <div>
          <div className="cards-breadcrumb">
            Banking
            <span>/</span>
            Cards
          </div>

          <h1>
            Cards
          </h1>

          <p>
            Manage your cards, spending limits,
            and security preferences.
          </p>
        </div>

        <div className="cards-header-status">
          <span className="status-dot" />
          All systems operational
        </div>

      </header>


      {/* CARD SELECTOR */}

      <section className="polished-card-selector">

        <div className="selector-heading">
          <div>
            <span>
              YOUR CARDS
            </span>

            <strong>
              {cards.length} active cards
            </strong>
          </div>

          <button
            type="button"
            onClick={handleActivate}
          >
            + Activate card
          </button>
        </div>

        <div className="selector-list">

          {cards.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={
                selectedCard === index
                  ? "selector-card active"
                  : "selector-card"
              }
              onClick={() =>
                setSelectedCard(index)
              }
            >

              <span
                className={`mini-card mini-${item.color}`}
              >
                <i />
              </span>

              <span className="selector-card-info">
                <strong>
                  {item.type}
                </strong>

                <small>
                  •••• {item.number.slice(-4)}
                </small>
              </span>

              {selectedCard === index && (
                <span className="selector-check">
                  ✓
                </span>
              )}

            </button>
          ))}

        </div>

      </section>


      {/* MAIN CONTENT */}

      <section className="polished-card-layout">

        {/* LEFT */}

        <div className="polished-card-left">

          <div className="selected-card-label">
            <span>
              SELECTED CARD
            </span>

            <strong>
              {card.type}
            </strong>
          </div>


          {/* REALISTIC CARD */}

          <div
            className={`premium-bank-card premium-${card.color} ${
              isLocked
                ? "premium-card-locked"
                : ""
            }`}
          >

            <div className="premium-card-glow" />

            <div className="premium-card-top">

              <div className="premium-card-brand">

                <div className="premium-gfb-mark">
                  GFB
                </div>

                <div>
                  <strong>
                    Guardian Federal
                  </strong>

                  <span>
                    BANK
                  </span>
                </div>

              </div>

              <div className="premium-contactless">
                ))) 
              </div>

            </div>


            <div className="premium-chip">
              <span />
              <span />
              <span />
              <span />
            </div>


            <div className="premium-card-number">

              {showNumber
                ? card.number
                : `••••  ••••  ••••  ${card.number.slice(-4)}`}

            </div>


            <div className="premium-card-bottom">

              <div>
                <small>
                  CARDHOLDER
                </small>

                <strong>
                  {card.holder}
                </strong>
              </div>

              <div>
                <small>
                  VALID THRU
                </small>

                <strong>
                  {card.expiry}
                </strong>
              </div>

              <div className="premium-visa">
                VISA
              </div>

            </div>


            {isLocked && (
              <div className="premium-lock-overlay">

                <div>
                  🔒
                </div>

                <strong>
                  CARD LOCKED
                </strong>

                <span>
                  Unlock this card to resume
                  transactions.
                </span>

              </div>
            )}

          </div>


          {/* CARD ACTIONS */}

          <div className="premium-card-actions">

            <button
              type="button"
              onClick={() =>
                setShowNumber(
                  (value) => !value
                )
              }
            >
              <span>
                {showNumber ? "◉" : "○"}
              </span>

              {showNumber
                ? "Hide details"
                : "Show details"}
            </button>

            <button
              type="button"
              onClick={handleLockToggle}
            >
              <span>
                {isLocked ? "🔓" : "🔒"}
              </span>

              {isLocked
                ? "Unlock card"
                : "Lock card"}
            </button>

            <button
              type="button"
              onClick={handleReplaceCard}
            >
              <span>
                ↻
              </span>

              Replace
            </button>

          </div>

        </div>


        {/* RIGHT */}

        <div className="polished-card-right">

          {/* BALANCE */}

          <div className="card-balance-panel">

            <div className="panel-label">
              AVAILABLE BALANCE

              <span>
                ●
              </span>
            </div>

            <strong>
              {money(availableBalance)}
            </strong>

            <small>
              Available from your primary
              account
            </small>

          </div>


          {/* CARD DETAILS */}

          <div className="card-details-panel">

            <div className="panel-title">
              <strong>
                Card details
              </strong>

              <span>
                {isLocked
                  ? "Locked"
                  : "Active"}
              </span>
            </div>


            <div className="details-row">
              <span>
                Card number
              </span>

              <strong>
                {showNumber
                  ? card.number
                  : `•••• ${card.number.slice(-4)}`}
              </strong>
            </div>


            <div className="details-row">
              <span>
                Expiration
              </span>

              <strong>
                {card.expiry}
              </strong>
            </div>


            <div className="details-row">
              <span>
                Security code
              </span>

              <strong>
                {showNumber
                  ? card.cvv
                  : "•••"}
              </strong>
            </div>


            <div className="details-row">
              <span>
                Network
              </span>

              <strong>
                {card.network}
              </strong>
            </div>

          </div>


          {/* SPENDING */}

          <div className="spending-panel">

            <div className="panel-title">

              <div>
                <strong>
                  Monthly spending
                </strong>

                <small>
                  {money(spentThisMonth)} of{" "}
                  {money(monthlyLimit)}
                </small>
              </div>

              <span>
                {Math.round(
                  spendingPercentage
                )}%
              </span>

            </div>


            <div className="spending-progress">
              <div
                style={{
                  width: `${spendingPercentage}%`,
                }}
              />
            </div>


            <div className="spending-bottom">

              <span>
                Remaining
              </span>

              <strong>
                {money(remainingLimit)}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* QUICK ACTIONS */}

      <section className="card-quick-actions">

        <div className="quick-actions-heading">
          <span>
            CARD MANAGEMENT
          </span>

          <h2>
            Quick actions
          </h2>
        </div>


        <div className="quick-actions-grid">

          <button
            type="button"
            onClick={handleLockToggle}
          >
            <span className="quick-action-icon">
              🔒
            </span>

            <div>
              <strong>
                {isLocked
                  ? "Unlock card"
                  : "Lock card"}
              </strong>

              <small>
                Temporarily disable card
                transactions
              </small>
            </div>

            <b>
              →
            </b>
          </button>


          <button
            type="button"
            onClick={handleReplaceCard}
          >
            <span className="quick-action-icon">
              ↻
            </span>

            <div>
              <strong>
                Replace card
              </strong>

              <small>
                Request a replacement card
              </small>
            </div>

            <b>
              →
            </b>
          </button>


          <button
            type="button"
            onClick={() =>
              onNavigate?.(
                "transactions"
              )
            }
          >
            <span className="quick-action-icon">
              ≡
            </span>

            <div>
              <strong>
                Card transactions
              </strong>

              <small>
                Review recent activity
              </small>
            </div>

            <b>
              →
            </b>
          </button>

        </div>

      </section>


      {/* SECURITY NOTICE */}

      <section className="card-security-panel">

        <div className="security-symbol">
          ✓
        </div>

        <div>
          <strong>
            Your card is protected
          </strong>

          <p>
            Guardian Federal Bank monitors
            card activity and security events
            to help protect your account.
          </p>
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