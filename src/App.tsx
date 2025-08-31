import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';

// Lazy loading para mejor rendimiento
const Header = React.lazy(() => import('./components/Header').then(module => ({ default: module.Header })));
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Movies = React.lazy(() => import('./pages/Movies').then(module => ({ default: module.Movies })));
const TVShows = React.lazy(() => import('./pages/TVShows').then(module => ({ default: module.TVShows })));
const Anime = React.lazy(() => import('./pages/Anime').then(module => ({ default: module.Anime })));
const SearchPage = React.lazy(() => import('./pages/Search').then(module => ({ default: module.SearchPage })));
const MovieDetail = React.lazy(() => import('./pages/MovieDetail').then(module => ({ default: module.MovieDetail })));
const TVDetail = React.lazy(() => import('./pages/TVDetail').then(module => ({ default: module.TVDetail })));
const Cart = React.lazy(() => import('./pages/Cart').then(module => ({ default: module.Cart })));
const AdminPanel = React.lazy(() => import('./pages/AdminPanel').then(module => ({ default: module.AdminPanel })));

// Loading component optimizado
const LoadingFallback = React.memo(() => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="relative">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <div className="animate-spin rounded-full h-12 w-12 border-r-2 border-blue-400 absolute top-0 left-0 animation-delay-75"></div>
    </div>
  </div>
));

// Optimized App component
function App() {
  // Sistema optimizado de detección de refresh
  React.useEffect(() => {
    const handleBeforeUnload = React.useCallback(() => {
      sessionStorage.setItem('pageRefreshed', 'true');
    }, []);

    const handleLoad = React.useCallback(() => {
      if (sessionStorage.getItem('pageRefreshed') === 'true') {
        sessionStorage.removeItem('pageRefreshed');
        if (window.location.pathname !== '/') {
          window.location.href = 'https://tvalacarta.vercel.app/';
          return;
        }
      }
    }, []);

    if (sessionStorage.getItem('pageRefreshed') === 'true') {
      sessionStorage.removeItem('pageRefreshed');
      if (window.location.pathname !== '/') {
        window.location.href = 'https://tvalacarta.vercel.app/';
        return;
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload, { passive: true });
    window.addEventListener('load', handleLoad, { passive: true });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Sistema anti-zoom optimizado
  React.useEffect(() => {
    const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
        return false;
      }
    }, []);

    const handleWheel = React.useCallback((e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return false;
      }
    }, []);

    const handleTouchStart = React.useCallback((e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    }, []);

    const handleTouchMove = React.useCallback((e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    }, []);

    document.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <React.Suspense fallback={<LoadingFallback />}>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/*" element={
                  <>
                    <Header />
                    <main>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/tv" element={<TVShows />} />
                        <Route path="/anime" element={<Anime />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/tv/:id" element={<TVDetail />} />
                        <Route path="/cart" element={<Cart />} />
                      </Routes>
                    </main>
                  </>
                } />
              </Routes>
            </div>
          </React.Suspense>
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}

export default React.memo(App);