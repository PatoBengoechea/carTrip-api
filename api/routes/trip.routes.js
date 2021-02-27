const trip = require("../models/trip")

const Trip = require('../controllers/tripController')

module.exports = router => {

    router.post("/rentcar", Trip.createTrip)

    router.get("/trips/:id", Trip.getMyTrips)

    router.get("/trip/:id", Trip.getNowTrip)

    router.post("/trip/from/:city", Trip.getTripsFromTo)

    router.post("/trip/passenger", Trip.addAsPassenger)

    router.get("/trip/passenger/:id", Trip.getNowTripAsPassenger)
}