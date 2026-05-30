import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Send,
} from "lucide-react";

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

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
                        <motion.h2
                            className="text-3xl font-extrabold tracking-wide"
                            whileHover={{ letterSpacing: "0.2em", color: "#0f5eff" }}
                            transition={{ duration: 0.2 }}
                        >
                            AARNAV
                        </motion.h2>

                        <p className="text-xs tracking-[0.3em] text-primary mt-1 font-semibold">
                            SURGICAL HOUSE PVT. LTD.
                        </p>

                        <p className="mt-6 text-slate-400 leading-relaxed text-sm">
                            Empowering healthcare with high-quality medical,
                            surgical, and laboratory equipment across Nepal.
                        </p>

                        {/* SOCIAL */}
                        <div className="flex gap-4 mt-8">

                            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center relative overflow-hidden group"
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Rotating background */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500 opacity-0"
                                        whileHover={{ opacity: 1, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    />

                                    <motion.div
                                        className="relative"
                                        whileHover={{ rotate: 360, scale: 1.2 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </motion.div>
                                </motion.a>
                            ))}

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
                                <motion.li
                                    key={link.to}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        to={link.to}
                                        className="relative inline-block"
                                    >
                                        <motion.span
                                            whileHover={{ color: "#0f5eff", x: 8 }}
                                            transition={{ duration: 0.2 }}
                                            className="inline-block"
                                        >
                                            {link.label}
                                        </motion.span>
                                        <motion.span
                                            className="absolute left-0 bottom-0 h-[2px] bg-primary"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
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
                            ].map((cat, i) => (
                                <motion.li
                                    key={cat}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ x: 8, color: "#0f5eff" }}
                                    viewport={{ once: true }}
                                    className="cursor-pointer relative"
                                >
                                    {cat}
                                    <motion.span
                                        className="absolute left-0 -bottom-1 h-[2px] bg-primary"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* CONTACT */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold mb-6">Contact Info</h3>

                        <div className="space-y-5 text-sm text-slate-400">

                            {[
                                {
                                    icon: MapPin,
                                    text: "Tripureshwor-11, Kathmandu, Nepal",
                                    delay: 0,
                                },
                                {
                                    icon: Phone,
                                    text: "+977-1-5313068",
                                    delay: 0.1,
                                },
                                {
                                    icon: Mail,
                                    text: "info@aarnavsurgical.com",
                                    delay: 0.2,
                                },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex gap-3 group cursor-pointer"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: item.delay }}
                                    whileHover={{ x: 8 }}
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <item.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    </motion.div>
                                    <motion.p
                                        whileHover={{ color: "#0f5eff" }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {item.text}
                                    </motion.p>
                                </motion.div>
                            ))}

                        </div>
                    </motion.div>

                </motion.div>

                {/* BOTTOM FOOTER */}
                <motion.div
                    className="py-6 flex flex-col md:flex-row justify-between text-sm text-slate-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        whileHover={{ color: "#fff", letterSpacing: "0.05em" }}
                        transition={{ duration: 0.2 }}
                    >
                        © {new Date().getFullYear()} Aarnav Surgical House Pvt. Ltd.
                    </motion.p>

                    <div className="flex gap-6">
                        {["Privacy Policy", "Terms"].map((link, i) => (
                            <motion.a
                                key={link}
                                href="#"
                                className="relative inline-block"
                                whileHover={{ color: "#0f5eff" }}
                                transition={{ duration: 0.2 }}
                            >
                                {link}
                                <motion.span
                                    className="absolute left-0 -bottom-0.5 h-[1px] bg-primary"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

            </div>
        </footer>
    );
}