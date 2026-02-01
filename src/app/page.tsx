import {
  Hero,
  Services,
  Process,
  Projects,
  Team,
  Testimonials,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      {/* Hero - Main intro and hook */}
      <Hero />

      {/* Services - What we do (detailed) */}
      <Services />

      {/* Process - How we work */}
      <Process />

      {/* Projects - Our work with CardSwap animation */}
      <Projects />

      {/* Team - Who we are (includes Globe - heavy 3D component) */}
      <Team />

      {/* Testimonials - Social proof */}
      <Testimonials />

      {/* Contact - Get in touch */}
      <Contact />
    </>
  );
}
