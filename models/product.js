"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Tag, { through: "TagProducts" });
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
        targetKey: "id",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING(500),
      quantity: DataTypes.INTEGER,
      description: DataTypes.STRING(500),
      price: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
