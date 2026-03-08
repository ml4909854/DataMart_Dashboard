import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/api';

export const useProducts = (initialFilters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState(initialFilters);

    const fetchProducts = useCallback(async (pageNum = 1, append = false) => {
        console.log('🔵 fetchProducts called with:', { pageNum, append, filters });
        
        setLoading(true);
        try {
            // Clean filters
            const cleanFilters = {};
            Object.keys(filters).forEach(key => {
                if (filters[key] && filters[key] !== '') {
                    cleanFilters[key] = filters[key];
                }
            });
            
            const params = {
                page: pageNum,
                limit: 20,
                ...cleanFilters
            };
            
            console.log('📤 Sending API request with params:', params);
            
            const response = await getProducts(params);
            console.log('📥 API Response:', response);
            
            if (response && response.data) {
                if (append) {
                    setProducts(prev => [...prev, ...response.data]);
                } else {
                    setProducts(response.data);
                }
                
                setTotal(response.pagination?.total || 0);
                setHasMore(pageNum < (response.pagination?.totalPages || 0));
            }
            
            setError(null);
        } catch (err) {
            console.error('❌ API Error:', err);
            setError(err.message || 'Failed to fetch products');
            setProducts([]);
            setTotal(0);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        console.log('🟢 Filters changed:', filters);
        fetchProducts(1, false);
    }, [filters, fetchProducts]);

    const loadMore = useCallback(() => {
        if (hasMore && !loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchProducts(nextPage, true);
        }
    }, [hasMore, loading, page, fetchProducts]);

    const updateFilters = useCallback((newFilters) => {
        console.log('🟡 Updating filters with:', newFilters);
        
        // Handle search with type
        if (newFilters.term !== undefined) {
            setFilters(prev => ({
                ...prev,
                search: newFilters.term,
                searchType: newFilters.type || 'all'
            }));
        } else {
            setFilters(prev => ({ ...prev, ...newFilters }));
        }
        
        setPage(1);
        setProducts([]);
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({});
        setPage(1);
        setProducts([]);
    }, []);

    return {
        products: products || [],
        loading,
        error,
        hasMore,
        total: total || 0,
        filters,
        loadMore,
        updateFilters,
        resetFilters
    };
};