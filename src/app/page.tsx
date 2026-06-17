import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import SelectedWork from "@/components/SelectedWork";
import Positioning from "@/components/Positioning";
import Capabilities from "@/components/Capabilities";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <ProofStrip />
      <SelectedWork />
      <Positioning />
      <Capabilities />
    </main>
  );
}
