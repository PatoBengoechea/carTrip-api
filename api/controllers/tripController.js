const { Trip, CarForRoad, Car, Place, User, CarType } = require("../sequelize.js")
const Helper = require('../Helper/helper')
const init = require('../Helper/initializer')
const { Op, or } = require("sequelize")
const { UserInit } = require("../Helper/initializer")
    // const Trip = require("../models/trip.js")
    // const { notILike } = require("sequelize/types/lib/operators")

exports.createTrip = (req, res) => {
    // let now = Date()

    if (req.body.shared) {
        Trip.create({
                dateInit: req.body.dateInit,
                dateEnd: req.body.dateEnd,
                idCarForRoad: req.body.idCarForRoad,
                owner: req.body.owner,
                latitudeOrigin: req.body.latitudeOrigin,
                longitudeOrigin: req.body.longitudeOrigin
            })
            .then(car => {
                if (car != null) {
                    console.log(car)
                    res.status(200).json(Helper.basicResponse({ data: car }, null))
                }
            })
    } else if (!req.body.shared) {
        Trip.create({
                dateInit: req.body.dateInit,
                dateEnd: req.body.dateEnd,
                idCarForRoad: req.body.idCarForRoad,
                owner: req.body.owner,
                latitudeOrigin: req.body.latitudeOrigin,
                longitudeOrigin: req.body.longitudeOrigin,
                idDestiny: req.body.idDestiny
            })
            .then(car => {
                if (car != null) {
                    console.log(car)
                    res.status(200).json(Helper.basicResponse({ data: car }, null))
                }
            })
    }
}

exports.getMyTrips = (req, res) => {
    Trip.findAll({
            where: {
                owner: req.params.id
            },
            include: [{
                    model: CarForRoad,
                    include: {
                        model: Car
                    },
                },
                {
                    model: Place,
                    as: "origin"
                },
                {
                    model: Place,
                    as: "destiny"
                }
            ],
            order: [
                ['dateEnd', 'DESC']
            ]
        })
        .then(trips => {
            if (trips != null) {
                console.log(trips)
                res.status(200).json(Helper.basicResponse({ data: trips }, null))
            }
        })
}

exports.getNowTrip = (req, res) => {
    let fullDate = new Date()
    let today = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate())

    Trip.findOne({
            where: {
                owner: req.params.id,
                dateEnd: {
                    [Op.gte]: today
                }
            },
            include: {
                model: CarForRoad,
                include: {
                    model: Car
                }
            }
        })
        .then(trip => {
            if (trip == null) {
                res.status(200).json(Helper.basicResponse({ noTrip: true }, null))
            } else {
                res.status(200).json(Helper.basicResponse({ trip: trip }, null))
            }
        })
        .catch(err => {
            res.status(400)
        })
}

exports.getTripsFromTo = (req, res) => {
    let origin = req.params.city
    let fullDate = new Date()
    let today = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate())

    Trip.findAll({
            where: {
                idDestiny: {
                    [Op.ne]: null
                },
                dateInit: {
                    [Op.gte]: today
                }
            },
            include: [{
                    model: Place,
                    as: "destiny"
                },
                {
                    model: Place,
                    as: "origin",
                    where: {
                        cityName: origin
                    }
                },
                {
                    model: CarForRoad,
                    include: {
                        model: Car,
                        include: {
                            model: CarType
                        }
                    }
                },
                {
                    model: User
                }
            ]
        })
        .then(trips => {
            res.status(200).json(Helper.basicResponse({ trips: trips }, null))
        })
        .catch(err => {
            console.log("\n \n \n")
            console.log("Error executing get trips from to")
            console.log(err)
            res.status(500).json(Helper.basicResponse(null, err))
        })
}