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
      icon: "↔",
    },
    {
      id: "payments",
      label: "Payments",
      icon: "↗",
    },
    {
      id: "cards",
      label: "Cards",
      icon: "▤",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "◎",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙",
    },
  ];

  return (
    <aside className="gfb-sidebar">
      <div className="gfb-sidebar-brand">
        <div className="gfb-sidebar-logo">
          GFB
        </div>

        <div>
          <strong>Guardian Federal Bank</strong>
          <span>Personal Banking</span>
        </div>
      </div>

      <nav className="gfb-sidebar-nav">
        <div className="gfb-sidebar-section-label">
          BANKING
        </div>

        {navigation.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`gfb-sidebar-link ${
              activePage === item.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              onNavigate(item.id)
            }
          >
            <span className="gfb-sidebar-link-icon">
              {item.icon}
            </span>

            <span className="gfb-sidebar-link-label">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="gfb-sidebar-bottom">
        <div className="gfb-sidebar-secure">
          <span className="gfb-sidebar-secure-icon">
            ✓
          </span>

          <div>
            <strong>Secure Banking</strong>
            <span>
              Your connection is protected
            </span>
          </div>
        </div>

        <button
          type="button"
          className="gfb-sidebar-logout"
          onClick={onLogout}
        >
          <span>↪</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;