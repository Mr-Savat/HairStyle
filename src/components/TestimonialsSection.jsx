import React from 'react';
import { SALON_DATA } from '../data/salonData';
import { Sparkles, Star, ShieldCheck } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 bg-[#faf7fd] dark:bg-[#0E0919] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Praise & Stories</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
            Loved By <span className="text-gold-gradient italic font-serif font-normal">Connoisseurs</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-3">
            Read firsthand accounts from our clients across fashion, design, and discerning New York tastemakers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SALON_DATA.testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-white dark:bg-[#160E2A]/70 border border-purple-100 dark:border-stone-800/80 p-8 flex flex-col justify-between hover:border-[#D2C3F6] dark:hover:border-[#D2C3F6]/40 transition-all duration-300 relative group shadow-md dark:shadow-xl"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D2C3F6] text-[#D2C3F6]" />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-stone-500 dark:text-stone-400">Verified Visit</span>
                </div>

                {/* Service Tag */}
                <div className="inline-block px-3 py-1 rounded-lg bg-purple-50/60 dark:bg-stone-950 border border-purple-100 dark:border-stone-800 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold mb-4">
                  {t.service}
                </div>

                {/* Comment */}
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic mb-8">
                  "{t.comment}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-purple-100 dark:border-stone-800/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#D2C3F6]"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-stone-900 dark:text-white text-sm flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
