module.exports = function(sequelize, DataTypes) {
    return sequelize.define('license', {
        idLicense: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        expireDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tablename: 'license'
    })
}