
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany(models.Article, { through: models.CategoryTag });
    }
  }
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
