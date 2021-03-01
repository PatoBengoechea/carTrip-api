const { CarForRoad, Car, Trip, CarType, PrizeRent, PrizeKM, License } = require("../sequelize")
const helper = require("../Helper/helper")
const typeCar = require("../models/typeCar")
const prizeKM = require("../models/prizeKM")
const { Op, or } = require("sequelize")
const Helper = require('../Helper/helper')
const moment = require("moment")
    // const { is } = require("sequelize/types/lib/operators")

exports.getAll = (req, res) => {

    var today = moment()
    console.log(today)


    License.findOne({
            where: {
                idUser: req.params.id,
                expireDate: {
                    [Op.gte]: today
                }
            }
        })
        .then(license => {
            if (license == null) {
                res.status(500).json(Helper.basicResponse(null, "Necesitas una licencia de conducir para poder alquilar un vehiculo"))
            } else {
                CarForRoad.findAll({
                        include: [{
                                model: Trip

                            },
                            {
                                model: Car
                            }
                        ]
                    })
                    .then(cars => {
                        var availableCars = []
                        cars.forEach(car => {
                            var isAvailable = true
                            car.trips.forEach(trip => {
                                if ((trip.dateInit <= today) && (trip.dateEnd >= today)) {
                                    isAvailable = false
                                }
                            })
                            if (isAvailable) {
                                availableCars.push(car)
                            }
                        });
                        let array = { "cars": availableCars }
                        res.json(helper.basicResponse(array, ""))
                    })
            }
        })
}

exports.getOne = (req, res) => {
    let idCar = req.params.id
    console.log(idCar)
    CarForRoad.findOne({
        where: {
            idCarForRoad: idCar
        },
        include: [{
                model: Car,
                include: [{
                    model: CarType,
                    include: [{
                        model: PrizeRent
                    }, {
                        model: PrizeKM
                    }]
                }]
            },

        ]
    }).then(car => {
        let result = { "car": car }
        res.json(helper.basicResponse(result, ""))
    })
}