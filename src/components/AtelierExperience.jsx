import React from 'react';
import { Sparkles, Coffee, Shield, Wind, Microscope } from 'lucide-react';

export default function AtelierExperience() {
  const features = [
    {
      icon: <Coffee className="w-6 h-6 text-[#8B5CF6]" />,
      title: "Private Suites & Complimentary Bar",
      description: "Enjoy peaceful private consultation pods with complimentary artisanal Italian espresso, matcha lattes, and curated organic champagne.",
      colSpan: "lg:col-span-7",
    },
    {
      icon: <Wind className="w-6 h-6 text-[#8B5CF6]" />,
      title: "Dyson Pro Acoustic Tech",
      description: "State-of-the-art intelligent heat control protects hair cuticle integrity while maintaining a whisper-quiet, serene salon ambiance.",
      colSpan: "lg:col-span-5",
    },
    {
      icon: <Microscope className="w-6 h-6 text-[#8B5CF6]" />,
      title: "Trichology Scalp Camera Analysis",
      description: "Every scalp ritual begins with 200x optical magnification diagnostics to assess follicle health, sebum balance, and hair density.",
      colSpan: "lg:col-span-5",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#8B5CF6]" />,
      title: "Davines & Oribe Botanical Luxury",
      description: "We exclusively formulate with certified B-Corp, clean, cruelty-free botanicals rich in essential phyto-proteins and antioxidant oils.",
      colSpan: "lg:col-span-7",
    },
  ];

  return (
    <section id="experience" className="py-24 bg-[#faf7fd] dark:bg-[#0E0919] relative overflow-hidden transition-colors duration-300">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9B72CF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#36255C]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Atelier Difference</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
            An Oasis Of <span className="text-gold-gradient italic font-serif font-normal">Quiet Luxury</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-3">
            We reimagined the modern salon experience as an intimate sanctuary where artistry, clean science, and sensory comfort converge.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className={`${feat.colSpan} p-8 rounded-3xl bg-white dark:bg-[#160E2A]/70 hover:bg-purple-50/40 dark:hover:bg-[#1C1235] border border-purple-100 dark:border-stone-800/80 hover:border-[#D2C3F6] dark:hover:border-[#D2C3F6]/50 transition-all duration-300 shadow-lg dark:shadow-xl flex flex-col justify-between group`}
            >
              <div className="p-3.5 w-fit rounded-2xl bg-[#D2C3F6]/15 dark:bg-[#100A1E] border border-[#D2C3F6]/25 dark:border-stone-800 group-hover:border-[#D2C3F6] group-hover:scale-105 transition-all mb-6">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white group-hover:text-[#6D3ABF] dark:group-hover:text-[#D2C3F6] transition-colors mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
