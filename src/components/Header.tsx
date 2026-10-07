interface HeaderProps {
  onMenuClick: () => void;
}

function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="top-header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          ☰
        </button>

        <div className="mobile-brand">
          <div className="brand-mark">
            H
          </div>

          <div>
            <strong>Guardian Federal Bank</strong>
            <span>Federal Credit Union</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <button
          className="header-icon"
          aria-label="Notifications"
        >
          ♢
        </button>

        <button
          className="header-profile"
          aria-label="Profile"
        >
          AM
        </button>
      </div>
    </header>
  );
}

export default Header;