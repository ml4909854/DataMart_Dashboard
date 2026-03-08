import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
    const sizeClass = `loader-${size}`;
    
    return (
        <div className="loader-container">
            <div className={`loader ${sizeClass}`}></div>
            {text && <p className="loader-text">{text}</p>}
        </div>
    );
};

export default Loader;