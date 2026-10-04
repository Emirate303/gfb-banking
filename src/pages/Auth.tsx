import { useState } from "react";
import type { FormEvent } from "react";

interface AuthProps {
  onLogin: (name: string) => void;
}

function Auth({ onLogin }: AuthProps) {
  const [mode, setMode] =
    useState<"login" | "signup">("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (mode === "signup" && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    const customerName =
      mode === "signup"
        ? name.trim()
        : name.trim() || email.split("@")[0];

    onLogin(customerName);
  }

  function switchMode() {
    setMode(
      mode === "login"
        ? "signup"
        : "login"
    );

    setError("");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">
            GFB
          </div>

          <div>
            <strong>
              Guardian Federal Bank
            </strong>

            <span>
              Secure Online Banking
            </span>
          </div>
        </div>

        <div className="auth-heading">
          <p className="eyebrow">
            {mode === "login"
              ? "Welcome back"
              : "Get started"}
          </p>

          <h1>
            {mode === "login"
              ? "Sign in to your account"
              : "Create your account"}
          </h1>

          <p>
            {mode === "login"
              ? "Access your Guardian Federal Bank online banking."
              : "Create your fictional Guardian Federal Bank account."}
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          {mode === "signup" && (
            <div className="form-group">
              <label htmlFor="auth-name">
                Full Name
              </label>

              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">
              Email Address
            </label>

            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">
              Password
            </label>

            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button auth-submit"
          >
            {mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="auth-switch">
          <span>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>

          <button
            type="button"
            onClick={switchMode}
          >
            {mode === "login"
              ? "Sign Up"
              : "Sign In"}
          </button>
        </div>

        <div className="auth-security">
          <span className="security-dot" />

          <span>
            Secure fictional banking environment
          </span>
        </div>
      </section>
    </main>
  );
}

export default Auth;