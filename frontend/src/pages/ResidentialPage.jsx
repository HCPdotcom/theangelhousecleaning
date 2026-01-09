import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Home, 
  Sparkles, 
  Truck,
  CheckCircle,
  Shield,
  Phone,
  Heart,
  Clock,
  Star,
  CalendarCheck,
  Repeat
} from 'lucide-react';
import { companyInfo, residentialServices, images } from '../../data/mock';

const iconMap = {
  Home: Home,
  Sparkles: Sparkles,
  Truck: Truck
};

const ResidentialPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={images.residential}
            alt="Residential Cleaning Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#66CC33]/20 border border-[#66CC33]/30 rounded-full px-4 py-2 mb-6">
              <Home size={16} className="text-[#66CC33]" />
              <span className="text-[#66CC33] text-sm font-medium">Residential Services</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Residential <span className="text-[#66CC33]">Cleaning</span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Give yourself the gift of a clean home without the hassle. Our trusted team delivers consistent, thorough cleaning so you can enjoy your space.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary text-lg py-4 px-8">
                Request a Quote
                <ArrowRight size={20} />
              </Link>
              <a href={`tel:${companyInfo.phone}`} className="btn-secondary text-lg py-4 px-8">
                <Phone size={20} />
                Call Now
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
              <Heart className="text-[#66CC33]" size={24} />
              <span className="text-white font-medium">Trusted Since 2005</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="text-[#66CC33]" size={24} />
              <span className="text-white font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center gap-3">
              <Repeat className="text-[#66CC33]" size={24} />
              <span className="text-white font-medium">Flexible Schedules</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-[#66CC33]" size={24} />
              <span className="text-white font-medium">Consistent Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Home Cleaning Solutions
            </h2>
            <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
              From regular maintenance to deep cleaning, we have the perfect solution to keep your home spotless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {residentialServices.map((service) => {
              const Icon = iconMap[service.icon] || Sparkles;
              return (
                <div key={service.id} className="card-dark p-8 group">
                  <div className="w-14 h-14 rounded-xl bg-[#191970] flex items-center justify-center mb-6 group-hover:bg-[#66CC33] transition-colors">
                    <Icon className="text-[#66CC33] group-hover:text-[#0a0a1a] transition-colors" size={28} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>
                  <p className="text-[#a0a0b0] leading-relaxed mb-6">{service.description}</p>
                  <Link to="/contact" className="text-[#66CC33] font-medium flex items-center gap-2 hover:gap-3 transition-all">
                    Request Quote <ArrowRight size={18} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-[#12122a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">What's Included</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Thorough Cleaning You Can Trust
              </h2>
              <p className="text-[#a0a0b0] text-lg mb-8 leading-relaxed">
                Every home cleaning includes a comprehensive checklist to ensure nothing is missed. We treat your home with care and respect.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Kitchen deep clean',
                  'Bathroom sanitization',
                  'Dusting & surfaces',
                  'Floor vacuuming & mopping',
                  'Bedroom tidying',
                  'Trash removal',
                  'Mirror & glass cleaning',
                  'Appliance exteriors'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-[#66CC33] flex-shrink-0" size={20} />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={images.residential}
                alt="Clean Home Interior"
                className="rounded-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#191970] rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarCheck className="text-[#66CC33]" size={24} />
                </div>
                <div className="text-white font-semibold">Flexible Scheduling</div>
                <div className="text-white/70 text-sm">Weekly, bi-weekly, monthly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Why Trust Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Your Home in Good Hands
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-dark p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#66CC33]/20 flex items-center justify-center mx-auto mb-6">
                <Heart className="text-[#66CC33]" size={32} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Trust & Respect</h3>
              <p className="text-[#a0a0b0]">
                We treat every home as if it were our own. Your privacy and property are always respected.
              </p>
            </div>

            <div className="card-dark p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#66CC33]/20 flex items-center justify-center mx-auto mb-6">
                <Clock className="text-[#66CC33]" size={32} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Convenience</h3>
              <p className="text-[#a0a0b0]">
                Reclaim your weekends. We work around your schedule to make professional cleaning effortless.
              </p>
            </div>

            <div className="card-dark p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#66CC33]/20 flex items-center justify-center mx-auto mb-6">
                <Star className="text-[#66CC33]" size={32} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Consistent Results</h3>
              <p className="text-[#a0a0b0]">
                Enjoy the same high-quality clean every time with our detailed checklists and trained staff.
              </p>
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
            Ready for a Cleaner Home?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Request a free quote today and discover how easy it is to have a professionally cleaned home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-lg py-4 px-8">
              Request a Quote
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

export default ResidentialPage;
