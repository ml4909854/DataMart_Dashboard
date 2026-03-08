import { useState, useEffect, useCallback, useRef } from 'react';
import { getProducts } from '../services/api';

export const useProducts = (initialFilters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState(initialFilters);
    
    const searchTimeout = useRef(null);
    const abortControllerRef = useRef(null);

    const fetchProducts = useCallback(async (pageNum = 1, append = false) => {
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        // Create new abort controller
        abortControllerRef.current = new AbortController();
        
        console.log('🔵 fetchProducts called with:', { pageNum, append, filters });
        
        setLoading(true);
        // ✅ Clear previous error on new request
        setError(null);
        
        try {
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
            
            const response = await getProducts(params, abortControllerRef.current.signal);
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
        } catch (err) {
            // ✅ FIXED: Properly handle canceled requests - don't show error
            if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED' || err.message === 'canceled') {
                console.log('🟡 Previous request cancelled - this is normal');
                // Don't set error state for cancelled requests
                return;
            }
            
            // ✅ Only show real errors
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
        
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
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
        
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        
        searchTimeout.current = setTimeout(() => {
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
        }, 500);
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