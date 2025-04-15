const express = require('express');
const {
    createService,
    getProviderServices,
    updateService, 
    deleteService, 
    getAllServices
} = require('../controllers/serviceController'); 

const auth = require('../middleware/auth'); 
const router = express.Router();

router.post('/', auth(['Provider']), createService); // Protect create service route
router.get('/', getAllServices); // Open route for all users
router.get('/:id', auth(['Provider']), getProviderServices); // Protect get provider's services
router.put('/:id', auth(['Provider']), updateService); // Protect update service
router.delete('/:id', auth(['Provider']), deleteService); // Protect delete service

module.exports = router; // Export router