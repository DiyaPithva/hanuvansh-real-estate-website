import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

const HomePage           = lazy(() => import('./pages/HomePage.jsx'));
const PropertiesPage     = lazy(() => import('./pages/PropertiesPage.jsx'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage.jsx'));
const AboutPage          = lazy(() => import('./pages/AboutPage.jsx'));
const FounderPage        = lazy(() => import('./pages/FounderPage.jsx'));
const ContactPage        = lazy(() => import('./pages/ContactPage.jsx'));
const NotFoundPage       = lazy(() => import('./pages/NotFoundPage.jsx'));

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 rounded-full border-2 border-saffron-light border-t-saffron animate-spin" />
    </div>
  );
}

function Fade({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/"               element={<Fade><HomePage /></Fade>} />
          <Route path="/properties"     element={<Fade><PropertiesPage /></Fade>} />
          <Route path="/properties/:id" element={<Fade><PropertyDetailPage /></Fade>} />
          <Route path="/about"          element={<Fade><AboutPage /></Fade>} />
          <Route path="/founder"        element={<Fade><FounderPage /></Fade>} />
          <Route path="/contact"        element={<Fade><ContactPage /></Fade>} />
        </Route>
        <Route path="*" element={<Fade><NotFoundPage /></Fade>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
