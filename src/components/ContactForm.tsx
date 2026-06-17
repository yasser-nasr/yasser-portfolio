"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-lg border border-dashed border-edge bg-surface-card p-6 text-ink-soft"
      >
        This form isn&rsquo;t connected to an email service yet. In the
        meantime, please reach out via LinkedIn or email once those details
        are published here.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm text-ink-soft">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className="mt-2 w-full rounded-md border border-edge bg-surface-deep px-4 py-3 text-ink placeholder:text-ink-faint"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-ink-soft">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="mt-2 w-full rounded-md border border-edge bg-surface-deep px-4 py-3 text-ink placeholder:text-ink-faint"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-ink-soft">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role, project, or idea you have in mind."
          className="mt-2 w-full rounded-md border border-edge bg-surface-deep px-4 py-3 text-ink placeholder:text-ink-faint"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
      >
        Send Message
      </button>
    </form>
  );
}
