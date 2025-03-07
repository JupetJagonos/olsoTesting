// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'Client',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/users/register', formData);
            console.log('Registration Successful:', response.data);
            navigate('/login'); // Navigate to login after successful registration
        } catch (error) {
            console.error('Registration Error:', error);
            setErrorMessage(error.response ? error.response.data.message : 'Server Error');
        }
    };

    return (
        <div className="registration-container">
            <h1 id="heading">Register</h1>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div className="field">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div className="field">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <select name="userType" value={formData.userType} onChange={handleChange} className="field">
                    <option value="Client">Client</option>
                    <option value="Provider">Provider</option>
                </select>
                <div className="btn">
                    <button type="submit" className="button2">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Registration;