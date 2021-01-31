const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('./models/user.js')
const CarModel = require('./models/car')
const CarForRoadModel = require('./models/carForRoad')
const CarTypeModel = require('./models/typeCar')
const TripModel = require('./models/trip')
const PrizeKMModel = require('./models/prizeKM')
const PrizeRentModel = require('./models/prizeRent')
const PassengerModel = require('./models/passenger')
const CityModel = require('./models/city')
const ProvinceModel = require('./models/province')
const LicenseModel = require('./models/license')
const PlaceModel = require('./models/place')
const PaymentModel = require('./models/payment')
const CreditCardModel = require('./models/creditCard')

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
const City = CityModel(sequelize, DataTypes)
const Province = ProvinceModel(sequelize, DataTypes)
const License = LicenseModel(sequelize, DataTypes)
const Place = PlaceModel(sequelize, DataTypes)
const Payment = PaymentModel(sequelize, DataTypes)
const CreditCard = CreditCardModel(sequelize, DataTypes)


CarType.hasMany(Car, { foreignKey: 'type', sourceKey: 'idTypeCar' })
CarType.hasOne(PrizeRent, { foreignKey: 'idTypeCar' })

Car.belongsTo(CarType, { foreignKey: "type" })

PrizeKM.belongsTo(CarType, { foreignKey: 'idTypeCar' })

CarForRoad.belongsTo(Car, { foreignKey: 'idCar' })
CarForRoad.hasMany(Trip, { foreignKey: "idCarForRoad", sourceKey: "idCarForRoad" })
CarForRoad.belongsTo(Place, { foreignKey: "idPlaceGivenBack" })

Trip.belongsTo(CarForRoad, { foreignKey: "idCarForRoad" })
Trip.belongsToMany(User, { through: Passenger, foreignKey: "idTrip" })
Trip.belongsTo(Place, { foreignKey: "idDestiny", as: "destiny" })
Trip.belongsTo(Place, { foreignKey: "idOrigin", as: "origin" })

Trip.belongsToMany(User, { through: "passenger_trip" })
User.belongsToMany(Trip, { through: "passenger_trip" })

User.hasMany(Trip, { foreignKey: "owner" })
User.hasMany(License, { foreignKey: "idUser" })

Province.hasMany(City, { foreignKey: 'idProvince' })

Passenger.belongsTo(User, { foreignKey: "idUser" })

Payment.belongsTo(User, { foreignKey: "idUser" })
Payment.belongsTo(CreditCard, { foreignKey: "idCreditCard" })
Payment.belongsTo(Trip, { foreignKey: "idTrip" })

CreditCard.belongsTo(User, { foreignKey: "idUser" })

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
    Passenger,
    City,
    Province,
    License,
    Place,
    Payment,
    CreditCard
}