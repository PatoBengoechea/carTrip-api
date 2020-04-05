const sql = require("../db")

const CarType = function(id, type, capacity) {
    this.idTypeCar = id
    this.type = type
    this.capacity = capacity
}

module.exports = CarType;