const Activity = require('../models/Activity');

// Fetch user activities
const getUserActivities = async (req, res) => {
    const userId = req.user.id; // Get the user ID from the token

    try {
        const activities = await Activity.find({ user: userId }); // Fetch activities belonging to the user
        res.status(200).json(activities); // Respond with the activities in JSON format
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUserActivities }; // Export the controller method
