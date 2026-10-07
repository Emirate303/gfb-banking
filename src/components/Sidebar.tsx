import { useState } from "react";
import type { Page } from "../App";

interface SidebarProps {
  onNavigate: (page: Page) => void;
  onSignOut: () => void;
}

function Sidebar({
  onNavigate,
  onSignOut,
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
        className="gfb-menu-button"
        onClick={() =>
          setIsOpen((value) => !value)
        }
        aria-label="Open banking menu"
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
            onClick={() =>
              setIsOpen(false)
            }
            aria-label="Close menu"
          >
            ×
          </button>

        </div>


        {/* NAVIGATION */}

        <nav className="gfb-sidebar-nav">

          <button
            type="button"
            onClick={() =>
              handleNavigation("dashboard")
            }
          >
            <span className="gfb-nav-icon">
              ◈
            </span>

            Dashboard
          </button>


          <button
            type="button"
            onClick={() =>
              handleNavigation("accounts")
            }
          >
            <span className="gfb-nav-icon">
              ◫
            </span>

            Accounts
          </button>


          <button
            type="button"
            onClick={() =>
              handleNavigation("transfers")
            }
          >
            <span className="gfb-nav-icon">
              ⇄
            </span>

            Transfers
          </button>


          <button
            type="button"
            onClick={() =>
              handleNavigation("transactions")
            }
          >
            <span className="gfb-nav-icon">
              ≡
            </span>

            Transactions
          </button>


          <button
            type="button"
            onClick={() =>
              handleNavigation("payments")
            }
          >
            <span className="gfb-nav-icon">
              $
            </span>

            Payments
          </button>


          <button
            type="button"
            onClick={() =>
              handleNavigation("cards")
            }
          >
            <span className="gfb-nav-icon">
              ▭
            </span>

            Cards
          </button>


          <button
            type="button"
            onClick={() =>
              handleNavigation("profile")
            }
          >
            <span className="gfb-nav-icon">
              ◉
            </span>

            Profile
          </button>


          <button
            type="button"
            onClick={() =>
              handleNavigation("settings")
            }
          >
            <span className="gfb-nav-icon">
              ⚙
            </span>

            Settings
          </button>

        </nav>


        {/* BOTTOM */}

        <div className="gfb-sidebar-bottom">

          <div className="gfb-sidebar-security">
            <span>
              ●
            </span>

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