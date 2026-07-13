import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, MessageSquare, 
  Send, ShieldCheck, CheckCircle, Smartphone 
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city || !formData.service) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          service: '',
          message: ''
        });
      } else {
        alert('Something went wrong, please call us directly.');
      }
    } catch (err) {
      alert('Network error. Please try calling us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      title: 'Business Address',
      desc: 'Star Safety Enterprises, 24/18, Nehru Street, Adyar, Chennai - 600020'
    },
    {
      icon: Phone,
      title: 'Telephone Hotline',
      desc: '+91 98402 45678',
      link: 'tel:+919840245678'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Enquiries',
      desc: '+91 98402 45678',
      link: 'https://wa.me/919840245678'
    },
    {
      icon: Mail,
      title: 'Email Address',
      desc: 'info@starsafetyenterprises.com',
      link: 'mailto:info@starsafetyenterprises.com'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      desc: 'Open 24/7 (Monday to Sunday)'
    }
  ];

  return (
    <div className="bg-white font-sans text-slate-700">
      
      {/* Contact Banner */}
      <section className="relative py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200" 
            alt="Contact Star Safety" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-15 select-none"
          />
          <div className="absolute inset-0 bg-primary/95" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Get Connected</span>
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">Contact Star Safety Enterprises</h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
            Reach out for same-day professional site inspections, catalogs, and transparent per-square-foot quote details.
          </p>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left side: Information Box */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Let's Connect</span>
                <h2 className="text-3xl font-display font-black text-primary">Need Safety Nets Installed Today?</h2>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  We answer inquiries around the clock. Whether you need a quick quote via WhatsApp or want to schedule a physical inspection in Chennai, Coimbatore, Trichy, or Madurai—our local crews are ready.
                </p>
              </div>

              {/* Information Cards */}
              <div className="space-y-6">
                {contactDetails.map((det, idx) => {
                  const IconComp = det.icon;
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent flex-shrink-0 mt-1">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-primary mb-1">{det.title}</h4>
                        {det.link ? (
                          <a href={det.link} className="text-xs text-slate-500 hover:text-accent font-semibold transition-colors">
                            {det.desc}
                          </a>
                        ) : (
                          <p className="text-xs text-slate-500 leading-relaxed">{det.desc}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ISO and Certification highlights */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/80 flex items-center gap-3">
                <ShieldCheck className="h-10 w-10 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-display font-bold text-sm text-primary">ISO 9001:2015 Registered Partner</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Every installation includes standard written warranty certificates and safety-load certifications.</p>
                </div>
              </div>
            </div>

            {/* Right side: Interactive Quote Form */}
            <div className="bg-slate-50/50 rounded-3xl border border-slate-100 p-8 shadow-sm">
              <h3 className="font-display font-black text-primary text-xl tracking-tight mb-2">Send Us an Enquiry</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">Fill out your contact details and safety requirements. Our local operations team will contact you within 2 hours with an estimate.</p>

              {success ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-4 animate-scaleIn">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h4 className="font-display font-bold text-primary text-base">Enquiry Sent Successfully!</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">Thank you for contacting Star Safety Enterprises. Our technician will review your request and call you shortly to arrange a free visit.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="bg-accent hover:bg-accent-light text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Your Full Name <span className="text-rose-400">*</span></label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Rajesh Kumar"
                        className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Mobile Number <span className="text-rose-400">*</span></label>
                      <input 
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g., +91 9840245678"
                        className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Email (Optional)</label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@gmail.com"
                        className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Your City <span className="text-rose-400">*</span></label>
                      <select 
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs text-primary focus:outline-none focus:border-accent font-semibold"
                      >
                        <option value="">Select Location</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Trichy">Trichy</option>
                        <option value="Salem">Salem</option>
                        <option value="Hosur">Hosur</option>
                        <option value="Tirunelveli">Tirunelveli</option>
                        <option value="Other">Other City (TN)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Required Service <span className="text-rose-400">*</span></label>
                    <select 
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-white border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs text-primary focus:outline-none focus:border-accent font-semibold"
                    >
                      <option value="">Select Safety Net Type</option>
                      <option value="Balcony Safety Nets">Balcony Safety Nets</option>
                      <option value="Pigeon Safety Nets">Pigeon Safety Nets</option>
                      <option value="Bird Protection Nets">Bird Protection Nets</option>
                      <option value="Children Safety Nets">Children Safety Nets</option>
                      <option value="Construction Safety Nets">Construction Safety Nets</option>
                      <option value="Coconut Tree Safety Nets">Coconut Tree Safety Nets</option>
                      <option value="Other Services">Other Netting Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Custom Message (Optional)</label>
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g., Balcony size is 12x4 feet. Need transparent monofilament wires."
                      className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-bold text-sm py-3.5 rounded-xl shadow-lg hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                    <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10">{isSubmitting ? 'Sending inquiry...' : 'Submit Enquiry'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Visual Google Maps Block Section */}
      <section className="h-96 w-full relative bg-slate-100 border-t border-slate-200">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
            alt="Map location backdrop" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale opacity-25 select-none"
          />
          {/* Custom mock map grid elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary text-white p-6 rounded-2xl shadow-2xl border border-white/10 max-w-sm text-center space-y-3 relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-white p-3 rounded-full shadow-lg">
                <MapPin className="h-6 w-6 animate-bounce" />
              </div>
              <h4 className="font-display font-black text-sm uppercase tracking-wide pt-4">Adyar Headquarters</h4>
              <p className="text-xs text-slate-300">Star Safety Enterprises, Nehru Street, Adyar, Chennai. Serving all districts across Tamil Nadu.</p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-xs font-mono font-bold text-accent hover:underline"
              >
                Get Directions in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
