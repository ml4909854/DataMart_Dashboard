import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Package, Star, ChevronRight, TrendingUp } from 'lucide-react';
import './ProductCard.css';

const ProductCard = React.memo(({ product }) => {
    const navigate = useNavigate();

    // Debug - check product structure
    console.log('🟢 ProductCard received:', product);

    // Get category name safely
    const getCategoryName = () => {
        if (!product) return 'Uncategorized';
        
        // ✅ Direct category property (from our transformed data)
        if (product.category) {
            return product.category;
        }
        
        // Categories object
        if (product.categories?.name) {
            return product.categories.name;
        }
        
        return 'Uncategorized';
    };

    // Generate random badge for demo
    const getBadge = () => {
        const badges = ['Best Seller', 'New Arrival', 'Limited Offer', 'Top Rated'];
        return badges[Math.floor(Math.random() * badges.length)];
    };

    // Generate random stock status
    const getStockStatus = () => {
        const inStock = Math.random() > 0.3;
        return {
            text: inStock ? 'In Stock' : 'Low Stock',
            color: inStock ? '#22c55e' : '#f59e0b'
        };
    };

    const stockStatus = getStockStatus();
    const categoryName = getCategoryName();

    return (
        <div 
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <span className="product-badge">{getBadge()}</span>
            
            <h3 className="product-title">{product.name || 'Unnamed Product'}</h3>
            
            <div className="product-details">
                <div className="product-detail-row">
                    <Package size={18} />
                    <span>{categoryName}</span>
                </div>
                
                <div className="product-detail-row">
                    <TrendingUp size={18} />
                    <span style={{ color: stockStatus.color }}>{stockStatus.text}</span>
                </div>
                
                <div className="product-price">
                    <DollarSign size={24} />
                    <span>${product.price || '0.00'}</span>
                    <small>/ unit</small>
                </div>
                
                <div className="product-rating">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={i < Math.floor(product.rating || 0) ? 'star-filled' : 'star-empty'}
                                fill={i < Math.floor(product.rating || 0) ? '#fbbf24' : 'none'}
                            />
                        ))}
                    </div>
                    <span className="rating-value">{product.rating || '0.0'}</span>
                </div>
            </div>
            
            <div className="product-footer">
                <span>View Details</span>
                <ChevronRight size={16} />
            </div>
        </div>
    );
});

export default ProductCard;