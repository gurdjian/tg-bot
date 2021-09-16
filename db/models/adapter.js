'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Prices,)
    }
  };
  Adapter.init({
    title: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Adapter',
  });
  return Adapter;
};
