// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../styles/createService.css'; // Import the created CSS file

const CreateService = ({ onServiceCreated, userType }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const categories = [
        'Pet Services',
        'Child and Elderly Care',
        'Home Services',
        'Educational Services',
        'Freelance and Creative Services',
        'Food and Cooking Services',
        'Health and Fitness Services',
        'Support Services',
        'Vehicle Services',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serviceData = { title, description, price, category };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5001/api/services', serviceData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onServiceCreated(response.data);
            setSuccess('Service created successfully!');
            // Reset fields
            setTitle('');
            setDescription('');
            setPrice('');
            setCategory('');
        } catch (err) {
            setError('Failed to create service.');
            console.error('Error creating service:', err.response.data); // Log error response for more details
        }
    };

    // Allow only Providers to create services
    if (userType !== 'Provider') {
        return <div>You do not have permission to create services.</div>;
    }

    return (
        <div className="create-service-container">
            <h1>Create a New Service</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Service Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <textarea
                        className="textarea-field"
                        placeholder="Service Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="field">
                    <input
                        type="number"
                        className="input-field"
                        placeholder="Service Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <select className="select-field" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select a Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="btn">
                    <button type="submit" className="button2">Create Service</button>
                </div>
                {success && <p className="success">{success}</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

CreateService.propTypes = {
    onServiceCreated: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired,
};

export default CreateService;