import axios from "axios";

export const API_BASE_URL =
    (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

// Create axios instance
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

/* ---------------- AUTH API ---------------- */
export const api = {
    login: async (data) => {
        const res = await apiClient.post("/admin/login", data);
        return res.data;
    },

    register: async (data) => {
        const res = await apiClient.post("/api/admin/register", data);
        return res.data;
    },

    getProfile: async (token) => {
        const res = await apiClient.get("/api/admin/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    },

    updateProfile: async (token, data) => {
        const res = await apiClient.put("/api/admin/profile", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    },

    changePassword: async (token, data) => {
        const res = await apiClient.post("/api/admin/change-password", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    }
};