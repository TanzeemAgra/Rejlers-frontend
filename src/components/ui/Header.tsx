"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import finixpaThemeConfig from "@/config/finixpaTheme";
import { useResponsive, performanceUtils } from "@/lib/responsive";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const { navigation, site } = finixpaThemeConfig;
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const lastScrollY = useRef(0);

  // Optimized scroll handler with throttling and smart hiding
  const handleScroll = useCallback(
    performanceUtils.throttle(() => {
      const currentScrollY = window.scrollY;
      
      // Add backdrop blur effect when scrolled
      setIsScrolled(currentScrollY > 50);
      
      // Hide top bar on mobile when scrolling down for more space
      if (isMobile) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsTopBarVisible(false);
        } else {
          setIsTopBarVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    }, 10),
    [isMobile]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (isDesktop && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isDesktop, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header relative z-50">
      {/* Top Bar - Hide on mobile when scrolling for better UX */}
      <div className={`header-top bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white transition-all duration-300 ${
        isTopBarVisible ? 'py-1 opacity-100' : 'py-0 opacity-0 h-0 overflow-hidden'
      } text-xs sm:text-sm border-b border-blue-700/50`}>
        <div className="container-responsive">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
              <a 
                href={navigation.topBar.leftContent.helpLink} 
                className="hidden sm:flex text-blue-100 font-medium items-center hover:text-white hover:bg-blue-700/40 px-2 sm:px-3 py-1 rounded-full transition-all duration-300 group cursor-pointer touch-target"
              >
                <svg className="w-4 h-4 fill-current text-blue-300 group-hover:text-white transition-colors duration-300 mr-2" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
                <span>{navigation.topBar.leftContent.helpText}</span>
                <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </a>
              <div className="flex space-x-1 sm:space-x-2 lg:space-x-4">
                {navigation.topBar.leftContent.contacts.map((contact, index) => (
                  <a 
                    key={index}
                    href={contact.link}
                    className="flex items-center space-x-1 sm:space-x-2 text-blue-100 hover:text-white hover:bg-blue-700/40 px-2 sm:px-3 py-1 rounded-full transition-all duration-300 group touch-target"
                  >
                    {/* Professional SVG icons */}
                    {contact.link.includes('tel:') ? (
                      <svg className="w-4 h-4 fill-current text-blue-300 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 fill-current text-blue-300 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    )}
                    <span className="font-medium hidden sm:inline">{contact.text}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-blue-100 font-medium hidden md:flex items-center">
                <svg className="w-4 h-4 fill-current text-blue-300 mr-2" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                {navigation.topBar.rightContent.socialText}
              </span>
              <div className="flex space-x-1 sm:space-x-2">
                {navigation.topBar.rightContent.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-blue-700/40 hover:bg-white/20 text-blue-100 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 text-xs sm:text-sm font-bold touch-target"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.link.includes('facebook') ? 'Facebook' : 
                           social.link.includes('twitter') ? 'Twitter' : 
                           social.link.includes('linkedin') ? 'LinkedIn' : 
                           social.link.includes('skype') ? 'Skype' : 
                           social.link.includes('pinterest') ? 'Pinterest' : 'Social'}
                  >
                    {/* Professional SVG icons as fallback */}
                    {social.link.includes('facebook') ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    ) : social.link.includes('twitter') ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    ) : social.link.includes('linkedin') ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ) : social.link.includes('skype') ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617 0 .833.378 1.111 1.431 1.363l3.384.812c2.899.724 3.455 2.547 3.455 3.751-.001 2.518-1.802 4.415-5.52 4.415zm-.213-9.53"/>
                      </svg>
                    ) : social.link.includes('pinterest') ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.96 1.404-5.96s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.381-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.736-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.044 2.441-1.518 3.235C10.138 23.708 11.055 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M13.372 2.094a10.003 10.003 0 00-6.876 2.83A10.002 10.002 0 004.568 13.31c.006 5.52 4.48 9.994 10 10 5.52.006 9.994-4.48 10-10a10.002 10.002 0 00-2.83-6.876 10.003 10.003 0 00-7.616-2.746c-.584-.004-1.008-.004-1.75.406zm0 1.906c.51-.004.925-.004 1.38.282 3.36 1.678 6.002 4.832 6.538 8.84.556 4.158-2.286 8.072-6.444 8.628-4.158.556-8.072-2.286-8.628-6.444-.556-4.158 2.286-8.072 6.444-8.628.57-.152 1.097-.678.71-.678z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation with Enhanced Responsiveness */}
      <nav className={`main-nav sticky top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200" 
          : "bg-white/90 backdrop-blur-md shadow-lg"
      }`}>
        <div className="container-responsive">
          <div className="flex justify-between items-center py-2 sm:py-3 lg:py-4">
            {/* Logo - Responsive sizing */}
            <div className="flex items-center">
              <a href="/" className="group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                <img 
                  src={site.logo.main} 
                  alt={site.name}
                  className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 w-auto transition-all duration-300 group-hover:scale-105"
                  loading="eager"
                  width="auto"
                  height={isMobile ? 40 : isTablet ? 48 : 64}
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navigation.mainMenu.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold transition-all duration-300 rounded-full touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    item.label === "Home" 
                      ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md hover:from-blue-700 hover:to-blue-800" 
                      : "text-gray-700 hover:text-blue-700 hover:bg-blue-50 active:bg-blue-100"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Action Buttons & Mobile Menu Toggle */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <a
                href="/login"
                className="hidden md:inline-flex items-center text-blue-700 border border-blue-700 px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-semibold hover:bg-blue-50 transition-all duration-300 touch-target focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </a>
              
              <a
                href="/registration"
                className="hidden sm:inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-md touch-target focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {/* Professional User Icon - Direct SVG */}
                <svg 
                  className="w-3 h-3 lg:w-4 lg:h-4 mr-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
                <span className="hidden md:inline">Registration</span>
                <span className="md:hidden">Join</span>
              </a>
              
              {/* Enhanced Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200 touch-target focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative w-5 h-5">
                  <span className={`absolute h-0.5 w-5 bg-gray-700 transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 top-2' : 'top-1'
                  }`}></span>
                  <span className={`absolute h-0.5 w-5 bg-gray-700 top-2 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute h-0.5 w-5 bg-gray-700 transform transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 top-2' : 'top-3'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Better UX */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Menu Panel */}
            <div className="relative z-40 bg-white border-t border-gray-200 shadow-xl">
              <div className="container-responsive py-4 safe-area-bottom">
                <nav className="space-y-1">
                  {navigation.mainMenu.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className={`block px-4 py-4 rounded-xl font-medium transition-all duration-200 touch-target ${
                        item.label === "Home"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{item.label}</span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  ))}
                  
                  {/* Mobile Action Buttons */}
                  <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
                    <a
                      href="/login"
                      className="block px-4 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold text-center hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 touch-target"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login to Account
                      </div>
                    </a>
                    <a
                      href="/registration"
                      className="block px-4 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-center hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 shadow-lg touch-target"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Join REJLERS
                      </div>
                    </a>
                  </div>
                  
                  {/* Mobile Contact Info */}
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-900 mb-2">Get in Touch</p>
                      <div className="space-y-2">
                        {navigation.topBar.leftContent.contacts.map((contact, index) => (
                          <a
                            key={index}
                            href={contact.link}
                            className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="w-4 h-4 mr-3 flex-shrink-0">
                              {contact.link.includes('tel:') ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                              )}
                            </div>
                            <span>{contact.text}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
