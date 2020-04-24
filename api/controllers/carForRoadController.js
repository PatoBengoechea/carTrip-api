const { CarForRoad } = require("../sequelize")

exports.getAll = (req, res) => {
    CarForRoad.findAll().then(cars => res.json(cars))
}