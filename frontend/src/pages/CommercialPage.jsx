import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Building2, 
  Sparkles, 
  Stethoscope, 
  Bath, 
  Trash2, 
  Clock,
  CheckCircle,
  Shield,
  Phone,
  Star,
  Users,
  CalendarCheck,
  GraduationCap,
  Landmark,
  Store,
  Download
} from 'lucide-react';
import { companyInfo, commercialServices, images } from '../data/mock';

const iconMap = {
  Building2: Building2,
  Sparkles: Sparkles,
  Stethoscope: Stethoscope,
  Bath: Bath,
  Trash2: Trash2,
  Clock: Clock
};

const CommercialPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={images.commercial}
            alt="Commercial Cleaning Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#66CC33]/20 border border-[#66CC33]/30 rounded-full px-4 py-2 mb-6">
              <Building2 size={16} className="text-[#66CC33]" />
              <span className="text-[#66CC33] text-sm font-medium">Primary Service</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Janitorial Built for <span className="text-[#66CC33]">Long-Term Contracts</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Providing commercial cleaning services for businesses and facilities across the Dallas–North Dallas region. Insured, trained, and accountable — with written scopes, consistent crews, and scalable service agreements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact?intent=walkthrough" className="btn-primary text-lg py-4 px-8" data-testid="commercial-hero-walkthrough-btn">
                Schedule a Walk-Through
                <ArrowRight size={20} />
              </Link>
              <a
                href="/capability-statement.txt"
                download
                className="btn-secondary text-lg py-4 px-8"
                data-testid="commercial-download-capability-btn"
              >
                <Download size={20} />
                Capability Statement
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Bar */}
      <section className="bg-[#191970] py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Shield className="text-[#66CC33]" size={24} />
              <span className="text-white font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-[#66CC33]" size={24} />
              <span className="text-white font-medium">Trained Staff</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-[#66CC33]" size={24} />
              <span className="text-white font-medium">Day/Night Service</span>
            </div>
            <div className="flex items-center gap-3">
              <CalendarCheck className="text-[#66CC33]" size={24} />
              <span className="text-white font-medium">Flexible Schedules</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Comprehensive Facility Services
            </h2>
            <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
              A full suite of commercial cleaning and facility services, delivered through customized cleaning plans that keep your operations running with consistent service visit after visit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commercialServices.map((service) => {
              const Icon = iconMap[service.icon] || Sparkles;
              return (
                <div key={service.id} className="card-dark p-8 group">
                  <div className="w-14 h-14 rounded-xl bg-[#191970] flex items-center justify-center mb-6 group-hover:bg-[#66CC33] transition-colors">
                    <Icon className="text-[#66CC33] group-hover:text-[#0a0a1a] transition-colors" size={28} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>
                  <p className="text-[#a0a0b0] leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Commercial Section */}
      <section className="py-24 bg-[#12122a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={images.team}
                alt="Professional Cleaning Team"
                className="rounded-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#66CC33] rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#0a0a1a] text-[#0a0a1a]" />
                  ))}
                </div>
                <div className="text-[#0a0a1a] font-semibold">Consistently Rated 4.5/5</div>
              </div>
            </div>

            <div>
              <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Your Business Deserves Professional Care
              </h2>
              <p className="text-[#a0a0b0] text-lg mb-8 leading-relaxed">
                A clean workspace isn't just about appearances — it reflects how your business runs. We treat every contract as a long-term relationship: written scopes, consistent crews, and an account manager who picks up the phone.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#66CC33]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-[#66CC33]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Consistent Service, In Writing</h3>
                    <p className="text-[#a0a0b0]">A defined scope-of-work and scheduled cadence — the same standard held every visit across your facility, backed by a real service agreement.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#66CC33]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-[#66CC33]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">One Accountable Partner</h3>
                    <p className="text-[#a0a0b0]">A dedicated account manager, consistent crews, and clear escalation paths — not a rotating cast of subcontractors.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#66CC33]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-[#66CC33]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Zero Operational Disruption</h3>
                    <p className="text-[#a0a0b0]">Flexible day and night scheduling fitted to your facility's operating hours — customized cleaning plans held reliably week after week.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Industries</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Industries We Serve
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: 'Offices', icon: Building2, desc: 'Corporate, professional, and small-to-mid buildings' },
              { name: 'Medical & Dental', icon: Stethoscope, desc: 'Healthcare-compliant cleaning standards' },
              { name: 'Retail', icon: Store, desc: 'Storefronts that stay showroom-ready' },
              { name: 'Educational', icon: GraduationCap, desc: 'Schools, training centers, and learning facilities' },
              { name: 'Government / Municipal', icon: Landmark, desc: 'Public-sector facilities and agencies' }
            ].map((industry, index) => (
              <div key={index} className="card-dark p-8 text-center group">
                <div className="w-16 h-16 rounded-full bg-[#191970] flex items-center justify-center mx-auto mb-6 group-hover:bg-[#66CC33] transition-colors">
                  <industry.icon className="text-[#66CC33] group-hover:text-[#0a0a1a] transition-colors" size={32} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{industry.name}</h3>
                <p className="text-[#a0a0b0] text-sm">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-term Partnership */}
      <section className="py-24 bg-[#12122a]" data-testid="commercial-partnership">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Long-Term Partnerships</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Contracts Built to Last, Not to Churn
              </h2>
              <p className="text-[#a0a0b0] text-lg leading-relaxed mb-6">
                Our commercial clients stay with us for years — not because they have to, but because we show up, document the work, and hold our teams to the same written scope every single visit.
              </p>
              <p className="text-[#a0a0b0] text-lg leading-relaxed">
                We're structured for property managers, office managers, and facility leads who need one accountable partner they can stop thinking about.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { title: 'Written Scope of Work', desc: 'Every cleanable surface, every frequency — in writing before we start.' },
                { title: 'Dedicated Account Manager', desc: 'One number, one person, one response window. No call-tree runaround.' },
                { title: 'Monthly or Quarterly Reviews', desc: 'Scheduled check-ins to tune the scope as your building evolves.' },
                { title: 'Flexible Agreement Terms', desc: 'Month-to-month or annual contracts sized to your facility and budget.' },
                { title: 'Transparent Pricing', desc: 'Fixed monthly pricing with zero surprise line items.' }
              ].map((item) => (
                <div key={item.title} className="card-dark p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#66CC33]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-[#66CC33]" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-[#a0a0b0] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#191970] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#66CC33] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#66CC33] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Elevate Your Workspace?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free, no-obligation walk-through of your facility. We'll assess your needs and provide a customized cleaning plan and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-lg py-4 px-8">
              Schedule a Walk-Through
              <ArrowRight size={20} />
            </Link>
            <a href={`tel:${companyInfo.phone}`} className="btn-secondary text-lg py-4 px-8 border-white text-white hover:bg-white hover:text-[#191970]">
              <Phone size={20} />
              {companyInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommercialPage;
