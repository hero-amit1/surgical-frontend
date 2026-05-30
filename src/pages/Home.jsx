import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FlaskConical,
    Stethoscope,
    Activity,
    Scissors,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../api";

/* ---------------- DATA ---------------- */
const categories = [
    { icon: FlaskConical, label: "Laboratory" },
    { icon: Stethoscope, label: "Medical" },
    { icon: Activity, label: "Equipments" },
    { icon: Scissors, label: "Surgical" },
];

const slides = [
    {
        eyebrow: "Featured",
        title: "Cardio Check Device",
        desc: "Advanced monitoring system for modern healthcare.",
        image:
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80",
    },
    {
        eyebrow: "New Arrival",
        title: "Medical Equipments",
        desc: "Reliable hospital-grade solutions across Nepal.",
        image:
            "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=2000&q=80",
    },
    {
        eyebrow: "Trusted Brand",
        title: "Laboratory Excellence",
        desc: "Precision instruments for diagnostics and labs.",
        image:
            "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2000&q=80",
    },
];

const medicalProducts = [
    {
        name: "Patient Monitor",
        image:
            "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Surgical Instruments",
        image:
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Operating Table",
        image:
            "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Lab Microscope",
        image:
            "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    },
];

/* ---------------- PAGE ---------------- */
export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <HeroSection />
            <WelcomeSection />
            <ProductSection />
            <StatsSection />
            <CTASection />
        </div>
    );
}

/* ---------------- HERO ---------------- */
function HeroSection() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const id = setInterval(
            () => setCurrent((p) => (p + 1) % slides.length),
            6000
        );
        return () => clearInterval(id);
    }, []);

    const slide = slides[current];

    return (
        <section className="relative h-screen flex items-center overflow-hidden">

            {/* BACKGROUND */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.2)), url(${slide.image})`,
                    }}
                />
            </AnimatePresence>

            {/* CONTENT */}
            <div className="container mx-auto px-4 relative z-10 text-white">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="uppercase tracking-[0.3em] text-sm text-white/80"
                >
                    {slide.eyebrow}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold mt-3"
                >
                    {slide.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-lg text-white/80 max-w-xl"
                >
                    {slide.desc}
                </motion.p>

                {/* CATEGORY ICONS */}
                <motion.div
                    className="mt-10 flex gap-6 flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {categories.map((item, i) => (
                        <motion.div
                            key={item.label}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center cursor-pointer"
                        >
                            <motion.div
                                className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center relative overflow-hidden group"
                                whileHover={{
                                    boxShadow: "0 0 30px rgba(15, 94, 255, 0.5)",
                                    backgroundColor: "rgba(15, 94, 255, 0.3)",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <item.icon className="h-7 w-7 text-white" />
                                </motion.div>
                            </motion.div>
                            <motion.span
                                className="text-xs mt-2 text-white/80"
                                whileHover={{ color: "#fff", letterSpacing: "0.1em" }}
                                transition={{ duration: 0.2 }}
                            >
                                {item.label}
                            </motion.span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* BUTTONS */}
                <motion.div
                    className="mt-12 flex gap-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link
                            className="bg-primary px-6 py-3 rounded-full font-semibold hover:shadow-lg relative group overflow-hidden flex items-center gap-2"
                            to="/products"
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-primary opacity-0"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative">Explore Products</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link
                            className="border border-white px-6 py-3 rounded-full font-semibold relative group overflow-hidden"
                            to="/contact"
                        >
                            <motion.span
                                className="absolute inset-0 bg-white opacity-0"
                                whileHover={{ opacity: 0.1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative">Contact Us</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* NAV BUTTONS */}
            <motion.button
                onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/90 h-12 w-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden group"
                whileHover={{ scale: 1.2, backgroundColor: "#fff" }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500 opacity-0"
                    whileHover={{ opacity: 0.15 }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div
                    whileHover={{ x: -4 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                >
                    <ChevronLeft className="h-5 w-5" />
                </motion.div>
            </motion.button>

            <motion.button
                onClick={() => setCurrent((p) => (p + 1) % slides.length)}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/90 h-12 w-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden group"
                whileHover={{ scale: 1.2, backgroundColor: "#fff" }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500 opacity-0"
                    whileHover={{ opacity: 0.15 }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                >
                    <ChevronRight className="h-5 w-5" />
                </motion.div>
            </motion.button>
        </section>
    );
}

/* ---------------- WELCOME ---------------- */
function WelcomeSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-0 right-0 h-96 w-96 bg-primary/5 rounded-full blur-3xl"
                animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative">

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.p
                        className="text-primary font-semibold tracking-widest text-sm"
                        whileHover={{ letterSpacing: "0.2em" }}
                        transition={{ duration: 0.2 }}
                    >
                        Welcome
                    </motion.p>

                    <motion.h2
                        className="text-4xl font-bold mt-3"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Empowering Healthcare in Nepal
                    </motion.h2>

                    <motion.p
                        className="mt-5 text-slate-600"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Trusted supplier of medical and laboratory equipment with modern solutions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 mt-8 bg-slate-900 text-white px-6 py-3 rounded-full relative group overflow-hidden"
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-800 opacity-0"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative flex items-center gap-2">
                                Read More
                                <motion.div whileHover={{ x: 4 }}>
                                    <ArrowRight />
                                </motion.div>
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-2xl blur-xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <img
                        src="https://www.aarnavsurgical.com/wp-content/uploads/2024/09/intro__design.jpg"
                        className="rounded-2xl shadow-2xl relative"
                    />
                </motion.div>
            </div>
        </section>
    );
}

/* ---------------- PRODUCTS ---------------- */
function ProductSection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTrending = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/search/trending/list?limit=8`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Unable to load trending products");
                }

                setProducts(data);
            } catch (err) {
                setError(err.message || "Unable to load trending products");
            } finally {
                setLoading(false);
            }
        };

        loadTrending();
    }, []);

    const displayProducts = products.length > 0 ? products : medicalProducts;

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-end mb-12"
                >
                    <div>
                        <p className="text-primary font-semibold">Trending</p>
                        <h2 className="text-4xl font-bold">Trending Products</h2>
                    </div>

                    <Link className="text-primary font-semibold flex items-center gap-2 group" to="/products">
                        View All <motion.div whileHover={{ x: 4 }}>
                            <ArrowRight />
                        </motion.div>
                    </Link>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {displayProducts.map((p, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -12, scale: 1.02 }}
                            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition relative group"
                        >
                            <div className="relative overflow-hidden">
                                <motion.img
                                    src={p.image}
                                    className="h-60 w-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <motion.div
                                    className="absolute inset-0 bg-black/0"
                                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-slate-900">{p.name}</h3>
                                {(p.trending || p.featured) && (
                                    <span className="inline-flex items-center gap-1 mt-2 text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                                        {p.trending ? "Trending" : "Featured"}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ---------------- STATS ---------------- */
function StatsSection() {
    const stats = [
        { n: "10+", l: "Years Experience" },
        { n: "500+", l: "Clients" },
        { n: "100+", l: "Products" },
        { n: "24/7", l: "Support" },
    ];

    return (
        <section className="bg-slate-900 text-white py-20 overflow-hidden">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 text-center gap-10">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        whileHover={{ scale: 1.08 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <motion.h3
                            className="text-5xl font-bold text-primary"
                            whileInView={{ scale: [1, 1.15, 1] }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            {s.n}
                        </motion.h3>
                        <p className="text-white/70 mt-2">{s.l}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ---------------- CTA ---------------- */
function CTASection() {
    return (
        <section className="relative py-28 bg-slate-900 text-white overflow-hidden">

            {/* background glow */}
            <div className="absolute -top-20 -left-20 h-72 w-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
            <div className="absolute -bottom-20 -right-20 h-72 w-72 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />

            <div className="container mx-auto px-4 text-center relative">

                {/* TITLE */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-extrabold"
                >
                    Need Medical Equipment?
                </motion.h2>

                {/* SUBTITLE */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-4 text-white/70 max-w-xl mx-auto"
                >
                    Contact us for reliable surgical, laboratory, and medical solutions across Nepal.
                </motion.p>

                {/* BUTTONS */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-10 flex flex-wrap justify-center gap-4"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/products"
                            className="inline-block bg-white text-slate-900 px-7 py-3 rounded-full font-semibold hover:shadow-xl transition"
                        >
                            Browse Products
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/contact"
                            className="inline-block border border-white px-7 py-3 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition"
                        >
                            Contact Us
                        </Link>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}