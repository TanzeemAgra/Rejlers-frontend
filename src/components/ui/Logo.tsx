'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Building2 } from 'lucide-react';
import finixpaThemeConfig from '@/config/finixpaTheme';
import { logoConfig, getLogoPath, getLogoSize } from '@/config/logoConfig';

interface LogoProps {
  variant?: 'main' | 'footer' | 'favicon' | 'light' | 'dark' | 'icon';
  size?: 'icon' | 'small' | 'medium' | 'large' | 'xlarge' | 'hero' | number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
  priority?: boolean;
  alt?: string;
  fallbackIcon?: boolean;
  context?: keyof typeof logoConfig.contexts;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'main',
  size = 'medium',
  className = '',
  showText = false,
  textClassName = '',
  priority = false,
  alt,
  fallbackIcon = true,
  context,
}) => {
  const [imageError, setImageError] = useState(false);

  // Use context configuration if provided
  const contextConfig = context ? logoConfig.contexts[context] : null;
  
  // Merge props with context config (props take precedence)
  const finalSize = getLogoSize(contextConfig?.size || size);
  const finalVariant = contextConfig?.variant || variant;
  const finalClassName = className || contextConfig?.className || '';
  const finalShowText = showText || contextConfig?.showText || false;
  const finalTextClassName = textClassName || '';
  
  const logoSrc = getLogoPath(finalVariant as any) || finixpaThemeConfig.site.logo[variant as keyof typeof finixpaThemeConfig.site.logo];
  const siteName = finixpaThemeConfig.site.name;

  // Fallback to icon if image fails to load
  if (imageError && fallbackIcon) {
    return (
      <div className={`flex items-center space-x-2 ${finalClassName}`}>
        <div className="relative flex-shrink-0">
          <Building2 
            size={finalSize} 
            className="text-blue-600"
          />
        </div>
        {finalShowText && (
          <span className={`font-bold text-slate-900 ${finalTextClassName}`}>
            {siteName}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${finalClassName}`}>
      <div className="relative flex-shrink-0">
        <Image
          src={logoSrc}
          alt={alt || logoConfig.accessibility.defaultAlt}
          width={finalSize}
          height={finalSize}
          priority={priority}
          className="object-contain"
          style={{
            width: finalSize,
            height: finalSize,
          }}
          onError={() => setImageError(true)}
        />
      </div>
      {finalShowText && (
        <span className={`font-bold text-slate-900 ${finalTextClassName}`}>
          {siteName}
        </span>
      )}
    </div>
  );
};

export default Logo;