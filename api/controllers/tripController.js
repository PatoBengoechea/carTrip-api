const { Trip, CarForRoad, Car } = require("../sequelize.js")
const Helper = require('../Helper/helper')
const init = require('../Helper/initializer')
const { Op } = require("sequelize")
    // const Trip = require("../models/trip.js")
    // const { notILike } = require("sequelize/types/lib/operators")

exports.createTrip = (req, res) => {
    // let now = Date()

    if (req.body.shared) {
        Trip.create({
                dateInit: req.body.dateInit,
                dateEnd: req.body.dateEnd,
                idOrigin: req.body.idOrigin,
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
                longitudeOrigin: req.body.longitudeOrigin
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
            include: {
                model: CarForRoad,
                include: {
                    model: Car
                }
            },
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
    let today = new Date()
    Trip.findOne({
            where: {
                owner: req.params.id,
                dateEnd: {
                    [Op.gt]: today
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