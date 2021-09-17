'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdapterGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Adapter,{
        foreignKey: 'groupId'
      });
    }
  };
  AdapterGroup.init({
    title: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AdapterGroup',
  });
  return AdapterGroup;
};
