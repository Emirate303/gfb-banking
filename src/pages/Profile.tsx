import { useEffect, useMemo, useState } from "react";
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

function loadProfile(): ProfileData {
const saved = localStorage.getItem("banking_profile");

if (!saved) {
return defaultProfile;
}

try {
return {
...defaultProfile,
...(JSON.parse(saved) as Partial<ProfileData>),
};
} catch {
return defaultProfile;
}
}

function Profile({ onNavigate }: ProfileProps) {
const [profile, setProfile] =
useState<ProfileData>(loadProfile);

const [savedProfile, setSavedProfile] =
useState<ProfileData>(loadProfile);

const [message, setMessage] = useState("");

const [isEditing, setIsEditing] =
useState(false);

const [showPersonalDetails, setShowPersonalDetails] =
useState(true);

useEffect(() => {
localStorage.setItem(
"banking_profile",
JSON.stringify(profile)
);
}, [profile]);

const fullName = useMemo(() => {
const name =
`${profile.firstName} ${profile.lastName}`.trim();


return name || "GFB Customer";


}, [profile.firstName, profile.lastName]);

const initials = useMemo(() => {
const first =
profile.firstName.trim().charAt(0);


const last =
  profile.lastName.trim().charAt(0);

return (
  `${first}${last}`.toUpperCase() || "GFB"
);


}, [profile.firstName, profile.lastName]);

const profileCompletion = useMemo(() => {
const fields = [
profile.firstName,
profile.lastName,
profile.email,
profile.phone,
profile.address,
profile.city,
profile.state,
profile.postalCode,
];


const completed = fields.filter(
  (field) => field.trim().length > 0
).length;

return Math.round(
  (completed / fields.length) * 100
);


}, [profile]);

function updateField(
field: keyof ProfileData,
value: string
) {
setProfile((current) => ({
...current,
[field]: value,
}));


setMessage("");


}

function handleSave() {
localStorage.setItem(
"banking_profile",
JSON.stringify(profile)
);

setSavedProfile(profile);
setIsEditing(false);

setMessage(
  "Your profile information has been saved successfully."
);

}

function handleCancel() {
setProfile(savedProfile);
setIsEditing(false);
setMessage("");
}

function handleReset() {
setProfile(defaultProfile);
setSavedProfile(defaultProfile);

localStorage.removeItem("banking_profile");

setIsEditing(false);

setMessage(
  "Your profile information has been reset."
);

}

return ( <section className="profile-page"> <div className="profile-header"> <div> <p className="eyebrow">
CUSTOMER PROFILE </p>

```
      <h1>Your profile</h1>

      <p className="page-description">
        Manage your personal information and
        account contact details.
      </p>
    </div>

    <button
      type="button"
      className={
        isEditing
          ? "secondary-button"
          : "primary-button"
      }
      onClick={() => {
        if (isEditing) {
          handleCancel();
        } else {
          setIsEditing(true);
          setMessage("");
        }
      }}
    >
      {isEditing
        ? "Cancel editing"
        : "Edit profile"}
    </button>
  </div>

  <div className="profile-layout">
    <aside className="profile-summary-card">
      <div className="profile-summary-top">
        <div className="profile-avatar">
          {initials}
        </div>

        <div className="profile-summary-status">
          <span />
          Active
        </div>
      </div>

      <h2>{fullName}</h2>

      <p className="profile-summary-email">
        {profile.email ||
          "Customer email not added"}
      </p>

      <div className="profile-status">
        <span />
        Verified customer
      </div>

      <div className="profile-summary-divider" />

      <div className="profile-summary-item">
        <span>Customer status</span>
        <strong>Active</strong>
      </div>

      <div className="profile-summary-item">
        <span>Profile completion</span>

        <strong>
          {profileCompletion}%
        </strong>
      </div>

      <div className="profile-progress">
        <div
          style={{
            width: `${profileCompletion}%`,
          }}
        />
      </div>

      <div className="profile-summary-item">
        <span>Security</span>

        <strong>
          Protected
        </strong>
      </div>
    </aside>

    <div className="profile-content">
      <div className="profile-card">
        <div className="profile-card-header">
          <div>
            <p className="eyebrow">
              PERSONAL INFORMATION
            </p>

            <h2>
              Personal details
            </h2>

            <p>
              Keep your information current so we
              can contact you when necessary.
            </p>
          </div>

          <button
            type="button"
            className="profile-collapse-button"
            onClick={() =>
              setShowPersonalDetails(
                !showPersonalDetails
              )
            }
            aria-label={
              showPersonalDetails
                ? "Collapse personal information"
                : "Expand personal information"
            }
          >
            {showPersonalDetails
              ? "−"
              : "+"}
          </button>
        </div>

        {showPersonalDetails && (
          <div className="profile-form">
            <div className="profile-form-grid">
              <div className="profile-field">
                <label htmlFor="firstName">
                  First name
                </label>

                <input
                  id="firstName"
                  type="text"
                  value={profile.firstName}
                  disabled={!isEditing}
                  onChange={(event) =>
                    updateField(
                      "firstName",
                      event.target.value
                    )
                  }
                  placeholder="First name"
                />
              </div>

              <div className="profile-field">
                <label htmlFor="lastName">
                  Last name
                </label>

                <input
                  id="lastName"
                  type="text"
                  value={profile.lastName}
                  disabled={!isEditing}
                  onChange={(event) =>
                    updateField(
                      "lastName",
                      event.target.value
                    )
                  }
                  placeholder="Last name"
                />
              </div>

              <div className="profile-field">
                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled={!isEditing}
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value
                    )
                  }
                  placeholder="name@example.com"
                />
              </div>

              <div className="profile-field">
                <label htmlFor="phone">
                  Phone number
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  disabled={!isEditing}
                  onChange={(event) =>
                    updateField(
                      "phone",
                      event.target.value
                    )
                  }
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="profile-card">
        <div className="profile-card-header">
          <div>
            <p className="eyebrow">
              MAILING ADDRESS
            </p>

            <h2>
              Address information
            </h2>

            <p>
              Your current contact address.
            </p>
          </div>
        </div>

        <div className="profile-form">
          <div className="profile-form-grid">
            <div className="profile-field profile-field-full">
              <label htmlFor="address">
                Street address
              </label>

              <input
                id="address"
                type="text"
                value={profile.address}
                disabled={!isEditing}
                onChange={(event) =>
                  updateField(
                    "address",
                    event.target.value
                  )
                }
                placeholder="Street address"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="city">
                City
              </label>

              <input
                id="city"
                type="text"
                value={profile.city}
                disabled={!isEditing}
                onChange={(event) =>
                  updateField(
                    "city",
                    event.target.value
                  )
                }
                placeholder="City"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="state">
                State
              </label>

              <input
                id="state"
                type="text"
                value={profile.state}
                disabled={!isEditing}
                onChange={(event) =>
                  updateField(
                    "state",
                    event.target.value
                  )
                }
                placeholder="State"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="postalCode">
                ZIP / Postal code
              </label>

              <input
                id="postalCode"
                type="text"
                value={profile.postalCode}
                disabled={!isEditing}
                onChange={(event) =>
                  updateField(
                    "postalCode",
                    event.target.value
                  )
                }
                placeholder="Postal code"
              />
            </div>
          </div>
        </div>
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
        </div>
      )}

      {isEditing && (
        <div className="profile-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={handleSave}
          >
            Save profile
          </button>
        </div>
      )}

      <div className="profile-security-card">
        <div className="profile-security-icon">
          ✓
        </div>

        <div>
          <p className="eyebrow">
            ACCOUNT SECURITY
          </p>

          <h3>
            Keep your information protected
          </h3>

          <p>
            Review your account security settings
            regularly and never share your banking
            credentials with another person.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            onNavigate?.("settings")
          }
        >
          Security settings
        </button>
      </div>

      <div className="profile-danger-card">
        <div>
          <p className="eyebrow">
            PROFILE MANAGEMENT
          </p>

          <h3>
            Reset profile information
          </h3>

          <p>
            Remove the saved profile information
            from this browser.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button profile-danger-button"
          onClick={handleReset}
        >
          Reset profile
        </button>
      </div>
    </div>
  </div>
</section>


);
}

export default Profile;