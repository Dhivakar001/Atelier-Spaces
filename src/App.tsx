import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import Showcase from "./components/Showcase";
import BeforeAfter from "./components/BeforeAfter";
import Services from "./components/Services";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Consultation from "./components/Consultation";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [inquiryType, setInquiryType] = useState<string>("Residential Interiors");

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      // Offset logic for floating header
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  // Cross-section feedback callback when a project study triggers the form
  const handleInquireFromProject = (projectName: string) => {
    // Select appropriate program type based on project context
    if (projectName.toLowerCase().includes("monolith") || projectName.toLowerCase().includes("kyoto")) {
      setInquiryType("Luxury Villas");
    } else if (projectName.toLowerCase().includes("brera") || projectName.toLowerCase().includes("milano")) {
      setInquiryType("Commercial Spaces");
    } else if (projectName.toLowerCase().includes("marais")) {
      setInquiryType("Renovations");
    } else {
      setInquiryType("Residential Interiors");
    }

    // Scroll smoothly to form card
    handleScrollToSection("consultation");
  };

  // Setup intersection observer to track which portion of page is active
  useEffect(() => {
    const sections = ["hero", "overview", "portfolio", "transformation", "services", "about", "testimonials", "consultation"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // focus target area of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Avoid setting duplicate state values
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Premium reading-scrollbar visual overlay on top page edge - Apple aesthetics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-brand-beige-50 antialiased font-sans flex flex-col selection:bg-brand-beige-200">
      
      {/* Absolute top visual reading progress line */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-brand-beige-300 z-[60] origin-[0%]"
        style={{ scaleX }}
      />

      {/* Floating editorial navigation */}
      <Navbar onNavClick={handleScrollToSection} activeSection={activeSection} />

      {/* Structured core visual layout blocks */}
      <main className="flex-grow">
        
        {/* Fullscreen Hero */}
        <Hero onCtaClick={handleScrollToSection} />

        {/* Compelling Platform & Value Overview */}
        <Overview onActionClick={handleScrollToSection} />

        {/* Selected Portfolio Showcase (Masonry and detail drawers) */}
        <Showcase onBookInspiration={handleInquireFromProject} />

        {/* Interactive Before & After comparison slide controller */}
        <BeforeAfter />

        {/* Curation of structural services */}
        <Services />

        {/* About portrait & craftsmanship philosophy */}
        <About />

        {/* Testimonials stories */}
        <Testimonials />

        {/* Master Reservation Consultation form segment */}
        <div id="consultation-wrapper" className="border-t border-brand-charcoal/10">
          <Consultation initialProjectType={inquiryType} />
        </div>

      </main>

      {/* Multi-address global studio Footer */}
      <Footer />

    </div>
  );
}
