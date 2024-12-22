"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // Liên kết với bảng Animal
      this.belongsTo(models.Animal, { foreignKey: "petId", as: "pet" });

      // Liên kết với bảng HealthRecord
      this.hasOne(models.HealthRecord, {
        foreignKey: "appointmentId",
        as: "healthRecord",
      });
    }
  }

  Appointment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );

  return Appointment;
};
