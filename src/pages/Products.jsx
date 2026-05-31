import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import PageHero from "../components/PageHero";
import { API_BASE_URL } from "../api";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
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

import { Reveal } from "../components/motion-primitives";

const BRAND_GRADIENT = "from-primary to-accentGreen-500";


export default function ProductsPage() {
    const [cat, setCat] = useState("All");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/products`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Failed to load products");
                }
                setProducts(data);
                setError("");
            } catch (err) {
                setError(err.message || "Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const categories = useMemo(() => {
        const unique = [...new Set(products.map((p) => p.category).filter(Boolean))];
        return ["All", ...unique];
    }, [products]);

    const filtered =
        cat === "All"
            ? products
            : products.filter((p) => p.category === cat);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border text-center max-w-xl">
                    <h2 className="text-2xl font-semibold mb-3">Unable to load products</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-black text-white px-6 py-3 rounded-2xl"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* HERO */}
            <Reveal>
                <PageHero
                    title="Our Products"
                    subtitle="High-quality medical, surgical and laboratory equipment from trusted brands."
                />
            </Reveal>

            <Reveal delay={0.05}>
                <section className="container mx-auto px-4 py-12">

                    {/* FILTER BUTTONS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2 justify-center mb-10"
                    >
                        {categories.map((c, i) => (
                            <motion.button
                                key={c}
                                whileHover={{ scale: 1.08, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                onClick={() => setCat(c)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold border transition relative group overflow-hidden ${cat === c
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-900"
                                    }`}
                            >
                                {cat === c && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-950 opacity-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                                <span className="relative">{c}</span>
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* PRODUCTS GRID */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {filtered.map((p) => (
                            <motion.div
                                key={p.slug || p._id}
                                variants={itemVariants}
                                whileHover={{ y: -12, scale: 1.03 }}
                                className="group bg-white border rounded-xl overflow-hidden hover:shadow-2xl transition relative"
                            >
                                {/* Active indicator */}
                                <motion.div
                                    className="absolute top-0 right-0 h-1 w-1 rounded-full bg-primary"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                                    <motion.img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.2, rotate: 2 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-slate-900/0 flex items-center justify-center"
                                        whileHover={{ backgroundColor: "rgba(15, 23, 42, 0.3)" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            className="text-white font-bold text-lg opacity-0"
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            ✓
                                        </motion.div>
                                    </motion.div>
                                </div>

                                <div className="p-4 relative">
                                    <motion.div
                                        initial={{ opacity: 0.7 }}
                                        whileHover={{ opacity: 1, color: "#10b981" }}
                                        transition={{ duration: 0.2 }}
                                        className="text-xs text-slate-500 font-semibold uppercase tracking-wider"
                                    >
                                        {p.brand || p.category}
                                    </motion.div>

                                    <motion.h4
                                        className="mt-1 font-semibold text-slate-900 text-sm line-clamp-2"
                                        transition={{ duration: 0.2 }}
                                    >
                                        {p.name}
                                    </motion.h4>

                                    <motion.div
                                        whileHover={{ x: 6 }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-3"
                                    >
                                        <Link
                                            to={`/products/${p.slug || p._id}`}
                                            className="inline-block text-xs font-semibold text-primary relative group/link"
                                        >
                                            View Details →
                                            <motion.span
                                                className="absolute left-0 -bottom-0.5 h-[2px] bg-primary"
                                                initial={{ width: 0 }}
                                                whileHover={{ width: "100%" }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Bottom border animation */}
                                <motion.div
                                    from-primary to-accentGreen-500
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </Reveal>
        </>
    );
}