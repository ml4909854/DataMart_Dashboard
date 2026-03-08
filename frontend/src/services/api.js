import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getProducts = async (params = {}) => {
    try {
        console.log('📡 API Request params:', params);
        
        const response = await api.get('/products', { params });
        
        return {
            data: response.data.data || [],
            pagination: response.data.pagination || {
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0
            }
        };
    } catch (error) {
        console.error('❌ API Error:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await api.get('/products/categories');
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getBrands = async () => {
    try {
        const response = await api.get('/products/brands');
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default api;