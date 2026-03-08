import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, loading, hasMore, loadMore }) => {
    if (loading && products.length === 0) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading amazing products for you...</p>
            </div>
        );
    }

    if (products.length === 0 && !loading) {
        return (
            <div className="empty-state">
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="product-list">
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            {hasMore && (
                <div className="load-more-container">
                    <button 
                        className="load-more-btn"
                        onClick={loadMore}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Load More Products'}
                    </button>
                </div>
            )}
            
            {!hasMore && products.length > 0 && (
                <div className="end-message">
                    <p>✨ You've explored all our products!</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;