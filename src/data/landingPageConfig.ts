// Landing Page Configuration - Soft Coded Content
// This file contains all configurable content for the landing page

export const landingPageConfig = {
  // Navigation Configuration
  navigation: {
    menuItems: [
      {
        id: "home",
        label: "Home",
        href: "/",
        hasDropdown: false
      },
      {
        id: "about",
        label: "About",
        href: "/about",
        hasDropdown: false
      },
      {
        id: "services",
        label: "Services",
        href: "/services",
        hasDropdown: true,
        dropdown: [
          { id: "service-1", label: "Oil & Gas Production", href: "/services/production" },
          { id: "service-2", label: "Industrial Processing", href: "/services/processing" },
          { id: "service-3", label: "Pipeline Management", href: "/services/pipeline" },
          { id: "service-4", label: "Refinery Operations", href: "/services/refinery" }
        ]
      },
      {
        id: "projects",
        label: "Projects", 
        href: "/projects",
        hasDropdown: false
      },
      {
        id: "blog",
        label: "Blog",
        href: "/blog",
        hasDropdown: false
      },
      {
        id: "contact",
        label: "Contact",
        href: "/contact",
        hasDropdown: false
      }
    ]
  },

  // Hero Section
  hero: {
    title: {
      main: "REJLERS",
      subtitle: "INDUSTRIAL & FACTORIAL BUSINESS",
      description: "Premium Oil & Gas Operations Dashboard"
    },
    tagline: "Complete solution for industrial business growth and operational excellence",
    backgroundImage: "/images/banner/slide1.jpg",
    logo: "/images/logo/logo.png",
    ctaButtons: [
      {
        id: "get-started",
        text: "Get Started",
        variant: "primary",
        href: "/dashboard",
        icon: "ArrowRightIcon"
      },
      {
        id: "learn-more",
        text: "Learn More",
        variant: "secondary", 
        href: "/about",
        icon: "PlayIcon"
      }
    ]
  },

  // Services Section
  services: {
    title: "Our Services",
    subtitle: "Professional services for oil & gas industry",
    items: [
      {
        id: 1,
        icon: "oil-rig",
        title: "Oil & Gas Production",
        description: "Complete production monitoring and optimization solutions for maximum efficiency",
        image: "/images/service/s1.jpg",
        features: ["Real-time monitoring", "Production optimization", "Safety compliance"]
      },
      {
        id: 2,
        icon: "industry",
        title: "Industrial Processing",
        description: "Advanced processing plant management with predictive maintenance capabilities",
        image: "/images/service/s2.jpg", 
        features: ["Process automation", "Quality control", "Predictive maintenance"]
      },
      {
        id: 3,
        icon: "pipeline",
        title: "Pipeline Management",
        description: "Comprehensive pipeline monitoring and leak detection systems",
        image: "/images/service/s3.jpg",
        features: ["Leak detection", "Flow optimization", "Remote monitoring"]
      },
      {
        id: 4,
        icon: "refinery",
        title: "Refinery Operations",
        description: "Complete refinery management with advanced analytics and reporting",
        image: "/images/service/s4.jpg",
        features: ["Process optimization", "Yield improvement", "Safety monitoring"]
      },
      {
        id: 5,
        icon: "maintenance",
        title: "Maintenance Services",
        description: "Predictive and preventive maintenance solutions for industrial equipment",
        image: "/images/service/s5.jpg",
        features: ["Predictive analytics", "Scheduled maintenance", "Equipment health"]
      },
      {
        id: 6,
        icon: "safety",
        title: "Safety & Compliance",
        description: "Comprehensive safety monitoring and regulatory compliance management",
        image: "/images/service/s6.jpg",
        features: ["Safety protocols", "Compliance tracking", "Incident management"]
      }
    ]
  },

  // About Section
  about: {
    title: "About REJLERS",
    subtitle: "Leading provider of industrial solutions",
    description: "We specialize in providing comprehensive solutions for oil & gas operations, combining cutting-edge technology with industry expertise to deliver exceptional results.",
    image: "/images/about/about.jpg",
    stats: [
      { number: "500+", label: "Projects Completed", icon: "projects" },
      { number: "50+", label: "Expert Engineers", icon: "team" },
      { number: "15+", label: "Years Experience", icon: "experience" },
      { number: "99%", label: "Client Satisfaction", icon: "satisfaction" }
    ],
    features: [
      "Advanced monitoring systems",
      "Real-time data analytics", 
      "Predictive maintenance",
      "Safety compliance",
      "24/7 technical support",
      "Custom solutions"
    ]
  },

  // Team Section
  team: {
    title: "Our Expert Team",
    subtitle: "Meet the professionals behind our success",
    members: [
      {
        id: 1,
        name: "John Anderson",
        position: "Chief Executive Officer",
        image: "/images/team/team-1.jpg",
        bio: "20+ years experience in oil & gas industry leadership",
        social: {
          linkedin: "#",
          twitter: "#",
          email: "john@rejlers.com"
        }
      },
      {
        id: 2, 
        name: "Sarah Mitchell",
        position: "Chief Technology Officer",
        image: "/images/team/team-2.jpg",
        bio: "Expert in industrial automation and digital transformation",
        social: {
          linkedin: "#",
          twitter: "#", 
          email: "sarah@rejlers.com"
        }
      },
      {
        id: 3,
        name: "Michael Rodriguez",
        position: "Head of Operations",
        image: "/images/team/team-3.jpg",
        bio: "Specialized in operational excellence and process optimization",
        social: {
          linkedin: "#",
          twitter: "#",
          email: "michael@rejlers.com"
        }
      },
      {
        id: 4,
        name: "Emily Chen",
        position: "Safety Director",
        image: "/images/team/team-4.jpg",
        bio: "Leading expert in industrial safety and compliance management",
        social: {
          linkedin: "#",
          twitter: "#",
          email: "emily@rejlers.com"
        }
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    title: "What Our Clients Say",
    subtitle: "Trusted by industry leaders worldwide",
    items: [
      {
        id: 1,
        name: "David Thompson",
        position: "Operations Manager",
        company: "Global Energy Corp",
        image: "/images/testimonial/testimonial_1.jpg",
        rating: 5,
        text: "REJLERS transformed our operations with their cutting-edge monitoring systems. Production efficiency increased by 35% within the first year."
      },
      {
        id: 2,
        name: "Lisa Rodriguez",
        position: "Plant Director", 
        company: "Industrial Solutions Inc",
        image: "/images/testimonial/testimonial_2.jpg",
        rating: 5,
        text: "The predictive maintenance system saved us millions in potential equipment failures. Outstanding service and support."
      },
      {
        id: 3,
        name: "James Wilson",
        position: "Safety Manager",
        company: "Refinery Operations Ltd",
        image: "/images/testimonial/testimonial_3.jpg",
        rating: 5,
        text: "Safety incidents reduced by 70% after implementing REJLERS's comprehensive safety monitoring solution."
      }
    ]
  },

  // Gallery/Projects Section
  projects: {
    title: "Recent Projects",
    subtitle: "Showcasing our latest industrial implementations",
    items: [
      {
        id: 1,
        title: "Offshore Platform Monitoring",
        category: "Oil Production",
        image: "/images/projects/lp1.jpg",
        description: "Complete monitoring solution for offshore oil platform"
      },
      {
        id: 2,
        title: "Refinery Process Optimization", 
        category: "Industrial Processing",
        image: "/images/projects/lp2.jpg",
        description: "Advanced process optimization for large-scale refinery"
      },
      {
        id: 3,
        title: "Pipeline Network Management",
        category: "Infrastructure",
        image: "/images/projects/lp3.jpg", 
        description: "Comprehensive pipeline monitoring across 500+ miles"
      },
      {
        id: 4,
        title: "Safety System Integration",
        category: "Safety & Compliance",
        image: "/images/projects/lp4.jpg",
        description: "Integrated safety systems for chemical processing plant"
      },
      {
        id: 5,
        title: "Predictive Maintenance Platform",
        category: "Maintenance",
        image: "/images/projects/project-col-1.jpg",
        description: "AI-powered predictive maintenance for equipment fleet"
      },
      {
        id: 6,
        title: "Environmental Monitoring",
        category: "Environmental",
        image: "/images/projects/project-col-2.jpg",
        description: "Real-time environmental monitoring and compliance tracking"
      }
    ]
  },

  // Contact Information
  contact: {
    title: "Get In Touch",
    subtitle: "Ready to transform your operations?",
    info: {
      address: "1234 Industrial Blvd, Houston, TX 77001",
      phone: "+1 (555) 123-4567",
      email: "info@rejlers.com",
      hours: "Mon - Fri: 8:00 AM - 6:00 PM"
    },
    form: {
      fields: [
        { name: "name", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email Address", type: "email", required: true },
        { name: "company", label: "Company", type: "text", required: false },
        { name: "phone", label: "Phone Number", type: "tel", required: false },
        { name: "service", label: "Service Interest", type: "select", required: true, 
          options: [
            "Oil & Gas Production",
            "Industrial Processing", 
            "Pipeline Management",
            "Refinery Operations",
            "Maintenance Services",
            "Safety & Compliance"
          ]
        },
        { name: "message", label: "Message", type: "textarea", required: true }
      ],
      submitText: "Send Message"
    }
  },

  // Footer
  footer: {
    logo: "/images/logo/ft-logo.png",
    description: "Leading provider of industrial solutions for oil & gas operations worldwide.",
    social: [
      { platform: "facebook", url: "#", icon: "FacebookIcon" },
      { platform: "twitter", url: "#", icon: "TwitterIcon" },
      { platform: "linkedin", url: "#", icon: "LinkedInIcon" },
      { platform: "youtube", url: "#", icon: "YouTubeIcon" }
    ],
    links: {
      company: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "News", href: "/news" }
      ],
      services: [
        { name: "Oil Production", href: "/services/oil-production" },
        { name: "Industrial Processing", href: "/services/processing" },
        { name: "Pipeline Management", href: "/services/pipeline" },
        { name: "Safety Solutions", href: "/services/safety" }
      ],
      support: [
        { name: "Documentation", href: "/docs" },
        { name: "Support Center", href: "/support" },
        { name: "Contact Us", href: "/contact" },
        { name: "Emergency", href: "/emergency" }
      ]
    },
    copyright: "© 2024 REJLERS. All rights reserved."
  }
};

export default landingPageConfig;