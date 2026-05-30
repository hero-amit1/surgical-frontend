import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, MapPin, CalendarCheck, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

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
                            href="tel:+97715313068"
                            className="flex items-center gap-2 hover:text-primary transition"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                whileHover={{ rotate: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Phone className="h-4 w-4" />
                            </motion.div>
                            +977-1-5313068
                        </motion.a>

                        <motion.span
                            className="hidden md:flex items-center gap-2 text-white/70"
                            whileHover={{ textDecoration: "underline", color: "#fff" }}
                        >
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                transition={{ duration: 0.3 }}
                            >
                                <MapPin className="h-4 w-4" />
                            </motion.div>
                            Kathmandu, Nepal
                        </motion.span>
                    </div>

                    <div className="flex gap-3">
                        {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                className="h-7 w-7 grid place-items-center rounded-full bg-white text-slate-900 transition"
                                whileHover={{
                                    scale: 1.3,
                                    backgroundColor: "#0f5eff",
                                    color: "#fff",
                                    rotate: 360,
                                }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Icon className="h-3.5 w-3.5" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* MAIN NAV */}
            <div className="container mx-auto px-4 flex items-center justify-between py-4">

                {/* LOGO */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link to="/" className="flex items-center gap-3">
                        <motion.div
                            className="h-11 w-11 rounded-full bg-slate-900 text-white grid place-items-center font-bold"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        >
                            A
                        </motion.div>

                        <div>
                            <motion.div
                                className="text-xl font-extrabold text-slate-900 leading-none"
                                whileHover={{ letterSpacing: "0.1em" }}
                                transition={{ duration: 0.2 }}
                            >
                                AARNAV
                            </motion.div>

                            <div className="text-[10px] tracking-widest text-slate-500 font-semibold">
                                SURGICAL HOUSE
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* DESKTOP NAV */}
                <motion.nav
                    className="hidden md:flex items-center gap-8"
                    initial="hidden"
                    animate="visible"
                >
                    {nav.map((item, i) => (
                        <motion.div
                            key={item.to}
                            custom={i}
                            variants={navVariants}
                        >
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `relative text-sm font-semibold transition group ${isActive
                                        ? "text-primary"
                                        : "text-slate-700"
                                    }`
                                }
                            >
                                <motion.span
                                    whileHover={{ letterSpacing: "0.05em" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.label}
                                </motion.span>

                                <motion.span
                                    className="absolute left-0 -bottom-1 h-[3px] bg-gradient-to-r from-primary via-primary to-indigo-500 rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.nav>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/contact"
                        className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold min-w-[150px] shadow-lg hover:bg-primary/90 transition relative group overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-primary opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />

                        <motion.div
                            className="relative flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.4 }}
                            >
                                <CalendarCheck className="h-4 w-4" />
                            </motion.div>

                            ORDER NOW
                        </motion.div>
                    </Link>
                </motion.div>

                {/* MOBILE MENU BUTTON */}
                <motion.button
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    {open ? <X /> : <Menu />}
                </motion.button>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="md:hidden bg-white border-t px-4 py-4 space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {nav.map((item, i) => (
                            <motion.div
                                key={item.to}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <NavLink
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        `block text-slate-700 font-medium ${isActive ? "text-primary" : ""
                                        }`
                                    }
                                >
                                    <motion.span
                                        whileHover={{ x: 8 }}
                                        transition={{ duration: 0.2 }}
                                        className="inline-block"
                                    >
                                        {item.label}
                                    </motion.span>
                                </NavLink>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: nav.length * 0.05 }}
                        >
                            <Link
                                to="/contact"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-full font-semibold min-w-[160px] shadow-lg hover:bg-primary/90 transition"
                            >
                                <CalendarCheck className="h-4 w-4" />
                                ORDER NOW
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}