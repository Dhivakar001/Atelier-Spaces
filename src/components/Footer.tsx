import { useState, FormEvent } from "react";
import { Mail, ArrowRight, Instagram, Linkedin, Globe, MapPin } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer id="footer" className="bg-brand-dark text-brand-beige-100 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      
      {/* Background shadow monogram */}
      <div className="absolute bottom-[-100px] left-[-50px] text-white/[0.02] font-serif text-[350px] tracking-tighter select-none pointer-events-none italic">
        A
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top block split */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Logo & Manifesto block (4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-serif text-2xl tracking-[0.25em] text-white uppercase">
                Atelier <span className="font-light">Spaces</span>
              </h3>
              <p className="font-mono text-[9px] tracking-[0.15em] text-brand-beige-300 uppercase mt-1">
                ARCHITECTURE & INTERIORS EST. 2018
              </p>
              <p className="font-sans text-xs text-brand-beige-100/60 leading-relaxed font-light mt-6 max-w-sm">
                Quiet luxury architectural design for luxury residences, penthouses, commercial salons, and custom estates. We honor silence, light, and materiality.
              </p>
            </div>

            {/* General Inquiry contact */}
            <div className="space-y-1 font-mono text-[10px] tracking-wider uppercase text-white/50">
              <span className="block">GENERAL INQUIRY:</span>
              <a href="mailto:curator@atelierspaces.in" className="block text-brand-beige-100 hover:text-white underline decoration-brand-beige-300">
                curator@atelierspaces.in
              </a>
              <span className="block mt-1">ADVISORY DIVISION:</span>
              <span className="block text-brand-beige-200">+91 91520 02415</span>
            </div>
          </div>

          {/* Curation offices segments (4 columns) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="font-mono text-[9px] tracking-[0.2em] text-brand-beige-300 uppercase font-semibold flex items-center gap-1">
                <MapPin size={10} /> MUMBAI
              </h4>
              <p className="font-sans text-[11px] text-white/60 leading-relaxed font-light">
                Colaba Chambers, No. 8<br />
                Apollo Bunder<br />
                Mumbai, MH 400039
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-[9px] tracking-[0.2em] text-brand-beige-300 uppercase font-semibold flex items-center gap-1">
                <MapPin size={10} /> NEW DELHI
              </h4>
              <p className="font-sans text-[11px] text-white/60 leading-relaxed font-light">
                Amrita Shergill Marg, No. 12<br />
                Lutyens' Delhi<br />
                New Delhi 110003
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-[9px] tracking-[0.2em] text-brand-beige-300 uppercase font-semibold flex items-center gap-1">
                <MapPin size={10} /> BENGALURU
              </h4>
              <p className="font-sans text-[11px] text-white/60 leading-relaxed font-light">
                Lavelle Road, Suite 204<br />
                Vittal Mallya Road<br />
                Bengaluru, KA 560001
              </p>
            </div>
          </div>

          {/* Gazette Newsletter signup (4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-[9px] tracking-[0.2em] text-brand-beige-300 uppercase block font-semibold">
              07 — THE ATELIER GAZETTE
            </span>
            <h4 className="font-serif text-lg text-white font-normal">
              Private Design Essays & Portfolio Releases
            </h4>
            <p className="font-sans text-xs text-brand-beige-100/50 leading-relaxed font-light">
              We send highly curated collections of physical materials, joinery sketches, and early project previews twice per year. No marketing spam.
            </p>

            {/* Newsletter form */}
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex border-b border-white/20 pb-2 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Insert email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="newsletter-email-input"
                  className="bg-transparent text-xs text-white placeholder-white/30 w-full focus:outline-none font-sans font-light"
                />
                <button
                  type="submit"
                  id="newsletter-submit-btn"
                  aria-label="Subscribe"
                  className="text-brand-beige-200 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div className="text-brand-beige-200 font-mono text-[10px] tracking-widest uppercase flex items-center space-x-2 py-2">
                <span>✓ Added to mailing registry.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 font-mono text-[9px] tracking-widest text-white/40 uppercase gap-4">
          <div className="flex items-center space-x-4">
            <span id="copyright-text">© 2026 Atelier Spaces. All Rights Reserved.</span>
            <span>•</span>
            <a href="#about" className="hover:text-white transition-colors">PRIVACY TERMS</a>
          </div>

          {/* Social connections */}
          <div className="flex items-center space-x-6">
            <a href="https://instagram.com" className="hover:text-white transition-colors flex items-center gap-1">
              <Instagram size={11} /> <span>INSTAGRAM</span>
            </a>
            <a href="https://linkedin.com" className="hover:text-white transition-colors flex items-center gap-1">
              <Linkedin size={11} /> <span>LINKEDIN</span>
            </a>
            <a href="#hero" className="hover:text-white transition-colors flex items-center gap-1">
              <Globe size={11} /> <span>GLOBAL REGISTER</span>
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}
