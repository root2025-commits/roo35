import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Film } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useDebounce } from '../hooks/useDebounce';
import { useAnalytics } from '../utils/analytics';

export const OptimizedHeader = React.memo(function OptimizedHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useCart();
  const { trackAction } = useAnalytics();
  
  // Debounced search for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Memoized cart count for performance
  const cartCount = useMemo(() => state.total, [state.total]);

  // Real-time search effect with debouncing
  React.useEffect(() => {
    if (debouncedSearchQuery.trim() && debouncedSearchQuery.length > 2) {
      navigate(`/search?q=${encodeURIComponent(debouncedSearchQuery.trim())}`);
      trackAction('search_query', { query: debouncedSearchQuery });
    }
  }, [debouncedSearchQuery, navigate, trackAction]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      trackAction('search_submit', { query: searchQuery });
    }
  }, [searchQuery, navigate, trackAction]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Clear search when navigating away from search page
  React.useEffect(() => {
    if (!location.pathname.includes('/search')) {
      setSearchQuery('');
    }
  }, [location.pathname]);

  // Memoized navigation items
  const navigationItems = useMemo(() => [
    { to: '/movies', label: 'Películas' },
    { to: '/tv', label: 'Series' },
    { to: '/anime', label: 'Anime' }
  ], []);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              onClick={() => trackAction('logo_click')}
            >
              <img 
                src="/unnamed.png" 
                alt="TV a la Carta" 
                className="h-8 w-8"
                loading="eager"
              />
              <span className="font-bold text-xl hidden sm:block">TV a la Carta</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              {navigationItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="hover:text-blue-200 transition-colors"
                  onClick={() => trackAction('nav_click', { page: to })}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Buscar películas, series..."
                  className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent w-64 transition-all duration-300"
                  autoComplete="off"
                />
              </div>
            </form>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
              onClick={() => trackAction('cart_click')}
            >
              <ShoppingCart className="h-6 w-6 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 sm:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar películas, series..."
                className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent w-full"
                autoComplete="off"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
});

// Export for backward compatibility
export { OptimizedHeader as Header };