import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, Inbox, Layers, Settings, Calendar, Plus, Trash2, 
  Lock, Unlock, Check, X, LogOut, SlidersHorizontal, AlertCircle, 
  HelpCircle, RefreshCw, FileText, CheckCircle2, Archive, ExternalLink
} from "lucide-react";
import { Project, ConsultationSubmission } from "../types";

// Seed realistic inbox entries so the dashboard starts with premium, rich data
const INITIAL_INBOX: (ConsultationSubmission & { id: string; date: string; status: "Awaiting Signoff" | "Secured" | "Archived" })[] = [
  {
    id: "ATL-810432",
    fullName: "Aarav Singhania",
    email: "aarav@singhaniagroup.com",
    phone: "+91 98122 45000",
    projectType: "Luxury Villas",
    budgetRange: "Over ₹5 Crores",
    timelineSlot: "Immediate (1-3 Mo)",
    briefDescription: "Securing an estate plot in Alibaug. Seeking a fully integrated travertine-heavy monolithic pavilion that faces the sea with 12-meter continuous sliding screens.",
    date: "2026-07-14",
    status: "Awaiting Signoff"
  },
  {
    id: "ATL-395821",
    fullName: "Elena Rostova",
    email: "elena.r@rostovadesign.com",
    phone: "+44 7700 900077",
    projectType: "Commercial Spaces",
    budgetRange: "₹1.5 Crores - ₹5 Crores",
    timelineSlot: "Planned (3-6 Mo)",
    briefDescription: "Boutique gallery expansion in Colaba, Mumbai. Need raw plaster finishes and museum-grade directable light grids to highlight modern basalt sculpture work.",
    date: "2026-07-12",
    status: "Secured"
  },
  {
    id: "ATL-105943",
    fullName: "Vikram & Meera Nair",
    email: "nair.vikram@me.com",
    phone: "+91 98450 11223",
    projectType: "Residential Interiors",
    budgetRange: "₹1.5 Crores - ₹5 Crores",
    timelineSlot: "Consultative (6+ Mo)",
    briefDescription: "A duplex restoration in Bangalore. We wish to align our interior axes directly with the winter solstice sunset line across our private terrace garden.",
    date: "2026-07-09",
    status: "Archived"
  }
];

interface AdminPanelProps {
  onClose: () => void;
  projects: Project[];
  onAddProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onResetProjects: () => void;
  simulateFailure: boolean;
  setSimulateFailure: (val: boolean) => void;
  occupiedSlots: number;
  setOccupiedSlots: (val: number) => void;
}

export default function AdminPanel({
  onClose,
  projects,
  onAddProject,
  onDeleteProject,
  onResetProjects,
  simulateFailure,
  setSimulateFailure,
  occupiedSlots,
  setOccupiedSlots
}: AdminPanelProps) {
  // Gating Lock State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [gateError, setGateError] = useState<string>("");

  // Navigation tab within console
  const [activeTab, setActiveTab] = useState<"metrics" | "inbox" | "projects" | "calibration">("metrics");

  // Local state for submissions (connected to localStorage)
  const [inbox, setInbox] = useState<typeof INITIAL_INBOX>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<typeof INITIAL_INBOX[0] | null>(null);

  // New Project Form State
  const [newProjName, setNewProjName] = useState("");
  const [newProjLocation, setNewProjLocation] = useState("");
  const [newProjPropType, setNewProjPropType] = useState("Coastal Villa");
  const [newProjArea, setNewProjArea] = useState("");
  const [newProjDate, setNewProjDate] = useState("");
  const [newProjImg, setNewProjImg] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjConcept, setNewProjConcept] = useState("");
  const [newProjDetails, setNewProjDetails] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Load submissions from localStorage or seed them
  useEffect(() => {
    const stored = localStorage.getItem("atelier_submissions");
    if (stored) {
      try {
        setInbox(JSON.parse(stored));
      } catch (e) {
        setInbox(INITIAL_INBOX);
      }
    } else {
      setInbox(INITIAL_INBOX);
      localStorage.setItem("atelier_submissions", JSON.stringify(INITIAL_INBOX));
    }
  }, []);

  // Sync state changes in submissions back to localStorage
  const updateInbox = (newInbox: typeof INITIAL_INBOX) => {
    setInbox(newInbox);
    localStorage.setItem("atelier_submissions", JSON.stringify(newInbox));
  };

  // Authenticate Admin
  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "atelier2026") {
      setIsAuthenticated(true);
      setGateError("");
    } else {
      setGateError("Invalid structural signature. Access denied.");
      setPasscode("");
    }
  };

  // Handle inquiry state toggles
  const handleUpdateInquiryStatus = (id: string, status: "Awaiting Signoff" | "Secured" | "Archived") => {
    const updated = inbox.map((item) => {
      if (item.id === id) {
        // If we secure a commission, let's increment the active occupied projects slot automatically!
        if (status === "Secured" && item.status !== "Secured" && occupiedSlots < 6) {
          setOccupiedSlots(occupiedSlots + 1);
        } else if (item.status === "Secured" && status !== "Secured" && occupiedSlots > 0) {
          setOccupiedSlots(occupiedSlots - 1);
        }
        return { ...item, status };
      }
      return item;
    });
    updateInbox(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  // Delete inquiry
  const handleDeleteInquiry = (id: string) => {
    const item = inbox.find(i => i.id === id);
    if (item?.status === "Secured" && occupiedSlots > 0) {
      setOccupiedSlots(occupiedSlots - 1);
    }
    const updated = inbox.filter((item) => item.id !== id);
    updateInbox(updated);
    setSelectedInquiry(null);
  };

  // Add Project Submit
  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName || !newProjLocation || !newProjDesc) return;

    const detailsArray = newProjDetails
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const newProject: Project = {
      id: "proj_custom_" + Date.now(),
      name: newProjName,
      location: newProjLocation,
      propertyType: newProjPropType,
      areaSize: newProjArea || "3,500 sq.ft.",
      completionDate: newProjDate || "June 2026",
      image: newProjImg || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      description: newProjDesc,
      concept: newProjConcept || "Focused on volumetric rhythm, honest raw concrete panels, and continuous daylight wash.",
      details: detailsArray.length > 0 ? detailsArray : [
        "Travertine stone wall planes",
        "Minimalist light conduits by Flos",
        "Acoustic timber-slatted ceiling elements"
      ]
    };

    onAddProject(newProject);
    setFormSuccess(true);
    
    // Reset form fields
    setNewProjName("");
    setNewProjLocation("");
    setNewProjArea("");
    setNewProjDate("");
    setNewProjImg("");
    setNewProjDesc("");
    setNewProjConcept("");
    setNewProjDetails("");

    setTimeout(() => {
      setFormSuccess(false);
    }, 4000);
  };

  // Calculate quick metrics based on live variables
  const totalSubmissions = inbox.length;
  const awaitingSignoff = inbox.filter((i) => i.status === "Awaiting Signoff").length;
  const securedCommissions = inbox.filter((i) => i.status === "Secured").length;
  
  // Calculate potential financial pipeline from budget ranges
  const estimatedPipelineValue = inbox.reduce((sum, item) => {
    if (item.status === "Archived") return sum;
    if (item.budgetRange.includes("Over ₹5 Crores")) return sum + 6.0; // 6 crores est
    if (item.budgetRange.includes("₹1.5 Crores - ₹5 Crores")) return sum + 3.25; // 3.25 crores est
    return sum + 1.1; // 1.1 crores est
  }, 0);

  // If occupied slots hits maximum limit, auto-set registry lockout to simulate true logic
  useEffect(() => {
    if (occupiedSlots >= 6) {
      setSimulateFailure(true);
    } else {
      setSimulateFailure(false);
    }
  }, [occupiedSlots]);

  // Clean wipe simulated storage to default state
  const handleWipeDatabase = () => {
    if (confirm("Reset local modifications and restore baseline studio settings?")) {
      updateInbox(INITIAL_INBOX);
      onResetProjects();
      setOccupiedSlots(4);
      setSimulateFailure(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-charcoal/95 backdrop-blur-md z-[100] overflow-y-auto flex items-center justify-center p-4 md:p-8 selection:bg-brand-beige-300 selection:text-brand-charcoal">
      <div className="w-full max-w-6xl min-h-[500px] bg-brand-dark border border-white/10 rounded-sm shadow-2xl flex flex-col md:flex-row relative overflow-hidden">
        
        {/* Architect blueprint style lines */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10 pointer-events-none" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10 pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            /* SECURITY LOCKSCREEN GATING ATELIER ASSETS */
            <motion.div 
              key="lockscreen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center justify-center py-20 px-6 text-center text-[#F5F2ED]"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Lock className="text-brand-beige-200 animate-pulse" size={24} strokeWidth={1.5} />
              </div>

              <div className="space-y-2 max-w-md mx-auto mb-8">
                <span className="font-mono text-[8px] tracking-[0.3em] text-brand-beige-300 uppercase font-semibold">
                  Sovereign Studio Database
                </span>
                <h2 className="font-serif text-3xl font-light italic text-white leading-tight">
                  Atelier Control Gate
                </h2>
                <p className="font-sans text-[11px] text-brand-beige-100/50 leading-relaxed font-light">
                  This console allows administrators to adjust solar calibrations, audit live inquiry portfolios, and manage active estate registries.
                </p>
              </div>

              <form onSubmit={handleAuthenticate} className="w-full max-w-xs space-y-4">
                <div className="space-y-1 text-left">
                  <label htmlFor="passcode-input" className="font-mono text-[8px] tracking-widest text-[#A29F9A] uppercase block font-semibold">
                    AUTHORIZATION CODE:
                  </label>
                  <input
                    type="password"
                    id="passcode-input"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter authorized passcode"
                    className="w-full bg-white/5 border border-white/15 py-3 px-4 rounded-sm text-xs text-white placeholder-white/20 focus:outline-none focus:border-brand-beige-200 transition-colors font-sans font-light"
                    autoFocus
                  />
                </div>

                {gateError && (
                  <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-300 font-mono text-[10px] flex items-center gap-2">
                    <AlertCircle size={12} className="flex-shrink-0" />
                    <span>{gateError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  id="unlock-console-btn"
                  className="w-full py-3.5 bg-brand-beige-200 text-brand-charcoal text-[10px] font-mono tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300 cursor-pointer font-bold"
                >
                  Unlock Ledger Assets
                </button>
              </form>

              <button
                type="button"
                onClick={onClose}
                className="mt-8 font-mono text-[9px] tracking-widest text-[#A29F9A] hover:text-white uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <X size={11} />
                <span>Return to Exhibition</span>
              </button>
            </motion.div>
          ) : (
            /* AUTHENTICATED SYSTEM CONSOLE BOARD */
            <motion.div 
              key="console"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col md:flex-row min-h-[500px]"
            >
              {/* SIDEBAR NAVIGATION MODULE */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-10 pb-5 border-b border-white/10">
                    <div className="w-8 h-8 rounded-full bg-brand-beige-300/10 border border-brand-beige-300 flex items-center justify-center text-brand-beige-200">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-white tracking-wide">
                        Atelier Console
                      </h3>
                      <span className="font-mono text-[8px] tracking-wider text-[#A29F9A] uppercase">
                        SOPHIA SEN DIRECTORY
                      </span>
                    </div>
                  </div>

                  {/* NAV LINKS */}
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setActiveTab("metrics")}
                      id="tab-metrics-btn"
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm font-mono text-[10px] tracking-wider uppercase transition-all text-left cursor-pointer ${
                        activeTab === "metrics"
                          ? "bg-brand-beige-200 text-brand-charcoal font-semibold"
                          : "text-[#A29F9A] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <SlidersHorizontal size={13} />
                      <span>Studio Pulse</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("inbox")}
                      id="tab-inbox-btn"
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm font-mono text-[10px] tracking-wider uppercase transition-all text-left relative cursor-pointer ${
                        activeTab === "inbox"
                          ? "bg-brand-beige-200 text-brand-charcoal font-semibold"
                          : "text-[#A29F9A] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Inbox size={13} />
                      <span className="flex-grow">Inquiry Inbox</span>
                      {awaitingSignoff > 0 && (
                        <span className={`px-1.5 py-0.5 text-[8px] rounded-full font-sans font-bold leading-none ${
                          activeTab === "inbox" ? "bg-brand-charcoal text-white" : "bg-brand-beige-300 text-brand-charcoal"
                        }`}>
                          {awaitingSignoff}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveTab("projects")}
                      id="tab-projects-btn"
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm font-mono text-[10px] tracking-wider uppercase transition-all text-left cursor-pointer ${
                        activeTab === "projects"
                          ? "bg-brand-beige-200 text-brand-charcoal font-semibold"
                          : "text-[#A29F9A] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Layers size={13} />
                      <span>Portfolio CMS</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("calibration")}
                      id="tab-calibration-btn"
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm font-mono text-[10px] tracking-wider uppercase transition-all text-left cursor-pointer ${
                        activeTab === "calibration"
                          ? "bg-brand-beige-200 text-brand-charcoal font-semibold"
                          : "text-[#A29F9A] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Settings size={13} />
                      <span>Failsafe System</span>
                    </button>
                  </div>
                </div>

                {/* BOTTOM LOG OUT CONTROL */}
                <div className="pt-6 mt-10 md:mt-0 border-t border-white/10 space-y-3">
                  <div className="text-left">
                    <span className="font-mono text-[8px] tracking-widest text-[#8E8A84] block uppercase">
                      SECURE CREDENTIALS:
                    </span>
                    <span className="font-sans text-[10px] text-brand-beige-200 block truncate font-light">
                      sophia.sen@atelier.com
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleWipeDatabase}
                      title="Wipe database local caches back to original setup"
                      className="px-3 py-2 bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-900/10 hover:border-red-500 hover:text-red-300 transition-colors font-mono text-[9px] uppercase cursor-pointer"
                    >
                      Wipe Cache
                    </button>

                    <button
                      onClick={() => setIsAuthenticated(false)}
                      className="flex-grow flex items-center justify-center space-x-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors font-mono text-[9px] uppercase cursor-pointer"
                    >
                      <LogOut size={10} />
                      <span>Lock</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CORE DASHBOARD PANEL */}
              <div className="flex-grow p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto bg-brand-dark">
                
                {/* 1. METRICS DASHBOARD TAB */}
                {activeTab === "metrics" && (
                  <div className="space-y-8 text-[#FAF8F5]">
                    
                    {/* Header bar */}
                    <div>
                      <span className="font-mono text-[8px] tracking-[0.25em] text-brand-beige-300 uppercase font-semibold block mb-1">
                        CONTROL ROOM — LEDGER PULSE
                      </span>
                      <h2 className="font-serif text-2xl font-light italic">Studio Performance Index</h2>
                    </div>

                    {/* Numeric Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Metric Card */}
                      <div className="p-5 bg-white/5 border border-white/5 rounded-sm relative group">
                        <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-brand-beige-200 animate-ping" />
                        <span className="font-mono text-[8px] tracking-widest text-[#A29F9A] uppercase block mb-1">
                          REGISTRY PIPELINE
                        </span>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="font-serif text-3xl font-light text-white">{totalSubmissions}</span>
                          <span className="font-mono text-[9px] text-[#A29F9A]">Inquiries</span>
                        </div>
                        <p className="font-sans text-[10px] text-[#A29F9A] mt-2 font-light leading-tight">
                          Total database consultation logs recorded on terminal.
                        </p>
                      </div>

                      {/* Metric Card */}
                      <div className="p-5 bg-white/5 border border-white/5 rounded-sm relative">
                        <span className="font-mono text-[8px] tracking-widest text-[#A29F9A] uppercase block mb-1">
                          ACTIVE COMMISSIONS
                        </span>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="font-serif text-3xl font-light text-brand-beige-200">{occupiedSlots} / 6</span>
                        </div>
                        <p className="font-sans text-[10px] text-[#A29F9A] mt-2 font-light leading-tight">
                          Sophia Sen capacity. At <span className="font-medium text-white">6 / 6</span> lockout triggers.
                        </p>
                      </div>

                      {/* Metric Card */}
                      <div className="p-5 bg-white/5 border border-white/5 rounded-sm">
                        <span className="font-mono text-[8px] tracking-widest text-[#A29F9A] uppercase block mb-1">
                          ESTIMATED CONTRACT VAL
                        </span>
                        <div className="flex items-baseline space-x-1">
                          <span className="font-serif text-3xl font-light text-emerald-400">₹{estimatedPipelineValue.toFixed(2)}</span>
                          <span className="font-mono text-[10px] text-emerald-400 font-semibold">Cr</span>
                        </div>
                        <p className="font-sans text-[10px] text-[#A29F9A] mt-2 font-light leading-tight">
                          Derived dynamically from active client budget selections.
                        </p>
                      </div>

                    </div>

                    {/* Registry Controller Section */}
                    <div className="p-6 bg-[#1A1613] border border-brand-beige-300/10 rounded-sm space-y-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] tracking-[0.2em] text-brand-beige-200 uppercase font-semibold block">
                            REGISTRY LOCKOUT THRESHOLD CONTROL
                          </span>
                          <h4 className="font-serif text-lg text-white">Interactive Commission Slots Allocator</h4>
                          <p className="font-sans text-xs text-[#A29F9A] font-light leading-relaxed max-w-xl">
                            Atelier Spaces prevents dilution by lock-shutting incoming applications when active projects reach 6 slots. Adjust occupied slots below to trigger the system lockout fail-state dynamically.
                          </p>
                        </div>
                        <div className="p-3 rounded-full bg-brand-charcoal border border-white/5 text-center flex-shrink-0">
                          <Calendar className="text-brand-beige-300" size={18} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center font-mono text-[11px]">
                          <span className="text-[#A29F9A]">CURRENTLY RESERVED COMMISSION SLOTS:</span>
                          <span className={`font-bold px-2 py-0.5 rounded-sm ${occupiedSlots >= 6 ? "bg-red-950 text-red-400 border border-red-500/20 animate-pulse" : "bg-brand-beige-300 text-brand-charcoal"}`}>
                            {occupiedSlots} / 6 SLOTS OCCUPIED
                          </span>
                        </div>

                        {/* Custom Slider / Incrementor */}
                        <div className="flex items-center space-x-4 bg-brand-charcoal p-4 border border-white/5 rounded-sm">
                          <button
                            onClick={() => setOccupiedSlots(Math.max(0, occupiedSlots - 1))}
                            className="p-1.5 hover:bg-white/5 border border-white/10 rounded-sm text-white transition-colors cursor-pointer"
                            id="decrement-slots-btn"
                          >
                            <X size={12} />
                          </button>
                          
                          {/* Slat indicator visualizer */}
                          <div className="flex-grow flex gap-2">
                            {[1, 2, 3, 4, 5, 6].map((slot) => (
                              <div
                                key={slot}
                                className={`h-4 flex-grow border rounded-sm transition-all duration-300 ${
                                  slot <= occupiedSlots
                                    ? slot === 6
                                      ? "bg-red-800 border-red-500/50"
                                      : "bg-brand-beige-300 border-brand-beige-200/50"
                                    : "bg-white/5 border-white/10"
                                }`}
                              />
                            ))}
                          </div>

                          <button
                            onClick={() => setOccupiedSlots(Math.min(6, occupiedSlots + 1))}
                            className="p-1.5 hover:bg-white/5 border border-white/10 rounded-sm text-white transition-colors cursor-pointer"
                            id="increment-slots-btn"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Cohesive status statement */}
                        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-sm font-mono text-[10px]">
                          <div className={`h-2 w-2 rounded-full ${occupiedSlots >= 6 ? "bg-red-500 animate-ping" : "bg-emerald-500"}`} />
                          <p className="text-[#A29F9A]">
                            SYSTEM BEHAVIOR Statement: 
                            {occupiedSlots >= 6 ? (
                              <span className="text-red-400 font-semibold ml-1">
                                [LOCKED] Inquiries will hit the commission limit saturation error screen.
                              </span>
                            ) : (
                              <span className="text-emerald-400 font-semibold ml-1">
                                [STAGING ACTIVE] Incoming submissions will succeed and print gold-plated copper reservations.
                              </span>
                            )}
                          </p>
                        </div>

                      </div>
                    </div>

                  </div>
                )}

                {/* 2. INBOX TAB */}
                {activeTab === "inbox" && (
                  <div className="space-y-6 text-[#FAF8F5]">
                    
                    <div>
                      <span className="font-mono text-[8px] tracking-[0.25em] text-brand-beige-300 uppercase font-semibold block mb-1">
                        INCOMING PORTFOLIO COMMISSIONS INBOX
                      </span>
                      <h2 className="font-serif text-2xl font-light italic">Client Briefings Ledger</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                      
                      {/* Submissions list sidebar */}
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                        {inbox.length === 0 ? (
                          <div className="text-center py-12 border border-white/5 rounded-sm p-6 bg-white/5">
                            <Inbox className="mx-auto text-[#8E8A84] mb-3 opacity-30" size={32} />
                            <p className="font-serif text-lg text-white">No active inquiries</p>
                            <p className="font-sans text-xs text-[#A29F9A] font-light mt-1">
                              Database has no recorded inquiries. Fill out the Consultation inquiry form in client view.
                            </p>
                          </div>
                        ) : (
                          inbox.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedInquiry(item)}
                              className={`p-4 border text-left rounded-sm cursor-pointer transition-all relative ${
                                selectedInquiry?.id === item.id
                                  ? "bg-white/10 border-brand-beige-200"
                                  : "bg-white/5 border-white/5 hover:bg-white/10"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-[9px] text-[#A29F9A]">
                                  {item.id} — {item.date}
                                </span>
                                <span className={`px-2 py-0.5 font-mono text-[8px] tracking-wider uppercase font-semibold rounded-sm ${
                                  item.status === "Secured"
                                    ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20"
                                    : item.status === "Archived"
                                    ? "bg-neutral-800 text-neutral-400"
                                    : "bg-amber-950 text-amber-400 border border-amber-500/20"
                                }`}>
                                  {item.status}
                                </span>
                              </div>
                              <h4 className="font-serif text-sm font-medium text-white">{item.fullName}</h4>
                              <p className="font-sans text-[10px] text-[#A29F9A] truncate mt-1">
                                {item.projectType} • {item.budgetRange}
                              </p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Submission Detail display panel */}
                      <div className="border border-white/10 bg-[#161311] p-6 rounded-sm relative min-h-[350px]">
                        <AnimatePresence mode="wait">
                          {selectedInquiry ? (
                            <motion.div
                              key={selectedInquiry.id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="space-y-6 text-left"
                            >
                              {/* Blueprint tick details */}
                              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-white/20" />
                              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-white/20" />
                              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-white/20" />
                              <div className="absolute bottom-3 right-3 h-2 w-2 border-b border-r border-white/20" />

                              <div className="border-b border-white/10 pb-4">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-mono text-[9px] tracking-widest text-brand-beige-200">
                                    CLIENT REGISTRY DOSSIER
                                  </span>
                                  <span className="font-mono text-[9px] text-brand-beige-300 font-semibold bg-white/5 px-2 py-1">
                                    {selectedInquiry.id}
                                  </span>
                                </div>
                                <h3 className="font-serif text-xl text-white">{selectedInquiry.fullName}</h3>
                                <p className="font-mono text-[10px] text-[#A29F9A] mt-1">
                                  Inquiry Date: {selectedInquiry.date}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-[#A29F9A]">
                                <div>
                                  <span className="block text-[#8E8A84] text-[9px] tracking-wider uppercase mb-0.5">PROJECT PROGRAM</span>
                                  <span className="text-white font-medium">{selectedInquiry.projectType}</span>
                                </div>
                                <div>
                                  <span className="block text-[#8E8A84] text-[9px] tracking-wider uppercase mb-0.5">BUDGET VALUATION</span>
                                  <span className="text-brand-beige-200 font-semibold">{selectedInquiry.budgetRange}</span>
                                </div>
                                <div>
                                  <span className="block text-[#8E8A84] text-[9px] tracking-wider uppercase mb-0.5">TIMELINE FRAME</span>
                                  <span className="text-white font-medium">{selectedInquiry.timelineSlot}</span>
                                </div>
                                <div>
                                  <span className="block text-[#8E8A84] text-[9px] tracking-wider uppercase mb-0.5">CONTACT COORDINATES</span>
                                  <span className="text-white font-medium block truncate" title={selectedInquiry.email}>{selectedInquiry.email}</span>
                                  <span className="text-white font-medium block">{selectedInquiry.phone || "No phone listed"}</span>
                                </div>
                              </div>

                              <div className="space-y-1.5 p-4 bg-white/5 rounded-sm">
                                <span className="font-mono text-[9px] text-brand-beige-300 block uppercase font-semibold">
                                  BRIEF & SPATIAL INTENTIONS:
                                </span>
                                <p className="font-sans text-xs text-brand-beige-100/85 leading-relaxed font-light whitespace-pre-wrap">
                                  "{selectedInquiry.briefDescription}"
                                </p>
                              </div>

                              {/* Status action panel */}
                              <div className="border-t border-white/10 pt-4 flex flex-wrap gap-2 justify-end">
                                <button
                                  onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                                  className="px-4 py-2 bg-red-950/20 border border-red-500/20 hover:bg-red-900/25 hover:border-red-500 text-red-300 transition-all font-mono text-[9px] uppercase cursor-pointer"
                                >
                                  Delete Inquiry
                                </button>

                                {selectedInquiry.status !== "Archived" && (
                                  <button
                                    onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, "Archived")}
                                    className="px-4 py-2 bg-[#262422] hover:bg-[#383532] border border-white/5 text-white transition-all font-mono text-[9px] uppercase cursor-pointer"
                                  >
                                    Archive Log
                                  </button>
                                )}

                                {selectedInquiry.status !== "Secured" && (
                                  <button
                                    onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, "Secured")}
                                    id="admin-secure-commission-btn"
                                    className="px-4 py-2 bg-brand-beige-200 text-brand-charcoal hover:bg-white font-sans text-[10px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <Check size={12} strokeWidth={2.5} />
                                    <span>Secure Commission</span>
                                  </button>
                                )}

                                {selectedInquiry.status !== "Awaiting Signoff" && (
                                  <button
                                    onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, "Awaiting Signoff")}
                                    className="px-4 py-2 bg-amber-950/20 border border-amber-500/20 hover:bg-amber-900/10 text-amber-300 transition-all font-mono text-[9px] uppercase cursor-pointer"
                                  >
                                    Set Pending
                                  </button>
                                )}
                              </div>

                            </motion.div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20 text-[#8E8A84]">
                              <FileText size={40} className="stroke-1 opacity-25 mb-4" />
                              <p className="font-serif italic text-base">Select a dossier card</p>
                              <p className="font-sans text-[11px] font-light max-w-xs mt-1">
                                Click any client submission entry in the sidebar ledger to display complete technical material specs and contact credentials.
                              </p>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>

                  </div>
                )}

                {/* 3. PORTFOLIO CMS MANAGER */}
                {activeTab === "projects" && (
                  <div className="space-y-6 text-[#FAF8F5]">
                    
                    <div>
                      <span className="font-mono text-[8px] tracking-[0.25em] text-brand-beige-300 uppercase font-semibold block mb-1">
                        STUDIO PORTFOLIO CONTENT ENGINE
                      </span>
                      <h2 className="font-serif text-2xl font-light italic">Masterworks Collection Registry</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Add New Masterwork Form */}
                      <form onSubmit={handleAddProjectSubmit} className="lg:col-span-7 bg-[#161311] border border-white/5 p-6 rounded-sm text-left space-y-4">
                        <span className="font-mono text-[9px] tracking-widest text-brand-beige-200 block uppercase font-semibold border-b border-white/5 pb-2">
                          Add Custom Masterwork Project
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-mono text-[8px] text-[#A29F9A] uppercase block">PROJECT NAME:</label>
                            <input
                              type="text"
                              value={newProjName}
                              onChange={(e) => setNewProjName(e.target.value)}
                              required
                              placeholder="e.g., Travertine Solarium"
                              className="w-full bg-white/5 border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-beige-200 transition-colors font-sans"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-mono text-[8px] text-[#A29F9A] uppercase block">LOCATION MAP:</label>
                            <input
                              type="text"
                              value={newProjLocation}
                              onChange={(e) => setNewProjLocation(e.target.value)}
                              required
                              placeholder="e.g., Alibaug, Maharashtra"
                              className="w-full bg-white/5 border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-beige-200 transition-colors font-sans"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="font-mono text-[8px] text-[#A29F9A] uppercase block">PROPERTY CATEGORY:</label>
                            <select
                              value={newProjPropType}
                              onChange={(e) => setNewProjPropType(e.target.value)}
                              className="w-full bg-[#262422] border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-beige-200 transition-colors font-sans"
                            >
                              <option value="Coastal Villa">Coastal Villa</option>
                              <option value="Duplex Penthouse">Duplex Penthouse</option>
                              <option value="Luxury Hideaway">Luxury Hideaway</option>
                              <option value="Design Showroom">Design Showroom</option>
                              <option value="Courtyard Residence">Courtyard Residence</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="font-mono text-[8px] text-[#A29F9A] uppercase block">TOTAL PLOT AREA:</label>
                            <input
                              type="text"
                              value={newProjArea}
                              onChange={(e) => setNewProjArea(e.target.value)}
                              placeholder="e.g., 5,100 sq.ft."
                              className="w-full bg-white/5 border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-beige-200 transition-colors font-sans"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-mono text-[8px] text-[#A29F9A] uppercase block">DATE COMPLETED:</label>
                            <input
                              type="text"
                              value={newProjDate}
                              onChange={(e) => setNewProjDate(e.target.value)}
                              placeholder="e.g., June 2026"
                              className="w-full bg-white/5 border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-beige-200 transition-colors font-sans"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="font-mono text-[8px] text-[#A29F9A] uppercase block">LANDSCAPE IMAGE URL:</label>
                          <input
                            type="url"
                            value={newProjImg}
                            onChange={(e) => setNewProjImg(e.target.value)}
                            placeholder="Paste premium architecture image URL from Unsplash"
                            className="w-full bg-white/5 border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-beige-200 transition-colors font-sans"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-mono text-[8px] text-[#A29F9A] uppercase block">SHORT EDITORIAL BIOGRAPHY (HERO LIST CARD):</label>
                          <input
                            type="text"
                            value={newProjDesc}
                            onChange={(e) => setNewProjDesc(e.target.value)}
                            required
                            placeholder="An absolute study of light filtering across basalt screens..."
                            className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-beige-200 transition-colors font-sans"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-mono text-[8px] text-[#A29F9A] uppercase block">PHILOSOPHICAL DESIGN CONCEPT SUMMARY (MODAL):</label>
                          <textarea
                            value={newProjConcept}
                            onChange={(e) => setNewProjConcept(e.target.value)}
                            placeholder="Describe how building axes, solar trajectories, and raw material truth are harmonized here..."
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-beige-200 transition-colors font-sans resize-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-mono text-[8px] text-[#A29F9A] uppercase block">MATERIAL & FIXTURE SPEC LIST (ONE STATEMENT PER LINE):</label>
                          <textarea
                            value={newProjDetails}
                            onChange={(e) => setNewProjDetails(e.target.value)}
                            placeholder="Bespoke Italian Unfilled Travertine hearth&#10;Floor lamps designed by Michael Anastassiades&#10;Dark rift-fumed native cedar lumber panels"
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-beige-200 transition-colors font-sans font-mono text-[11px] resize-none"
                          />
                        </div>

                        {formSuccess && (
                          <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 font-mono text-[10px] flex items-center gap-2">
                            <CheckCircle2 size={12} className="flex-shrink-0 animate-bounce" />
                            <span>Structural blueprint integrated into dynamic portfolio array successfully!</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          id="submit-new-project-btn"
                          className="w-full py-3 bg-brand-beige-200 hover:bg-white text-brand-charcoal font-sans text-[10px] font-bold tracking-[0.15em] uppercase transition-colors rounded-sm cursor-pointer"
                        >
                          Integrate Masterwork to Exhibition
                        </button>

                      </form>

                      {/* Active Project Grid List */}
                      <div className="lg:col-span-5 space-y-4">
                        <span className="font-mono text-[9px] tracking-widest text-[#A29F9A] block uppercase font-semibold text-left">
                          Registered Portfolio Pieces ({projects.length})
                        </span>

                        <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
                          {projects.map((proj) => (
                            <div key={proj.id} className="p-3 bg-white/5 border border-white/5 rounded-sm flex items-center gap-3 text-left justify-between group">
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={proj.image}
                                  alt={proj.name}
                                  referrerPolicy="no-referrer"
                                  className="w-12 h-12 rounded-sm object-cover border border-white/10 flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <h4 className="font-serif text-xs font-semibold text-white truncate">{proj.name}</h4>
                                  <p className="font-mono text-[8px] text-[#A29F9A] truncate">
                                    {proj.location} • {proj.propertyType}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => onDeleteProject(proj.id)}
                                title="Remove project from collection"
                                className="p-1.5 bg-red-950/20 hover:bg-red-900/40 border border-red-500/10 hover:border-red-500 text-red-300 rounded-sm transition-all flex-shrink-0 opacity-0 group-hover:opacity-100 cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* 4. SYSTEM CALIBRATION (FAILSAFE & LATENCIES) */}
                {activeTab === "calibration" && (
                  <div className="space-y-6 text-[#FAF8F5] text-left">
                    
                    <div>
                      <span className="font-mono text-[8px] tracking-[0.25em] text-brand-beige-300 uppercase font-semibold block mb-1">
                        FAILSAFE DECISION DESK & INTERACTIVE SIMULATION
                      </span>
                      <h2 className="font-serif text-2xl font-light italic">System Calibrations panel</h2>
                    </div>

                    <div className="bg-[#161311] border border-white/5 p-6 rounded-sm space-y-8">
                      
                      {/* Active simulation failsafes */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-2 border-b border-white/5 pb-2">
                          <SlidersHorizontal size={14} className="text-brand-beige-200 mt-1" />
                          <div>
                            <h3 className="font-serif text-base text-white">Manual Database Failsafe Locks</h3>
                            <p className="font-sans text-[11px] text-[#A29F9A] font-light">
                              Force target error states and simulated network conditions to test visual fallback mechanisms.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Fail Switch control */}
                          <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between">
                            <div className="space-y-1 pr-4">
                              <span className="font-mono text-[9px] tracking-wider text-brand-beige-200 uppercase font-bold flex items-center gap-1.5">
                                Lockout Registry Failsafe
                              </span>
                              <p className="font-sans text-[10px] text-[#A29F9A] leading-tight font-light">
                                Instantly force the "Active Limit Saturated" system lockout error on consultation forms.
                              </p>
                            </div>

                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                              <input 
                                type="checkbox" 
                                checked={simulateFailure}
                                onChange={(e) => setSimulateFailure(e.target.checked)}
                                className="sr-only peer" 
                              />
                              <div className="w-10 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#FAF8F5] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                            </label>
                          </div>

                          {/* Reset state helper */}
                          <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex flex-col justify-between space-y-3">
                            <div className="space-y-1">
                              <span className="font-mono text-[9px] tracking-wider text-brand-beige-200 uppercase font-bold">
                                Restore Baseline Settings
                              </span>
                              <p className="font-sans text-[10px] text-[#A29F9A] leading-tight font-light">
                                Clear all local cached project logs, consultation entries, and recalibrate slots defaults.
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={handleWipeDatabase}
                              className="px-4 py-2.5 bg-brand-charcoal hover:bg-white border border-white/10 hover:text-brand-charcoal transition-all font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer font-bold"
                            >
                              Reset Studio Environment
                            </button>
                          </div>

                        </div>
                      </div>

                      {/* Technical Blueprint Grounding Notes */}
                      <div className="p-4 bg-[#1C1815] border-l-2 border-brand-beige-300 font-sans text-xs text-[#A29F9A] space-y-2 leading-relaxed font-light">
                        <span className="font-mono text-[9px] tracking-wider text-brand-beige-200 uppercase font-semibold block">
                          ADMINISTRATOR PROTOCOLS & LOGGING:
                        </span>
                        <p>
                          Atelier Spaces represents a cohesive, fully connected single-page digital studio. 
                          Changes applied within this console—such as adding/deleting portfolio masterworks or incrementing slots registries—will instantly cascade across all layout components, showcase grids, and booking mechanisms in real-time.
                        </p>
                        <p>
                          All submissions made in client mode are saved locally inside your secure browser <code className="font-mono text-[10px] bg-black/35 px-1 rounded text-white">localStorage</code> pipeline under keys <code className="font-mono text-[10px] bg-black/35 px-1 rounded text-white">"atelier_submissions"</code> and <code className="font-mono text-[10px] bg-black/35 px-1 rounded text-white">"atelier_portfolio"</code>.
                        </p>
                      </div>

                    </div>

                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CLOSE MODAL BUTTON AT TOP RIGHT */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#A29F9A] hover:text-white hover:bg-white/15 rounded-full transition-all cursor-pointer z-[110]"
          title="Exit Admin Console"
          id="close-admin-btn"
        >
          <X size={18} />
        </button>

      </div>
    </div>
  );
}
