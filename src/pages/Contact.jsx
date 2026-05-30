import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";

/* ---------------- ICONS ---------------- */
function IconPin(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    );
}

function IconPhone(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.06a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}

function IconMail(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            <path d="m22 6-10 7L2 6" />
        </svg>
    );
}

/* ---------------- PRODUCTS ---------------- */
const products = [
    { slug: "hospital-light", name: "Hospital Grade Surgical Light" },
    { slug: "operating-table", name: "Operating Table" },
    { slug: "patient-monitor", name: "Patient Monitor" },
    { slug: "instrument-set", name: "Surgical Instrument Sets" },
];

/* ---------------- PAGE ---------------- */
export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const productOptions = useMemo(() => products, []);

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

    return (
        <>
            <PageHero
                title="Contact Us"
                subtitle="Get quotes, order equipment, or request installation support anywhere in Nepal."
            />

            <section className="container mx-auto px-4 py-16 grid lg:grid-cols-3 gap-10">

                {/* LEFT INFO */}
                <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >

                    {[
                        {
                            icon: IconPin,
                            title: "Visit Us",
                            lines: [
                                "Tripureshwor-11, Sajan Goth Building",
                                "3rd Floor, Kathmandu, Nepal",
                            ],
                        },
                        {
                            icon: IconPhone,
                            title: "Call Us",
                            lines: ["+977-1-5313068"],
                        },
                        {
                            icon: IconMail,
                            title: "Email",
                            lines: ["info@aarnavsurgical.com"],
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -8 }}
                            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-xl transition relative group overflow-hidden"
                        >
                            {/* Gradient overlay on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/5 opacity-0"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />

                            <motion.div
                                className="h-11 w-11 rounded-lg bg-primary/10 text-primary grid place-items-center relative"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <item.icon className="h-5 w-5" />
                            </motion.div>

                            <h3 className="mt-4 font-bold text-slate-900 relative">
                                {item.title}
                            </h3>

                            {item.lines.map((l) => (
                                <p key={l} className="text-sm text-slate-500 relative">
                                    {l}
                                </p>
                            ))}

                            {/* Animated border */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-indigo-500"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* FORM */}
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="lg:col-span-2 bg-white border rounded-2xl p-8 shadow-sm space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                    }}
                >
                    <h3 className="text-2xl font-bold text-slate-900">
                        Order / Inquiry Form
                    </h3>

                    <p className="text-sm text-slate-500">
                        Fill the form and our team will contact you shortly.
                    </p>

                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 rounded-lg bg-green-50 text-green-700 border"
                        >
                            Thank you! We will contact you soon.
                        </motion.div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 gap-4">

                                <Input label="Full Name" />
                                <Input label="Phone" />
                                <Input label="Email" type="email" />

                                <div>
                                    <label className="text-sm font-semibold">
                                        Product
                                    </label>

                                    <select className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary outline-none">
                                        <option>Select Product</option>
                                        {productOptions.map((p) => (
                                            <option key={p.slug}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <textarea
                                rows={4}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Write your requirements..."
                            />

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                Send Message
                            </motion.button>
                        </>
                    )}
                </motion.form>
            </section>

            {/* MAP SECTION */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 text-center">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-slate-900"
                    >
                        Visit Our Office
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-slate-500 mt-2"
                    >
                        Tripureshwor, Kathmandu, Nepal
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-8 rounded-2xl overflow-hidden shadow-xl border"
                    >
                        <iframe
                            title="map"
                            className="w-full h-[400px]"
                            loading="lazy"
                            src="https://www.google.com/maps?q=Tripureshwor%20Kathmandu&output=embed"
                        />
                    </motion.div>
                </div>
            </section>
        </>
    );
}

/* ---------------- INPUT ---------------- */
function Input({ label, type = "text" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <label className="text-sm font-semibold">{label}</label>
            <motion.input
                type={type}
                className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary outline-none transition"
                whileFocus={{
                    boxShadow: "0 0 20px rgba(15, 94, 255, 0.3)",
                    scale: 1.02,
                }}
                whileHover={{
                    borderColor: "#0f5eff",
                }}
                transition={{ duration: 0.2 }}
            />
        </motion.div>
    );
}