import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Calendar, ArrowLeftRight, CheckCircle2, Shield } from 'lucide-react';

export default function TransformationSlider({ onOpenBooking }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  return (
    <section id="transformation" className="py-24 bg-[#faf7fd] dark:bg-[#0e0919] relative overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9B72CF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Results • The Transformation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white uppercase tracking-tight mb-4">
            Witness The <span className="text-gold-gradient italic font-serif font-normal">Metamorphosis</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg">
            Slide horizontally to experience the seamless dimensional elevation from grown-out dull brass to radiant sun-kissed French balayage.
          </p>
        </div>

        {/* Comparison Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Interactive Slider Container (Col 7) */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 select-none cursor-ew-resize group"
              onMouseDown={handleMouseDown}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* "AFTER" Image (Full background) */}
              <img
                src="/balayage_after.jpg"
                alt="Balayage Transformation After"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* "AFTER" Badge */}
              <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-[#D2C3F6]/40 text-[#D2C3F6] text-xs font-bold uppercase tracking-wider shadow-lg">
                After: Radiant Balayage
              </div>

              {/* "BEFORE" Image Layer (Clipped by slider position) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="/balayage_before.jpg"
                  alt="Hair Before Makeover"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{
                    width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
                    height: '100%',
                  }}
                />
                {/* "BEFORE" Badge */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-700 text-stone-300 text-xs font-bold uppercase tracking-wider shadow-lg">
                  Before: Dull & Faded
                </div>
              </div>

              {/* Draggable Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#D2C3F6] z-20 shadow-[0_0_18px_rgba(210,195,246,0.9)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#D2C3F6] text-[#22133F] flex items-center justify-center shadow-2xl font-bold border-2 border-[#36255C] group-hover:scale-110 transition-transform">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
              </div>

              {/* Drag instruction overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-stone-950/70 backdrop-blur-md text-[11px] text-stone-300 tracking-wider uppercase border border-stone-800">
                Drag slider to compare
              </div>
            </div>
          </div>

          {/* Transformation Details & Breakdown (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="p-8 rounded-3xl bg-white dark:bg-stone-900/60 backdrop-blur-xl border border-purple-100 dark:border-stone-800/90 shadow-2xl space-y-6">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
                <span className="text-xs uppercase tracking-[0.25em] text-[#6D3ABF] dark:text-[#D2C3F6] font-semibold">Case Study #0412</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
                  Dimensional Honey Balayage & Face-Framing
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">
                  Client arrived with 6 months of faded brassy balayage and uneven porosity. We executed a full bond-protected corrective balayage with custom demi-permanent glaze.
                </p>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Duration</span>
                  <span className="text-sm font-semibold text-stone-900 dark:text-white">3h 30m in Salon</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Master Stylist</span>
                  <span className="text-sm font-semibold text-[#6D3ABF] dark:text-[#D2C3F6]">Elena Vance</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Technique</span>
                  <span className="text-sm font-semibold text-stone-900 dark:text-white">French Balayage + Glaze</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Maintenance</span>
                  <span className="text-sm font-semibold text-stone-900 dark:text-white">16 - 20 Weeks</span>
                </div>
              </div>

              {/* Benefit highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
                  <span>Zero line of demarcation for effortless grow-out</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
                  <span>Infused with botanical Olaplex bond repair</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
                  <span>Custom glazed to harmonize with golden skin undertones</span>
                </div>
              </div>

              {/* Conversion Call to action */}
              <div className="pt-4">
                <button
                  onClick={() => onOpenBooking('The Signature French Balayage')}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#8B5CF6]/25 hover:shadow-[#D2C3F6]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Exact Look</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
