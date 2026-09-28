"use client";

import { useState, type FormEvent } from "react";
import { email } from "@/content/site";

const FIELD =
  "mt-1 w-full rounded border border-grid bg-paper px-3 py-2 font-sans text-base text-ink";

// The site is static with no backend, so submitting opens the visitor's mail app with
// the message pre-filled and addressed to me.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = String(f.get("subject") || `Message from ${f.get("name")}`);
    const body = `${f.get("message")}\n\n${f.get("name")}\n${f.get("email")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-measure flex-col gap-5 font-sans">
      <label className="block">
        Your name
        <input name="name" required autoComplete="name" className={FIELD} />
      </label>
      <label className="block">
        Your email
        <input name="email" type="email" required autoComplete="email" className={FIELD} />
      </label>
      <label className="block">
        Subject
        <input name="subject" className={FIELD} />
      </label>
      <label className="block">
        Message
        <textarea name="message" required rows={7} className={FIELD} />
      </label>
      <div>
        <button
          type="submit"
          className="rounded bg-cohort-a px-5 py-2 font-medium text-paper hover:opacity-90"
        >
          Send email
        </button>
        <p role="status" className="mt-3 text-sm text-muted">
          {sent
            ? `Your email app should have opened. If not, write to ${email}.`
            : "This opens your email app with the message ready to send."}
        </p>
      </div>
    </form>
  );
}
