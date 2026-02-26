import axios from 'axios';

const resolvedBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api';

const api = axios.create({
    baseURL: resolvedBaseUrl,
    timeout: 15000
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('codebazaar_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('codebazaar_token');
            localStorage.removeItem('codebazaar_user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
