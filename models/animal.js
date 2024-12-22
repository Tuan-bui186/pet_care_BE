"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mối quan hệ với model User (chủ sở hữu thú cưng)
      this.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });
      this.hasMany(models.HealthRecord, {
        foreignKey: "petId",
        as: "healthRecords",
      });
    }
  }

  // Định nghĩa các trường trong model Animal
  Animal.init(
    {
      name: DataTypes.STRING(500), // Tên thú cưng
      species: DataTypes.STRING(255), // Loài thú cưng (ví dụ: chó, mèo, ...)
      age: DataTypes.INTEGER, // Tuổi thú cưng
      furColor: DataTypes.STRING(255), // Màu lông thú cưng
      gender: DataTypes.ENUM("male", "female"), // Giới tính thú cưng
      status: DataTypes.INTEGER, // Trạng thái thú cưng (0 - không hoạt động, 1 - hoạt động)
      ownerId: DataTypes.INTEGER, // Mã chủ sở hữu (liên kết với bảng User)
    },
    {
      sequelize,
      modelName: "Animal", // Tên model
    }
  );

  return Animal;
};
