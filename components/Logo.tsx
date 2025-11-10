import React from 'react';

export type LogoProps = {
  className?: string;
  /**
   * 'light' is for dark backgrounds (e.g., a white logo).
   * 'dark' is for light backgrounds (e.g., a black logo).
   */
  variant?: 'light' | 'dark';
  alt?: string;
};

/**
 * Renders the site logo by loading an SVG from the /public/brand directory.
 * Includes performance optimizations and fallbacks.
 */
export const Logo: React.FC<LogoProps> = ({
  className = 'h-7 w-auto',
  variant = 'light',
  alt = 'TQM Digital Logo',
}) => {
  // Define logo file paths based on the project directory structure
  const lightLogoSrc = '/images/brand/tqm-logo-light.webp';
  const darkLogoSrc = '/images/brand/tqm-logo-dark.webp';

  const logoSrc = variant === 'dark' ? darkLogoSrc : lightLogoSrc;

  /**
   * Handles image loading errors. If the dark variant fails (e.g., file not found),
   * it falls back to displaying the light variant.
   */
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (variant === 'dark' && e.currentTarget.src.includes(darkLogoSrc)) {
      e.currentTarget.src = lightLogoSrc;
      e.currentTarget.onerror = null; // Prevent infinite loop if light logo also fails
    }
  };

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={className}
      // Eager loading for LCP element in the header
      loading="eager"
      fetchPriority="high"
      // Explicit dimensions help prevent Cumulative Layout Shift (CLS)
      // These should ideally match the aspect ratio of your logo.
      // E.g., for a 150x28 logo, with a height of h-7 (28px).
      width="200"
      height="50"
      onError={handleError}
    />
  );
};
