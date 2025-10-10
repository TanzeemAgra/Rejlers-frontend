'use client';

import React from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';

const Team: React.FC = () => {
  const { team } = finixpaThemeConfig;

  const renderContactIcon = (iconName: string) => {
    const iconClass = "text-orange-500 text-xl mr-3 w-5 h-5";
    
    switch (iconName) {
      case 'phone-circle':
      case 'phone':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        );
      case 'location-pin':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        );
      case 'envelope':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        );
      default:
        // Fallback for other icons - keep the original icofont class
        return <i className={`${iconName} text-orange-500 text-xl mr-3`}></i>;
    }
  };

  const renderSocialIcon = (platform: string) => {
    const iconClass = "w-4 h-4";
    
    switch (platform) {
      case 'facebook':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'skype':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617 0 .587.269 1.099 1.26 1.332l3.288.803c2.958.72 3.814 2.286 3.814 3.892 0 2.444-1.809 4.313-5.612 4.313zm-.251-11.834c-.021 0-.042.001-.063.001-3.314 0-6.002 2.688-6.002 6.002 0 3.314 2.688 6.002 6.002 6.002.021 0 .042-.001.063-.001 3.314 0 6.002-2.688 6.002-6.002 0-3.314-2.688-6.002-6.002-6.002z"/>
          </svg>
        );
      case 'pinterest':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.166-1.498-.69-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017 0z.001"/>
          </svg>
        );
      default:
        return <i className={`icofont-${platform}`}></i>;
    }
  };

  if (!team) {
    return null;
  }

  // Generate responsive grid classes for team members
  const getGridClasses = () => {
    const { columns } = team.layout || { columns: { desktop: 2, tablet: 2, mobile: 1 } };
    const desktopCols = {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2', 
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4'
    }[columns.desktop] || 'lg:grid-cols-2';

    const tabletCols = {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3'
    }[columns.tablet] || 'md:grid-cols-2';

    const mobileCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-2'
    }[columns.mobile] || 'grid-cols-1';

    return `grid ${desktopCols} ${tabletCols} ${mobileCols} ${team.layout?.gap || 'gap-8'}`;
  };

  return (
    <>
      {/* Team Header Section */}
      <section className="py-16 bg-gradient-to-br from-slate-100 to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            {/* Section Header */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-px bg-orange-500"></div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
                {team.sectionTitle}
              </span>
              <div className="w-12 h-px bg-orange-500"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              {team.title}
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {team.description}
            </p>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange-500/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -right-12 w-24 h-24 bg-blue-500/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-8 left-1/4 w-16 h-16 bg-orange-500/10 rounded-full animate-ping"></div>
        </div>
      </section>

      {/* Team Content Section */}
      <section className="py-20 bg-white" id="team">
        <div className="container mx-auto px-4">
          {team.layout?.type === 'mixed' ? (
            // Mixed Layout: Support Content + Team Grid (Original Template Style)
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Support Section */}
              <div className="space-y-8">
                {team.supportSection && (
                  <div>
                    <span className="text-orange-500 font-semibold text-lg uppercase tracking-wider block mb-4">
                      {team.supportSection.title}
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                      {team.supportSection.heading}
                    </h3>
                    
                    <div className="space-y-6">
                      {team.supportSection.description?.map((paragraph, index) => (
                        <p key={index} className="text-slate-600 leading-relaxed text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Contact Links */}
                    {team.supportSection.contact && (
                      <div className="mt-8 space-y-4">
                        {team.supportSection.contact.map((contact, index) => (
                          <div key={index}>
                            <a
                              href={contact.link}
                              className="inline-flex items-center text-slate-700 hover:text-orange-600 transition-colors duration-300 group"
                            >
                              {renderContactIcon(contact.icon)}
                              <span className="font-semibold text-lg mr-2">{contact.text}</span>
                              {contact.rightIcon && (
                                <i className={`${contact.rightIcon} text-orange-500 ml-2 group-hover:translate-x-1 transition-transform duration-300`}></i>
                              )}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right: Team Members Grid */}
              <div className={getGridClasses()}>
                {team.members?.map((member, index) => (
                  <div
                    key={member.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Member Photo */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Social Links Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex space-x-3">
                            {member.social?.facebook && (
                              <a
                                href={member.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                              >
                                {/* Facebook Icon - Direct SVG */}
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                              </a>
                            )}
                            {member.social?.twitter && (
                              <a
                                href={member.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                              >
                                {/* Twitter Icon - Direct SVG */}
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                              </a>
                            )}
                            {member.social?.linkedin && (
                              <a
                                href={member.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                              >
                                {/* LinkedIn Icon - Direct SVG */}
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              </a>
                            )}
                            {member.social?.skype && (
                              <a
                                href={`skype:${member.social.skype}?chat`}
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                              >
                                {/* Skype Icon - Direct SVG */}
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12.069,18.874c-4.023,0-5.82-1.979-5.82-3.464c0-0.765,0.561-1.296,1.333-1.296c1.723,0 1.273,2.477,4.487,2.477c1.641,0 2.55-0.895 2.55-1.811c0-0.551-0.269-1.16-1.354-1.429l-3.576-0.895C7.677,11.936,7,10.849,7,9.64c0-2.201,2.013-3.673,5.222-3.673c2.318,0,5.672,1.267,5.672,3.207c0,0.826-0.688,1.24-1.488,1.24c-1.515,0-1.145-2.21-4.108-2.21c-1.448,0-2.264,0.703-2.264,1.652c0,0.936,1.116,1.2,2.167,1.448l2.754,0.648c2.23,0.529,2.648,2.043,2.648,3.287C17.603,17.007,15.405,18.874,12.069,18.874z M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z"/>
                                </svg>
                              </a>
                            )}
                            {member.social?.pinterest && (
                              <a
                                href={member.social.pinterest}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                              >
                                {/* Pinterest Icon - Direct SVG */}
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C8.78,20.85 8.75,19.85 8.9,19.15L9.95,14.4C9.95,14.4 9.69,13.88 9.69,13.07C9.69,11.81 10.38,10.88 11.26,10.88C12,10.88 12.33,11.38 12.33,12.05C12.33,12.81 11.84,14.11 11.59,15.35C11.4,16.41 12.18,17.31 13.22,17.31C15.1,17.31 16.31,14.94 16.31,11.94C16.31,9.43 14.95,7.88 12.33,7.88C9.33,7.88 7.48,10.05 7.48,12.33C7.48,13.45 7.83,14.24 8.34,14.73C8.44,14.85 8.45,14.97 8.42,15.09C8.38,15.23 8.31,15.5 8.29,15.59C8.26,15.71 8.16,15.75 8.03,15.69C6.7,15.1 5.78,13.65 5.78,12.24C5.78,8.95 8.04,6.2 12.8,6.2C16.22,6.2 18.5,8.41 18.5,11.84C18.5,16.2 16.05,19.81 12.22,19.81C11.16,19.81 10.15,19.25 9.81,18.58L9.11,21.35C8.88,22.35 8.58,23.38 8.04,24.04C9.27,24.64 10.61,25 12.05,25A10,10 0 0,0 22,15A10,10 0 0,0 12,5"/>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-orange-500 font-semibold mb-3">
                        {member.position}
                      </p>
                      {member.bio && (
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Grid Layout: Team Members Only
            <div className={`${getGridClasses()} max-w-6xl mx-auto`}>
              {team.members?.map((member, index) => (
                <div
                  key={member.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Member Photo */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Social Links Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex space-x-3">
                          {member.social?.facebook && (
                            <a
                              href={member.social.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                            >
                              {renderSocialIcon('facebook')}
                            </a>
                          )}
                          {member.social?.twitter && (
                            <a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                            >
                              {renderSocialIcon('twitter')}
                            </a>
                          )}
                          {member.social?.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                            >
                              {renderSocialIcon('linkedin')}
                            </a>
                          )}
                          {member.social?.skype && (
                            <a
                              href={`skype:${member.social.skype}?chat`}
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                            >
                              {renderSocialIcon('skype')}
                            </a>
                          )}
                          {member.social?.pinterest && (
                            <a
                              href={member.social.pinterest}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                            >
                              {renderSocialIcon('pinterest')}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-orange-500 font-semibold mb-3">
                      {member.position}
                    </p>
                    {member.bio && (
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Team;