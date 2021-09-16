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
    }
  };
  Price.init({
    adapterId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    parseTS: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Price',
  });
  return Price;
};