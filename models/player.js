'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.player.belongsTo(models.user)
    }
  }
  player.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    team: DataTypes.STRING,
    position: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'player',
  });
  return player;
};