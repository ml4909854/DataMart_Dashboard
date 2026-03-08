import React from 'react';
import './Button.css';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'medium',
    onClick, 
    disabled = false,
    type = 'button',
    fullWidth = false,
    icon
}) => {
    const className = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''}`;
    
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            <span className="btn-text">{children}</span>
        </button>
    );
};

export default Button;