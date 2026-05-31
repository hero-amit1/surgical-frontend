import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Products from './pages/Products.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';

// Admin pages
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminProducts from './admin/AdminProducts.jsx';
import AdminAddProduct from './admin/AdminAddProduct.jsx';
import AdminEditProduct from './admin/AdminEditProduct.jsx';
import AdminProfile from './admin/AdminProfile.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

export default function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="min-h-screen flex flex-col">
            {!isAdminRoute && <Navbar />}
            {!isAdminRoute && <ScrollToTop />}
            {!isAdminRoute && <WhatsAppFloat />}

            <main className="flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        <Routes>
                            {/* Public Pages */}
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:slug" element={<ProductDetail />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/contact" element={<Contact />} />

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                            <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
                            <Route path="/admin/products/:id" element={<ProtectedRoute><AdminEditProduct /></ProtectedRoute>} />
                            <Route path="/admin/add-product" element={<ProtectedRoute><AdminAddProduct /></ProtectedRoute>} />
                            <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
            </main>

            {!isAdminRoute && <Footer />}
        </div >
    );
}