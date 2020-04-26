module.exports = function(sequelize, DataTypes) {
    return sequelize.define('trip', { 
        idTrip: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        kilometers: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
        }, 
        days: {
            type: DataTypes.INTEGER(2),
            allowNull: false
        },
        idOrigin: {
            type: DataTypes.INTEGER(4),
            allowNull: true
        },
        idDestiny: {
            type: DataTypes.INTEGER(4),
            allowNull: true
        },
        prizeTrip: {
            type: DataTypes.DECIMAL,
            allowNull: true
        }, 
        prizeRent: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        idCar: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, { 
        tablename: 'trip'
    })
}