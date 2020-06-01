const { CarForRoad, Car } = require("../sequelize")
const helper = require("../Helper/helper")

exports.getAll = (req, res) => {
    CarForRoad.findAll({ include: Car}).then(cars => { 
        let array = { "cars": cars }
        res.json(helper.basicResponse(array, ""))
    })
}