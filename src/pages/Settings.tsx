import { useEffect, useState } from "react";
import type { Page } from "../App";
import { useBanking } from "../BankingContext";
import { useBankingSettings } from "../BankingSettingsContext";

interface SettingsProps {
  onNavigate?: (page: Page) => void;
}

function Settings({ onNavigate }: SettingsProps) {
  const {
    showBalance,
    setShowBalance,
    resetBankingData,
  } = useBanking();

  const {
    settings,
    updateSetting,
  } = useBankingSettings();

  const [message, setMessage] = useState("");

  const [showResetConfirm, setShowResetConfirm] =
    useState(false);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = window.setTimeout(() => {
      setMessage("");
    }, 3500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [message]);

  function saveMessage(text: string) {
    setMessage(text);
  }

  function handleBalanceToggle() {
    setShowBalance(!showBalance);

    saveMessage(
      !showBalance
        ? "Account balances are now visible."
        : "Account balances are now hidden."
    );
  }

  function handleNotificationToggle() {
    updateSetting(
      "notifications",
      !settings.notifications
    );

    saveMessage(
      !settings.notifications
        ? "Notifications have been enabled."
        : "Notifications have been disabled."
    );
  }

  function handleEmailToggle() {
    updateSetting(
      "emailAlerts",
      !settings.emailAlerts
    );

    saveMessage(
      !settings.emailAlerts
        ? "Email alerts have been enabled."
        : "Email alerts have been disabled."
    );
  }

  function handleSecurityToggle() {
    updateSetting(
      "securityAlerts",
      !settings.securityAlerts
    );

    saveMessage(
      !settings.securityAlerts
        ? "Security alerts have been enabled."
        : "Security alerts have been disabled."
    );
  }

  function handleReset() {
    resetBankingData();
    setShowResetConfirm(false);

    saveMessage(
      "Your banking data has been restored to its starting state."
    );
  }

  return (
    <section className="settings-page">
      <div className="settings-header">
        <div>
          <p className="eyebrow">
            ACCOUNT PREFERENCES
          </p>

          <h1>Settings</h1>

          <p className="page-description">
            Manage your banking preferences,
            notifications, privacy controls, and
            account security settings.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            onNavigate?.("profile")
          }
        >
          View profile
        </button>
      </div>

      {message && (
        <div className="settings-success-message">
          <span>✓</span>

          <div>
            <strong>
              Settings updated
            </strong>

            <p>{message}</p>
          </div>

          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <div className="settings-layout">
        <div className="settings-main">
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-card-icon">
                ◉
              </div>

              <div>
                <p className="eyebrow">
                  DISPLAY
                </p>

                <h2>
                  Display preferences
                </h2>

                <p>
                  Control how account information is
                  displayed throughout your banking
                  experience.
                </p>
              </div>
            </div>

            <div className="settings-list">
              <div className="settings-row">
                <div className="settings-row-icon">
                  $
                </div>

                <div className="settings-row-content">
                  <strong>
                    Show account balances
                  </strong>

                  <span>
                    Display your balances on dashboard,
                    accounts, cards, and transaction
                    pages.
                  </span>
                </div>

                <button
                  type="button"
                  className={
                    showBalance
                      ? "settings-toggle active"
                      : "settings-toggle"
                  }
                  onClick={
                    handleBalanceToggle
                  }
                  aria-pressed={showBalance}
                  aria-label="Toggle account balances"
                >
                  <span />
                </button>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-card-icon">
                ◌
              </div>

              <div>
                <p className="eyebrow">
                  NOTIFICATIONS
                </p>

                <h2>
                  Notification preferences
                </h2>

                <p>
                  Choose how you want to receive
                  important account information.
                </p>
              </div>
            </div>

            <div className="settings-list">
              <div className="settings-row">
                <div className="settings-row-icon">
                  ◇
                </div>

                <div className="settings-row-content">
                  <strong>
                    Banking notifications
                  </strong>

                  <span>
                    Receive notifications for payments,
                    transfers, and account activity.
                  </span>
                </div>

                <button
                  type="button"
                  className={
                    settings.notifications
                      ? "settings-toggle active"
                      : "settings-toggle"
                  }
                  onClick={
                    handleNotificationToggle
                  }
                  aria-pressed={
                    settings.notifications
                  }
                  aria-label="Toggle banking notifications"
                >
                  <span />
                </button>
              </div>

              <div className="settings-row">
                <div className="settings-row-icon">
                  @
                </div>

                <div className="settings-row-content">
                  <strong>
                    Email alerts
                  </strong>

                  <span>
                    Receive important account updates
                    and activity alerts by email.
                  </span>
                </div>

                <button
                  type="button"
                  className={
                    settings.emailAlerts
                      ? "settings-toggle active"
                      : "settings-toggle"
                  }
                  onClick={
                    handleEmailToggle
                  }
                  aria-pressed={
                    settings.emailAlerts
                  }
                  aria-label="Toggle email alerts"
                >
                  <span />
                </button>
              </div>

              <div className="settings-row">
                <div className="settings-row-icon">
                  !
                </div>

                <div className="settings-row-content">
                  <strong>
                    Security alerts
                  </strong>

                  <span>
                    Get notified about important
                    security-related account activity.
                  </span>
                </div>

                <button
                  type="button"
                  className={
                    settings.securityAlerts
                      ? "settings-toggle active"
                      : "settings-toggle"
                  }
                  onClick={
                    handleSecurityToggle
                  }
                  aria-pressed={
                    settings.securityAlerts
                  }
                  aria-label="Toggle security alerts"
                >
                  <span />
                </button>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-card-icon">
                ✓
              </div>

              <div>
                <p className="eyebrow">
                  SECURITY
                </p>

                <h2>
                  Account security
                </h2>

                <p>
                  Review your security controls and
                  personal account information.
                </p>
              </div>
            </div>

            <div className="settings-action-list">
              <button
                type="button"
                className="settings-action-row"
                onClick={() =>
                  onNavigate?.("profile")
                }
              >
                <div className="settings-action-icon">
                  ◉
                </div>

                <div>
                  <strong>
                    Personal information
                  </strong>

                  <span>
                    Review your name, contact details,
                    and address.
                  </span>
                </div>

                <span className="settings-action-arrow">
                  ›
                </span>
              </button>

              <button
                type="button"
                className="settings-action-row"
                onClick={() =>
                  onNavigate?.("cards")
                }
              >
                <div className="settings-action-icon">
                  ▣
                </div>

                <div>
                  <strong>
                    Card controls
                  </strong>

                  <span>
                    Manage card status and card
                    preferences.
                  </span>
                </div>

                <span className="settings-action-arrow">
                  ›
                </span>
              </button>

              <button
                type="button"
                className="settings-action-row"
                onClick={() =>
                  onNavigate?.("transactions")
                }
              >
                <div className="settings-action-icon">
                  ≡
                </div>

                <div>
                  <strong>
                    Review account activity
                  </strong>

                  <span>
                    Review recent transactions and
                    payment activity.
                  </span>
                </div>

                <span className="settings-action-arrow">
                  ›
                </span>
              </button>
            </div>
          </div>

          <div className="settings-card settings-danger-card">
            <div className="settings-card-header">
              <div className="settings-card-icon danger">
                !
              </div>

              <div>
                <p className="eyebrow">
                  DATA MANAGEMENT
                </p>

                <h2>
                  Reset banking data
                </h2>

                <p>
                  Restore your account and transaction
                  data to the original starting state.
                </p>
              </div>
            </div>

            <div className="settings-danger-content">
              <div>
                <strong>
                  Restore starting data
                </strong>

                <span>
                  This will remove locally saved account
                  changes and transactions.
                </span>
              </div>

              <button
                type="button"
                className="secondary-button settings-danger-button"
                onClick={() =>
                  setShowResetConfirm(true)
                }
              >
                Reset data
              </button>
            </div>
          </div>
        </div>

        <aside className="settings-sidebar">
          <div className="settings-status-card">
            <div className="settings-status-icon">
              ✓
            </div>

            <p className="eyebrow">
              ACCOUNT STATUS
            </p>

            <h3>
              Your account is protected
            </h3>

            <p>
              Your preferences and locally stored
              banking information are protected by
              your account settings.
            </p>

            <div className="settings-status-line">
              <span>
                Account status
              </span>

              <strong>
                <span />
                Active
              </strong>
            </div>

            <div className="settings-status-line">
              <span>
                Security alerts
              </span>

              <strong>
                {settings.securityAlerts
                  ? "On"
                  : "Off"}
              </strong>
            </div>
          </div>

          <div className="settings-help-card">
            <p className="eyebrow">
              NEED HELP?
            </p>

            <h3>
              Review your profile
            </h3>

            <p>
              Make sure your contact information is
              current and up to date.
            </p>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                onNavigate?.("profile")
              }
            >
              Open profile
            </button>
          </div>
        </aside>
      </div>

      {showResetConfirm && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() =>
            setShowResetConfirm(false)
          }
        >
          <div
            className="modal settings-reset-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-reset-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="settings-reset-icon">
              !
            </div>

            <p className="eyebrow">
              CONFIRM ACTION
            </p>

            <h2 id="settings-reset-title">
              Reset banking data?
            </h2>

            <p>
              This will restore your accounts and
              transactions to their original starting
              state. This action cannot be undone.
            </p>

            <div className="settings-reset-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowResetConfirm(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-button settings-reset-confirm"
                onClick={handleReset}
              >
                Reset data
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Settings;