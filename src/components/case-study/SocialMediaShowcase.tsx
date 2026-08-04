"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const base = "/projects/renovofix/02-Social-Media";
const posts = [
  ["A-clear-process-from-start-to-finish.jpg", "A clear process, from the first inspection to the final handover."],
  ["Before-you-call-an-AC-technician.jpg", "Before you call an AC technician, start with these quick checks."],
  ["Don’t-like-waiting.jpg", "Don’t like waiting? Neither do we. Responsive maintenance when you need it."],
  ["The-problem-isn’t-maintenance.jpg", "The problem isn’t maintenance. It’s not knowing whether the job will be done right."],
  ["Tired-of-maintenance-issues.jpg", "Tired of maintenance issues? Reliable help is only a message away."],
  ["What-needs-fixing-at-your-place.jpg", "What needs fixing at your place? Tell us and we’ll take it from there."],
] as const;

const Heart = ({ filled = false }: { filled?: boolean }) => <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></svg>;
const Comment = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.8 9.8 0 0 1-3.8-.8L3 21l1.7-5A8.7 8.7 0 1 1 21 11.5Z" /></svg>;
const Send = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></svg>;

export default function SocialMediaShowcase() {
  const [active, setActive] = useState<(typeof posts)[number] | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!active) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [active]);

  const open = (post: (typeof posts)[number]) => { setLiked(false); setActive(post); };

  return <>
    <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-edge bg-surface-card/45 shadow-2xl shadow-black/10">
      <div className="flex items-center gap-4 border-b border-edge px-5 py-5 sm:px-8">
        <div className="rounded-full bg-gradient-to-tr from-[#14B7A5] via-[#4366B0] to-white p-[2px]"><div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-surface bg-white p-2"><Image src="/projects/renovofix/01-Logo/Logo_V.svg" alt="RenovoFix logo" fill sizes="56px" className="object-contain p-2" /></div></div>
        <div className="min-w-0 flex-1"><h3 className="text-base font-semibold text-ink sm:text-lg">renovofix.ae <span className="text-[#4366B0]">●</span></h3><p className="text-sm leading-6 text-ink-soft">Property maintenance · Dubai, UAE</p></div>
        <span className="hidden rounded-lg bg-[#4366B0] px-5 py-2 text-sm font-semibold text-white sm:inline-flex">Follow</span>
      </div>
      <div className="grid grid-cols-3 border-b border-edge py-4 text-center text-sm text-ink-soft">
        <p><strong className="block text-base text-ink">48</strong> posts</p><p><strong className="block text-base text-ink">2.4K</strong> followers</p><p><strong className="block text-base text-ink">186</strong> following</p>
      </div>
      <div className="grid grid-cols-2 gap-[2px] bg-edge sm:grid-cols-3">
        {posts.map((post) => <button key={post[0]} type="button" onClick={() => open(post)} aria-label={`Open post: ${post[1]}`} className="group relative aspect-square cursor-zoom-in overflow-hidden bg-surface focus-visible:z-10">
          <Image src={`${base}/${post[0]}`} alt={post[1]} fill sizes="(min-width: 768px) 24vw, 50vw" className="object-cover transition duration-300 group-hover:scale-[1.03] group-hover:brightness-75" />
          <span className="absolute inset-0 grid place-items-center bg-black/0 text-sm font-semibold text-white opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">View post</span>
        </button>)}
      </div>
      <p className="px-5 py-4 text-center text-sm text-ink-soft">Select any post to explore the visual.</p>
    </div>

    {active && createPortal(<div role="dialog" aria-modal="true" aria-label="RenovoFix social media post" className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && setActive(null)}>
      <div className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-surface shadow-2xl md:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)]">
        <button type="button" onClick={() => setActive(null)} aria-label="Close post" className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/65 text-2xl text-white hover:bg-black/85">×</button>
        <div className="relative min-h-[55vh] bg-black md:min-h-[82vh]"><Image src={`${base}/${active[0]}`} alt={active[1]} fill sizes="(min-width: 768px) 65vw, 100vw" priority className="object-contain" /></div>
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center gap-3 border-b border-edge p-4"><div className="relative h-10 w-10 overflow-hidden rounded-full border border-edge bg-white"><Image src="/projects/renovofix/01-Logo/Logo_V.svg" alt="RenovoFix logo" fill sizes="40px" className="object-contain p-1.5" /></div><div><p className="text-sm font-semibold text-ink">renovofix.ae <span className="text-[#4366B0]">●</span></p><p className="text-xs text-ink-soft">Dubai, United Arab Emirates</p></div></div>
          <div className="flex-1 p-4"><p className="text-sm leading-6 text-ink-soft"><strong className="mr-2 text-ink">renovofix.ae</strong>{active[1]}</p></div>
          <div className="border-t border-edge p-4"><div className="flex items-center gap-4 text-ink"><button type="button" onClick={() => setLiked(!liked)} aria-label={liked ? "Unlike post" : "Like post"} aria-pressed={liked} className={liked ? "text-red-500" : "hover:text-ink-soft"}><Heart filled={liked} /></button><span aria-label="Comment"><Comment /></span><span aria-label="Share"><Send /></span></div><p className="mt-3 text-sm font-semibold text-ink">{liked ? "1,249" : "1,248"} likes</p><p className="mt-1 text-[11px] uppercase tracking-wide text-ink-faint">View the visual system</p></div>
        </div>
      </div>
    </div>, document.body)}
  </>;
}
