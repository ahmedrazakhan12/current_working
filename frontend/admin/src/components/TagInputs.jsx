import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Assume the CSS styles are in this file

const TagsInput = ({ max = null, duplicate = false, initialTags = [] }) => {
    const [tags02, setTags02] = useState(initialTags);
    const [inputValue02, setInputValue02] = useState('');
    const [suggestions02, setSuggestions02] = useState([]);
    const [userID02 , setUserID02] = useState([]);
    const addTag02 = (tag) => {
        if (anyErrors02(tag)) return;

        setTags02((prevTags) => [...prevTags, tag]);
        setInputValue02('');
        setSuggestions02([]); // Clear suggestions after adding a tag
    };

    const deleteTag02 = (index) => {
        setTags02((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    const anyErrors02 = (tag) => {
        if (max !== null && tags02.length >= max) {
            console.log('Max tags limit reached');
            return true;
        }
        if (!duplicate && tags02.includes(tag)) {
            console.log(`Duplicate found: "${tag}"`);
            return true;
        }
        return false;
    };

    const handleKeyDown02 = (e) => {
        const trimmedValue = inputValue02.trim();
        if ([9, 13, 188].includes(e.keyCode) && trimmedValue) {
            e.preventDefault();
            addTag02(trimmedValue);
        }
    };

    const handleInputChange02 = (e) => {
        setInputValue02(e.target.value);

        if (e.target.value) {
            axios.get(`http://localhost:5000/admin/search/${e.target.value}`)
                .then((res) => {
                    setSuggestions02(res.data); // Assuming res.data is an array of user objects
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setSuggestions02([]); // Clear suggestions if input is empty
        }
    };

    const handleSuggestionClick02 = (tag) => {
        addTag02(tag.name); // Change to the property you want to display\
        setUserID02(tag.id)
    };

    return (
        <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input').focus()}>
            {tags02.map((tag, index) => (
                <span key={index} className="tag">
                    {tag}
                    <a onClick={() => deleteTag02(index)}>&times;</a>
                </span>
            ))}
            <input
                id="tag-input"
                type="text"
                value={inputValue02}
                onChange={handleInputChange02}
                onKeyDown={handleKeyDown02}
                placeholder="Add a tag"
            />
            {suggestions02.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions02.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick02(suggestion)}>
                            {suggestion.name} {/* Change to the appropriate property */}
                        </li>
                        
                    ))}
                </ul>
            )}
             {suggestions02.length === 0 && inputValue02.length > 0 && (
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
