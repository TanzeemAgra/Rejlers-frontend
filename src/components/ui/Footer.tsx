'use client';

import React from 'react';
import Link from 'next/link';
import finixpaThemeConfig from '@/config/finixpaTheme';

const Footer: React.FC = () => {
  const { footer } = finixpaThemeConfig;

  if (!footer) return null;

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 py-16">
        {/* PERMANENT REMOVAL: Footer branding section permanently disabled */}
        {footer.showBranding && footer.logo && (
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={footer.logo}
                    alt="Company Logo"
                    className="h-16 w-auto"
                  />
                  <div>
                    <h2 className="text-3xl font-bold text-white">REJLERS</h2>
                    <p className="text-orange-400 font-semibold text-lg">Industrial & Factorial Business</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Professional industrial and factorial business solutions with cutting-edge technology
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Company</h3>
            </div>
            <div className="space-y-3">
              <Link href="/about" className="block text-slate-300 hover:text-orange-400 transition-colors">About Us</Link>
              <Link href="/services" className="block text-slate-300 hover:text-orange-400 transition-colors">Services</Link>
              <Link href="/blog" className="block text-slate-300 hover:text-orange-400 transition-colors">Blog</Link>
              <Link href="/contact" className="block text-slate-300 hover:text-orange-400 transition-colors">Contact</Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">🔧</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Services</h3>
            </div>
            <div className="space-y-3">
              <Link href="/services" className="block text-slate-300 hover:text-orange-400 transition-colors">Industrial Engineering</Link>
              <Link href="/services" className="block text-slate-300 hover:text-orange-400 transition-colors">Oil & Gas Solutions</Link>
              <Link href="/services" className="block text-slate-300 hover:text-orange-400 transition-colors">Renewable Energy</Link>
              <Link href="/help" className="block text-slate-300 hover:text-orange-400 transition-colors">Technical Support</Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">🕐</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Working Hours</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300">Monday - Friday</span>
                <span className="text-orange-400">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Saturday</span>
                <span className="text-yellow-400">9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Sunday</span>
                <span className="text-red-400">Closed</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">📞</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Contact Info</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div>
                    <p className="text-slate-300">123 Industrial Avenue</p>
                    <p className="text-slate-400">Manufacturing District, NY 10001</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <p className="text-slate-300">+1 (555) 0123-456</p>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <p className="text-slate-300">info@rejlers.com</p>
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <a href="https://facebook.com/rejlers" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors group" title="Facebook">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/rejlers" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors group" title="X (Twitter)">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/rejlers" className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors group" title="LinkedIn">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/rejlers" className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group" title="Instagram">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@rejlers" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors group" title="YouTube">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {footer.bottomBar && (
          <div className="mt-16 pt-8 border-t border-slate-700">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-slate-400">
                {footer.bottomBar.copyright}
              </p>
              <div className="flex space-x-6">
                {footer.bottomBar.links.map((link: any, index: number) => (
                  <Link 
                    key={index} 
                    href={link.href} 
                    className="text-slate-400 hover:text-orange-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;