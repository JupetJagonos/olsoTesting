const Review = require('../models/Review');

// Creating a new review
const createReview = async (req, res) => {
    const { service, rating, comment } = req.body;
    const userId = req.user.id;

    try {
        const review = new Review({
            service,
            user: userId,
            rating,
            comment
        });

        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



//Get reviews for a specific service
const getReviewsForService = async (req, res) => {
    const serviceId = req.params.serviceId;

    try {
        const reviews = await Review.find ({ service: serviceId }).populate('user', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500) ({ message: 'Server error'});
    }
};

module.exports = {
    createReview,
    getReviewsForService,
};