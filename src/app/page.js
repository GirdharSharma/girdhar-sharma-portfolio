import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EducationSection from "@/components/sections/EducationSection";
import WorkSection from "@/components/sections/WorkSection";
import TechSection from "@/components/sections/TechSection";
import ContactSection from "@/components/sections/ContactSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <WorkSection />
      <TechSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
