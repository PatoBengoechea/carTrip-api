const { Trip } = require("../sequelize.js")
const Helper = require('../Helper/helper')
const init = require('../Helper/initializer')

exports.createTrip = (req, res) => {

    if (res.shared) {
        Trip.create({
                dateInit: req.body.dateInit,
                dateEnd: req.body.dateEnd,
                idOrigin: req.body.idOrigin,
                idCarForRoad: req.body.idCarForRoad
            })
            .then(car => {
                if (car != null) {
                    console.log(car)
                    res.status(200).json(Helper.basicResponse({ data: car }, null))
                }
            })
    }
}