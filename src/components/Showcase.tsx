import { useState, useEffect } from "react";
import { PORTFOLIO_PROJECTS } from "../data";
import { Project } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, TableProperties, CalendarDays, Maximize2, Paintbrush, Search, SlidersHorizontal, AlertCircle, RefreshCw, Layers } from "lucide-react";

interface ShowcaseProps {
  onBookInspiration: (projectName: string) => void;
  projects?: Project[];
}

export default function Showcase({ onBookInspiration, projects }: ShowcaseProps) {
  const activeProjects = projects || PORTFOLIO_PROJECTS;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamic state selectors
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [galleryState, setGalleryState] = useState<"normal" | "loading" | "error" | "empty">("normal");
  const [isSimulatingError, setIsSimulatingError] = useState<boolean>(false);

  const categories = ["All", "Villas", "Penthouses", "Showrooms & Courts"];

  // Filter effect simulating database query with customizable delays and states
  useEffect(() => {
    setGalleryState("loading");
    
    const timer = setTimeout(() => {
      if (isSimulatingError) {
        setGalleryState("error");
        return;
      }

      const filtered = activeProjects.filter((project) => {
        let catMatch = true;
        if (selectedCategory === "Villas") {
          catMatch = project.propertyType.toLowerCase().includes("villa") || project.propertyType.toLowerCase().includes("hideaway");
        } else if (selectedCategory === "Penthouses") {
          catMatch = project.propertyType.toLowerCase().includes("penthouse");
        } else if (selectedCategory === "Showrooms & Courts") {
          catMatch = project.propertyType.toLowerCase().includes("showroom") || project.propertyType.toLowerCase().includes("courtyard");
        }

        const devMatch = 
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.propertyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase());

        return catMatch && devMatch;
      });

      if (filtered.length === 0) {
        setGalleryState("empty");
      } else {
        setGalleryState("normal");
      }
    }, 800); // 800ms premium database simulation feel

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, isSimulatingError]);

  const currentFilteredProjects = activeProjects.filter((project) => {
    let catMatch = true;
    if (selectedCategory === "Villas") {
      catMatch = project.propertyType.toLowerCase().includes("villa") || project.propertyType.toLowerCase().includes("hideaway");
    } else if (selectedCategory === "Penthouses") {
      catMatch = project.propertyType.toLowerCase().includes("penthouse");
    } else if (selectedCategory === "Showrooms & Courts") {
      catMatch = project.propertyType.toLowerCase().includes("showroom") || project.propertyType.toLowerCase().includes("courtyard");
    }

    const devMatch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.propertyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    return catMatch && devMatch;
  });

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-brand-beige-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header section with luxurious editorial spacing */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between border-b border-brand-charcoal/15 pb-10 mb-12">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] tracking-[0.25em] text-brand-beige-300 uppercase block mb-3">
              01 — SELECTED WORKS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-brand-charcoal tracking-tight">
              Quietly Crafting <br />
              <span className="italic font-normal">Sovereign Structures</span>
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-sm">
            <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 leading-relaxed font-light">
              We curate a highly limited active registry of residential and commercial masterpieces annually. Every detail is shaped by honest geometry and architectural integrity.
            </p>
          </div>
        </div>

        {/* Editorial Filter and Control Utility Bar */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-brand-charcoal/10 pb-6">
            
            {/* Filter Category Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[8px] tracking-widest text-[#8E8A84] uppercase mr-2 font-medium">
                FILTER ARCHIVE:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 font-mono text-[9px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-brand-charcoal text-white font-medium"
                      : "bg-brand-beige-100/70 text-brand-charcoal/70 hover:bg-brand-beige-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Premium searching bar input */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="showcase-search-input"
                placeholder="Search travertine, cedar, monolith..."
                className="w-full bg-brand-beige-100 border-b border-brand-charcoal/20 py-2.5 pl-3 pr-10 text-xs text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-charcoal transition-colors font-sans font-light"
              />
              <Search className="absolute right-3 top-3 text-brand-charcoal/30" size={13} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-8 top-2.5 text-brand-charcoal/40 hover:text-brand-charcoal font-mono text-[9px] pr-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

          </div>
        </div>

        {/* ERROR STATE CONTAINER */}
        <AnimatePresence mode="wait">
          {galleryState === "error" && (
            <motion.div
              key="showcase-error"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full text-center py-20 px-6 border border-b-2 border-red-900/10 bg-red-50/40 flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-800">
                <AlertCircle size={22} strokeWidth={1.5} className="animate-pulse" />
              </div>
              
              <div className="space-y-2 max-w-md mx-auto">
                <span className="font-mono text-[8px] tracking-[0.25em] text-red-800 uppercase font-bold">
                  DIAGNOSTIC FAULT — LEDGER_ST_GRID_ALIGN
                </span>
                <h3 className="font-serif text-2xl text-brand-charcoal italic">
                  Grid Alignment Interrupted
                </h3>
                <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed font-light">
                  Our portfolio catalog ledger experienced a temporary calibration latencies while aligning material coordinates. Parity sync of the virtual blueprint is paused to secure data integrity.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsSimulatingError(false);
                  }}
                  id="reset-gallery-error-btn"
                  className="px-6 py-3 bg-brand-charcoal text-white hover:bg-brand-charcoal/90 transition-all font-mono text-[9px] tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <RefreshCw size={11} />
                  <span>Synchronize Ledger (Retry)</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* LOADING SKELETON LOADER STATE */}
          {galleryState === "loading" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full">
              {[1, 2, 3].map((item) => (
                <div key={item} className="aspect-[4/5] flex flex-col justify-between animate-pulse">
                  
                  {/* Image placeholder skeletal box */}
                  <div className="w-full h-[82%] relative bg-brand-beige-100/60 border border-brand-charcoal/5 flex flex-col items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.6s_infinite]" />
                    
                    {/* Subtle technical crosshair overlay */}
                    <div className="absolute top-4 left-4 h-2 w-2 border-t border-l border-brand-charcoal/10" />
                    <div className="absolute top-4 right-4 h-2 w-2 border-t border-r border-brand-charcoal/10" />
                    <div className="absolute bottom-4 left-4 h-2 w-2 border-b border-l border-brand-charcoal/10" />
                    <div className="absolute bottom-4 right-4 h-2 w-2 border-b border-r border-brand-charcoal/10" />
                    
                    <div className="space-y-4 text-center">
                      <Layers size={20} className="text-brand-charcoal/15 mx-auto animate-pulse" />
                      <span className="font-mono text-[8px] tracking-[0.2em] text-brand-charcoal/30 uppercase block font-medium">
                        CAD GRID_0{item} SECURING
                      </span>
                    </div>
                  </div>

                  {/* Text mock lines */}
                  <div className="pt-5 border-t border-brand-charcoal/5 flex justify-between items-start">
                    <div className="space-y-2 w-2/3">
                      <div className="h-4 bg-brand-beige-200/50 rounded-sm w-3/4" />
                      <div className="h-2.5 bg-brand-beige-200/30 rounded-sm w-1/2" />
                    </div>
                    <div className="h-3 bg-brand-beige-200/40 rounded-sm w-1/4" />
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* EMPTY STATE CONTAINER */}
          {galleryState === "empty" && (
            <motion.div
              key="showcase-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full text-center py-20 px-6 border border-brand-charcoal/10 bg-brand-beige-100/30 flex flex-col items-center justify-center space-y-6"
            >
              {/* Elegant physical-inspired graphic frame of an empty sheet */}
              <div className="relative w-20 h-28 border border-brand-charcoal/10 flex items-center justify-center text-brand-beige-300">
                <div className="absolute -top-1 left-3 right-3 h-[1px] bg-brand-beige-300" />
                <div className="absolute top-4 bottom-4 -left-[1px] w-[1px] bg-brand-beige-300" />
                <div className="absolute bottom-[8px] left-6 right-6 h-[2px] bg-brand-beige-300/30" />
                <Paintbrush size={20} strokeWidth={1} className="opacity-40 animate-pulse" />
              </div>

              <div className="space-y-2 max-w-sm">
                <span className="font-mono text-[8px] tracking-[0.2em] text-[#8E8A84] uppercase block font-bold">
                  STUDIO ARCHIVE — NULL_RESULT
                </span>
                <h3 className="font-serif text-2xl text-brand-charcoal font-light">
                  A Canvas of Silence
                </h3>
                <p className="font-sans text-xs text-brand-charcoal/50 leading-relaxed font-light">
                  We have reviewed our collection vaults, but no curated structures align with the search term <span className="text-brand-charcoal italic font-normal">"{searchQuery}"</span>. Sophia Sen prefers raw, natural parameters.
                </p>
              </div>

              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setIsSimulatingError(false);
                }}
                id="clear-empty-state-btn"
                className="px-5 py-3 bg-brand-charcoal text-white hover:bg-brand-charcoal/85 transition-colors font-mono text-[9px] tracking-[0.15em] uppercase cursor-pointer"
              >
                Expose Default Archive
              </button>
            </motion.div>
          )}

          {/* NORMAL FULL RESULTS STATE */}
          {galleryState === "normal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {currentFilteredProjects.map((project, idx) => {
                // Apply alternate heights for an organic editorial layout rhythm
                const aspectClass = idx % 3 === 0 
                  ? "aspect-[4/5] " 
                  : idx % 3 === 1 
                  ? "aspect-square" 
                  : "aspect-[4/5] lg:translate-y-8";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer flex flex-col justify-between ${aspectClass}`}
              >
                {/* Visual Image container with high zoom */}
                <div className="w-full h-[82%] overflow-hidden bg-brand-beige-100 relative shadow-sm">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  {/* Subtle hover overlay details */}
                  <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-sm text-brand-charcoal font-sans text-[10px] tracking-[0.2em] uppercase px-5 py-3 shadow-md flex items-center space-x-1">
                      <span>View Case Study</span>
                      <Maximize2 size={10} strokeWidth={2.5} />
                    </span>
                  </div>
                </div>

                {/* Typography details */}
                <div className="pt-5 border-t border-brand-charcoal/5 flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg text-brand-charcoal font-normal tracking-wide group-hover:text-brand-beige-300 transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="font-mono text-[9px] tracking-[0.15em] text-brand-charcoal/40 uppercase mt-1">
                      {project.location} — {project.propertyType}
                    </p>
                  </div>
                  <div className="text-right font-mono text-[9px] tracking-[0.1em] text-brand-charcoal/40 text-right mt-1.5">
                    {project.areaSize}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  </div>

      {/* FULL PROJECT PREVIEW DRAWER (Magazine layout) */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop opacity layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-dark z-50 cursor-zoom-out"
              onClick={() => setSelectedProject(null)}
            />

            {/* Absolute Full Screen Sliding Pane */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 180 }}
              className="fixed inset-y-0 right-0 w-full lg:w-[65%] xl:w-[55%] bg-brand-beige-50 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="relative min-h-screen p-8 md:p-16 flex flex-col justify-between">
                
                {/* Fixed position-ish Close element */}
                <div className="flex justify-between items-center pb-6 border-b border-brand-charcoal/10 mb-8">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-brand-beige-300 uppercase">
                    EDITORIAL CASE STUDY // {selectedProject.completionDate}
                  </span>
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    id="close-drawer"
                    className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.15em] text-brand-charcoal uppercase hover:opacity-60 transition-opacity p-2 cursor-pointer"
                  >
                    <span>CLOSE</span>
                    <X size={15} strokeWidth={1} />
                  </button>
                </div>

                {/* Main Hero Shot within the study */}
                <div className="w-full h-[350px] overflow-hidden bg-brand-beige-100 mb-10 shadow-sm relative">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${selectedProject.image}')` }}
                  />
                </div>

                {/* Title and High-Level metrics */}
                <div className="mb-10">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-brand-charcoal leading-tight">
                    {selectedProject.name}
                  </h2>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-brand-beige-300 uppercase mt-3">
                    {selectedProject.location}
                  </p>
                </div>

                {/* Multi-column editorial details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-brand-charcoal/10 pt-10 mb-12">
                  
                  {/* Left detail Column: Concept */}
                  <div className="md:col-span-7 flex flex-col space-y-6">
                    <div>
                      <h4 className="font-mono text-[10px] tracking-[0.2em] text-brand-charcoal mb-3 uppercase font-semibold flex items-center gap-1.5">
                        <Paintbrush size={12} className="text-brand-beige-300" />
                        Aesthetic Vision
                      </h4>
                      <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed font-light">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] tracking-[0.2em] text-brand-charcoal mb-3 uppercase font-semibold">
                        Design Logic
                      </h4>
                      <p className="font-serif text-base text-brand-charcoal leading-relaxed">
                        {selectedProject.concept}
                      </p>
                    </div>
                  </div>

                  {/* Right detail Column: Metrics & Bespoke Materials */}
                  <div className="md:col-span-5 bg-brand-beige-100 p-6 flex flex-col justify-between shadow-sm">
                    
                    {/* Metrics Section */}
                    <div className="space-y-4 mb-6">
                      <h4 className="font-mono text-[10px] tracking-[0.2em] text-brand-charcoal uppercase font-semibold border-b border-brand-charcoal/10 pb-2">
                        Project Metrics
                      </h4>
                      
                      <div className="flex justify-between items-center py-1">
                        <span className="font-sans text-xs text-brand-charcoal/50 flex items-center gap-1">
                          <TableProperties size={11} /> Size
                        </span>
                        <span className="font-mono text-xs text-brand-charcoal font-medium">{selectedProject.areaSize}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-1">
                        <span className="font-sans text-xs text-brand-charcoal/50 flex items-center gap-1">
                          <Paintbrush size={11} /> Type
                        </span>
                        <span className="font-mono text-xs text-brand-charcoal font-medium">{selectedProject.propertyType}</span>
                      </div>

                      <div className="flex justify-between items-center py-1">
                        <span className="font-sans text-xs text-brand-charcoal/50 flex items-center gap-1">
                          <CalendarDays size={11} /> Delivered
                        </span>
                        <span className="font-mono text-xs text-brand-charcoal font-medium">{selectedProject.completionDate}</span>
                      </div>
                    </div>

                    {/* Materials & Fixtures */}
                    <div>
                      <h4 className="font-mono text-[10px] tracking-[0.2em] text-brand-charcoal uppercase font-semibold border-b border-brand-charcoal/10 pb-2 mb-3">
                        Curations & Fixtures
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.details.map((detail, dIdx) => (
                          <li key={dIdx} className="font-sans text-xs text-brand-charcoal/70 leading-normal font-light flex items-start space-x-2">
                            <span className="block w-1.5 h-1.5 bg-brand-beige-300 rounded-full mt-1.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>

                {/* Inside-drawer CTA */}
                <div className="border-t border-brand-charcoal/10 pt-8 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="font-serif text-lg text-brand-charcoal font-medium">
                      Inspired by this vision?
                    </h5>
                    <p className="font-sans text-xs text-brand-charcoal/50 mt-1 font-light">
                      Let's tailor this high-end aesthetic system for your estate.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      onBookInspiration(selectedProject.name);
                      setSelectedProject(null);
                    }}
                    id={`drawer-cta-${selectedProject.id}`}
                    className="w-full sm:w-auto px-6 py-3.5 bg-brand-charcoal text-white text-xs font-semibold tracking-[0.15em] uppercase hover:bg-brand-charcoal-light transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Inquire About This Vibe</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
