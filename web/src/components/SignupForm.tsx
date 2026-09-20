"use client";

import { useState } from "react";
import { FALLBACK_EMAIL, FORM_ENDPOINT, signup } from "@/content/site";
import { Arrow } from "./Chrome";

type Status = { kind: "idle" | "ok" | "error" | "busy"; message: string };

const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  const invalid = status.kind === "error";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();

    if (!looksLikeEmail(value)) {
      setStatus({ kind: "error", message: signup.invalid });
      return;
    }

    // No provider wired up yet. Hand off to the visitor's mail client rather
    // than showing a success message for a signup that never happened.
    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(signup.mailSubject);
      const body = encodeURIComponent(`${signup.mailBody} ${value}`);
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
      setStatus({ kind: "ok", message: signup.mailOpened });
      return;
    }

    setStatus({ kind: "busy", message: signup.busy });
    try {
      const body = new FormData();
      body.append("email", value);
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setEmail("");
      setStatus({ kind: "ok", message: signup.success });
    } catch (error) {
      console.error("[signup]", error);
      setStatus({
        kind: "error",
        message: signup.error.replace("{email}", FALLBACK_EMAIL),
      });
    }
  }

  return (
    <>
      {/* Stacks on phones: side-by-side squeezed the input until the placeholder
          truncated mid-word. */}
      <form
        onSubmit={onSubmit}
        noValidate
        className="signup-form"
      >
        <label htmlFor="email" className="sr-only">
          {signup.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (invalid) setStatus({ kind: "idle", message: "" });
          }}
          placeholder={signup.placeholder}
          autoComplete="email"
          aria-invalid={invalid}
          aria-describedby="signup-status"
        />
        <button
          type="submit"
          disabled={status.kind === "busy"}
        >
          {signup.cta}<Arrow />
        </button>
      </form>
      {!FORM_ENDPOINT && <p className="signup-note">{signup.fallbackNote}</p>}

      <p
        id="signup-status"
        role="status"
        aria-live="polite"
        className={`signup-status ${invalid ? "is-error" : ""}`}
      >
        {status.message}
      </p>
    </>
  );
}
