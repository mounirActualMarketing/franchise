"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  HiTrophy, 
  HiLifebuoy, 
  HiChartBarSquare, 
  HiArrowsPointingOut, 
  HiComputerDesktop, 
  HiAcademicCap,
  HiPlay,
  HiXMark
} from "react-icons/hi2";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  href?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  navItems: string[];
}

const LogoIcon: React.FC = () => (
        <Image
    src="/logowse.png"
    alt="Wall Street English Logo"
    width={120}
    height={80}
    className="h-16 w-auto"
  />
);

const MenuIcon: React.FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  isActive = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (href === "#") {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 cursor-pointer ${
        isActive
          ? "text-secondary"
          : "text-white hover:text-secondary"
      }`}
    >
      {children}
    </motion.a>
  );
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  href,
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-block text-decoration-none cursor-pointer";

  const variants = {
    primary:
      "bg-secondary text-white hover:bg-red-600 focus:ring-red-500 transform hover:scale-105 hover:shadow-lg",
    secondary:
      "bg-white text-primary hover:bg-gray-100 focus:ring-primary shadow-sm border border-gray-200 transform hover:scale-105",
    outline:
      "bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary focus:ring-white transform hover:scale-105",
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      if (href === "#") {
        // Scroll to top for home
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = 80; // Account for fixed header
        const elementPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const Component = motion.a;

  return (
    <Component
      href={href}
      onClick={handleClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ 
      opacity: isOpen ? 1 : 0, 
      y: isOpen ? 0 : -20,
      pointerEvents: isOpen ? "auto" : "none"
    }}
    transition={{ duration: 0.3 }}
    className="md:hidden absolute top-full left-0 w-full bg-primary/95 backdrop-blur-sm border-t border-gray-700 shadow-lg"
  >
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {navItems.map((item, index) => {
        const href = item === "Home" ? "#" : `#${item.toLowerCase()}`;
        
        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          
          if (href === "#") {
            // Scroll to top for home
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          
          const targetId = href.replace('#', '');
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const headerHeight = 80; // Account for fixed header
            const elementPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        };

        return (
          <motion.a
            key={item}
            href={href}
            onClick={handleClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-white hover:text-secondary hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
          >
            {item}
          </motion.a>
        );
      })}
        </div>
    <div className="pt-4 pb-4 border-t border-gray-700">
      <div className="px-5">
        <Button variant="outline" className="w-full" href="#enquiry">
          Apply for Franchise
        </Button>
      </div>
    </div>
  </motion.div>
);

const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  console.log('VideoModal render:', isOpen);
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.3, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        >
          <HiXMark className="text-2xl" />
        </button>
        
        <div className="relative w-full p-4">
          <div className="relative w-full bg-gray-900 rounded-xl overflow-hidden">
            <div style={{ paddingBottom: '56.25%', position: 'relative' }}>
              <iframe
                width="1038"
                height="584"
                src="https://www.youtube.com/embed/8XJgByLyrpE?autoplay=1"
                title="Franchising with Wall Street English"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const HeaderSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink] = useState("Home");
  const navItems = ["Home", "Opportunity", "Benefits", "Support", "Contact"];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 bg-primary/90 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0 flex items-center"
          >
            <LogoIcon />
          </motion.div>
          <nav className="hidden md:flex items-center space-x-1 bg-white/10 p-1 rounded-full backdrop-blur-sm">
            {navItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <NavLink
                  href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                  isActive={activeLink === item}
                >
                  {item}
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block"
          >
            <Button variant="outline" href="#enquiry">Apply Now</Button>
          </motion.div>
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </motion.button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} navItems={navItems} />
    </motion.header>
  );
};

const Hero: React.FC = () => (
  <section className="relative z-10 text-center py-16 sm:py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block px-6 py-2 text-sm font-semibold tracking-wider text-secondary uppercase bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
      >
        🌟 Wall Street English KSA Franchise
      </motion.span>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-8 text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-tight"
      >
        Own a World-Class{" "}
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-secondary block sm:inline"
        >
          English Language
        </motion.span>{" "}
        Training Business
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 max-w-4xl mx-auto text-lg sm:text-xl text-gray-200 leading-relaxed"
      >
        Partner with Wall Street English – the world&apos;s leading English
        training brand with{" "}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-semibold text-secondary"
        >
          31 thriving centres
        </motion.span>{" "}
        across the Kingdom.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-4" href="#enquiry">
          <i className="fas fa-rocket mr-3" />
          Apply for a Franchise Today
        </Button>
        <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-4" href="#opportunity">
          Learn More <i className="fas fa-arrow-down ml-3" />
        </Button>
      </motion.div>
    </div>
  </section>
);

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-primary">
      {/* Animated Grid Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(241, 44, 62, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(241, 44, 62, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px'
        }}
      />
      
      {/* Animated Geometric Shapes */}
      <motion.div 
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.1, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-20 w-32 h-32 border border-secondary/20 rounded-lg pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.08, rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-32 w-24 h-24 border border-white/10 rounded-full pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.06, scale: 1.2 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-32 left-40 w-40 h-40 border border-secondary/15 rounded-lg rotate-45 pointer-events-none"
      />
      
      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: 100,
            x: Math.random() * 1200
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            y: -100,
            x: Math.random() * 1200 + (Math.random() - 0.5) * 200
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-secondary/40 rounded-full pointer-events-none"
        />
      ))}
      
      {/* Enhanced Gradient Overlays */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95 pointer-events-none"
      />
      
      {/* Subtle Glow Effects */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-secondary/20 to-transparent rounded-full pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-white/10 to-transparent rounded-full pointer-events-none"
      />
      
      <HeaderSection />
      <main>
        <Hero />
      </main>
      
      {/* Simple Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/80 to-transparent" />
    </div>
  );
};

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Wall Street English KSA - Franchise Opportunity</title>
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        :root {\n            --primary-color: #003359;\n            --secondary-color: #F12C3E;\n        }\n        \n        body {\n            font-family: 'Inter', sans-serif;\n        }\n        \n        .bg-primary {\n            background-color: var(--primary-color);\n        }\n        \n        .bg-secondary {\n            background-color: var(--secondary-color);\n        }\n        \n        .text-primary {\n            color: var(--primary-color);\n        }\n        \n        .text-secondary {\n            color: var(--secondary-color);\n        }\n        \n        .border-primary {\n            border-color: var(--primary-color);\n        }\n        \n        .border-secondary {\n            border-color: var(--secondary-color);\n        }\n        \n        .gradient-bg {\n            background: linear-gradient(135deg, var(--primary-color) 0%, #004670 50%, var(--primary-color) 100%);\n        }\n        \n        .gradient-overlay {\n            background: linear-gradient(45deg, rgba(0, 51, 89, 0.9), rgba(241, 44, 62, 0.1));\n        }\n        \n        .hover-scale {\n            transition: transform 0.3s ease;\n        }\n        \n        .hover-scale:hover {\n            transform: scale(1.05);\n        }\n        \n        .card-shadow {\n            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n        }\n        \n        .btn-primary {\n            background-color: var(--secondary-color);\n            color: white;\n            padding: 16px 32px;\n            border-radius: 8px;\n            font-weight: 600;\n            transition: all 0.3s ease;\n            display: inline-block;\n            text-decoration: none;\n        }\n        \n        .btn-primary:hover {\n            background-color: #d91e36;\n            transform: translateY(-2px);\n            box-shadow: 0 10px 20px rgba(241, 44, 62, 0.3);\n        }\n        \n        .btn-outline {\n            border: 2px solid var(--primary-color);\n            color: var(--primary-color);\n            padding: 14px 30px;\n            border-radius: 8px;\n            font-weight: 600;\n            transition: all 0.3s ease;\n            display: inline-block;\n            text-decoration: none;\n            background: transparent;\n        }\n        \n        .btn-outline:hover {\n            background-color: var(--primary-color);\n            color: white;\n            transform: translateY(-2px);\n        }\n        \n        .section-spacing {\n            padding: 80px 0;\n        }\n        \n        .hero-pattern {\n            background-image: url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='30' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='30' r='2'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='50' cy='30' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='30' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");\n        }\n        \n        .counter {\n            font-size: 3.5rem;\n            font-weight: 800;\n            color: var(--secondary-color);\n        }\n        \n        .bg-gradient-radial {\n            background: radial-gradient(circle, var(--tw-gradient-stops));\n        }\n    "
        }}
      />
      
      {/* Hero Section with new React component structure */}
      <HeroSection />
      
      {/* Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      {/* Why Partner With Us */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="section-spacing bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Why Partner With Us
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="h-1 bg-secondary mx-auto mb-8"
            />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { count: "50+", title: "Years of Excellence", desc: "Transforming lives through English language education worldwide", delay: 0 },
              { count: "30+", title: "Global Countries", desc: "Proven success across diverse international markets", delay: 0.2 },
              { count: "31", title: "KSA Centres", desc: "Established presence trusted by thousands of students", delay: 0.4 }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                className="text-center card-shadow p-8 rounded-xl bg-gray-50 cursor-pointer"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: item.delay + 0.3, duration: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                  className="counter mb-4"
                >
                  {item.count}
                </motion.div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
        </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              By joining our franchise network, you&apos;ll leverage a globally
              recognised brand, proven systems, and an experienced support team
              committed to helping you succeed in the growing Saudi market.
            </p>
            
            {/* Video Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  console.log('Video thumbnail clicked');
                  setIsVideoOpen(true);
                }}
                className="relative bg-black rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-primary to-secondary">
                  {/* Custom Video Thumbnail */}
                  <Image
                    src="/videothumbnail.png"
                    alt="Wall Street English Franchise Video"
                    fill
                    className="object-cover"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 bg-secondary/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors shadow-lg"
                    >
                      <HiPlay className="text-3xl text-white ml-1" />
                    </motion.div>
                  </div>
                  
                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Watch Our Franchise Story
                    </h3>
                    <p className="text-white/90 text-sm">
                      Discover how Wall Street English transforms lives and builds successful businesses worldwide
                    </p>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    3:45
                  </div>
                  
                  {/* Animated Border */}
                  <motion.div
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <svg className="w-full h-full">
                      <rect
                        x="2"
                        y="2"
                        width="calc(100% - 4px)"
                        height="calc(100% - 4px)"
                        rx="14"
                        fill="none"
                        stroke="#F12C3E"
                        strokeWidth="2"
                        strokeDasharray="20 10"
                        className="opacity-50"
                      />
                    </svg>
                  </motion.div>
    </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      {/* The Opportunity in Saudi Arabia */}
      <motion.section 
        id="opportunity" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="section-spacing bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-primary mb-8"
              >
                The Opportunity in{" "}
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-secondary"
                >
                  Saudi Arabia
                </motion.span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg text-gray-700 mb-6 leading-relaxed"
              >
                English is the language of global business, trade, and opportunity.
                With Saudi Arabia&apos;s Vision 2030 driving economic growth, tourism,
                and global engagement, demand for high-quality English training has
                never been higher.
              </motion.p>
              <div className="space-y-6">
                {[
                  { icon: "fas fa-building", title: "Corporate Demand", desc: "Companies are investing heavily in English training to improve workforce capabilities.", delay: 0.4 },
                  { icon: "fas fa-users", title: "Consumer Demand", desc: "Students, professionals, and job seekers are seeking English skills to access better opportunities.", delay: 0.6 },
                  { icon: "fas fa-chart-line", title: "Proven Business Model", desc: "We have the expertise, reputation, and infrastructure to help you capitalise on this demand.", delay: 0.8 }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 10 }}
                    transition={{ delay: item.delay, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: item.delay + 0.2, duration: 0.5, type: "spring" }}
                      viewport={{ once: true }}
                      className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center"
                    >
                      <i className={`${item.icon} text-white text-xl`} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-primary p-8 rounded-2xl card-shadow"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-white mb-6"
                >
                  Vision 2030 Impact
                </motion.h3>
                <div className="space-y-4">
                  {[
                    { text: "Economic Diversification", icon: "fas fa-arrow-up", delay: 0.5 },
                    { text: "Tourism Growth", icon: "fas fa-arrow-up", delay: 0.6 },
                    { text: "Global Business Integration", icon: "fas fa-arrow-up", delay: 0.7 },
                    { text: "English Language Demand", icon: "fas fa-rocket", delay: 0.8 }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ delay: item.delay, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center text-white"
                    >
                      <span>{item.text}</span>
                      <motion.i 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ delay: item.delay + 0.2, duration: 0.3 }}
                        viewport={{ once: true }}
                        className={`${item.icon} text-secondary`} 
                      />
                    </motion.div>
                  ))}
    </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* Key Benefits for Franchisees - Bento Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="section-spacing bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4"
            >
              Key Benefits
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Key Benefits for <span className="text-secondary">Franchisees</span>
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
            />
          </motion.div>

          {/* Bento Grid - 3x2 Harmonious Layout */}
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            
            {/* Row 1 */}
            {/* Established Brand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", damping: 25 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl h-80 bg-gradient-to-br from-white via-gray-50/30 to-white backdrop-blur-sm border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-secondary/6" />
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 30% 30%, rgba(0, 48, 135, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 70% 70%, rgba(241, 44, 62, 0.06) 0%, transparent 50%)
                    `
                  }}
                />
              </div>
              
              <div className="relative z-10 flex flex-col justify-center h-full p-8 transition-all duration-500 group-hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary/15 to-secondary/25 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-secondary/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <HiTrophy className="h-10 w-10 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3 tracking-tight">Established Brand</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm">
                      Strong brand presence with proven market recognition
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-secondary cursor-pointer"
                >
                  Learn More
                  <div className="w-5 h-5 bg-secondary/10 rounded-full flex items-center justify-center">
                    <HiPlay className="h-3 w-3 text-secondary" style={{ transform: 'rotate(-90deg)' }} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Ongoing Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", damping: 25 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl h-80 bg-gradient-to-br from-white via-gray-50/30 to-white backdrop-blur-sm border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/4 via-transparent to-primary/6" />
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 70% 30%, rgba(241, 44, 62, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 30% 70%, rgba(0, 48, 135, 0.06) 0%, transparent 50%)
                    `
                  }}
                />
              </div>
              
              <div className="relative z-10 flex flex-col justify-center h-full p-8 transition-all duration-500 group-hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/15 to-primary/25 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-primary/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <HiLifebuoy className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3 tracking-tight">Ongoing Support</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm">
                      Comprehensive operational and marketing assistance
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-primary cursor-pointer"
                >
                  View Support
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <HiPlay className="h-3 w-3 text-primary" style={{ transform: 'rotate(-90deg)' }} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* High Demand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", damping: 25 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl h-80 bg-gradient-to-br from-white via-gray-50/30 to-white backdrop-blur-sm border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-secondary/4" />
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 50% 20%, rgba(0, 48, 135, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 50% 80%, rgba(241, 44, 62, 0.06) 0%, transparent 50%)
                    `
                  }}
                />
              </div>
              
              <div className="relative z-10 flex flex-col justify-center h-full p-8 transition-all duration-500 group-hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary/15 to-secondary/25 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-secondary/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <HiChartBarSquare className="h-10 w-10 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3 tracking-tight">High Demand</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm">
                      Growing market with continuous expansion potential
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-secondary cursor-pointer"
                >
                  Market Data
                  <div className="w-5 h-5 bg-secondary/10 rounded-full flex items-center justify-center">
                    <HiPlay className="h-3 w-3 text-secondary" style={{ transform: 'rotate(-90deg)' }} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Row 2 */}
            {/* Digital Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", damping: 25 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl h-80 bg-gradient-to-br from-white via-gray-50/30 to-white backdrop-blur-sm border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/6 via-transparent to-primary/4" />
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 50%, rgba(241, 44, 62, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 80% 50%, rgba(0, 48, 135, 0.06) 0%, transparent 50%)
                    `
                  }}
                />
              </div>
              
              <div className="relative z-10 flex flex-col justify-center h-full p-8 transition-all duration-500 group-hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/15 to-primary/25 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-primary/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <HiComputerDesktop className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3 tracking-tight">Digital Solutions</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm">
                      Cutting-edge technology and learning platforms
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-primary cursor-pointer"
                >
                  Explore Tech
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <HiPlay className="h-3 w-3 text-primary" style={{ transform: 'rotate(-90deg)' }} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Flexible Model */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", damping: 25 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl h-80 bg-gradient-to-br from-white via-gray-50/30 to-white backdrop-blur-sm border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-secondary/6" />
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 60% 40%, rgba(0, 48, 135, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 40% 60%, rgba(241, 44, 62, 0.06) 0%, transparent 50%)
                    `
                  }}
                />
              </div>
              
              <div className="relative z-10 flex flex-col justify-center h-full p-8 transition-all duration-500 group-hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary/15 to-secondary/25 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-secondary/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <HiArrowsPointingOut className="h-10 w-10 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3 tracking-tight">Flexible Model</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm">
                      Scalable business with expansion opportunities
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-secondary cursor-pointer"
                >
                  Growth Plans
                  <div className="w-5 h-5 bg-secondary/10 rounded-full flex items-center justify-center">
                    <HiPlay className="h-3 w-3 text-secondary" style={{ transform: 'rotate(-90deg)' }} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Expert Training */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring", damping: 25 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl h-80 bg-gradient-to-br from-white via-gray-50/30 to-white backdrop-blur-sm border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/4 via-transparent to-primary/6" />
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 40% 30%, rgba(241, 44, 62, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 60% 70%, rgba(0, 48, 135, 0.06) 0%, transparent 50%)
                    `
                  }}
                />
              </div>
              
              <div className="relative z-10 flex flex-col justify-center h-full p-8 transition-all duration-500 group-hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/15 to-primary/25 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-primary/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <HiAcademicCap className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3 tracking-tight">Expert Training</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm">
                      Professional development and curriculum support
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-primary cursor-pointer"
                >
                  Training Details
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <HiPlay className="h-3 w-3 text-primary" style={{ transform: 'rotate(-90deg)' }} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* How We Support You */}
      <section className="section-spacing bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              How We Support You
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide end-to-end support to ensure your success from day one and
              beyond.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Pre-launch Planning
                    </h3>
                    <p className="text-gray-600">
                      Site selection, market analysis, and comprehensive business
                      planning support.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Full Training Program
                    </h3>
                    <p className="text-gray-600">
                      Complete training for you and your team – from sales
                      techniques to daily operations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Marketing &amp; Lead Generation
                    </h3>
                    <p className="text-gray-600">
                      Tailored marketing campaigns and lead generation strategies
                      for your territory.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Ongoing Guidance
                    </h3>
                    <p className="text-gray-600">
                      Continuous operational guidance and regular performance
                      reviews for sustained growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-white p-8 rounded-2xl card-shadow">
                <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                  You&apos;ll Never Be Alone
                </h3>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full">
                    <i className="fas fa-hands-helping text-white text-3xl" />
                  </div>
                </div>
                <p className="text-gray-600 text-center text-lg leading-relaxed">
                  Our dedicated team is here to guide you every step of the way,
                  ensuring your success from launch through expansion. You&apos;re not
                  just buying a franchise – you&apos;re joining a family.
                </p>
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-phone text-secondary" />
                      <span className="text-sm text-gray-600">24/7 Support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-users text-secondary" />
                      <span className="text-sm text-gray-600">Expert Team</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-globe text-secondary" />
                      <span className="text-sm text-gray-600">Global Network</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Steps to Get Started */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Steps to Get Started
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block" />
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center animate-slide-in-left">
                  <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
                    <div className="bg-white p-6 rounded-xl card-shadow border-l-4 border-secondary">
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        1. Submit Your Enquiry
                      </h3>
                      <p className="text-gray-600">
                        Express your interest by filling out our comprehensive
                        enquiry form.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">
                    1
                  </div>
                  <div className="md:w-1/2 md:pl-8" />
                </div>
                <div className="flex flex-col md:flex-row items-center animate-slide-in-right">
                  <div className="md:w-1/2 md:pr-8" />
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">
                    2
                  </div>
                  <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                    <div className="bg-white p-6 rounded-xl card-shadow border-r-4 border-secondary">
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        2. Attend Information Session
                      </h3>
                      <p className="text-gray-600">
                        Join our franchise information session to learn more about
                        the opportunity.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center animate-slide-in-left">
                  <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
                    <div className="bg-white p-6 rounded-xl card-shadow border-l-4 border-secondary">
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        3. Review Investment Details
                      </h3>
                      <p className="text-gray-600">
                        Review investment requirements and discuss potential
                        territories with our team.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">
                    3
                  </div>
                  <div className="md:w-1/2 md:pl-8" />
                </div>
                <div className="flex flex-col md:flex-row items-center animate-slide-in-right">
                  <div className="md:w-1/2 md:pr-8" />
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">
                    4
                  </div>
                  <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                    <div className="bg-white p-6 rounded-xl card-shadow border-r-4 border-secondary">
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        4. Sign Franchise Agreement
                      </h3>
                      <p className="text-gray-600">
                        Finalize your franchise agreement and prepare for your
                        successful launch.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center animate-slide-in-left">
                  <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
                    <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-xl card-shadow text-white">
                      <h3 className="text-xl text-primary font-semibold mb-3">
                        5. Launch &amp; Change Lives
                      </h3>
                      <p className="text-gray-600">
                        Open your Wall Street English centre and start transforming
                        lives in your community.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white z-10">
                    <i className="fas fa-star" />
                  </div>
                  <div className="md:w-1/2 md:pl-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Success Stories & Trust */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
                Success Stories
              </h2>
              <div className="bg-white p-8 rounded-2xl card-shadow relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <i className="fas fa-quote-left text-white text-xl" />
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                  &quot;Joining Wall Street English has been the best business decision
                  I&apos;ve made. The brand, the systems, and the support made my launch
                  smooth and my centre profitable within months.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold text-primary">
                      Existing Franchisee
                    </p>
                    <p className="text-sm text-gray-600">MENA Region</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
                Trust &amp; Credibility
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl card-shadow text-center hover-scale">
                  <div className="text-3xl font-bold text-secondary mb-2">31</div>
                  <p className="text-sm text-gray-600">
                    Centres Operating Across KSA
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl card-shadow text-center hover-scale">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    1000+
                  </div>
                  <p className="text-sm text-gray-600">Students Trained Annually</p>
                </div>
                <div className="bg-white p-6 rounded-xl card-shadow text-center hover-scale">
                  <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                  <p className="text-sm text-gray-600">Corporate Partners</p>
                </div>
                <div className="bg-white p-6 rounded-xl card-shadow text-center hover-scale">
                  <div className="text-3xl font-bold text-secondary mb-2">30+</div>
                  <p className="text-sm text-gray-600">Countries Worldwide</p>
                </div>
              </div>
              <div className="mt-8 bg-white p-6 rounded-xl card-shadow">
                <h3 className="font-semibold text-primary mb-4">
                  Trusted By Leading Saudi Companies
                </h3>
                <div className="flex items-center justify-between text-gray-600 text-sm">
                  <span>
                    <i className="fas fa-building mr-2 text-secondary" />
                    Aramco
                  </span>
                  <span>
                    <i className="fas fa-building mr-2 text-secondary" />
                    SABIC
                  </span>
                  <span>
                    <i className="fas fa-building mr-2 text-secondary" />
                    STC
                  </span>
                  <span>
                    <i className="fas fa-plus mr-2 text-secondary" />
                    Many More
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Enquiry Form */}
      <motion.section 
        id="enquiry" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="section-spacing bg-primary"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Start Your Franchise Journey Today
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="h-1 bg-secondary mx-auto mb-8"
              />
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl text-gray-200"
              >
                Take the first step towards owning a successful English language
                training business.
              </motion.p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-2xl card-shadow"
            >
              <form className="grid md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name *", type: "text", placeholder: "Enter your full name", delay: 0.1 },
                  { label: "Email Address *", type: "email", placeholder: "Enter your email", delay: 0.2 },
                  { label: "Phone Number *", type: "tel", placeholder: "Enter your phone number", delay: 0.3 },
                  { label: "City *", type: "select", options: ["Select your city", "Riyadh", "Jeddah", "Dammam", "Mecca", "Medina", "Other"], delay: 0.4 },
                  { label: "Investment Budget", type: "select", options: ["Select budget range", "500K - 1M SAR", "1M - 2M SAR", "2M - 5M SAR", "5M+ SAR"], delay: 0.5 },
                  { label: "How did you hear about us?", type: "select", options: ["Select source", "Google Search", "Social Media", "Referral", "Other"], delay: 0.6 }
                ].map((field, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: field.delay, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <motion.select 
                        whileFocus={{ scale: 1.02 }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      >
                        {field.options?.map((option, optIndex) => (
                          <option key={optIndex}>{option}</option>
                        ))}
                      </motion.select>
                    ) : (
                      <motion.input
                        type={field.type}
                        whileFocus={{ scale: 1.02 }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder={field.placeholder}
                      />
                    )}
                  </motion.div>
                ))}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="md:col-span-2"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    rows={4}
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Tell us about your interest in Wall Street English franchise..."
                    defaultValue={""}
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="md:col-span-2 text-center"
                >
                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-lg px-12 py-4"
                  >
                    <i className="fas fa-paper-plane mr-3" />
                    Submit Enquiry
                  </motion.button>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-sm text-gray-600 mt-4"
                  >
                    Our franchise team will contact you within 24 hours.
                  </motion.p>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
            {/* Closing Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="section-spacing gradient-bg hero-pattern relative"
      >
        <div className="gradient-overlay absolute inset-0" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-8"
            >
              Turn Your Passion for Education{" "}
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-secondary block"
              >
                Into a Profitable Business
              </motion.span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Join a network of successful entrepreneurs who are shaping the future
              of English learning in Saudi Arabia.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.a 
                href="#enquiry" 
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-xl px-12 py-6 mr-6 inline-block"
              >
                <i className="fas fa-rocket mr-3" />
                Apply Now and Secure Your Territory
              </motion.a>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-gray-300 text-lg"
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="inline-block"
                >
                  <i className="fas fa-phone mr-3" />
                  +966 11 123 4567
                </motion.span>
                <span className="mx-6">|</span>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="inline-block"
                >
                  <i className="fas fa-envelope mr-3" />
                  franchise@wallstreetenglish.sa
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
    </div>
      </motion.section>
    </>
  );
}