module.exports = function(sequelize, type) {
    return sequelize.define('assurance', {
        idPayment: {
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
        },
        idCreditCard: {
            type: type.INTEGER(11),
            allowNull: false
        },
        amount: {
            type: type.DOUBLE(8, 2),
            allowNull: false
        },
        givenBack: {
            type: type.BOOLEAN,
            allowNull: false
        }
    }, {
        tablename: 'assurance'
    })
}