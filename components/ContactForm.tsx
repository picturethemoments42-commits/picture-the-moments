"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Send } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm({ eventTypes }: { eventTypes: string[] }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [notice, setNotice] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus("error");
        setNotice(
          data?.error ??
            "Something went wrong sending your enquiry. Please try again, or email us directly."
        );
        return;
      }

      form.reset();
      setStatus("success");
      setNotice("Thank you — your enquiry has been sent. We'll be in touch shortly.");
    } catch {
      setStatus("error");
      setNotice(
        "A network error occurred. Please check your connection and try again, or email us directly."
      );
    }
  }

  return (
    <form
      className="space-y-8 md:col-span-6 md:col-start-7"
      onSubmit={handleSubmit}
    >
      {/* Honeypot field: hidden from humans, fills nothing for real visitors. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">
        Your Name *
        <input
          className="field mt-2"
          name="name"
          autoComplete="name"
          required
          maxLength={120}
        />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">
        Email *
        <input
          className="field mt-2"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">
        Event Type
        <select className="field mt-2" name="eventType" defaultValue="">
          <option value="" disabled>
            Select a story type
          </option>
          {eventTypes.map((eventType) => (
            <option key={eventType} value={eventType}>
              {eventType}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">
        Date and Location
        <input className="field mt-2" name="dateLocation" maxLength={200} />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">
        Tell Us More
        <textarea
          className="field mt-2 min-h-36 resize-y"
          name="message"
          maxLength={5000}
        />
      </label>

      <div>
        <button
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Enquiry"}
          <Send size={15} />
        </button>

        {notice && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 text-sm leading-6 ${
              status === "error" ? "text-red-400" : "text-gold"
            }`}
          >
            {notice}
          </p>
        )}
      </div>
    </form>
  );
}