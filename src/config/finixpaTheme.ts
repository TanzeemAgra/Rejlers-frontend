// Rejlers Template Configuration - Complete Theme Data Structure
// This file contains all soft-coded content for Rejlers company

export const finixpaThemeConfig = {
  // Site Meta Information
  site: {
    name: "REJLERS",
    title: "Industrial & Factorial Business",
    tagline: "Premium Industrial Solutions for Modern Business",
    description: "Professional industrial and factorial business solutions with cutting-edge technology",
    keywords: "industrial, business, factory, manufacturing, engineering, construction",
    author: "Rejlers Industries",
    url: "https://rejlers.com",
    logo: {
      main: "/Logo.png",
      footer: "/Logo.png",
      favicon: "/Logo.png"
    }
  },

  // Contact Information
  contact: {
    phone: "+46 771 78 00 00",
    email: "info@rejlers.com",
    address: {
      street: "Box 30233",
      city: "Stockholm", 
      state: "SE",
      zip: "104 25",
      country: "Sweden"
    },
    social: {
      facebook: "https://facebook.com/rejlers",
      twitter: "https://twitter.com/rejlers", 
      linkedin: "https://linkedin.com/company/rejlers",
      skype: "rejlers.business",
      pinterest: "https://pinterest.com/rejlers"
    },
    workingHours: {
      weekdays: "Mon - Fri: 8:00 AM - 6:00 PM",
      saturday: "Sat: 9:00 AM - 4:00 PM",
      sunday: "Sun: Closed"
    }
  },

  // Emergency Support Configuration
  emergencySupport: {
    enabled: false, // Set to false to hide the emergency support section
    title: "Emergency Support",
    description: "For critical operational issues or safety emergencies:",
    email: "emergency@rejlers.com",
    availability: "Available 24/7/365 - All Regions",
    regions: [
      {
        name: "Global HQ (Stockholm)",
        phone: "+46 771 78 00 00"
      },
      {
        name: "Middle East (Abu Dhabi)", 
        phone: "+971 2 639 7449"
      }
    ]
  },

  // Global Office Locations
  offices: [
    {
      name: "Head Office - Stockholm",
      region: "Nordic Region",
      address: "Rejlers AB, Box 30233, SE-104 25 Stockholm, Sweden",
      phone: "+46 771 78 00 00",
      email: "info@rejlers.se",
      hours: "Mon-Fri: 08:00-17:00 CET",
      timezone: "CET",
      isHeadquarters: true,
      services: ["Engineering Consulting", "Project Management", "Digital Solutions"],
      mapLink: "https://maps.google.com/?q=Rejlers+Stockholm"
    },
    {
      name: "Abu Dhabi Office",
      region: "Middle East Region", 
      address: "Rejlers Tower, 13th floor, AI Hamdan Street, P.O. Box 39317, Abu Dhabi, United Arab Emirates",
      phone: "+971 2 639 7449",
      email: "uae@rejlers.ae",
      hours: "Sun-Thu: 08:00-17:00 GST",
      timezone: "GST",
      isHeadquarters: false,
      services: ["Oil & Gas Engineering", "Offshore Solutions", "Process Engineering"],
      mapLink: "https://maps.app.goo.gl/QtryfZK4677nQxWYA",
      keyPersonnel: [
        {
          name: "Ahmed Al-Mansouri",
          title: "Regional Director",
          email: "ahmed.almansouri@rejlers.ae",
          phone: "+971 2 639 7450"
        },
        {
          name: "Sarah Johnson",
          title: "Project Manager", 
          email: "sarah.johnson@rejlers.ae",
          phone: "+971 2 639 7451"
        }
      ]
    }
  ],

  // Navigation Menu Configuration
  navigation: {
    topBar: {
      enabled: true,
      leftContent: {
        helpText: "Need Any Help?",
        helpLink: "/help", // Link to intelligent help system
        contacts: [
          { icon: "icofont-phone", text: "+46 771 78 00 00", link: "tel:+46771780000" },
          { icon: "icofont-mail", text: "info@rejlers.com", link: "mailto:info@rejlers.com" }
        ]
      },
      rightContent: {
        socialText: "Follow Us",
        socialLinks: [
          { icon: "icofont-facebook", link: "https://facebook.com/rejlers" },
          { icon: "icofont-twitter", link: "https://twitter.com/rejlers" },
          { icon: "icofont-linkedin", link: "https://linkedin.com/company/rejlers" },
          { icon: "icofont-skype", link: "skype:rejlers.business" },
          { icon: "icofont-pinterest", link: "https://pinterest.com/rejlers" }
        ]
      }
    },
    mainMenu: [
      {
        id: "home",
        label: "Home",
        href: "/",
        hasDropdown: true,
        dropdown: [
          { id: "home-1", label: "Home Style 1", href: "/" },
          { id: "home-2", label: "Home Style 2", href: "/home-2" }
        ]
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
          { id: "services-grid", label: "Services Grid", href: "/services" },
          { id: "services-list", label: "Services List", href: "/services-2" },
          { id: "service-details", label: "Service Details", href: "/service-details" }
        ]
      },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        hasDropdown: true,
        dropdown: [
          { id: "projects-grid", label: "Projects Grid", href: "/projects" },
          { id: "project-details", label: "Project Details", href: "/project-details" }
        ]
      },
      {
        id: "blog",
        label: "Blog",
        href: "/blog",
        hasDropdown: true,
        dropdown: [
          { id: "blog-grid", label: "Blog Grid", href: "/blog" },
          { id: "blog-details", label: "Blog Details", href: "/blog-details" }
        ]
      },
      {
        id: "support",
        label: "Support",
        href: "/help",
        hasDropdown: true,
        dropdown: [
          { id: "help-center", label: "Help Center", href: "/help" },
          { id: "create-ticket", label: "Create Support Ticket", href: "/support" },
          { id: "track-ticket", label: "Track Your Ticket", href: "/support/track" },
          { id: "emergency-support", label: "Emergency Support", href: "tel:+971263974490" }
        ]
      },
      {
        id: "future-communities",
        label: "Future Communities",
        href: "/future-communities",
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

  // Hero Banner/Slider Configuration - Enhanced for Mobile Responsiveness
  banner: {
    // Advanced Responsive Configuration
    responsive: {
      // Mobile-first height settings
      heights: {
        mobile: "100vh", // Full viewport on mobile for maximum impact
        tablet: "90vh",  // Slightly less on tablet
        desktop: "100vh" // Full viewport on desktop
      },
      // Breakpoint-specific settings
      breakpoints: {
        mobile: {
          textAlign: "center",
          padding: "20px 16px",
          titleSize: "text-2xl sm:text-3xl",
          subtitleSize: "text-base sm:text-lg",
          descriptionSize: "text-sm",
          buttonLayout: "flex-col",
          buttonSpacing: "space-y-3"
        },
        tablet: {
          textAlign: "center", 
          padding: "40px 32px",
          titleSize: "text-3xl md:text-4xl",
          subtitleSize: "text-lg md:text-xl",
          descriptionSize: "text-base",
          buttonLayout: "flex-row",
          buttonSpacing: "space-x-4"
        },
        desktop: {
          textAlign: "center",
          padding: "60px 48px",
          titleSize: "text-4xl lg:text-5xl xl:text-6xl",
          subtitleSize: "text-xl lg:text-2xl",
          descriptionSize: "text-lg",
          buttonLayout: "flex-row",
          buttonSpacing: "space-x-6"
        }
      },
      // Content positioning
      contentPosition: {
        mobile: "items-center justify-center min-h-screen pt-20 pb-10",
        tablet: "items-center justify-center min-h-screen pt-24 pb-12", 
        desktop: "items-center justify-center min-h-screen pt-0 pb-0"
      }
    },
    autoPlay: true,
    autoPlayDelay: 6000,
    showDots: true,
    showArrows: true,
    slides: [
      {
        id: 1,
        backgroundType: "gradient",
        backgroundGradient: "linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #1e88e5 100%)",
        backgroundPattern: "geometric",
        title: "HOME of the LEARNING MINDS",
        subtitle: "POWERING THE ENERGY TRANSITION",
        description: "Together with our customers, we drive the shift to a sustainable energy future. It's in our projects where we make the greatest impact, reshaping how energy is produced and consumed for a cleaner, more efficient system.",
        buttons: [
          {
            id: "energy-transition",
            text: "Energy Transition",
            icon: "🔋",
            variant: "outline",
            href: "/energy-transition"
          },
          {
            id: "contact-us", 
            text: "Contact Us →",
            icon: "📞",
            variant: "filled",
            href: "/contact"
          }
        ]
      },
      {
        id: 2,
        backgroundType: "gradient",
        backgroundGradient: "linear-gradient(135deg, #00695c 0%, #00796b 50%, #26a69a 100%)",
        backgroundPattern: "circuit",
        title: "DRIVING SUSTAINABLE INDUSTRY TRANSFORMATION",
        subtitle: "Leading Engineering Excellence",
        description: "The ongoing, fast-paced industry transition is an area where Rejlers makes a difference. We enable the shift to a resource-efficient and circular industrial production with broad expertise in the latest technologies.",
        buttons: [
          {
            id: "industry-transformation",
            text: "Industry Solutions ⚙️",
            icon: "🏭",
            variant: "outline",
            href: "/industry-transformation"
          },
          {
            id: "learn-more",
            text: "Learn More →", 
            icon: "📚",
            variant: "filled",
            href: "/about"
          }
        ]
      },
      {
        id: 3,
        backgroundType: "gradient",
        backgroundGradient: "linear-gradient(135deg, rgba(26, 35, 126, 0.9) 0%, rgba(63, 81, 181, 0.8) 100%)",
        backgroundPattern: "hexagon",
        title: "FUTURE-PROOFING COMMUNITIES",
        subtitle: "Building Resilient Infrastructure",
        description: "Future-proofing communities means adapting to decarbonised systems while building resilience to climate change and digital vulnerability. Rejlers supports a sustainable society by driving projects in cities, infrastructure, and the built environment.",
        buttons: [
          {
            id: "communities",
            text: "Future Communities 🏙️",
            icon: "🌆",
            variant: "outline",
            href: "/future-communities"
          },
          {
            id: "projects",
            text: "View Projects →", 
            icon: "🔧",
            variant: "filled",
            href: "/projects"
          }
        ]
      }
    ],
    styling: {
      overlay: "slider-overlay", // Custom gradient overlay
      wrapperClass: "slider-wrapper",
      textClass: "slider-text",
      captionClass: "slider-caption",
      titleClass: "text-white text-4xl md:text-5xl font-bold capitalize leading-tight mb-3",
      subtitleClass: "subtitle text-white text-2xl capitalize mb-4 block",
      descriptionClass: "text-white text-lg mb-5 leading-relaxed"
    }
  },

  // About Us Section
  about: {
    title: "About Us",
    subtitle: "Who We Are", 
    heading: "We are leading in industrial market over 25 years",
    description: "With over 25 years of proven excellence, REJLERS stands as a leading force in industrial engineering and consulting. Our dedicated team of experts delivers innovative solutions across oil & gas, renewable energy, and industrial sectors, consistently exceeding client expectations through cutting-edge technology and unmatched expertise.",
    image: "/images/about/rejlers-team-02.jpg",
    features: [
      "Engineering Excellence",
      "Expert Consultants", 
      "Advanced Technology",
      "Global Standards"
    ],
    stats: [
      { number: "1200+", label: "Complete Projects" },
      { number: "25+", label: "Years Experience" },
      { number: "98%", label: "Client Satisfaction" },
      { number: "50+", label: "Expert Engineers" }
    ],
    certifications: [
      {
        icon: "🏆",
        title: "Best Quality",
        description: "Certified quality management"
      },
      {
        icon: "👥",
        title: "Expert Team", 
        description: "Professional & experienced"
      }
    ]
  },

  // Services Section
  services: {
    sectionTitle: "Get Service",
    title: "Our Services",
    subtitle: "Lorem ipsum dolor sit amet, usu suscipit sadipscing et, ei sale invidunt deseruisse ius. Vivendum expetendis at has. Dolore suavitate eloquentiam eum id, usu ad oratio ponderum",
    viewAllText: "View All Services",
    viewAllLink: "/services",
    layout: {
      columns: {
        desktop: 4,     // 4 columns on desktop (lg and xl screens)
        tablet: 2,      // 2 columns on tablet (md screens)
        mobile: 1       // 1 column on mobile (sm screens and below)
      },
      gap: "gap-6"      // Responsive gap between items
    },
    items: [
      {
        id: 1,
        icon: "icofont-light-bulb",
        title: "Factory Energy Power",
        subtitle: "Energy Power", 
        image: "/images/service/s1.jpg",
        description: "Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut.",
        link: "/service-details",
        features: [
          "Solar Energy Systems",
          "Industrial Power Management", 
          "Energy Efficiency Consulting",
          "Power Grid Integration"
        ]
      },
      {
        id: 2,
        icon: "icofont-business-man",
        title: "Expert Mechanical",
        subtitle: "",
        image: "/images/service/s2.jpg", 
        description: "Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut.",
        link: "/service-details",
        features: [
          "Machine Maintenance",
          "Industrial Automation",
          "Equipment Installation", 
          "Technical Support"
        ]
      },
      {
        id: 3,
        icon: "icofont-repair",
        title: "Repair Technology",
        subtitle: "",
        image: "/images/service/s3.jpg",
        description: "Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut.", 
        link: "/service-details",
        features: [
          "Equipment Diagnostics",
          "Preventive Maintenance",
          "Emergency Repairs",
          "Technology Upgrades"
        ]
      },
      {
        id: 4,
        icon: "icofont-industries-2", 
        title: "Oil & Gas Industry",
        subtitle: "",
        image: "/images/service/s4.jpg",
        description: "Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut.",
        link: "/service-details",
        features: [
          "Pipeline Construction",
          "Refinery Operations", 
          "Safety Compliance",
          "Environmental Solutions"
        ]
      }
    ]
  },

  // Why Choose Us Section
  whyChooseUs: {
    sectionTitle: "Why Choose Us",
    title: "Industry Leaders in Innovation",
    subtitle: "Proven excellence in industrial solutions", 
    description: "Transforming industries with cutting-edge technology and unmatched expertise.",
    layout: {
      leftContent: "image", // or "statistics"
      rightContent: "features",
      backgroundType: "gradient" // "image" or "gradient" or "solid"
    },
    image: "/images/about/rejlers-team.jpg",
    features: [
      {
        id: 1,
        icon: "🚀",
        title: "Rapid Solutions",
        description: "Fast, secure, and verified industrial automation solutions that deliver results."
      },
      {
        id: 2,
        icon: "🏆", 
        title: "Award-Winning Excellence",
        description: "Recognized industry leader with proven track record across multiple sectors."
      },
      {
        id: 3,
        icon: "🔧",
        title: "24/7 Expert Support",
        description: "Round-the-clock technical assistance from certified engineering professionals."
      },
      {
        id: 4,
        icon: "📜",
        title: "ISO Certified Quality",
        description: "Internationally certified processes ensuring highest standards and reliability."
      }
    ]
  },

  // Call to Action Section  
  callToAction: {
    backgroundType: "gradient", // "image" or "gradient" 
    backgroundImage: "/images/background/call_to_action_bg.jpg",
    title: "Contact with us for customer support",
    subtitle: "we are provide 24/7 hours to support.",
    description: "Get expert consultation and support for your industrial projects. Our team is ready to help you achieve your goals with professional solutions.",
    layout: "horizontal", // "horizontal" or "vertical"
    button: {
      text: "Get Support →",
      icon: "🛠️",
      href: "/contact",
      variant: "primary" // "primary" or "secondary"
    },
    phone: {
      text: "Call Us Now",
      number: "+00 0123456789",
      href: "tel:+000123456789",
      show: true
    }
  },

  // Projects/Portfolio Section - Company Project Gallery
  projects: {
    sectionTitle: "Company Project",
    title: "Company Project Gallery", 
    description: "Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut. Elit massa dui, leo enim magna. Cursus maecenas cubilia, ac nonummy, egestas mauris.",
    viewAllText: "View All Projects",
    viewAllLink: "/projects",
    layout: {
      columns: {
        desktop: 4,     // 4 columns on desktop
        tablet: 2,      // 2 columns on tablet  
        mobile: 1       // 1 column on mobile
      },
      gap: "gap-6",
      showFilter: true,
      filterPosition: "top" // "top" or "left"
    },
    categories: [
      { id: "all", label: "All", filter: "*", active: true },
      { id: "mechanical", label: "Mechanical", filter: ".Mechanical" },
      { id: "technology", label: "Technology", filter: ".Technology" },
      { id: "petroleum", label: "Petroleum", filter: ".Petroleum" }
    ],
    items: [
      {
        id: 1,
        title: "Energy Power",
        categories: ["Petroleum"],
        image: "/images/gallery/g1.jpg",
        link: "/project-details",
        lightboxImage: "/images/gallery/g1.jpg",
        description: "Advanced energy power solutions for industrial applications"
      },
      {
        id: 2, 
        title: "Expert Mechanical",
        categories: ["Mechanical", "Petroleum"],
        image: "/images/gallery/g2.jpg",
        link: "/project-details", 
        lightboxImage: "/images/gallery/g2.jpg",
        description: "Expert mechanical engineering and maintenance services"
      },
      {
        id: 3,
        title: "Repair Technology",
        categories: ["Petroleum"],
        image: "/images/gallery/g3.jpg",
        link: "/project-details",
        lightboxImage: "/images/gallery/g3.jpg",
        description: "Advanced repair technology and maintenance solutions"
      },
      {
        id: 4,
        title: "Refinery Petroleum",
        categories: ["Mechanical", "Petroleum"],
        image: "/images/gallery/g4.jpg", 
        link: "/project-details",
        lightboxImage: "/images/gallery/g4.jpg",
        description: "Refinery operations and petroleum processing projects"
      }
    ]
  },

  // Team Section - Professional Stuff
  team: {
    sectionTitle: "Professional Stuff",
    title: "Our Company Employees", 
    subtitle: "We have Professional Stuff, 24/7 support service",
    description: "Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut. Elit massa dui, leo enim magna. Cursus maecenas cubilia, ac nonummy, egestas mauris.",
    layout: {
      type: "mixed", // "grid" or "mixed" (left content + right team grid)
      columns: {
        desktop: 2,     // 2 columns for team members on desktop
        tablet: 2,      // 2 columns on tablet
        mobile: 1       // 1 column on mobile
      },
      gap: "gap-8"
    },
    supportSection: {
      title: "Support Stuff",
      heading: "We have Professional Stuff, 24/7 support service",
      description: [
        "Lorem ipsum dolor sit amet, choro tamquam vim id, aliquip vivendo repudiare vim te, et his case vidisse tractatos. Nec bonorum iudicabit eloquentiam eu, at reque laboramus quo.",
        "Cu mei virtute pericula expetendis, pri nihil laboramus constituto an. No labore possim has, maiorum scribentur sed eu. Sit eu prima perpetua, ex pri magna brute novum. Falli appellantur vis te, atqui moderatius efficiantur ius te, quo dicant ignota disputando ex. Quod impetus has ea, vix ea recteque principes dissentias, mucius labore sanctus ne sea."
      ],
      contact: [
        {
          icon: "✉️",
          text: "Contact Us →",
          link: "/contact",
          rightIcon: "🚀"
        },
        {
          icon: "📞", 
          text: "+88 00224564",
          link: "tel:+88001234564",
          rightIcon: "📲"
        }
      ]
    },
    members: [
      {
        id: 1,
        name: "Samantha",
        position: "Virtual Assistant",
        image: "/images/team/team-1.jpg",
        bio: "Expert in client communication and administrative support with 5+ years experience.",
        social: {
          facebook: "https://facebook.com/samantha",
          twitter: "https://twitter.com/samantha", 
          linkedin: "https://linkedin.com/in/samantha",
          skype: "samantha.rejlers",
          pinterest: "https://pinterest.com/samantha"
        }
      },
      {
        id: 2,
        name: "Anthony", 
        position: "Mechanical Engineer",
        image: "/images/team/team-2.jpg",
        bio: "Senior mechanical engineer specializing in industrial automation and machinery design.",
        social: {
          facebook: "https://facebook.com/anthony",
          twitter: "https://twitter.com/anthony",
          linkedin: "https://linkedin.com/in/anthony", 
          skype: "anthony.rejlers",
          pinterest: "https://pinterest.com/anthony"
        }
      }
    ]
  },

  // Testimonials Section - What Say Our Client
  testimonials: {
    backgroundType: "gradient", // "image" or "gradient" or "solid"
    backgroundImage: "/images/background/testimonial-bg.jpg",
    title: "What Say Our Client",
    description: "Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut. Elit massa dui, leo enim magna. Cursus maecenas cubilia, ac nonummy, egestas mauris.",
    layout: {
      type: "carousel", // "carousel" or "grid"
      autoPlay: true,
      autoPlayDelay: 5000,
      showDots: true,
      showArrows: true,
      slidesToShow: {
        desktop: 3,    // 3 testimonials visible on desktop
        tablet: 2,     // 2 on tablet
        mobile: 1      // 1 on mobile
      }
    },
    items: [
      {
        id: 1,
        name: "Abigail",
        position: "Engineer",
        company: "Industrial Solutions",
        image: "/images/client/client2.png",
        rating: 5,
        content: "Atomorum principes eu mea, at nec insolens dissentiet, no vis nulla lucilius. Nam veritus pericula id. Utinam fastidii consetetur eam at."
      },
      {
        id: 2, 
        name: "Elizabeth",
        position: "Architecture",
        company: "Design Studios",
        image: "/images/client/client3.png",
        rating: 5,
        content: "Atomorum principes eu mea, at nec insolens dissentiet, no vis nulla lucilius. Nam veritus pericula id. Utinam fastidii consetetur eam at."
      },
      {
        id: 3,
        name: "Anthony", 
        position: "Industrial",
        company: "Manufacturing Corp",
        image: "/images/client/client1.png",
        rating: 5,
        content: "Atomorum principes eu mea, at nec insolens dissentiet, no vis nulla lucilius. Nam veritus pericula id. Utinam fastidii consetetur eam at."
      },
      {
        id: 4,
        name: "Michael Johnson",
        position: "Project Manager",
        company: "Construction Ltd",
        image: "/images/client/client2.png",
        rating: 5,
        content: "Outstanding service and professional approach. Their team delivered exactly what we needed for our industrial project. Highly recommended!"
      },
      {
        id: 5,
        name: "Sarah Williams",
        position: "Operations Director", 
        company: "Energy Solutions",
        image: "/images/client/client3.png",
        rating: 5,
        content: "Excellent expertise in industrial automation. The project was completed on time and exceeded our expectations in every aspect."
      },
      {
        id: 6,
        name: "David Brown",
        position: "Technical Lead",
        company: "Petroleum Industries", 
        image: "/images/client/client1.png",
        rating: 5,
        content: "Professional team with deep industry knowledge. Their technical solutions have significantly improved our operational efficiency."
      }
    ]
  },

  // Blog/News Section
  blog: {
    title: "Our Latest Blog",
    description: "Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut. Elit massa dui, leo enim magna. Cursus maecenas cubilia, ac nonummy, egestas mauris.",
    backgroundType: "solid", // "solid", "gradient", "image"
    backgroundColor: "#f8f9fa",
    layout: {
      type: "grid", // "grid", "list"
      columns: {
        desktop: 3,
        tablet: 2, 
        mobile: 1
      },
      showViewAll: true,
      viewAllText: "View All Posts",
      viewAllLink: "/blog"
    },
    items: [
      {
        id: 1,
        title: "Eam vide graece suscipiantur ea, cum ad solet",
        excerpt: "Eam vide graece suscipiantur ea, cum ad solet apeirian mnesarchum, has soluta forensibus cu. Reque iudico eum ad. At vivendo lucilius est, an has mentitum perpetua",
        image: "/images/blog/b1.jpg",
        author: {
          name: "Admin",
          avatar: "/images/blog/commenter_1.jpg"
        },
        publishDate: "28 Jun 2018",
        category: "Industrial",
        comments: 24,
        tags: ["Technology", "Industrial", "Business"],
        readMoreText: "Learn More",
        link: "/blog-details"
      },
      {
        id: 2,
        title: "Ne qui impetus gubergren, duo ne homero vidisse.",
        excerpt: "Eam vide graece suscipiantur ea, cum ad solet apeirian mnesarchum, has soluta forensibus cu. Reque iudico eum ad. At vivendo lucilius est, an has mentitum perpetua",
        image: "/images/blog/b2.jpg",
        author: {
          name: "Admin",
          avatar: "/images/blog/commenter_2.jpg"
        },
        publishDate: "29 Jun 2018",
        category: "Technology",
        comments: 24,
        tags: ["Innovation", "Technology", "Solutions"],
        readMoreText: "Learn More",
        link: "/blog-details"
      },
      {
        id: 3,
        title: "Mazim legere aliquando integre consectetuer.",
        excerpt: "Eam vide graece suscipiantur ea, cum ad solet apeirian mnesarchum, has soluta forensibus cu. Reque iudico eum ad. At vivendo lucilius est, an has mentitum perpetua",
        image: "/images/blog/b3.jpg",
        author: {
          name: "Admin",
          avatar: "/images/blog/commenter_1.jpg"
        },
        publishDate: "02 July 2018",
        category: "Business",
        comments: 24,
        tags: ["Management", "Business", "Strategy"],
        readMoreText: "Learn More",
        link: "/blog-details"
      }
    ]
  },

  // Partners/Clients Section
  partners: {
    title: "Our Trusted Partners",
    subtitle: "We work with leading companies in the industry",
    items: [
      {
        id: 1,
        name: "Partner Company 1",
        logo: "/images/client/client1.png",
        link: "https://partner1.com"
      },
      {
        id: 2,
        name: "Partner Company 2", 
        logo: "/images/client/client2.png",
        link: "https://partner2.com"
      },
      {
        id: 3,
        name: "Partner Company 3",
        logo: "/images/client/client3.png",
        link: "https://partner3.com"
      }
    ]
  },

  // Footer Configuration
  footer: {
    backgroundType: "gradient", // "gradient", "solid", "image"
    backgroundGradient: "from-slate-800 via-slate-900 to-slate-950",
    logo: null, // Disabled - no footer logo/branding section
    showBranding: false, // PERMANENT: Disable footer branding section
    layout: {
      type: "modern", // "modern", "classic"
      columns: {
        desktop: 4,
        tablet: 2,
        mobile: 1
      },
      spacing: {
        section: "py-16 lg:py-20",
        columns: "gap-8 lg:gap-12",
        content: "space-y-6"
      }
    },
    brand: null, // PERMANENT: No brand section in footer
    columns: [
      {
        id: "company",
        title: "Company Info",
        type: "enhanced-content",
        icon: "icofont-building-alt",
        content: {
          workingHours: {
            title: "Business Hours",
            icon: "icofont-clock-time",
            schedule: [
              { days: "Monday - Friday", hours: "8:00 AM - 6:00 PM", status: "open" },
              { days: "Saturday", hours: "9:00 AM - 4:00 PM", status: "limited" },
              { days: "Sunday", hours: "Closed", status: "closed" }
            ]
          },
          stats: [
            { number: "500+", label: "Projects Completed", icon: "icofont-chart-growth" },
            { number: "15+", label: "Years Experience", icon: "icofont-award" }
          ]
        }
      },
      {
        id: "services",
        title: "Our Expertise",
        type: "enhanced-links",
        icon: "icofont-tools",
        links: [
          { 
            label: "Industrial Automation", 
            href: "/services/automation",
            description: "Smart factory solutions",
            icon: "icofont-automation"
          },
          { 
            label: "Energy Systems", 
            href: "/services/energy",
            description: "Sustainable power solutions", 
            icon: "icofont-light-bulb"
          },
          { 
            label: "Safety Management", 
            href: "/services/safety",
            description: "Comprehensive safety protocols",
            icon: "icofont-safety"
          },
          { 
            label: "Technical Support", 
            href: "/services/support",
            description: "24/7 maintenance services",
            icon: "icofont-live-support"
          }
        ]
      },
      {
        id: "navigation",
        title: "Quick Navigation", 
        type: "enhanced-links",
        icon: "icofont-navigation-menu",
        links: [
          { 
            label: "About REJLERS", 
            href: "/about",
            description: "Our story & mission",
            icon: "icofont-building"
          },
          { 
            label: "Project Portfolio", 
            href: "/projects",
            description: "Latest work showcase",
            icon: "icofont-portfolio"
          },
          { 
            label: "Industry Insights", 
            href: "/blog",
            description: "News & updates",
            icon: "icofont-newspaper"
          },
          { 
            label: "Get In Touch", 
            href: "/contact",
            description: "Start your project",
            icon: "icofont-phone"
          }
        ]
      },
      {
        id: "contact",
        title: "Contact Information",
        type: "enhanced-contact",
        icon: "phone-circle",
        contact: {
          headline: "Ready to Start Your Project?",
          subtitle: "Get professional consultation today",
          details: [
            {
              type: "address",
              icon: "location-pin",
              label: "Head Office",
              primary: "123 Industrial Avenue",
              secondary: "Manufacturing District, NY 10001",
              action: { text: "Get Directions", link: "https://maps.google.com" }
            },
            {
              type: "phone",
              icon: "phone",
              label: "Phone Support",
              primary: "+1 (555) 0123-456",
              secondary: "24/7 Emergency Line",
              action: { text: "Call Now", link: "tel:+15550123456" }
            },
            {
              type: "email",
              icon: "envelope",
              label: "Email Support", 
              primary: "info@rejlers.com",
              secondary: "Response within 2 hours",
              action: { text: "Send Email", link: "mailto:info@rejlers.com" }
            }
          ],
          social: {
            title: "Follow Our Journey",
            platforms: [
              { name: "Facebook", icon: "icofont-facebook", link: "https://facebook.com/rejlers", color: "#1877f2" },
              { name: "Twitter", icon: "icofont-twitter", link: "https://twitter.com/rejlers", color: "#1da1f2" },
              { name: "LinkedIn", icon: "icofont-linkedin", link: "https://linkedin.com/company/rejlers", color: "#0077b5" },
              { name: "Instagram", icon: "icofont-instagram", link: "https://instagram.com/rejlers", color: "#e4405f" }
            ]
          }
        }
      }
    ],
    bottomBar: {
      copyright: "© 2025 REJLERS. All Rights Reserved.",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/privacy#cookies" },
        { label: "Sitemap", href: "/sitemap" }
      ]
    }
  },

  // About Page Configuration - Professional REJLERS Content
  aboutPage: {
    hero: {
      title: "TRUSTED PROVIDER OF HIGH-QUALITY ENGINEERING & PROJECT SERVICES",
      subtitle: "Building a sustainable future through Nordic engineering excellence",
      description: "Rejlers International Engineering Solutions is a trusted provider of high-quality engineering and project services. We have been present in Abu Dhabi, UAE, for over 15 years.",
      backgroundImage: "/images/about/about.jpg",
      stats: [
        { number: "80+", label: "Years of Engineering Excellence", icon: "icofont-award" },
        { number: "15+", label: "Years in UAE", icon: "icofont-location-pin" },
        { number: "500+", label: "Projects Delivered", icon: "icofont-chart-growth" },
        { number: "24/7", label: "Support Available", icon: "icofont-live-support" }
      ]
    },
    overview: {
      title: "About REJLERS",
      subtitle: "Nordic Engineering Heritage Meets Regional Excellence",
      description: "Specializing in the Oil & Gas, Refining, Petrochemical, Chemical, and Renewable Energy industries, as well as Industrial Infrastructure such as Buildings and Structures, Power Distribution, and Telecommunications, we serve clients throughout the UAE and the Arabian Gulf.",
      keyPoints: [
        "Operating from our regional headquarters in Abu Dhabi City",
        "Own office in Navi Mumbai, India for extended regional support", 
        "Strong track record in Industrial Digitization and AI solutions",
        "Parent company with more than 80 years of engineering expertise",
        "Bringing Nordic engineering heritage to the region",
        "Blending cutting-edge technology with longstanding tradition of quality"
      ],
      image: "/images/about/about.jpg"
    },
    coreAreas: {
      title: "Our Core Service Areas",
      subtitle: "Comprehensive Solutions for Modern Challenges",
      areas: [
        {
          id: "icv-excellence",
          title: "ICV Excellence",
          subtitle: "EMPOWERING ICV EXCELLENCE: COMMITMENT TO GROWTH AND COMMUNITY IMPACT",
          description: "At Rejlers, we are proud to actively support the UAE's In-Country Value (ICV) program by prioritizing local partnerships, developing UAE-based talent, and maximizing local procurement in our engineering projects.",
          features: [
            "Local partnerships and talent development",
            "UAE-based procurement maximization", 
            "Knowledge transfer and job creation",
            "Sustainable investments within the Emirates",
            "ICV score improvement support",
            "Resource-efficient engineering solutions"
          ],
          icon: "icofont-chart-growth",
          image: "/images/service/service-1.jpg",
          color: "from-green-600 to-green-700"
        },
        {
          id: "energy-transition", 
          title: "Energy Transition",
          subtitle: "LEADING THE ENERGY TRANSFORMATION",
          description: "The energy transition is transforming the entire system, and many of our customers are driving this change with major investments and projects that will reduce emissions and reshape how energy is produced and consumed.",
          features: [
            "Renewable energy system design",
            "Carbon emission reduction projects",
            "Energy storage solutions",
            "Grid modernization and smart systems",
            "Sustainable energy consulting",
            "Clean energy infrastructure development"
          ],
          icon: "icofont-light-bulb",
          image: "/images/service/service-2.jpg", 
          color: "from-blue-600 to-blue-700"
        },
        {
          id: "industry-transformation",
          title: "Industry Transformation", 
          subtitle: "DRIVING SUSTAINABLE INDUSTRY TRANSFORMATION",
          description: "The industrial sector is transforming rapidly, requiring our customers to adopt the latest technologies. Investments in electrification, energy storage, hydrogen solutions, and carbon capture are key to fossil-free production.",
          features: [
            "Industrial electrification systems",
            "Hydrogen solutions and infrastructure",
            "Carbon capture technology", 
            "Process redesign for efficiency",
            "Enhanced recycling systems",
            "Circular economy business models"
          ],
          icon: "icofont-industries-2",
          image: "/images/service/service-3.jpg",
          color: "from-orange-600 to-orange-700"
        },
        {
          id: "future-communities",
          title: "Future-Proof Communities",
          subtitle: "BUILDING RESILIENT INFRASTRUCTURE", 
          description: "The shift towards sustainable development is transforming transport systems and the built environment. Road infrastructure is adapting for fossil-free vehicles, rail capacity is expanding, and buildings are becoming more energy-efficient.",
          features: [
            "Sustainable transport infrastructure",
            "Energy-efficient building design", 
            "Digital infrastructure and cyber security",
            "Automated systems integration",
            "Electrification projects",
            "Resilient community planning"
          ],
          icon: "icofont-building",
          image: "/images/service/service-4.jpg",
          color: "from-purple-600 to-purple-700"
        }
      ]
    },
    values: {
      title: "Our Values & Certifications",
      subtitle: "Quality, Innovation, and Sustainability at Our Core",
      certifications: [
        {
          title: "ISO 9001:2015 Certified",
          description: "International standard for quality management systems",
          icon: "icofont-award",
          badge: "ISO 9001:2015"
        },
        {
          title: "API & DNV Compliant", 
          description: "Meeting highest industry standards for oil & gas operations",
          icon: "icofont-safety",
          badge: "API & DNV"
        },
        {
          title: "Advanced Digital Solutions",
          description: "Leading in Industrial Digitization and AI solutions",
          icon: "icofont-automation",
          badge: "AI & Digital"
        }
      ],
      coreValues: [
        {
          title: "Excellence",
          description: "Committed to delivering the highest quality engineering solutions",
          icon: "icofont-star"
        },
        {
          title: "Innovation", 
          description: "Embracing cutting-edge technology and creative problem-solving",
          icon: "icofont-light-bulb"
        },
        {
          title: "Sustainability",
          description: "Building solutions that support environmental responsibility", 
          icon: "icofont-eco-energy"
        },
        {
          title: "Partnership",
          description: "Fostering long-term relationships with clients and communities",
          icon: "icofont-handshake-deal"
        }
      ]
    },
    globalPresence: {
      title: "Global Presence, Local Expertise", 
      subtitle: "Connecting Nordic Excellence with Regional Knowledge",
      description: "With headquarters in Sweden and strong regional presence in the UAE, we combine international expertise with local market understanding.",
      offices: [
        {
          country: "Sweden",
          city: "Stockholm", 
          type: "Global Headquarters",
          description: "Nordic engineering excellence and innovation center",
          phone: "+46 771 78 00 00",
          established: "1942"
        },
        {
          country: "United Arab Emirates",
          city: "Abu Dhabi",
          type: "Regional Headquarters", 
          description: "Middle East operations and client services hub",
          phone: "+971 2 639 7449", 
          established: "2009"
        },
        {
          country: "India", 
          city: "Navi Mumbai",
          type: "Regional Office",
          description: "Extended regional support and engineering services",
          phone: "+91 22 xxxx xxxx",
          established: "2015"
        }
      ],
      globalStats: [
        { number: "4", label: "Countries", icon: "icofont-globe" },
        { number: "2000+", label: "Employees Globally", icon: "icofont-users-alt-5" },
        { number: "50+", label: "Years of Growth", icon: "icofont-chart-line" },
        { number: "1000+", label: "Global Projects", icon: "icofont-tasks" }
      ]
    },
    leadership: {
      title: "Leadership Excellence", 
      subtitle: "Experienced professionals driving innovation and growth",
      leaders: [
        {
          name: "Magnus Carlsson",
          position: "Chief Executive Officer", 
          image: "/images/team/team-1.jpg",
          bio: "Leading REJLERS global operations with focus on sustainable engineering solutions and market expansion.",
          specialties: ["Strategic Leadership", "Sustainable Engineering", "Global Operations"]
        },
        {
          name: "Petra Einarsson", 
          position: "Regional Director - Middle East",
          image: "/images/team/team-2.jpg", 
          bio: "Overseeing Middle East operations with emphasis on local partnerships and ICV program excellence.",
          specialties: ["Regional Operations", "ICV Programs", "Client Relations"]
        },
        {
          name: "Ahmed Al-Rashid",
          position: "Engineering Director - UAE", 
          image: "/images/team/team-3.jpg",
          bio: "Leading technical excellence in oil & gas, renewable energy, and industrial transformation projects.",
          specialties: ["Oil & Gas Engineering", "Renewable Energy", "Industrial Systems"]
        }
      ]
    },
    callToAction: {
      title: "Ready to Partner with REJLERS?",
      subtitle: "Let's discuss how our engineering excellence can support your next project", 
      description: "Contact our team of experts to explore innovative solutions tailored to your specific needs in oil & gas, renewable energy, or industrial infrastructure.",
      buttons: [
        {
          text: "Contact Our Experts",
          href: "/contact",
          variant: "primary",
          icon: "icofont-phone"
        },
        {
          text: "Explore Our Services", 
          href: "/services",
          variant: "outline",
          icon: "icofont-long-arrow-right"
        }
      ]
    }
  },

  // Services Page Configuration - Professional REJLERS Services
  servicesPage: {
    hero: {
      title: "SECTORS AND SERVICES",
      subtitle: "Engineering Consultancy Services for a Sustainable Future",
      description: "We provide engineering consultancy services, specializing in delivering innovative and sustainable solutions across various industries. With deep expertise, we help companies, public entities, and other organizations meet tomorrow's societal challenges.",
      backgroundImage: "/images/service/service-hero.jpg",
      stats: [
        { number: "6", label: "Core Sectors", icon: "icofont-industries-4" },
        { number: "80+", label: "Years Experience", icon: "icofont-award" },
        { number: "500+", label: "Projects Delivered", icon: "icofont-chart-growth" },
        { number: "15+", label: "Countries Served", icon: "icofont-globe" }
      ]
    },
    overview: {
      title: "SECTORS WE SERVE",
      subtitle: "Our expertise spans across multiple industries",
      description: "Rejlers creates value along the entire energy supply chain and beyond. Together with our customers, we are enabling a sustainable shift towards a cleaner, more efficient future across all sectors we serve.",
      highlightText: "Leading in Energy and Power for over 80 years"
    },
    sectors: {
      title: "Our Core Sectors",
      subtitle: "Comprehensive solutions across industries",
      items: [
        {
          id: "energy-power",
          title: "Energy and Power",
          subtitle: "LEADING IN ENERGY AND POWER FOR OVER 80 YEARS",
          description: "Energy and power have been core competencies at Rejlers since our founding in 1942. With our current international presence, we offer comprehensive expertise and capabilities wherein we combine deep knowledge of local specifics with regional insights and regulations.",
          icon: "icofont-lightning-ray",
          image: "/images/service/energy-power.jpg",
          color: "from-blue-600 to-blue-700",
          features: [
            "Sources and production - Wide range of energy sources and production services",
            "Distribution and storage - Reliable and flexible energy distribution with integrated storage",
            "End use application - Comprehensive services to optimize energy use",
            "Renewable energy systems and grid integration",
            "Power generation and transmission infrastructure",
            "Energy efficiency consulting and optimization"
          ],
          services: [
            { name: "Sources and Production", description: "Energy sources and production expertise" },
            { name: "Distribution and Storage", description: "Energy distribution with integrated storage" },
            { name: "End Use Applications", description: "Optimize energy use applications" }
          ],
          contact: {
            name: "Jarmo Suominen",
            position: "Middle East and UAE",
            email: "jarmo.suominen@rejlers.ae",
            phone: "+971 2 639 7449"
          }
        },
        {
          id: "industry",
          title: "Industry",
          subtitle: "DRIVING SUSTAINABLE INDUSTRY TRANSFORMATION",
          description: "The industrial sector is transforming rapidly, requiring our customers to adopt the latest technologies. Investments in electrification, energy storage, hydrogen solutions, and carbon capture are key to fossil-free production.",
          icon: "icofont-industries-2",
          image: "/images/service/industry.jpg",
          color: "from-orange-600 to-orange-700",
          features: [
            "Industrial electrification and automation systems",
            "Hydrogen solutions and infrastructure development", 
            "Carbon capture and storage technology",
            "Process redesign for enhanced efficiency",
            "Advanced recycling and waste management systems",
            "Circular economy business model implementation"
          ],
          services: [
            { name: "Industrial Automation", description: "Smart manufacturing solutions" },
            { name: "Process Engineering", description: "Optimized industrial processes" },
            { name: "Environmental Solutions", description: "Sustainable industrial practices" }
          ]
        },
        {
          id: "infrastructure-environment",
          title: "Infrastructure and Environment",
          subtitle: "BUILDING RESILIENT AND SUSTAINABLE INFRASTRUCTURE",
          description: "Our infrastructure and environment expertise helps create sustainable communities and resilient systems that adapt to climate change while supporting economic growth and social development.",
          icon: "icofont-building",
          image: "/images/service/infrastructure.jpg",
          color: "from-green-600 to-green-700",
          features: [
            "Transportation infrastructure development",
            "Water and wastewater management systems",
            "Environmental impact assessment and mitigation",
            "Climate resilience planning and implementation",
            "Sustainable urban development projects",
            "Green infrastructure and nature-based solutions"
          ],
          services: [
            { name: "Transportation Systems", description: "Modern transport infrastructure" },
            { name: "Water Management", description: "Sustainable water solutions" },
            { name: "Environmental Engineering", description: "Environmental protection systems" }
          ]
        },
        {
          id: "buildings-properties",
          title: "Buildings and Properties",
          subtitle: "SMART AND SUSTAINABLE BUILDING SOLUTIONS",
          description: "We design and implement intelligent building solutions that maximize energy efficiency, occupant comfort, and operational performance while minimizing environmental impact.",
          icon: "icofont-home",
          image: "/images/service/buildings.jpg",
          color: "from-purple-600 to-purple-700",
          features: [
            "Smart building design and automation",
            "Energy-efficient HVAC and electrical systems", 
            "Sustainable construction materials and methods",
            "Building information modeling (BIM) implementation",
            "Green building certification consulting",
            "Facility management and optimization services"
          ],
          services: [
            { name: "Smart Building Design", description: "Intelligent building solutions" },
            { name: "Energy Systems", description: "Efficient building energy systems" },
            { name: "Sustainability Consulting", description: "Green building expertise" }
          ]
        },
        {
          id: "communication-security",
          title: "Communication and Security",
          subtitle: "ADVANCED DIGITAL INFRASTRUCTURE AND CYBERSECURITY",
          description: "Our communication and security services ensure robust, secure, and future-ready digital infrastructure that supports modern business operations and protects critical assets.",
          icon: "icofont-network-tower",
          image: "/images/service/communication.jpg",
          color: "from-indigo-600 to-indigo-700",
          features: [
            "Telecommunications infrastructure development",
            "Cybersecurity systems and protocols",
            "Network design and optimization",
            "IoT and smart device integration",
            "Data center design and management",
            "Emergency communication systems"
          ],
          services: [
            { name: "Telecommunications", description: "Advanced communication infrastructure" },
            { name: "Cybersecurity", description: "Comprehensive security solutions" },
            { name: "Digital Infrastructure", description: "Modern digital systems" }
          ]
        },
        {
          id: "technical-management-consulting",
          title: "Technical Management Consulting",
          subtitle: "STRATEGIC TECHNICAL LEADERSHIP AND GUIDANCE",
          description: "Our technical management consulting services provide strategic guidance and leadership to help organizations navigate complex technical challenges and achieve their operational goals.",
          icon: "icofont-chart-line",
          image: "/images/service/consulting.jpg",
          color: "from-teal-600 to-teal-700",
          features: [
            "Technical strategy development and implementation",
            "Project management and execution oversight",
            "Technology assessment and selection guidance",
            "Operational excellence and efficiency improvement",
            "Risk management and mitigation strategies",
            "Change management and organizational development"
          ],
          services: [
            { name: "Strategic Planning", description: "Technical strategy development" },
            { name: "Project Management", description: "Expert project oversight" },
            { name: "Technology Consulting", description: "Technical guidance and support" }
          ]
        }
      ]
    },
    capabilities: {
      title: "Our Core Capabilities",
      subtitle: "Comprehensive engineering expertise across all phases",
      areas: [
        {
          title: "Engineering Design",
          description: "From concept to detailed engineering design across all disciplines",
          icon: "icofont-architecture",
          capabilities: [
            "Process Engineering",
            "Mechanical Engineering", 
            "Electrical Engineering",
            "Instrumentation & Control",
            "Civil & Structural Engineering",
            "Piping Engineering"
          ]
        },
        {
          title: "Project Management",
          description: "End-to-end project management from initiation to commissioning",
          icon: "icofont-tasks",
          capabilities: [
            "Project Planning & Scheduling",
            "Risk Management",
            "Quality Assurance",
            "Cost Control",
            "Stakeholder Management", 
            "Contract Administration"
          ]
        },
        {
          title: "Digital Solutions",
          description: "Advanced digital technologies for modern engineering challenges",
          icon: "icofont-computer",
          capabilities: [
            "Industrial Digitalization",
            "AI and Machine Learning",
            "IoT Implementation",
            "Data Analytics",
            "Digital Twin Technology",
            "Automation Systems"
          ]
        },
        {
          title: "Sustainability Services",
          description: "Environmental and sustainability consulting for responsible development",
          icon: "icofont-eco-energy",
          capabilities: [
            "Environmental Impact Assessment",
            "Carbon Footprint Analysis", 
            "Sustainability Reporting",
            "Green Technology Integration",
            "Circular Economy Solutions",
            "Renewable Energy Integration"
          ]
        }
      ]
    },
    recentProjects: {
      title: "DISCOVER OUR PROJECTS",
      subtitle: "How we support our customers",
      description: "Explore our latest projects and see how we deliver innovative solutions across different sectors.",
      items: [
        {
          id: 1,
          title: "Rejlers Abu Dhabi Signs Major Engineering Contract with ADOC for Mubarraz Oil Field Redevelopment",
          category: "Oil & Gas",
          date: "June 2, 2025",
          image: "/images/projects/adoc-project.jpg",
          description: "Major engineering contract for oil field redevelopment project in collaboration with Abu Dhabi Oil Company (ADOC) Japan.",
          link: "/projects/adoc-mubarraz-redevelopment",
          tags: ["Oil & Gas", "Engineering", "Field Development"]
        },
        {
          id: 2,
          title: "Rejlers Awarded Engineering Contract for Major Polyethylene Plant Revamp",
          category: "Petrochemicals",
          date: "May 14, 2025", 
          image: "/images/projects/polyethylene-plant.jpg",
          description: "Comprehensive engineering services for a major polyethylene plant revamp project, enhancing production capacity and efficiency.",
          link: "/projects/polyethylene-plant-revamp",
          tags: ["Petrochemicals", "Plant Revamp", "Process Engineering"]
        },
        {
          id: 3,
          title: "Successful Ways Forward in Clean Transition",
          category: "Energy Transition",
          date: "December 16, 2024",
          image: "/images/projects/clean-transition.jpg",
          description: "Innovative approaches to clean energy transition including old, new and blue hydrogen solutions for sustainable future.",
          link: "/projects/clean-transition-solutions",
          tags: ["Renewable Energy", "Hydrogen", "Sustainability"]
        }
      ]
    },
    clientTestimonials: {
      title: "What Our Clients Say",
      subtitle: "Success stories from our valued partnerships",
      items: [
        {
          client: "ADNOC",
          project: "Oil Field Development",
          testimonial: "Rejlers demonstrated exceptional technical expertise and project management capabilities. Their innovative solutions significantly improved our operational efficiency.",
          rating: 5
        },
        {
          client: "Major Petrochemical Company",
          project: "Plant Modernization",
          testimonial: "The team's deep understanding of process engineering and commitment to safety made this complex revamp project a great success.",
          rating: 5
        }
      ]
    },
    callToAction: {
      title: "Ready to Start Your Next Project?",
      subtitle: "Let our experts help you achieve your engineering goals",
      description: "Contact our specialized team to discuss your requirements and discover how our comprehensive services can support your success in a rapidly changing world.",
      primaryButton: {
        text: "Contact Our Experts",
        href: "/contact", 
        icon: "icofont-phone"
      },
      secondaryButton: {
        text: "Download Brochure",
        href: "/resources/brochure",
        icon: "icofont-download"
      }
    }
  },

  // Intelligent Help System Configuration - AI-Powered Client Assistance
  helpSystem: {
    hero: {
      title: "How Can We Assist You Today?",
      subtitle: "Get personalized help based on your specific needs and project type",
      description: "Our intelligent help system uses advanced AI to understand your requirements and connect you with the right experts and resources.",
      backgroundImage: "/images/help/help-hero.jpg"
    },
    clientTypes: {
      title: "Tell Us About Your Project",
      subtitle: "Select your client type for personalized assistance",
      types: [
        {
          id: "oil-gas-operator",
          title: "Oil & Gas Operator",
          subtitle: "Production, Refining & Petrochemicals",
          description: "Upstream, midstream, and downstream oil & gas operations including field development, refinery operations, and petrochemical processing.",
          icon: "icofont-oil",
          color: "from-orange-600 to-orange-700",
          services: [
            "Field Development & Engineering",
            "Refinery Design & Optimization", 
            "Petrochemical Plant Engineering",
            "Pipeline & Infrastructure",
            "Safety & Environmental Compliance",
            "Digital Transformation & IoT"
          ],
          commonQuestions: [
            "How can we optimize our refinery operations?",
            "What are the latest safety regulations for offshore operations?",
            "How can we reduce our carbon footprint?",
            "What digital solutions are available for remote monitoring?"
          ],
          specialists: [
            { name: "Jarmo Suominen", role: "Oil & Gas Director", email: "jarmo.suominen@rejlers.ae", phone: "+971 2 639 7449" }
          ]
        },
        {
          id: "renewable-energy-developer",
          title: "Renewable Energy Developer",
          subtitle: "Solar, Wind & Clean Energy Projects",
          description: "Renewable energy project development, grid integration, and sustainable energy solutions for a clean energy future.",
          icon: "icofont-solar-panel",
          color: "from-green-600 to-green-700",
          services: [
            "Solar Power Plant Design",
            "Wind Farm Engineering",
            "Energy Storage Solutions",
            "Grid Integration & Smart Systems",
            "Environmental Impact Assessment",
            "Power Purchase Agreement Support"
          ],
          commonQuestions: [
            "What's the feasibility of solar projects in our region?",
            "How do we integrate renewable energy with existing grid?",
            "What energy storage options are most cost-effective?",
            "How can we optimize renewable energy production?"
          ],
          specialists: [
            { name: "Anna Honnér", role: "Connected Energy Director", email: "anna.honner@rejlers.se", phone: "+46 728 886 868" }
          ]
        },
        {
          id: "industrial-manufacturer",
          title: "Industrial Manufacturer",
          subtitle: "Manufacturing & Process Industries",
          description: "Industrial automation, process optimization, and smart manufacturing solutions for improved efficiency and sustainability.",
          icon: "icofont-factory",
          color: "from-blue-600 to-blue-700",
          services: [
            "Industrial Automation & Control",
            "Process Engineering & Optimization",
            "Smart Manufacturing Solutions",
            "Quality Management Systems",
            "Energy Efficiency Programs",
            "Circular Economy Implementation"
          ],
          commonQuestions: [
            "How can we automate our production processes?",
            "What are the benefits of Industry 4.0 technologies?",
            "How can we reduce energy consumption in manufacturing?",
            "What quality standards should we implement?"
          ],
          specialists: [
            { name: "Larissa Gustafsson", role: "Industry & Energy Director", email: "larissa.gustafsson@rejlers.no", phone: "+47 40 325 698" }
          ]
        },
        {
          id: "infrastructure-developer",
          title: "Infrastructure Developer",
          subtitle: "Urban Planning & Smart Cities",
          description: "Infrastructure development, smart city solutions, and sustainable urban planning for future-ready communities.",
          icon: "icofont-building-alt",
          color: "from-purple-600 to-purple-700",
          services: [
            "Smart City Planning",
            "Transportation Infrastructure",
            "Water & Waste Management",
            "Digital Infrastructure",
            "Green Building Design",
            "Climate Resilience Planning"
          ],
          commonQuestions: [
            "How do we implement smart city technologies?",
            "What sustainable transportation options are available?",
            "How can we improve urban water management?",
            "What are the best practices for green infrastructure?"
          ],
          specialists: [
            { name: "Magnus Carlsson", role: "Regional Director", email: "magnus.carlsson@rejlers.ae", phone: "+971 2 639 7449" }
          ]
        },
        {
          id: "government-agency",
          title: "Government Agency",
          subtitle: "Public Sector & Regulatory Bodies",
          description: "Government and public sector consulting including policy development, regulatory compliance, and public infrastructure projects.",
          icon: "icofont-government",
          color: "from-indigo-600 to-indigo-700",
          services: [
            "Policy Development & Analysis",
            "Regulatory Compliance Consulting",
            "Public Infrastructure Planning",
            "Environmental Impact Studies",
            "Strategic Planning & Implementation",
            "Stakeholder Engagement"
          ],
          commonQuestions: [
            "How can we develop effective energy policies?",
            "What are international best practices for our sector?",
            "How do we ensure regulatory compliance?",
            "What stakeholder engagement strategies work best?"
          ],
          specialists: [
            { name: "Government Relations Team", role: "Public Sector Specialists", email: "government@rejlers.ae", phone: "+971 2 639 7449" }
          ]
        },
        {
          id: "technology-startup",
          title: "Technology Startup",
          subtitle: "Innovation & Digital Solutions",
          description: "Technology companies and startups looking for engineering expertise, digital transformation, and innovative solutions.",
          icon: "icofont-rocket-alt-1",
          color: "from-teal-600 to-teal-700",
          services: [
            "Technology Validation & Testing",
            "Digital Solution Development",
            "IoT & Connectivity Solutions",
            "Data Analytics & AI Implementation",
            "Scalability Engineering",
            "Innovation Consulting"
          ],
          commonQuestions: [
            "How can we validate our technology concept?",
            "What IoT solutions fit our business model?",
            "How do we scale our technology infrastructure?",
            "What data analytics tools should we implement?"
          ],
          specialists: [
            { name: "Innovation Team", role: "Digital Solutions Experts", email: "innovation@rejlers.ae", phone: "+971 2 639 7449" }
          ]
        }
      ]
    },
    aiAssistant: {
      title: "AI-Powered Support Assistant",
      subtitle: "Get instant answers with our intelligent chatbot",
      description: "Our AI assistant is trained on REJLERS' expertise and can help you with project inquiries, service information, and technical guidance.",
      features: [
        "24/7 Availability",
        "Multi-language Support", 
        "Context-Aware Responses",
        "Expert Escalation",
        "Document Search",
        "Project History Access"
      ],
      capabilities: {
        "Technical Queries": {
          description: "Get answers about engineering processes, standards, and best practices",
          examples: ["What are API 650 tank design requirements?", "How to calculate heat exchanger sizing?", "What safety factors should be used in offshore structures?"]
        },
        "Service Information": {
          description: "Learn about our services, capabilities, and project approaches",
          examples: ["What services do you offer for renewable energy?", "How do you approach digital transformation projects?", "What is your experience in the Middle East?"]
        },
        "Project Guidance": {
          description: "Get guidance on project planning, execution, and management",
          examples: ["How do you manage large-scale industrial projects?", "What is your typical project timeline?", "How do you ensure quality and safety?"]
        },
        "Regulatory Compliance": {
          description: "Information about industry standards, regulations, and compliance requirements",
          examples: ["What are UAE environmental regulations for oil & gas?", "How to comply with ISO 14001 standards?", "What safety certifications are required?"]
        }
      }
    },
    quickActions: {
      title: "Quick Actions",
      subtitle: "Fast access to common requests",
      actions: [
        {
          id: "schedule-consultation",
          title: "Schedule Free Consultation",
          description: "Book a meeting with our experts",
          icon: "icofont-calendar",
          action: "/contact?type=consultation",
          color: "bg-blue-600 hover:bg-blue-700"
        },
        {
          id: "get-quote",
          title: "Request Project Quote",
          description: "Get a detailed quote for your project",
          icon: "icofont-calculator-alt-2",
          action: "/contact?type=quote",
          color: "bg-green-600 hover:bg-green-700"
        },
        {
          id: "technical-support",
          title: "Technical Support",
          description: "Get help with ongoing projects",
          icon: "icofont-tools-bag",
          action: "/contact?type=support",
          color: "bg-orange-600 hover:bg-orange-700"
        },
        {
          id: "emergency-response",
          title: "Emergency Response",
          description: "24/7 emergency engineering support",
          icon: "icofont-emergency",
          action: "tel:+971263974490",
          color: "bg-red-600 hover:bg-red-700"
        },
        {
          id: "download-brochure",
          title: "Download Brochure",
          description: "Get our company and services overview",
          icon: "icofont-download",
          action: "/resources/brochure.pdf",
          color: "bg-purple-600 hover:bg-purple-700"
        },
        {
          id: "case-studies",
          title: "View Case Studies",
          description: "Explore our successful projects",
          icon: "icofont-chart-growth",
          action: "/projects",
          color: "bg-indigo-600 hover:bg-indigo-700"
        }
      ]
    },
    frequentlyAsked: {
      title: "Frequently Asked Questions",
      subtitle: "Quick answers to common inquiries",
      categories: [
        {
          id: "general",
          title: "General Information",
          questions: [
            {
              question: "What industries does REJLERS serve?",
              answer: "REJLERS serves six core sectors: Energy & Power, Industry, Infrastructure & Environment, Buildings & Properties, Communication & Security, and Technical Management Consulting. We have particular expertise in oil & gas, renewable energy, and industrial automation."
            },
            {
              question: "Where are REJLERS offices located?",
              answer: "REJLERS has its global headquarters in Stockholm, Sweden, with regional offices in Abu Dhabi (UAE), Navi Mumbai (India), and multiple locations across Nordic countries (Finland, Norway)."
            },
            {
              question: "How long has REJLERS been in business?",
              answer: "REJLERS was founded in 1942 and has over 80 years of engineering excellence. We have been operating in the UAE for more than 15 years, establishing strong local partnerships and expertise."
            }
          ]
        },
        {
          id: "services",
          title: "Services & Capabilities",
          questions: [
            {
              question: "What engineering disciplines does REJLERS cover?",
              answer: "We cover all major engineering disciplines including Process Engineering, Mechanical Engineering, Electrical Engineering, Instrumentation & Control, Civil & Structural Engineering, and Piping Engineering, along with project management and digital solutions."
            },
            {
              question: "Do you provide 24/7 support services?",
              answer: "Yes, we offer 24/7 emergency support for critical operations and ongoing projects. Our support covers technical assistance, troubleshooting, and emergency response across all time zones."
            },
            {
              question: "What is REJLERS' approach to digital transformation?",
              answer: "We integrate advanced digital technologies including AI, IoT, digital twins, and data analytics into traditional engineering solutions. Our digitalization services help clients optimize operations, improve efficiency, and enable predictive maintenance."
            }
          ]
        },
        {
          id: "projects",
          title: "Project Execution",
          questions: [
            {
              question: "How does REJLERS ensure project quality and safety?",
              answer: "We maintain ISO 9001:2015 certification and follow international standards (API, DNV, ASME). Our comprehensive QA/QC procedures, safety protocols, and experienced team ensure successful project delivery."
            },
            {
              question: "What is the typical project timeline?",
              answer: "Project timelines vary based on scope and complexity. Small studies may take 2-4 weeks, while major engineering projects can range from 6 months to several years. We provide detailed schedules during the proposal phase."
            },
            {
              question: "How do you handle international projects?",
              answer: "With our global presence and local expertise, we manage international projects through dedicated project teams, local partnerships, and adherence to regional regulations and standards."
            }
          ]
        }
      ]
    },
    knowledgeBase: {
      title: "Knowledge Base & Resources",
      subtitle: "Access our library of technical resources and industry insights",
      categories: [
        {
          id: "technical-guides",
          title: "Technical Guides",
          description: "Comprehensive guides on engineering processes and best practices",
          icon: "icofont-book-alt",
          resources: [
            "Oil & Gas Engineering Standards Guide",
            "Renewable Energy Project Development Handbook",
            "Industrial Automation Implementation Guide",
            "Environmental Compliance Checklist"
          ]
        },
        {
          id: "case-studies",
          title: "Case Studies",
          description: "Real project examples and lessons learned",
          icon: "icofont-chart-line",
          resources: [
            "ADNOC Oil Field Redevelopment Project",
            "Polyethylene Plant Revamp Success Story",
            "Smart City Infrastructure Implementation",
            "Renewable Energy Grid Integration Project"
          ]
        },
        {
          id: "white-papers",
          title: "White Papers",
          description: "Industry insights and thought leadership articles",
          icon: "icofont-file-document",
          resources: [
            "Future of Energy Transition in the Middle East",
            "Digital Transformation in Oil & Gas Industry",
            "Sustainable Industrial Development Strategies",
            "AI Applications in Engineering Services"
          ]
        },
        {
          id: "webinars",
          title: "Webinars & Training",
          description: "Educational content and professional development",
          icon: "icofont-play-alt-1",
          resources: [
            "Advanced Process Engineering Techniques",
            "Cybersecurity in Industrial Systems",
            "Sustainability in Engineering Design",
            "Project Management Best Practices"
          ]
        }
      ]
    },
    contactOptions: {
      title: "Connect With Our Experts",
      subtitle: "Multiple ways to get in touch with the right specialist",
      options: [
        {
          id: "direct-contact",
          title: "Direct Contact",
          description: "Speak directly with our specialists",
          methods: [
            {
              type: "phone",
              label: "Global Support",
              value: "+46 771 78 00 00",
              availability: "Mon-Fri: 08:00-17:00 CET"
            },
            {
              type: "phone", 
              label: "UAE Regional Office",
              value: "+971 2 639 7449",
              availability: "Sun-Thu: 08:00-17:00 GST"
            },
            {
              type: "email",
              label: "General Inquiries",
              value: "info@rejlers.com",
              availability: "Response within 4 hours"
            }
          ]
        },
        {
          id: "online-meeting",
          title: "Video Consultation",
          description: "Schedule a video call with our experts",
          platforms: ["Microsoft Teams", "Zoom", "Google Meet"],
          availability: "Available across all time zones"
        },
        {
          id: "site-visit",
          title: "On-Site Consultation",
          description: "Request a visit to your facility",
          coverage: ["UAE", "Middle East", "Nordic Countries", "Global (on request)"],
          timeline: "Usually within 1-2 weeks"
        }
      ]
    }
  },

  // Customer Support Ticketing System
  ticketingSystem: {
    hero: {
      title: "Customer Support Portal",
      subtitle: "Submit and track your support requests with our advanced ticketing system",
      description: "Get professional assistance from our expert team. Track your tickets, upload documents, and receive real-time updates on your support requests.",
      backgroundImage: "/images/support/support-hero.jpg"
    },
    categories: {
      title: "Support Categories",
      subtitle: "Select the type of support you need",
      types: [
        {
          id: "technical-support",
          title: "Technical Support",
          description: "Engineering issues, technical questions, and troubleshooting",
          icon: "icofont-tools-bag",
          color: "from-blue-600 to-blue-700",
          priority: "medium",
          slaHours: 4,
          assignedTeam: "Technical Engineering Team",
          subcategories: [
            "Process Engineering Issues",
            "Equipment Troubleshooting", 
            "Software/Digital Platform Support",
            "Safety & Compliance Questions",
            "Design & Specification Queries"
          ]
        },
        {
          id: "project-inquiry",
          title: "Project Inquiry",
          description: "New project discussions, quotes, and consultations",
          icon: "icofont-chart-growth",
          color: "from-green-600 to-green-700",
          priority: "high",
          slaHours: 2,
          assignedTeam: "Business Development Team",
          subcategories: [
            "New Project Quote Request",
            "Feasibility Study Inquiry",
            "Consultation Scheduling",
            "Proposal Discussion",
            "Contract & Legal Questions"
          ]
        },
        {
          id: "emergency-response",
          title: "Emergency Response",
          description: "Critical issues requiring immediate attention",
          icon: "icofont-emergency",
          color: "from-red-600 to-red-700",
          priority: "critical",
          slaHours: 1,
          assignedTeam: "24/7 Emergency Response Team",
          subcategories: [
            "Equipment Failure",
            "Safety Incident",
            "Environmental Emergency",
            "Production Shutdown",
            "Critical System Failure"
          ]
        },
        {
          id: "billing-admin",
          title: "Billing & Administration",
          description: "Invoice questions, payments, and administrative matters",
          icon: "icofont-calculator-alt-2",
          color: "from-purple-600 to-purple-700",
          priority: "low",
          slaHours: 24,
          assignedTeam: "Administration Team",
          subcategories: [
            "Invoice Inquiry",
            "Payment Processing",
            "Contract Administration",
            "Account Management",
            "Document Requests"
          ]
        },
        {
          id: "training-resources",
          title: "Training & Resources",
          description: "Training requests, documentation, and knowledge transfer",
          icon: "icofont-book-alt",
          color: "from-indigo-600 to-indigo-700",
          priority: "low",
          slaHours: 48,
          assignedTeam: "Knowledge Management Team",
          subcategories: [
            "Training Program Inquiry",
            "Documentation Request",
            "Best Practices Guidance",
            "Knowledge Transfer Session",
            "Certification Support"
          ]
        },
        {
          id: "feedback-suggestions",
          title: "Feedback & Suggestions",
          description: "Service feedback, improvement suggestions, and testimonials",
          icon: "icofont-comment",
          color: "from-teal-600 to-teal-700",
          priority: "low", 
          slaHours: 72,
          assignedTeam: "Quality Assurance Team",
          subcategories: [
            "Service Feedback",
            "Improvement Suggestions",
            "Testimonial Submission",
            "Quality Concerns",
            "Process Improvement Ideas"
          ]
        }
      ]
    },
    priorities: {
      critical: {
        id: "critical",
        label: "Critical",
        description: "Immediate attention required - Business critical issue",
        color: "bg-red-600",
        textColor: "text-red-600",
        slaHours: 1,
        escalationPath: ["Emergency Team Lead", "Regional Director", "Global Operations"]
      },
      high: {
        id: "high", 
        label: "High",
        description: "Important issue - Significant business impact",
        color: "bg-orange-500",
        textColor: "text-orange-500",
        slaHours: 4,
        escalationPath: ["Senior Engineer", "Team Lead", "Department Manager"]
      },
      medium: {
        id: "medium",
        label: "Medium",
        description: "Standard priority - Normal business operations",
        color: "bg-yellow-500",
        textColor: "text-yellow-600",
        slaHours: 24,
        escalationPath: ["Assigned Engineer", "Team Lead"]
      },
      low: {
        id: "low",
        label: "Low",
        description: "Low priority - Non-urgent matters",
        color: "bg-green-500",
        textColor: "text-green-600",
        slaHours: 72,
        escalationPath: ["Support Specialist"]
      }
    },
    status: {
      open: {
        id: "open",
        label: "Open",
        description: "Ticket has been created and is awaiting assignment",
        color: "bg-blue-500",
        textColor: "text-blue-600",
        allowedTransitions: ["in-progress", "closed"]
      },
      "in-progress": {
        id: "in-progress",
        label: "In Progress", 
        description: "Ticket is actively being worked on",
        color: "bg-yellow-500",
        textColor: "text-yellow-600",
        allowedTransitions: ["pending-customer", "resolved", "escalated"]
      },
      "pending-customer": {
        id: "pending-customer",
        label: "Pending Customer Response",
        description: "Waiting for additional information from customer",
        color: "bg-orange-500",
        textColor: "text-orange-600", 
        allowedTransitions: ["in-progress", "closed"]
      },
      escalated: {
        id: "escalated",
        label: "Escalated",
        description: "Ticket has been escalated to higher level support",
        color: "bg-purple-500",
        textColor: "text-purple-600",
        allowedTransitions: ["in-progress", "resolved"]
      },
      resolved: {
        id: "resolved",
        label: "Resolved",
        description: "Issue has been resolved, awaiting customer confirmation",
        color: "bg-green-500",
        textColor: "text-green-600",
        allowedTransitions: ["closed", "in-progress"]
      },
      closed: {
        id: "closed",
        label: "Closed",
        description: "Ticket is completed and closed",
        color: "bg-gray-500", 
        textColor: "text-gray-600",
        allowedTransitions: []
      }
    },
    workflow: {
      autoAssignment: {
        enabled: true,
        rules: [
          {
            condition: { category: "emergency-response" },
            assignTo: "emergency-team",
            notify: ["emergency-lead", "regional-director"]
          },
          {
            condition: { category: "project-inquiry" },
            assignTo: "business-development",
            notify: ["bd-manager"]
          },
          {
            condition: { priority: "critical" },
            assignTo: "senior-engineers",
            notify: ["team-lead", "department-manager"]
          }
        ]
      },
      notifications: {
        channels: ["email", "sms", "in-app"],
        triggers: [
          { event: "ticket-created", recipients: ["assignee", "team-lead"] },
          { event: "status-changed", recipients: ["customer", "assignee"] },
          { event: "sla-warning", recipients: ["assignee", "team-lead", "manager"] },
          { event: "escalation", recipients: ["escalation-path", "customer"] }
        ]
      },
      escalation: {
        enabled: true,
        rules: [
          {
            condition: "sla-breach-warning-75%",
            action: "notify-team-lead"
          },
          {
            condition: "sla-breach-90%", 
            action: "escalate-to-manager"
          },
          {
            condition: "sla-breach-100%",
            action: "escalate-to-director"
          }
        ]
      }
    },
    features: {
      fileUpload: {
        enabled: true,
        maxFileSize: "10MB",
        allowedTypes: [".pdf", ".doc", ".docx", ".xlsx", ".jpg", ".png", ".zip"],
        maxFiles: 5
      },
      aiIntegration: {
        enabled: true,
        autoSuggestions: true,
        smartRouting: true,
        knowledgeBase: true
      },
      collaboration: {
        internalNotes: true,
        customerUpdates: true,
        teamMentions: true,
        watchList: true
      },
      reporting: {
        slaReports: true,
        categoryAnalytics: true,
        customerSatisfaction: true,
        teamPerformance: true
      }
    },
    integrations: {
      helpSystem: {
        enabled: true,
        autoCreateFromChat: true,
        linkToClientType: true
      },
      notifications: {
        email: {
          enabled: true,
          templates: ["ticket-created", "status-update", "resolution-notification"]
        },
        sms: {
          enabled: true,
          criticalOnly: true
        }
      },
      calendar: {
        enabled: true,
        scheduleMeetings: true,
        slaTracking: true
      }
    },
    dashboard: {
      customerView: {
        sections: ["my-tickets", "create-ticket", "knowledge-base", "contact-info"],
        features: ["status-tracking", "file-upload", "chat-with-agent"]
      },
      agentView: {
        sections: ["assigned-tickets", "team-queue", "escalated-tickets", "sla-warnings"],
        features: ["bulk-actions", "quick-responses", "internal-notes", "time-tracking"]
      },
      managerView: {
        sections: ["team-overview", "sla-dashboard", "performance-metrics", "escalations"],
        features: ["reporting", "team-assignment", "sla-configuration", "customer-satisfaction"]
      }
    }
  },

  // Global Styling Configuration
  styling: {
    colors: {
      primary: "#ff6900",
      secondary: "#1a237e", 
      accent: "#ffc107",
      dark: "#2c3e50",
      light: "#ecf0f1",
      white: "#ffffff",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6", 
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827"
      }
    },
    typography: {
      fontFamily: {
        primary: "'Poppins', sans-serif",
        secondary: "'Open Sans', sans-serif"
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem", 
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem"
      }
    },
    spacing: {
      section: "100px 0",
      container: "0 15px"
    },
    animations: {
      duration: "300ms",
      easing: "ease-in-out"
    }
  },

  // Future Communities Page - Advanced Intelligence & Innovation
  futureCommunities: {
    hero: {
      title: "Future Communities",
      subtitle: "Building Tomorrow's Smart, Sustainable Cities",
      description: "REJLERS pioneers the development of intelligent communities where cutting-edge technology meets sustainable living, creating environments that adapt, learn, and evolve with their inhabitants.",
      backgroundType: "video", // video, gradient, image
      videoSrc: "/videos/future-cities.mp4",
      fallbackImage: "/images/banner/future-communities-hero.jpg",
      cta: {
        primary: {
          text: "Explore Future Vision",
          href: "#vision-showcase"
        },
        secondary: {
          text: "Download White Paper",
          href: "/downloads/future-communities-whitepaper.pdf"
        }
      }
    },
    
    // Intelligent Vision Showcase
    visionShowcase: {
      title: "Intelligent Community Ecosystems",
      subtitle: "Where Innovation Meets Humanity",
      description: "Our AI-powered approach to community development integrates renewable energy, smart infrastructure, and human-centered design to create living environments that anticipate and respond to residents' needs.",
      
      visionAreas: [
        {
          id: "smart-energy",
          title: "Smart Energy Networks",
          description: "AI-optimized renewable energy systems that learn consumption patterns and distribute power efficiently across the community.",
          icon: "⚡",
          color: "from-yellow-400 to-orange-500",
          technologies: ["Solar Microgrids", "AI Energy Management", "Battery Storage Networks", "Predictive Load Balancing"],
          impact: "75% reduction in energy costs, 90% renewable energy integration"
        },
        {
          id: "adaptive-infrastructure", 
          title: "Adaptive Infrastructure",
          description: "Self-monitoring and self-healing infrastructure systems that predict maintenance needs and optimize performance in real-time.",
          icon: "🏗️",
          color: "from-blue-500 to-cyan-500", 
          technologies: ["IoT Sensor Networks", "Predictive Maintenance AI", "Smart Materials", "Automated Repair Systems"],
          impact: "60% reduction in maintenance costs, 95% uptime guarantee"
        },
        {
          id: "sustainable-mobility",
          title: "Sustainable Mobility",
          description: "Integrated transportation networks with autonomous vehicles, smart routing, and zero-emission solutions.",
          icon: "🚗",
          color: "from-green-500 to-emerald-500",
          technologies: ["Autonomous Vehicle Networks", "Smart Traffic Management", "Electric Charging Infrastructure", "Multi-Modal Integration"],
          impact: "80% reduction in emissions, 50% faster commute times"
        },
        {
          id: "digital-governance",
          title: "Digital Governance",
          description: "AI-assisted community management with predictive analytics for resource allocation and citizen engagement platforms.",
          icon: "🏛️", 
          color: "from-purple-500 to-pink-500",
          technologies: ["Citizen Engagement Platforms", "Predictive Analytics", "Blockchain Governance", "Digital Identity Systems"],
          impact: "90% citizen satisfaction, 70% faster service delivery"
        }
      ]
    },

    // Innovation Labs Section
    innovationLabs: {
      title: "REJLERS Innovation Laboratories",
      subtitle: "Where Future Communities Are Born",
      description: "Our advanced research facilities combine AI, sustainability science, and human behavior analysis to prototype the communities of tomorrow.",
      
      labs: [
        {
          name: "Sustainable Systems Lab",
          focus: "Renewable Energy Integration",
          description: "Developing next-generation energy systems that seamlessly integrate solar, wind, and geothermal sources with AI-powered distribution networks.",
          keyProjects: ["Quantum Solar Cells", "AI Energy Grid", "Carbon Capture Networks"],
          leader: "Dr. Sarah Anderson, Chief Sustainability Officer"
        },
        {
          name: "Smart Infrastructure Lab", 
          focus: "Adaptive Building Technologies",
          description: "Creating intelligent building materials and systems that respond to environmental conditions and user behavior.",
          keyProjects: ["Self-Healing Concrete", "Adaptive Building Skins", "IoT Infrastructure Networks"],
          leader: "Prof. Michael Chen, Director of Smart Systems"
        },
        {
          name: "Human-Centered Design Lab",
          focus: "Community Psychology & Wellness",
          description: "Researching how technology can enhance human well-being and community connections in smart city environments.",
          keyProjects: ["Wellness Analytics", "Social Connectivity Platforms", "Mental Health AI"],
          leader: "Dr. Emma Rodriguez, Community Psychology Lead"
        }
      ]
    },

    // Success Stories & Case Studies
    caseStudies: {
      title: "Pioneering Communities Already Living the Future",
      subtitle: "Real Results from REJLERS Future Community Projects",
      
      projects: [
        {
          name: "EcoVillage Stockholm",
          location: "Stockholm, Sweden", 
          population: "2,500 residents",
          completionYear: "2024",
          description: "A fully sustainable community achieving net-negative carbon emissions through innovative energy systems and smart infrastructure.",
          keyFeatures: ["100% Renewable Energy", "AI Traffic Management", "Smart Waste Systems", "Digital Governance"],
          results: {
            energySavings: "85%",
            carbonReduction: "120% (net negative)",
            residentSatisfaction: "97%",
            costSavings: "40%"
          },
          image: "/images/projects/ecovil-stockholm.jpg",
          testimonial: {
            quote: "Living in EcoVillage Stockholm feels like stepping into the future. The technology is seamlessly integrated into daily life, making everything more efficient and sustainable.",
            author: "Maria Andersson, Resident & Sustainability Advocate"
          }
        },
        {
          name: "Abu Dhabi Smart District",
          location: "Abu Dhabi, UAE",
          population: "5,000 residents",
          completionYear: "2025",
          description: "A cutting-edge smart district showcasing how traditional Middle Eastern architecture can integrate with advanced technology for optimal desert living.",
          keyFeatures: ["Desert-Adaptive Architecture", "Water Recycling Systems", "Autonomous Transport", "Cultural Tech Integration"],
          results: {
            waterSavings: "70%",
            energyEfficiency: "80%",
            culturalPreservation: "95%",
            economicGrowth: "150%"
          },
          image: "/images/projects/abu-dhabi-smart.jpg",
          testimonial: {
            quote: "REJLERS has created a perfect harmony between our cultural heritage and technological advancement. It's inspiring to see tradition and innovation coexist so beautifully.",
            author: "Ahmed Al-Mansouri, Community Leader"
          }
        }
      ]
    },

    // Interactive Technology Demos
    technologyDemos: {
      title: "Experience the Technology",
      subtitle: "Interactive Demonstrations of Future Community Systems",
      
      demos: [
        {
          id: "energy-simulator",
          title: "AI Energy Grid Simulator",
          description: "Explore how our AI systems optimize energy distribution in real-time based on weather, usage patterns, and grid conditions.",
          type: "interactive-simulation",
          features: ["Real-time Optimization", "Weather Integration", "Predictive Analytics", "Cost Visualization"]
        },
        {
          id: "smart-mobility",
          title: "Autonomous Transport Network",
          description: "Visualize the intelligent routing and coordination of autonomous vehicles throughout a future community.",
          type: "3d-visualization", 
          features: ["Route Optimization", "Traffic Prediction", "Multi-Modal Integration", "Emission Tracking"]
        },
        {
          id: "community-dashboard",
          title: "Community Intelligence Dashboard",
          description: "See how community managers use AI-powered insights to improve services, safety, and resident satisfaction.",
          type: "live-dashboard",
          features: ["Predictive Maintenance", "Citizen Feedback", "Resource Optimization", "Safety Monitoring"]
        }
      ]
    },

    // Partnership & Collaboration
    partnerships: {
      title: "Building the Future Together",
      subtitle: "Strategic Partnerships Driving Innovation",
      description: "REJLERS collaborates with leading technology companies, research institutions, and government agencies to accelerate the development of future communities.",
      
      categories: [
        {
          type: "Technology Partners",
          description: "Cutting-edge technology integration",
          partners: ["Microsoft Azure", "Google Cloud AI", "Tesla Energy", "Siemens Smart Infrastructure"]
        },
        {
          type: "Research Institutions",
          description: "Academic collaboration and research",
          partners: ["MIT Smart Cities Lab", "Stanford Sustainability Institute", "KTH Royal Institute", "Masdar Institute"]
        },
        {
          type: "Government Initiatives", 
          description: "Policy development and regulatory support",
          partners: ["UN Habitat", "EU Smart Cities Initiative", "Nordic Council", "GCC Smart Cities Program"]
        }
      ]
    },

    // Call to Action
    callToAction: {
      title: "Ready to Build Your Future Community?",
      subtitle: "Join us in creating sustainable, intelligent communities that enhance human potential while protecting our planet.",
      description: "Whether you're a city planner, developer, or visionary leader, REJLERS has the expertise and technology to bring your future community vision to life.",
      
      options: [
        {
          title: "Schedule Consultation",
          description: "Discuss your community development goals with our experts",
          buttonText: "Book Meeting",
          href: "/contact?service=future-communities"
        },
        {
          title: "Download Resources",
          description: "Access our comprehensive guides and white papers",
          buttonText: "Get Resources",
          href: "/resources/future-communities"
        },
        {
          title: "Join Innovation Network",
          description: "Connect with other forward-thinking community developers",
          buttonText: "Join Network", 
          href: "/community/innovation-network"
        }
      ]
    }
  }
};

export default finixpaThemeConfig;