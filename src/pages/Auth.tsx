import { useState } from "react";
import type { FormEvent } from "react";

interface AuthProps {
  onLogin: () => void;
}

function Auth({ onLogin }: AuthProps) {
  const [mode, setMode] =
    useState<"login" | "signup">("login");

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  function switchMode() {
    setMode(
      mode === "login"
        ? "signup"
        : "login"
    );

    setError("");
    setPassword("");
    setConfirmPassword("");
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (mode === "signup") {
      if (!name.trim()) {
        setError(
          "Please enter your full name."
        );
        return;
      }

      if (!email.trim()) {
        setError(
          "Please enter your email address."
        );
        return;
      }

      if (!password.trim()) {
        setError(
          "Please create a password."
        );
        return;
      }

      if (password.length < 6) {
        setError(
          "Password must contain at least 6 characters."
        );
        return;
      }

      if (
        password !== confirmPassword
      ) {
        setError(
          "Passwords do not match."
        );
        return;
      }

      onLogin();
      return;
    }

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (!password.trim()) {
      setError(
        "Please enter your password."
      );
      return;
    }

    onLogin();
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
              : "Create your Guardian Federal Bank online banking profile."}
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
                  setName(
                    event.target.value
                  )
                }
                placeholder="Enter your full name"
                autoComplete="name"
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
                setEmail(
                  event.target.value
                )
              }
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">
              Password
            </label>

            <div className="auth-password-field">
              <input
                id="auth-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Enter your password"
                autoComplete={
                  mode === "login"
                    ? "current-password"
                    : "new-password"
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div className="form-group">
              <label htmlFor="auth-confirm-password">
                Confirm Password
              </label>

              <input
                id="auth-confirm-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
            </div>
          )}

          {mode === "login" && (
            <div className="auth-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                />

                <span>
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  setError(
                    "Password recovery is available in this demo."
                  )
                }
              >
                Forgot password?
              </button>
            </div>
          )}

          {error && (
            <div
              className="form-error"
              role="alert"
            >
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