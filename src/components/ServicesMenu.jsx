import React, { useState } from 'react';
import { SALON_DATA } from '../data/salonData';
import { Sparkles, Clock, Check, Calendar, ArrowRight } from 'lucide-react';

export default function ServicesMenu({ onOpenBooking }) {
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Cuts & Styling', 'Color & Lightening', 'Scalp & Rituals'];

  const filteredServices = selectedCat === 'All'
    ? SALON_DATA.services
    : SALON_DATA.services.filter(s => s.category === selectedCat);

  return (
    <section id="services" className="py-24 bg-[#F5EFFE]/60 dark:bg-[#120B20]/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Menu & Investment</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
            Transparent <span className="text-gold-gradient italic font-serif font-normal">Pricing</span> & Services
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-3">
            Every appointment includes our bespoke consultation, luxury botanical wash, hot towel neck ritual, and signature Dyson finishing.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] font-bold shadow-lg shadow-[#8B5CF6]/20 scale-105'
                    : 'bg-white dark:bg-[#1A112E] text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border border-purple-100 dark:border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative group ${
                service.popular
                  ? 'bg-white dark:bg-[#160E2A]/90 border-2 border-[#D2C3F6] dark:border-[#D2C3F6]/60 shadow-2xl shadow-[#8B5CF6]/15'
                  : 'bg-white dark:bg-[#160E2A]/60 border border-purple-100 dark:border-stone-800 hover:border-[#D2C3F6]/50 shadow-lg'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#D2C3F6] to-[#B89CF7] text-[#1E1136] font-bold text-[10px] uppercase tracking-widest shadow-md">
                  Most Requested
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 font-medium">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white group-hover:text-[#6D3ABF] dark:group-hover:text-[#D2C3F6] transition-colors">
                  {service.name}
                </h3>

                <div className="text-2xl font-bold font-display text-gold-gradient mt-2 mb-4">
                  {service.price}
                </div>

                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-2 border-t border-purple-100 dark:border-stone-800/80 pt-4 mb-6">
                  {service.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6] flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(service.name)}
                className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  service.popular
                    ? 'shimmer-btn bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] shadow-lg shadow-[#8B5CF6]/20 hover:scale-[1.02]'
                    : 'bg-purple-50/60 hover:bg-purple-100 dark:bg-[#1A112E] dark:hover:bg-[#251842] text-stone-800 dark:text-stone-200 border border-purple-150 dark:border-stone-800 hover:border-[#D2C3F6]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Appointment</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
