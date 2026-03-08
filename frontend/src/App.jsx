import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProductPage = lazy(() => import('./pages/ProductPage'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div className="loading">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;