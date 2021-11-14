import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import useInput from "../../hooks/use-input";
import Input from "../UI/Input";

import "./Login.css";

export default function Login() {
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    // reset: resetPasswordInput,
  } = useInput((value) => value.length >= 6);

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) formIsValid = true;

  const inputClass = "login-form-input";
  const invalidClass = "invalid";

  const emailInputClass = emailInputHasError
    ? `${inputClass} ${invalidClass}`
    : inputClass;
  const passwordInputClass = passwordInputHasError
    ? `${inputClass} ${invalidClass}`
    : inputClass;

  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    if (formIsValid) {
      try {
        setError(false);
        setLoading(true);
        await login(enteredEmail, enteredPassword);
        history.push("/");
      } catch {
        setError(true);
      }
    } else setError(true);

    setLoading(false);
  }

  document.title = "Student Login";

  return (
    <main className="main-login">
      {error && (
        <div className="login-error">
          Oops! Wrong credentials, please try again or contact admin.
        </div>
      )}
      <section className="login-title">
        <h1>Indian Institute of Information Technology</h1>
      </section>
      <section className="login-form-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Hostel Management</h1>
          <Input
            className={emailInputClass}
            label="E-mail address"
            // error={emailInputHasError && <p>Email is not valid</p>}
            value={enteredEmail}
            inputAttributes={{ id: "email", type: "email" }}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          <Input
            className={passwordInputClass}
            label="Password"
            // error={passwordInputHasError && "Password atleast have 8 characters"}
            value={enteredPassword}
            inputAttributes={{ id: "password", type: "password" }}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          <button>Sign In</button>
          <div className="login-helper">
            <a href="/forgot-password">Forgot Password</a>
          </div>
        </form>
      </section>
    </main>
  );
}
