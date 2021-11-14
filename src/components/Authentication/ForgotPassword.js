import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import useInput from "../../hooks/use-input";
import Input from "../UI/Input";

import "./ForgetPassword.css";

export default function ForgotPassword() {
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));
  console.log(enteredEmail);
  console.log(emailInputHasError);

  const { resetPassword } = useAuth();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);

  let formIsValid = false;

  if (enteredEmailIsValid) formIsValid = true;

  const inputClass = "forget-password-form-input";
  const invalidClass = "invalid";

  const emailInputClass = emailInputHasError
    ? `${inputClass} ${invalidClass}`
    : inputClass;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage(false);
      setError(false);
      await resetPassword(enteredEmail);
      setMessage(true);
    } catch {
      setError(true);
    }
  }

  document.title = "Forgot Password";

  return (
    <main className="main-forget-password">
      {error && (
        <div className="forget-password-error">
          We don't recongnize this email address. Are you sure it's correct?
        </div>
      )}
      {message && (
        <div className="forget-password-message">
          Password reset link has been sent to your email.
        </div>
      )}
      <section className="forget-password-form-section">
        <form className="forget-password-form" onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
          <Input
            className={emailInputClass}
            label="E-mail address"
            value={enteredEmail}
            inputAttributes={{ id: "email", type: "email" }}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          <button>Submit</button>
          <div className="login-link">
            <a href="/login">Login</a>
          </div>
        </form>
      </section>
    </main>
  );
}
