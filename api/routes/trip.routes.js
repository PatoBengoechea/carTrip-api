const trip = require("../models/trip")

const Trip = require('../controllers/tripController')

module.exports = router => {

    router.post("/rentcar", Trip.createTrip)

    router.get("/trips/:id", Trip.getMyTrips)

    router.get("/trip/:id", Trip.getNowTrip)

    router.get("/trip/from/:city", Trip.getTripsFromTo)
}