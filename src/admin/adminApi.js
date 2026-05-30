import { API_BASE_URL } from "../api";

const BASE = `${API_BASE_URL}`;

export const api = {
  // Admin Auth
  login: (data) =>
    fetch(`${BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  getProfile: (token) =>
    fetch(`${BASE}/admin/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  updateProfile: (data, token) =>
    fetch(`${BASE}/admin/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  changePassword: (data, token) =>
    fetch(`${BASE}/admin/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  // Products
  getProducts: () =>
    fetch(`${BASE}/products`).then((r) => r.json()),

  getProduct: (id) =>
    fetch(`${BASE}/products/${id}`).then((r) => r.json()),

  addProduct: (data, token) =>
    fetch(`${BASE}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  updateProduct: (id, data, token) =>
    fetch(`${BASE}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteProduct: (id, token) =>
    fetch(`${BASE}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),
};