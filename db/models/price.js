'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Adapter,{
        foreignKey: 'adapterId'
      });
      this.belongsTo(models.Shop, {
        foreignKey: 'shopId'
      });
    }
  };
  Price.init({
    adapterId: DataTypes.INTEGER,
    adapterFullName: DataTypes.TEXT,
    adapterLink: DataTypes.TEXT,
    shopId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    parseTS: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Price',
  });
  return Price;
};
