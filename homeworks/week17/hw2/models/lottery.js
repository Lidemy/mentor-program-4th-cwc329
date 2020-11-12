
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lottery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lottery.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    prize: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Lottery',
  });
  return Lottery;
};
