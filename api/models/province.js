module.exports = function(sequelize, DataTypes) {

    return sequelize.define('province', {
      idProvince: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      }
    }, {
      tableName: 'province'
    });
  };