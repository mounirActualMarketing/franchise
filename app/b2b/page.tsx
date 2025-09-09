"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";

// Declare HubSpot global type
declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          target: string;
          region: string;
        }) => void;
      };
    };
  }
}

import { 
  HiGlobeAlt,
  HiUserGroup,
  HiChartBar,
  HiAcademicCap,
  HiCheckCircle,
  HiBuildingOffice2,
  HiArrowTrendingUp,
  HiClock,
  HiMapPin,
  HiDocumentText,
  HiPhone,
  HiEnvelope,
  HiPlay,
  HiXMark,
  HiSparkles,
  HiLightBulb,
  HiShieldCheck,
  HiPresentationChartBar
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
  onClick?: () => void;
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

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  isActive = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80;
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
  onClick,
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
    if (onClick) {
      e.preventDefault();
      onClick();
      return;
    }
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = 80;
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
      href={href || "#"}
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
        const href = item === "Home" ? "#" : `#${item.toLowerCase().replace(/\s+/g, '-')}`;
        
        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          
          if (href === "#") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          
          const targetId = href.replace('#', '');
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const headerHeight = 80;
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
        <Button variant="outline" className="w-full" href="#consultation">
          Book Consultation
        </Button>
      </div>
    </div>
  </motion.div>
);

const HeaderSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink] = useState("Home");
  const navItems = ["Home", "Solutions", "Results", "Partners", "Contact"];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed w-full z-50 bg-primary/90 backdrop-blur-sm border-b border-white/10"
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
            <Button variant="outline" href="#consultation">Book Consultation</Button>
          </motion.div>
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <HiXMark className="w-6 h-6" /> : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} navItems={navItems} />
    </motion.header>
  );
};

const Hero: React.FC = () => {
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  return (
    <section className="relative z-10 text-center py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-6 py-2 text-sm font-semibold tracking-wider text-secondary uppercase bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
        >
          🌟 Corporate English Training Solutions
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
        >
          Unlock the Power of English for Your{" "}
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-secondary block sm:inline"
          >
            Workforce
          </motion.span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-4xl mx-auto text-lg sm:text-xl text-gray-200 leading-relaxed"
        >
          Build a confident, future-ready team with tailored English training available across{" "}
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-semibold text-secondary"
          >
            31 centers
          </motion.span>{" "}
          in Saudi Arabia.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-4" href="#consultation">
            <HiPhone className="inline mr-3 text-xl" />
            Book a Free Corporate Consultation
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto text-lg px-8 py-4"
            onClick={() => setShowBrochureModal(true)}
          >
            <HiDocumentText className="inline mr-3 text-xl" />
            Download Corporate Brochure
          </Button>
        </motion.div>
      </div>

      {/* Brochure Download Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <button
              onClick={() => setShowBrochureModal(false)}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              <HiXMark className="text-2xl" />
            </button>
            <h3 className="text-2xl font-bold text-primary mb-4">Download Corporate Brochure</h3>
            <p className="text-gray-600 mb-6">
              Get detailed information about our corporate training programs, pricing, and success stories.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
              <input
                type="text"
                placeholder="Company name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Download Now
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-primary pt-20">
      {/* Modern Animated Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(135deg, transparent 24%, rgba(241, 44, 62, 0.05) 25%, rgba(241, 44, 62, 0.05) 26%, transparent 27%, transparent 74%, rgba(241, 44, 62, 0.05) 75%, rgba(241, 44, 62, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(45deg, transparent 24%, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.03) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.03) 75%, rgba(255, 255, 255, 0.03) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.1,
            scale: 1,
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 15}%`,
          }}
        >
          <div className="w-32 h-32 border border-secondary/10 rounded-full" />
        </motion.div>
      ))}
      
      <Hero />
    </div>
  );
};

export default function Home() {
  const initHubSpotForm = () => {
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: "2550768",
        formId: "39753bf9-06fd-4f99-bcba-a08ce9da730b",
        target: "#hubspot-form-39753bf9-06fd-4f99-bcba-a08ce9da730b",
        region: "na1"
      });
    }
  };

  return (
    <>
      <Script
        src="//js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={initHubSpotForm}
      />
      
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Wall Street English - Corporate English Training Solutions</title>
      
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary-color: #003359;
              --secondary-color: #F12C3E;
            }
            
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }
            
            .bg-primary { background-color: var(--primary-color); }
            .bg-secondary { background-color: var(--secondary-color); }
            .text-primary { color: var(--primary-color); }
            .text-secondary { color: var(--secondary-color); }
            .border-primary { border-color: var(--primary-color); }
            .border-secondary { border-color: var(--secondary-color); }
            
            .card-shadow {
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }
            
            .section-spacing {
              padding: 80px 0;
            }
          `
        }}
      />

      <HeaderSection />
      <HeroSection />
      
      {/* Why English Matters Section */}
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
              Why English Matters for Your Business
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="h-1 bg-secondary mx-auto mb-8"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In today's competitive landscape, English isn't just a skill — it's a business advantage. 
              Companies across Saudi Arabia are investing in English training to:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <HiGlobeAlt className="text-4xl" />,
                title: "Enhance Global Competitiveness",
                description: "Communicate seamlessly with international partners and clients",
                delay: 0.1
              },
              {
                icon: <HiArrowTrendingUp className="text-4xl" />,
                title: "Boost Productivity",
                description: "Minimize miscommunication across teams and reduce costly errors",
                delay: 0.2
              },
              {
                icon: <HiUserGroup className="text-4xl" />,
                title: "Improve Talent Retention",
                description: "Employees value career development opportunities",
                delay: 0.3
              },
              {
                icon: <HiShieldCheck className="text-4xl" />,
                title: "Meet Global Standards",
                description: "Align with language requirements of regulators and multinational stakeholders",
                delay: 0.4
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl card-shadow text-center group hover:bg-primary hover:text-white transition-all duration-300"
              >
                <div className="text-secondary mb-6 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary group-hover:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-200">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Corporate Training Solutions Section */}
      <motion.section 
        id="solutions"
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
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Corporate Training Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide flexible, scalable English learning programs that adapt to your industry, goals, and workforce.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <HiLightBulb className="text-3xl" />,
                title: "Customized Corporate Programs",
                description: "Tailored to the needs of your sector — finance, energy, healthcare, retail, hospitality, and more.",
                color: "from-blue-500 to-purple-600"
              },
              {
                icon: <HiSparkles className="text-3xl" />,
                title: "Blended Learning Model",
                description: "Combine online modules, live classes, and real-world practice for maximum impact.",
                color: "from-green-500 to-teal-600"
              },
              {
                icon: <HiPresentationChartBar className="text-3xl" />,
                title: "Executive & Leadership English",
                description: "Equip managers and leaders with advanced skills for negotiations, presentations, and international relations.",
                color: "from-red-500 to-pink-600"
              },
              {
                icon: <HiBuildingOffice2 className="text-3xl" />,
                title: "Onsite & Online Options",
                description: "Train in any of our 31 centers across Saudi Arabia, at your offices, or fully online for maximum flexibility.",
                color: "from-yellow-500 to-orange-600"
              }
            ].map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl card-shadow hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {solution.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Proven Results Section */}
      <motion.section 
        id="results"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="section-spacing bg-primary text-white"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Our methods are tried, tested, and deliver measurable impact:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: "30%",
                label: "Faster Progress",
                description: "compared to traditional methods",
                icon: <HiClock className="text-4xl" />
              },
              {
                stat: "95%",
                label: "Completion Rate",
                description: "in corporate-sponsored programs",
                icon: <HiCheckCircle className="text-4xl" />
              },
              {
                stat: "1000s",
                label: "Professionals Trained",
                description: "across Saudi Arabia's leading companies",
                icon: <HiUserGroup className="text-4xl" />
              }
            ].map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/20"
              >
                <div className="text-secondary mb-4">
                  {result.icon}
                </div>
                <div className="text-5xl font-bold text-secondary mb-2">
                  {result.stat}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {result.label}
                </h3>
                <p className="text-gray-300">
                  {result.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section 
        id="partners"
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
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From government institutions to Fortune 500 companies, Wall Street English is the partner of choice for workforce English training.
            </p>
          </motion.div>

          {/* Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[
              { name: "NEOM", logo: "🏙️" },
              { name: "Aramco", logo: "⛽" },
              { name: "SABIC", logo: "🏭" },
              { name: "STC", logo: "📱" },
              { name: "Al Rajhi Bank", logo: "🏦" },
              { name: "Hilton", logo: "🏨" }
            ].map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl flex flex-col items-center justify-center h-32 card-shadow hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-2">{partner.logo}</div>
                <p className="text-sm font-semibold text-gray-700">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Wall Street English Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Why Wall Street English?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Global Expertise",
                description: "Over 50 years of international experience",
                icon: <HiGlobeAlt className="text-3xl" />
              },
              {
                title: "Local Presence",
                description: "31 centers across the Kingdom, aligned with Vision 2030",
                icon: <HiMapPin className="text-3xl" />
              },
              {
                title: "Accreditation",
                description: "Officially licensed by TVTC",
                icon: <HiShieldCheck className="text-3xl" />
              },
              {
                title: "Data-Driven Reporting",
                description: "Transparent dashboards and progress tracking for every learner",
                icon: <HiChartBar className="text-3xl" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl card-shadow hover:shadow-xl transition-all duration-300"
              >
                <div className="text-secondary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Success Stories Section */}
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
              Success Stories
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-blue-700 p-1 rounded-2xl"
          >
            <div className="bg-white p-12 rounded-2xl">
              <div className="flex justify-center mb-6">
                <div className="text-6xl text-secondary">"</div>
              </div>
              <p className="text-xl text-gray-700 text-center mb-8 italic leading-relaxed">
                After partnering with Wall Street English, our frontline teams improved client communication by 40%. 
                The blended learning approach helped us upskill staff quickly while tracking measurable ROI.
              </p>
              <div className="text-center">
                <p className="font-bold text-primary text-lg">HR Director</p>
                <p className="text-gray-600">Leading Telecom Company</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Getting Started
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple process makes it easy to launch corporate English training:
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Book a Consultation",
                  description: "We assess your workforce needs",
                  icon: <HiPhone className="text-2xl" />
                },
                {
                  step: "2",
                  title: "Design a Tailored Program",
                  description: "Align training with your business objectives",
                  icon: <HiAcademicCap className="text-2xl" />
                },
                {
                  step: "3",
                  title: "Track & Report",
                  description: "Monitor progress and measure impact with detailed reports",
                  icon: <HiChartBar className="text-2xl" />
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {item.step}
                  </div>
                  <div className="flex-grow bg-white p-6 rounded-xl card-shadow">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        id="consultation"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="section-spacing bg-primary"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Empower Your Workforce?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-gray-200 mb-12"
            >
              Join the hundreds of Saudi companies already transforming their teams with Wall Street English. 
              With 31 centers across the Kingdom, we are closer to your employees than ever.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-2xl card-shadow"
            >
              {/* HubSpot Form Container */}
              <h3 className="text-2xl font-bold text-primary mb-6">Book Your Free Consultation</h3>
              <div id="hubspot-form-container" className="w-full">
                <div id="hubspot-form-39753bf9-06fd-4f99-bcba-a08ce9da730b"></div>
              </div>
              
              <p className="text-sm text-gray-600 mt-6">
                Our corporate training team will contact you within 24 hours.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 text-white"
            >
              <p className="text-lg mb-4">Or contact us directly:</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="mailto:corporate@wse.edu.sa" className="flex items-center gap-2 hover:text-secondary transition-colors">
                  <HiEnvelope className="text-xl" />
                  corporate@wse.edu.sa
                </a>
                <a href="tel:+966123456789" className="flex items-center gap-2 hover:text-secondary transition-colors">
                  <HiPhone className="text-xl" />
                  +966 12 345 6789
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/logowse.png"
                alt="Wall Street English Logo"
                width={100}
                height={67}
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-400 text-sm">
                Empowering Saudi professionals and businesses with world-class English training.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-secondary transition-colors">Corporate Training</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Executive Programs</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Online Learning</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Assessment Services</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Our Centers</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="flex items-center gap-2">
                  <HiMapPin className="text-secondary" />
                  31 Centers Across Saudi Arabia
                </p>
                <p className="flex items-center gap-2">
                  <HiEnvelope className="text-secondary" />
                  corporate@wse.edu.sa
                </p>
                <p className="flex items-center gap-2">
                  <HiPhone className="text-secondary" />
                  +966 12 345 6789
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Wall Street English Saudi Arabia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
