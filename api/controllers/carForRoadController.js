const { CarForRoad, Car } = require("../sequelize")

exports.getAll = (req, res) => {
    CarForRoad.findAll({ include: Car}).then(cars => res.json(cars))
}