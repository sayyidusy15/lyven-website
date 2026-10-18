"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdmin, type LoginState } from "../actions";
import styles from "./login.module.css";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button className={styles.submit} type="submit" disabled={pending}>
    {pending ? "Signing in…" : "Sign in to workspace"}
    <i className="bi bi-arrow-right" aria-hidden="true" />
  </button>;
}

export default function LoginForm({ configured }: { configured: boolean }) {
  const [state, action] = useActionState<LoginState, FormData>(loginAdmin, { error: "" });

  return <form action={action} className={styles.form}>
    <label htmlFor="admin-email">Email address</label>
    <input id="admin-email" name="email" type="email" autoComplete="username" inputMode="email" required maxLength={254} disabled={!configured} placeholder="you@lyven.com" />
    <label htmlFor="admin-password">Password</label>
    <input id="admin-password" name="password" type="password" autoComplete="current-password" required disabled={!configured} placeholder="Enter your password" />
    {state.error && <p className={styles.error} role="alert">{state.error}</p>}
    {!configured && <p className={styles.error} role="status">Admin access has not been configured on this server.</p>}
    {configured ? <SubmitButton /> : <button className={styles.submit} type="button" disabled>Sign in unavailable</button>}
  </form>;
}
