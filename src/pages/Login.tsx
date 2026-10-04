import { useState } from "react";

interface LoginProps {
  onLogin: (name: string) => void;
}
function Login({ onLogin }: LoginProps) {
  const [mode, setMode] = useState<
    "login" | "signup"
  >("login");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (mode === "signup") {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }

      if (password.length < 6) {
        setError(
          "Password must be at least 6 characters."
        );
        return;
      }

      if (password !== confirmPassword) {
        setError(
          "Passwords do not match."
        );
        return;
      }

      localStorage.setItem(
        "gfb_user_name",
        name.trim()
      );

      localStorage.setItem(
        "gfb_user_email",
        email.trim()
      );

      localStorage.setItem(
        "gfb_user_password",
        password
      );

      onLogin(name.trim());

      return;
    }

    const savedEmail =
      localStorage.getItem(
        "gfb_user_email"
      );

    const savedPassword =
      localStorage.getItem(
        "gfb_user_password"
      );

    const savedName =
      localStorage.getItem(
        "gfb_user_name"
      );

    if (
      savedEmail &&
      savedPassword
    ) {
      if (
        email.trim() !== savedEmail ||
        password !== savedPassword
      ) {
        setError(
          "Incorrect email or password."
        );

        return;
      }

      onLogin(
        savedName || "Customer"
      );

      return;
    }

    setError(
      "No account found. Please create an account first."
    );
  }

  return (
    <main className="login-page">

      <div className="login-background-glow"></div>

      <section className="login-card">

        <div className="login-brand">

          <div className="login-logo">
            GFB
          </div>

          <div>
            <strong>
              Guardian Federal Bank
            </strong>

            <span>
              Online Banking
            </span>
          </div>

        </div>


        <div className="login-heading">

          <p className="eyebrow">
            {mode === "login"
              ? "Welcome back"
              : "Get started"}
          </p>

          <h1>
            {mode === "login"
              ? "Sign in to your account"
              : "Create your GFB account"}
          </h1>

          <p>
            {mode === "login"
              ? "Access your accounts securely."
              : "Create your online banking profile."}
          </p>

        </div>


        {error && (
          <div className="login-error">
            {error}
          </div>
        )}


        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {mode === "signup" && (
            <label>

              <span>
                Full Name
              </span>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
                placeholder="Your full name"
                autoComplete="name"
              />

            </label>
          )}


          <label>

            <span>
              Email Address
            </span>

            <input
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

          </label>


          <label>

            <span>
              Password
            </span>

            <input
              type="password"
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

          </label>


          {mode === "signup" && (
            <label>

              <span>
                Confirm Password
              </span>

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                placeholder="Confirm your password"
                autoComplete="new-password"
              />

            </label>
          )}


          <button
            type="submit"
            className="login-submit"
          >
            {mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>

        </form>


        <div className="login-divider">
          <span></span>
          <small>
            OR
          </small>
          <span></span>
        </div>


        <button
          type="button"
          className="login-switch"
          onClick={() => {
            setMode(
              mode === "login"
                ? "signup"
                : "login"
            );

            setError("");
          }}
        >
          {mode === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>


        <div className="login-security">

          <span>
            ✓
          </span>

          <p>
            Your connection is protected by
            GFB security controls.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Login;