import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';
import { Crown, Sparkles, Briefcase, MapPin, Phone, Mail, MessageCircle, CheckCircle2, Send, ArrowRight } from 'lucide-react';

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: 'Showroom Sales Executive',
    experience: '1-3 Years',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const jobOpenings = [
    {
      id: 1,
      title: 'Showroom Sales Executive (Gold & Diamond)',
      dept: 'Retail Sales',
      type: 'Full Time',
      loc: 'Valaiyal Kadai, Madurai',
      exp: '1 - 5 Years in Jewellery Retail',
      desc: 'Guide wedding families and festive shoppers through traditional 916 gold jewellery, antique harams, and diamond ornaments.'
    },
    {
      id: 2,
      title: 'Master Goldsmith / Karigar (Temple & Antique)',
      dept: 'Craftsmanship & Workshop',
      type: 'Full Time',
      loc: 'Madurai Workshop',
      exp: '3+ Years Experience',
      desc: 'Expertise in traditional casting, filigree work, stone setting, and custom temple motif designs.'
    },
    {
      id: 3,
      title: 'Showroom Cashier & Billing Specialist',
      dept: 'Accounts & Operations',
      type: 'Full Time',
      loc: 'Valaiyal Kadai, Madurai',
      exp: '1 - 3 Years in Retail Billing',
      desc: 'Managing daily cash, POS digital billing, gold rate receipts, and Digi Gold scheme transactions.'
    },
    {
      id: 4,
      title: 'Digi Gold Scheme Customer Relationship Executive',
      dept: 'Customer Support',
      type: 'Full Time',
      loc: 'Madurai Office',
      exp: 'Fresher / 1 Year',
      desc: 'Assist customers with monthly chit scheme enrollment, passbook updates, bonus queries, and WhatsApp support.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppApplication = (jobTitle) => {
    const msg = `Vanakkam Sri Hari Krishna Nagai Maligai! I am applying for the position of "${jobTitle}".\nName: ${formData.name || 'Applicant'}\nPhone: ${formData.phone || ''}\nExperience: ${formData.experience}\nPlease let me know the interview process. Nandri!`;
    return encodeURIComponent(msg);
  };

  return (
    <PageTransition>
      <div className="bg-gradient-to-b from-[#FAF7F2] via-[#F3EBE0] to-[#FAF7F2] min-h-screen pb-24 font-sans text-left text-[#1A0A0C]">
        
        {/* Banner Header */}
        <section className="py-16 bg-[#3B070B] text-white relative overflow-hidden border-b border-brand-gold/30 w-full">
          <Floating3DParticles />
          <div className="w-full px-4 sm:px-8 lg:px-12 text-center relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-brand-maroonLight/80 border border-brand-gold/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-gold-glow">
              <Sparkles size={14} className="text-brand-gold animate-spin-slow" />
              <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest">
                Career Opportunities • Madurai Showroom
              </span>
            </div>
            
            <h1 className="font-cormorant text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
              Grow With Passion, Create With Purpose
            </h1>

            <p className="text-brand-cream font-medium text-sm md:text-base max-w-xl mx-auto font-sans">
              Join the sacred heritage family of Sri Hari Krishna Nagai Maligai in Valaiyal Kadai, Madurai.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-14 space-y-14">
          
          {/* Current Job Openings Grid */}
          <div>
            <div className="text-left space-y-2 mb-8">
              <span className="text-brand-goldDark font-cinzel font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                <Briefcase size={14} /> Open Positions
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-brand-maroon">
                Current Opportunities in Madurai
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobOpenings.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl p-7 border-2 border-brand-gold/30 hover:border-brand-gold shadow-xl flex flex-col justify-between space-y-4 group transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-cormorant text-2xl font-bold text-brand-maroon group-hover:text-brand-goldDark transition-colors">
                        {job.title}
                      </h3>
                      <span className="bg-brand-maroon text-brand-gold text-[10px] font-cinzel font-bold px-2.5 py-1 rounded-full uppercase shrink-0">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-sepia font-sans font-semibold">
                      <span>Department: <b className="text-[#1A0A0C]">{job.dept}</b></span>
                      <span>•</span>
                      <span>Location: <b className="text-[#1A0A0C]">{job.loc}</b></span>
                      <span>•</span>
                      <span>Experience: <b className="text-[#1A0A0C]">{job.exp}</b></span>
                    </div>

                    <p className="text-xs text-[#3A1A1E] font-sans leading-relaxed pt-1">
                      {job.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-gold/20 flex items-center justify-between">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919865045924&text=${generateWhatsAppApplication(job.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-shimmer inline-flex items-center space-x-1.5 bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-5 py-2.5 rounded-xl font-cinzel font-extrabold text-xs uppercase tracking-wider shadow hover:scale-105 transition-transform"
                    >
                      <MessageCircle size={14} />
                      <span>Apply via WhatsApp</span>
                    </a>

                    <a
                      href="mailto:info@sriharikrishnanagaimaligai.com?subject=Job Application"
                      className="text-xs font-sans font-semibold text-brand-maroon hover:text-brand-gold underline"
                    >
                      Email Resume →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Application & HR Contact Card */}
          <div className="bg-gradient-to-b from-[#34070B] via-[#220406] to-[#140204] text-white rounded-3xl p-8 sm:p-12 border-2 border-brand-gold/50 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center space-x-2 text-brand-gold">
                  <Crown size={20} className="text-brand-gold" />
                  <span className="font-cinzel text-xs font-bold uppercase tracking-widest">
                    Direct HR Contact
                  </span>
                </div>
                <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-white">
                  Can't Find a Matching Opening?
                </h3>
                <p className="text-xs sm:text-sm text-brand-cream/90 font-sans leading-relaxed">
                  We are always seeking talented jewellery professionals, sales executives, and skilled karigars. Submit your profile directly to our Madurai showroom management.
                </p>

                <div className="space-y-2 pt-2 text-xs font-sans text-brand-cream/90">
                  <div className="flex items-center space-x-2.5">
                    <MapPin size={16} className="text-brand-gold shrink-0" />
                    <span>Valaiyal Kadai, South Avani Moola Street, Madurai - 625001</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Phone size={16} className="text-brand-gold shrink-0" />
                    <span>Landline: +91 452 4395924 / Mobile: +91 98650 45924</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Mail size={16} className="text-brand-gold shrink-0" />
                    <span>info@sriharikrishnanagaimaligai.com</span>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="lg:col-span-6">
                {submitted ? (
                  <div className="p-8 bg-brand-gold/15 border border-brand-gold/40 rounded-2xl text-center space-y-3">
                    <CheckCircle2 size={40} className="text-brand-gold mx-auto" />
                    <h4 className="font-cormorant text-2xl font-bold text-white">
                      Application Submitted!
                    </h4>
                    <p className="text-xs text-brand-cream font-sans">
                      Thank you! Our showroom HR team will review your details and contact you on <b>+91 {formData.phone}</b>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-black/40 p-6 sm:p-8 rounded-2xl border border-brand-gold/30 space-y-3.5 text-xs font-sans">
                    <h4 className="font-cinzel font-bold text-brand-gold text-xs uppercase tracking-wider mb-2">
                      Submit Your Profile Online
                    </h4>

                    <div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Full Name (முழு பெயர்)"
                        className="w-full bg-black/50 border border-brand-gold/40 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Mobile Number (+91)"
                        className="w-full bg-black/50 border border-brand-gold/40 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address"
                        className="w-full bg-black/50 border border-brand-gold/40 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full bg-black/70 border border-brand-gold/40 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      >
                        <option value="Showroom Sales Executive">Showroom Sales Executive</option>
                        <option value="Master Goldsmith / Karigar">Master Goldsmith / Karigar</option>
                        <option value="Cashier & Billing">Cashier & Billing</option>
                        <option value="Digi Gold Support">Digi Gold Support</option>
                        <option value="Other">Other Position</option>
                      </select>

                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full bg-black/70 border border-brand-gold/40 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      >
                        <option value="Fresher">Fresher (முன் அனுபவம் இல்லை)</option>
                        <option value="1-3 Years">1 - 3 Years</option>
                        <option value="3-5 Years">3 - 5 Years</option>
                        <option value="5+ Years">5+ Years (Senior)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn-shimmer w-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold tracking-widest py-3.5 rounded-xl text-center flex items-center justify-center space-x-2 text-xs uppercase shadow-2xl hover:scale-[1.02] transition-transform"
                    >
                      <Send size={15} />
                      <span>Submit Application →</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
}
