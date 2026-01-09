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
  Award,
  Sparkles,
  Star,
  Phone,
  Building,
  Stethoscope,
  Store,
  Briefcase
} from 'lucide-react';
import { companyInfo, images, whoWeServe, whyChooseUs, testimonials } from '../data/mock';

const iconMap = {
  Building: Building,
  Building2: Building2,
  Stethoscope: Stethoscope,
  Store: Store,
  Briefcase: Briefcase,
  Home: Home,
  CheckCircle: CheckCircle,
  Shield: Shield,
  Users: Users,
  Award: Award
};

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt="Professional Commercial Cleaning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#66CC33]/20 border border-[#66CC33]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles size={16} className="text-[#66CC33]" />
              <span className="text-[#66CC33] text-sm font-medium">Professional Cleaning Since 2005</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Commercial Cleaning <span className="text-[#66CC33]">Services</span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Trusted by businesses across the DFW metroplex. We deliver consistent, professional cleaning that maintains your business's image and creates healthier workspaces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary text-lg py-4 px-8">
                Schedule a Walk-Through
                <ArrowRight size={20} />
              </Link>
              <Link to="/commercial" className="btn-secondary text-lg py-4 px-8">
                Our Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Shield className="text-[#66CC33]" size={24} />
                <span className="text-white/80">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-[#66CC33]" size={24} />
                <span className="text-white/80">Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-[#66CC33]" size={24} />
                <span className="text-white/80">Flexible Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Professional Cleaning Solutions
            </h2>
            <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
              From corporate offices to residential homes, we deliver exceptional cleaning services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Commercial Card */}
            <div className="card-dark group cursor-pointer overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={images.commercial}
                  alt="Commercial Cleaning"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 bg-[#66CC33] text-[#0a0a1a] rounded-full px-4 py-2 font-semibold text-sm">
                    <Building2 size={18} />
                    Primary Focus
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-4">Commercial Cleaning</h3>
                <p className="text-[#a0a0b0] mb-6 leading-relaxed">
                  Comprehensive janitorial and office cleaning services designed for businesses. We maintain professional environments that impress clients and boost productivity.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />
                    Office & Corporate Buildings
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />
                    Medical & Professional Offices
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />
                    Flexible Day/Night Schedules
                  </li>
                </ul>
                <Link to="/commercial" className="btn-primary w-full justify-center">
                  Explore Commercial Services
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Residential Card */}
            <div className="card-dark group cursor-pointer overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={images.residential}
                  alt="Residential Cleaning"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Home size={24} className="text-[#66CC33]" />
                  Residential Cleaning
                </h3>
                <p className="text-[#a0a0b0] mb-6 leading-relaxed">
                  Trusted home cleaning services that give you back your time. From recurring maintenance to deep cleaning, we treat your home with care and attention.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />
                    Recurring Home Cleaning
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />
                    Deep Cleaning Services
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={18} className="text-[#66CC33] flex-shrink-0" />
                    Move-In / Move-Out Cleaning
                  </li>
                </ul>
                <Link to="/residential" className="btn-secondary w-full justify-center">
                  Explore Residential Services
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 bg-[#12122a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Who We Serve</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Trusted by Businesses & Homes
            </h2>
            <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
              From corporate offices to family homes, we serve diverse clients across the DFW metroplex.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {whoWeServe.map((item) => {
              const Icon = iconMap[item.icon] || Building;
              return (
                <div
                  key={item.id}
                  className="card-dark p-6 text-center hover:border-[#66CC33]/50 transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-[#66CC33]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-[#66CC33]" size={28} />
                  </div>
                  <h3 className="text-white font-medium text-sm">{item.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Quality Within Reach
              </h2>
              <p className="text-[#a0a0b0] text-lg mb-8 leading-relaxed">
                Since 2005, we've built our reputation on reliability, consistency, and attention to detail. Our trained, insured staff delivers professional results every time.
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
                <img
                  src={images.team}
                  alt="Professional Cleaning Team"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/80 to-transparent" />
              </div>
              {/* Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-[#191970] rounded-2xl p-6 shadow-xl">
                <div className="text-[#66CC33] text-4xl font-bold">{new Date().getFullYear() - companyInfo.foundedYear}+</div>
                <div className="text-white/80 text-sm">Years of Excellence</div>
              </div>
              {/* Rating Card */}
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
                <p className="text-white/90 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
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

      {/* CTA Section */}
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
            Schedule a free walk-through of your facility. We'll provide a detailed assessment and customized quote for your cleaning needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-lg py-4 px-8">
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
