import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Hammer, LandPlot, Building2, Paintbrush, Armchair, Shuffle } from "lucide-react";

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  details: string[];
  vibe: string;
  image: string;
  icon: React.ComponentType<any>;
}

export default function Services() {
  const [activeId, setActiveId] = useState<string>("residential");

  const services: ServiceItem[] = [
    {
      id: "residential",
      num: "01",
      title: "Residential Interiors",
      description: "We map intimate human movements and customize the residential canvas around the owner's lifestyle. Every sofa configuration, fireplace height, and light switch location is calibrated.",
      details: ["Bespoke spatial mapping", "Soft furniture & textile sourcing", "Custom masonry drawings", "White-glove design delivery"],
      vibe: "Warm minimalist, bespoke linen layered with cold polished raw stone.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      icon: Paintbrush
    },
    {
      id: "commercial",
      num: "02",
      title: "Commercial Spaces",
      description: "Quiet spaces for flagship retail salons, art galleries, and executive boutique offices. We focus heavily on acoustics, high-end sensory branding, and organic flow.",
      details: ["Acoustic dampening studies", "Experience touchpoint mapping", "Premium reception monoliths", "Durable commercial materials"],
      vibe: "Corporate silence, raw timber pillars aligned with brushed aluminum.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      icon: Building2
    },
    {
      id: "villas",
      num: "03",
      title: "Luxury Villas",
      description: "A complete unified master plan harmonized with the natural surrounding typography. We coordinate closely with estate architects to guide indoor-outdoor transitions.",
      details: ["Thermal and natural light studies", "Infinity viewport alignments", "Subterranean gallery schemas", "Structural stone specifications"],
      vibe: "Monolithic, heavy architectural mass balanced by infinite sliding glass screens.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      icon: LandPlot
    },
    {
      id: "renovations",
      num: "04",
      title: "Renovation Projects",
      description: "Brave structural modifications for historic estates. We honor the original limestone, wood framing, and masonry work, injecting clean modern features.",
      details: ["Historical structure preservation", "Subtractive structural openings", "Plaster and brick remediation", "Modern energy-system integration"],
      vibe: "Haussmann plaster or raw brick contrasted against cold rolled black iron.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      icon: Hammer
    },
    {
      id: "space_planning",
      num: "05",
      title: "Space Planning",
      description: "Calculated structural layouts mapping pathways, viewpoints, and volumetric scales. We ensure zero waste space, optimizing cross-ventilation and movement.",
      details: ["Path of movement logs", "Sightline volumetric validation", "Furniture footprint schedules", "Ventilation heat-map reviews"],
      vibe: "Pure geometric layout, architectural proportions, pristine floor blueprints.",
      image: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=800&q=80",
      icon: Shuffle
    },
    {
      id: "furniture",
      num: "06",
      title: "Custom Furniture Design",
      description: "We draw, benchmark, and fabricate specific timber, plaster, and metal collection pieces. These are individual art objects constructed by master wood turners.",
      details: ["3D structural prototyping", "Exclusive stone slab curation", "Partnership with Italian ateliers", "Serial number certificate tags"],
      vibe: "Collectible, raw-hewn wood logs, sandblasted steel finishes.",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
      icon: Armchair
    }
  ];

  const activeService = services.find(s => s.id === activeId) || services[0];

  return (
    <section id="services" className="py-24 md:py-32 bg-brand-beige-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Subheader */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="font-mono text-[10px] tracking-[0.25em] text-brand-beige-300 uppercase block mb-3">
            03 — THE DISCIPLINES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal tracking-tight">
            Our Architectural <span className="italic font-normal">Methodologies</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 leading-relaxed font-light mt-6 max-w-2xl">
            We operate at the threshold where rigid engineering meets organic comfort. We do not apply a single template aesthetic; we map clean layouts that showcase honest natural textures.
          </p>
        </div>

        {/* Dynamic Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left: Large Architectural Typography List (7 columns) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-brand-charcoal/10 border-t border-b border-brand-charcoal/10">
            {services.map((service) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.id}
                  className="py-6 cursor-pointer group flex items-center justify-between"
                  onMouseEnter={() => setActiveId(service.id)}
                  onClick={() => setActiveId(service.id)}
                >
                  <div className="flex items-center space-x-6 md:space-x-10">
                    <span className="font-mono text-[10px] md:text-xs tracking-wider text-brand-charcoal/30 group-hover:text-brand-beige-300 transition-colors duration-350">
                      {service.num}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-brand-charcoal group-hover:translate-x-2 transition-transform duration-350">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Subtle layout icon indicators */}
                  <div className="flex items-center space-x-3 text-brand-charcoal/20 group-hover:text-brand-charcoal transition-colors">
                    <IconComp size={15} strokeWidth={1} />
                    <span className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                      activeId === service.id ? "bg-brand-beige-300 scale-125" : "bg-transparent"
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Immersive Curation Card Panel (5 columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-brand-beige-100 p-8 shadow-sm flex flex-col justify-between"
              >
                {/* Image Showcase */}
                <div className="w-full h-64 overflow-hidden bg-brand-beige-200 mb-8 relative shadow-inner">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-charcoal/85 backdrop-blur-sm px-3 py-1 text-[8.5px] font-mono tracking-widest text-white uppercase">
                    active paradigm
                  </div>
                </div>

                {/* Service Specs */}
                <div>
                  <h4 className="font-serif text-2xl text-brand-charcoal font-normal tracking-wide">
                    {activeService.title}
                  </h4>
                  
                  <p className="font-sans text-xs text-brand-charcoal/70 leading-relaxed font-light mt-4">
                    {activeService.description}
                  </p>

                  {/* Vibe Statement */}
                  <div className="mt-5 border-t border-brand-charcoal/5 pt-4">
                    <span className="font-mono text-[9px] tracking-[0.15em] text-brand-beige-300 uppercase block mb-1">
                      Aesthetic Core
                    </span>
                    <p className="font-serif text-sm italic text-brand-charcoal/80">
                      "{activeService.vibe}"
                    </p>
                  </div>

                  {/* Specs specs list */}
                  <div className="mt-6 border-t border-brand-charcoal/5 pt-4">
                    <span className="font-mono text-[9px] tracking-[0.15em] text-brand-charcoal/40 uppercase block mb-3">
                      Sub-Deliverables
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      {activeService.details.map((detail, idx) => (
                        <li key={idx} className="font-sans text-[11px] font-light text-brand-charcoal/70 flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-brand-beige-300 rounded-full" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
