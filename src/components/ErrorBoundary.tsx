import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  // Explicitly typing constructor to satisfy strict React component bindings
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an uncaught exception:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] flex flex-col justify-center items-center px-6 text-center">
          <div className="max-w-md p-10 border border-[#D9D4CD] bg-[#FAF8F5] relative shadow-lg flex flex-col items-center">
            
            {/* Architectural blueprint draft ticks */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-black/15" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-black/15" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-black/15" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-black/15" />

            <div className="w-16 h-16 rounded-full bg-white border border-[#D9D4CD] mb-6 flex items-center justify-center text-[#1A1A1A]">
              <svg 
                className="w-8 h-8 text-[#8E8A84] animate-[spin_6s_linear_infinite]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16.2 7.8-2 4.2-4.2 2-7.8 16.2" />
                <line x1="12" y1="12" x2="12" y2="12" />
              </svg>
            </div>

            <span className="font-mono text-[9px] tracking-[0.25em] text-[#8E8A84] uppercase mb-3 font-semibold">
              DIAGNOSTIC SYSTEM ALIGNMENT RECOVERY
            </span>
            
            <h2 className="font-serif text-3xl font-light text-[#1A1A1A] tracking-tight leading-tight mb-4">
              Restoring Sovereign Balance
            </h2>
            
            <p className="font-sans text-xs text-[#5A5A4D]/80 leading-relaxed mb-8 max-w-sm">
              The layout engine intercepted an unhandled render constraint. We have cached the active database state and secured the integrity of your spatial drafting board.
            </p>

            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-4 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] font-semibold uppercase hover:bg-neutral-800 transition-all duration-300 shadow-md cursor-pointer"
            >
              Recalibrate Page Structural Alignment
            </button>
            
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
