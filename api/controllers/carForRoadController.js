const carForRoad = require("../models/carForRoad.model")

exports.getAll = (req, res) => {
    carForRoad.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                status: true,
                data: null,
                message: "There was a problem in the database"
            })
        } else {
            res.status(200).send({
                status: true,
                data: data,
                message: null
            })
        }
    })
}