import Hero from "@/components/landing/Hero";
import Highlights from "@/components/landing/Highlights";
import Capabilities from "@/components/landing/Capabilities";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <div className="relative text-white">
      <main>
        <Hero />
        <Highlights />
        <Capabilities />
        <Testimonials />
      </main>
    </div>
  );
}
