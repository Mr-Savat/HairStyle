import React from 'react';
import { Sparkles, ArrowRight, Star, Award, ShieldCheck, Compass } from 'lucide-react';

export default function HeroSection({
  videoRef,
  onOpenBooking,
  isAudioMuted,
}) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/vd-hair-style.mp4"
          autoPlay
          loop
          muted={isAudioMuted}
          playsInline
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-[1.03] transition-transform duration-700"
        />

        {/* Sophisticated Multi-layer Cinematic Overlays */}
        {/* 1. Deep vignette around edges */}
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/40 to-stone-950/90 pointer-events-none" />

        {/* 2. Top-down dark fade for navbar legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/30 to-stone-950 pointer-events-none" />

        {/* 3. Subtle ambient lavender-violet light wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#9B72CF]/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* Main Editorial Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase leading-[1.08] mb-6 drop-shadow-2xl">
          Sculpting <span className="text-gold-gradient italic font-serif font-normal">Confidence.</span>
          <br />
          <span className="tracking-wide">Defining Your Style.</span>
        </h1>

        {/* Value Proposition Description */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-stone-200/90 font-light leading-relaxed mb-10 drop-shadow-md">
          Where Parisian precision cuts meet multidimensional balayage artistry.
          Immerse yourself in bespoke hair craft, restorative botanical scalp rituals, and uncompromising luxury.
        </p>

        {/* High-Converting Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto shimmer-btn px-8 py-4 rounded-full bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] font-bold text-sm tracking-wider uppercase shadow-xl shadow-[#8B5CF6]/30 hover:shadow-[#D2C3F6]/50 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>Reserve Your Transformation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#quiz"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-stone-900/80 hover:bg-stone-850/90 backdrop-blur-md border border-stone-700/80 hover:border-[#D2C3F6]/60 text-white font-medium text-sm tracking-wider uppercase shadow-lg hover:shadow-stone-900/50 transition-all flex items-center justify-center gap-2.5 group"
          >
            <Compass className="w-4 h-4 text-[#D2C3F6] group-hover:rotate-45 transition-transform" />
            <span>Interactive Style Matcher</span>
          </a>
        </div>

        {/* Social Proof Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-stone-800/80 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D2C3F6]/10 border border-[#D2C3F6]/25 text-[#D2C3F6]">
              <Star className="w-5 h-5 fill-[#D2C3F6]" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-white">4.9 / 5.0</div>
              <div className="text-xs text-stone-400">1,400+ Verified Reviews</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D2C3F6]/10 border border-[#D2C3F6]/25 text-[#D2C3F6]">
              <Award className="w-5 h-5 text-[#D2C3F6]" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-white">15+ Artists</div>
              <div className="text-xs text-stone-400">Editorial & Vogue Veterans</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D2C3F6]/10 border border-[#D2C3F6]/25 text-[#D2C3F6]">
              <ShieldCheck className="w-5 h-5 text-[#D2C3F6]" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-white">100% Organic</div>
              <div className="text-xs text-stone-400">Botanical Davines & Oribe</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D2C3F6]/10 border border-[#D2C3F6]/25 text-[#D2C3F6]">
              <Sparkles className="w-5 h-5 text-[#D2C3F6]" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-white">Private Suites</div>
              <div className="text-xs text-stone-400">Espresso & Champagne Bar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Subtle Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-stone-500/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 rounded-full bg-[#D2C3F6] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
