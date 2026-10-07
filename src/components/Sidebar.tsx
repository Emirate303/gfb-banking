import type { Page } from "../App";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const navigation: {
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
    icon: "▣",
  },
  {
    id: "transfers",
    label: "Transfers",
    icon: "⇄",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: "↕",
  },
  {
    id: "payments",
    label: "Payments",
    icon: "$",
  },
  {
    id: "cards",
    label: "Cards",
    icon: "▤",
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
  activePage,
  onNavigate,
  onLogout,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          className="sidebar-mobile-overlay"
          aria-label="Close navigation menu"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`app-sidebar ${
          isMobileOpen
            ? "app-sidebar-mobile-open"
            : ""
        }`}
      >

        <div className="sidebar-brand">

          <div className="sidebar-brand-mark">
            GFB
          </div>

          <div className="sidebar-brand-text">
            <strong>
              Guardian Federal
            </strong>

            <span>
              Banking
            </span>
          </div>

          <button
            type="button"
            className="sidebar-mobile-close"
            aria-label="Close navigation menu"
            onClick={onMobileClose}
          >
            ×
          </button>

        </div>

        <div className="sidebar-section-label">
          BANKING
        </div>

        <nav className="sidebar-navigation">

          {navigation.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`sidebar-nav-item ${
                activePage === item.id
                  ? "active"
                  : ""
              }`}
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

              {activePage === item.id && (
                <span className="sidebar-active-indicator" />
              )}
            </button>
          ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-security">

            <span className="sidebar-security-icon">
              ✓
            </span>

            <div>
              <strong>
                Secure banking
              </strong>

              <span>
                Your account is protected
              </span>
            </div>

          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={onLogout}
          >
            <span>
              ⇥
            </span>

            <span>
              Sign out
            </span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;