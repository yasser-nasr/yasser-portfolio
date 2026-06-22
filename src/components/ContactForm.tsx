"use client";

import { forwardRef, useRef, useState } from "react";
import DropdownField from "@/components/DropdownField";
import { countryCodes, type CountryCode } from "@/data/countryCodes";

const OPPORTUNITY_OPTIONS = ["Full-time role", "Freelance project", "Collaboration", "Other"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_COUNTRY_ISO2 = "EG";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [opportunity, setOpportunity] = useState<string | null>(null);
  const [opportunityInvalid, setOpportunityInvalid] = useState(false);
  const opportunityButtonRef = useRef<HTMLButtonElement>(null);

  const [countryCode, setCountryCode] = useState<CountryCode>(
    () => countryCodes.find((c) => c.iso2 === DEFAULT_COUNTRY_ISO2) ?? countryCodes[0],
  );

  const [nameInvalid, setNameInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const company = data.get("company")?.toString().trim() ?? "";
    const whatsappNumber = data.get("whatsapp")?.toString().trim() ?? "";
    const message = data.get("message")?.toString().trim() ?? "";

    // Name, email, and phone are required. Message stays optional and never blocks submission.
    const isNameInvalid = !name;
    const isEmailInvalid = !email || !EMAIL_PATTERN.test(email);
    const isPhoneInvalid = !whatsappNumber;
    const isOpportunityInvalid = !opportunity;

    setNameInvalid(isNameInvalid);
    setEmailInvalid(isEmailInvalid);
    setPhoneInvalid(isPhoneInvalid);
    setOpportunityInvalid(isOpportunityInvalid);

    // Focus the first field that failed validation.
    if (isNameInvalid) return nameRef.current?.focus();
    if (isEmailInvalid) return emailRef.current?.focus();
    if (isPhoneInvalid) return phoneRef.current?.focus();
    if (isOpportunityInvalid) return opportunityButtonRef.current?.focus();

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: `${countryCode.dial} ${whatsappNumber}`,
          message,
          company,
          opportunityType: opportunity,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setStatusMessage("Thanks for reaching out — I'll get back to you soon.");
      form.reset();
      setOpportunity(null);
      setCountryCode(countryCodes.find((c) => c.iso2 === DEFAULT_COUNTRY_ISO2) ?? countryCodes[0]);
    } catch (err) {
      setStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
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

      {/* noValidate: validation/error messages are handled by our own state, not the browser's native popups */}
      <form onSubmit={handleSubmit} className="@container space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            ref={nameRef}
            label="Name"
            name="name"
            type="text"
            autoComplete="name"
            required
            invalid={nameInvalid}
            errorMessage="Please enter your name."
            onChange={() => setNameInvalid(false)}
          />
          <Field
            ref={emailRef}
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            invalid={emailInvalid}
            errorMessage="Please enter a valid email address."
            onChange={() => setEmailInvalid(false)}
          />
        </div>

        <Field label="Company" name="company" type="text" autoComplete="organization" />

        <div className="grid grid-cols-1 gap-2 @xs:grid-cols-[9rem_1fr] @xs:gap-3">
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
            searchable
            searchPlaceholder="Search country..."
          />
          <Field
            ref={phoneRef}
            label="WhatsApp number"
            name="whatsapp"
            type="tel"
            autoComplete="tel-national"
            required
            invalid={phoneInvalid}
            errorMessage="Please enter your WhatsApp number."
            onChange={() => setPhoneInvalid(false)}
          />
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
            disabled={status === "loading"}
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="mt-3 text-sm text-ink" role="status">
              {statusMessage}
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-ink" role="alert">
              {statusMessage}
            </p>
          )}
          {status === "idle" && (
            <p className="mt-3 text-xs text-ink-soft">
              I&rsquo;ll reply directly to the email address you provide.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  onChange?: () => void;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, name, type, autoComplete, required, invalid, errorMessage, onChange },
  ref,
) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-ink-soft">
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        onChange={onChange}
        className={`mt-2 w-full rounded-md border bg-surface-deep px-4 py-3 text-ink focus:border-ink/30 ${
          invalid ? "border-ink/50" : "border-edge"
        }`}
      />
      {invalid && errorMessage && <p className="mt-2 text-xs text-ink">{errorMessage}</p>}
    </div>
  );
});
