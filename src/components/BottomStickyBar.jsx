import React, { useState, useEffect } from 'react';
import { Sparkles, X, Gift } from 'lucide-react';

export default function BottomStickyBar({ onOpenBooking }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 480) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm hidden sm:block animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 rounded-2xl bg-white/95 dark:bg-[#150D27]/95 backdrop-blur-xl border border-[#D2C3F6]/40 shadow-2xl shadow-black/30 dark:shadow-black/80 flex items-center justify-between gap-3.5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#D2C3F6]/20 text-[#8B5CF6] dark:text-[#D2C3F6] border border-[#D2C3F6]/30 flex-shrink-0">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900 dark:text-white tracking-wide flex items-center gap-1.5">
              <span>First Visit Exclusive</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-[#D2C3F6] to-[#B89CF7] text-[#1E1136] font-black">
                FREE SPA
              </span>
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-0.5">
              Complimentary scalp ritual with any cut & color
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onOpenBooking()}
            className="shimmer-btn px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            Claim
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-white rounded-lg hover:bg-purple-50 dark:hover:bg-[#1E143B] transition-colors cursor-pointer"
            aria-label="Dismiss offer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
