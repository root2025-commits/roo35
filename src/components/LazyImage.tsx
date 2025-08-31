import React, { useState, useCallback, memo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { imageCache } from '../utils/cache';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage = memo(function LazyImage({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop&crop=center',
  priority = false,
  onLoad,
  onError
}: LazyImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');
  
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Load image when in viewport or priority
  React.useEffect(() => {
    if ((isIntersecting || priority) && !currentSrc && !imageError) {
      // Check cache first
      const cached = imageCache.get(src);
      if (cached) {
        setCurrentSrc(src);
        setImageLoaded(true);
        onLoad?.();
        return;
      }
      
      // Preload image
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(src);
        setImageLoaded(true);
        imageCache.set(src, src);
        onLoad?.();
      };
      img.onerror = () => {
        setImageError(true);
        setCurrentSrc(fallbackSrc);
        onError?.();
      };
      img.src = src;
    }
  }, [isIntersecting, priority, src, currentSrc, imageError, fallbackSrc, onLoad, onError]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImageError(true);
      onError?.();
    }
  }, [currentSrc, fallbackSrc, onError]);

  return (
    <div ref={targetRef} className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      
      {imageError && currentSrc === fallbackSrc && (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Sin imagen</span>
        </div>
      )}
    </div>
  );
});