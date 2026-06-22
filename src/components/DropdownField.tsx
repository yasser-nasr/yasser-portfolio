"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  /** Shows a text input above the list so options can be filtered by typing. */
  searchable?: boolean;
  searchPlaceholder?: string;
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
  searchable = false,
  searchPlaceholder = "Search...",
}: DropdownFieldProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const internalButtonRef = useRef<HTMLButtonElement>(null);
  const buttonRef = externalButtonRef ?? internalButtonRef;
  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const typeaheadRef = useRef("");
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Options filtered by the typed query (case-insensitive, matches anywhere in the text).
  const visibleOptions = useMemo(() => {
    if (!searchable || !getSearchText || !query.trim()) return options;
    const needle = query.trim().toLowerCase();
    return options.filter((option) => getSearchText(option).toLowerCase().includes(needle));
  }, [options, searchable, getSearchText, query]);

  useEffect(() => {
    if (!open) return;
    if (searchable) {
      searchInputRef.current?.focus();
    } else {
      listRef.current?.focus();
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) closeDropdown();
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open, searchable]);

  useEffect(() => () => clearTimeout(typeaheadTimer.current ?? undefined), []);

  // Closes the dropdown and clears the search box, so it starts fresh next time it opens.
  function closeDropdown() {
    setOpen(false);
    setQuery("");
  }

  function commit(option: T) {
    onChange(option);
    closeDropdown();
    buttonRef.current?.focus();
  }

  function currentIndex(list: T[]) {
    if (!value) return 0;
    const key = getKey(value);
    const index = list.findIndex((option) => getKey(option) === key);
    return index === -1 ? 0 : index;
  }

  // Non-searchable dropdowns jump to the first option starting with the typed letters.
  function jumpToTypedChar(char: string) {
    if (!getSearchText) return;
    clearTimeout(typeaheadTimer.current ?? undefined);
    typeaheadRef.current += char.toLowerCase();
    const typed = typeaheadRef.current;
    typeaheadTimer.current = setTimeout(() => {
      typeaheadRef.current = "";
    }, 600);

    const match = options.findIndex((option) => getSearchText(option).toLowerCase().startsWith(typed));
    if (match !== -1) setActiveIndex(match);
  }

  function onButtonKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "Enter") {
      event.preventDefault();
      setActiveIndex(currentIndex(visibleOptions));
      setOpen(true);
    } else if (event.key.length === 1 && getSearchText && !searchable) {
      setOpen(true);
      jumpToTypedChar(event.key);
    }
  }

  // Arrow/Enter/Escape navigation shared by the search input and the plain list.
  function handleNavigationKey(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, visibleOptions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (visibleOptions[activeIndex]) commit(visibleOptions[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
      buttonRef.current?.focus();
    } else if (event.key === "Tab") {
      closeDropdown();
    }
  }

  function onListKeyDown(event: React.KeyboardEvent) {
    if (searchable) return; // the search input owns keyboard handling instead
    if (
      event.key.length === 1 &&
      getSearchText &&
      !["ArrowDown", "ArrowUp", "Enter", "Escape", "Tab"].includes(event.key)
    ) {
      jumpToTypedChar(event.key);
      return;
    }
    handleNavigationKey(event);
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
          if (open) {
            closeDropdown();
          } else {
            setActiveIndex(currentIndex(visibleOptions));
            setOpen(true);
          }
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
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-md border border-edge bg-surface-deep shadow-xl">
          {searchable && (
            <input
              ref={searchInputRef}
              type="text"
              role="searchbox"
              aria-label={`Search ${label.toLowerCase()}`}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleNavigationKey}
              placeholder={searchPlaceholder}
              className="w-full border-b border-edge bg-transparent px-4 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none"
            />
          )}
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            aria-label={label}
            onKeyDown={onListKeyDown}
            className={`overflow-y-auto focus:outline-none ${listClassName}`}
          >
            {visibleOptions.length === 0 ? (
              <li className="px-4 py-3 text-sm text-ink-soft">No matches found.</li>
            ) : (
              visibleOptions.map((option, index) => {
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
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
