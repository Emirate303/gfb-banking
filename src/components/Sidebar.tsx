import type { Page } from "../App";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

function Sidebar({
  activePage,
  onNavigate,
  onLogout,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {

  const navigation: {
    page: Page;
    label: string;
    icon: string;
  }[] = [
    {
      page: "dashboard",
      label: "Dashboard",
      icon: "⌂",
    },
    {
      page: "accounts",
      label: "Accounts",
      icon: "▣",
    },
    {
      page: "transfers",
      label: "Transfers",
      icon: "⇄",
    },
    {
      page: "transactions",
      label: "Transactions",
      icon: "↔",
    },
    {
      page: "payments",
      label: "Payments",
      icon: "₦",
    },
    {
      page: "cards",
      label: "Cards",
      icon: "▭",
    },
    {
      page: "profile",
      label: "Profile",
      icon: "◉",
    },
    {
      page: "settings",
      label: "Settings",
      icon: "⚙",
    },
  ];

  function navigate(page: Page) {
    onNavigate(page);
    onMobileClose();
  }

  function logout() {
    onMobileClose();
    onLogout();
  }

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          className="mobile-sidebar-overlay"
          aria-label="Close navigation"
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
              Bank
            </span>
          </div>

          <button
            type="button"
            className="mobile-sidebar-close"
            onClick={onMobileClose}
            aria-label="Close navigation"
          >
            ×
          </button>

        </div>


        <nav className="sidebar-navigation">

          <span className="sidebar-section-label">
            Banking
          </span>

          {navigation.map((item) => (

            <button
              key={item.page}
              type="button"
              className={`sidebar-nav-item ${
                activePage === item.page
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                navigate(item.page)
              }
            >

              <span className="sidebar-nav-icon">
                {item.icon}
              </span>

              <span className="sidebar-nav-label">
                {item.label}
              </span>

              {activePage === item.page && (
                <span className="sidebar-active-indicator">
                  →
                </span>
              )}

            </button>

          ))}

        </nav>


        <div className="sidebar-security-card">

          <div className="sidebar-security-icon">
            ✓
          </div>

          <strong>
            Secure Banking
          </strong>

          <span>
            Your account is protected.
          </span>

        </div>


        <div className="sidebar-bottom">

          <button
            type="button"
            className="sidebar-logout"
            onClick={logout}
          >

            <span>
              ↪
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