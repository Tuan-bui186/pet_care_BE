"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Schedule.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Schedule.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      note: DataTypes.TEXT,
      phone: DataTypes.STRING,
      typePet: DataTypes.STRING,
      typeService: DataTypes.STRING,
      typeWeight: DataTypes.STRING,
      date: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );

  return Schedule;
};
