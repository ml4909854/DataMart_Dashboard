// API Constants
export const API_BASE_URL =import.meta.env.VITE_API_URL;

// Pagination Constants
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;

// Product Categories
export const CATEGORIES = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home-living', name: 'Home & Living' },
    { id: 'books', name: 'Books' },
    { id: 'sports', name: 'Sports' }
];

// Sort Options
export const SORT_OPTIONS = [
    { value: 'created_at', label: 'Newest' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
    { value: 'name', label: 'Name' }
];

// UI Constants
export const LOADER_SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
};

export const BUTTON_VARIANTS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger'
};

// Error Messages
export const ERROR_MESSAGES = {
    FETCH_PRODUCTS: 'Failed to fetch products. Please try again.',
    FETCH_PRODUCT: 'Failed to fetch product details. Please try again.',
    PRODUCT_NOT_FOUND: 'Product not found.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
    FILTERS_APPLIED: 'Filters applied successfully',
    SEARCH_COMPLETED: 'Search completed'
};

// Local Storage Keys
export const STORAGE_KEYS = {
    THEME: 'theme',
    FILTERS: 'product_filters'
};