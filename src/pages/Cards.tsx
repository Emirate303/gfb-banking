import { useState } from "react";
import type { Page } from "../App";
import { useBanking } from "../BankingContext";

interface CardsProps {
  onNavigate?: (page: Page) => void;
}

type CardStatus = "active" | "locked";

interface CardItem {
  id: string;
  type: string;
  lastFour: string;
  holder: string;
  status: CardStatus;
  expires: string;
}

const initialCards: CardItem[] = [
  {
    id: "gfb-card-001",
    type: "GFB Platinum Debit",
    lastFour: "4821",
    holder: "GFB CUSTOMER",
    status: "active",
    expires: "08/29",
  },
  {
    id: "gfb-card-002",
    type: "GFB Rewards Card",
    lastFour: "7316",
    holder: "GFB CUSTOMER",
    status: "active",
    expires: "11/28",
  },
];

function Cards({ onNavigate }: CardsProps) {
  const { accounts } = useBanking();

  const [cards, setCards] =
    useState<CardItem[]>(initialCards);

  const [selectedCard, setSelectedCard] =
    useState<string | null>(null);

  const [message, setMessage] =
    useState("");

  function toggleCard(cardId: string) {
    setCards((currentCards) =>
      currentCards.map((card) => {
        if (card.id !== cardId) {
          return card;
        }

        const newStatus =
          card.status === "active"
            ? "locked"
            : "active";

        setMessage(
          newStatus === "locked"
            ? `${card.type} ending in ${card.lastFour} has been locked.`
            : `${card.type} ending in ${card.lastFour} has been unlocked.`
        );

        return {
          ...card,
          status: newStatus,
        };
      })
    );
  }

  const activeCards = cards.filter(
    (card) => card.status === "active"
  ).length;

  const lockedCards = cards.filter(
    (card) => card.status === "locked"
  ).length;

  const selectedCardData = cards.find(
    (card) => card.id === selectedCard
  );

  return (
    <section className="cards-page">
      <div className="cards-header">
        <div>
          <p className="eyebrow">
            CARD MANAGEMENT
          </p>

          <h1>Cards</h1>

          <p className="page-description">
            Manage your Guardian Federal Bank cards,
            review card details, and control card
            access.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            onNavigate?.("settings")
          }
        >
          Card settings
        </button>
      </div>

      {message && (
        <div className="cards-message">
          <span>✓</span>

          <div>
            <strong>
              Card status updated
            </strong>

            <p>{message}</p>
          </div>

          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss card notification"
          >
            ×
          </button>
        </div>
      )}

      <div className="cards-summary-grid">
        <div className="cards-summary-card">
          <div className="cards-summary-icon">
            ▣
          </div>

          <div>
            <span>Total cards</span>

            <strong>
              {cards.length}
            </strong>

            <small>
              Cards connected to your profile
            </small>
          </div>
        </div>

        <div className="cards-summary-card">
          <div className="cards-summary-icon active">
            ✓
          </div>

          <div>
            <span>Active cards</span>

            <strong>
              {activeCards}
            </strong>

            <small>
              Currently available for use
            </small>
          </div>
        </div>

        <div className="cards-summary-card">
          <div className="cards-summary-icon locked">
            !
          </div>

          <div>
            <span>Locked cards</span>

            <strong>
              {lockedCards}
            </strong>

            <small>
              Temporarily unavailable
            </small>
          </div>
        </div>
      </div>

      <div className="cards-layout">
        <div className="cards-main-panel">
          <div className="cards-panel-header">
            <div>
              <p className="eyebrow">
                YOUR CARDS
              </p>

              <h2>
                Card management
              </h2>

              <p>
                Review your cards and manage their
                current status.
              </p>
            </div>

            <span>
              {cards.length}{" "}
              {cards.length === 1
                ? "card"
                : "cards"}
            </span>
          </div>

          <div className="cards-list">
            {cards.map((card) => (
              <article
                className="card-management-item"
                key={card.id}
              >
                <div className="gfb-visual-card">
                  <div className="gfb-card-top">
                    <span>
                      GUARDIAN FEDERAL BANK
                    </span>

                    <strong>
                      GFB
                    </strong>
                  </div>

                  <div className="gfb-card-chip">
                    ▦
                  </div>

                  <div className="gfb-card-number">
                    •••• •••• ••••{" "}
                    {card.lastFour}
                  </div>

                  <div className="gfb-card-bottom">
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
                        EXPIRES
                      </small>

                      <strong>
                        {card.expires}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="card-management-info">
                  <div className="card-management-heading">
                    <div>
                      <p className="eyebrow">
                        {card.type}
                      </p>

                      <h3>
                        Card ending in{" "}
                        {card.lastFour}
                      </h3>
                    </div>

                    <span
                      className={
                        card.status === "active"
                          ? "card-status active"
                          : "card-status locked"
                      }
                    >
                      <span />
                      {card.status === "active"
                        ? "Active"
                        : "Locked"}
                    </span>
                  </div>

                  <div className="card-management-details">
                    <div>
                      <span>
                        Card type
                      </span>

                      <strong>
                        {card.type}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Expiration
                      </span>

                      <strong>
                        {card.expires}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Linked accounts
                      </span>

                      <strong>
                        {accounts.length}
                      </strong>
                    </div>
                  </div>

                  <div className="card-management-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        setSelectedCard(card.id)
                      }
                    >
                      View details
                    </button>

                    <button
                      type="button"
                      className={
                        card.status === "active"
                          ? "card-lock-button"
                          : "card-unlock-button"
                      }
                      onClick={() =>
                        toggleCard(card.id)
                      }
                    >
                      {card.status === "active"
                        ? "Lock card"
                        : "Unlock card"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="cards-sidebar">
          <div className="cards-side-card cards-security-card">
            <div className="cards-side-icon">
              ✓
            </div>

            <p className="eyebrow">
              CARD SECURITY
            </p>

            <h3>
              Protect your cards
            </h3>

            <p>
              Lock a card immediately if you
              believe it has been lost, stolen, or
              used without your permission.
            </p>

            <div className="cards-security-list">
              <div>
                <span>✓</span>
                <span>
                  Lock cards when needed
                </span>
              </div>

              <div>
                <span>✓</span>
                <span>
                  Review card activity
                </span>
              </div>

              <div>
                <span>✓</span>
                <span>
                  Keep card information private
                </span>
              </div>
            </div>
          </div>

          <div className="cards-side-card">
            <p className="eyebrow">
              LINKED ACCOUNTS
            </p>

            <h3>
              Your accounts
            </h3>

            <p>
              Your cards are connected to your GFB
              banking relationship.
            </p>

            <div className="cards-account-count">
              <strong>
                {accounts.length}
              </strong>

              <span>
                linked{" "}
                {accounts.length === 1
                  ? "account"
                  : "accounts"}
              </span>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                onNavigate?.("accounts")
              }
            >
              View accounts
            </button>
          </div>

          <div className="cards-side-card">
            <p className="eyebrow">
              NEED HELP?
            </p>

            <h3>
              Review account security
            </h3>

            <p>
              Manage your broader account
              preferences and security controls.
            </p>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                onNavigate?.("settings")
              }
            >
              Security settings
            </button>
          </div>
        </aside>
      </div>

      <div className="cards-security-banner">
        <div className="cards-security-banner-icon">
          ✓
        </div>

        <div>
          <strong>
            Keep your card information secure
          </strong>

          <span>
            Never share your full card number,
            security code, or banking credentials.
          </span>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            onNavigate?.("transactions")
          }
        >
          Review activity
        </button>
      </div>

      {selectedCardData && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() =>
            setSelectedCard(null)
          }
        >
          <div
            className="modal card-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="card-detail-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="card-detail-header">
              <div>
                <p className="eyebrow">
                  CARD DETAILS
                </p>

                <h2 id="card-detail-title">
                  {selectedCardData.type}
                </h2>
              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={() =>
                  setSelectedCard(null)
                }
                aria-label="Close card details"
              >
                ×
              </button>
            </div>

            <div className="card-detail-visual">
              <div className="gfb-visual-card">
                <div className="gfb-card-top">
                  <span>
                    GUARDIAN FEDERAL BANK
                  </span>

                  <strong>
                    GFB
                  </strong>
                </div>

                <div className="gfb-card-chip">
                  ▦
                </div>

                <div className="gfb-card-number">
                  •••• •••• ••••{" "}
                  {selectedCardData.lastFour}
                </div>

                <div className="gfb-card-bottom">
                  <div>
                    <small>
                      CARDHOLDER
                    </small>

                    <strong>
                      {selectedCardData.holder}
                    </strong>
                  </div>

                  <div>
                    <small>
                      EXPIRES
                    </small>

                    <strong>
                      {selectedCardData.expires}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-detail-list">
              <div>
                <span>
                  Card status
                </span>

                <strong>
                  {selectedCardData.status ===
                  "active"
                    ? "Active"
                    : "Locked"}
                </strong>
              </div>

              <div>
                <span>
                  Card number
                </span>

                <strong>
                  •••• •••• ••••{" "}
                  {selectedCardData.lastFour}
                </strong>
              </div>

              <div>
                <span>
                  Expiration
                </span>

                <strong>
                  {selectedCardData.expires}
                </strong>
              </div>
            </div>

            <div className="card-detail-actions">
              <button
                type="button"
                className={
                  selectedCardData.status ===
                  "active"
                    ? "card-lock-button"
                    : "card-unlock-button"
                }
                onClick={() => {
                  toggleCard(
                    selectedCardData.id
                  );
                  setSelectedCard(null);
                }}
              >
                {selectedCardData.status ===
                "active"
                  ? "Lock card"
                  : "Unlock card"}
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  setSelectedCard(null)
                }
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cards;