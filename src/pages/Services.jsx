import { motion } from "framer-motion";
import {
    Truck,
    Wrench,
    GraduationCap,
    Headphones,
    ShieldCheck,
    PackageSearch,
    Factory,
    Globe,
} from "lucide-react";

const services = [
    {
        icon: Factory,
        title: "OEM Manufacturing / ODM Product Development",
        description:
            "Custom OEM and ODM solutions for medical and laboratory products tailored to your specifications.",
    },
    {
        icon: PackageSearch,
        title: "Private Label Medical Products",
        description:
            "End-to-end private labeling services for high-quality medical and healthcare products.",
    },
    {
        icon: GraduationCap,
        title: "International Tender Support",
        description:
            "Complete assistance in preparing and managing international medical equipment tenders.",
    },
    {
        icon: ShieldCheck,
        title: "Regulatory Consulting",
        description:
            "Expert guidance on medical regulations, certifications, and compliance requirements.",
    },
    {
        icon: Globe,
        title: "Import-Export Support",
        description:
            "Seamless import and export services for medical and laboratory equipment worldwide.",
    },
    {
        icon: Truck,
        title: "Global Logistics Management",
        description:
            "Efficient global shipping, warehousing, and supply chain management solutions.",
    },
    {
        icon: Wrench,
        title: "Contract Manufacturing",
        description:
            "Reliable contract manufacturing services for scalable production of medical products.",
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
                        Global Healthcare Manufacturing Solutions
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg text-white/70 max-w-3xl mx-auto"
                    >
                        From manufacturing to global distribution, we provide end-to-end medical and laboratory industry solutions.
                    </motion.p>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-28 bg-slate-50">
                <div className="container mx-auto px-4">

                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <p className="uppercase tracking-widest text-primary font-semibold text-sm">
                            What We Offer
                        </p>

                        <h2 className="text-4xl font-bold text-slate-900 mt-4">
                            Professional Global Services
                        </h2>

                        <p className="mt-5 text-slate-600">
                            End-to-end manufacturing, compliance, and global supply chain solutions.
                        </p>
                    </div>

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
                                <motion.div
                                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-indigo-500"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.4 }}
                                />

                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/5 opacity-0"
                                    whileHover={{ opacity: 1 }}
                                />

                                <motion.div
                                    className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-indigo-500/10 text-primary flex items-center justify-center"
                                    whileHover={{
                                        scale: 1.15,
                                        rotate: 360,
                                    }}
                                >
                                    <service.icon className="h-8 w-8" />
                                </motion.div>

                                <motion.h3 className="mt-6 text-xl font-bold text-slate-900">
                                    {service.title}
                                </motion.h3>

                                <motion.p className="mt-4 text-slate-600 leading-relaxed">
                                    {service.description}
                                </motion.p>

                                <motion.div
                                    className="absolute right-0 top-0 h-0 w-1 bg-gradient-to-b from-primary to-indigo-500"
                                    whileHover={{ height: "100%" }}
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

                <div className="container mx-auto px-4 text-center max-w-3xl">

                    <motion.h2 className="text-3xl md:text-5xl font-extrabold">
                        Let’s Build Global Healthcare Solutions Together
                    </motion.h2>

                    <motion.p className="mt-6 text-white/70">
                        Contact us for manufacturing, compliance, and global supply chain support.
                    </motion.p>

                    <motion.div className="mt-10 flex flex-wrap justify-center gap-4">

                        <motion.a
                            href="/contact"
                            className="bg-white text-slate-900 px-7 py-3 rounded-full font-semibold"
                            whileHover={{ scale: 1.05 }}
                        >
                            Contact Us
                        </motion.a>

                        <motion.a
                            href="/products"
                            className="border border-white px-7 py-3 rounded-full font-semibold"
                            whileHover={{ scale: 1.05 }}
                        >
                            View Products
                        </motion.a>

                    </motion.div>

                </div>
            </section>
        </>
    );
}