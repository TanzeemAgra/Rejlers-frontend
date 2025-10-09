'use client';

import React from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';

const Team: React.FC = () => {
  const { team } = finixpaThemeConfig;

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
                              <i className={`${contact.icon} text-orange-500 text-xl mr-3`}></i>
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
                                <i className="icofont-facebook"></i>
                              </a>
                            )}
                            {member.social?.twitter && (
                              <a
                                href={member.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                              >
                                <i className="icofont-twitter"></i>
                              </a>
                            )}
                            {member.social?.linkedin && (
                              <a
                                href={member.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                              >
                                <i className="icofont-linkedin"></i>
                              </a>
                            )}
                            {member.social?.skype && (
                              <a
                                href={`skype:${member.social.skype}?chat`}
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                              >
                                <i className="icofont-skype"></i>
                              </a>
                            )}
                            {member.social?.pinterest && (
                              <a
                                href={member.social.pinterest}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                              >
                                <i className="icofont-pinterest"></i>
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
                              <i className="icofont-facebook"></i>
                            </a>
                          )}
                          {member.social?.twitter && (
                            <a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                            >
                              <i className="icofont-twitter"></i>
                            </a>
                          )}
                          {member.social?.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                            >
                              <i className="icofont-linkedin"></i>
                            </a>
                          )}
                          {member.social?.skype && (
                            <a
                              href={`skype:${member.social.skype}?chat`}
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                            >
                              <i className="icofont-skype"></i>
                            </a>
                          )}
                          {member.social?.pinterest && (
                            <a
                              href={member.social.pinterest}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                            >
                              <i className="icofont-pinterest"></i>
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