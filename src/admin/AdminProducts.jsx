import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Package,
    Star,
    TrendingUp,
    Boxes,
    Filter,
    RefreshCcw,
    Eye,
    ArrowLeft,
} from "lucide-react";

import { api } from "./adminApi";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const token = sessionStorage.getItem("token");

    // LOAD PRODUCTS
    const loadProducts = async () => {
        try {
            setLoading(true);

            const data = await api.getProducts();

            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
                setFilteredProducts(data);
                setError("");
            }
        } catch (err) {
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // FILTER PRODUCTS
    useEffect(() => {
        let result = [...products];

        // SEARCH
        if (search) {
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(search.toLowerCase()) ||
                    p.brand?.toLowerCase().includes(search.toLowerCase()) ||
                    p.category?.toLowerCase().includes(search.toLowerCase())
            );
        }

        // CATEGORY
        if (category !== "All") {
            result = result.filter((p) => p.category === category);
        }

        setFilteredProducts(result);
    }, [search, category, products]);

    // UNIQUE CATEGORIES
    const categories = useMemo(() => {
        const unique = [...new Set(products.map((p) => p.category))];
        return ["All", ...unique];
    }, [products]);

    // DELETE PRODUCT
    const handleDelete = async (id, name) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${name}"?`
        );

        if (!confirmDelete) return;

        try {
            const result = await api.deleteProduct(id, token);

            if (result.error) {
                setError(result.error);
            } else {
                loadProducts();
            }
        } catch (err) {
            setError("Failed to delete product");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
                    <div>
                        <Link
                            to="/admin"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-4"
                        >
                            <ArrowLeft size={16} />
                            Back to dashboard
                        </Link>

                        <h1 className="text-4xl font-bold text-gray-900">
                            Product Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage and organize all products easily.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={loadProducts}
                            className="flex items-center gap-2 bg-white border px-5 py-3 rounded-2xl hover:bg-gray-50 transition"
                        >
                            <RefreshCcw size={18} />
                            Refresh
                        </button>

                        <Link
                            to="/admin/add-product"
                            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-2xl transition"
                        >
                            <Plus size={20} />
                            Add Product
                        </Link>
                    </div>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl">
                        {error}
                    </div>
                )}

                {/* STATS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Products</p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {products.length}
                                </h2>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                                <Package className="text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Featured</p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {products.filter((p) => p.featured).length}
                                </h2>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                                <Star className="text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Trending</p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {products.filter((p) => p.trending).length}
                                </h2>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                                <TrendingUp className="text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Categories</p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {categories.length - 1}
                                </h2>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                                <Boxes className="text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FILTER BAR */}
                <div className="bg-white rounded-3xl border shadow-sm p-5 mb-8">
                    <div className="grid lg:grid-cols-3 gap-4">
                        {/* SEARCH */}
                        <div className="relative">
                            <Search
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        {/* CATEGORY FILTER */}
                        <div className="relative">
                            <Filter
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black appearance-none"
                            >
                                {categories.map((cat, index) => (
                                    <option key={index}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* LOADING */}
                {loading ? (
                    <div className="bg-white rounded-3xl p-20 text-center shadow-sm border">
                        <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

                        <p className="text-gray-500 text-lg">
                            Loading products...
                        </p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    /* EMPTY */
                    <div className="bg-white rounded-3xl p-20 text-center shadow-sm border">
                        <Package
                            size={60}
                            className="mx-auto text-gray-300 mb-5"
                        />

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            No Products Found
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Start adding products to manage inventory.
                        </p>

                        <Link
                            to="/admin/add-product"
                            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition"
                        >
                            <Plus size={18} />
                            Add Product
                        </Link>
                    </div>
                ) : (
                    /* PRODUCT TABLE */
                    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-full sm:min-w-[900px]">
                                <thead className="bg-gray-100 border-b">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Product
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Brand
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Price
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Stock
                                        </th>

                                        <th className="px-6 py-4 text-center text-sm font-semibold">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right text-sm font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredProducts.map((p) => (
                                        <tr
                                            key={p._id}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            {/* PRODUCT */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border bg-gray-100">
                                                        {p.image ? (
                                                            <img
                                                                src={p.image}
                                                                alt={p.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                <Package size={24} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {p.name}
                                                        </h3>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            SKU: {p.sku || "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* CATEGORY */}
                                            <td className="px-6 py-5">
                                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {p.category}
                                                </span>
                                            </td>

                                            {/* BRAND */}
                                            <td className="px-6 py-5 text-gray-700">
                                                {p.brand || "-"}
                                            </td>

                                            {/* PRICE */}
                                            <td className="px-6 py-5 font-bold text-gray-900">
                                                ₹{p.price}
                                            </td>

                                            {/* STOCK */}
                                            <td className="px-6 py-5">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${p.stock > 0
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {p.stock} Units
                                                </span>
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center gap-2 flex-wrap">
                                                    {p.featured && (
                                                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                            Featured
                                                        </span>
                                                    )}

                                                    {p.trending && (
                                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                            Trending
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        to={`/products/${p.slug || p._id}`}
                                                        target="_blank"
                                                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition"
                                                    >
                                                        <Eye size={16} />
                                                        View
                                                    </Link>

                                                    <Link
                                                        to={`/admin/products/${p._id}`}
                                                        className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl transition"
                                                    >
                                                        <Pencil size={16} />
                                                        Edit
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(p._id, p.name)
                                                        }
                                                        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-xl transition"
                                                    >
                                                        <Trash2 size={16} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}