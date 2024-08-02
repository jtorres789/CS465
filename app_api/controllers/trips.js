const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
//const Model = mongoose.model('trips');

//GET: /trips - lists all the trips 
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripslist = async(req, res) => {
    const q = await Trip
    .find({}) // no filter, return all records
    .exec();

    //Uncomment the following line to show results of querey
    //on the console
    //console.log(q);

    if(!q)
    { // Database returned no data 
        return res
                .status(404)
                .json(console.error());
    } else { //return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};

//GET: /trips/:tripCode - lists a single trip
//Regardless of outcome, response must include HTML Status code
// and JSOn meesage to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Trip
        .findOne({'code': req.params.tripCode}) // return single record
        .exec();

        //Uncomment the following to show results of querey
        //on console
        console.log(q);

    if(!q)
    {
        return res
                .status(404)
                .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    } 
};


module.exports = {
    tripslist,
    tripsFindByCode
};