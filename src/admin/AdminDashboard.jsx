import { Link, useNavigate } from "react-router-dom";
import {
    Package,
    PlusCircle,
    User,
    LogOut,
    ShoppingBag,
    TrendingUp,
    Boxes,
    Activity,
    ArrowRight,
} from "lucide-react";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/admin/login");
    };

    const cards = [
        {
            title: "Manage Products",
            desc: "View, edit and manage all products",
            icon: Package,
            link: "/admin/products",
            bg: "bg-blue-500",
        },
        {
            title: "Add Product",
            desc: "Create and publish new products",
            icon: PlusCircle,
            link: "/admin/add-product",
            bg: "bg-green-500",
        },
        {
            title: "Profile",
            desc: "Manage admin profile settings",
            icon: User,
            link: "/admin/profile",
            bg: "bg-purple-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* TOPBAR */}
            <div className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Admin Dashboard
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Welcome back, manage your surgical inventory easily.
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl transition-all duration-300 shadow-md"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* STATS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Products</p>
                                <h2 className="text-3xl font-bold mt-2">120+</h2>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                                <ShoppingBag className="text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Trending Products</p>
                                <h2 className="text-3xl font-bold mt-2">24</h2>
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
                                <h2 className="text-3xl font-bold mt-2">10</h2>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                                <Boxes className="text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Active Status</p>
                                <h2 className="text-3xl font-bold mt-2">Online</h2>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                                <Activity className="text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ACTION CARDS */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Quick Actions
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {cards.map((card, index) => {
                            const Icon = card.icon;

                            return (
                                <Link
                                    key={index}
                                    to={card.link}
                                    className="group bg-white border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-2xl ${card.bg} flex items-center justify-center text-white mb-6`}
                                    >
                                        <Icon size={30} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {card.title}
                                    </h3>

                                    <p className="text-gray-500 mb-6">{card.desc}</p>

                                    <div className="flex items-center gap-2 text-black font-semibold group-hover:gap-4 transition-all duration-300">
                                        Open Section
                                        <ArrowRight size={18} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* RECENT SECTION */}
                <div className="mt-12 bg-white border rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-bold">Recent Activity</h2>

                        <span className="text-sm text-gray-500">
                            Latest admin updates
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-4">
                            <div>
                                <h4 className="font-semibold">New product added</h4>
                                <p className="text-sm text-gray-500">
                                    Surgical gloves added to inventory
                                </p>
                            </div>

                            <span className="text-sm text-gray-400">2 min ago</span>
                        </div>

                        <div className="flex items-center justify-between border-b pb-4">
                            <div>
                                <h4 className="font-semibold">Inventory updated</h4>
                                <p className="text-sm text-gray-500">
                                    Stock updated for PPE products
                                </p>
                            </div>

                            <span className="text-sm text-gray-400">1 hour ago</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold">Admin login successful</h4>
                                <p className="text-sm text-gray-500">
                                    Secure login completed
                                </p>
                            </div>

                            <span className="text-sm text-gray-400">Today</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}