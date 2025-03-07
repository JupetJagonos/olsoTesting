import axios from 'axios';

// Function to book a service
export const bookService = async (serviceId, date) => {
    const token = localStorage.getItem('token');

    const response = await axios.post('http://localhost:5001/api/users/book', 
        { service: serviceId, date }, // Sending service ID and date
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    
    return response.data; // Return the response data (created appointment)
};