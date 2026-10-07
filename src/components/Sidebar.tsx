import { useState } from "react";
import type { Page } from "../App";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

function Sidebar({
  activePage,
  onNavigate,
  onLogout,
}: SidebarProps) {
  const [isOpen, setIsOpen] =
    useState(false);

  const menuItems: {
    page: Page;
    icon: string;
    label: string;
  }[] = [
    {
      page: "dashboard",
      icon: "⌂",
      label: "Dashboard",
    },
    {
      page: "accounts",
      icon: "▣",
      label: "Accounts",
    },
    {
      page: "transfers",
      icon: "⇄",
      label: "Transfers",
    },
    {
      page: "transactions",
      icon: "↔",
      label: "Transactions",
    },
    {
      page: "payments",
      icon: "₦",
      label: "Payments",
    },
    {
      page: "cards",
      icon: "▭",
      label: "Cards",
    },
    {
      page: "profile",
      icon: "◉",
      label: "Profile",
    },
    {
      page: "settings",
      icon: "⚙",
      label: "Settings",
    },
  ];

  function handleNavigate(page: Page) {
    onNavigate(page);
    setIsOpen(false);
  }

  function handleLogout() {
    setIsOpen(false);
    onLogout();
  }

  return (
    <>
      {/* MOBILE TOP BAR */}

      <header className="mobile-navigation">

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={
            isOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isOpen}
          onClick={() =>
            setIsOpen((current) => !current)
          }
        >
          <span />
          <span />
          <span />
        </button>

        <div className="mobile-brand">
          <strong>GFB</strong>
          <span>Guardian Federal Bank</span>
        </div>

      </header>


      {/* MOBILE DROPDOWN */}

      <div
        className={`mobile-navigation-dropdown ${
          isOpen ? "open" : ""
        }`}
      >

        <div className="mobile-navigation-header">
          <div>
            <span>
              GUARDIAN FEDERAL BANK
            </span>

            <strong>
              Banking
            </strong>
          </div>

          <button
            type="button"
            className="mobile-navigation-close"
            onClick={() =>
              setIsOpen(false)
            }
            aria-label="Close menu"
          >
            ×
          </button>
        </div>


        <nav className="mobile-navigation-list">

          {menuItems.map((item) => (
            <button
              key={item.page}
              type="button"
              className={`mobile-navigation-item ${
                activePage === item.page
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleNavigate(item.page)
              }
            >

              <span className="mobile-navigation-icon">
                {item.icon}
              </span>

              <span className="mobile-navigation-label">
                {item.label}
              </span>

              <span className="mobile-navigation-arrow">
                →
              </span>

            </button>
          ))}


          <div className="mobile-navigation-divider" />


          <button
            type="button"
            className="mobile-navigation-item mobile-signout"
            onClick={handleLogout}
          >

            <span className="mobile-navigation-icon">
              ↪
            </span>

            <span className="mobile-navigation-label">
              Sign out
            </span>

            <span className="mobile-navigation-arrow">
              →
            </span>

          </button>

        </nav>

      </div>


      {/* DESKTOP SIDEBAR */}

      <aside className="desktop-sidebar">

        <div className="desktop-sidebar-brand">
          <div>GFB</div>

          <span>
            Guardian Federal Bank
          </span>
        </div>


        <nav className="desktop-sidebar-nav">

          {menuItems.map((item) => (
            <button
              key={item.page}
              type="button"
              className={
                activePage === item.page
                  ? "active"
                  : ""
              }
              onClick={() =>
                onNavigate(item.page)
              }
            >
              <span>
                {item.icon}
              </span>

              {item.label}
            </button>
          ))}

        </nav>


        <button
          type="button"
          className="desktop-sidebar-signout"
          onClick={onLogout}
        >
          <span>↪</span>
          Sign out
        </button>

      </aside>
    </>
  );
}

export default Sidebar;