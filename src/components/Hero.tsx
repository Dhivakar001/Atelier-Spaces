import { motion } from "motion/react";
import { ArrowDown, CornerDownRight } from "lucide-react";

interface HeroProps {
  onCtaClick: (sectionId: string) => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  // Let's use a breathtakingly premium neutral-toned, floor-to-ceiling glass modernist home shot
  const heroImage = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90";

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center bg-brand-dark overflow-hidden">
      
      {/* Background image container with subtle Ken Burns zoom effect */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        {/* Soft, rich editorial overlay to secure high-contrast typography readable on dark elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-brand-dark/30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 md:pt-32 pb-16 flex flex-col justify-between min-h-[85vh]">
        
        {/* Architectural notation flag - AD signature */}
        <div className="flex items-center space-x-3 text-brand-beige-200/60 font-mono text-[10px] tracking-[0.25em] uppercase">
          <CornerDownRight size={14} className="stroke-brand-beige-300" />
          <span>Volumetric Purity — Collector Portfolio</span>
        </div>

        {/* Master Headline */}
        <div className="my-auto max-w-4xl pt-16">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light text-5xl md:text-7xl lg:text-8xl text-brand-beige-50 tracking-tight leading-[1.05]"
          >
            Spaces designed to <span className="italic font-normal text-brand-beige-200">whisper</span> rather than shout.
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 font-sans text-brand-beige-100 font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl"
          >
            Atelier Spaces crafts quiet architectural sanctuaries for luxury residential and commercial estates. True grandeur lies not in added ornamentation, but in absolute material truth.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            {/* Primary Action Button */}
            <button
              onClick={() => onCtaClick("consultation")}
              id="hero-book-cta"
              className="px-8 py-4 bg-brand-beige-100 text-brand-charcoal text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 shadow-md flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Book Appointment</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>

            {/* Secondary Action */}
            <button
              onClick={() => onCtaClick("portfolio")}
              id="hero-explore-cta"
              className="px-8 py-4 bg-transparent border border-white/20 text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>View Editorial Collection</span>
            </button>
          </motion.div>
        </div>

        {/* Footer info showing current curation season */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-t border-white/10 pt-8 mt-12 w-full text-white/50 font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase">
          <div className="flex space-x-12 mb-4 md:mb-0">
            <div>
              <span className="block text-brand-beige-300">CURATORSHIP</span>
              <span className="block text-white">AUTUMN - WINTER 2026</span>
            </div>
            <div>
              <span className="block text-brand-beige-300">FOCUS</span>
              <span className="block text-white">RAW TRAVERTINE & CHARCOAL ARCHITECTURE</span>
            </div>
          </div>
          
          <button
            onClick={() => onCtaClick("portfolio")}
            id="scroll-to-portfolio"
            className="flex items-center space-x-2 hover:text-white transition-all text-left duration-300"
          >
            <span>DISCOVER WORKS</span>
            <ArrowDown size={12} className="animate-bounce" />
          </button>
        </div>

      </div>

    </section>
  );
}
