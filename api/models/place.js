module.exports = function(sequelize, DataTypes) {
    return sequelize.define('places', {
        idPlace: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cityName: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        latitude: {
            type: DataTypes.DECIMAL(14, 11),
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DECIMAL(14, 11),
            allowNull: false
        }
    }, {
        tablename: 'places'
    })
}