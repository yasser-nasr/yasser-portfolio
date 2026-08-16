"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { industryGroups, markets } from "@/data/markets";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const chip: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const group: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const marketFlagCodes: Partial<Record<(typeof markets)[number], "EG" | "AE" | "SA">> = {
  Egypt: "EG",
  UAE: "AE",
  "Saudi Arabia": "SA",
};

function MarketFlag({ code }: { code: "EG" | "AE" | "SA" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 20"
      className="h-5 w-8 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/15"
    >
      {code === "EG" && (
        <>
          <path fill="#ce1126" d="M0 0h32v6.67H0z" />
          <path fill="#fff" d="M0 6.67h32v6.66H0z" />
          <path fill="#000" d="M0 13.33h32V20H0z" />
          <path
            fill="#c7a008"
            d="M16 7.2c-.65 0-1.18.4-1.35.97l-.92-.4.28 1.08-.72.73 1.17.12v2.14l1.54.95 1.54-.95V9.7l1.17-.12-.72-.73.28-1.08-.92.4A1.4 1.4 0 0 0 16 7.2Z"
          />
        </>
      )}
      {code === "AE" && (
        <>
          <path fill="#ff0000" d="M0 0h8v20H0z" />
          <path fill="#00732f" d="M8 0h24v6.67H8z" />
          <path fill="#fff" d="M8 6.67h24v6.66H8z" />
          <path fill="#000" d="M8 13.33h24V20H8z" />
        </>
      )}
      {code === "SA" && (
        <>
          <path fill="#006c35" d="M0 0h32v20H0z" />
          <g fill="#fff">
            <path d="M9 6.1h14v.85H9zm1.2 1.55h11.6v.75H10.2zm1.35 1.45h8.9v.7h-8.9z" />
            <path d="M8.3 12.45h14.9v.72H8.3zm13.8-.55h1.6l-1.05.9z" />
          </g>
        </>
      )}
    </svg>
  );
}

export default function MarketsIndustries() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-surface-card opacity-30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
          Exposure / 05
        </p>

        <HeadingReveal
          as="h2"
          className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
        >
          Markets &amp; Industries
        </HeadingReveal>

        <Reveal>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Experience shaped by working across different markets, business
            environments, audiences, and communication needs.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-display text-base uppercase tracking-[0.2em] text-ink-soft md:text-lg">
              Markets
            </p>

            <Reveal
              variants={container}
              className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-edge sm:grid-cols-4"
            >
              {markets.map((market, index) => {
                const isSecondColumn = index % 2 === 1;
                const isSecondRow = index >= 2;
                const flagCode = marketFlagCodes[market];

                return (
                  <motion.div
                    key={market}
                    variants={chip}
                    className={`px-4 py-6 text-center transition-colors duration-300 hover:bg-surface-card/45 ${
                      isSecondColumn ? "border-l" : ""
                    } ${isSecondRow ? "border-t sm:border-t-0 sm:border-l" : ""} border-edge bg-surface-card/20`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-5 items-center justify-center">
                        {flagCode && <MarketFlag code={flagCode} />}
                      </div>
                      <span className="font-display text-base uppercase tracking-wide text-ink md:text-lg">
                        {market}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </Reveal>
          </div>

          <div>
            <p className="font-display text-base uppercase tracking-[0.2em] text-ink-soft md:text-lg">
              Industries
            </p>

            <Reveal variants={container} className="mt-4 space-y-7 border-l border-edge pl-6">
              {industryGroups.map((industryGroup) => (
                <motion.div key={industryGroup.category} variants={group} className="group relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.65rem] top-2 h-1.5 w-1.5 rounded-sm bg-ink-soft/50 transition-transform duration-300 group-hover:scale-150"
                  />
                  <p className="font-display text-base uppercase tracking-[0.2em] text-ink-soft transition-colors duration-300 group-hover:text-ink md:text-lg">
                    {industryGroup.category}
                  </p>
                  <p className="mt-2 text-base text-ink md:text-lg">
                    {industryGroup.items.join(" · ")}
                  </p>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
