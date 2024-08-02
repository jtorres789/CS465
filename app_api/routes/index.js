const express = require('express'); // Express app
const router = express.Router(); //router logic

//This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

//define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripslist); //GET Method routes tripslist

//GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;