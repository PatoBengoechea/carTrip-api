module.exports = function(sequelize, type) {
    return sequelize.define('prizeKM', {
        idPrizeKM: {
            type: type.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idTypeCar: {
            type: type.INTEGER(11),
            allowNull: false
        },
        date: {
            type: type.DATE,
            allowNull: false
        },
        prize: {
            type: type.INTEGER(10),
            allowNull: false
        }
    }, {
        tablename: 'prizeKM'
    })
}