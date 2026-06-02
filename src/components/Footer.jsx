import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn
} from "react-icons/fa";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white pt-20 overflow-hidden">

            <div className="container mx-auto px-4">

                {/* TOP FOOTER */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >

                    {/* COMPANY */}
                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl font-extrabold tracking-wide">
                            SECURE MEDITECH GLOBAL
                        </h2>

                        <p className="text-xs tracking-[0.3em] text-primary mt-1 font-semibold">
                            Your Manufacturing Partner
                        </p>

                        <p className="mt-6 text-slate-400 leading-relaxed text-sm">
                            Empowering healthcare with high-quality medical,
                            surgical, and laboratory equipment across World.
                        </p>

                        {/* SOCIAL LINKS */}
                        <div className="flex gap-4 mt-8">

                            <motion.a
                                href="https://www.facebook.com/profile.php?id=61582285846161"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center"
                                whileHover={{ scale: 1.2, backgroundColor: "#1877F2", color: "#fff" }}
                            >
                                <FaFacebookF className="h-5 w-5" />
                            </motion.a>

                            <motion.a
                                href="https://www.instagram.com/securedmeditech/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center"
                                whileHover={{ scale: 1.2, backgroundColor: "#E1306C", color: "#fff" }}
                            >
                                <FaInstagram className="h-5 w-5" />
                            </motion.a>

                            <motion.a
                                href="https://x.com/SecureMedglobal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center"
                                whileHover={{ scale: 1.2, backgroundColor: "#000", color: "#fff" }}
                            >
                                <FaTwitter className="h-5 w-5" />
                            </motion.a>

                            <motion.a
                                href="https://www.linkedin.com/in/secure-meditech-5541a93b8/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center"
                                whileHover={{ scale: 1.2, backgroundColor: "#0A66C2", color: "#fff" }}
                            >
                                <FaLinkedinIn className="h-5 w-5" />
                            </motion.a>

                        </div>
                    </motion.div>

                    {/* QUICK LINKS */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold mb-6">Quick Links</h3>

                        <ul className="space-y-4 text-slate-400 text-sm">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/about", label: "About" },
                                { to: "/products", label: "Products" },
                                { to: "/services", label: "Services" },
                                { to: "/contact", label: "Contact" },
                            ].map((link, i) => (
                                <motion.li key={link.to}>
                                    <Link to={link.to} className="hover:text-primary transition">
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* CATEGORIES */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold mb-6">Categories</h3>

                        <ul className="space-y-4 text-slate-400 text-sm">
                            {[
                                "Laboratory Equipments",
                                "Medical Equipments",
                                "Surgical Instruments",
                                "Orthopedic Products",
                                "Diagnostic Devices",
                            ].map((cat) => (
                                <li key={cat} className="hover:text-primary transition cursor-pointer">
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* CONTACT */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold mb-6">Contact Info</h3>

                        <div className="space-y-5 text-sm text-slate-400">

                            <div className="flex gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-1" />
                                <p>30 N Gould St Ste R, Sheridan, WY 82801, United States</p>
                            </div>

                            <div className="flex gap-3">
                                <Phone className="h-5 w-5 text-primary mt-1" />
                                <p>+13075334504</p>
                            </div>

                            <div className="flex gap-3">
                                <Mail className="h-5 w-5 text-primary mt-1" />
                                <p>info@securemeditechglobal.com</p>
                            </div>

                        </div>
                    </motion.div>

                </motion.div>

                {/* BOTTOM FOOTER */}
                <div className="py-6 flex flex-col md:flex-row justify-between text-sm text-slate-500">
                    <p>
                        © {new Date().getFullYear()} Secure Meditech Global Pvt. Ltd.
                    </p>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary">Privacy Policy</a>
                        <a href="#" className="hover:text-primary">Terms</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}