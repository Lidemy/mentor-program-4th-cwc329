
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Article.belongsToMany(models.Category, { through: CategoryTag });
      models.Category.belongsToMany(models.Article, { through: CategoryTag });
    }
  }
  CategoryTag.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    modelName: 'CategoryTag',
  });
  return CategoryTag;
};
