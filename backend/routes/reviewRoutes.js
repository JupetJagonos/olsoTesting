const express = require ('express');
const { createReview, getReviewsForService } = require('../controllers/reviewController');


const auth = require ('../middleware/auth');
const router = express.Router();

//Create a review
router.post('/', auth(['Client']), createReview);

//Get reviews for a specific services
router.get('/service/:serviceId', getReviewsForService);

module.exports = router;