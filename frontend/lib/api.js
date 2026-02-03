import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach Firebase token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('firebase-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Product API calls
export const productAPI = {
    getAll: () => api.get('/products'),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
};

// Auth API calls
export const authAPI = {
    verifyToken: (idToken) => api.post('/auth/verify-token', { idToken }),
    getMe: () => api.get('/auth/me'),
};

// Order API calls
export const orderAPI = {
    create: (data) => api.post('/orders', data),
    getById: (id) => api.get(`/orders/${id}`),
    getMyOrders: () => api.get('/orders/myorders'),
};

export default api;

