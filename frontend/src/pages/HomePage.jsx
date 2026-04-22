import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Home,
  Shield,
  CheckCircle,
  Clock,
  Users,
  Sparkles,
  Star,
  Phone,
  Stethoscope,
  Store,
  Briefcase,
  Warehouse,
  CalendarCheck,
  ClipboardList,
  UserCheck
} from 'lucide-react';
import { companyInfo, images, whyChooseUs, testimonials } from '../data/mock';

const iconMap = {
  CheckCircle: CheckCircle,
  Shield: Shield,
  Users: Users,
  Award: CalendarCheck
};

const industries = [
  { name: 'Corporate Offices', icon: Building2, desc: 'Small teams to multi-floor tenants.' },
  { name: 'Medical Offices', icon: Stethoscope, desc: 'Clinics and healthcare suites.' },
  { name: 'Retail Spaces', icon: Store, desc: 'Storefronts that stay showroom-ready.' },
  { name: 'Small Warehouses', icon: Warehouse, desc: 'Light-industrial and flex space.' },
  { name: 'Professional Buildings', icon: Briefcase, desc: 'Law, finance, and consulting firms.' }
];

const authorityPillars = [
  {
    icon: Shield,
    title: 'Insured & Professional Service',
    desc: 'Fully insured and bonded crews — your facility is protected on every visit.'
  },
  {
    icon: UserCheck,
    title: 'Consistent Cleaning Teams',
    desc: 'The same trained team returns week after week. Familiar faces, reliable results.'
  },
  {
    icon: ClipboardList,
    title: 'Customized Cleaning Plans',
    desc: 'A walk-through, a written scope, and a plan tailored to how your building actually runs.'
  },
  {
    icon: CalendarCheck,
    title: 'Reliable Scheduling',
    desc: 'Day or night service, held to a predictable cadence — no surprises, no missed nights.'
  }
];

const HomePage = () => {
  return (
    <div className="overflow-hidden" data-testid="home-page">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center" data-testid="home-hero">
        <div className="absolute inset-0">
          <img src={images.hero} alt="Professional Commercial Cleaning" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#66CC33]/20 border border-[#66CC33]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles size={16} className="text-[#66CC33]" />
              <span className="text-[#66CC33] text-sm font-medium">Commercial Cleaning Since 2005</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Commercial Cleaning <span className="text-[#66CC33]">Your Business Can Count On</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Insured, consistent, and on-schedule janitorial service for offices, medical, retail, and professional buildings across the DFW metroplex — the same trained team, every visit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact?intent=walkthrough" className="btn-primary text-lg py-4 px-8" data-testid="hero-walkthrough-btn">
                Schedule a Walk-Through
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn-secondary text-lg py-4 px-8" data-testid="hero-quote-btn">
                Request a Quote
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Shield className="text-[#66CC33]" size={24} />
                <span className="text-white/80">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="text-[#66CC33]" size={24} />
                <span className="text-white/80">Consistent Teams</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-[#66CC33]" size={24} />
                <span className="text-white/80">Reliable Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services — Commercial lead, Residential secondary */}
      <section className="py-24 bg-[#0a0a1a]" data-testid="home-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Built for Commercial. Trusted in Homes.
            </h2>
            <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
              Our focus is commercial janitorial — the rigor, insurance, and consistency that businesses require. We also serve a select number of residential clients.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Commercial — spans 2 columns */}
            <div className="card-dark group overflow-hidden lg:col-span-2" data-testid="home-commercial-card">
              <div className="relative h-72 overflow-hidden">
                <img src={images.commercial} alt="Commercial Cleaning" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 bg-[#66CC33] text-[#0a0a1a] rounded-full px-4 py-2 font-semibold text-sm">
                    <Building2 size={18} />
                    Primary Focus
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-3xl font-bold text-white mb-4">Commercial Cleaning</h3>
                <p className="text-[#a0a0b0] mb-6 leading-relaxed">
                  Ongoing janitorial programs for offices, medical, retail, and professional buildings. Clear scopes of work, written schedules, and long-term service agreements with a single point of contact.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-3 text-white/80"><CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />Offices &amp; Corporate</div>
                  <div className="flex items-center gap-3 text-white/80"><CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />Medical &amp; Professional</div>
                  <div className="flex items-center gap-3 text-white/80"><CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />Retail &amp; Storefronts</div>
                  <div className="flex items-center gap-3 text-white/80"><CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />Small Warehouses</div>
                </div>
                <Link to="/commercial" className="btn-primary w-full justify-center" data-testid="home-commercial-cta">
                  Explore Commercial Services
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Residential — narrower */}
            <div className="card-dark group overflow-hidden" data-testid="home-residential-card">
              <div className="relative h-72 overflow-hidden">
                <img src={images.residential} alt="Residential Cleaning" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-3 flex items-center gap-3">
                  <Home size={22} className="text-[#66CC33]" />
                  Residential
                </h3>
                <p className="text-[#a0a0b0] mb-6 leading-relaxed text-sm">
                  Recurring, deep, and move-in / move-out cleaning for a select group of homeowners who want the same professional standard as our commercial clients.
                </p>
                <Link to="/residential" className="btn-secondary w-full justify-center text-sm" data-testid="home-residential-cta">
                  Residential Services
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 bg-[#12122a]" data-testid="home-industries">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Industries We Serve</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Purpose-Built for Commercial Spaces
            </h2>
            <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
              Every building runs differently. Our scopes are written to match yours.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.name}
                  className="card-dark p-6 text-center hover:border-[#66CC33]/50 transition-all"
                  data-testid={`industry-card-${industry.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#66CC33]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-[#66CC33]" size={26} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{industry.name}</h3>
                  <p className="text-[#a0a0b0] text-xs leading-relaxed">{industry.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Authority / Standards */}
      <section className="py-24 bg-[#0a0a1a]" data-testid="home-authority">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Our Standards</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              The Operating Standard Behind Every Visit
            </h2>
            <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
              Four non-negotiables that commercial clients have relied on since 2005.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authorityPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="card-dark p-8 hover:border-[#66CC33]/50 transition-all"
                  data-testid={`authority-pillar-${pillar.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#191970] flex items-center justify-center mb-6">
                    <Icon className="text-[#66CC33]" size={28} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{pillar.title}</h3>
                  <p className="text-[#a0a0b0] text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#12122a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Quality Within Reach
              </h2>
              <p className="text-[#a0a0b0] text-lg mb-8 leading-relaxed">
                Since 2005, we've built our reputation on reliability, consistency, and attention to detail. Our trained, insured staff delivers professional results every visit.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {whyChooseUs.map((item) => {
                  const Icon = iconMap[item.icon] || CheckCircle;
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#191970] flex items-center justify-center flex-shrink-0">
                        <Icon className="text-[#66CC33]" size={24} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        <p className="text-[#a0a0b0] text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={images.team} alt="Professional Cleaning Team" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/80 to-transparent" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#191970] rounded-2xl p-6 shadow-xl">
                <div className="text-[#66CC33] text-4xl font-bold">{new Date().getFullYear() - companyInfo.foundedYear}+</div>
                <div className="text-white/80 text-sm">Years Serving DFW</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#66CC33] rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#0a0a1a] text-[#0a0a1a]" />
                  ))}
                </div>
                <div className="text-[#0a0a1a] text-sm font-semibold">4.5/5 Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card-dark p-8">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#66CC33] text-[#66CC33]" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-[#a0a0b0] text-sm">{testimonial.role}</div>
                  <div className="text-[#66CC33] text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#191970] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#66CC33] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#66CC33] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for a Cleaner Workspace?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free walk-through of your facility. We'll deliver a written scope and a straightforward quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact?intent=walkthrough" className="btn-primary text-lg py-4 px-8" data-testid="cta-walkthrough-btn">
              Schedule a Walk-Through
              <ArrowRight size={20} />
            </Link>
            <a href={`tel:${companyInfo.phone}`} className="btn-secondary text-lg py-4 px-8 border-white text-white hover:bg-white hover:text-[#191970]">
              <Phone size={20} />
              Call {companyInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
