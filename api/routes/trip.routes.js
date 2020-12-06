const trip = require("../models/trip")

const Trip = require('../controllers/tripController')

module.exports = router => {

    router.post("/rentcar", Trip.createTrip)

    router.get("/trips/:id", Trip.getMyTrips)
}