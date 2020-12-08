const { Place } = require('../sequelize.js')
const Helper = require('../Helper/helper')
const { Op } = require("sequelize")

exports.getPlaces = (req, res) => {

    Place.findAll({
            where: {
                cityName: {
                    [Op.like]: '%' + req.params.city + '%'
                }
            }
        })
        .then((places) => {
            res.status(200).json(Helper.basicResponse({ places: places }, null))
        }).catch((err) => {
            console.log(err)
            res.status(500).json(Helper.basicResponse(null, "Intente de nuevo mas tarde"))
        });

}