import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log(API_BASE_URL)
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getProducts = async (params = {}, signal) => {
    try {
        console.log('📡 API Request params:', params);
        
        const response = await api.get('/products', { params, signal });
        
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
        // ✅ FIXED: Don't throw CanceledError, just return empty
        if (axios.isCancel(error) || error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
            console.log('📡 Request was cancelled');
            return {
                data: [],
                pagination: { total: 0, page: 1, limit: 20, totalPages: 0 }
            };
        }
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