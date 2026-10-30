import React, { useState } from 'react';
import { SALON_DATA } from '../data/salonData';
import { Sparkles, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-24 bg-[#F5EFFE]/60 dark:bg-[#120B20]/60 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clarity & Guidance</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
            Frequently <span className="text-gold-gradient italic font-serif font-normal">Asked</span> Questions
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-3">
            Everything you need to know about your consultation, appointment prep, and care rituals.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {SALON_DATA.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#160E2A]/70 border border-purple-100 dark:border-stone-800/80 overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-purple-50/40 dark:hover:bg-[#1C1235] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-stone-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-purple-50 dark:bg-stone-900 border border-purple-150 dark:border-stone-800 flex items-center justify-center text-[#8B5CF6] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#D2C3F6]/25 border-[#D2C3F6]/50 text-[#4C2F8A] dark:text-[#D2C3F6]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-purple-100 dark:border-stone-800/60 pt-4 animate-in fade-in duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
