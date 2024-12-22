module.exports = (app) => {
  var router = require("express").Router();
  const healthRecordsController = require("../controller/healthRecord");

  // Thêm hồ sơ sức khỏe
  router.post("/", healthRecordsController.addHealthRecord);

  // Lấy hồ sơ sức khỏe theo lịch khám
  router.get(
    "/:appointmentId",
    healthRecordsController.getHealthRecordsByAppointment
  );

  // Cập nhật hồ sơ sức khỏe
  router.put("/:healthRecordId", healthRecordsController.updateHealthRecord);

  // Xóa hồ sơ sức khỏe
  router.delete("/:healthRecordId", healthRecordsController.deleteHealthRecord);

  router.get("/", healthRecordsController.getAllHealthRecords);

  //Lấy tất cả hồ sơ sức khỏe
  app.use("/healthRecords", router);
};
