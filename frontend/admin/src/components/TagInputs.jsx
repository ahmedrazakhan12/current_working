import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Assume the CSS styles are in this file

const TagsInput = ({ max = null, duplicate = false, initialTags = [] }) => {
    const [tags, setTags] = useState(initialTags);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [userID , setUserID] = useState([]);
    const addTag = (tag) => {
        if (anyErrors(tag)) return;

        setTags((prevTags) => [...prevTags, tag]);
        setInputValue('');
        setSuggestions([]); // Clear suggestions after adding a tag
    };

    const deleteTag = (index) => {
        setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    const anyErrors = (tag) => {
        if (max !== null && tags.length >= max) {
            console.log('Max tags limit reached');
            return true;
        }
        if (!duplicate && tags.includes(tag)) {
            console.log(`Duplicate found: "${tag}"`);
            return true;
        }
        return false;
    };

    const handleKeyDown = (e) => {
        const trimmedValue = inputValue.trim();
        if ([9, 13, 188].includes(e.keyCode) && trimmedValue) {
            e.preventDefault();
            addTag(trimmedValue);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);

        if (e.target.value) {
            axios.get(`http://localhost:5000/admin/search/${e.target.value}`)
                .then((res) => {
                    setSuggestions(res.data); // Assuming res.data is an array of user objects
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    };

    const handleSuggestionClick = (tag) => {
        addTag(tag.name); // Change to the property you want to display\
        setUserID(tag.id)
    };

    return (
        <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input').focus()}>
            {tags.map((tag, index) => (
                <span key={index} className="tag">
                    {tag}
                    <a onClick={() => deleteTag(index)}>&times;</a>
                </span>
            ))}
            <input
                id="tag-input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion.name} {/* Change to the appropriate property */}
                        </li>
                        
                    ))}
                </ul>
            )}
             {suggestions.length === 0 && inputValue.length > 0 && (
                <ul className="suggestions-list">
                        <li>
                            No User Found
                        </li>
                        
                </ul>
            )}
        </div>
    );
};

export default TagsInput;
