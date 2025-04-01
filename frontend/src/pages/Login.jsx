// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Registration.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Or any indication of loading
    
        if (!formData.email || !formData.password) {
            setErrorMessage('Please enter both email and password.');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5001/api/users/login', formData);
            
            // Ensure we have token, userId, and userType in the response
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token); // Store JWT token
                localStorage.setItem('userId', response.data.userId); // Store user ID
                localStorage.setItem('userType', response.data.userType); // Store user type
                
                navigate('/dashboard'); // Navigate to dashboard
            } else {
                setErrorMessage('Login failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : 'Server Error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-container">
            <h1 id="heading">Login</h1>
            {errorMessage && <div className="error">{errorMessage}</div>} {/* Display error messages */}
            <form className="form" onSubmit={handleSubmit}>
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
                <div className="btn">
                    <button type="submit" className="button2" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'} {/* Display loading state */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;