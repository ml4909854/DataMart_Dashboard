import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await getProductById(id);
            setProduct(response.data);
        } catch (err) {
            setError('Failed to load product details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="product-detail-loading">
                <div className="loader"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-detail-error">
                <h3>❌ Error</h3>
                <p>{error}</p>
                <button onClick={() => navigate('/')}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-error">
                <h3>Product Not Found</h3>
                <button onClick={() => navigate('/')}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back to Products
            </button>
            
            <div className="product-detail-card">
                <h1 className="product-title">{product.name}</h1>
                
                <div className="product-info-grid">
                    <div className="info-item">
                        <span className="info-label">Price:</span>
                        <span className="info-value price">${product.price}</span>
                    </div>
                    
                    <div className="info-item">
                        <span className="info-label">Brand:</span>
                        <span className="info-value">{product.brand}</span>
                    </div>
                    
                    <div className="info-item">
                        <span className="info-label">Category:</span>
                        <span className="info-value">{product.categories?.name}</span>
                    </div>
                    
                    <div className="info-item">
                        <span className="info-label">Rating:</span>
                        <span className="info-value rating">
                            {product.rating}/5 ⭐
                        </span>
                    </div>
                    
                    <div className="info-item">
                        <span className="info-label">Stock:</span>
                        <span className="info-value">{product.stock_quantity} units</span>
                    </div>
                    
                    <div className="info-item full-width">
                        <span className="info-label">Description:</span>
                        <p className="info-value description">
                            {product.description || 'No description available'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;