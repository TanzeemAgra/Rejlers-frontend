'use client';

import React, { useState, useEffect } from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';
import { ChevronDown } from '@/components/icons';

interface ProjectItem {
  id: number;
  title: string;
  categories: string[];
  image: string;
  link: string;
  lightboxImage: string;
  description: string;
}

const ProjectGallery: React.FC = () => {
  const { projects } = finixpaThemeConfig;
  const [activeFilter, setActiveFilter] = useState<string>('*');
  const [filteredProjects, setFilteredProjects] = useState<ProjectItem[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string>('');

  useEffect(() => {
    if (!projects?.items) return;
    
    if (activeFilter === '*') {
      setFilteredProjects(projects.items);
    } else {
      const filtered = projects.items.filter(item => 
        item.categories.some(cat => cat.toLowerCase() === activeFilter.replace('.', '').toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects?.items]);

  if (!projects) {
    return null;
  }

  // Generate responsive grid classes
  const getGridClasses = () => {
    const { columns } = projects.layout || { columns: { desktop: 4, tablet: 2, mobile: 1 } };
    const desktopCols = {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2', 
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      5: 'lg:grid-cols-5',
      6: 'lg:grid-cols-6'
    }[columns.desktop] || 'lg:grid-cols-4';

    const tabletCols = {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4'
    }[columns.tablet] || 'md:grid-cols-2';

    const mobileCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-2'
    }[columns.mobile] || 'grid-cols-1';

    return `grid ${desktopCols} ${tabletCols} ${mobileCols} ${projects.layout?.gap || 'gap-6'}`;
  };

  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage('');
  };

  return (
    <section className="py-20 bg-gray-50" id="project-gallery">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-px bg-orange-500"></div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              {projects.sectionTitle}
            </span>
            <div className="w-12 h-px bg-orange-500"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {projects.title}
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {projects.description}
          </p>
        </div>

        {/* Filter Navigation */}
        {projects.layout?.showFilter && (
          <div className="mb-12">
            {/* Mobile Filter Toggle */}
            <div className="block md:hidden mb-6">
              <button
                type="button"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                onClick={() => {
                  const filterMenu = document.getElementById('mobile-filter-menu');
                  filterMenu?.classList.toggle('hidden');
                }}
              >
                <span className="flex items-center justify-between">
                  <span className="font-semibold">Sort Gallery</span>
                  <ChevronDown className="w-4 h-4 text-gray-600 transition-transform" />
                </span>
              </button>
              <div id="mobile-filter-menu" className="hidden mt-2">
                <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                  {projects.categories?.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveFilter(category.filter);
                        document.getElementById('mobile-filter-menu')?.classList.add('hidden');
                      }}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        activeFilter === category.filter 
                          ? 'bg-orange-500 text-white hover:bg-orange-600' 
                          : 'text-gray-700'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Filter Menu */}
            <div className="hidden md:flex justify-center">
              <div className="inline-flex bg-white rounded-full p-2 shadow-lg border border-gray-200">
                {projects.categories?.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.filter)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeFilter === category.filter
                        ? 'bg-orange-500 text-white shadow-md transform scale-105'
                        : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className={`${getGridClasses()} mb-12`}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-square">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold mb-3">
                      <a 
                        href={project.link}
                        className="hover:text-orange-400 transition-colors"
                      >
                        {project.title}
                      </a>
                    </h3>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => openLightbox(project.lightboxImage)}
                        className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-300 transform hover:scale-110"
                        title="View Image"
                      >
                        <i className="icofont-image text-white text-lg"></i>
                      </button>
                      <a
                        href={project.link}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 transform hover:scale-110"
                        title="View Details"
                      >
                        <i className="icofont-external-link text-white text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {project.categories[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {projects.viewAllText && (
          <div className="text-center">
            <a
              href={projects.viewAllLink}
              className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {projects.viewAllText} →
            </a>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={lightboxImage}
              alt="Project"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <i className="icofont-close-line text-2xl"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;