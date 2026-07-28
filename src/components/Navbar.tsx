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
            ? "bg-brand-beige-50/95 backdrop-blur-md border-b border-brand-beige-100/60 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Group: Logo Brand & Optional Location metadata */}
          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <button
                onClick={() => handleItemClick("hero")}
                id="navbar-logo-btn"
                className={`font-serif text-lg md:text-xl tracking-[0.25em] uppercase text-left group transition-colors duration-300 ${
                  isScrolled ? "text-brand-charcoal hover:text-black" : "text-white hover:text-brand-beige-100"
                }`}
              >
                Atelier <span className="font-light">Spaces</span>
                <span className={`block h-[1px] w-0 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-brand-charcoal" : "bg-brand-beige-100"
                }`}></span>
              </button>
              <span className={`hidden sm:block font-mono text-[9px] tracking-[0.15em] uppercase mt-0.5 transition-colors duration-300 ${
                isScrolled ? "text-brand-charcoal/60" : "text-brand-beige-200/80"
              }`}>
                Architecture & Interiors
              </span>
            </div>


          </div>

          {/* Right Group: Desktop Navigation Links & CTA */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-10 shrink-0">
            <ul className="flex items-center space-x-6 xl:space-x-8 font-sans text-xs tracking-widest uppercase">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    id={`nav-item-${item.id}`}
                    className={`relative py-1 cursor-pointer transition-colors duration-300 whitespace-nowrap ${
                      activeSection === item.id
                        ? isScrolled
                          ? "text-brand-charcoal font-semibold"
                          : "text-white font-semibold"
                        : isScrolled
                        ? "text-brand-charcoal/70 hover:text-brand-charcoal"
                        : "text-brand-beige-100/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className={`absolute bottom-0 left-0 w-full h-[1px] ${
                          isScrolled ? "bg-brand-charcoal" : "bg-brand-beige-100"
                        }`}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Premium Consultation CTA */}
            <div className="flex items-center">
              <button
                onClick={() => handleItemClick("consultation")}
                id="nav-cta-btn"
                className={`flex items-center space-x-1.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isScrolled
                    ? "text-white bg-brand-charcoal hover:bg-brand-charcoal-light shadow-sm"
                    : "text-brand-charcoal bg-brand-beige-50 hover:bg-white shadow-md font-semibold"
                }`}
              >
                <span>Consultation</span>
                <ArrowUpRight size={12} className="opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Menu Icon */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              className={`p-2 rounded-sm cursor-pointer transition-colors ${
                isScrolled ? "text-brand-charcoal hover:bg-brand-beige-100/50" : "text-white hover:bg-white/10"
              }`}
            >
              {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
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
            className="fixed inset-x-0 top-0 bg-brand-beige-50 z-40 border-b border-brand-beige-100 pt-24 pb-8 px-6 flex flex-col space-y-6 lg:hidden shadow-lg"
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
