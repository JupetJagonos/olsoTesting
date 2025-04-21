const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');
const Service = require('../models/Service');

router.post('/create-payment-intent', auth(['Client']), async (req, res) => {
    const { serviceId, hours } = req.body;

    try {
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const amount = Math.round(service.price * hours * 100); // In cents

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: { serviceId, hours, userId: req.user.id },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;