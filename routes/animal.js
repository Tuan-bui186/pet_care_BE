module.exports = (app) => {
  var Animal = require("../models/animal");
  var router = require("express").Router();
  var animalController = require("../controller/animals");
  // Route để tạo mới một thú cưng
  router.post("/", animalController.createAnimal);

  // Route để lấy tất cả thú cưng
  router.get("/", animalController.getAllAnimals);

  // Route để lấy thông tin một thú cưng theo ID
  router.get("/:id", animalController.getAnimalById);

  // Route để cập nhật thông tin thú cưng
  router.put("/:id", animalController.updateAnimal);

  // Route để xóa thú cưng
  router.delete("/:id", animalController.deleteAnimal);

  app.use("/animals", router);
};
