import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  Building2,
  Home,
  CheckCircle,
  Handshake,
  ArrowRight
} from 'lucide-react';
import { companyInfo } from '../data/mock';
import { toast } from 'sonner';

const ContactPage = () => {
  const location = useLocation();
  const [isPartner, setIsPartner] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'commercial',
    propertyType: '',
    frequency: '',
    message: '',
    isPartnerInquiry: false
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('partner') === 'true') {
      setIsPartner(true);
      setFormData(prev => ({ ...prev, isPartnerInquiry: true }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (mock)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Thank you! We will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceType: 'commercial',
      propertyType: '',
      frequency: '',
      message: '',
      isPartnerInquiry: false
    });
    setIsSubmitting(false);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-[#0a0a1a]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#191970] rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#66CC33]/20 border border-[#66CC33]/30 rounded-full px-4 py-2 mb-6">
              <Send size={16} className="text-[#66CC33]" />
              <span className="text-[#66CC33] text-sm font-medium">
                {isPartner ? 'Partner With Us' : 'Get in Touch'}
              </span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {isPartner ? (
                <>Partner <span className="text-[#66CC33]">With Us</span></>
              ) : (
                <>Contact <span className="text-[#66CC33]">Us</span></>
              )}
            </h1>
            
            <p className="text-xl text-white/80 leading-relaxed">
              {isPartner 
                ? "Interested in partnering with The Angel House Cleaning? We're always looking for trusted cleaning companies to grow with."
                : "Ready to experience professional cleaning? Request a free quote or schedule a walk-through today."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#12122a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl font-bold text-white mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#0a0a1a] border border-[#66CC33]/20 hover:border-[#66CC33]/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#66CC33]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#66CC33]" size={24} />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Phone</div>
                    <div className="text-[#66CC33] group-hover:underline">{companyInfo.phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#0a0a1a] border border-[#66CC33]/20 hover:border-[#66CC33]/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#66CC33]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#66CC33]" size={24} />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Email</div>
                    <div className="text-[#66CC33] group-hover:underline">{companyInfo.email}</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0a0a1a] border border-[#66CC33]/20">
                  <div className="w-12 h-12 rounded-lg bg-[#66CC33]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#66CC33]" size={24} />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Location</div>
                    <div className="text-[#a0a0b0]">
                      {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0a0a1a] border border-[#66CC33]/20">
                  <div className="w-12 h-12 rounded-lg bg-[#66CC33]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-[#66CC33]" size={24} />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Service Area</div>
                    <div className="text-[#a0a0b0]">{companyInfo.serviceArea}</div>
                  </div>
                </div>
              </div>

              {/* Partner Toggle */}
              {!isPartner && (
                <div className="mt-8 p-6 rounded-xl bg-[#191970] border border-[#66CC33]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Handshake className="text-[#66CC33]" size={24} />
                    <span className="text-white font-semibold">Cleaning Company?</span>
                  </div>
                  <p className="text-white/70 text-sm mb-4">
                    Interested in partnering with us? We're expanding our network.
                  </p>
                  <button
                    onClick={() => {
                      setIsPartner(true);
                      setFormData(prev => ({ ...prev, isPartnerInquiry: true }));
                    }}
                    className="text-[#66CC33] font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm"
                  >
                    Become a Partner <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-dark p-8 md:p-10">
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  {isPartner ? 'Partnership Inquiry' : 'Request a Quote'}
                </h2>
                <p className="text-[#a0a0b0] mb-8">
                  {isPartner 
                    ? "Tell us about your cleaning company and how we can work together."
                    : "Fill out the form below and we'll get back to you within 24 hours."
                  }
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-dark w-full"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-dark w-full"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="input-dark w-full"
                        placeholder="(972) 555-1234"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Service Type *</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, serviceType: 'commercial' }))}
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                            formData.serviceType === 'commercial'
                              ? 'bg-[#66CC33] border-[#66CC33] text-[#0a0a1a]'
                              : 'bg-transparent border-[#66CC33]/30 text-white hover:border-[#66CC33]'
                          }`}
                        >
                          <Building2 size={18} />
                          Commercial
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, serviceType: 'residential' }))}
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                            formData.serviceType === 'residential'
                              ? 'bg-[#66CC33] border-[#66CC33] text-[#0a0a1a]'
                              : 'bg-transparent border-[#66CC33]/30 text-white hover:border-[#66CC33]'
                          }`}
                        >
                          <Home size={18} />
                          Residential
                        </button>
                      </div>
                    </div>
                  </div>

                  {!isPartner && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Property Type</label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="input-dark w-full"
                        >
                          <option value="">Select property type</option>
                          {formData.serviceType === 'commercial' ? (
                            <>
                              <option value="office">Office Building</option>
                              <option value="medical">Medical Office</option>
                              <option value="retail">Retail Space</option>
                              <option value="professional">Professional Office</option>
                              <option value="other">Other Commercial</option>
                            </>
                          ) : (
                            <>
                              <option value="house">Single Family Home</option>
                              <option value="apartment">Apartment</option>
                              <option value="condo">Condo</option>
                              <option value="townhouse">Townhouse</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Cleaning Frequency</label>
                        <select
                          name="frequency"
                          value={formData.frequency}
                          onChange={handleChange}
                          className="input-dark w-full"
                        >
                          <option value="">Select frequency</option>
                          <option value="one-time">One-Time Cleaning</option>
                          <option value="weekly">Weekly</option>
                          <option value="bi-weekly">Bi-Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="custom">Custom Schedule</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-white font-medium mb-2">
                      {isPartner ? 'Tell us about your company *' : 'Additional Details'}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required={isPartner}
                      rows={5}
                      className="input-dark w-full resize-none"
                      placeholder={isPartner 
                        ? "Tell us about your cleaning company, services, service area, and how you'd like to partner..."
                        : "Tell us more about your cleaning needs, special requirements, or any questions..."
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {isPartner ? 'Submit Partnership Inquiry' : 'Request Quote'}
                        <Send size={20} />
                      </span>
                    )}
                  </button>

                  <p className="text-[#a0a0b0] text-sm text-center">
                    <CheckCircle className="inline mr-2 text-[#66CC33]" size={16} />
                    We typically respond within 24 hours
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Service Area Section */}
      <section className="py-16 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Serving the DFW Metroplex</h2>
          <p className="text-[#a0a0b0] max-w-2xl mx-auto">
            We proudly serve businesses and homes throughout the Dallas-Fort Worth area. Contact us to see if we service your location.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {['Dallas', 'Fort Worth', 'Frisco', 'Plano', 'McKinney', 'Allen', 'Richardson', 'Carrollton'].map((city) => (
              <span
                key={city}
                className="bg-[#191970] text-white px-4 py-2 rounded-full text-sm"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
