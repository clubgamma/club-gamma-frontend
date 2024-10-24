// src/components/RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Registered:', { name, email });
        onClose(); // Close the form after submission
    };

    return (
        <div className="registration-form">
            <h2>Register for Event</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <button type="submit">Register</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default RegistrationForm;