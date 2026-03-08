import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import './ProductPage.css';

const ProductPage = () => {
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
            setError('Failed to load product');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="error">Product not found</div>;

    return (
        <div className="product-page">
            <button className="back-btn" onClick={() => navigate('/')}>
                ← Back to Products
            </button>
            
            <div className="product-detail">
                <h1>{product.name}</h1>
                <div className="product-info">
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Category:</strong> {product.categories?.name}</p>
                    <p><strong>Rating:</strong> {product.rating}/5 ⭐</p>
                    <p><strong>Stock:</strong> {product.stock_quantity} units</p>
                    <p><strong>Description:</strong> {product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;