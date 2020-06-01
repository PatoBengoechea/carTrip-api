module.exports = router => { 
    const cars = require('../controllers/carController')

    router.get("/cars",  cars.getAll)

};