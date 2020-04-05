const sql = require("../db")
const CarType = require("../models/carType.model")

// const Car = function(name, brand) {
//     var name, brand
//     this.name = name
//     this.brand = brand
// }

const Car = function(name, brand, idTypeCar, type, capacity, img_path) {
    this.name = name
    this.brand = brand
    this.img_path = img_path
    this.typeCar = new CarType(idTypeCar, type, capacity)
}

Car.getByType = (typeCar, result) => {
    sql.query("Select * from car c inner join typeCar tc on c.type = tc.idTypeCar where tc.type = '" + typeCar + "'", (err, res)=> {
        if (err) {
            console.log("error", err)
            result(err, null)
            return
        } else if (res.length) {
            console.log("found cars: ", res)
            result(null, JSON.parse(JSON.stringify(res)))
            return
        } else { 
            result({kind: "cars not founded"}, null)
        }
    })
}

module.exports = Car;