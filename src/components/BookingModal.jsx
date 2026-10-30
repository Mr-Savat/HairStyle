import React, { useState, useEffect } from 'react';
import { SALON_DATA } from '../data/salonData';
import { X, Calendar, Clock, Check, Sparkles, User, Phone, Mail, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({
  isOpen,
  onClose,
  preselectedService = null,
  preselectedStylist = null,
}) {
  const [selectedService, setSelectedService] = useState(preselectedService || SALON_DATA.services[0].name);
  const [selectedStylist, setSelectedStylist] = useState(preselectedStylist || 'Any Senior Artist');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('2:00 PM');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preselectedService) setSelectedService(preselectedService);
    if (preselectedStylist) setSelectedStylist(preselectedStylist);
  }, [preselectedService, preselectedStylist]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dates = ['Today (Late Slot)', 'Tomorrow', 'This Friday', 'This Saturday', 'Next Tuesday'];
  const times = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    // Fire festive celebration confetti!
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#D2C3F6', '#8B5CF6', '#36255C', '#ffffff', '#C084FC'],
    });
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#150D27] border border-purple-100 dark:border-[#36255C] shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden text-stone-900 dark:text-white transition-colors duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-purple-50 dark:bg-stone-950/70 border border-purple-150 dark:border-stone-800 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close Booking Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Title */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D2C3F6]/20 border border-[#D2C3F6]/30 text-[#4C2F8A] dark:text-[#D2C3F6] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Consultation & Reservation</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                Reserve Your Atelier Visit
              </h2>
              <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm mt-1">
                Complimentary welcome beverage, scalp consultation, and customized finish included with all bookings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  Select Desired Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/50 dark:bg-[#1F143B] border border-purple-150 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#D2C3F6] transition-colors"
                >
                  {SALON_DATA.services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.price} • {s.duration})
                    </option>
                  ))}
                  <option value="Bespoke In-Person Consultation">
                    Bespoke In-Person Hair & Color Consultation (Complimentary • 30 min)
                  </option>
                </select>
              </div>

              {/* Stylist Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  Preferred Stylist / Specialist
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['Any Senior Artist', 'Elena Vance', 'Julien Moreau', 'Sora Takahashi'].map((stylist) => (
                    <button
                      type="button"
                      key={stylist}
                      onClick={() => setSelectedStylist(stylist)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                        selectedStylist === stylist
                          ? 'bg-[#D2C3F6]/25 border-[#D2C3F6] text-[#4C2F8A] dark:text-[#D2C3F6] font-bold shadow-sm'
                          : 'bg-purple-50/40 dark:bg-[#1F143B] border-purple-100 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      {stylist}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Preferred Date</span>
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-purple-50/50 dark:bg-[#1F143B] border border-purple-150 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#D2C3F6] transition-colors"
                  >
                    {dates.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Preferred Time</span>
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-purple-50/50 dark:bg-[#1F143B] border border-purple-150 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#D2C3F6] transition-colors"
                  >
                    {times.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2 border-t border-purple-100 dark:border-stone-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Camille Laurent"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-purple-50/50 dark:bg-[#1F143B] border border-purple-150 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#D2C3F6] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-purple-50/50 dark:bg-[#1F143B] border border-purple-150 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#D2C3F6] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="camille@atelier.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-50/50 dark:bg-[#1F143B] border border-purple-150 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#D2C3F6] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                    Hair History / Special Requests
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Previous box dye 6 months ago, fine hair texture"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-50/50 dark:bg-[#1F143B] border border-purple-150 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#D2C3F6] transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full shimmer-btn py-4 rounded-full bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#8B5CF6]/25 hover:shadow-[#D2C3F6]/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Appointment Reservation</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-stone-500 dark:text-stone-400 text-[11px] mt-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>No upfront payment required • Free cancellation up to 48 hours</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-400">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#D2C3F6] text-[#1E1136] flex items-center justify-center mx-auto shadow-2xl shadow-[#8B5CF6]/30">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#6D3ABF] dark:text-[#D2C3F6] font-semibold block mb-1">
                Reservation Confirmed
              </span>
              <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-white">
                We Await Your Visit, {formData.name || 'Valued Guest'}
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-sm mt-2 max-w-md mx-auto">
                A confirmation concierge message and calendar invite have been dispatched to{' '}
                <span className="text-[#6D3ABF] dark:text-[#D2C3F6] font-semibold">{formData.email || 'your email'}</span>.
              </p>
            </div>

            {/* Reservation Summary Card */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-purple-50/50 dark:bg-[#1B1233] border border-purple-100 dark:border-stone-800 text-left space-y-3">
              <div className="flex justify-between text-xs pb-2 border-b border-purple-100 dark:border-stone-850">
                <span className="text-stone-500 dark:text-stone-400">Service</span>
                <span className="font-semibold text-stone-900 dark:text-white">{selectedService}</span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-purple-100 dark:border-stone-850">
                <span className="text-stone-500 dark:text-stone-400">Master Artist</span>
                <span className="font-semibold text-[#6D3ABF] dark:text-[#D2C3F6]">{selectedStylist}</span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-purple-100 dark:border-stone-850">
                <span className="text-stone-500 dark:text-stone-400">Date & Slot</span>
                <span className="font-semibold text-stone-900 dark:text-white">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400">Location</span>
                <span className="font-semibold text-stone-900 dark:text-white">482 Madison Ave, Suite 400, NYC</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
