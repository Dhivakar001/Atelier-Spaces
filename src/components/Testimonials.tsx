import { useState } from "react";
import { CLIENT_STORIES, PORTFOLIO_PROJECTS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Landmark } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CLIENT_STORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === CLIENT_STORIES.length - 1 ? 0 : prev + 1));
  };

  const activeStory = CLIENT_STORIES[activeIndex];

  // Let's find the matching portfolio project image to render adjacent
  const linkedProject = PORTFOLIO_PROJECTS.find(
    (p) => p.name.toLowerCase().includes(activeStory.projectType.toLowerCase()) || 
           activeStory.projectType.toLowerCase().includes(p.name.toLowerCase()) ||
           p.id === "proj_malibu" // safe default fallback
  ) || PORTFOLIO_PROJECTS[0];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-brand-beige-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="font-mono text-[10px] tracking-[0.25em] text-brand-beige-300 uppercase block mb-3">
            05 — CLIENT STORIES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal tracking-tight">
            Vouched by <span className="italic font-normal text-brand-beige-300">Connoisseurs</span> of Space
          </h2>
        </div>

        {/* Testimonial Frame: Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-beige-100 p-8 md:p-16 shadow-sm relative">
          
          {/* Quote Mark background decoration */}
          <div className="absolute top-10 right-16 text-brand-beige-200/20 select-none hidden md:block">
            <Quote size={180} strokeWidth={0.5} />
          </div>

          {/* Left Side: Testimonial copy text with smooth transitions (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[16rem]">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col space-y-6"
              >
                {/* Visual quote */}
                <p className="font-serif text-xl md:text-2xl lg:text-3xl text-brand-charcoal leading-relaxed font-light italic">
                  "{activeStory.quote}"
                </p>

                {/* Client credentials */}
                <div className="pt-6 border-t border-brand-charcoal/5">
                  <h4 className="font-serif text-xl font-normal text-brand-charcoal">
                    {activeStory.clientName}
                  </h4>
                  <p className="font-mono text-[9px] tracking-[0.15em] text-brand-beige-300 uppercase mt-1">
                    {activeStory.projectType} — {activeStory.location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider triggers */}
            <div className="flex items-center space-x-4 mt-12">
              <button
                onClick={handlePrev}
                id="testimonial-prev-btn"
                aria-label="Previous story"
                className="w-10 h-10 border border-brand-charcoal/15 text-brand-charcoal hover:bg-brand-charcoal hover:text-white hover:border-brand-charcoal transition-all rounded-full flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              
              <span className="font-mono text-[10px] tracking-widest text-brand-charcoal/40 uppercase">
                Story 0{activeIndex + 1} / 0{CLIENT_STORIES.length}
              </span>

              <button
                onClick={handleNext}
                id="testimonial-next-btn"
                aria-label="Next story"
                className="w-10 h-10 border border-brand-charcoal/15 text-brand-charcoal hover:bg-brand-charcoal hover:text-white hover:border-brand-charcoal transition-all rounded-full flex items-center justify-center cursor-pointer"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </div>

          </div>

          {/* Right Side: Showcase matching image (5 columns) */}
          <div className="lg:col-span-5 hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-brand-beige-200 aspect-[4/5] overflow-hidden shadow-sm relative group"
              >
                <img
                  src={linkedProject.image}
                  alt={linkedProject.name}
                  className="w-full h-full object-cover grayscale scale-102 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute bottom-4 inset-x-4 bg-brand-charcoal/90 backdrop-blur-sm p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block font-sans text-[10px] text-white/50 tracking-wider">PROJECT</span>
                    <span className="block font-serif text-sm text-brand-beige-100">{linkedProject.name}</span>
                  </div>
                  <Landmark size={15} className="text-brand-beige-300" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
