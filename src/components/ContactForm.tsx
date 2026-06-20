"use client";

import { useRef, useState } from "react";
import DropdownField from "@/components/DropdownField";
import { countryCodes, type CountryCode } from "@/data/countryCodes";

const OPPORTUNITY_OPTIONS = ["Full-time role", "Freelance project", "Collaboration", "Other"];

export default function ContactForm() {
  const [opportunity, setOpportunity] = useState<string | null>(null);
  const [opportunityInvalid, setOpportunityInvalid] = useState(false);
  const opportunityButtonRef = useRef<HTMLButtonElement>(null);

  const [countryCode, setCountryCode] = useState<CountryCode>(
    () => countryCodes.find((c) => c.iso2 === "EG") ?? countryCodes[0],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!opportunity) {
      setOpportunityInvalid(true);
      opportunityButtonRef.current?.focus();
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const company = data.get("company")?.toString().trim() ?? "";
    const whatsappNumber = data.get("whatsapp")?.toString().trim() ?? "";
    const message = data.get("message")?.toString().trim() ?? "";

    const subject = `New message from ${name || "your website"}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `WhatsApp: ${countryCode.dial} ${whatsappNumber}`,
      `Opportunity type: ${opportunity}`,
      message ? "" : null,
      message || null,
    ].filter((line): line is string => line !== null);

    window.location.href = `mailto:yasser.nasr9999@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-surface-card/50 p-6 shadow-2xl backdrop-blur-md md:p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" type="text" autoComplete="name" required />
          <Field label="Email" name="email" type="email" autoComplete="email" required />
        </div>

        <Field label="Company" name="company" type="text" autoComplete="organization" />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[16rem_1fr] sm:gap-3">
          <DropdownField<CountryCode>
            id="whatsapp-code"
            label="Country"
            options={countryCodes}
            value={countryCode}
            onChange={setCountryCode}
            getKey={(c) => c.iso2}
            renderOption={(c) => `${c.flag} ${c.name} (${c.dial})`}
            renderValue={(c) => `${c.flag} ${c.dial}`}
            getSearchText={(c) => c.name}
            placeholder="Select a country"
            listClassName="max-h-64"
          />
          <Field label="WhatsApp number" name="whatsapp" type="tel" autoComplete="tel-national" required />
        </div>

        <DropdownField<string>
          id="opportunity"
          label="Opportunity type"
          options={OPPORTUNITY_OPTIONS}
          value={opportunity}
          onChange={(next) => {
            setOpportunity(next);
            setOpportunityInvalid(false);
          }}
          getKey={(option) => option}
          renderOption={(option) => option}
          getSearchText={(option) => option}
          placeholder="Select an option"
          invalid={opportunityInvalid}
          buttonRef={opportunityButtonRef}
        />
        {opportunityInvalid && <p className="text-xs text-ink">Please select an option.</p>}

        <div>
          <label htmlFor="message" className="block text-sm text-ink-soft">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell me about the role, project, or idea you have in mind."
            className="mt-2 w-full rounded-md border border-edge bg-surface-deep px-4 py-3 text-ink placeholder:text-ink-soft/70 focus:border-ink/30"
          />
        </div>

        <div>
          <button
            type="submit"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            Send Message
          </button>
          <p className="mt-3 text-xs text-ink-soft">
            Opens your email app with this message ready to send.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-ink-soft">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-md border border-edge bg-surface-deep px-4 py-3 text-ink focus:border-ink/30"
      />
    </div>
  );
}
