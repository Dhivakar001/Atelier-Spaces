import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import { ArrowLeftRight, Paintbrush, ShieldCheck } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState<number>(45); // percentage (0-100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const beforeImg = "https://i.ibb.co/CK58619G/Chat-GPT-Image-Jun-23-2026-12-48-37-PM-copy-1.jpg";
  const afterImg = "https://i.ibb.co/VYN6LRg7/Chat-GPT-Image-Jun-23-2026-12-42-11-PM-2.jpg";

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    // Use global listeners for smoother drag tracking outside the element box
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <section id="transformation" className="py-24 md:py-32 bg-brand-beige-100 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Title & Philosophy Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[10px] tracking-[0.25em] text-brand-beige-300 uppercase block mb-3">
            02 — THE METAMORPHOSIS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal tracking-tight mb-6">
            From Spatial Chaos to <br />
            <span className="italic font-normal text-brand-beige-300">Absolute Composition</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 leading-relaxed font-light">
            We do not cover problems; we remodel core structures. Slide the brass indicator to witness how we breathe light, acoustics, and tectonic order into historically fractured spaces.
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div 
          ref={containerRef}
          className="relative w-full h-[32rem] md:h-[40rem] overflow-hidden select-none cursor-ew-resize shadow-md rounded-sm"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          
          {/* AFTER IMAGE (Bottom Layer) */}
          <div className="absolute inset-0 w-full h-full bg-brand-dark">
            <img 
              src={afterImg} 
              alt="Luxury Completed Architecture" 
              className="w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Label floating */}
            <div className="absolute bottom-8 right-8 z-10 bg-brand-charcoal/70 backdrop-blur-md px-4 py-2 border border-white/10 flex items-center space-x-2 pointer-events-none">
              <ShieldCheck size={14} className="text-brand-beige-200" />
              <span className="font-mono text-[9px] tracking-[0.15em] text-white uppercase font-light">
                AFTER — DECCAN COURT RESIDENCE
              </span>
            </div>
          </div>

          {/* BEFORE IMAGE (Top Layer - Dynamic CSS clip-path mask) */}
          <div 
            className="absolute inset-0 w-full h-full z-20 will-change-[clip-path]"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src={beforeImg} 
              alt="Dated raw structural site with empty white walls" 
              className="w-full h-full object-cover pointer-events-none"
              style={{
                transform: "scale(1.03) translateY(10px) translateX(-2px)",
                transformOrigin: "center center"
              }}
              referrerPolicy="no-referrer"
            />
            {/* Label floating */}
            <div className="absolute bottom-8 left-8 z-10 bg-brand-charcoal/70 backdrop-blur-md px-4 py-2 border border-white/10 flex items-center space-x-2 pointer-events-none">
              <Paintbrush size={14} className="text-brand-beige-300" />
              <span className="font-mono text-[9px] tracking-[0.15em] text-white uppercase font-light">
                BEFORE — RAW SHELL WITH WHITE WALLS
              </span>
            </div>
          </div>

          {/* DRAG HANDLE BAR */}
          <div 
            className="absolute inset-y-0 z-30 w-[2px] bg-brand-beige-300/60 pointer-events-none will-change-[left]"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Drag Handle Button element */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-brand-charcoal border border-brand-beige-300 text-brand-beige-100 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110">
              <ArrowLeftRight size={14} className="opacity-80" />
            </div>
            
            {/* Architectural alignment hashes */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[7px] text-brand-beige-200 tracking-wider">SLIDE</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[7px] text-brand-beige-200 tracking-wider">TRANSFORM</div>
          </div>

        </div>

        {/* Narrative Metrics Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-brand-charcoal/15 pt-8">
          <div>
            <h4 className="font-serif text-lg text-brand-charcoal font-normal">
              1. Spatial De-cluttering
            </h4>
            <p className="font-sans text-xs text-brand-charcoal/60 mt-2 leading-relaxed font-light">
              We removed low modular wood partitions and heavy drop ceilings to expose the beautiful natural proportions and unlock uninterrupted vertical volume.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg text-brand-charcoal font-normal">
              2. Absolute White Walls
            </h4>
            <p className="font-sans text-xs text-brand-charcoal/60 mt-2 leading-relaxed font-light">
              We hand-laid smooth, premium seamless white lime-plaster wall coats, pairing them with sustainable native wide teakwood planks and delicate custom-cast warm brass transitions.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg text-brand-charcoal font-normal">
              3. Lighting Mechanics
            </h4>
            <p className="font-sans text-xs text-brand-charcoal/60 mt-2 leading-relaxed font-light">
              By introducing hidden warm-spectrum LED trim channels and custom focus rays, the pristine white planes bounce and dissipate soft natural daylight beautifully.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}