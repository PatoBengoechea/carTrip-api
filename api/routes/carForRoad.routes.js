module.exports = router => { 
    const cars = require('../controllers/carForRoadController')

    router.post("/carForRoad",  cars.getAll)

};