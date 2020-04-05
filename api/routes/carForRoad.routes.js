module.exports = router => { 
    const cars = require('../controllers/carForRoadController')

    router.get("/carForRoad",  cars.getAll)

};