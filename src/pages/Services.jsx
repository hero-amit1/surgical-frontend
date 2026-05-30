import { motion } from "framer-motion";
import {
    Truck,
    Wrench,
    GraduationCap,
    Headphones,
    ShieldCheck,
    PackageSearch,
} from "lucide-react";

const services = [
    {
        icon: PackageSearch,
        title: "Equipment Supply",
        description:
            "End-to-end sourcing of medical, surgical, and laboratory equipment from trusted global manufacturers.",
    },
    {
        icon: Truck,
        title: "Pan Nepal Delivery",
        description:
            "Fast and reliable delivery service for hospitals, clinics, and laboratories across Nepal.",
    },
    {
        icon: Wrench,
        title: "Installation & Setup",
        description:
            "Professional installation and setup services by experienced technical experts.",
    },
    {
        icon: GraduationCap,
        title: "Training & Demonstration",
        description:
            "Complete product training and demonstrations for healthcare professionals and technicians.",
    },
    {
        icon: Headphones,
        title: "After Sales Support",
        description:
            "Responsive customer support, maintenance, and technical assistance whenever you need it.",
    },
    {
        icon: ShieldCheck,
        title: "Warranty & Genuine Parts",
        description:
            "Original products with official warranty coverage and genuine replacement parts.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

export default function Services() {
    return (
        <>
            {/* HERO */}
            <section className="relative bg-slate-950 text-white py-28 overflow-hidden">

                {/* animated glow */}
                <div className="absolute -top-20 -left-20 h-80 w-80 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
                <div className="absolute -bottom-20 right-0 h-80 w-80 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />

                <div className="container mx-auto px-4 text-center relative">

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="uppercase tracking-[0.3em] text-primary font-semibold text-sm"
                    >
                        Our Services
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold mt-4"
                    >
                        Complete Healthcare Solutions
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg text-white/70 max-w-3xl mx-auto"
                    >
                        From supply to installation and after-sales support, we deliver
                        end-to-end medical and laboratory solutions across Nepal.
                    </motion.p>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-28 bg-slate-50">
                <div className="container mx-auto px-4">

                    {/* TITLE */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <p className="uppercase tracking-widest text-primary font-semibold text-sm">
                            What We Offer
                        </p>

                        <h2 className="text-4xl font-bold text-slate-900 mt-4">
                            Professional Medical Services
                        </h2>

                        <p className="mt-5 text-slate-600">
                            Reliable healthcare solutions designed for hospitals, clinics,
                            and laboratories.
                        </p>
                    </div>

                    {/* CARDS */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -16, scale: 1.04 }}
                                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl border border-slate-100 transition relative group overflow-hidden"
                            >
                                {/* Animated top border */}
                                <motion.div
                                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-indigo-500"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Gradient background on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/5 opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Icon */}
                                <motion.div
                                    className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-indigo-500/10 text-primary flex items-center justify-center relative"
                                    whileHover={{
                                        scale: 1.15,
                                        rotate: 360,
                                        backgroundColor: "rgba(15, 94, 255, 0.2)",
                                        boxShadow: "0 0 30px rgba(15, 94, 255, 0.3)",
                                    }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <service.icon className="h-8 w-8" />
                                </motion.div>

                                {/* Title */}
                                <motion.h3
                                    className="mt-6 text-xl font-bold text-slate-900 relative"
                                    whileHover={{ color: "#0f5eff", letterSpacing: "0.05em" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {service.title}
                                </motion.h3>

                                {/* Description */}
                                <motion.p
                                    className="mt-4 text-slate-600 leading-relaxed relative"
                                    whileHover={{ color: "#475569" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {service.description}
                                </motion.p>

                                {/* Animated right border on hover */}
                                <motion.div
                                    className="absolute right-0 top-0 h-0 w-1 bg-gradient-to-b from-primary to-indigo-500"
                                    initial={{ height: 0 }}
                                    whileHover={{ height: "100%" }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-28 bg-slate-900 text-white overflow-hidden">

                <div className="absolute -top-20 -left-20 h-72 w-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
                <div className="absolute -bottom-20 -right-20 h-72 w-72 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />

                <div className="container mx-auto px-4 text-center relative max-w-3xl">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-extrabold"
                    >
                        Let’s Support Your Healthcare Facility
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-white/70"
                    >
                        Get expert assistance for equipment supply, installation, and
                        technical support tailored to your needs.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-10 flex flex-wrap justify-center gap-4"
                    >
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-slate-900 px-7 py-3 rounded-full font-semibold hover:shadow-lg transition"
                        >
                            Contact Us
                        </motion.a>

                        <motion.a
                            href="/products"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border border-white px-7 py-3 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition"
                        >
                            View Products
                        </motion.a>
                    </motion.div>

                </div>
            </section>
        </>
    );
}