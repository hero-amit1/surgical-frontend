import { motion } from "framer-motion";

type PageHeroProps = {
    title: string;
    subtitle?: string;
};

export default function PageHero({ title, subtitle }: PageHeroProps) {
    return (
        <section className="relative bg-slate-950 text-white py-24 overflow-hidden">

            {/* background blobs */}
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-pulse" />
            <div
                className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            />

            <div className="container mx-auto px-4 text-center relative">

                {/* TITLE */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight"
                >
                    {title}
                </motion.h1>

                {/* SUBTITLE */}
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-5 text-white/80 max-w-2xl mx-auto text-lg"
                    >
                        {subtitle}
                    </motion.p>
                )}

            </div>
        </section>
    );
}