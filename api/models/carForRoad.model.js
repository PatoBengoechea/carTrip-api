const sql = require("../db")
const Car = require("../models/car.model")

const CarForRoad = function(carForRoad) {
    this.idCarForRoad = carForRoad.idCarForRoad
    this.available = carForRoad.available
    this.forService = carForRoad.forService
    this.longitude = carForRoad.longitude
    this.latitude = carForRoad.latitude
    this.car = new Car(carForRoad.name, carForRoad.brand, carForRoad.idTypeCar, carForRoad.type, carForRoad.capacity, carForRoad.img_path)
}

CarForRoad.getAll = (result) => {
    sql.query("select * from carForRoad inner join car inner join typeCar type where carForRoad.idCar = car.idCar and type.idTypeCar = car.type and carForRoad.forService = 1",
     (err, res) => {
        if (err) {
            console.log("error", err)
            result(err, null)
            return
        } else if (res.length) { 
            console.log("cars on the road founded: ", res)
            let dataJson = JSON.parse(JSON.stringify(res))
            var array = []
            for (let i = 0; i < dataJson.length; i++) {
                console.log(dataJson[i])
                let car = new CarForRoad(dataJson[i])
                array.push(car)
            }
            console.log(array)
            result(null, array)
            return
        } else { 
            result({kind: "cars for road not founded"}, null)
        }
    })
}

module.exports = CarForRoad;