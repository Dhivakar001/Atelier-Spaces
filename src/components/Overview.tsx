import { motion } from "motion/react";
import { ArrowUpRight, Compass, Shield, Hexagon, Layers, ArrowDown } from "lucide-react";

interface OverviewProps {
  onActionClick: (sectionId: string) => void;
}

export default function Overview({ onActionClick }: OverviewProps) {
  const values = [
    {
      icon: <Compass className="text-brand-beige-300" strokeWidth={1} size={28} />,
      title: "The Problem We Solve",
      subtitle: "The Fragmented Spatial Journey",
      description: "Traditional spatial architectural workflows are fractured. Visionaries are left managing disjointed material suppliers, variable contractor capabilities, and aesthetic compromise—resulting in a final built space that fails to convey genuine sanctuary."
    },
    {
      icon: <Layers className="text-brand-beige-300" strokeWidth={1} size={28} />,
      title: "Our Sovereign Solution",
      subtitle: "Uncompromising Cohesive Curation",
      description: "Atelier Spaces delivers an unified design-to-curate ecosystem. We steward your physical footprint from raw shell structure up to final material selection—restoring physical harmony, solar sightlines, and authentic raw material truth."
    },
    {
      icon: <Shield className="text-brand-beige-300" strokeWidth={1} size={28} />,
      title: "Who We Serve",
      subtitle: "The Discerning Collector",
      description: "Tailored for luxury estate owners, boutique hoteliers, and premium brand directors who recognize that authentic elegance whispers. We restrict active studio projects to secure absolute attention to detail."
    }
  ];

  const actions = [
    {
      tag: "01 — PORTFOLIO",
      label: "Examine Curation Collection",
      desc: "Delve into our live archive of villas, penthouses, and showcases featuring raw travertine, cedar, and custom ironwork.",
      target: "portfolio",
      btnText: "Explore Works"
    },
    {
      tag: "02 — TRANSFORMATION",
      label: "Evaluate Structural Parity",
      desc: "Interact with our real-time before/after comparison slate to examine the exact material transformation of our structural shells.",
      target: "transformation",
      btnText: "View Interactive comparison"
    },
    {
      tag: "03 — INQUIRY",
      label: "Secure Studio Reservation",
      desc: "Place your project parameters into our live diagnostic database to schedule a seasonal briefing with Director Sophia Sen.",
      target: "consultation",
      btnText: "Initiate Booking"
    }
  ];

  return (
    <section id="overview" className="relative py-24 md:py-32 bg-[#FAF8F5] border-t border-brand-charcoal/10 overflow-hidden">
      
      {/* Absolute faint grid pattern background for technical drafting board aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-[10px] tracking-[0.25em] text-brand-beige-300 uppercase block mb-3">
            ATELIER SPACES — OVERVIEW
          </span>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-brand-charcoal tracking-tight leading-tight">
            Restoring structural alignment through <span className="italic font-normal">absolute material truth</span>.
          </h2>
          <p className="mt-6 font-sans text-brand-charcoal/70 font-light text-sm md:text-base leading-relaxed max-w-2xl">
            We are a highly specialized design-to-build laboratory. We transform cold, raw structural shells into unified minimalist sanctuaries, combining ancient solar sightline principles with contemporary monolithic forms.
          </p>
        </div>

        {/* Value Proposition Grid: Problem, Solution, Audience */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-8 mb-24">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="flex flex-col bg-white border border-brand-charcoal/5 p-8 relative shadow-sm hover:shadow-md hover:border-brand-charcoal/10 transition-all duration-300 group"
            >
              {/* Draftsman Crosshair Accent */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Hexagon size={12} className="text-brand-beige-300 animate-spin-slow" />
              </div>

              <div className="mb-6 w-12 h-12 rounded-sm bg-[#FAF8F5] flex items-center justify-center border border-brand-charcoal/5">
                {item.icon}
              </div>

              <span className="font-mono text-[9px] tracking-[0.15em] text-[#8E8A84] uppercase font-semibold mb-1">
                {item.title}
              </span>
              <h3 className="font-serif text-lg font-light text-brand-charcoal italic mb-4">
                {item.subtitle}
              </h3>
              <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Primary Client Action Pathways */}
        <div className="border-t border-brand-charcoal/10 pt-16">
          <div className="max-w-xl mb-12">
            <span className="font-mono text-[8px] tracking-[0.25em] text-[#8E8A84] uppercase block mb-2 font-semibold">
              DIAGNOSTIC PATHWAYS
            </span>
            <h3 className="font-serif text-2xl text-brand-charcoal font-light">
              Your Primary Actions
            </h3>
            <p className="font-sans text-xs text-brand-charcoal/50 leading-relaxed font-light mt-2">
              Our digital studio is calibrated to let clients seamlessly evaluate and secure physical commissions. Choose a pathway below to proceed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actions.map((act, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-brand-charcoal/10 p-6 flex flex-col justify-between hover:bg-brand-charcoal hover:text-white transition-all duration-500 group relative cursor-pointer"
                onClick={() => onActionClick(act.target)}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-brand-charcoal/10 group-hover:border-white/10 pb-4">
                    <span className="font-mono text-[9px] tracking-widest text-[#8E8A84] group-hover:text-brand-beige-200">
                      {act.tag}
                    </span>
                    <ArrowUpRight size={13} className="text-[#8E8A84] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif text-base group-hover:text-white transition-colors">
                      {act.label}
                    </h4>
                    <p className="font-sans text-[11px] text-brand-charcoal/60 group-hover:text-brand-beige-100/70 leading-relaxed font-light transition-colors">
                      {act.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <span className="inline-flex items-center space-x-1 font-mono text-[9px] tracking-[0.15em] uppercase font-semibold text-brand-beige-300 group-hover:text-white transition-colors">
                    <span>{act.btnText}</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
