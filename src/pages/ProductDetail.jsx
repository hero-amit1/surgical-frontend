import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import { API_BASE_URL } from "../api";

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) return;

        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const slugResponse = await fetch(`${API_BASE_URL}/api/products/slug/${slug}`);
                let data = await slugResponse.json();

                if (!slugResponse.ok) {
                    const idResponse = await fetch(`${API_BASE_URL}/api/products/${slug}`);
                    data = await idResponse.json();
                    if (!idResponse.ok) {
                        throw new Error(data.error || "Product not found");
                    }
                }

                setProduct(data);
            } catch (err) {
                setError(err.message || "Unable to load product");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [slug]);

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
                    <h2 className="text-2xl font-semibold mb-3">{error}</h2>
                    <Link to="/products" className="text-blue-600 font-semibold hover:underline">
                        Back to products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageHero
                title={product.name}
                subtitle={product.brand ? `${product.brand} • ${product.category}` : product.category}
            />

            <section className="container mx-auto px-4 py-12">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white border rounded-3xl overflow-hidden shadow-sm"
                    >
                        <img src={product.image} alt={product.name} className="w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[520px] object-cover" />
                        <div className="p-8">
                            <div className="flex flex-wrap gap-3 mb-5">
                                <span className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] bg-slate-100 rounded-full">
                                    {product.category}
                                </span>
                                {product.brand && (
                                    <span className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] bg-slate-100 rounded-full">
                                        {product.brand}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Price</p>
                                    <p className="text-3xl font-semibold text-slate-900 mt-2">Rs {product.price.toLocaleString()}</p>
                                </div>

                                <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Availability</p>
                                    <p className={`mt-2 text-lg font-semibold ${product.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <div className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm">
                            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                            <dl className="space-y-4 text-sm text-slate-700">
                                {product.sku && (
                                    <div>
                                        <dt className="font-medium text-slate-500">SKU</dt>
                                        <dd className="mt-1">{product.sku}</dd>
                                    </div>
                                )}
                                {product.slug && (
                                    <div>
                                        <dt className="font-medium text-slate-500">Slug</dt>
                                        <dd className="mt-1">{product.slug}</dd>
                                    </div>
                                )}
                                {product.stock != null && (
                                    <div>
                                        <dt className="font-medium text-slate-500">Stock</dt>
                                        <dd className="mt-1">{product.stock}</dd>
                                    </div>
                                )}
                                {product.featured != null && (
                                    <div>
                                        <dt className="font-medium text-slate-500">Featured</dt>
                                        <dd className="mt-1">{product.featured ? 'Yes' : 'No'}</dd>
                                    </div>
                                )}
                                {product.trending != null && (
                                    <div>
                                        <dt className="font-medium text-slate-500">Trending</dt>
                                        <dd className="mt-1">{product.trending ? 'Yes' : 'No'}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {product.specifications?.length > 0 && (
                            <div className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm">
                                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-700">
                                    {product.specifications.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm">
                            <Link to="/products" className="inline-flex items-center justify-center w-full rounded-2xl bg-slate-900 px-6 py-3 text-white hover:bg-slate-800 transition">
                                Back to all products
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
