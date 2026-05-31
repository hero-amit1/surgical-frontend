import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, MapPin, CalendarCheck, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn
} from "react-icons/fa";

import logo from "../assets/logo.jpeg";

const nav = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    { to: "/products", label: "PRODUCTS" },
    { to: "/services", label: "SERVICES" },
    { to: "/contact", label: "CONTACT US" },
];

const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
        },
    }),
};

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl shadow-sm border-b">

            {/* TOP BAR */}
            <motion.div
                className="bg-slate-900 text-white text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 flex justify-between py-2">

                    <div className="flex items-center gap-4">
                        <motion.a
                            href="tel:+13075334504"
                            className="flex items-center gap-2 hover:text-primary transition"
                        >
                            <Phone className="h-4 w-4" />
                            +13075334504
                        </motion.a>

                        <motion.span className="hidden md:flex items-center gap-2 text-white/70">
                            <MapPin className="h-4 w-4" />
                            30 N Gould St Ste R, Sheridan, WY 82801, United States
                        </motion.span>
                    </div>

                    {/* SOCIAL LINKS */}
                    <div className="flex gap-3">
                        <motion.a
                            href="https://www.facebook.com/profile.php?id=61582285846161"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-7 w-7 grid place-items-center rounded-full bg-white text-slate-900"
                            whileHover={{
                                scale: 1.3,
                                backgroundColor: "#1877F2",
                                color: "#fff",
                            }}
                        >
                            <FaFacebookF className="h-3.5 w-3.5" />
                        </motion.a>

                        <motion.a
                            href="https://www.instagram.com/securedmeditech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-7 w-7 grid place-items-center rounded-full bg-white text-slate-900"
                            whileHover={{
                                scale: 1.3,
                                backgroundColor: "#E1306C",
                                color: "#fff",
                            }}
                        >
                            <FaInstagram className="h-3.5 w-3.5" />
                        </motion.a>

                        <motion.a
                            href="https://x.com/SecureMedglobal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-7 w-7 grid place-items-center rounded-full bg-white text-slate-900"
                            whileHover={{
                                scale: 1.3,
                                backgroundColor: "#000",
                                color: "#fff",
                            }}
                        >
                            <FaTwitter className="h-3.5 w-3.5" />
                        </motion.a>

                        <motion.a
                            href="https://www.linkedin.com/in/secure-meditech-5541a93b8/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-7 w-7 grid place-items-center rounded-full bg-white text-slate-900"
                            whileHover={{
                                scale: 1.3,
                                backgroundColor: "#0A66C2",
                                color: "#fff",
                            }}
                        >
                            <FaLinkedinIn className="h-3.5 w-3.5" />
                        </motion.a>
                    </div>
                </div>
            </motion.div>

            {/* MAIN NAV */}
            <div className="container mx-auto px-4 flex items-center justify-between py-4">

                {/* LOGO */}
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Link to="/" className="flex items-center gap-3">

                        <motion.img
                            src={logo}
                            alt="Secure Meditech Global"
                            className="h-11 w-11 object-contain rounded-md"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                        />

                        <div>
                            <div className="text-xl font-extrabold text-slate-900">
                                SECURE MEDITECH GLOBAL
                            </div>
                            <div className="text-[10px] tracking-widest text-slate-500 font-semibold">
                                SURGICAL HOUSE
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* DESKTOP NAV */}
                <motion.nav className="hidden md:flex items-center gap-8">
                    {nav.map((item, i) => (
                        <motion.div key={item.to} custom={i} variants={navVariants}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `text-sm font-semibold ${isActive ? "text-primary" : "text-slate-700"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.nav>

                {/* CTA */}
                <Link
                    to="/contact"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold"
                >
                    <CalendarCheck className="h-4 w-4" />
                    ORDER NOW
                </Link>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="md:hidden bg-white border-t px-4 py-4 space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {nav.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setOpen(false)}
                                className="block font-medium text-slate-700"
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}