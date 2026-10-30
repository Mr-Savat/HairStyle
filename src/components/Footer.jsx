import React, { useState } from 'react';
import { SALON_DATA } from '../data/salonData';
import { Scissors, MapPin, Phone, Mail, Clock, ArrowRight, Check } from 'lucide-react';


export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0A0612] border-t border-[#36255C]/50 pt-20 pb-12 relative overflow-hidden">
      {/* Decorative lavender glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#D2C3F6]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1E1338]">
          {/* Brand Info (Col 5) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D2C3F6] via-[#B89CF7] to-[#36255C] flex items-center justify-center text-[#1E1136] shadow-lg shadow-[#D2C3F6]/20">
                <Scissors className="w-4 h-4 -rotate-45" />
              </div>
              <span className="font-display tracking-[0.25em] text-xl font-bold text-white">
                {SALON_DATA.brand.name}
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              {SALON_DATA.brand.tagline} A sanctuary where architectural haircutting meets multidimensional botanical color alchemy.
            </p>

            <div className="space-y-2.5 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D2C3F6] flex-shrink-0" />
                <span>{SALON_DATA.brand.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D2C3F6] flex-shrink-0" />
                <span>{SALON_DATA.brand.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D2C3F6] flex-shrink-0" />
                <span>{SALON_DATA.brand.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a href="#lookbook" className="hover:text-[#D2C3F6] transition-colors">
                  Signature Lookbook
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D2C3F6] transition-colors">
                  Services & Investment
                </a>
              </li>
              <li>
                <a href="#transformation" className="hover:text-[#D2C3F6] transition-colors">
                  Transformation Slider
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-[#D2C3F6] transition-colors">
                  Interactive Style Matcher
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#D2C3F6] transition-colors">
                  The Atelier Difference
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#D2C3F6] transition-colors">
                  Client Praise
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Marketing Hook (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              The Atelier Journal
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe for seasonal hair trends, seasonal booking priority, and receive a{' '}
              <span className="text-[#D2C3F6] font-semibold">$25 gift certificate</span> towards your first transformation.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center rounded-2xl bg-[#140D24] border border-[#36255C]/60 p-1.5 focus-within:border-[#D2C3F6] transition-colors">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder:text-stone-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D2C3F6] to-[#B89CF7] hover:brightness-105 text-[#1E1136] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Claim</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-[#D2C3F6]/15 border border-[#D2C3F6]/30 text-[#D2C3F6] text-xs flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>Thank you! Your $25 welcome certificate is on its way.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} ÉLIXIR Haute Coiffure Atelier LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-300 cursor-pointer">Sanitation Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
