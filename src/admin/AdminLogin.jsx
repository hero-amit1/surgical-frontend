import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
} from "lucide-react";

import { api } from "./adminApi";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        sessionStorage.removeItem("token");
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const res = await api.login({ email, password });

            if (res.token) {
                sessionStorage.setItem("token", res.token);
                navigate("/admin");
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-[35px] overflow-hidden shadow-2xl">
                {/* LEFT SIDE */}
                <div className="hidden lg:flex flex-col justify-center bg-black text-white p-14 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute w-72 h-72 bg-white rounded-full -top-20 -left-20"></div>
                        <div className="absolute w-72 h-72 bg-white rounded-full bottom-0 right-0"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-sm">
                            <ShieldCheck size={40} />
                        </div>

                        <h1 className="text-5xl font-bold leading-tight mb-6">
                            Surgical Admin Panel
                        </h1>

                        <p className="text-gray-300 text-lg leading-relaxed">
                            Securely manage products, inventory, categories and dashboard
                            operations from one modern admin system.
                        </p>

                        <div className="mt-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <p>Secure Authentication</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                <p>Product Management System</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                                <p>Inventory Control Dashboard</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="p-8 md:p-14 flex flex-col justify-center">
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">
                            Welcome Back
                        </h2>

                        <p className="text-gray-500">
                            Login to access the admin dashboard
                        </p>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Email Address
                            </label>

                            <div className="relative mt-2">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />

                                <input
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-black transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Password
                            </label>

                            <div className="relative mt-2">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-2xl pl-12 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-black transition"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 disabled:bg-gray-400"
                        >
                            {loading ? (
                                "Signing In..."
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Login to Dashboard
                                </>
                            )}
                        </button>
                    </form>

                    {/* FOOTER */}
                    <div className="mt-10 text-center text-sm text-gray-400">
                        © 2026 Surgical Admin System. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}