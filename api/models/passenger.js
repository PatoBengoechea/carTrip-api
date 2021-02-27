module.exports = function(sequelize, type) {
    return sequelize.define('passenger', {
        idPassenger: {
            type: type.INTEGER(11),
            allowNull: false,
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
        tablename: 'passenger'
    })
}