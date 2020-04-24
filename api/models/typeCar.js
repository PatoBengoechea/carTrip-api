/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('typeCar', {
    idTypeCar: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    capacity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'typeCar'
  });
};
