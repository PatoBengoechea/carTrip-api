module.exports = router => { 
    const cars = require('../controllers/carController')

    router.post("/car/fortype",  cars.getByType)

};