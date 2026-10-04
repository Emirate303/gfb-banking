import {
  useEffect,
  useState,
} from "react";

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

const initialProfile: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
};

function Profile() {
  const [profile, setProfile] =
    useState<ProfileData>(() => {
      const saved =
        localStorage.getItem(
          "banking_profile"
        );

      if (!saved) {
        return initialProfile;
      }

      try {
        return JSON.parse(saved);
      } catch {
        return initialProfile;
      }
    });

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    localStorage.setItem(
      "banking_profile",
      JSON.stringify(profile)
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

    setSaved(false);
  }

  function handleSave() {
  localStorage.setItem(
    "banking_profile",
    JSON.stringify(profile)
  );

  window.dispatchEvent(
    new Event("profileUpdated")
  );

  setSaved(true);
}

  function handleReset() {
    setProfile(initialProfile);

    localStorage.removeItem(
      "banking_profile"
    );

    setSaved(false);
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">
          Personal Information
        </p>

        <h1>
          Profile
        </h1>

        <p className="subtitle">
          Manage your personal information.
        </p>
      </section>

      <section className="profile-panel">
        <div className="section-header">
          <div>
            <h2>
              Personal Details
            </h2>

            <p>
              Update the information associated
              with your profile.
            </p>
          </div>
        </div>

        <div className="profile-form">
          <div className="profile-form-grid">
            <div className="form-group">
              <label htmlFor="first-name">
                First Name
              </label>

              <input
                id="first-name"
                type="text"
                value={profile.firstName}
                onChange={(event) =>
                  updateField(
                    "firstName",
                    event.target.value
                  )
                }
                placeholder="First name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="last-name">
                Last Name
              </label>

              <input
                id="last-name"
                type="text"
                value={profile.lastName}
                onChange={(event) =>
                  updateField(
                    "lastName",
                    event.target.value
                  )
                }
                placeholder="Last name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-email">
                Email
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
                placeholder="Email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-phone">
                Phone
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
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="profile-address">
              Address
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
            />
          </div>

          <div className="profile-form-grid">
            <div className="form-group">
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
              />
            </div>

            <div className="form-group">
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-postal">
                Postal Code
              </label>

              <input
                id="profile-postal"
                type="text"
                value={profile.postalCode}
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

          {saved && (
            <div className="form-success">
              Profile information saved.
            </div>
          )}

          <div className="profile-actions">
            <button
              type="button"
              className="primary-button"
              onClick={handleSave}
            >
              Save Changes
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;