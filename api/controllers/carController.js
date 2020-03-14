const Car = require("../models/car.model")

exports.getByType = (req, res) => {
    if (!req.body.carType) { 
        res.status(400).send({
            status: false,
            data: null,
            message: "No ha enviado un tipo de vehiculo"
        })
    } else { 
        Car.getByType(req.body.carType, (err, data) => {
            if (err) { 
                res.status(500).send( {
                    status: false,
                    data: null,
                    message: "No hay vehiculos con ese ID TYPE"
                })
            } else {
                res.status(500).send({
                    status: true,
                    data: data,
                    message: null
                })
            }
        })
    }
}