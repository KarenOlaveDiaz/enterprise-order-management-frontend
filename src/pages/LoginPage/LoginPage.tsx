import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';

export function LoginPage() {
  const {
    isAuthenticated,
    login,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null,
  );

  if (isAuthenticated) {
    return <Navigate to="/orders" replace />;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await login({
        email: email.trim(),
        password,
      });
    } catch {
      setErrorMessage(
        'Unable to sign in with the provided credentials.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-page">
     

      <div className="login-panel">
        <div className="auth-card auth-card--login">
          <header className="login-heading">
            <span className="eyebrow">
              Secure access
            </span>

            <h2>Welcome back</h2>

            <p>
              Sign in to access the OrderFlow management platform.
            </p>
          </header>

          <form
            className="auth-form"
            onSubmit={(event) => {
              void handleSubmit(event);
            }}
          >
            <label>
              Email address

              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </label>

            <label>
              Password

              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                  onClick={() => {
                    setShowPassword((current) => !current);
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            {errorMessage && (
              <p className="form-error" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Signing in...'
                : 'Sign in'}
            </button>
          </form>

          <div className="login-security-note">
            <span className="system-status-dot" />
            Protected authentication
          </div>

          <button
            type="button"
            className="demo-login-button"
            onClick={() => {
              setEmail('demo@orderflow.dev');
              setPassword('Demo123!');
            }}
          >
            Use demo account
          </button>

          <p className="demo-login-note">
            Portfolio reviewers can use the demo account to explore OrderFlow.
          </p>
        </div>
      </div>
    </section>
  );
}