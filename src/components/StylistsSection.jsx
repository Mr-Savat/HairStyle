import React from 'react';
import { SALON_DATA } from '../data/salonData';
import { Sparkles, Scissors, Award, Star, ArrowRight } from 'lucide-react';

export default function StylistsSection({ onOpenBooking }) {
  return (
    <section id="stylists" className="py-24 bg-[#F5EFFE]/60 dark:bg-[#120B20]/60 relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#9B72CF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Artisans</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
            Meet The <span className="text-gold-gradient italic font-serif font-normal">Visionaries</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-3">
            Trained in Paris, London, and Tokyo, our senior stylists bring decades of editorial fashion week prestige to your personal consultation.
          </p>
        </div>

        {/* Master Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SALON_DATA.stylists.map((stylist) => (
            <div
              key={stylist.id}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#150D27] border border-purple-100 dark:border-stone-800/90 hover:border-[#D2C3F6] dark:hover:border-[#D2C3F6]/60 p-7 flex flex-col justify-between transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#8B5CF6]/15 transform hover:-translate-y-1.5"
            >
              {/* Dynamic Sliding Background from Left to Right on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D2C3F6]/20 via-[#BFA5F2]/25 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none" />

              {/* Card Body Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Circular Avatar with Double Luxury Halo Ring */}
                <div className="relative mb-5 group/avatar">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 ring-4 ring-[#D2C3F6]/40 group-hover:ring-[#D2C3F6] transition-all duration-500 shadow-xl bg-purple-50 dark:bg-stone-900">
                    <img
                      src={stylist.avatar}
                      alt={stylist.name}
                      className="w-full h-full rounded-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Experience Badge on Avatar */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-[#22133F] text-[#D2C3F6] text-[10px] font-bold tracking-wider uppercase border border-[#D2C3F6]/40 shadow-lg">
                    {stylist.experience}
                  </div>
                </div>

                {/* Stylist Name & Title */}
                <div className="mt-2 mb-3">
                  <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white group-hover:text-[#6D3ABF] dark:group-hover:text-[#D2C3F6] transition-colors">
                    {stylist.name}
                  </h3>
                  <div className="text-xs uppercase tracking-widest text-[#6D3ABF] dark:text-[#D2C3F6] font-semibold mt-1">
                    {stylist.title}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Specialty: {stylist.specialty}
                  </div>
                </div>

                {/* Accolades Pills */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
                  {stylist.accolades?.map((acc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-purple-50/60 dark:bg-stone-900 border border-purple-100 dark:border-stone-800 text-[10px] font-medium text-stone-600 dark:text-stone-400 group-hover:border-[#D2C3F6]/50 transition-colors"
                    >
                      {acc}
                    </span>
                  ))}
                </div>

                {/* Signature Philosophy Quote */}
                <p className="text-xs text-stone-600 dark:text-stone-300 italic leading-relaxed px-2 py-2 mb-6 border-t border-b border-purple-100 dark:border-stone-800/80">
                  "{stylist.quote}"
                </p>
              </div>

              {/* Action Button */}
              <div className="relative z-10 pt-2">
                <button
                  onClick={() => onOpenBooking(stylist.signatureLook, stylist.name)}
                  className="w-full py-3.5 rounded-full bg-purple-50 hover:bg-gradient-to-r hover:from-[#D2C3F6] hover:to-[#B89CF7] dark:bg-[#1A112E] dark:hover:bg-gradient-to-r dark:hover:from-[#D2C3F6] dark:hover:to-[#B89CF7] text-stone-800 hover:text-[#1E1136] dark:text-stone-200 dark:hover:text-[#1E1136] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-purple-200/80 dark:border-stone-800 hover:border-transparent shadow-sm hover:shadow-lg hover:shadow-[#8B5CF6]/20 cursor-pointer group-hover:scale-[1.02]"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Reserve with {stylist.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
