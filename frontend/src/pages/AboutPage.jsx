import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  Target, 
  Award,
  CheckCircle,
  Phone,
  Users,
  Clock,
  Star,
  Heart
} from 'lucide-react';
import { companyInfo, images } from '../../data/mock';

const AboutPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-[#0a0a1a]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#191970] rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#66CC33]/20 border border-[#66CC33]/30 rounded-full px-4 py-2 mb-6">
              <Award size={16} className="text-[#66CC33]" />
              <span className="text-[#66CC33] text-sm font-medium">Since 2005</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              About <span className="text-[#66CC33]">Us</span>
            </h1>
            
            <p className="text-xl text-white/80 leading-relaxed">
              A family-owned professional cleaning company serving the Dallas-Fort Worth metroplex with integrity and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-[#12122a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Quality Within Reach
              </h2>
              <p className="text-[#a0a0b0] text-lg mb-6 leading-relaxed">
                For many years, our slogan "Quality Within Reach" has inspired the culture that has powered our organization. We believe professional cleaning services should be accessible to everyone—from growing businesses to busy families.
              </p>
              <p className="text-[#a0a0b0] text-lg mb-8 leading-relaxed">
                Founded in 2005, The Angel House Cleaning has grown from a small family operation into a trusted name across the DFW metroplex. Our commitment to quality, reliability, and customer satisfaction remains at the core of everything we do.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-[#191970] rounded-full px-4 py-2">
                  <CheckCircle className="text-[#66CC33]" size={18} />
                  <span className="text-white text-sm font-medium">Family-Owned</span>
                </div>
                <div className="flex items-center gap-2 bg-[#191970] rounded-full px-4 py-2">
                  <CheckCircle className="text-[#66CC33]" size={18} />
                  <span className="text-white text-sm font-medium">Locally Operated</span>
                </div>
                <div className="flex items-center gap-2 bg-[#191970] rounded-full px-4 py-2">
                  <CheckCircle className="text-[#66CC33]" size={18} />
                  <span className="text-white text-sm font-medium">Fully Insured</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={companyInfo.logo}
                alt={companyInfo.name}
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4">
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-dark p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#66CC33]/20 flex items-center justify-center mx-auto mb-6">
                <Target className="text-[#66CC33]" size={32} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Professionalism</h3>
              <p className="text-[#a0a0b0]">
                We approach every job with the highest professional standards and attention to detail.
              </p>
            </div>

            <div className="card-dark p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#66CC33]/20 flex items-center justify-center mx-auto mb-6">
                <Clock className="text-[#66CC33]" size={32} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Reliability</h3>
              <p className="text-[#a0a0b0]">
                Dependable service you can count on. We show up on time, every time.
              </p>
            </div>

            <div className="card-dark p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#66CC33]/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="text-[#66CC33]" size={32} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Integrity</h3>
              <p className="text-[#a0a0b0]">
                Honest, transparent service with full insurance coverage for your peace of mind.
              </p>
            </div>

            <div className="card-dark p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#66CC33]/20 flex items-center justify-center mx-auto mb-6">
                <Heart className="text-[#66CC33]" size={32} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Care</h3>
              <p className="text-[#a0a0b0]">
                We treat every property with respect, as if it were our own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#191970]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-[#66CC33] text-5xl md:text-6xl font-bold mb-2">
                {new Date().getFullYear() - companyInfo.foundedYear}+
              </div>
              <div className="text-white/80">Years in Business</div>
            </div>
            <div className="text-center">
              <div className="text-[#66CC33] text-5xl md:text-6xl font-bold mb-2">4.5</div>
              <div className="text-white/80 flex items-center justify-center gap-1">
                <Star className="fill-[#66CC33] text-[#66CC33]" size={16} />
                Star Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-[#66CC33] text-5xl md:text-6xl font-bold mb-2">1000+</div>
              <div className="text-white/80">Satisfied Clients</div>
            </div>
            <div className="text-center">
              <div className="text-[#66CC33] text-5xl md:text-6xl font-bold mb-2">DFW</div>
              <div className="text-white/80">Service Area</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Commitment */}
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
                <Users className="text-[#0a0a1a] mb-2" size={32} />
                <div className="text-[#0a0a1a] font-bold">Trained Team</div>
                <div className="text-[#0a0a1a]/70 text-sm">Professional & Respectful</div>
              </div>
            </div>

            <div>
              <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">Our Commitment</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Professional Staff, Exceptional Results
              </h2>
              <p className="text-[#a0a0b0] text-lg mb-6 leading-relaxed">
                Our excellent staff of experienced cleaners has been responsible for the routine cleaning of countless homes and offices throughout the DFW area, gaining a reputation for being respectful along the way.
              </p>
              <p className="text-[#a0a0b0] text-lg mb-8 leading-relaxed">
                We take great pride in what we do, providing a high quality of cleanliness for both commercial and residential clients. Every team member is trained, insured, and committed to delivering consistent, outstanding results.
              </p>

              <Link to="/contact" className="btn-primary">
                Work With Us
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#66CC33] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#191970] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-[#a0a0b0] text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote. We'd love to show you why businesses and homeowners across the DFW trust The Angel House Cleaning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-lg py-4 px-8">
              Request a Quote
              <ArrowRight size={20} />
            </Link>
            <a href={`tel:${companyInfo.phone}`} className="btn-navy text-lg py-4 px-8">
              <Phone size={20} />
              {companyInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
