import React, { useState } from 'react';
import { Compass, Sparkles, Check, ArrowRight, RotateCcw, Calendar, Scissors, Clock } from 'lucide-react';

export default function StyleQuiz({ onOpenBooking }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    length: '',
    vibe: '',
    maintenance: '',
  });

  const steps = [
    {
      id: 'length',
      title: 'What is your current hair length?',
      subtitle: 'Select the option closest to your current style',
      options: [
        { label: 'Chin Length / Bob', value: 'short', icon: '✂️', desc: 'Above or at jawline' },
        { label: 'Shoulder / Collarbone', value: 'medium', icon: '✨', desc: 'Grazing shoulders' },
        { label: 'Long & Flowing', value: 'long', icon: '💫', desc: 'Mid-back or below' },
        { label: 'Natural Curls / Coils', value: 'curls', icon: '🌀', desc: 'Any length, rich texture' },
      ],
    },
    {
      id: 'vibe',
      title: 'What is your dream transformation goal?',
      subtitle: 'What feeling or aesthetic are you looking to achieve?',
      options: [
        { label: 'Sun-Kissed Dimensional Glow', value: 'balayage', icon: '☀️', desc: 'Lived-in warm caramel or blonde ribbons' },
        { label: 'Effortless French Girl Bob', value: 'bob', icon: '🇫🇷', desc: 'Textured movement, soft curtain bangs' },
        { label: 'Mirror-Glass Gloss & Hydration', value: 'gloss', icon: '💎', desc: 'Ultra-reflective tone, zero brass, deep silk' },
        { label: 'Scalp Reset & Deep Repair', value: 'spa', icon: '🌿', desc: 'Japanese botanical steam & follicle wellness' },
      ],
    },
    {
      id: 'maintenance',
      title: 'What is your daily styling routine preference?',
      subtitle: 'We design your shape around how you live',
      options: [
        { label: 'Low Effort Air-Dry', value: 'low', icon: '☕', desc: '5 mins, wake up and go' },
        { label: 'Moderate Styling', value: 'mid', icon: '💨', desc: '15 min quick rough-dry & texturizer' },
        { label: 'High Glam Runway Finish', value: 'high', icon: '👑', desc: 'Full bouncy blowout & polished waves' },
      ],
    },
  ];

  const handleSelect = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(steps.length);
    }
  };

  const resetQuiz = () => {
    setAnswers({ length: '', vibe: '', maintenance: '' });
    setCurrentStep(0);
  };

  const getRecommendation = () => {
    if (answers.vibe === 'bob' || answers.length === 'short') {
      return {
        title: "The Parisian Textured Bob & Curtain Fringe",
        serviceId: "french-bob",
        serviceName: "The Parisian Textured Bob",
        stylist: "Julien Moreau",
        stylistRole: "Editorial Cut Specialist",
        duration: "1 hr 30 min",
        price: "$145 – $195",
        image: "/french_bob.jpg",
        description: "A tailored jawline silhouette with internal weight removal. Designed for effortless texture that falls into place naturally with minimal blow-drying.",
        whyMatch: "Perfect for your lifestyle—gives you elevated chic geometry while requiring under 10 minutes of morning styling.",
      };
    } else if (answers.vibe === 'spa') {
      return {
        title: "Japanese Botanical Scalp Spa & Precision Trim",
        serviceId: "scalp-spa",
        serviceName: "Japanese Botanical Scalp Spa",
        stylist: "Sora Takahashi",
        stylistRole: "Trichology & Scalp Wellness Director",
        duration: "1 hr 15 min",
        price: "$165 – $210",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        description: "Micro-camera diagnostics paired with organic herbal scalp detox, hydro-mist steam therapy, and tension-melting cranial shiatsu massage.",
        whyMatch: "Restores scalp vitality at the root, delivering optimal follicle oxygenation and high-gloss hair density.",
      };
    } else {
      return {
        title: "Signature French Balayage & Liquid Glaze",
        serviceId: "balayage-luxe",
        serviceName: "The Signature French Balayage",
        stylist: "Elena Vance",
        stylistRole: "Master Colorist & Creative Director",
        duration: "3 hrs 30 min",
        price: "$280 – $360",
        image: "/balayage_after.jpg",
        description: "Bespoke hand-painted dimensional highlights that blend seamlessly from your natural root, finished with a luminous gloss glaze and bond repair.",
        whyMatch: "Offers a gorgeous high-impact glow with ultra low-maintenance grow-out (only needs a refresh every 16–20 weeks).",
      };
    }
  };

  const isCompleted = currentStep >= steps.length;
  const result = isCompleted ? getRecommendation() : null;

  return (
    <section id="quiz" className="py-24 bg-[#F5EFFE]/60 dark:bg-[#120B20]/60 relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Consultation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
            Find Your <span className="text-gold-gradient italic font-serif font-normal">Signature</span> Look
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-3">
            Answer 3 quick questions to discover your personalized cut, color palette, and matching master stylist.
          </p>
        </div>

        {/* Quiz Card Box */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-white dark:bg-[#180F2E]/90 backdrop-blur-xl border border-purple-100 dark:border-[#36255C]/70 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          {/* Progress Bar */}
          {!isCompleted && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2 font-medium">
                <span>Question {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-purple-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#36255C] via-[#8B5CF6] to-[#D2C3F6] transition-all duration-500 rounded-full"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Questions Render */}
          {!isCompleted ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-white mb-2">
                  {steps[currentStep].title}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {steps[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(steps[currentStep].id, opt.value)}
                    className="p-5 rounded-2xl bg-purple-50/40 dark:bg-[#1F143B]/60 hover:bg-purple-100/50 dark:hover:bg-[#27194A]/80 border border-purple-100 dark:border-stone-800 hover:border-[#D2C3F6] dark:hover:border-[#D2C3F6]/60 text-left transition-all group hover:scale-[1.01] active:scale-[0.99] flex items-start gap-4 cursor-pointer"
                  >
                    <span className="text-2xl p-2.5 rounded-xl bg-white dark:bg-[#120B20] border border-purple-150 dark:border-stone-800 group-hover:border-[#D2C3F6] transition-colors shadow-sm">
                      {opt.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-stone-900 dark:text-white group-hover:text-[#6D3ABF] dark:group-hover:text-[#D2C3F6] transition-colors">
                        {opt.label}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center pb-4 border-b border-stone-200 dark:border-stone-800">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Prescribed Style Profile</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                  {result.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-xl mx-auto">
                  {result.whyMatch}
                </p>
              </div>

              {/* Matched Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 aspect-[4/5] rounded-2xl overflow-hidden border border-purple-100 dark:border-stone-800 shadow-xl">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 space-y-4">
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {result.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-purple-50/40 dark:bg-[#1B1233] border border-purple-100 dark:border-stone-800">
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Est. Duration</span>
                      <span className="text-sm font-semibold text-stone-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        {result.duration}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-50/40 dark:bg-[#1B1233] border border-purple-100 dark:border-stone-800">
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Investment</span>
                      <span className="text-sm font-semibold text-[#6D3ABF] dark:text-[#D2C3F6] mt-0.5 block">
                        {result.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50/40 dark:bg-[#1B1233] border border-purple-100 dark:border-stone-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Recommended Senior Artist</span>
                      <span className="text-sm font-semibold text-stone-900 dark:text-white">{result.stylist}</span>
                      <span className="text-xs text-stone-500 dark:text-stone-400 block">{result.stylistRole}</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#D2C3F6]/25 text-[#4C2F8A] dark:text-[#D2C3F6] flex items-center justify-center font-bold text-xs">
                      <Scissors className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => onOpenBooking(result.serviceName, result.stylist)}
                      className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#8B5CF6]/25 hover:shadow-[#D2C3F6]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book This Prescription</span>
                    </button>

                    <button
                      onClick={resetQuiz}
                      className="px-4 py-3 rounded-full bg-purple-100 dark:bg-[#1B1233] hover:bg-purple-200 dark:hover:bg-[#27194A] text-stone-700 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
