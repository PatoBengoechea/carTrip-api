module.exports = function(sequelize, type) {
    return sequelize.define('creditCard', {
        idCreditCard: {
            type: type.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        creditCardNumber: {
            type: type.STRING(25),
            allowNull: false
        },
        idUser: {
            type: type.INTEGER(11),
            allowNull: false
        },
        holderName: {
            type: type.STRING(45),
            allowNull: false,
        },
        monthExpiration: {
            type: type.INTEGER(3),
            allowNull: false,
        },
        yearExpiration: {
            type: type.INTEGER(3),
            allowNull: false,
        },
        ccv: {
            type: type.STRING(5),
            allowNull: false,
        },
    }, {
        tablename: 'creditCard'
    })
}