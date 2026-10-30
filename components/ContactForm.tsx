"use client";

import { useState, type FormEvent } from "react";
import { email, formspreeEndpoint } from "@/content/site";

const FIELD =
  "mt-1 w-full rounded border border-grid bg-paper px-3 py-2 font-sans text-base text-ink";

type Status = "idle" | "sending" | "sent" | "error";

// With a Formspree endpoint the message is posted there. Without one (the endpoint is
// still a TODO) submitting opens the visitor's mail app with the message pre-filled.
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);

    if (!formspreeEndpoint) {
      const subject = String(f.get("subject") || `Message from ${f.get("name")}`);
      const body = `${f.get("message")}

${f.get("name")}
${f.get("email")}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: f,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
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
          disabled={status === "sending"}
          className="rounded bg-cohort-a px-5 py-2 font-medium text-paper hover:opacity-90 disabled:opacity-60"
        >
          {formspreeEndpoint ? "Send message" : "Send email"}
        </button>
        <p role="status" className="mt-3 text-sm text-muted">
          {status === "sending" && "Sending…"}
          {status === "sent" &&
            (formspreeEndpoint
              ? "Thanks, your message was sent."
              : `Your email app should have opened. If not, write to ${email}.`)}
          {status === "error" && (
            <>
              Something went wrong sending your message. Please write to{" "}
              <a href={`mailto:${email}`}>{email}</a> instead.
            </>
          )}
          {status === "idle" &&
            (formspreeEndpoint
              ? ""
              : "TODO: Formspree endpoint. Until then this opens your email app with the message ready to send.")}
        </p>
      </div>
    </form>
  );
}
