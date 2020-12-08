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
        dateInit: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateEnd: {
            type: DataTypes.DATE,
            allowNull: false
        },
        latitudeOrigin: {
            type: DataTypes.DECIMAL(14, 11),
            allowNull: true
        },
        longitudeOrigin: {
            type: DataTypes.DECIMAL(14, 11),
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
        idCarForRoad: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        owner: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tablename: 'trip'
    })
}