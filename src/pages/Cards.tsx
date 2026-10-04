import { useState } from "react";

interface Card {
  id: string;
  type: string;
  lastFour: string;
  expiry: string;
  status: "Active" | "Locked";
  holder: string;
}

const initialCards: Card[] = [
  {
    id: "gfb-debit-001",
    type: "GFB Debit Card",
    lastFour: "4821",
    expiry: "08/29",
    status: "Active",
    holder: "Card Holder",
  },
  {
    id: "gfb-credit-001",
    type: "GFB Credit Card",
    lastFour: "7316",
    expiry: "11/30",
    status: "Active",
    holder: "Card Holder",
  },
];

function Cards() {
  const [cards, setCards] =
    useState<Card[]>(initialCards);

  function toggleCardStatus(
    cardId: string
  ) {
    setCards((currentCards) =>
      currentCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              status:
                card.status === "Active"
                  ? "Locked"
                  : "Active",
            }
          : card
      )
    );
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">
          Card Management
        </p>

        <h1>
          Cards
        </h1>

        <p className="subtitle">
          Manage your GFB cards and card
          security settings.
        </p>
      </section>

      <section className="cards-section">
        <div className="section-header">
          <div>
            <h2>
              Your Cards
            </h2>

            <p>
              View your available cards and
              manage their status.
            </p>
          </div>
        </div>

        <div className="cards-grid">
          {cards.map((card) => (
            <article
              className="bank-card-wrapper"
              key={card.id}
            >
              <div
                className={`bank-card ${
                  card.status === "Locked"
                    ? "bank-card-locked"
                    : ""
                }`}
              >
                <div className="bank-card-top">
                  <div>
                    <strong>
                      CapitalOne Federal
                    </strong>

                    <span>
                      Credit Union
                    </span>
                  </div>

                  <span className="bank-card-mark">
                    GFB
                  </span>
                </div>

                <div className="bank-card-chip">
                  ▦
                </div>

                <div className="bank-card-number">
                  •••• •••• ••••{" "}
                  {card.lastFour}
                </div>

                <div className="bank-card-bottom">
                  <div>
                    <span>
                      CARD HOLDER
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
                </div>
              </div>

              <div className="card-details-panel">
                <div>
                  <span>
                    Card Type
                  </span>

                  <strong>
                    {card.type}
                  </strong>
                </div>

                <div>
                  <span>
                    Status
                  </span>

                  <strong
                    className={
                      card.status ===
                      "Active"
                        ? "card-status-active"
                        : "card-status-locked"
                    }
                  >
                    {card.status}
                  </strong>
                </div>

                <button
                  type="button"
                  className={
                    card.status ===
                    "Active"
                      ? "secondary-button"
                      : "primary-button"
                  }
                  onClick={() =>
                    toggleCardStatus(
                      card.id
                    )
                  }
                >
                  {card.status ===
                  "Active"
                    ? "Lock Card"
                    : "Unlock Card"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card-security-section">
        <div className="card-security-panel">
          <div className="card-security-icon">
            ✓
          </div>

          <div>
            <h2>
              Card Security
            </h2>

            <p>
              Lock a card immediately if you
              believe it has been lost,
              stolen, or accessed without
              authorization.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cards;