import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    User,
    Mail,
    Lock,
    ShieldCheck,
    Eye,
    EyeOff,
    Save,
    KeyRound,
    CheckCircle2,
    AlertCircle,
    ArrowLeft,
} from "lucide-react";

import { api } from "./adminApi";

export default function AdminProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // PASSWORD STATES
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [passwordLoading, setPasswordLoading] = useState(false);

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);

            const result = await api.getProfile(token);

            if (result.error) {
                setError(result.error);
            } else {
                setName(result.name || "");
                setEmail(result.email || "");
            }
        } catch (err) {
            setError("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            setProfileLoading(true);

            const result = await api.updateProfile(
                { name },
                token
            );

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess("Profile updated successfully!");

                setTimeout(() => {
                    setSuccess("");
                }, 3000);
            }
        } catch (err) {
            setError("Failed to update profile");
        } finally {
            setProfileLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setPasswordLoading(true);

            const result = await api.changePassword(
                {
                    currentPassword,
                    newPassword,
                },
                token
            );

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess("Password changed successfully!");

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

                setTimeout(() => {
                    setSuccess("");
                }, 3000);
            }
        } catch (err) {
            setError("Failed to change password");
        } finally {
            setPasswordLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="mb-10">
                    <Link
                        to="/admin"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft size={16} />
                        Back to dashboard
                    </Link>

                    <h1 className="text-4xl font-bold text-gray-900">
                        Profile Settings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your admin account information and security.
                    </p>
                </div>

                {/* ALERTS */}
                {error && (
                    <div className="mb-6 flex items-center gap-3 bg-red-100 border border-red-300 text-red-700 px-5 py-4 rounded-2xl">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 flex items-center gap-3 bg-green-100 border border-green-300 text-green-700 px-5 py-4 rounded-2xl">
                        <CheckCircle2 size={20} />
                        {success}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* PROFILE CARD */}
                    <div className="bg-white rounded-3xl shadow-sm border p-8 h-fit">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-4xl font-bold mb-5">
                                {name?.charAt(0)?.toUpperCase() || "A"}
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">
                                {name}
                            </h2>

                            <p className="text-gray-500 mt-1">{email}</p>

                            <div className="mt-6 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                                <ShieldCheck size={16} />
                                Admin Access
                            </div>
                        </div>

                        <div className="mt-8 border-t pt-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Role</span>

                                <span className="font-semibold">Administrator</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Account Status</span>

                                <span className="text-green-600 font-semibold">
                                    Active
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Security</span>

                                <span className="text-blue-600 font-semibold">
                                    Protected
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* FORMS */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* UPDATE PROFILE */}
                        <div className="bg-white rounded-3xl shadow-sm border p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <User className="text-black" size={28} />

                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Personal Information
                                    </h2>

                                    <p className="text-gray-500 text-sm">
                                        Update your account profile details.
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={handleUpdateProfile}
                                className="space-y-6"
                            >
                                {/* NAME */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>

                                    <div className="relative">
                                        <User
                                            size={20}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={20}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="email"
                                            value={email}
                                            disabled
                                            className="w-full border border-gray-200 bg-gray-100 rounded-2xl pl-12 pr-4 py-4 text-gray-500"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={profileLoading}
                                    className="flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-2xl font-semibold transition disabled:bg-gray-400"
                                >
                                    <Save size={20} />

                                    {profileLoading
                                        ? "Updating..."
                                        : "Update Profile"}
                                </button>
                            </form>
                        </div>

                        {/* PASSWORD */}
                        <div className="bg-white rounded-3xl shadow-sm border p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <KeyRound className="text-red-600" size={28} />

                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Change Password
                                    </h2>

                                    <p className="text-gray-500 text-sm">
                                        Keep your account secure with a strong password.
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={handleChangePassword}
                                className="space-y-6"
                            >
                                {/* CURRENT PASSWORD */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Current Password
                                    </label>

                                    <div className="relative">
                                        <Lock
                                            size={20}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type={showCurrent ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-2xl pl-12 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Current password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowCurrent(!showCurrent)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            {showCurrent ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* NEW PASSWORD */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        New Password
                                    </label>

                                    <div className="relative">
                                        <Lock
                                            size={20}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type={showNew ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-2xl pl-12 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="New password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowNew(!showNew)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            {showNew ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* CONFIRM PASSWORD */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Confirm Password
                                    </label>

                                    <div className="relative">
                                        <Lock
                                            size={20}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-2xl pl-12 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Confirm new password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirm(!showConfirm)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            {showConfirm ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={passwordLoading}
                                    className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-2xl font-semibold transition disabled:bg-gray-400"
                                >
                                    <ShieldCheck size={20} />

                                    {passwordLoading
                                        ? "Changing Password..."
                                        : "Change Password"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}