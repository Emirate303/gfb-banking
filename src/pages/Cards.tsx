import { useMemo, useState } from "react";
import type { Page } from "../App";
import { useBanking } from "../BankingContext";

interface CardsProps {
  onNavigate?: (page: Page) => void;
}

interface VirtualCard {
  id: string;
  name: string;
  type: string;
  lastFour: string;
  expiry: string;
  status: "Active" | "Locked";
  color: "navy" | "blue";
}

function Cards({ onNavigate }: CardsProps) {
  const { accounts, showBalance } = useBanking();

  const [showCardNumber, setShowCardNumber] =
    useState(false);

  const [cards, setCards] = useState<VirtualCard[]>([
    {
      id: "gfb-card-1",
      name: "Guardian Debit",
      type: "Debit Card",
      lastFour: "4821",
      expiry: "09/29",
      status: "Active",
      color: "navy",
    },
    {
      id: "gfb-card-2",
      name: "Guardian Rewards",
      type: "Credit Card",
      lastFour: "7316",
      expiry: "04/30",
      status: "Active",
      color: "blue",
    },
  ]);

  const activeCards = useMemo(() => {
    return cards.filter(
      (card) => card.status === "Active"
    ).length;
  }, [cards]);

  const totalAvailable = useMemo(() => {
    return accounts.reduce(
      (total, account) =>
        total + account.balance,
      0
    );
  }, [accounts]);

  function toggleCardStatus(id: string) {
    setCards((currentCards) =>
      currentCards.map((card) => {
        if (card.id !== id) {
          return card;
        }

        return {
          ...card,
          status:
            card.status === "Active"
              ? "Locked"
              : "Active",
        };
      })
    );
  }

  return (
    <section className="cards-page">
      <div className="cards-header">
        <div>
          <p className="eyebrow">
            CARD MANAGEMENT
          </p>

          <h1>Your cards</h1>

          <p className="page-description">
            Manage your Guardian Federal Bank cards,
            review card status, and access important
            card controls.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() =>
            onNavigate?.("payments")
          }
        >
          Make a payment
        </button>
      </div>

      <div className="cards-summary-grid">
        <div className="cards-summary-card">
          <div className="cards-summary-icon">
            ◇
          </div>

          <div>
            <span>Total cards</span>
            <strong>{cards.length}</strong>
            <small>Issued to you</small>
          </div>
        </div>

        <div className="cards-summary-card">
          <div className="cards-summary-icon active">
            ✓
          </div>

          <div>
            <span>Active cards</span>
            <strong>{activeCards}</strong>
            <small>Ready to use</small>
          </div>
        </div>

        <div className="cards-summary-card">
          <div className="cards-summary-icon balance">
            $
          </div>

          <div>
            <span>Available funds</span>

            <strong>
              {showBalance
                ? totalAvailable.toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    }
                  )
                : "••••••"}
            </strong>

            <small>Across your accounts</small>
          </div>
        </div>
      </div>

      <div className="cards-section">
        <div className="cards-section-header">
          <div>
            <p className="eyebrow">
              YOUR WALLET
            </p>

            <h2>Cards</h2>

            <p>
              Your GFB cards and their current status.
            </p>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              setShowCardNumber(
                !showCardNumber
              )
            }
          >
            {showCardNumber
              ? "Hide numbers"
              : "Show numbers"}
          </button>
        </div>

        <div className="cards-grid">
          {cards.map((card) => (
            <article
              className={`bank-card bank-card-${card.color}`}
              key={card.id}
            >
              <div className="bank-card-top">
                <div className="bank-card-brand">
                  <span className="bank-card-mark">
                    GFB
                  </span>

                  <strong>
                    Guardian Federal Bank
                  </strong>
                </div>

                <span className="bank-card-chip">
                  ▦
                </span>
              </div>

              <div className="bank-card-number">
                {showCardNumber
                  ? "4217 6082 9145 " +
                    card.lastFour
                  : "•••• •••• •••• " +
                    card.lastFour}
              </div>

              <div className="bank-card-bottom">
                <div>
                  <span>VALID THRU</span>
                  <strong>{card.expiry}</strong>
                </div>

                <div>
                  <span>CARDHOLDER</span>
                  <strong>GFB CUSTOMER</strong>
                </div>

                <div className="bank-card-network">
                  <span />
                  <span />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="cards-management-grid">
        {cards.map((card) => (
          <div
            className="card-management-card"
            key={card.id}
          >
            <div className="card-management-header">
              <div>
                <p className="eyebrow">
                  {card.type}
                </p>

                <h3>{card.name}</h3>
              </div>

              <span
                className={
                  card.status === "Active"
                    ? "card-status active"
                    : "card-status locked"
                }
              >
                <span />
                {card.status}
              </span>
            </div>

            <div className="card-management-number">
              <span>
                Card number
              </span>

              <strong>
                {showCardNumber
                  ? `4217 6082 9145 ${card.lastFour}`
                  : `•••• •••• •••• ${card.lastFour}`}
              </strong>
            </div>

            <div className="card-management-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  toggleCardStatus(card.id)
                }
              >
                {card.status === "Active"
                  ? "Lock card"
                  : "Unlock card"}
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  onNavigate?.("settings")
                }
              >
                Card settings
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cards-security-banner">
        <div className="cards-security-icon">
          ✓
        </div>

        <div>
          <strong>
            Keep your cards protected
          </strong>

          <span>
            Never share your complete card number,
            PIN, security code, or online banking
            password with anyone.
          </span>
        </div>

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
    </section>
  );
}

export default Cards;