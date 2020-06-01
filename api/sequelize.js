const { Sequelize, DataTypes }  = require('sequelize')
const UserModel = require('./models/user.js')
const CarModel = require('./models/car')
const CarForRoadModel = require('./models/carForRoad')
const CarTypeModel = require('./models/typeCar')
const TripModel = require('./models/trip')
const PrizeKMModel = require('./models/prizeKM')
const PrizeRentModel = require('./models/prizeRent')
const PassengerModel = require('./models/passenger')

const sequelize = new Sequelize('carTrip', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
}
  
})

const User = UserModel(sequelize, DataTypes)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// const BlogTag = sequelize.define('blog_tag', {})
const Car = CarModel(sequelize, DataTypes)
const CarForRoad = CarForRoadModel(sequelize, DataTypes)
const CarType = CarTypeModel(sequelize, DataTypes)
const Trip = TripModel(sequelize, DataTypes)
const PrizeKM = PrizeKMModel(sequelize, DataTypes)
const PrizeRent = PrizeRentModel(sequelize, DataTypes)
const Passenger = PassengerModel(sequelize, DataTypes)


Car.belongsTo(CarType, { foreignKey: "type"})
CarType.hasMany(Car, {foreignKey: 'type', sourceKey: 'idTypeCar'})
CarForRoad.belongsTo(Car, { foreignKey: 'idCar'})
PrizeKM.belongsTo(CarType, { foreignKey:'idTypeCar'})
PrizeRent.belongsTo(CarType, { foreignKey: 'idTypeCar'})
Trip.belongsTo(Car, { foreignKey: 'idCar'})
Trip.belongsToMany(User, { through: Passenger, foreignKey: "idTrip"})
// User.belongsTo(Passenger)

// sequelize.authenticate()
//   .then(() => console.log("Succesfully connected"))
//   .catch( err => console.log("Unable to connect to the database", err))

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
    User,
    Car,
    CarForRoad,
    CarType,
    Trip,
    PrizeKM,
    PrizeRent,
    Passenger
}