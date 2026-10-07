import { useState } from "react";
import type { Page } from "../App";

interface SidebarProps {
  onNavigate: (page: Page) => void;
  onSignOut: () => void;
  currentPage?: Page;
}

function Sidebar({
  onNavigate,
  onSignOut,
  currentPage = "dashboard",
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleNavigation(page: Page) {
    onNavigate(page);
    setIsOpen(false);
  }

  return (
    <>
      {/* THREE-LINE MENU BUTTON */}
      <button
        type="button"
        className={`gfb-menu-button ${
          isOpen ? "gfb-menu-button-open" : ""
        }`}
        onClick={() => setIsOpen((value) => !value)}
        aria-label={
          isOpen
            ? "Close banking menu"
            : "Open banking menu"
        }
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* DARK BACKDROP */}
      {isOpen && (
        <div
          className="gfb-menu-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`gfb-sidebar ${
          isOpen ? "gfb-sidebar-open" : ""
        }`}
      >
        {/* BRAND */}
        <div className="gfb-sidebar-header">
          <div className="gfb-sidebar-logo">
            GFB
          </div>

          <div className="gfb-sidebar-brand">
            <strong>
              Guardian Federal Bank
            </strong>

            <span>
              Banking
            </span>
          </div>

          <button
            type="button"
            className="gfb-sidebar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="gfb-sidebar-nav">
          <button
            type="button"
            className={
              currentPage === "dashboard"
                ? "gfb-nav-active"
                : ""
            }
            onClick={() =>
              handleNavigation("dashboard")
            }
          >
            <span className="gfb-nav-icon">
              ◈
            </span>

            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={
              currentPage === "accounts"
                ? "gfb-nav-active"
                : ""
            }
            onClick={() =>
              handleNavigation("accounts")
            }
          >
            <span className="gfb-nav-icon">
              ◫
            </span>

            <span>Accounts</span>
          </button>

          <button
            type="button"
            className={
              currentPage === "transfers"
                ? "gfb-nav-active"
                : ""
            }
            onClick={() =>
              handleNavigation("transfers")
            }
          >
            <span className="gfb-nav-icon">
              ⇄
            </span>

            <span>Transfers</span>
          </button>

          <button
            type="button"
            className={
              currentPage === "transactions"
                ? "gfb-nav-active"
                : ""
            }
            onClick={() =>
              handleNavigation("transactions")
            }
          >
            <span className="gfb-nav-icon">
              ≡
            </span>

            <span>Transactions</span>
          </button>

          <button
            type="button"
            className={
              currentPage === "payments"
                ? "gfb-nav-active"
                : ""
            }
            onClick={() =>
              handleNavigation("payments")
            }
          >
            <span className="gfb-nav-icon">
              $
            </span>

            <span>Payments</span>
          </button>

          <button
            type="button"
            className={
              currentPage === "cards"
                ? "gfb-nav-active"
                : ""
            }
            onClick={() =>
              handleNavigation("cards")
            }
          >
            <span className="gfb-nav-icon">
              ▭
            </span>

            <span>Cards</span>
          </button>

          <button
            type="button"
            className={
              currentPage === "profile"
                ? "gfb-nav-active"
                : ""
            }
            onClick={() =>
              handleNavigation("profile")
            }
          >
            <span className="gfb-nav-icon">
              ◉
            </span>

            <span>Profile</span>
          </button>

          <button
            type="button"
            className={
              currentPage === "settings"
                ? "gfb-nav-active"
                : ""
            }
            onClick={() =>
              handleNavigation("settings")
            }
          >
            <span className="gfb-nav-icon">
              ⚙
            </span>

            <span>Settings</span>
          </button>
        </nav>

        {/* BOTTOM */}
        <div className="gfb-sidebar-bottom">
          <div className="gfb-sidebar-security">
            <span>●</span>

            <div>
              <strong>
                Secure Session
              </strong>

              <small>
                Your connection is protected
              </small>
            </div>
          </div>

          <button
            type="button"
            className="gfb-signout-button"
            onClick={onSignOut}
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;