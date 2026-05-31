import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function AdminAddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    imageFile: null,
    image: "",
    stock: "",
    sku: "",
    featured: false,
    trending: false,
    specifications: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      image: "",
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (
        !form.name ||
        !form.slug ||
        !form.description ||
        !form.price ||
        !form.category ||
        !form.imageFile
      ) {
        setError("Please fill all required fields and upload an image");
        setLoading(false);
        return;
      }

      // 1) Upload image to Cloudinary via backend
      const uploadRes = await api.uploadImage(form.imageFile);
      if (uploadRes?.error || !uploadRes?.url) {
        setError(uploadRes?.error || "Failed to upload image");
        setLoading(false);
        return;
      }

      // 2) Save product with Cloudinary URL
      const productData = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        price: form.price,
        category: form.category,
        brand: form.brand,
        image: uploadRes.url,
        stock: form.stock,
        sku: form.sku,
        featured: form.featured,
        trending: form.trending,
        specifications: form.specifications
          ? form.specifications.split("\n")
          : [],
      };

      const result = await api.addProduct(productData, token);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      navigate("/admin/products");
    } catch (err) {
      setError("Failed to add product");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <h1 className="text-4xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-500 mt-2">
            Create and manage your surgical products easily.
          </p>
        </div>

        {/* ERROR */}
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
                      <Package className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
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
                      <option value="Medical Equipments">Medical Equipments</option>
                      <option value="Laboratory Equipments">Laboratory Equipments</option>
                      <option value="Surgical">Surgical</option>
                      <option value="Orthopedic Products">Orthopedic Products</option>
                      <option value="PPE">PPE</option>
                      <option value="Gloves">Gloves</option>
                      <option value="Sanitizers">Sanitizers</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Brand
                    </label>

                    <select
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select Brand</option>
                      <option value="Remi">Remi</option>
                      <option value="Qualigens">Qualigens</option>
                      <option value="Himedia">Himedia</option>
                      <option value="Diatron">Diatron</option>
                      <option value="Analyticon">Analyticon</option>
                      <option value="Kapitol">Kapitol</option>
                      <option value="Sinocare">Sinocare</option>
                      <option value="Sartorius">Sartorius</option>
                      <option value="Agappe">Agappe</option>
                      <option value="Radiant">Radiant</option>
                    </select>
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
                  required
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
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 disabled:bg-gray-400"
              >
                {loading ? "Saving Product..." : "Save Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

