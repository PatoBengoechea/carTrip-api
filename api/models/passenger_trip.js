module.exports = function(sequelize, type) {
    return sequelize.define('passenger_trip', {
        idPassenger_trip: {
            type: type.INTEGER(11),
            primaryKey: true,
            autoIncrement: true

        },
        idUser: {
            type: type.INTEGER(11),
            allowNull: false
        },
        idTrip: {
            type: type.INTEGER(11),
            allowNull: false
        }
    }, {
        tablename: 'passenger_trip'
    })
}