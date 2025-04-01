const Service = require('../models/Service'); // Import your Service model

// Create a new service
const createService = async (req, res) => {
    const { title, description, price, category } = req.body;

    try {
        const provider = req.user.id; // Get the provider ID from token

        // Check for required fields
        if (!title || !description || !price || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new service
        const service = new Service({
            title,
            description,
            price,
            provider, // Set the provider ID from the authenticated user
            category,
        });

        // Save the service to the database
        await service.save();
        res.status(201).json(service); // Respond with the created service
    } catch (error) {
        console.error('Error creating service:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' }); // Handle internal server errors
    }
};

// Get services created by the provider (or the experts)
const getProviderServices = async (req, res) => {
    const providerId = req.user.id; // Get the provider ID from the authenticated user

    try {
        // Fetch services belonging to the provider
        const services = await Service.find({ provider: providerId });
        res.status(200).json(services); // Respond with the services
    } catch (error) {
        console.error('Error fetching provider services:', error);
        res.status(500).json({ message: 'Server error' }); // Handle internal server errors
    }
};

// Update the details of a service
const updateService = async (req, res) => {
    const serviceId = req.params.id; // Get the service ID from the request parameters

    try {
        // Find the service by ID and update it with the new data
        const service = await Service.findByIdAndUpdate(serviceId, req.body, { new: true });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(service); // Respond with the updated service
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Server error' }); // Handle internal server errors
    }
};

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find()
            .populate('provider'); // Ensure you populate the provider details here
        res.status(200).json(services); // Send services back to the client
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createService,
    getProviderServices,
    updateService,
    getAllServices,
}; // Export all functions 