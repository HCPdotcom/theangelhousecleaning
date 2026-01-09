import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { companyInfo, navLinks } from '../../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a1a]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={companyInfo.logo}
              alt={companyInfo.name}
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-[#0a0a1a] bg-[#66CC33]'
                    : 'text-white hover:text-[#66CC33]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-2 text-white hover:text-[#66CC33] transition-colors"
            >
              <Phone size={18} />
              <span className="font-medium">{companyInfo.phone}</span>
            </a>
            <Link to="/contact" className="btn-primary text-sm py-3 px-6">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#66CC33] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0a1a]/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen border-t border-[#66CC33]/20' : 'max-h-0'
        }`}
      >
        <nav className="px-6 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-[#0a0a1a] bg-[#66CC33]'
                  : 'text-white hover:bg-[#191970]/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#66CC33]/20 space-y-4">
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-3 px-4 py-3 text-white"
            >
              <Phone size={20} className="text-[#66CC33]" />
              <span className="font-medium">{companyInfo.phone}</span>
            </a>
            <Link
              to="/contact"
              className="btn-primary w-full text-center py-4"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
