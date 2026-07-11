import { motion } from "motion/react";
import { BRAND_VALUES } from "../data";
import { Award } from "lucide-react";

export default function About() {
  // Editorial Portrait of Founder / Principal Architect
  const founderImg = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85";

  return (
    <section id="about" className="py-24 md:py-32 bg-brand-beige-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Double-page Magazine Spread Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* LEFT "PAGE": Editorial story, timeline & philosophy (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
            
            {/* Title block */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-brand-beige-300 uppercase block mb-3">
                04 — STUDIO PHILOSOPHY
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal tracking-tight leading-tight">
                Our Pursuit of the <br />
                <span className="italic font-normal">Superfluous-Free Haven</span>
              </h2>
            </div>

            {/* Editorial blockquote */}
            <div className="relative border-l-2 border-brand-beige-300 pl-8 my-6">
              <p className="font-serif text-xl md:text-2xl text-brand-charcoal italic leading-relaxed font-light">
                "Eliminating noise is a radical act of architecture. We don't build features to occupy sight; we slice voids to capture sunlight."
              </p>
              <span className="block font-mono text-[9px] tracking-[0.15em] text-brand-charcoal/40 uppercase mt-3">
                — SOPHIA SEN, PRINCIPAL DESIGNER
              </span>
            </div>

            {/* In-depth background narrative */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-light">
              <p>
                Founded in Mumbai and anchored across New Delhi, Bengaluru, and Goa, Atelier Spaces is a specialized architectural and interior advisory for private collectors and luxury real estate builders. Our core framework is subtraction—uncovering native geometries and preserving the acoustic flow of raw spaces.
              </p>
              <p>
                We do not purchase catalog templates or duplicate prior designs. Every corner, fireplace hearth, and timber partition we structure is designed as a singular heirloom piece meant to age gracefully alongside the light-changes of the passing seasons.
              </p>
            </div>

            {/* Brand Values List */}
            <div className="border-t border-brand-charcoal/10 pt-10 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {BRAND_VALUES.map((value, idx) => (
                <div key={idx} className="flex flex-col space-y-2">
                  <span className="font-mono text-[9px] tracking-widest text-brand-beige-300 uppercase">
                    Value 0{idx + 1}
                  </span>
                  <h4 className="font-serif text-base text-brand-charcoal font-medium">
                    {value.title}
                  </h4>
                  <p className="font-sans text-[11px] text-brand-charcoal/50 leading-relaxed font-light">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT "PAGE": Master Director Photo Frame (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="bg-brand-beige-50 p-8 shadow-sm border border-brand-beige-200/50 flex flex-col h-full justify-between">
              
              {/* Founder Image */}
              <div className="w-full h-[400px] overflow-hidden bg-brand-beige-100 relative shadow-inner mb-6">
                <img
                  src={founderImg}
                  alt="Sophia Sen Architect"
                  className="w-full h-full object-cover grayscale brightness-95 rounded-sm transition-all duration-700 hover:grayscale-0 hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-brand-charcoal px-3 py-1 text-[8px] font-mono tracking-[0.25em] text-white uppercase">
                  studio headshot
                </div>
              </div>

              {/* Founder Credentials details */}
              <div className="pt-4 border-t border-brand-charcoal/10 flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-xl font-normal text-brand-charcoal">
                    Sophia Sen
                  </h3>
                  <p className="font-mono text-[9px] tracking-widest text-brand-charcoal/40 uppercase mt-1">
                    Architectural Director, M.Arch (CEPT Ahmedabad & Milan)
                  </p>
                </div>
                
                {/* Italian Crafts seal logo mock */}
                <div className="text-right flex items-center space-x-1 font-mono text-[8px] tracking-widest text-brand-beige-300 uppercase mt-1">
                  <Award size={11} />
                  <span>AD100 ARCHITECT 2025</span>
                </div>
              </div>

              {/* Small credentials signature note */}
              <p className="font-serif text-xs italic text-brand-charcoal/50 mt-4 leading-normal">
                "We partner only with premium natural stone artisans in Rajasthan, brass master gilds in Moradabad, and multi-generational woodwork workshops in Kerala to certify absolute material authenticity."
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
