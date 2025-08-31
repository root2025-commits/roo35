import React, { memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Plus, Check } from 'lucide-react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config/api';
import { useCart } from '../context/CartContext';
import { CartAnimation } from './CartAnimation';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { imageCache } from '../utils/cache';
import type { Movie, TVShow, CartItem } from '../types/movie';

interface OptimizedMovieCardProps {
  item: Movie | TVShow;
  type: 'movie' | 'tv';
  priority?: boolean;
}

export const OptimizedMovieCard = memo(function OptimizedMovieCard({ 
  item, 
  type, 
  priority = false 
}: OptimizedMovieCardProps) {
  const { addItem, removeItem, isInCart } = useCart();
  const [showAnimation, setShowAnimation] = React.useState(false);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  // Memoized calculations
  const { title, year, posterUrl, inCart } = useMemo(() => {
    const itemTitle = 'title' in item ? item.title : item.name;
    const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date;
    const itemYear = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
    const itemPosterUrl = item.poster_path 
      ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${item.poster_path}`
      : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop&crop=center';
    
    return {
      title: itemTitle,
      year: itemYear,
      posterUrl: itemPosterUrl,
      inCart: isInCart(item.id)
    };
  }, [item, isInCart]);

  // Optimized cart action
  const handleCartAction = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem: CartItem = {
      id: item.id,
      title,
      poster_path: item.poster_path,
      type,
      release_date: 'release_date' in item ? item.release_date : undefined,
      first_air_date: 'first_air_date' in item ? item.first_air_date : undefined,
      vote_average: item.vote_average,
      selectedSeasons: type === 'tv' ? [1] : undefined,
    };

    if (inCart) {
      removeItem(item.id);
    } else {
      addItem(cartItem);
      setShowAnimation(true);
    }
  }, [item, title, type, inCart, addItem, removeItem]);

  // Lazy image loading
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    // Cache successful image loads
    imageCache.set(posterUrl, posterUrl);
  }, [posterUrl]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Don't render if not in viewport and not priority
  if (!priority && !isIntersecting && !imageLoaded) {
    return (
      <div 
        ref={targetRef} 
        className="group relative bg-white rounded-lg shadow-md overflow-hidden h-80 animate-pulse"
      >
        <div className="w-full h-64 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={targetRef}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <Link to={`/${type}/${item.id}`}>
        <div className="relative overflow-hidden">
          {/* Optimized image loading */}
          <div className="relative w-full h-80">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            <img
              src={posterUrl}
              alt={title}
              loading={priority ? 'eager' : 'lazy'}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
              }}
            />
            
            {imageError && (
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Sin imagen</span>
              </div>
            )}
          </div>
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{year}</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {item.overview || 'Sin descripción disponible'}
          </p>
        </div>
      </Link>
      
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleCartAction}
          className={`p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 ${
            inCart
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          aria-label={inCart ? 'Remover del carrito' : 'Agregar al carrito'}
        >
          {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>
      
      <CartAnimation 
        show={showAnimation} 
        onComplete={() => setShowAnimation(false)} 
      />
    </div>
  );
});

// Export both for backward compatibility
export { OptimizedMovieCard as MovieCard };