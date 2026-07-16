import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavClick, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Overview", id: "overview" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Before & After", id: "transformation" },
    { label: "Services", id: "services" },
    { label: "Philosophy", id: "about" },
    { label: "Testimonials", id: "testimonials" },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        id="main-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-brand-beige-50/90 backdrop-blur-md border-b border-brand-beige-100/40 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Brand / Editorial Identity */}
          <div className="flex flex-col">
            <button
              onClick={() => handleItemClick("hero")}
              id="navbar-logo-btn"
              className="font-serif text-lg md:text-xl tracking-[0.25em] text-brand-charcoal uppercase text-left group transition-colors duration-300"
            >
              Atelier <span className="font-light">Spaces</span>
              <span className="block h-[1px] w-0 bg-brand-charcoal transition-all duration-300 group-hover:w-full"></span>
            </button>
            <span className="hidden md:block font-mono text-[9px] tracking-[0.15em] text-brand-charcoal/50 uppercase mt-1">
              Architecture & Interiors
            </span>
          </div>

          {/* Locations metadata indicator - AD signature */}
          <div className="hidden lg:flex items-center space-x-4 font-mono text-[9.5px] mt-1 tracking-[0.2em] text-brand-charcoal/40 uppercase">
            <span>Mumbai</span>
            <span className="text-brand-beige-300">•</span>
            <span>New Delhi</span>
            <span className="text-brand-beige-300">•</span>
            <span>Bengaluru</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <ul className="flex items-center space-x-8 lg:space-x-10 font-sans text-xs tracking-widest text-brand-charcoal/80 uppercase">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    id={`nav-item-${item.id}`}
                    className={`relative py-1 cursor-pointer transition-colors duration-300 hover:text-brand-charcoal ${
                      activeSection === item.id ? "text-brand-charcoal font-medium" : "text-brand-charcoal/60"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-charcoal"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Premium CTA */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleItemClick("consultation")}
                id="nav-cta-btn"
                className="flex items-center space-x-1 font-sans text-[11px] font-medium tracking-[0.2em] text-white bg-brand-charcoal hover:bg-brand-charcoal-light uppercase px-5 py-2.5 transition-all duration-300 shadow-sm"
              >
                <span>Consultation</span>
                <ArrowUpRight size={12} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              className="text-brand-charcoal p-1 cursor-pointer"
            >
              {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            id="mobile-nav-panel"
            className="fixed inset-x-0 top-0 bg-brand-beige-50 z-40 border-b border-brand-beige-100 pt-24 pb-8 px-6 flex flex-col space-y-6 md:hidden shadow-lg"
          >
            <ul className="flex flex-col space-y-4 font-sans text-sm tracking-widest text-brand-charcoal/80 uppercase">
              {navItems.map((item) => (
                <li key={item.id} className="border-b border-brand-beige-100/60 pb-2">
                  <button
                    onClick={() => handleItemClick(item.id)}
                    id={`mobile-nav-item-${item.id}`}
                    className="w-full text-left py-2 font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col space-y-4 pt-4 border-t border-brand-beige-100/60">
              <button
                onClick={() => handleItemClick("consultation")}
                id="mobile-nav-cta"
                className="w-full text-center font-sans text-xs tracking-[0.15em] text-white bg-brand-charcoal py-3 uppercase font-medium"
              >
                Book Consultation
              </button>
              
              <div className="flex justify-between font-mono text-[9px] tracking-[0.2em] text-brand-charcoal/40 uppercase px-1">
                <span>Mumbai</span>
                <span>New Delhi</span>
                <span>Bengaluru</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
