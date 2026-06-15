"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';
import { toast } from 'sonner';

export default function ContactUs() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const openCalculator = useCallback(() => setCalculatorOpen(true), []);
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: 'contact'
        })
      });

      const data = await res.json();
      if (data.success) {
        setFormSubmitted(true);
        toast.success('Inquiry submitted successfully!');
      } else {
        toast.error(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/773690993?text=Hi%21+I%27d+like+to+ask+a+question+about+your+visa+and+legal+services.', '_blank');
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Get In Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-4">
              Contact <span className="text-[#009B3A]">Us</span>.
            </h1>
            <p className="text-base text-[#4B5563]">
              Have questions about visa fees, document attestation, or remote notarization? Reach out to our team online or visit our office. We are here to assist.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details Card */}
            <div className="bg-[#F0FAF4] rounded-3xl p-8 border border-emerald-100/30 flex flex-col justify-between">
              <div>
                <SectionBadge text="Contact Info" gold />
                <h3 className="text-xl font-bold text-[#111827] mt-3 mb-6">EmiratesVisa.ae Support</h3>
                <div className="space-y-6">
                  <a href="tel:773690993" className="flex items-center gap-4 text-[#111827] hover:text-[#009B3A] transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#009B3A] shadow-sm shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">Toll-Free Phone</p>
                      <p className="text-base font-semibold">800 DOCS (3627)</p>
                    </div>
                  </a>
                  <a href="mailto:info@emiratesvisa.ae" className="flex items-center gap-4 text-[#111827] hover:text-[#009B3A] transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#009B3A] shadow-sm shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">Email Inquiry</p>
                      <p className="text-base font-semibold">info@emiratesvisa.ae</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 text-[#111827]">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#009B3A] shadow-sm shrink-0 mt-0.5">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">Office Address</p>
                      <p className="text-sm font-semibold leading-relaxed">
                        709 Business Village B Block,<br />
                        Next to Clock Tower, Port Saeed,<br />
                        Deira, Dubai, UAE
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={openWhatsApp} className="w-full py-4 mt-8 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full font-semibold transition-colors shadow-sm flex items-center justify-center gap-2">
                <MessageCircle size={20} fill="white" /> Contact on WhatsApp
              </button>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <SectionBadge text="Inquiry Form" gold />
              <h3 className="text-xl font-bold text-[#111827] mt-3 mb-6">Send us a message</h3>
              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center text-[#009B3A]">
                  <CheckCircle size={48} className="mx-auto mb-4" />
                  <h4 className="text-lg font-bold mb-2">Message Sent Successfully!</h4>
                  <p className="text-sm text-emerald-800">Thank you for reaching out. A representative will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#009B3A] focus:bg-white text-sm text-[#111827]"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#009B3A] focus:bg-white text-sm text-[#111827]"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#009B3A] focus:bg-white text-sm text-[#111827]"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">Your Message</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#009B3A] focus:bg-white text-sm text-[#111827]"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-[#EF3340] hover:bg-[#D62B35] disabled:bg-gray-400 text-white rounded-full font-semibold transition-colors shadow-md flex items-center gap-2">
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onCalculator={openCalculator} />
      <VisaCalculator isOpen={calculatorOpen} onClose={closeCalculator} />
    </div>
  );
}
