import type { Page } from "../App";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface NavigationItem {
  id: Page;
  label: string;
  icon: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "⌂",
  },
  {
    id: "accounts",
    label: "Accounts",
    icon: "▣",
  },
  {
    id: "transfers",
    label: "Transfers",
    icon: "↔",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: "☷",
  },
  {
    id: "payments",
    label: "Payments",
    icon: "$",
  },
  {
    id: "cards",
    label: "Cards",
    icon: "▭",
  },
  {
    id: "profile",
    label: "Profile",
    icon: "♙",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "⚙",
  },
];

function Sidebar({
  currentPage,
  onNavigate,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* DARK OVERLAY */}

      <div
        className={
          isOpen
            ? "sidebar-overlay sidebar-overlay-open"
            : "sidebar-overlay"
        }
        onClick={onClose}
        aria-hidden="true"
      />

      {/* SIDEBAR */}

      <aside
        className={
          isOpen
            ? "gfb-sidebar gfb-sidebar-open"
            : "gfb-sidebar"
        }
      >

        {/* BRAND */}

        <div className="sidebar-brand">

          <div className="sidebar-brand-logo">
            GFB
          </div>

          <div className="sidebar-brand-text">

            <strong>
              Guardian Federal Bank
            </strong>

            <span>
              GFB Banking
            </span>

          </div>

          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="sidebar-close-button"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            ×
          </button>

        </div>


        {/* NAVIGATION */}

        <nav className="sidebar-navigation">

          <span className="sidebar-section-label">
            Banking
          </span>

          {navigationItems.map((item) => (

            <button
              type="button"
              key={item.id}
              className={
                currentPage === item.id
                  ? "sidebar-nav-item active"
                  : "sidebar-nav-item"
              }
              onClick={() =>
                onNavigate(item.id)
              }
            >

              <span className="sidebar-nav-icon">
                {item.icon}
              </span>

              <span className="sidebar-nav-label">
                {item.label}
              </span>

              {currentPage === item.id && (
                <span className="sidebar-active-dot">
                  ●
                </span>
              )}

            </button>

          ))}

        </nav>


        {/* FOOTER */}

        <div className="sidebar-footer">

          <div className="sidebar-security">

            <span className="sidebar-security-icon">
              ✓
            </span>

            <div>
              <strong>
                Secure Banking
              </strong>

              <span>
                Protected session
              </span>
            </div>

          </div>

          <div className="sidebar-footer-brand">
            GFB · Guardian Federal Bank
          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;