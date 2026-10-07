import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type { Page } from "../App";

interface ProfileProps {
  onNavigate?: (page: Page) => void;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

const defaultProfile: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
};

function Profile({ onNavigate }: ProfileProps) {
  const [profile, setProfile] =
    useState<ProfileData>(defaultProfile);

  const [message, setMessage] =
    useState("");

  const [showResetConfirm, setShowResetConfirm] =
    useState(false);

  useEffect(() => {
    const savedProfile =
      window.localStorage.getItem("banking_profile");

    if (!savedProfile) {
      return;
    }

    try {
      const parsedProfile =
        JSON.parse(savedProfile) as Partial<ProfileData>;

      setProfile({
        ...defaultProfile,
        ...parsedProfile,
      });
    } catch {
      setProfile(defaultProfile);
    }
  }, []);

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

  function updateField(
    field: keyof ProfileData,
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const cleanedProfile: ProfileData = {
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
      address: profile.address.trim(),
      city: profile.city.trim(),
      state: profile.state.trim(),
      postalCode: profile.postalCode.trim(),
    };

    window.localStorage.setItem(
      "banking_profile",
      JSON.stringify(cleanedProfile)
    );

    setProfile(cleanedProfile);

    setMessage(
      "Your profile information has been saved successfully."
    );
  }

  function handleReset() {
    window.localStorage.removeItem(
      "banking_profile"
    );

    setProfile(defaultProfile);
    setShowResetConfirm(false);

    setMessage(
      "Your profile information has been restored to its starting state."
    );
  }

  const displayName =
    `${profile.firstName} ${profile.lastName}`.trim();

  const initials =
    `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`
      .toUpperCase();

  return (
    <section className="profile-page">
      <div className="profile-header">
        <div>
          <p className="eyebrow">
            PERSONAL INFORMATION
          </p>

          <h1>Profile</h1>

          <p className="page-description">
            Manage your personal information and
            contact details associated with your
            Guardian Federal Bank profile.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            onNavigate?.("settings")
          }
        >
          Account settings
        </button>
      </div>

      {message && (
        <div className="profile-success-message">
          <span>✓</span>

          <div>
            <strong>
              Profile updated
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

      <div className="profile-layout">
        <div className="profile-main">
          <div className="profile-card profile-identity-card">
            <div className="profile-avatar">
              {initials || "GFB"}
            </div>

            <div className="profile-identity">
              <p className="eyebrow">
                ACCOUNT HOLDER
              </p>

              <h2>
                {displayName || "GFB Customer"}
              </h2>

              <span>
                Guardian Federal Bank customer
              </span>
            </div>

            <div className="profile-status">
              <span />
              Active
            </div>
          </div>

          <form
            className="profile-form-card"
            onSubmit={handleSubmit}
          >
            <div className="profile-card-header">
              <div className="profile-card-icon">
                ◉
              </div>

              <div>
                <p className="eyebrow">
                  PERSONAL DETAILS
                </p>

                <h2>
                  Personal information
                </h2>

                <p>
                  Keep your name and contact
                  information current.
                </p>
              </div>
            </div>

            <div className="profile-form">
              <div className="profile-field">
                <label htmlFor="profile-first-name">
                  First name
                </label>

                <input
                  id="profile-first-name"
                  type="text"
                  value={profile.firstName}
                  onChange={(event) =>
                    updateField(
                      "firstName",
                      event.target.value
                    )
                  }
                  placeholder="First name"
                  autoComplete="given-name"
                  maxLength={50}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-last-name">
                  Last name
                </label>

                <input
                  id="profile-last-name"
                  type="text"
                  value={profile.lastName}
                  onChange={(event) =>
                    updateField(
                      "lastName",
                      event.target.value
                    )
                  }
                  placeholder="Last name"
                  autoComplete="family-name"
                  maxLength={50}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-email">
                  Email address
                </label>

                <input
                  id="profile-email"
                  type="email"
                  value={profile.email}
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value
                    )
                  }
                  placeholder="name@example.com"
                  autoComplete="email"
                  maxLength={100}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-phone">
                  Phone number
                </label>

                <input
                  id="profile-phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(event) =>
                    updateField(
                      "phone",
                      event.target.value
                    )
                  }
                  placeholder="Phone number"
                  autoComplete="tel"
                  maxLength={30}
                />
              </div>
            </div>

            <div className="profile-divider" />

            <div className="profile-card-header">
              <div className="profile-card-icon">
                ◇
              </div>

              <div>
                <p className="eyebrow">
                  MAILING ADDRESS
                </p>

                <h2>
                  Address information
                </h2>

                <p>
                  Keep your mailing address up to
                  date.
                </p>
              </div>
            </div>

            <div className="profile-form">
              <div className="profile-field profile-field-full">
                <label htmlFor="profile-address">
                  Street address
                </label>

                <input
                  id="profile-address"
                  type="text"
                  value={profile.address}
                  onChange={(event) =>
                    updateField(
                      "address",
                      event.target.value
                    )
                  }
                  placeholder="Street address"
                  autoComplete="street-address"
                  maxLength={120}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-city">
                  City
                </label>

                <input
                  id="profile-city"
                  type="text"
                  value={profile.city}
                  onChange={(event) =>
                    updateField(
                      "city",
                      event.target.value
                    )
                  }
                  placeholder="City"
                  autoComplete="address-level2"
                  maxLength={60}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-state">
                  State
                </label>

                <input
                  id="profile-state"
                  type="text"
                  value={profile.state}
                  onChange={(event) =>
                    updateField(
                      "state",
                      event.target.value
                    )
                  }
                  placeholder="State"
                  autoComplete="address-level1"
                  maxLength={60}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-postal-code">
                  Postal code
                </label>

                <input
                  id="profile-postal-code"
                  type="text"
                  value={profile.postalCode}
                  onChange={(event) =>
                    updateField(
                      "postalCode",
                      event.target.value
                    )
                  }
                  placeholder="Postal code"
                  autoComplete="postal-code"
                  maxLength={20}
                />
              </div>
            </div>

            <div className="profile-form-footer">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setProfile(defaultProfile);
                  setMessage("");
                }}
              >
                Clear changes
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                Save profile
              </button>
            </div>
          </form>

          <div className="profile-danger-card">
            <div>
              <p className="eyebrow">
                DATA MANAGEMENT
              </p>

              <h3>
                Reset profile information
              </h3>

              <p>
                Remove your locally saved profile
                information and restore the blank
                starting state.
              </p>
            </div>

            <button
              type="button"
              className="secondary-button profile-danger-button"
              onClick={() =>
                setShowResetConfirm(true)
              }
            >
              Reset profile
            </button>
          </div>
        </div>

        <aside className="profile-sidebar">
          <div className="profile-side-card">
            <div className="profile-side-icon">
              ✓
            </div>

            <p className="eyebrow">
              PROFILE STATUS
            </p>

            <h3>
              Your information
            </h3>

            <div className="profile-status-list">
              <div>
                <span>Name</span>

                <strong>
                  {displayName || "Not set"}
                </strong>
              </div>

              <div>
                <span>Email</span>

                <strong>
                  {profile.email || "Not set"}
                </strong>
              </div>

              <div>
                <span>Phone</span>

                <strong>
                  {profile.phone || "Not set"}
                </strong>
              </div>
            </div>
          </div>

          <div className="profile-side-card">
            <div className="profile-side-icon">
              ⚙
            </div>

            <p className="eyebrow">
              ACCOUNT PREFERENCES
            </p>

            <h3>
              Manage your settings
            </h3>

            <p>
              Control balance visibility,
              notifications, security alerts, and
              other account preferences.
            </p>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                onNavigate?.("settings")
              }
            >
              Open settings
            </button>
          </div>

          <div className="profile-side-card">
            <div className="profile-side-icon">
              ▣
            </div>

            <p className="eyebrow">
              CARD MANAGEMENT
            </p>

            <h3>
              Manage your cards
            </h3>

            <p>
              Review your GFB cards and manage their
              current status.
            </p>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                onNavigate?.("cards")
              }
            >
              View cards
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
            className="modal profile-reset-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-reset-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="profile-reset-icon">
              !
            </div>

            <p className="eyebrow">
              CONFIRM ACTION
            </p>

            <h2 id="profile-reset-title">
              Reset profile?
            </h2>

            <p>
              This will remove your locally saved
              profile information and restore the
              blank starting state.
            </p>

            <div className="profile-reset-actions">
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
                className="primary-button"
                onClick={handleReset}
              >
                Reset profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;