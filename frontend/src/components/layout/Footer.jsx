import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight, Handshake } from 'lucide-react';
import { companyInfo, navLinks } from '../../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a1a] border-t border-[#66CC33]/20">
      {/* Partner CTA Section */}
      <div className="bg-[#191970]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#66CC33]/20 flex items-center justify-center">
                <Handshake className="w-7 h-7 text-[#66CC33]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Partner With Us</h3>
                <p className="text-white/70">Are you a cleaning company? Let's grow together.</p>
              </div>
            </div>
            <Link
              to="/contact?partner=true"
              className="btn-primary flex items-center gap-2"
            >
              Become a Partner
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src={companyInfo.logo}
                alt={companyInfo.name}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-[#a0a0b0] mb-6 leading-relaxed">
              Professional commercial and residential cleaning services serving the DFW metroplex since 2005.
            </p>
            <p className="text-[#66CC33] font-semibold italic">
              "{companyInfo.tagline}"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#a0a0b0] hover:text-[#66CC33] transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/commercial"
                  className="text-[#a0a0b0] hover:text-[#66CC33] transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} />
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link
                  to="/commercial"
                  className="text-[#a0a0b0] hover:text-[#66CC33] transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} />
                  Janitorial Services
                </Link>
              </li>
              <li>
                <Link
                  to="/commercial"
                  className="text-[#a0a0b0] hover:text-[#66CC33] transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} />
                  Office Cleaning
                </Link>
              </li>
              <li>
                <Link
                  to="/residential"
                  className="text-[#a0a0b0] hover:text-[#66CC33] transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} />
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link
                  to="/residential"
                  className="text-[#a0a0b0] hover:text-[#66CC33] transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} />
                  Move-In/Out Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-start gap-3 text-[#a0a0b0] hover:text-[#66CC33] transition-colors"
                >
                  <Phone size={20} className="text-[#66CC33] mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-start gap-3 text-[#a0a0b0] hover:text-[#66CC33] transition-colors"
                >
                  <Mail size={20} className="text-[#66CC33] mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#a0a0b0]">
                <MapPin size={20} className="text-[#66CC33] mt-0.5 flex-shrink-0" />
                <span>
                  {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}
                </span>
              </li>
              <li className="flex items-start gap-3 text-[#a0a0b0]">
                <Clock size={20} className="text-[#66CC33] mt-0.5 flex-shrink-0" />
                <span>
                  Serving: {companyInfo.serviceArea}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#191970]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#a0a0b0] text-sm text-center md:text-left">
              © {currentYear} {companyInfo.name}. All rights reserved.
            </p>
            <p className="text-[#a0a0b0] text-sm">
              Fully Licensed & Insured | Serving DFW Since {companyInfo.foundedYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
