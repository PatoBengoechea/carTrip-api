const car = require('../models/car');

module.exports = router => {
    const cars = require('../controllers/carForRoadController')

    router.get("/carForRoad", cars.getAll)

    router.get("/carForRoad/:id", cars.getOne)

};