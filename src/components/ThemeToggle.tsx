"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// Matches the dark-first default rendered on the server, before the
// no-flash script (layout.tsx) and this hook can read the real value.
function getServerSnapshot(): Theme {
  return "dark";
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("theme", theme);
  listeners.forEach((listener) => listener());
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function handleToggle() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-edge text-ink transition-colors hover:bg-surface-card"
    >
      {theme === "light" ? (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M16.5 11.4A7 7 0 0 1 8.6 3.5a7 7 0 1 0 7.9 7.9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10 1.5v2M10 16.5v2M3.5 10h-2M18.5 10h-2M5.1 5.1 3.7 3.7M16.3 16.3l-1.4-1.4M14.9 5.1l1.4-1.4M3.7 16.3l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
