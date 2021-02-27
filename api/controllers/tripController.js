const { Trip, CarForRoad, Car, Place, User, CarType, PassengerTrip, Payment, Assurance, PrizeKM, PrizeRent } = require("../sequelize.js")
const Helper = require('../Helper/helper')
const init = require('../Helper/initializer')
const { Op, or } = require("sequelize")
const { UserInit } = require("../Helper/initializer")
const prizeKM = require("../models/prizeKM.js")
    // const Trip = require("../models/trip.js")
    // const { notILike } = require("sequelize/types/lib/operators")

exports.createTrip = (req, res) => {
    console.log(req)
    console.log(req.body)
    Trip.create({
            dateInit: req.body.dateInit,
            dateEnd: req.body.dateEnd,
            idCarForRoad: req.body.idCarForRoad,
            shared: req.body.shared,
            owner: req.body.owner,
            idDestiny: req.body.idPlace
        })
        .then(car => {
            Payment.create({
                idUser: req.body.owner,
                idCreditCard: req.body.idCreditCard,
                amount: req.body.amount,
                idTrip: car.idTrip
            })

            Assurance.create({
                idUser: req.body.owner,
                idCreditCard: req.body.idCreditCard,
                amount: 5000,
                idTrip: car.idTrip,
                givenBack: false
            })
            if (car != null) {
                console.log(car)
                res.status(200).json(Helper.basicResponse({ data: car }, null))
            }
        })
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
            include: [{
                    model: CarForRoad,
                    include: {
                        model: Car
                    }
                },
                {
                    model: User
                },
                {
                    model: Place,
                    as: "destiny"
                },
                {
                    model: Place,
                    as: "origin"
                }
            ]
        })
        .then(trip => {
            if (trip == null) {
                let fullDate = new Date()
                PassengerTrip.findOne({
                        where: {
                            idUser: req.params.id
                        },
                        include: {
                            model: Trip,
                            where: {
                                owner: {
                                    [Op.ne]: req.params.id
                                }
                            },
                            include: [{
                                    model: User
                                },
                                {
                                    model: CarForRoad,
                                    include: {
                                        model: Car
                                    }
                                },
                                {
                                    model: User
                                },
                                {
                                    model: Place,
                                    as: "destiny"
                                },
                                {
                                    model: Place,
                                    as: "origin"
                                }
                            ]
                        }
                    })
                    .then(result => {

                        if (result == null) {
                            res.status(200).json(Helper.basicResponse({ noTrip: true }, null))
                        } else if (Date(result.trip.dateInit) != fullDate) {
                            res.status(200).json(Helper.basicResponse({ noTrip: true }, null))
                        } else {
                            res.status(200).json(Helper.basicResponse({ trip: result.trip }, null))
                        }
                    })
                    // res.status(200).json(Helper.basicResponse({ noTrip: true }, null))
            } else {
                res.status(200).json(Helper.basicResponse({ trip: trip }, null))
            }
        })
        .catch(err => {
            console.error(err)
            res.status(400).json(Helper.basicResponse(null, err))
        })
}

exports.getTripsFromTo = (req, res) => {
    let origin = req.params.city
    let fullDate = new Date()
    let today = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate())

    console.log(req.body.idUser)

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
                            model: CarType,
                            include: [{
                                model: PrizeKM
                            }, {
                                model: PrizeRent
                            }]
                        }
                    }
                },
                {
                    model: User,
                    // where: {
                    //     idUser: {
                    //         [Op.ne]: req.body.idUser
                    //     }
                    // }
                }
            ]
        })
        .then(trips => {
            trips.forEach(trip => {
                trip.users.forEach(user => {
                    if (user.iduser == req.body.idUser) {
                        trips.pop(trip)
                    }
                })
            });
            res.status(200).json(Helper.basicResponse({ trips: trips }, null))
        })
        .catch(err => {
            console.log("\n \n \n")
            console.log("Error executing get trips from to")
            console.log(err)
            res.status(500).json(Helper.basicResponse(null, "No se pudieron obtener los viajes"))
        })
}

exports.addAsPassenger = (req, res) => {
    PassengerTrip.create({
            idUser: req.body.idUser,
            idTrip: req.body.idTrip
        }, {
            include: {
                model: Trip
            }
        })
        .then(result => {
            console.log(result)
            res.status(200).json(Helper.basicResponse({ result: result }, null))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(Helper.basicResponse(null, "No se ha podido cargar como pasajero"))
        })
}

exports.getNowTripAsPassenger = (req, res) => {
    let fullDate = new Date()
    PassengerTrip.findOne({
            where: {
                idUser: req.params.id
            },
            include: {
                model: Trip,
                where: {
                    owner: {
                        [Op.ne]: req.params.id
                    }
                },
                include: {
                    model: User
                }
            }
        })
        .then(result => {
            if (Date(result.trip.dateInit) != fullDate) {
                res.status(200).json(Helper.basicResponse({ result: false }, null))
            } else {
                res.status(200).json(Helper.basicResponse({ trip: result.trip }, null))
            }
        })
}