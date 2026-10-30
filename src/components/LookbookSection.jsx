import React, { useState, useRef } from 'react';
import { SALON_DATA } from '../data/salonData';
import { Sparkles, Calendar, Eye, Heart, Clock, Info, X, LayoutGrid, MoveHorizontal, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function LookbookSection({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('runway'); // 'runway' (Auto Scroll X) | 'bento' (Bento UI)
  const [likedLooks, setLikedLooks] = useState({});
  const [activeQuickView, setActiveQuickView] = useState(null);

  const runwayRef = useRef(null);

  const categories = [
    { id: 'All', label: 'All Creations', count: SALON_DATA.lookbook.length },
    { id: "Women's Atelier", label: "Women's Atelier", count: SALON_DATA.lookbook.filter(i => i.gender === 'Female').length },
    { id: "Men's Atelier", label: "Men's Atelier", count: SALON_DATA.lookbook.filter(i => i.gender === 'Male').length },
  ];

  const filteredLooks = activeCategory === 'All'
    ? SALON_DATA.lookbook
    : SALON_DATA.lookbook.filter(item => item.category === activeCategory);

  // Double list for seamless infinite horizontal loop in Auto Scroll X mode
  const runwayList = [...filteredLooks, ...filteredLooks];

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedLooks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Check if item should be rendered as a 2-column Wide Split Bento Card
  const isWideFeatureCard = (index, total) => {
    if (total >= 10) {
      return index === 0 || index === 6;
    }
    return index === 0;
  };

  return (
    <section id="lookbook" className="py-24 bg-[#F5EFFE]/70 dark:bg-[#0E0919] relative overflow-hidden transition-colors duration-300">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#9B72CF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Couture Runway Collection</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
              Signature <span className="text-gold-gradient italic font-serif font-normal">Creations</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-2 max-w-xl">
              Explore our editorial showcase featuring male and female atelier models. Choose between the continuous Auto Scroll X runway and modern Bento UI.
            </p>
          </div>

          {/* Clean 2-Style View Mode Switcher */}
          <div className="flex items-center p-1 rounded-full bg-white dark:bg-[#1A112E] border border-purple-200/70 dark:border-[#36255C] shadow-sm self-start md:self-auto">
            <button
              onClick={() => setViewMode('runway')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                viewMode === 'runway'
                  ? 'bg-gradient-to-r from-[#D2C3F6] to-[#B89CF7] text-[#1E1136] shadow-md shadow-[#8B5CF6]/25'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              <MoveHorizontal className="w-3.5 h-3.5" />
              <span>Auto Scroll X</span>
            </button>
            <button
              onClick={() => setViewMode('bento')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                viewMode === 'bento'
                  ? 'bg-gradient-to-r from-[#D2C3F6] to-[#B89CF7] text-[#1E1136] shadow-md shadow-[#8B5CF6]/25'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Bento UI</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#D2C3F6] to-[#B89CF7] text-[#1E1136] font-bold shadow-lg shadow-[#8B5CF6]/20'
                  : 'bg-white dark:bg-[#1A112E] text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border border-purple-100 dark:border-stone-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategory === cat.id
                  ? 'bg-[#1E1136]/15 text-[#1E1136] font-extrabold'
                  : 'bg-stone-200/70 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: AUTO SCROLL X (Horizontal runway with smooth pause-on-hover) */}
      {viewMode === 'runway' && (
        <div className="relative w-full overflow-hidden py-2">
          {/* Subtle side fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#F5EFFE]/95 dark:from-[#0E0919] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#F5EFFE]/95 dark:from-[#0E0919] to-transparent z-20 pointer-events-none" />

          {/* Runway continuous track */}
          <div
            ref={runwayRef}
            className="flex gap-6 overflow-x-auto scrollbar-none px-6 sm:px-12 animate-runway hover:[animation-play-state:paused]"
            style={{ width: 'max-content' }}
          >
            {runwayList.map((item, index) => {
              const isLiked = likedLooks[item.id];
              return (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => setActiveQuickView(item)}
                  className="w-[280px] sm:w-[310px] h-[410px] flex-shrink-0 group relative rounded-3xl overflow-hidden bg-stone-950 border border-purple-200/50 dark:border-[#36255C]/70 hover:border-[#D2C3F6] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#8B5CF6]/20 cursor-pointer transform hover:-translate-y-1.5"
                >
                  {/* Full-bleed Model Photo with crown focus */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                    <div className="px-3 py-1 rounded-full bg-stone-950/75 backdrop-blur-md border border-[#D2C3F6]/30 text-[#D2C3F6] text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 pointer-events-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D2C3F6] animate-pulse" />
                      <span>{item.tag}</span>
                    </div>

                    <button
                      onClick={(e) => toggleLike(item.id, e)}
                      className="w-8 h-8 rounded-full bg-stone-950/70 backdrop-blur-md flex items-center justify-center text-stone-300 hover:text-rose-400 transition-colors shadow-md pointer-events-auto cursor-pointer"
                      aria-label="Save look"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                          isLiked ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Gradient Overlay & Card Info (Compact, luxury, integrated) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 via-35% to-transparent flex flex-col justify-end p-5">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-[#D2C3F6] font-bold tracking-[0.2em] uppercase">
                        <span>{item.gender} • By {item.stylist}</span>
                        <span className="text-stone-300 font-semibold">{item.price}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white tracking-wide truncate group-hover:text-[#D2C3F6] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-stone-300/90 line-clamp-1 font-normal">
                        {item.formula}
                      </p>
                    </div>

                    {/* Hover Action Bar */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveQuickView(item);
                        }}
                        className="py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-white/20 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Quick View</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking(item.title, item.stylist);
                        }}
                        className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#D2C3F6] to-[#B89CF7] text-[#1E1136] font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-[#8B5CF6]/30 transition-all hover:brightness-105 cursor-pointer"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Book Style</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: BENTO UI (Harmonious Asymmetrical Grid with Consistent Image Scale) */}
      {viewMode === 'bento' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLooks.map((item, index) => {
              const isWide = isWideFeatureCard(index, filteredLooks.length);
              const isLiked = likedLooks[item.id];
              const isReverse = index === 6; // alternate photo side for middle wide feature

              // TYPE 1: WIDE FEATURE SPLIT BENTO CARD (2 Columns Wide, perfectly scaled 1-col photo on one side)
              if (isWide) {
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveQuickView(item)}
                    className={`group rounded-3xl overflow-hidden bg-white dark:bg-[#150D27] border border-purple-200/60 dark:border-[#36255C]/80 hover:border-[#D2C3F6] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#8B5CF6]/15 cursor-pointer lg:col-span-2 md:col-span-2 min-h-[440px] flex flex-col ${
                      isReverse ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                    {/* Model Photo Container - identical width & height proportion to single cards */}
                    <div className="w-full md:w-1/2 h-[320px] md:h-auto min-h-[320px] md:min-h-[440px] relative overflow-hidden bg-stone-950 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent md:hidden" />

                      {/* Tag Badge */}
                      <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-[#D2C3F6]/30 text-[#D2C3F6] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D2C3F6] animate-pulse" />
                        <span>Featured Look</span>
                      </div>

                      {/* Like button */}
                      <button
                        onClick={(e) => toggleLike(item.id, e)}
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-950/70 backdrop-blur-md flex items-center justify-center text-stone-300 hover:text-rose-400 transition-colors shadow-md cursor-pointer"
                        aria-label="Save look"
                      >
                        <Heart
                          className={`w-4 h-4 transition-transform active:scale-125 ${
                            isLiked ? 'fill-rose-500 text-rose-500' : ''
                          }`}
                        />
                      </button>

                      {/* Price Pill for Mobile */}
                      <div className="absolute bottom-4 left-4 md:hidden px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-stone-800 text-white text-xs font-bold">
                        <span className="text-[#D2C3F6]">{item.price}</span>
                        <span className="text-stone-400 ml-1.5">• {item.duration}</span>
                      </div>
                    </div>

                    {/* Editorial Story & Specs Side Panel */}
                    <div className="w-full md:w-1/2 p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-white/95 to-purple-50/40 dark:from-[#160E2C] dark:to-[#0F081D]">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] uppercase text-[#6D3ABF] dark:text-[#D2C3F6] mb-1.5">
                          <span>{item.gender} Atelier</span>
                          <span className="text-stone-400 font-medium">By {item.stylist}</span>
                        </div>

                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white leading-tight group-hover:text-[#6D3ABF] dark:group-hover:text-[#D2C3F6] transition-colors">
                          {item.title}
                        </h3>

                        {/* Formulation Highlight Box */}
                        <div className="mt-3 p-3.5 rounded-2xl bg-purple-50/70 dark:bg-stone-950/60 border border-purple-100 dark:border-stone-800/80">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6D3ABF] dark:text-[#D2C3F6] block mb-1">
                            Atelier Formulation
                          </span>
                          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed italic">
                            "{item.formula}"
                          </p>
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                          <div className="p-2.5 rounded-xl bg-white/70 dark:bg-[#110920] border border-purple-100/70 dark:border-stone-850">
                            <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Face Shape</span>
                            <span className="font-semibold text-stone-800 dark:text-stone-200 text-[11px] truncate block mt-0.5">{item.faceShape}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white/70 dark:bg-[#110920] border border-purple-100/70 dark:border-stone-850">
                            <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Maintenance</span>
                            <span className="font-semibold text-stone-800 dark:text-stone-200 text-[11px] truncate block mt-0.5">{item.maintenance}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Bar */}
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-purple-100 dark:border-stone-800">
                        <div className="hidden md:block">
                          <span className="text-lg font-display font-bold text-stone-900 dark:text-white block">
                            {item.price}
                          </span>
                          <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {item.duration}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveQuickView(item);
                            }}
                            className="flex-1 md:flex-none py-2 px-3.5 rounded-full bg-purple-50 hover:bg-purple-100 dark:bg-white/10 dark:hover:bg-white/15 text-stone-700 dark:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenBooking(item.title, item.stylist);
                            }}
                            className="flex-1 md:flex-none py-2 px-4 rounded-full bg-gradient-to-r from-[#D2C3F6] to-[#B89CF7] text-[#1E1136] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Book Look</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // TYPE 2: STANDARD PORTRAIT BENTO CARD (1 Column, natural portrait aspect ratio)
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveQuickView(item)}
                  className="group rounded-3xl overflow-hidden bg-stone-950 border border-purple-200/60 dark:border-[#36255C]/80 hover:border-[#D2C3F6] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#8B5CF6]/15 cursor-pointer col-span-1 min-h-[440px] relative flex flex-col justify-end transform hover:-translate-y-1"
                >
                  {/* Photo with uniform portrait scale and crown alignment */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full absolute inset-0 object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient shadow for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 via-40% to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <div className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-[#D2C3F6]/30 text-[#D2C3F6] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 pointer-events-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D2C3F6] animate-pulse" />
                      <span>{item.tag}</span>
                    </div>

                    <button
                      onClick={(e) => toggleLike(item.id, e)}
                      className="w-8 h-8 rounded-full bg-stone-950/70 backdrop-blur-md flex items-center justify-center text-stone-300 hover:text-rose-400 transition-colors pointer-events-auto cursor-pointer"
                      aria-label="Save look"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                          isLiked ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Bottom Info Content */}
                  <div className="relative z-10 p-5 pointer-events-none">
                    <div className="pointer-events-auto">
                      <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D2C3F6] mb-1 flex items-center gap-1.5">
                        <span>{item.gender} Collection</span>
                        <span>•</span>
                        <span>By {item.stylist}</span>
                      </div>

                      <h3 className="font-display font-bold text-white text-lg tracking-wide line-clamp-1 mb-1 group-hover:text-[#D2C3F6] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-stone-300/85 line-clamp-1 font-normal mb-3">
                        {item.formula}
                      </p>

                      <div className="flex items-center justify-between pt-2.5 border-t border-white/15">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-[#D2C3F6] font-bold text-sm">{item.price}</span>
                          <span className="text-stone-400">•</span>
                          <span className="text-stone-300 flex items-center gap-1 text-[11px]">
                            <Clock className="w-3 h-3 text-stone-400" /> {item.duration}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveQuickView(item);
                            }}
                            className="p-1.5 px-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Inspect</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenBooking(item.title, item.stylist);
                            }}
                            className="p-1.5 px-3 rounded-full bg-gradient-to-r from-[#D2C3F6] to-[#B89CF7] text-[#1E1136] font-bold text-[11px] uppercase tracking-wider shadow-md hover:brightness-105 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>Book</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Atelier Consultation Bento Tile (Fills remaining 2 columns in 'All' or completes the grid) */}
            {activeCategory === 'All' && (
              <div className="group rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C1033] via-[#140D26] to-[#0A0612] border border-[#D2C3F6]/30 p-7 flex flex-col justify-between shadow-xl relative lg:col-span-2 md:col-span-2 min-h-[440px]">
                {/* Ambient glow accent */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#9B72CF]/20 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#D2C3F6] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bespoke Hair Consultation</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
                    Unsure which silhouette harmonizes best with your face shape?
                  </h3>

                  <p className="text-stone-300 text-sm leading-relaxed max-w-lg mb-6">
                    Our Master Stylists evaluate cranial bone structure, hairline growth patterns, and lifestyle maintenance to sculpt your definitive signature look.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                      <div className="text-[#D2C3F6] font-bold text-lg font-display">11 Looks</div>
                      <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Atelier Collection</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                      <div className="text-[#D2C3F6] font-bold text-lg font-display">100% Custom</div>
                      <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Bespoke Formulas</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                      <div className="text-[#D2C3F6] font-bold text-lg font-display">5.0 ★ Rating</div>
                      <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Client Satisfaction</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-[#D2C3F6]" />
                    <span>Complimentary with any Master Color or Precision Cut</span>
                  </div>

                  <button
                    onClick={() => onOpenBooking('Atelier Diagnostic Consultation', 'Elena Vance')}
                    className="py-3 px-6 rounded-full bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#8B5CF6]/25 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Consultation</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW & FORMULA LIGHTBOX MODAL */}
      {activeQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setActiveQuickView(null)}
          />

          <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#170E2C] border border-purple-200 dark:border-[#36255C] shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden text-stone-900 dark:text-white animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setActiveQuickView(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-purple-50 dark:bg-stone-950 border border-purple-200 dark:border-stone-800 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Photo preview */}
              <div className="md:col-span-5 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-purple-100 dark:border-stone-800 bg-stone-950">
                <img
                  src={activeQuickView.image}
                  alt={activeQuickView.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Details & Specs */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{activeQuickView.tag} • Lookbook Exclusive</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                    {activeQuickView.title}
                  </h3>
                  <div className="text-xs text-[#6D3ABF] dark:text-[#D2C3F6] font-semibold mt-1">
                    Crafted by {activeQuickView.stylist}
                  </div>
                </div>

                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {activeQuickView.description}
                </p>

                {/* Formulation breakdown box */}
                <div className="p-4 rounded-2xl bg-[#D2C3F6]/10 dark:bg-[#110922] border border-[#D2C3F6]/25 dark:border-[#36255C] space-y-2">
                  <div className="text-xs font-bold text-[#4C2F8A] dark:text-[#D2C3F6] uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Atelier Color & Cut Formulation</span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 italic">
                    "{activeQuickView.formula}"
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-stone-950 border border-purple-100 dark:border-stone-850">
                    <span className="text-stone-500 dark:text-stone-400 uppercase tracking-wider block text-[10px]">Recommended Face Shapes</span>
                    <span className="font-semibold text-stone-800 dark:text-white mt-0.5 block">{activeQuickView.faceShape}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-stone-950 border border-purple-100 dark:border-stone-850">
                    <span className="text-stone-500 dark:text-stone-400 uppercase tracking-wider block text-[10px]">Maintenance Cycle</span>
                    <span className="font-semibold text-stone-800 dark:text-white mt-0.5 block">{activeQuickView.maintenance}</span>
                  </div>
                </div>

                {/* Stylist insider quote */}
                <p className="text-xs text-stone-500 dark:text-stone-400 italic border-l-2 border-[#D2C3F6] pl-3">
                  Tip: {activeQuickView.stylistNote}
                </p>

                {/* Action button */}
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      setActiveQuickView(null);
                      onOpenBooking(activeQuickView.title, activeQuickView.stylist);
                    }}
                    className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#8B5CF6]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book This Style ({activeQuickView.price})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
