'use client';

import React from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';

interface BlogItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  category: string;
  comments: number;
  tags: string[];
  readMoreText: string;
  link: string;
}

const Blog: React.FC = () => {
  const { blog } = finixpaThemeConfig;

  if (!blog) {
    return null;
  }

  const formatDate = (dateString: string) => {
    // If it's already in the desired format, return as is
    if (dateString.includes('Jun') || dateString.includes('July')) {
      return dateString;
    }
    
    // Otherwise, format the date
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <section 
      className={`py-20 relative overflow-hidden ${
        blog.backgroundType === 'gradient'
          ? 'bg-gradient-to-br from-gray-50 to-white'
          : blog.backgroundType === 'image'
          ? 'bg-cover bg-center bg-no-repeat'
          : 'bg-gray-50'
      }`}
      style={blog.backgroundType === 'image' ? {
        backgroundImage: `url('${blog.backgroundColor}')`
      } : blog.backgroundType === 'solid' ? {
        backgroundColor: blog.backgroundColor
      } : {}}
      id="blog"
    >
      {/* Background Overlay for Image */}
      {blog.backgroundType === 'image' && (
        <div className="absolute inset-0 bg-white/90"></div>
      )}

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 -left-8 w-24 h-24 bg-orange-500/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-500/10 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {blog.title}
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {blog.description}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className={`grid gap-8 max-w-7xl mx-auto ${
          blog.layout?.type === 'grid'
            ? `lg:grid-cols-${blog.layout.columns?.desktop || 3} md:grid-cols-${blog.layout.columns?.tablet || 2} grid-cols-${blog.layout.columns?.mobile || 1}`
            : 'grid-cols-1'
        }`}>
          {blog.items.map((post, index) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Blog Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Blog Content */}
              <div className="p-8">
                {/* Blog Meta */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <i className="icofont-clock-time text-orange-500"></i>
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="icofont-ui-user text-orange-500"></i>
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="icofont-comment text-orange-500"></i>
                    <span>{post.comments}</span>
                  </div>
                </div>

                {/* Blog Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                  <a 
                    href={post.link} 
                    className="hover:underline"
                  >
                    {post.title}
                  </a>
                </h3>

                {/* Blog Excerpt */}
                <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Button */}
                <div className="flex items-center justify-between">
                  <a
                    href={post.link}
                    className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300 group/btn"
                  >
                    <span>{post.readMoreText} →</span>
                  </a>
                  
                  {/* Author Avatar */}
                  <div className="flex items-center space-x-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-100"
                    />
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors duration-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        {blog.layout?.showViewAll && (
          <div className="text-center mt-12">
            <a
              href={blog.layout.viewAllLink}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span>{blog.layout.viewAllText} →</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;