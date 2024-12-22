"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HealthRecord extends Model {
    static associate(models) {
      this.belongsTo(models.Appointment, {
        foreignKey: "appointmentId",
        as: "appointment",
      });
      this.belongsTo(models.Animal, { foreignKey: "petId", as: "pet" });
    }
  }

  HealthRecord.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      visitDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      diagnosis: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      prescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      feedingPlan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "HealthRecord",
    }
  );

  return HealthRecord;
};
