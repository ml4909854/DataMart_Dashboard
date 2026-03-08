import React, { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import ProductList from "../components/ProductList/ProductList";
import SearchBar from "../components/Filters/SearchBar";
import FilterBar from "../components/Filters/FilterBar";
import { useProducts } from "../hooks/useProducts";
import "./Dashboard.css";

const Dashboard = () => {
  const {
    products = [], // ✅ Default value
    loading = false,
    error = null,
    hasMore = false,
    total = 0, // ✅ Default value
    loadMore,
    updateFilters,
    filters = {},
  } = useProducts();

  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "created_at",
    sortOrder: "desc",
  });

  // ✅ Safe calculation with checks
  const avgPrice =
    products && products.length > 0
      ? (
          products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length
        ).toFixed(2)
      : "0.00";

  const avgRating =
    products && products.length > 0
      ? (
          products.reduce((sum, p) => sum + (p.rating || 0), 0) /
          products.length
        ).toFixed(1)
      : "0.0";

  // Search handler
  // In Dashboard.jsx, update handleSearch function:

  // Search handler
const handleSearch = (searchData) => {
    console.log('🔍 Search data received:', searchData);
    
    if (searchData.term === '') {
        // Clear search
        updateFilters({ search: '', searchType: 'all' });
    } else {
        // Apply search with type
        updateFilters({ 
            term: searchData.term,
            type: searchData.type 
        });
    }
};

  // Filter handler
  const handleFilterChange = (newFilters) => {
    console.log("Applying filters:", newFilters);
    updateFilters(newFilters);
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    const resetValues = {
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "created_at",
      sortOrder: "desc",
    };
    setLocalFilters(resetValues);
    updateFilters(resetValues);
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.search) count++;
    if (filters?.category) count++;
    if (filters?.minPrice) count++;
    if (filters?.maxPrice) count++;
    if (filters?.sortBy && filters.sortBy !== "created_at") count++;
    if (filters?.sortOrder && filters.sortOrder !== "desc") count++;
    return count;
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>❌ Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>
              <span className="gradient-text">DataMart Dashboard</span>
            </h1>
            <p className="header-subtitle">
              Discover amazing products at best prices
            </p>
          </div>
          <div className="header-right">
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">📦</span>
                <div className="stat-info">
                  <span className="stat-value">
                    {total?.toLocaleString() || 0}+
                  </span>
                  <span className="stat-label">Total Products</span>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">💰</span>
                <div className="stat-info">
                  <span className="stat-value">${avgPrice}</span>
                  <span className="stat-label">Avg. Price</span>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⭐</span>
                <div className="stat-info">
                  <span className="stat-value">{avgRating}</span>
                  <span className="stat-label">Avg. Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="controls-section">
          {/* Search Bar Component */}
          <SearchBar onSearch={handleSearch} />

          {/* Filter Toggle Button */}
          <button
            className={`filter-toggle-btn ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="filter-badge">{getActiveFilterCount()}</span>
            )}
            {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {/* Filter Bar Component */}
          {showFilters && (
            <FilterBar
              onFilterChange={handleFilterChange}
              initialFilters={localFilters}
            />
          )}
        </div>

        {/* Active Filters Tags */}
        {filters && Object.keys(filters).length > 0 && (
          <div className="active-filters">
            {filters.search && (
              <div className="filter-tag">
                <span>🔍 "{filters.search}"</span>
                <button onClick={() => updateFilters({ search: "" })}>
                  <X size={14} />
                </button>
              </div>
            )}
            {filters.category && (
              <div className="filter-tag">
                <span>📁 {filters.category}</span>
                <button onClick={() => updateFilters({ category: "" })}>
                  <X size={14} />
                </button>
              </div>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <div className="filter-tag">
                <span>
                  💰 ${filters.minPrice || "0"} - ${filters.maxPrice || "∞"}
                </span>
                <button
                  onClick={() => updateFilters({ minPrice: "", maxPrice: "" })}
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Product List */}
        <ProductList
          products={products || []}
          loading={loading}
          hasMore={hasMore}
          loadMore={loadMore}
        />
      </main>
    </div>
  );
};

export default Dashboard;
