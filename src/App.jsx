import { Routes, Route, useLocation } from 'react-router-dom';

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
                    <Route path="/admin/add-product" element={<ProtectedRoute><AdminAddProduct /></ProtectedRoute>} />
                    <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            {!isAdminRoute && <Footer />}
        </div>
    );
}