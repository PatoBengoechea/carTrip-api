const { CarForRoad, Car, Trip, CarType, PrizeRent } = require("../sequelize")
const helper = require("../Helper/helper")
const typeCar = require("../models/typeCar")
    // const { is } = require("sequelize/types/lib/operators")

exports.getAll = (req, res) => {
    CarForRoad.findAll({
        include: [{
                model: Trip

            },
            {
                model: Car
            }
        ]
    }).then(cars => {
        var availableCars = []
        let today = new Date()
        cars.forEach(car => {
            var isAvailable = true
            car.trips.forEach(trip => {
                if (trip.dateEnd > today) {
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
                    }]
                }]
            },

        ]
    }).then(car => {
        let result = { "car": car }
        res.json(helper.basicResponse(result, ""))
    })
}