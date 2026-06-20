"use client";

import { useEffect, useRef, useState } from "react";

type DropdownFieldProps<T> = {
  id: string;
  label: string;
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  getKey: (option: T) => string;
  renderOption: (option: T) => React.ReactNode;
  renderValue?: (option: T) => React.ReactNode;
  getSearchText?: (option: T) => string;
  placeholder: string;
  invalid?: boolean;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
  listClassName?: string;
};

export default function DropdownField<T>({
  id,
  label,
  options,
  value,
  onChange,
  getKey,
  renderOption,
  renderValue,
  getSearchText,
  placeholder,
  invalid,
  buttonRef: externalButtonRef,
  listClassName = "",
}: DropdownFieldProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const internalButtonRef = useRef<HTMLButtonElement>(null);
  const buttonRef = externalButtonRef ?? internalButtonRef;
  const listRef = useRef<HTMLUListElement>(null);
  const typeaheadRef = useRef("");
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => () => clearTimeout(typeaheadTimer.current ?? undefined), []);

  function commit(option: T) {
    onChange(option);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function currentIndex() {
    if (!value) return 0;
    const key = getKey(value);
    const index = options.findIndex((option) => getKey(option) === key);
    return index === -1 ? 0 : index;
  }

  function jumpToTypedChar(char: string) {
    if (!getSearchText) return;
    clearTimeout(typeaheadTimer.current ?? undefined);
    typeaheadRef.current += char.toLowerCase();
    const query = typeaheadRef.current;
    typeaheadTimer.current = setTimeout(() => {
      typeaheadRef.current = "";
    }, 600);

    const match = options.findIndex((option) => getSearchText(option).toLowerCase().startsWith(query));
    if (match !== -1) setActiveIndex(match);
  }

  function onButtonKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "Enter") {
      event.preventDefault();
      setActiveIndex(currentIndex());
      setOpen(true);
    } else if (event.key.length === 1 && getSearchText) {
      setOpen(true);
      jumpToTypedChar(event.key);
    }
  }

  function onListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      commit(options[activeIndex]);
    } else if (event.key === "Escape" || event.key === "Tab") {
      setOpen(false);
      if (event.key === "Escape") buttonRef.current?.focus();
    } else if (event.key.length === 1) {
      jumpToTypedChar(event.key);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor={id} className="block text-sm text-ink-soft">
        {label}
      </label>
      <button
        id={id}
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setActiveIndex(currentIndex());
          setOpen((o) => !o);
        }}
        onKeyDown={onButtonKeyDown}
        className={`mt-2 flex w-full items-center justify-between gap-2 rounded-md border bg-surface-deep px-4 py-3 text-left text-ink transition-colors focus:border-ink/30 ${
          invalid ? "border-ink/50" : "border-edge"
        }`}
      >
        <span className={`truncate ${value ? "text-ink" : "text-ink-soft"}`}>
          {value ? (renderValue ?? renderOption)(value) : placeholder}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-ink-soft transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          onKeyDown={onListKeyDown}
          className={`absolute z-20 mt-2 w-full overflow-y-auto rounded-md border border-edge bg-surface-deep shadow-xl focus:outline-none ${listClassName}`}
        >
          {options.map((option, index) => {
            const selected = value ? getKey(value) === getKey(option) : false;
            return (
              <li
                key={getKey(option)}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(option)}
                className={`cursor-pointer px-4 py-3 text-sm transition-colors aria-selected:bg-ink/15 aria-selected:text-ink ${
                  index === activeIndex ? "bg-ink/10 text-ink" : "text-ink-soft"
                }`}
              >
                {renderOption(option)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
