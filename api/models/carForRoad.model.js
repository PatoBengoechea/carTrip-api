const sql = require("../db")

const CarForRoad = function(idCar, available, forService, longitude, latitude) {
    this.idCar = idCar
    this.available = available
    this.forService = forService
    this.longitude = longitude
    this.latitude = latitude
}

CarForRoad.getAll = (result) => {
    sql.query("Select * from carForRoad", (err, res) => {
        if (err) {
            console.log("error", err)
            result(err, null)
            return
        } else if (res.length) { 
            console.log("cars on the road founded: ", res)
            result(null, JSON.parse(JSON.stringify(res)))
            return
        } else { 
            result({kind: "cars for road not founded"}, null)
        }
    })
}

module.exports = CarForRoad;