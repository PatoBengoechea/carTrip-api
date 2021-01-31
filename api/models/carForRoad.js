/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('carForRoad', {
        idCarForRoad: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        idCar: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        available: {
            type: DataTypes.INTEGER(4),
            allowNull: false
        },
        forService: {
            type: DataTypes.INTEGER(4),
            allowNull: false
        },
        latitude: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        longitude: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        idPlaceGivenBack: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        }
    }, {
        tableName: 'carForRoad'
    });
};