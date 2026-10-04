import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!username.trim() || !passcode.trim()) {
      setError(
        "Enter a username and passcode."
      );
      return;
    }

    /*
      Local application authentication only.
      No credentials are sent to a server.
    */
    sessionStorage.setItem(
      "banking_authenticated",
      "true"
    );

    onLogin();
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          CapitalOne
        </div>

        <h1>Sign in</h1>

        <p className="login-subtitle">
          Access your account dashboard.
        </p>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value
                )
              }
              autoComplete="off"
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="passcode">
              Passcode
            </label>

            <input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(event) =>
                setPasscode(
                  event.target.value
                )
              }
              autoComplete="off"
              placeholder="Enter passcode"
            />
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button login-button"
          >
            Sign In
          </button>
        </form>

        <p className="login-footer">
          Local application sign-in
        </p>
      </section>
    </main>
  );
}

export default Login;