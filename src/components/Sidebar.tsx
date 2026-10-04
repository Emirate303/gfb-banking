import type { Page } from "../App";

interface NavigationItem {
  id: Page;
  label: string;
  icon: string;
}

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
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
    icon: "⇄",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: "↔",
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
  currentPage,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          GFB
        </div>

        <div className="sidebar-brand-text">
          <strong>
            CapitalOne Federal
          </strong>

          <span>
            Credit Union
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">
          Banking
        </div>

        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-nav-item ${
              currentPage === item.id
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

            <span>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-security">
          <span className="security-dot" />

          <div>
            <strong>
              Secure Banking
            </strong>

            <span>
              Your session is protected
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;