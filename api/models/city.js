module.exports = function(sequelize, DataTypes) {

    return sequelize.define('city', {
      idCity: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      idProvince: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    }, {
      tableName: 'city'
    });
  };