import { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Wallet, Layers, Sparkles, Send, CheckCircle2, Ticket, Printer, Loader2, ShieldAlert, AlertCircle, RefreshCw, SlidersHorizontal } from "lucide-react";
import { ConsultationSubmission } from "../types";

interface ConsultationProps {
  initialProjectType?: string;
  onSuccess?: (submission: ConsultationSubmission) => void;
}

export default function Consultation({ initialProjectType = "Residential Interiors", onSuccess }: ConsultationProps) {
  const [projectType, setProjectType] = useState<string>(initialProjectType);
  const [budgetRange, setBudgetRange] = useState<string>("₹1.5 Crores - ₹5 Crores");
  const [timelineSlot, setTimelineSlot] = useState<string>("3 - 6 Months");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [briefDescription, setBriefDescription] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [ticketID, setTicketID] = useState<string>("");

  // Design state management
  const [submittingState, setSubmittingState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingStepText, setLoadingStepText] = useState<string>("");
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);

  const projectTypes = [
    "Residential Interiors",
    "Commercial Spaces",
    "Luxury Villas",
    "Renovations",
    "Space Planning",
    "Custom Furniture"
  ];

  const budgetOptions = [
    { label: "₹75 Lakhs - ₹1.5 Crores", description: "Bespoke Curation" },
    { label: "₹1.5 Crores - ₹5 Crores", description: "Full Residence Refinement" },
    { label: "Over ₹5 Crores", description: "Monolithic Estate Masterplan" }
  ];

  const timelineOptions = [
    { label: "Immediate (1-3 Mo)", description: "Permitted & Ready" },
    { label: "Planned (3-6 Mo)", description: "Schematic Stage" },
    { label: "Consultative (6+ Mo)", description: "Future Framing" }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setSubmittingState("loading");
    setLoadingProgress(0);
    setLoadingStepText("Initiating light-plane and coordinate analysis...");

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setTimeout(() => {
          if (simulateFailure) {
            setSubmittingState("error");
          } else {
            const randomID = "ATL-" + Math.floor(100000 + Math.random() * 900000);
            setTicketID(randomID);
            setSubmittingState("success");
            setIsSubmitted(true);
            
            const submission: ConsultationSubmission = {
              projectType,
              budgetRange,
              timelineSlot,
              fullName,
              email,
              phone,
              briefDescription
            };
            if (onSuccess) {
              onSuccess(submission);
            }
          }
        }, 500);
      }

      setLoadingProgress(progress);

      // Programmatic steps reflecting real premium material/spatial concepts
      if (progress < 30) {
        setLoadingStepText("Evaluating spatial sightlines & sun paths...");
      } else if (progress < 65) {
        setLoadingStepText("Aligning with Sophia Sen's active seasonal agenda...");
      } else if (progress < 88) {
        setLoadingStepText("Registering cryptographic materials signature...");
      } else {
        setLoadingStepText("Plating authentic reservation copper-ticket...");
      }
    }, 100);
  };

  return (
    <section id="consultation" className="py-24 md:py-32 bg-brand-beige-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Intention, Manifesto & Process (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-brand-beige-300 uppercase block mb-3">
                06 — RESERVATIONS
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal tracking-tight leading-tight mb-8">
                Let's Design a <br />
                <span className="italic font-normal">Space Worth Remembering.</span>
              </h2>
              
              <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 leading-relaxed font-light mb-10">
                To guarantee absolute attention to detail, Sophia Sen oversees only six custom commissions concurrently. Our introductory schematic appraisal maps your estate's light-planes, texture affinities, and core layouts. There is no financial obligation for the initial meeting.
              </p>
            </div>

            {/* Structured Design Process Log */}
            <div className="space-y-6 border-t border-brand-charcoal/10 pt-10">
              <h4 className="font-mono text-[10px] tracking-[0.2em] text-brand-charcoal uppercase font-semibold mb-4">
                The Curatorial Journey
              </h4>
              
              <div className="flex items-start space-x-4">
                <span className="font-mono text-[10px] text-brand-beige-300 bg-brand-beige-100 px-2.5 py-1 font-semibold">
                  PHASE I
                </span>
                <div>
                  <h5 className="font-serif text-sm font-medium text-brand-charcoal">Spatial Anatomy Consultation</h5>
                  <p className="font-sans text-[11px] text-brand-charcoal/50 leading-relaxed font-light mt-1">
                    A private 60-minute walk-through of the estate or review of raw blueprints to analyze structural sightlines.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="font-mono text-[10px] text-brand-beige-300 bg-brand-beige-100 px-2.5 py-1 font-semibold">
                  PHASE II
                </span>
                <div>
                  <h5 className="font-serif text-sm font-medium text-brand-charcoal">Material Manifestation Schema</h5>
                  <p className="font-sans text-[11px] text-brand-charcoal/50 leading-relaxed font-light mt-1">
                    We present physically sourced travertine stone blocks, oil timber selections, and heavy raw silk textile specimens.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Booking Form Card (7 columns) */}
          <div className="lg:col-span-7">
            <div className="bg-brand-charcoal text-brand-beige-100 p-8 md:p-12 shadow-md relative overflow-hidden h-full flex flex-col justify-center">
              
              {/* Monogram backdrop stamp */}
              <div className="absolute -top-10 -right-10 text-white/5 select-none font-serif text-[120px] pointer-events-none italic">
                A
              </div>

              <AnimatePresence mode="wait">
                {submittingState === "idle" && (
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8 relative z-10"
                  >
                    <div>
                      <h3 className="font-serif text-2xl text-brand-beige-50">Private Commission Inquiry</h3>
                      <p className="font-sans text-[11px] text-brand-beige-100/50 mt-1 font-light tracking-wide">
                        Please specify your programmatic needs to align with our current structural season.
                      </p>
                    </div>

                    {/* Step 1: Project Type selection blocks */}
                    <div className="space-y-3">
                      <label className="font-mono text-[9px] tracking-[0.15em] text-brand-beige-300 uppercase block">
                        Core Programmatic Service
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {projectTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setProjectType(type)}
                            id={`type-select-${type.replace(/\s+/g, '-').toLowerCase()}`}
                            className={`px-3 py-2 text-[10px] font-sans tracking-wide border transition-all truncate text-left cursor-pointer ${
                              projectType === type 
                                ? "bg-white text-brand-charcoal border-white" 
                                : "bg-transparent text-brand-beige-100/70 border-white/10 hover:border-white/30"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Budget Ranges selection blocks */}
                    <div className="space-y-3">
                      <label className="font-mono text-[9px] tracking-[0.15em] text-brand-beige-300 uppercase block">
                        Estimated Capital Allocation
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {budgetOptions.map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => setBudgetRange(opt.label)}
                            id={`budget-select-${opt.label.replace(/[₹$]/g, '').replace(/\s+/g, '-').toLowerCase()}`}
                            className={`p-3 text-left border transition-all cursor-pointer ${
                              budgetRange === opt.label 
                                ? "bg-white text-brand-charcoal border-white" 
                                : "bg-transparent text-brand-beige-100/70 border-white/10 hover:border-white/30"
                            }`}
                          >
                            <span className="block font-mono text-[11px] tracking-wider uppercase font-semibold">{opt.label}</span>
                            <span className="block text-[8px] opacity-60 font-sans mt-0.5 tracking-wide">{opt.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Timeline Slots selection blocks */}
                    <div className="space-y-3">
                      <label className="font-mono text-[9px] tracking-[0.15em] text-brand-beige-300 uppercase block">
                        Planned Structural Initiation
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {timelineOptions.map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => setTimelineSlot(opt.label)}
                            id={`timeline-select-${opt.label.split(' ')[0].toLowerCase()}`}
                            className={`p-3 text-left border transition-all cursor-pointer ${
                              timelineSlot === opt.label 
                                ? "bg-white text-brand-charcoal border-white" 
                                : "bg-transparent text-brand-beige-100/70 border-white/10 hover:border-white/30"
                            }`}
                          >
                            <span className="block font-mono text-[11px] tracking-wider uppercase font-semibold">{opt.label}</span>
                            <span className="block text-[8px] opacity-60 font-sans mt-0.5 tracking-wide">{opt.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 4: Personal Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] tracking-[0.15em] text-brand-beige-300 uppercase block">Full Name</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          id="commission-name-input"
                          placeholder="e.g. Vikram Birla"
                          className="w-full bg-transparent border-b border-white/15 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-all font-sans font-light"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] tracking-[0.15em] text-brand-beige-300 uppercase block">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="commission-email-input"
                          placeholder="e.g. birla@domain.in"
                          className="w-full bg-transparent border-b border-white/15 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-all font-sans font-light"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] tracking-[0.15em] text-brand-beige-300 uppercase block">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          id="commission-phone-input"
                          placeholder="e.g. +91 91520 02415"
                          className="w-full bg-transparent border-b border-white/15 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-all font-sans font-light"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[8px] tracking-[0.15em] text-brand-beige-300 uppercase block">Project Location or Brief</label>
                        <input
                          type="text"
                          value={briefDescription}
                          onChange={(e) => setBriefDescription(e.target.value)}
                          id="commission-brief-input"
                          placeholder="e.g. Coastal villa in Anjuna, Goa"
                          className="w-full bg-transparent border-b border-white/15 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-all font-sans font-light"
                        />
                      </div>
                    </div>

                    {/* Interactive Simulator Switch styled elegantly */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between">
                      <div className="space-y-0.5 pr-2">
                        <span className="font-mono text-[9px] tracking-wider text-brand-beige-200 uppercase font-semibold flex items-center gap-1.5">
                          <SlidersHorizontal size={11} className="text-brand-beige-300 animate-spin-slow" />
                          Diagnostic Sandbox Simulator
                        </span>
                        <p className="font-sans text-[9px] text-[#A29F9A] leading-tight font-light">
                          Simulate high-congestion registry lockout error
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input 
                          type="checkbox" 
                          id="simulate-failure-checkbox"
                          checked={simulateFailure}
                          onChange={(e) => setSimulateFailure(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#F5F2ED] after:border-gray-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-beige-300"></div>
                      </label>
                    </div>

                    {/* Submit layout */}
                    <button
                      type="submit"
                      id="commission-submit-btn"
                      className="w-full py-4 bg-brand-beige-100 text-brand-charcoal text-xs tracking-[0.2em] font-semibold uppercase hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                    >
                      <Send size={12} />
                      <span>Request Portfolio Alignment</span>
                    </button>

                  </motion.form>
                )}

                {submittingState === "loading" && (
                  <motion.div
                    key="booking-loading"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-8 relative z-10 w-full"
                  >
                    {/* Breathtaking geometric loader */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 border border-brand-beige-300/10 rounded-full"></div>
                      <motion.div 
                        className="absolute inset-0 border-2 border-t-brand-beige-200 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      />
                      {/* Nested fine square rotation */}
                      <motion.div 
                        className="w-14 h-14 border border-brand-beige-300/30"
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                      />
                      <span className="absolute font-mono text-[10px] text-brand-beige-200 font-medium">
                        {loadingProgress}%
                      </span>
                    </div>

                    <div className="space-y-3 max-w-sm">
                      <span className="font-mono text-[8px] tracking-[0.25em] text-brand-beige-300 uppercase block animate-pulse">
                        Transmitting Registry Request
                      </span>
                      <h4 className="font-serif text-xl italic text-brand-beige-50">
                        Evaluating Spatial Criteria
                      </h4>
                      <p className="font-sans text-[11px] text-brand-beige-100/50 leading-relaxed min-h-[32px] max-w-xs mx-auto">
                        {loadingStepText}
                      </p>
                    </div>

                    {/* Shimmering state tracking box */}
                    <div className="w-full max-w-xs bg-white/5 border border-white/5 p-4 rounded-sm space-y-2 text-left font-mono text-[9px] text-[#A29F9A]">
                      <div className="flex items-center justify-between">
                        <span>ESTATE BOUNDARIES CHECK</span>
                        <span className={loadingProgress >= 30 ? "text-brand-beige-200" : "animate-pulse"}>
                          {loadingProgress >= 30 ? "✓ CONNECTED" : "◕ PROCESSING"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>DIRECTOR SEASON AGGREGATOR</span>
                        <span className={loadingProgress >= 65 ? "text-brand-beige-200" : (loadingProgress >= 30 ? "animate-pulse text-white/50" : "◌ QUEUED")}>
                          {loadingProgress >= 65 ? "✓ COMMITTED" : (loadingProgress >= 30 ? "◕ SEEKING" : "◌ QUEUED")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>DIGITAL ENVELOPE REGISTER</span>
                        <span className={loadingProgress >= 88 ? "text-brand-beige-200" : (loadingProgress >= 65 ? "animate-pulse text-white/50" : "◌ QUEUED")}>
                          {loadingProgress >= 88 ? "✓ ENGRAVED" : (loadingProgress >= 65 ? "◕ GENERATING" : "◌ QUEUED")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {submittingState === "error" && (
                  <motion.div
                    key="booking-error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 text-center py-6 relative z-10 w-full"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-950/20 border border-red-500/30 mb-2">
                      <ShieldAlert className="text-red-400" size={28} strokeWidth={1} />
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[8px] tracking-[0.25em] text-red-400 uppercase">
                        REGISTRY LIMIT EXCEEDED
                      </span>
                      <h3 className="font-serif text-2xl text-brand-beige-50">Seasonal Active Limit Saturated</h3>
                    </div>

                    <div className="bg-red-950/25 border-y border-red-500/10 p-5 text-left space-y-4 my-6 font-mono text-[10px] text-[#FFC4C4]/80">
                      <p className="font-sans text-[11px] leading-relaxed font-light text-brand-beige-100/70">
                        Atelier Spaces secures precision by capping commissions under <span className="font-medium text-white italic">Sophia Sen</span> at precisely six (6) active projects. Our database ledger shows all six slots currently occupied.
                      </p>
                      
                      <div className="border-t border-red-500/10 pt-3 space-y-1.5">
                        <div className="flex justify-between text-[9px] text-[#A29F9A]">
                          <span>DIAGNOSTIC STATUS:</span>
                          <span className="text-red-300 font-semibold">CLOSED_LIMIT (Code: SF-6003)</span>
                        </div>
                        <div className="flex justify-between text-[9px] text-[#A29F9A]">
                          <span>FAILSAFE STATUS:</span>
                          <span className="text-white">Active (Auto-Hold Secured)</span>
                        </div>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-brand-beige-100/60 leading-relaxed font-light max-w-md mx-auto">
                      Don't worry—your spatial request was successfully cached in our local staging archives. To proceed, please try either method below.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 items-center justify-center">
                      <button
                        onClick={() => {
                          setSubmittingState("idle");
                        }}
                        id="adjust-form-params"
                        className="w-full sm:w-auto px-5 py-3 bg-brand-dark border border-white/10 text-brand-beige-100 hover:bg-white/10 hover:border-white transition-all font-mono text-[9px] tracking-[0.15em] uppercase flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <RefreshCw size={11} />
                        <span>Adjust Parameters</span>
                      </button>

                      <button
                        onClick={() => {
                          setSimulateFailure(false);
                          setSubmittingState("idle");
                        }}
                        id="override-registry-limit"
                        className="w-full sm:w-auto px-5 py-3 bg-[#1C1815] border border-brand-beige-300/40 text-brand-beige-200 hover:bg-[#F5F2ED] hover:text-brand-charcoal transition-all font-sans text-[10px] font-semibold tracking-[0.10em] uppercase flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <span>Clear Failure Switch</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {submittingState === "success" && (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 text-center py-6 w-full"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-beige-100/10 border border-brand-beige-300 mb-2">
                      <Ticket className="text-brand-beige-200 animate-pulse" size={28} strokeWidth={1} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-3xl text-brand-beige-50">Reservation Formally Registered</h3>
                      <p className="font-mono text-[9px] tracking-[0.23em] text-brand-beige-300 uppercase">
                        REFERENCE CODE: {ticketID}
                      </p>
                    </div>

                    {/* Physical design invoice/card mock */}
                    <div className="bg-brand-dark border-y border-brand-beige-300/20 p-6 text-left space-y-4 my-8 font-mono text-[10px]">
                      
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white/40">PROPOSED REGISTRY</span>
                        <span className="text-white">{fullName}</span>
                      </div>
                      
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white/40">COMMISSION PARADIGM</span>
                        <span className="text-white">{projectType}</span>
                      </div>

                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white/40">ESTIMATED VALUATION</span>
                        <span className="text-white">{budgetRange}</span>
                      </div>

                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white/40">SCHEDULING DEPTH</span>
                        <span className="text-white">{timelineSlot}</span>
                      </div>

                      <div className="flex justify-between pt-2">
                        <span className="text-white/40">STATUS</span>
                        <span className="text-brand-beige-200 uppercase font-semibold">Awaiting Director Signoff</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-brand-beige-100/60 leading-relaxed font-light max-w-md mx-auto">
                      Thank you for your trust, <span className="font-medium text-white">{fullName}</span>. An executive assistant under Sophia Sen's personal studio will contact you within 24 hours at <span className="text-white underline">{email}</span> to schedule our phase I virtual blueprint evaluation.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-6 items-center justify-center">
                      <button
                        onClick={() => {
                          try {
                            window.print();
                          } catch (error) {
                            console.warn("Printing is limited or blocked within this sandbox/iframe preview environment:", error);
                          }
                        }}
                        id="print-booking-ticket"
                        className="px-6 py-2.5 bg-brand-dark/50 border border-white/10 text-white hover:bg-white/10 transition-all font-mono text-[9px] tracking-[0.15em] uppercase flex items-center space-x-2 cursor-pointer"
                      >
                        <Printer size={11} />
                        <span>Print Invitation</span>
                      </button>

                      <button
                        onClick={() => {
                          setSubmittingState("idle");
                          setIsSubmitted(false);
                          setFullName("");
                          setEmail("");
                          setPhone("");
                          setBriefDescription("");
                        }}
                        id="new-booking-btn"
                        className="px-6 py-3 bg-brand-beige-200 text-brand-charcoal hover:bg-white transition-all font-sans text-[10px] font-semibold tracking-[0.15em] uppercase cursor-pointer"
                      >
                        File Another Inquiry
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
