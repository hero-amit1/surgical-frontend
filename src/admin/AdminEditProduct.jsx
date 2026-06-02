import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Package,
    DollarSign,
    Image as ImageIcon,
    FileText,
    Boxes,
    Tag,
    Warehouse,
    Star,
    TrendingUp,
    ClipboardList,
    ArrowLeft,
} from "lucide-react";

import { api } from "./adminApi";
import { categoryOptions, getCategoryMeta } from "./productMeta";

export default function AdminEditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        category: "",
        subcategory: "",
        brand: "",
        imageFile: null,
        image: "",
        stock: "",
        sku: "",
        featured: false,
        trending: false,
        specifications: "",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const categoryMeta = getCategoryMeta(form.category);
    const brandOptions = categoryMeta.brands;
    const subcategoryOptions = categoryMeta.subcategories;

    const token = sessionStorage.getItem("token");

    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "category") {
            setForm({
                ...form,
                category: value,
                brand: "",
                subcategory: "",
            });
            return;
        }

        setForm({
            ...form,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "price" || name === "stock"
                        ? Number(value)
                        : value,
        });
    };

    const handleNameChange = (e) => {
        const name = e.target.value;

        setForm({
            ...form,
            name,
            slug: generateSlug(name),
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setForm({
            ...form,
            imageFile: file,
            // keep current image preview until upload happens; still clear URL
            image: "",
        });
    };

    const loadProduct = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await api.getProduct(id);
            if (data.error) {
                setError(data.error);
            } else {
                setForm((prev) => ({
                    ...prev,
                    name: data.name || "",
                    slug: data.slug || "",
                    description: data.description || "",
                    price: data.price ?? "",
                    category: data.category || "",
                    subcategory: data.subcategory || "",
                    brand: data.brand || "",
                    image: data.image || "",
                    stock: data.stock ?? "",
                    sku: data.sku || "",
                    featured: Boolean(data.featured),
                    trending: Boolean(data.trending),
                    specifications: Array.isArray(data.specifications)
                        ? data.specifications.join("\n")
                        : data.specifications
                            ? String(data.specifications)
                            : "",
                }));
            }
        } catch (err) {
            setError("Failed to load product");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setError("");

        try {
            const requiredOk =
                form.name &&
                form.slug &&
                form.description &&
                form.price !== "" &&
                form.category &&
                (subcategoryOptions.length === 0 || form.subcategory) &&
                (form.imageFile || form.image);

            if (!requiredOk) {
                setError(
                    "Please fill all required fields and ensure product image is set"
                );
                return;
            }

            let imageUrl = form.image;

            // if user selected a new image, upload it
            if (form.imageFile) {
                const uploadRes = await api.uploadImage(form.imageFile);
                if (uploadRes?.error || !uploadRes?.url) {
                    setError(uploadRes?.error || "Failed to upload image");
                    return;
                }
                imageUrl = uploadRes.url;
            }

            const productData = {
                name: form.name,
                slug: form.slug,
                description: form.description,
                price: form.price,
                category: form.category,
                subcategory: form.subcategory,
                brand: form.brand,
                image: imageUrl,
                stock: form.stock,
                sku: form.sku,
                featured: form.featured,
                trending: form.trending,
                specifications: form.specifications
                    ? form.specifications.split("\n").filter(Boolean)
                    : [],
            };

            const result = await api.updateProduct(id, productData, token);

            if (result.error) {
                setError(result.error);
                return;
            }

            navigate("/admin/products");
        } catch (err) {
            setError("Failed to update product");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link
                        to="/admin/products"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft size={16} />
                        Back to products
                    </Link>

                    <h1 className="text-4xl font-bold text-gray-900">Edit Product</h1>
                    <p className="text-gray-500 mt-2">
                        Update product details and inventory.
                    </p>
                </div>

                {loading ? (
                    <div className="bg-white rounded-3xl p-20 text-center shadow-sm border">
                        <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>
                        <p className="text-gray-500 text-lg">Loading product...</p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-6">
                                {error}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* LEFT SIDE */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* BASIC INFO */}
                                    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Package className="w-6 h-6 text-black" />
                                            <h2 className="text-2xl font-semibold">Product Information</h2>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700">
                                                    Product Name *
                                                </label>

                                                <div className="relative mt-2">
                                                    <Package
                                                        className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={form.name}
                                                        onChange={handleNameChange}
                                                        placeholder="Enter product name"
                                                        className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-700">
                                                    Slug *
                                                </label>

                                                <div className="relative mt-2">
                                                    <Tag className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        name="slug"
                                                        value={form.slug}
                                                        onChange={handleChange}
                                                        placeholder="Product slug"
                                                        className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <label className="text-sm font-medium text-gray-700">
                                                Description *
                                            </label>

                                            <div className="relative mt-2">
                                                <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                                <textarea
                                                    name="description"
                                                    value={form.description}
                                                    onChange={handleChange}
                                                    rows="5"
                                                    placeholder="Write detailed product description..."
                                                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* CATEGORY + BRAND */}
                                    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Boxes className="w-6 h-6 text-black" />
                                            <h2 className="text-2xl font-semibold">Category & Brand</h2>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700">
                                                    Category *
                                                </label>

                                                <select
                                                    name="category"
                                                    value={form.category}
                                                    onChange={handleChange}
                                                    className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                                    required
                                                >
                                                    <option value="">Select Category</option>
                                                    {categoryOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-700">
                                                    Brand
                                                </label>

                                                {brandOptions.length > 0 ? (
                                                    <select
                                                        name="brand"
                                                        value={form.brand}
                                                        onChange={handleChange}
                                                        className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                                    >
                                                        <option value="">Select Brand</option>
                                                        {brandOptions.map((brand) => (
                                                            <option key={brand} value={brand}>
                                                                {brand}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        name="brand"
                                                        value={form.brand}
                                                        onChange={handleChange}
                                                        placeholder="Enter brand"
                                                        className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                                    />
                                                )}
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-700">
                                                    Subcategory
                                                </label>

                                                {subcategoryOptions.length > 0 ? (
                                                    <select
                                                        name="subcategory"
                                                        value={form.subcategory}
                                                        onChange={handleChange}
                                                        className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                                        required
                                                    >
                                                        <option value="">Select Subcategory</option>
                                                        {subcategoryOptions.map((subcategory) => (
                                                            <option key={subcategory} value={subcategory}>
                                                                {subcategory}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        name="subcategory"
                                                        value={form.subcategory}
                                                        onChange={handleChange}
                                                        placeholder="Enter subcategory"
                                                        className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* PRICING */}
                                    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-6">
                                            <DollarSign className="w-6 h-6 text-black" />
                                            <h2 className="text-2xl font-semibold">Pricing & Inventory</h2>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-5">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700">
                                                    Price *
                                                </label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={form.price}
                                                    onChange={handleChange}
                                                    placeholder="0.00"
                                                    className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-700">
                                                    Stock
                                                </label>
                                                <input
                                                    type="number"
                                                    name="stock"
                                                    value={form.stock}
                                                    onChange={handleChange}
                                                    placeholder="Available stock"
                                                    className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-700">
                                                    SKU
                                                </label>
                                                <input
                                                    type="text"
                                                    name="sku"
                                                    value={form.sku}
                                                    onChange={handleChange}
                                                    placeholder="SKU code"
                                                    className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* SPECIFICATIONS */}
                                    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-6">
                                            <ClipboardList className="w-6 h-6 text-black" />
                                            <h2 className="text-2xl font-semibold">Specifications</h2>
                                        </div>

                                        <textarea
                                            name="specifications"
                                            value={form.specifications}
                                            onChange={handleChange}
                                            rows="6"
                                            placeholder={`High precision\nAuto calibration\nDigital display`}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                </div>

                                {/* RIGHT SIDE */}
                                <div className="space-y-6">
                                    {/* IMAGE */}
                                    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-6">
                                            <ImageIcon className="w-6 h-6 text-black" />
                                            <h2 className="text-2xl font-semibold">Product Image</h2>
                                        </div>

                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800"
                                        />

                                        {form.image && (
                                            <div className="mt-5 overflow-hidden rounded-2xl border">
                                                <img
                                                    src={form.image}
                                                    alt="Preview"
                                                    className="w-full h-64 object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* OPTIONS */}
                                    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Warehouse className="w-6 h-6 text-black" />
                                            <h2 className="text-2xl font-semibold">Options</h2>
                                        </div>

                                        <div className="space-y-5">
                                            <label className="flex items-center justify-between bg-gray-50 border rounded-2xl p-4 cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <Star className="w-5 h-5 text-yellow-500" />
                                                    <span className="font-medium">Featured Product</span>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="featured"
                                                    checked={form.featured}
                                                    onChange={handleChange}
                                                    className="w-5 h-5"
                                                />
                                            </label>

                                            <label className="flex items-center justify-between bg-gray-50 border rounded-2xl p-4 cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                                    <span className="font-medium">Trending Product</span>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="trending"
                                                    checked={form.trending}
                                                    onChange={handleChange}
                                                    className="w-5 h-5"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {/* BUTTON */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 disabled:bg-gray-400"
                                    >
                                        {submitting ? "Saving Changes..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

