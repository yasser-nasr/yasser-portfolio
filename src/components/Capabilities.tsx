import HeadingReveal from "@/components/HeadingReveal";
import CapabilitiesList from "@/components/CapabilitiesList";

export default function Capabilities() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <HeadingReveal as="h2" className="text-3xl font-semibold text-ink md:text-4xl">
          Capabilities
        </HeadingReveal>
        <CapabilitiesList className="mt-12" />
      </div>
    </section>
  );
}
