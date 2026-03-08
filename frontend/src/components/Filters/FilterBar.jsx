import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';
import './FilterBar.css';

const FilterBar = ({ onFilterChange, initialFilters = {} }) => {
    const [filters, setFilters] = useState({
        category: initialFilters.category || '',
        minPrice: initialFilters.minPrice || '',
        maxPrice: initialFilters.maxPrice || '',
        sortBy: initialFilters.sortBy || 'created_at',
        sortOrder: initialFilters.sortOrder || 'desc'
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await getCategories();
                setCategories(response.data || []);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApply = () => {
        onFilterChange(filters);
    };

    const handleReset = () => {
        const resetFilters = {
            category: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'created_at',
            sortOrder: 'desc'
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="filter-bar">
            <div className="filter-grid">
                <div className="filter-item">
                    <label>Category</label>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-item">
                    <label>Min Price ($)</label>
                    <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                    />
                </div>

                <div className="filter-item">
                    <label>Max Price ($)</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        placeholder="1000"
                        min="0"
                    />
                </div>

                <div className="filter-item">
                    <label>Sort By</label>
                    <select
                        name="sortBy"
                        value={filters.sortBy}
                        onChange={handleChange}
                    >
                        <option value="created_at">Newest First</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                        <option value="name">Name</option>
                    </select>
                </div>

                <div className="filter-item">
                    <label>Sort Order</label>
                    <select
                        name="sortOrder"
                        value={filters.sortOrder}
                        onChange={handleChange}
                    >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>

            <div className="filter-actions">
                <button className="apply-btn" onClick={handleApply}>
                    Apply Filters
                </button>
                <button className="reset-btn" onClick={handleReset}>
                    Reset All
                </button>
            </div>
        </div>
    );
};

export default FilterBar;