const sql = require("../db")

const Car = function(name, brand) {
    this.name = name
    this.brand = brand
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