module.exports = function(sequelize, type) {
    return sequelize.define('prizeRent', { 
        idPrizeKM: {
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
            type: type.DECIMAL,
            allowNull: false
        }
    }, {
        tablename: 'prizeRent'
    })
}