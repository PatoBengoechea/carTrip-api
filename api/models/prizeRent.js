module.exports = function(sequelize, type) {
    return sequelize.define('prizeRent', {
        idPrizeRent: {
            type: type.INTEGER(11),
            allowNull: false,
            primaryKey: true
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
        tablename: 'prizeRent'
    })
}