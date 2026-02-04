// Mock data for The Angel House Cleaning website

export const companyInfo = {
  name: "The Angel House Cleaning",
  tagline: "Quality Within Reach",
  phone: "972-836-8242",
  email: "theangelhc@gmail.com",
  address: {
    city: "Frisco",
    state: "TX",
    zip: "75034"
  },
  serviceArea: "Dallas-Fort Worth (DFW) Metroplex",
  foundedYear: 2005,
  logo: "https://images.squarespace-cdn.com/content/v1/5ae1ef7b3917ee6f16b209c8/140349ca-b816-4e8e-a3b1-7e4751fac9ef/The_Angel_House_Cleaning_Final.jpg"
};

export const images = {
  hero: "https://customer-assets.emergentagent.com/job_angel-janitorial/artifacts/bzg1piap_AdobeStock_291306413_Preview.jpeg",
  commercial: "https://images.unsplash.com/photo-1437326300822-01d8f13c024f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBjbGVhbmluZ3xlbnwwfHx8fDE3Njc5MzMzOTR8MA&ixlib=rb-4.1.0&q=85",
  team: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjbGVhbmluZ3xlbnwwfHx8fDE3Njc5MzMzOTR8MA&ixlib=rb-4.1.0&q=85",
  carpet: "https://images.unsplash.com/photo-1742483359033-13315b247c74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBjbGVhbmluZ3xlbnwwfHx8fDE3Njc5MzMzOTR8MA&ixlib=rb-4.1.0&q=85",
  residential: "https://images.pexels.com/photos/4239071/pexels-photo-4239071.jpeg"
};

export const commercialServices = [
  {
    id: 1,
    title: "Office Cleaning",
    description: "Comprehensive cleaning solutions for offices of all sizes. We maintain a professional environment that impresses clients and boosts employee productivity.",
    icon: "Building2"
  },
  {
    id: 2,
    title: "Janitorial Services",
    description: "Ongoing maintenance programs tailored to your schedule. Day or night service available to minimize disruption to your business operations.",
    icon: "Sparkles"
  },
  {
    id: 3,
    title: "Medical & Professional Offices",
    description: "Specialized cleaning for healthcare facilities and professional offices with strict attention to sanitation standards and compliance requirements.",
    icon: "Stethoscope"
  },
  {
    id: 4,
    title: "Restroom & Breakroom",
    description: "Thorough sanitization of high-traffic areas. We ensure your restrooms and break areas are always spotless and well-stocked.",
    icon: "Bath"
  },
  {
    id: 5,
    title: "Trash Removal",
    description: "Reliable waste management and disposal services. We handle all trash removal efficiently and maintain clean disposal areas.",
    icon: "Trash2"
  },
  {
    id: 6,
    title: "Flexible Scheduling",
    description: "Day or night cleaning options to fit your business hours. We work around your schedule for zero disruption to daily operations.",
    icon: "Clock"
  }
];

export const residentialServices = [
  {
    id: 1,
    title: "Recurring Home Cleaning",
    description: "Weekly, bi-weekly, or monthly cleaning programs designed to keep your home consistently clean and comfortable.",
    icon: "Home"
  },
  {
    id: 2,
    title: "Deep Cleaning",
    description: "Intensive cleaning that reaches every corner. Perfect for seasonal refreshes or when your home needs extra attention.",
    icon: "Sparkles"
  },
  {
    id: 3,
    title: "Move-In / Move-Out",
    description: "Comprehensive cleaning for property transitions. We ensure homes are spotless for new beginnings or final walk-throughs.",
    icon: "Truck"
  }
];

export const whoWeServe = [
  { id: 1, name: "Corporate Offices", icon: "Building" },
  { id: 2, name: "Medical Clinics", icon: "Stethoscope" },
  { id: 3, name: "Retail Spaces", icon: "Store" },
  { id: 4, name: "Small-Mid Buildings", icon: "Building2" },
  { id: 5, name: "Professional Offices", icon: "Briefcase" },
  { id: 6, name: "Residential Homes", icon: "Home" }
];

export const whyChooseUs = [
  {
    id: 1,
    title: "Consistency & Reliability",
    description: "We show up on time, every time. Your space will be consistently clean to the same high standards.",
    icon: "CheckCircle"
  },
  {
    id: 2,
    title: "Fully Insured",
    description: "Complete peace of mind with comprehensive insurance coverage for all our services.",
    icon: "Shield"
  },
  {
    id: 3,
    title: "Trained Staff",
    description: "Our professional team is thoroughly trained in modern cleaning techniques and safety protocols.",
    icon: "Users"
  },
  {
    id: 4,
    title: "Since 2005",
    description: "Nearly two decades of trusted service in the DFW metroplex with a proven track record.",
    icon: "Award"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Office Manager",
    company: "Tech Solutions Inc.",
    text: "The Angel House Cleaning has been maintaining our office for over 3 years. Their consistency and attention to detail is unmatched.",
    rating: 5
  },
  {
    id: 2,
    name: "Dr. James R.",
    role: "Practice Owner",
    company: "Family Medical Center",
    text: "Finding a cleaning service that understands medical office requirements was challenging until we found The Angel House Cleaning.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael T.",
    role: "Property Manager",
    company: "Premier Properties",
    text: "Professional, reliable, and thorough. They handle multiple properties for us and never disappoint.",
    rating: 5
  }
];

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "Commercial", path: "/commercial" },
  { name: "Residential", path: "/residential" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" }
];
