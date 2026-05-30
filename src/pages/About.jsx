import { motion } from "framer-motion";
import PageHero from "../components/PageHero";

function CheckIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M20 6L9 17l-5-5" />
        </svg>
    );
}

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
        transition: { duration: 0.6 },
    },
};

export default function About() {
    return (
        <>
            <PageHero
                title="About Us"
                subtitle="A trusted supplier of high-grade medical, surgical and laboratory equipment in Nepal."
            />

            <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
                <motion.img
                    initial={{ opacity: 0, scale: 0.9, x: -40 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    src="https://www.aarnavsurgical.com/wp-content/uploads/2024/09/intro__design.jpg"
                    alt="Aarnav Surgical"
                    className="rounded-2xl shadow-xl"
                />

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-900 font-semibold text-sm uppercase tracking-widest"
                    >
                        Who We Are
                    </motion.h3>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-slate-900 mt-3"
                    >
                        Empowering Healthcare with Quality Equipment
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-5 text-slate-600 leading-relaxed"
                    >
                        Aarnav Surgical House, located in Tripureshwor, Kathmandu, is a trusted supplier specializing in
                        a wide range of medical, surgical, and laboratory equipment. We supply hospitals, laboratories
                        and healthcare professionals across Nepal with the latest and most reliable products from
                        renowned global brands.
                    </motion.p>

                    <motion.ul
                        className="mt-6 space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            'Authorized distributor for leading brands',
                            'Pan-Nepal delivery & installation',
                            'After-sales service and training',
                            'Genuine products with warranty',
                        ].map((t) => (
                            <motion.li
                                key={t}
                                variants={itemVariants}
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-3 text-slate-800 group cursor-pointer relative"
                            >
                                <motion.div
                                    className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 relative"
                                    whileHover={{
                                        scale: 1.3,
                                        backgroundColor: "rgba(15, 94, 255, 0.4)",
                                        boxShadow: "0 0 15px rgba(15, 94, 255, 0.5)",
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <CheckIcon className="h-4 w-4 text-primary" />
                                    </motion.div>
                                </motion.div>
                                <motion.span
                                    whileHover={{ color: "#0f5eff" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {t}
                                </motion.span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            </section>

            <section className="bg-slate-100 py-16 relative overflow-hidden">
                {/* Animated background */}
                <motion.div
                    className="absolute top-0 left-0 h-64 w-64 bg-primary/10 rounded-full blur-3xl"
                    animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6 relative">
                    {[
                        { n: '10+', l: 'Years of Experience' },
                        { n: '500+', l: 'Healthcare Partners' },
                        { n: '100+', l: 'Products Catalogued' },
                    ].map((s, i) => (
                        <motion.div
                            key={s.l}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            whileHover={{ y: -12, scale: 1.05 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-xl transition relative group overflow-hidden"
                        >
                            {/* Animated border */}
                            <motion.div
                                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-indigo-500"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Gradient overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/5 opacity-0"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />

                            <motion.div
                                className="text-4xl font-extrabold text-slate-900 relative"
                                whileInView={{ scale: [1, 1.2, 1] }}
                                transition={{ delay: i * 0.15 + 0.3, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                {s.n}
                            </motion.div>
                            <motion.div
                                className="mt-2 text-slate-800 font-semibold relative"
                                whileHover={{ color: "#0f5eff" }}
                                transition={{ duration: 0.2 }}
                            >
                                {s.l}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}


