import type { Page } from "../App";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems: {
  id: Page;
  label: string;
  icon: string;
}[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "⌂",
  },
  {
    id: "accounts",
    label: "Accounts",
    icon: "$",
  },
  {
    id: "transfers",
    label: "Transfers",
    icon: "↔",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: "≡",
  },
  {
    id: "payments",
    label: "Payments",
    icon: "✓",
  },
  {
    id: "cards",
    label: "Cards",
    icon: "▣",
  },
  {
    id: "profile",
    label: "Profile",
    icon: "●",
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
  function handleNavigation(page: Page) {
    onNavigate(page);
    onClose();
  }

  return (
    <>
      {isOpen && (
        <div
          className="gfb-menu-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={
          isOpen
            ? "gfb-sidebar open"
            : "gfb-sidebar"
        }
      >
        <div className="gfb-sidebar-header">

          <div className="gfb-brand">

            <div className="gfb-brand-mark">
              GFB
            </div>

            <div>
              <strong>
                Guardian Federal Bank
              </strong>

              <span>
                Banking
              </span>
            </div>

          </div>

          <button
            type="button"
            className="gfb-close-menu"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            ×
          </button>

        </div>


        <nav className="gfb-navigation">

          <span className="gfb-navigation-title">
            Banking
          </span>

          {navigationItems.map((item) => (

            <button
              type="button"
              key={item.id}
              className={
                currentPage === item.id
                  ? "gfb-nav-item active"
                  : "gfb-nav-item"
              }
              onClick={() =>
                handleNavigation(item.id)
              }
            >

              <span className="gfb-nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>

              {currentPage === item.id && (
                <span className="gfb-nav-active-dot">
                  ●
                </span>
              )}

            </button>

          ))}

        </nav>


        <div className="gfb-sidebar-footer">

          <div className="gfb-footer-security">
            <span className="gfb-security-dot"></span>

            <div>
              <strong>
                Secure Session
              </strong>

              <small>
                GFB Online Banking
              </small>
            </div>
          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;