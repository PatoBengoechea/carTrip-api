const Place = require("../models/place")

const PlaceController = require('../controllers/placeController')

module.exports = router => {

    router.get("/place/:city", PlaceController.getPlaces)

}