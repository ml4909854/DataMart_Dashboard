import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Filter, History, Package, Tag, Building2 } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('all');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const wrapperRef = useRef(null);

    // Load search history
    useEffect(() => {
        const history = localStorage.getItem('searchHistory');
        if (history) {
            setSearchHistory(JSON.parse(history).slice(0, 5));
        }
    }, []);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Save to history
            const updatedHistory = [searchTerm, ...searchHistory.filter(h => h !== searchTerm)].slice(0, 5);
            setSearchHistory(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            
            // Pass search with type
            onSearch({ 
                term: searchTerm,
                type: searchType 
            });
            setShowSuggestions(false);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch({ term: '', type: searchType });
        setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        onSearch({ term: suggestion, type: searchType });
        setShowSuggestions(false);
    };

    // Get placeholder based on search type
    const getPlaceholder = () => {
        switch(searchType) {
            case 'name': return 'Search by product name...';
            case 'category': return 'Search by category (Electronics, Books, Fashion...)';
            case 'brand': return 'Search by brand name...';
            default: return 'Search products by name, category, or brand...';
        }
    };

    // Get icon based on search type
    const getSearchIcon = () => {
        switch(searchType) {
            case 'name': return <Package size={18} />;
            case 'category': return <Tag size={18} />;
            case 'brand': return <Building2 size={18} />;
            default: return <Search size={18} />;
        }
    };

    return (
        <div className="search-container-modern" ref={wrapperRef}>
            <form className="search-bar-modern" onSubmit={handleSubmit}>
                <div className="search-type-selector">
                    <select 
                        value={searchType} 
                        onChange={(e) => setSearchType(e.target.value)}
                        className="search-type-dropdown"
                    >
                        <option value="all">🔍 All Fields</option>
                        <option value="name">📦 Product Name</option>
                        <option value="category">🏷️ Category</option>
                        <option value="brand">🏢 Brand</option>
                    </select>
                </div>

                <div className="search-input-wrapper-modern">
                    <span className="search-icon-modern">
                        {getSearchIcon()}
                    </span>
                    <input
                        type="text"
                        className="search-input-modern"
                        placeholder={getPlaceholder()}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        autoComplete="off"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            className="clear-button-modern"
                            onClick={handleClear}
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                <button type="submit" className="search-submit-btn-modern">
                    <Search size={18} />
                    <span>Search</span>
                </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div className="search-suggestions">
                    {/* Search History */}
                    {searchHistory.length > 0 && searchTerm === '' && (
                        <div className="suggestion-section">
                            <div className="suggestion-header">
                                <History size={14} />
                                <span>Recent Searches</span>
                            </div>
                            {searchHistory.map((item, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => {
                                        setSearchTerm(item);
                                        onSearch({ term: item, type: searchType });
                                        setShowSuggestions(false);
                                    }}
                                >
                                    <History size={14} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;