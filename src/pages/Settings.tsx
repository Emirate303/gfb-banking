import { useBankingSettings } from "../BankingSettingsContext";

function Settings() {
  const {
    settings,
    updateSetting,
  } = useBankingSettings();

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">
          Preferences
        </p>

        <h1>Settings</h1>

        <p className="subtitle">
          Manage your application preferences.
        </p>
      </section>

      <section className="settings-panel">
        <div className="section-header">
          <div>
            <h2>Display Settings</h2>

            <p>
              Choose how information is displayed
              throughout the application.
            </p>
          </div>
        </div>

        <div className="settings-list">
          <div className="setting-row">
            <div className="setting-information">
              <strong>
                Show Account Balances
              </strong>

              <span>
                Display account balances and
                transaction amounts.
              </span>
            </div>

            <button
              type="button"
              className={`setting-switch ${
                settings.showBalances
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                updateSetting(
                  "showBalances",
                  !settings.showBalances
                )
              }
              aria-pressed={
                settings.showBalances
              }
            >
              <span />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Settings;