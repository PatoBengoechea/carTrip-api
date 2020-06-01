const { Car, CarType } = require('../sequelize')
const Helper = require('../Helper/helper')

exports.getAll = (req, res) => {
    Car.findAll({include: CarType})
        .then((car) => {
            res.status(200).json(Helper.basicResponse(car, null))
        }).catch((err) => {
            res.status(500).json(Helper.basicResponse(null, err))
        });
}