const express = require('express');
const {
    createService,
    getProviderServices,
    // updateService,
    getAllServices
} = require('../controllers/serviceController'); 

const auth = require('../middleware/auth'); 
const router = express.Router();

router.post('/', auth(['Provider']), createService); // Create a New Service
router.get('/', getAllServices); // Get All Services
router.get('/:id', getProviderServices); // Get Services Created by the Provider

module.exports = router; // Export router