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
        shared: {
            type: DataTypes.BOOLEAN,
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