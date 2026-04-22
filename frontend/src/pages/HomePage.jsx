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
  GraduationCap,
  Landmark,
  ClipboardList,
  UserCheck,
  CalendarCheck,
  BarChart3,
  Scaling,
  Download,
  MapPin,
  FileSearch,
  PenTool,
  Repeat
} from 'lucide-react';
import { companyInfo, images, testimonials } from '../data/mock';

const industries = [
  { name: 'Offices', icon: Building2 },
  { name: 'Medical & Dental', icon: Stethoscope },
  { name: 'Retail', icon: Store },
  { name: 'Educational', icon: GraduationCap },
  { name: 'Government / Municipal', icon: Landmark }
];

const contractReady = [
  { icon: Shield, title: 'Insured Operations', desc: 'Fully insured and bonded — your facility is protected on every visit.' },
  { icon: UserCheck, title: 'Trained Staff', desc: 'Documented onboarding, recurring training, and consistent crews.' },
  { icon: CalendarCheck, title: 'Reliable Scheduling', desc: 'Day or night cadence held week after week — no missed nights.' },
  { icon: BarChart3, title: 'Quality Control', desc: 'Supervisor walk-throughs and scheduled client reviews, in writing.' },
  { icon: Scaling, title: 'Scalable Services', desc: 'Scope grows with your footprint — one accountable partner across sites.' }
];

const processSteps = [
  { icon: FileSearch, step: 'Step 1', title: 'Schedule Walk-Through', desc: 'We tour your facility, listen to your priorities, and map the scope.' },
  { icon: PenTool, step: 'Step 2', title: 'Customized Plan', desc: 'Written scope of work, schedule, and fixed monthly pricing — reviewed with you.' },
  { icon: Repeat, step: 'Step 3', title: 'Ongoing Service', desc: 'Dedicated crews, supervisor checks, and quarterly reviews to tune the plan.' }
];

const serviceCities = [
  'Celina', 'Prosper', 'Frisco', 'McKinney', 'Plano', 'Allen',
  'Richardson', 'Carrollton', 'Dallas', 'Fort Worth'
]; // Kept for reference — no longer rendered; Home uses general copy per positioning update.

const HomePage = () => {
  return (
    <div className="overflow-hidden" data-testid="home-page">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center" data-testid="home-hero">
        <div className="absolute inset-0">
          <img src={images.hero} alt="DFW Commercial Cleaning Partner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#66CC33]/20 border border-[#66CC33]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles size={16} className="text-[#66CC33]" />
              <span className="text-[#66CC33] text-sm font-medium">Professional Cleaning Since 2005</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Your DFW Commercial <span className="text-[#66CC33]">&amp; Residential Cleaning Partner</span> Since 2005
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Insured, trained, and accountable cleaning for businesses, facilities, and homes across Dallas, North Dallas, and surrounding communities. Written scopes. Consistent crews. Scalable service.
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

            {/* Designation badges */}
            <div className="flex flex-wrap items-center gap-3 mt-10" data-testid="hero-designations">
              <span className="inline-flex items-center gap-2 bg-[#191970]/80 border border-[#66CC33]/40 text-white text-xs font-semibold rounded-full px-3 py-1.5 backdrop-blur">
                <UserCheck size={14} className="text-[#66CC33]" /> Woman-Owned
              </span>
              <span className="inline-flex items-center gap-2 bg-[#191970]/80 border border-[#66CC33]/40 text-white text-xs font-semibold rounded-full px-3 py-1.5 backdrop-blur">
                <Users size={14} className="text-[#66CC33]" /> Minority-Owned
              </span>
              <span className="inline-flex items-center gap-2 bg-[#191970]/80 border border-[#66CC33]/40 text-white text-xs font-semibold rounded-full px-3 py-1.5 backdrop-blur">
                <Shield size={14} className="text-[#66CC33]" /> Fully Insured &amp; Bonded
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-8 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Shield className="text-[#66CC33]" size={22} />
                <span className="text-white/80 text-sm">Insured Operations</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="text-[#66CC33]" size={22} />
                <span className="text-white/80 text-sm">Trained Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-[#66CC33]" size={22} />
                <span className="text-white/80 text-sm">Reliable Scheduling</span>
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
              A Commercial Cleaning Partner — Not a Vendor
            </h2>
            <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
              Our focus is commercial facility services: the rigor, insurance, and consistency buildings require. We also serve a select number of residential clients to the same standard.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
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
                <h3 className="font-display text-3xl font-bold text-white mb-4">Commercial &amp; Facility Services</h3>
                <p className="text-[#a0a0b0] mb-6 leading-relaxed">
                  Ongoing janitorial and facility care for offices, medical, retail, educational, and government buildings. Written scopes, fixed monthly pricing, and a single accountable point of contact.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-3 text-white/80"><CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />Offices &amp; Professional</div>
                  <div className="flex items-center gap-3 text-white/80"><CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />Medical &amp; Dental</div>
                  <div className="flex items-center gap-3 text-white/80"><CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />Retail Storefronts</div>
                  <div className="flex items-center gap-3 text-white/80"><CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />Educational &amp; Government</div>
                </div>
                <Link to="/commercial" className="btn-primary w-full justify-center" data-testid="home-commercial-cta">
                  Explore Commercial Services
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

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
                  Recurring, deep, and move-in / move-out cleaning for a select group of homeowners — the same professional standard as our commercial clients.
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

      {/* Industries Served */}
      <section className="py-24 bg-[#12122a]" data-testid="home-industries">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Industries Served</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Facilities We Keep Running
            </h2>
            <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
              Commercial and public-sector buildings across the DFW metroplex.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.name}
                  className="card-dark p-6 text-center hover:border-[#66CC33]/50 transition-all"
                  data-testid={`industry-card-${industry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#66CC33]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-[#66CC33]" size={26} />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{industry.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contract-Ready Operations */}
      <section className="py-24 bg-[#0a0a1a]" data-testid="home-contract-ready">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Contract-Ready Operations</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Built for Commercial &amp; Public-Sector Contracts
            </h2>
            <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
              Five standards we hold ourselves to on every agreement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {contractReady.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="card-dark p-6 hover:border-[#66CC33]/50 transition-all"
                  data-testid={`contract-pillar-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#191970] flex items-center justify-center mb-5">
                    <Icon className="text-[#66CC33]" size={24} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-[#a0a0b0] text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-[#12122a]" data-testid="home-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Three Steps to a Cleaner Facility
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="card-dark p-8 relative"
                  data-testid={`process-step-${idx + 1}`}
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#66CC33] text-[#0a0a1a] flex items-center justify-center font-display font-bold text-lg shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-[#191970] flex items-center justify-center mb-6 ml-4">
                    <Icon className="text-[#66CC33]" size={28} />
                  </div>
                  <div className="text-[#66CC33] text-xs font-semibold uppercase tracking-wider mb-2">{step.step}</div>
                  <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-[#a0a0b0] text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capability Statement */}
      <section className="py-20 bg-[#0a0a1a]" data-testid="home-capability">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="card-dark border-[#66CC33]/30 p-10 md:p-12 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#66CC33] rounded-full opacity-10 blur-3xl" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#66CC33]/10 border border-[#66CC33]/30 rounded-full px-3 py-1 mb-4">
                  <ClipboardList size={14} className="text-[#66CC33]" />
                  <span className="text-[#66CC33] text-xs font-semibold uppercase tracking-wider">Capability Statement</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Evaluating vendors? Download our Capability Statement.
                </h2>
                <p className="text-[#a0a0b0] leading-relaxed max-w-2xl">
                  A single-page overview of our services, designations, service area, NAICS codes, and points of contact — prepared for procurement teams, property managers, and government buyers.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  <span className="text-xs font-semibold bg-[#191970] text-white border border-[#66CC33]/30 px-3 py-1 rounded-full">Woman-Owned</span>
                  <span className="text-xs font-semibold bg-[#191970] text-white border border-[#66CC33]/30 px-3 py-1 rounded-full">Minority-Owned</span>
                  <span className="text-xs font-semibold bg-[#191970] text-white border border-[#66CC33]/30 px-3 py-1 rounded-full">Insured &amp; Bonded</span>
                </div>
              </div>
              <div className="flex md:justify-end">
                <a
                  href="/capability-statement.txt"
                  download
                  className="btn-primary text-base py-4 px-7 whitespace-nowrap"
                  data-testid="download-capability-btn"
                >
                  <Download size={18} />
                  Download Capability Statement
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-[#12122a]" data-testid="home-service-area">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#66CC33]/10 border border-[#66CC33]/30 rounded-full px-3 py-1 mb-4">
            <MapPin size={14} className="text-[#66CC33]" />
            <span className="text-[#66CC33] text-xs font-semibold uppercase tracking-wider">Service Area</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Serving Dallas, North Dallas &amp; Surrounding Communities
          </h2>
          <p className="text-[#a0a0b0] max-w-2xl mx-auto">
            Serving Dallas, North Dallas, and surrounding communities — contact us to confirm coverage for your location.
          </p>
        </div>
      </section>

      {/* Why Choose Us (Years / Rating visual) */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Two Decades of Reliable Service
              </h2>
              <p className="text-[#a0a0b0] text-lg mb-8 leading-relaxed">
                Since 2005, DFW businesses have trusted us to show up, document the work, and hold our teams to the same written standard every visit. Our clients renew because reliability compounds.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#191970] flex items-center justify-center flex-shrink-0">
                    <Shield className="text-[#66CC33]" size={22} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Fully Insured</h3>
                    <p className="text-[#a0a0b0] text-sm leading-relaxed">General liability and bonded coverage on every visit.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#191970] flex items-center justify-center flex-shrink-0">
                    <UserCheck className="text-[#66CC33]" size={22} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Consistent Teams</h3>
                    <p className="text-[#a0a0b0] text-sm leading-relaxed">The same familiar crew — not a rotating cast.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#191970] flex items-center justify-center flex-shrink-0">
                    <CalendarCheck className="text-[#66CC33]" size={22} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Scheduled, In Writing</h3>
                    <p className="text-[#a0a0b0] text-sm leading-relaxed">A written cadence you can audit against.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#191970] flex items-center justify-center flex-shrink-0">
                    <Scaling className="text-[#66CC33]" size={22} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Scalable</h3>
                    <p className="text-[#a0a0b0] text-sm leading-relaxed">One partner as your footprint grows.</p>
                  </div>
                </div>
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
      <section className="py-24 bg-[#12122a]">
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
            Ready for a Reliable Facility Partner?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free walk-through. We'll deliver a written scope and a straightforward monthly quote — no gimmicks.
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
